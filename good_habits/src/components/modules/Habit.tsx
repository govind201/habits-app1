import * as  React from 'react';
import { HabitInterface  } from './HabitList';

interface HabitProps extends HabitInterface {
   deleteHabit: ()=> void;
   updateDb: ()=> void;
}


  export const   Habit:React.FC<HabitProps> = ({isDone, deleteHabit, updateDb, content}) => {
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
