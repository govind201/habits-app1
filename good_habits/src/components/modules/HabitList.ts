import React from 'react'
import {get, post} from "../../utils/fetch";
import { toDay, toMonth, toWeek } from '../../utils/util';
import Habit from './habit';
import usePrevious from '../../utils/usePrevious';


export default function HabitList({moneyIndicator}) {
    const [habitList, setHabitList] = React.useState([]);
    const [habitType, setHabitType] = React.useState("daily");
    const [habitTitle, setHabitTitle] = React.useState("");
    const [balance, setBalance] = React.useState(null);
    const [habitText, setHabitText] = React.useState("");
    const  prevMoneyIndicator = React.useRef(moneyIndicator);

    React.useEffect( ()=>{
        const todaysDateObj = Date.now();
        setHabitTitle(toDay(todaysDateObj));
        reloadHabitList();
        async function updateMoney () {
        const moneyObj = await get('/money')
           setBalance(moneyObj.money);
        }
        updateMoney();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
 
    React.useEffect(()=>{
          if(moneyIndicator != prevMoneyIndicator) {
              const moneyObj = get('/money');
              setBalance(moneyObj.money);
          }
    })

    
   async function  reloadHabitList(type = "daily") {
        let habitsToReset = [];
        let habits = []
        let todaysDateObj = new Date(); //Use new Date() to get a Date for the current time returns  date object
     //Date. now() to get the current time in milliseconds since 01 January, 1970 UTC return a number
        if(type === "daily") {
             setHabitTitle(toDay(todaysDateObj));  
        }
        else if(type === "weekly") {
            setHabitTitle(toWeek(todaysDateObj));
        }
        else {
            setHabitTitle(toMonth(todaysDateObj))
        }
             setHabitType(type);
        const habitArray = await get('/habit', {type})

        habitArray.forEach((habitObj) => {
            const habitDateObj =  habitObj.Date;
            const todaysDateObj = new Date();

            if(type === 'daily') {
            if (habitTitle === undefined  || isSameDayMonthAndYear(habitDateObj, todaysDateObj)) {
            habitObj.date = todaysDateObj;
            habitObj.isDone = false;

            habitsToReset.push({id: habitObj._id, isDone: false, date: todaysDateObj});
               }
            }
            else if(type === "weekly") {
                if(!isSameWeek(todaysDateObj, habitDateObj)) {
                    habitObj.date = todaysDateObj;
                    habitObj.isDone = false;
                    habitsToReset.push({id: habitObj._id, isDone: false, date: todaysDateObj});
                }
            }
            else {
                if(habitTitle === undefined || isSameDayMonth(habitDateObj, todaysDateObj)) {
                    habitObj.date = todaysDateObj;
                    habitObj.isDone = false;
                    habitsToReset.push({id: habitObj._id, isDone: false, date: todaysDateObj})
                }

            }
             habits.push(habitObj);
        });
         setHabitList(habits);

         for (let idx in habitsToReset) {
             post("/updateHabit", habitsToReset[idx]);
         } 
    }; 

    function isSameWeek(date1, date2) {
         let dateObj1 = new Date(); 
         let dateObj2 = new Date(); 

        let dayOfDate1 = date1.getDay(); //returns day of the week for ex: 6 for saturday
        let  dayOfDate2  = date2.getDay(); 

        const millisecondsPerDay = 1000 * 60 * 60 * 24;
         dateObj1.setTime(date1.getTime() - millisecondsPerDay * dayOfDate1); // Date.now() return date as a number
         dateObj2.setTime(date2.getTime() - millisecondsPerDay * dayOfDate2);
         return isSameDayMonthAndYear(dateObj1, dateObj2)

    }
    
    function isSameDayMonthAndYear(date1, date2) {
            let date1DayMonthAndYear  = getMonthDayAndYearFromDate(date1);
            let  date2DayMonthAndYear = getMonthDayAndYearFromDate(date2); 
            
            return  date1DayMonthAndYear.sort().toString() === date2DayMonthAndYear.sort().toString();

    }
    function isSameDayMonth(date1, date2) {
         return  date1.getFullYear() !== date2.getFullYear() ||
            date1.getMonth() !== date2.getMonth();
    }
    function getMonthDayAndYearFromDate(date) {
        return [date.getFullYear(), date.getMonth(), date.getDate()];
    }

    function dailyTabClicked () { 
        reloadHabitList('daily');
    }
    function  weeklyTabClicked () {
        reloadHabitList("weekly");
    }
    function monthlyTabClicked() {
        reloadHabitList("monthly");
    }
    
    async function deleteHabit(id) {
        await  post("delete-habit", {id});
        setHabitList(currHabits => currHabits.filter(item => item._id !== id));

    }
       
 addNewHabit = (habitObj) => {
     setHabitList(currList => [...currList, habitObj]);
     habitText("");
 }
   onSubmit = ()=> {
      if (habitText) {
        body = {habit}
         input.focus();
         const body = {content: habitText, type: habitType}
         post("/habit", body).then(habitObj => {
             addNewHabit(habitObj);
         })
      }

   const onKeyDown = (event) => {
       event.preventDefault();
       if(event.key === "Enter") {
           event.preventDefault();
           onsubmit();
       }
   }




    return (
        <div> 
             <div className="left-container">
          <div className="habittabs" data-tut="habittabs">
            <button className={`button ${this.state.type === 'daily' ? 'active' : 'inactive'}`} onClick={this.dailyTab} type="button">daily</button>
            <button className={`button ${this.state.type === 'weekly' ? 'active' : 'inactive'}`} onClick={this.weeklyTab} type="button">weekly</button>
            <button className={`button ${this.state.type === 'monthly' ? 'active' : 'inactive'}`} onClick={this.monthlyTab} type="button">monthly</button>
          </div>
          <div className="panel"></div>
              </div>
            <div>{habitTitle}</div>
           {habitList.map(habit =>  (<Habit key={habit._id}
            content={habit.content}
            isDone={habit.isDone}
            updatedDd={isDone => updatedDb(isDone, habit._id)}
        delteHabit={()=> deleteHabit(habit._id)}
            /> ))}

              <form className="newhabitandbutton" data-tut="newhabit">
              <input
                type="text"
                className="text"
                placeholder={"Add a new " + habitType + " habit"}
                value={habitText}
                onChange={handleInputChange}
                onKeyDown ={onKeyDown}
              />
              <input
                type="submit"
                className="button"
                value="+"
              />
          </form>
          </div>

    )
}
