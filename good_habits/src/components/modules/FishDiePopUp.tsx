import React from 'react';


const FishDiePopup = ({onCloseFDP, displayFish, deadFish, popText}) =>{

    return (
        
      <div className="big-window"  onClick={onCloseFDP}>
        <div className="window" onClick={(event) => event.stopPropagation()}>
            <p> {popText}</p>
            {deadFish.map((f) => (
                <>
                <img src={displayFish(f.type)} alt="fish" height="100%" width="100%"></img>
                </>
            ))}
            
            <button className="closeButton" onClick={onCloseFDP}>
                Close
            </button>
        </div>
      </div>
    );
}


export default FishDiePopup;