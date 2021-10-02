import React from 'react';
import {fishConstants} from "../../utils/variables"

let horizontal = ['left', 'right'];
let vertical = ['up', 'down'];

const initialState = {
    horizontal: Math.random() * 
    (window.innerWidth - fishConstants.maxScaleFactor* fishConstants.imageWidth),
  hDirection: horizontal[Math.floor(Math.random() * horizontal.length)],
  hVelocity: 2,

  vertical: Math.random() * 
    (window.innerHeight -fishConstants.maxScaleFactor* fishConstants.imageHeight),
  vDirection: vertical[Math.floor(Math.random() * vertical.length)],
  vVelocity: 1,
}


export default function Fish() {
    const [motion, setMotion] =  React.useState(initialState);

    function chooseRandomMovement() {
        let hVelocity = Math.random() *fishConstants.maxHorizontalVelocity;
        let vVelocity = Math.random() * fishConstants.maxVerticalVelocity;
        let hDirection = Math.random() < 0.5 ? 'right' : 'left';
        let vDirection = Math.random() < 0.5 ? 'up' : 'down';

       setMotion((prevState) =>  ({
           ...prevState,
           hVelocity,
           vVelocity,
           hDirection,
           vDirection
       }));

       
      }

    return (
        <div>
            hello from fish component in modules
        </div>
    )
}
