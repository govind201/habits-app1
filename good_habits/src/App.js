import './App.css';
import React, {useEffect, useState} from "react";
import { CircleLoader } from 'react-spinners';
import Tour from "reactour";  
import {get, post} from './utils/fetch.js';
import { oneDay, threeDays } from './utils/util';
import doryFish  from "./data/doryfish.png";
import blueYellowFish from "./data/blueyellowfish.png";
import greenYellowPuffer from "./data/greenyellowpuffer.png";
import clownFish from "./data/clownfish.png";
import patch from "./data/patchyfish.png";
import peach from "./data/peachpuffer.png";
import pink from "./data/pinkfish.png";
import purplepeach from "./data/purplepeachfish.png";
import yellowFish from "./data/yellowfish.png";
import algae from "./data/algae.png";
import multiColorFish from "./data/multicolorfish.png";
import plankton from "./data/plankton.png";
import ppfish from "./data/purplepatternedfish.png";
import shrimp from "./data/shrimp.png";
import striped from "./data/stripedfish.png";
import seaHorse from "./data/seahorse.png";
import Habits from './components/pages/Habits';
import Login from './components/pages/Login';
import { firstTimeSteps, defaultSteps as steps } from './utils/steps';
   

function App() {
  const [user, setUser] = useState({userid: '', googleid: ''})
  const [isTourOpen, setIsTourOpen] = useState(true);
  const [completedTutorial, setCompletedTutorial] = useState(false);
  const [notPlacedFishArray, setNotPlacedFishArray] = useState([]);
  const [placedFishArray, setPlacedFishArray] = useState([]);
  const [lastFedObject, setLastFedObject] = useState({});
  const [deadFishArray, setDeadFishArray] = useState([]);
  const [popText, setPopText] =  useState('');
  const [moneyIndicator, setMoneyIndicator] = useState(false);
  const [popup, setPopup] = useState(false);
  const [isFishFed, setIsFishFed] = useState(false);

  
 useEffect( ()=>{
      const  fetch  = async () => {
      const user = await get('/whoami')
      if(user._id) {
        setUser({userid: user._id, googleid: user.googleid});
        const resId = await get('/api/tutorial',{googleid: user.googleid})

        if(resId == null) {
          setCompletedTutorial(false);
          setIsTourOpen(true);
        }
        else{
          setCompletedTutorial(true);
          setIsTourOpen(false);
        }
        const notPlacedFishArray  = await get('/api/buyfish', {googleid: user.googleid}); 
          setNotPlacedFishArray(notPlacedFishArray);

        const placedFishArray = await get('/api/placedFish', {googleid: user.googleid});
        setPlacedFishArray(placedFishArray);
        // Return object of lastFedFish
        const lastFedObject = await get('/api/feedfish', {googleid: user.googleid});
        setLastFedObject(lastFedObject);
        let deadFishArray = []
        if(placedFishArray.length > 0) {
           deadFishArray = await get('/killfish', {googleid: user.googleid});
          setDeadFishArray(deadFishArray);
        }
        const notFedDuration = lastFedObject && Date.now() - Date.parse(lastFedObject.lastFed) 
        if(notFedDuration > threeDays) {
              let lastFedFishIndex =  Math.floor(notFedDuration) / threeDays;
              if(lastFedFishIndex > placedFishArray.length)
                  lastFedFishIndex = placedFishArray.length - 1;
              if(!deadFishArray || (Date.now() - Date.parse(deadFishArray[deadFishArray.length - 1]) > threeDays )) {
                  setDeadFishArray(placedFishArray.slice(0, lastFedFishIndex));
                  setPopText("Because You haven't fed your fish for 3 days, your old fish have died.");
                  // what about fish die toggle tho?
              }
        }
      }
    }
     fetch();
 }, [setUser])

 const handleLogin = async (userToken) =>{
    post("/login", { token: userToken }).then((user) => {

      setUser({ userid: user._id, googleid: user.googleid, });
    });
        const resId = await get('/tutorial',{googleid: user.googleid})

        if(resId == null) {
          setCompletedTutorial(false);
          setIsTourOpen(true);
        }else{
          setCompletedTutorial(true);
          setIsTourOpen(false);
        }
        const notPlacedFishArray = await get('/buyfish', {googleid: user.googleid}); 
          setNotPlacedFishArray(notPlacedFishArray);

        const placedFishArray = await get('/placedFish', {googleid: user.googleid});
        setPlacedFishArray(placedFishArray);
        
        // Return object of lastFedFish
        const lastFedObject = await get('feedfish', {googleid: user.googleid});
        setLastFedObject(lastFedObject);
        if(placedFishArray.length > 0) {
          const deadFishArray = await get('/killfish', {googleid: user.googleid});
          setDeadFishArray(deadFishArray);
        }
        const notFedDuration = lastFedObject && Date.now() - Date.parse(lastFedObject.lastFed) 
        if(notFedDuration > threeDays) {
              let lastFedFishIndex =  Math.floor(notFedDuration) / threeDays;
              if(lastFedFishIndex > placedFishArray.length)
                  lastFedFishIndex = placedFishArray.length - 1;
              if(!deadFishArray || (Date.now() - Date.parse(deadFishArray[deadFishArray.length - 1]) > threeDays )) {
                  setDeadFishArray(placedFishArray.slice(0, lastFedFishIndex));
                  setPopText("Because You haven't fed your fish for 3 days, your oldest fish has died.");
              }
            }
             const money = await get("api/money")
          if (money.money == null) {
            await post("api/createMoney")
            setMoneyIndicator(  true  );
          }
        const name = await get("api/name")
          if (name.name == null) {
           await  post("api/newName")
          }
 }        
   const handleLogout = async () => {
     setUser({userid: '', googleid: ''});
     await post('/logout')
   }        

   const checkIfFed  = async () => {
        const lastFedObject = await get('feedfish', {googleid: user.googleid});
        setLastFedObject(lastFedObject);
        if(placedFishArray.length === 0) {
           setPopText("Oops, you don't have any fish in your aquarium");
           togglePopup();
        } 
        else if(lastFedObject.lastFed === 0 || Date.now() - Date.parse(lastFedObject.lastFed) > oneDay)  {
          await post('/feedfish');
           setPopText("Yay, you have fed your fish");
           setIsFishFed(true);
           togglePopup();
        }
        else {
          togglePopup();
           setPopText("You have already fed your fish in the last day");

        }

   }  
     
   const togglePopup = ()=> {
        setPopup((curr) => !curr);
   }
  //  const pickingFish = () => {
  //    console.log("Fish is being picked");
  //  }

   const sellFish = (fish) => {
       const idx = placedFishArray.indexOf(fish);
       setPlacedFishArray(currArray => currArray.splice(idx, 1));
   }       
  const addingFish  = (newFish  ) => {
    const idx = notPlacedFishArray.indexOf(newFish);
    setPlacedFishArray(placedFishArray => [...placedFishArray, newFish])
    setNotPlacedFishArray(currArray => currArray.splice(idx, 1));
    const [type, price] = newFish;
    const body = {type, price, googleid: user.googleid};
    post('/placefish', body);
    post('/removefish', body);
  }
  const addAllFish = () => {
    for (let idx = 0; idx < notPlacedFishArray.length; idx++){
      let {type, price} = notPlacedFishArray[idx];
      const body = {type, price, googleid: user.googleid};
      post("/api/placefish", body);
      post("/api/removefish", body);
    }
    setNotPlacedFishArray([]);
    setPlacedFishArray(placedFishArray => [...placedFishArray, notPlacedFishArray])
  }
  const buyFish = (newFish) => {
        setNotPlacedFishArray(currArray => [...currArray, newFish]); 
  }
                 
  const closeTour = () => {
     setIsTourOpen(false);
     if(!completedTutorial) {
       const body = {googleid: user.googleid};
       post('/tutorial', body);
       setCompletedTutorial(true);
     }
  }
  const openTour = () => {
        setIsTourOpen(true);
  }
  const displayFish = (fishName) => {
    if(fishName === 'doryfish') 
        return  doryFish;
    else if (fishName === 'blueyellowfish') {
      return blueYellowFish; 
    }
    else if (fishName === 'greenyellowpuffer') {
      return greenYellowPuffer; 
    }
    else if (fishName === 'patchyfish') {
      return patch;
    }
    else if (fishName === 'peachpuffer') {
      return peach;
    }
      else if (fishName === 'pinkfish') {
        return pink;
    }
    else if (fishName === 'purplepeachfish') {
      return purplepeach;
    }
    else if (fishName === 'clownfish') {
      return  clownFish; 
    }
    else if (fishName === 'yellowfish') {
      return yellowFish;
    }
    else if (fishName === 'algae'){
      return algae;
    }
    else if (fishName === 'multicolorfish'){
      return multiColorFish; 
    }
    else if (fishName === 'plankton'){
      return plankton;
    }
    else if (fishName === 'purplepatternedfish'){
      return ppfish;
    }
    else if (fishName === 'shrimp'){
      return shrimp;
    }
    else if (fishName === 'stripedfish') {
      return striped;
    }
    else if (fishName === 'seahorse') {
      return seaHorse;
    }
  }
     
  return (
    <div className="App">
      {!user.userid &&
      <Login handleLogin = {() => handleLogin()} />
      }
      (!completedTutorial  ||   isTourOpen) ?
      <CircleLoader />:
      <Tour
  
      steps = {completedTutorial ? steps: firstTimeSteps}
      idx = {0}
      isOpen = {isTourOpen}
      onRequesClose= {closeTour}
       />
      <Habits moneyIndicator = {moneyIndicator} />

    </div>
  )
  }
export default App;