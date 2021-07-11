import React from 'react';

export default function Habit({isDone, delteHabit}) {
  const handleInputChanged = () => {

  }
    return (
           <div>
              <lable className="habit-lable">
        <div className = "habit-container">
                  <input type="checkbox"
                   defaultChecked= {isDone}
                   onChange={handleInputChanged}
                   />
                   <span className="checkmark"></span>
                   <span className="habit"></span>
              </div>
              </lable>
              <button onClick={delteHabit} type="button"><img className="delete" alt="..loading" /> </button>
           </div>
    )
}
