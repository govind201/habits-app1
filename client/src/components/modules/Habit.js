import React, { Component } from "react";

import close from "../data/close.png";

import "./Habit.css";

class Habit extends Component {
  constructor(props) {
    super(props);
  }

  handleInputChange = (event) => {
    const value = event.target.checked;
    this.props.updateDatabaseIsDone(value);
  };

  render() {
    return (
      <div className='habit-container'>
        <label className='habit-label'>
          <input
            type="checkbox"
            defaultChecked={this.props.isDone}
            onChange={this.handleInputChange}
          />
          <span className="checkmark"></span>
          <span className="text">{this.props.content}</span>
        </label>
        <button onClick={this.props.deleteHabit} type="button"><img className="close" src={close} alt="close"></img></button>
      </div>
    );
  }
}

export default Habit;
