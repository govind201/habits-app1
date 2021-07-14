import * as  React from 'react';

interface HabitProps {
   isDone: boolean; 
   key: string;
   content: string;
   deleteHabit: ()=> void;
 updateHabitStatus: (isDone: boolean)=> void;
}


  export const   Habit: React.FC<HabitProps> = ({deleteHabit, updateHabitStatus, content, isDone})=> {
  const handleInputChanged = () => {

  }
    return (
           <div>

              <label className="habit-lable">
        <div className = "habit-container">
                  <input type="checkbox"
                   defaultChecked= {isDone}
                   onChange={handleInputChanged}
                   />
                   <span className="checkmark"></span>
                   <span className="habit"></span>
              </div>
              </label>
              <button onClick={deleteHabit} type="button"><img className="delete" alt="..loading" /> </button>
           </div>
    )
}
