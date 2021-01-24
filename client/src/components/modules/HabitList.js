import React, { Component } from "react";
import Habit from "./Habit.js";
import sanddollar from "../data/sanddollar.png";

import { toDay, toWeek, toMonth } from "../util/date.js";

import "./HabitList.css";

import { get } from "../../utilities";
import { post } from "../../utilities";

class HabitList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      habits: [],
      type: "daily",
      title: "",
      inputText: "",
      balance: null,
    };
  }

  componentDidMount() {
    const todaysDate = new Date();
    this.setState( { title: toDay(todaysDate) });
    this.reloadHabitList("daily");

    get("/api/money").then((moneyObj) => {
      this.setState( { balance: moneyObj.money });
    });

  }

  componentDidUpdate(prevProps) {

    const {tutorialMoneyIndicator} = this.props;

    if (prevProps) {
      if (prevProps.tutorialMoneyIndicator !== tutorialMoneyIndicator) {
        get("/api/money").then((moneyObj) => {
          this.setState( { balance: moneyObj.money });
        });
      }
    }
  }

  handleInputChange = event => {
    const value = event.target.value;
    this.setState({
      inputText: value
    });

    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();

      // Trigger the button element with a click
      document.getElementById("submitHabitButton").click();
    }
  };

  addNewHabit(habitObj) {
    this.setState({
      habits: this.state.habits.concat([habitObj]),
      inputText: ""
    });
  }

  submitHabit = (event) => {
    event.preventDefault();
    if (this.state.inputText.length !== 0) {
      const body = {content: this.state.inputText, type: this.state.type};
      post("api/habit", body).then((habit) => {
        this.addNewHabit(habit);
      });
    }

  };

  updateHabitIsDone = (habitId, isDone) => {
    const body = {id: habitId, isDone: isDone, date: new Date()};
    post("/api/updateHabit", body).then((habit) => {
      var amount = isDone ? 1 : -1;
      if (this.state.type === "weekly") {
        amount = amount * 5;
      }
      else if (this.state.type === "monthly") {
        amount = amount * 15;
      }
      post("/api/incrementMoney", {amount: amount}).then((money) => {
        this.setState({
          balance: this.state.balance + amount,
        });
      })
    });
  }

  sameWeek = (date1, date2) => {
    // sunday is the beginning of the week

    var date1Sunday = new Date();
    var date2Sunday = new Date();

    var dayOfWeek1 = date1.getDay();
    var dayOfWeek2 = date2.getDay();

    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    date1Sunday.setTime(date1.getTime() - millisecondsPerDay * dayOfWeek1);
    date2Sunday.setTime(date2.getTime() - millisecondsPerDay * dayOfWeek2);

    return date1Sunday.getFullYear() === date2Sunday.getFullYear() &&
          date1Sunday.getMonth() === date2Sunday.getMonth() &&
          date1Sunday.getDate() === date2Sunday.getDate();
  }

  reloadHabitList = (type) => {
    var habitsToReset = [];
    var habits = [];
    var todaysDate = new Date();
    if (type === "daily") {
      this.setState( { type: type, title: toDay(todaysDate) });
    }
    else if (type === "weekly") {
      this.setState( { type: type, title: toWeek(todaysDate) });
    }
    else {
      this.setState( { type: type, title: toMonth(todaysDate) });
    }
    get("/api/habit", {type: type} ).then((habitObjs) => {
      habitObjs.map((habitObj) => {
        var parsedDate = new Date(habitObj.date);
        var todaysDate = new Date();
        if (type === "daily") { // reset dailies every day
          if (habitObj.date === undefined || todaysDate.getFullYear() !== parsedDate.getFullYear() ||
            todaysDate.getMonth() !== parsedDate.getMonth() ||
            todaysDate.getDate() !== parsedDate.getDate()) {
            habitObj.date = todaysDate;
            habitObj.isDone = false;

            habitsToReset.push({id: habitObj._id, isDone: false, date: todaysDate});
          }
        }
        else if (type === "weekly") { //reset weeklies every week
          if (!this.sameWeek(todaysDate, parsedDate)) {
            habitObj.date = todaysDate;
            habitObj.isDone = false;

            habitsToReset.push({id: habitObj._id, isDone: false, date: todaysDate});
          }
        }
        else { // reset monthlies every month
          if (habitObj.date === undefined || todaysDate.getFullYear() !== parsedDate.getFullYear() ||
            todaysDate.getMonth() !== parsedDate.getMonth()) {
            habitObj.date = todaysDate;
            habitObj.isDone = false;

            habitsToReset.push({id: habitObj._id, isDone: false, date: todaysDate});
          }
        }

        habits.push(habitObj);
      });

      this.setState( { habits: habits });


      for (var index in habitsToReset) {
        post("/api/updateHabit", habitsToReset[index]);
      }
    });
  }

  dailyTab = () => {
    this.reloadHabitList("daily");
  }

  weeklyTab = () => {
    this.reloadHabitList("weekly");
  }

  monthlyTab = () => {
    this.reloadHabitList("monthly");
  }

  deleteHabit = (id) => {
    post("api/deleteHabit", {id: id}).then((habit) => {
      const { habits } = this.state;
      const newHabits = habits.filter(item => item._id !== id);
      this.setState({ habits: newHabits });
    });
  }

  render() {
    return (
      <div className="habitlist-container">

        <div className="left-container">
          <div className="habittabs" data-tut="habittabs">
            <button className={`button ${this.state.type === 'daily' ? 'active' : 'inactive'}`} onClick={this.dailyTab} type="button">daily</button>
            <button className={`button ${this.state.type === 'weekly' ? 'active' : 'inactive'}`} onClick={this.weeklyTab} type="button">weekly</button>
            <button className={`button ${this.state.type === 'monthly' ? 'active' : 'inactive'}`} onClick={this.monthlyTab} type="button">monthly</button>
          </div>
          <div className="panel">

            <div>{this.state.title}</div>

            {this.state.habits.map(item => (
            <Habit
                key={`Habit_${item._id}`}
                content={item.content}
                isDone={item.isDone}
                updateDatabaseIsDone={isDone => this.updateHabitIsDone(item._id, isDone)}
                deleteHabit={() => this.deleteHabit(item._id)}
            />
            ))}


          </div>

          <form className="newhabitandbutton" data-tut="newhabit">
              <input
                type="text"
                className="text"
                placeholder={"Add a new " + this.state.type + " habit"}
                value={this.state.inputText}
                onChange={this.handleInputChange}
              />
              <input
                type="submit"
                className="button"
                value="+"
                onClick={this.submitHabit}
              />
          </form>

        </div>

        <div className="panel2" data-tut="habitbalance">
          <div className="balance">
            <div>{this.state.balance}</div>
            <img src={sanddollar} alt="sanddollar"></img>
          </div>
          <div>Use sanddollars in the store to buy fish for your aquarium.</div>
        </div>

      </div>
    );
  }
}

export default HabitList;
