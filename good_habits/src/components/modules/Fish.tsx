import React from 'react';
import {fishConstants} from "../../utils/variables"

let horizontal = ['left', 'right'];
let vertical = ['up', 'down'];

const initialState = {
    hPosition: Math.random() * 
    (window.innerWidth - fishConstants.maxScaleFactor* fishConstants.imageWidth),
  hDirection: horizontal[Math.floor(Math.random() * horizontal.length)],
  hVelocity: 2,

  vPosition: Math.random() * 
    (window.innerHeight -fishConstants.maxScaleFactor* fishConstants.imageHeight),
  vDirection: vertical[Math.floor(Math.random() * vertical.length)],
  vVelocity: 1,
}


export default function Fish() {
    const [motion, setMotion] =  React.useState(initialState);


    React.useEffect(()=>{
      let intervalId = setInterval(tick, fishConstants.tickInterval);
      return ()=>{
        clearInterval(intervalId);
      }
    })

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

    function move () {
       let { hDirection, vDirection} = motion;  // what do do with velocity ??


       if (motion.hPosition > 
        (window.innerWidth - fishConstants.maxScaleFactor* fishConstants.imageWidth)) {
        hDirection = 'right';
      } else if (motion.hPosition < fishConstants.maxScaleFactor* fishConstants.imageWidth) {
        hDirection = 'left';
      }
  
      if (this.state.y > 
        (motion.vPosition - fishConstants.maxScaleFactor * fishConstants.maxScaleFactor )) {
        vDirection = 'up';
      } else if (motion.vPosition < fishConstants.maxScaleFactor* fishConstants.maxScaleFactor) {
        vDirection = 'down';
      }
       
      setMotion((prevState)=>({
        ...prevState,
        hDirection,
        vDirection
      }))

    }

    function tick() {
         move(); 
         if(Math.random() < fishConstants.ProbToChangeDirection) {
            chooseRandomMovement();
         }
    }
      let yScale = 1;
      let xScale = ( motion.hDirection === 'left' ? yScale : -yScale );
      let fishScale = {transform: `scaleX(${xScale}) scaleY(${yScale})`};
      let fishStyle = { ...fishScale, left: motion.hDirection, top: motion.hDirection, zIndex: 0}
  
    return (
        <div>
        <img className='fish' style={fishStyle} src={this.props.image} alt = "not found" />
            hello from fish component in modules
        </div>
    )
}
