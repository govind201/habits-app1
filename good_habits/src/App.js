import './App.css';
import React, {useEffect, useState} from "react";
import { get, post } from './utils/fetch';
import { socket } from './socketio-client';
import { oneDay, threeDays } from './utils/util';
import doryFish from "./data/doryFish";
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
import turtle from "./data/turtle.png";
import octopus from "./data/octopus.png";
import seaHorse from "./data/seahorse.png";

   const firstTimeSteps = [
  {
    selector: '',
    content: "Welcome to Habit Aquarium! Let's go through a quick introduction. You can use the arrows (or arrow keys) to navigate.",
  },
  {
    selector: '[data-tut="navbarhabits"]',
    content: "Let's get started with some habits. Click here to navigate to the Habits page and then continue the tutorial.",
  },
  {
    selector: '[data-tut="newhabit"]',
    content: "Time to create your first daily habit! Think of something you'd like to do every day, then hit enter or use the + to add your habit.",
    action: node => {
      // by using this, focus trap is temporary disabled
    },
  },
  {
    selector: '[data-tut="habittabs"]',
    content: "Switch between tabs to add goals you'd like to complete every day, week, or month."
  },
  {
    selector: '[data-tut="habitbalance"]',
    content: "Maintaining monthly habits will earn you more sand dollars than weekly, which will earn more than daily.",
  },
  {
    selector:'[data-tut="navbarstore"]',
    content: "What can you do with sand dollars? Our friendly fish store associate, Ray, will be happy to talk to you after this tutorial! Catch him on the Store page later.",
    disableInteraction: true,
  },
  {
    selector:'[data-tut="navbaraquarium"]',
    content: "Let's take a look at your aquarium. This is where all your fish will live!",
  },
  {
    selector: '[data-tut="placeitemsbutton"]',
    content:"Place items you've bought into your aquarium using the place items button.",
    
  },
  {
    selector:'[data-tut="feedfishbutton"]',
    content: "Remember to feed your fish everyday! If you don't feed your fish in 3 days, your oldest fish dies.",
  },
  {
    selector:'[data-tut="navbarinventory"]',
    content:"Got too many fish? Sell some back to Ray on the Inventory page!",
    disableInteraction: true,
  },
  {
    selector:'',
    content:"We've given you 10 sand dollars to help you get your aquarium started! Best of luck building new habits!",
  },
  {
    selector:'[data-tut="tourbutton"]',
    content: "If you ever need a refresher on maintaining your aquarium, you can access the tour here at any time."
  }
];

const steps = [
  {
    selector:'',
    content: "Welcome back! You've seen this before, so if at any time you'd like to explore on your own, feel free to exit the tutorial at any point or skip to any tutorial page using the dots below.",
  },
  {
    selector: '[data-tut="navbarhabits"]',
    content: "Let's get started with some habits. You can also jump to pages on the tutorial by clicking the dots below. Click here to navigate to the Habits page and then continue the tutorial.",
  },
  {
    selector: '[data-tut="newhabit"]',
    content: "Create habits by typing them in this field. Hit enter or use the + to add your habit.",
    action: node => {
      // by using this, focus trap is temporary disabled
    },
    //disableInteraction: false,
  },
  {
    selector: '[data-tut="habittabs"]',
    content: "Switch between tabs to add goals you'd like to complete every day, week, or month."
  },
  {
    selector: '[data-tut="habitbalance"]',
    content: "Maintaining monthly habits will earn you more sand dollars than weekly, which will earn more than daily.",
  },
  {
    selector:'[data-tut="navbarstore"]',
    content: "What can you do with sand dollars? Talk to Ray, our friendly fish store associate to buy fish for your aquarium.",
  },
  {
    selector:'[data-tut="navbaraquarium"]',
    content: "Let's take a look at your aquarium. This is where all your fish will live!",
  },
  {
    selector: '[data-tut="placeitemsbutton"]',
    content:"Place items you've bought into your aquarium using the place items button.",
    
  },
  {
    selector:'[data-tut="feedfishbutton"]',
    content: "Remember to feed your fish everyday! If you don't feed your fish in 3 days, your oldest fish dies.",
  },
  {
    selector:'[data-tut="navbarinventory"]',
    content:"Got too many fish? Sell some back to Ray on the Inventory page!",
    disableInteraction: true,
  },
  {
    selector:'[data-tut="tourbutton"]',
    content: "If you ever need a refresher on maintaining your aquarium, you can access the tour here at any time."
  },
  {
    selector:'',
    content: "Don't forget to invite your friends to create their own habit aquariums! If you have any feedback, let us know at habitaquariumfeedback@gmail.com",
  }
]


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
        const resId = await get('/tutorial',{googleid: user.googleid})

        if(resId == null) {
          setCompletedTutorial(false);
          setIsTourOpen(true);
        }else{
          setCompletedTutorial(true);
          setIsTourOpen(false);
        }
        const notPlacedFishArray  = await get('/buyfish', {googleid: user.googleid}); 
          setNotPlacedFishArray(notPlacedFishArray);

        const placedFishArray = await get('/placedFish', {googleid: user.googleid});
        setPlacedFishArray(placedFishArray);
        
        // Return object of lastFedFish
        const lastFedObject = await get('feedfish', {googleid: user.googleid});
        setLastFedObject(lastFedObject);
        let deadFishArray = 0;
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
                  setPopText("Because You haven't fed your fish for 3 days, your oldest fish has died.");
                  // what about fish die toggle tho?
              }
        }
      }
    }
     fetch();
 }, [setUser])

 const handleLogin = async (res) =>{
          const userToken = res.tokenObj.id_token;
    post("/login", { token: userToken }).then((user) => {
      setUser({ userId: user._id, gId: user.googleid, });
    });
      await post("/initsocket", { socketid: socket.id });
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
     setUser({userId: null, googleid: null});
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
   const pickingFish = () => {
     console.log("Fish is being picked");
   }

   const sellFish = (fish) => {
       const idx = placedFishArray.indexOf(fish);
       setPlacedFishArray(currArray => currArray.splice(idx, 1));
   }       
  const addingFish  = (newFish) => {
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
    else if (fishName === 'turtle'){
      return turtle;
    }
    else if (fishName === 'octopus'){
      return octopus;
    }
    else if (fishName === 'seahorse') {
      return seaHorse;
    }
  }
     
  return (
    <div className="App">
       {!user.userid  ? <Login  handleLogin = {handleLogin}/>:
       (!completedTutorial || isTourOpen) ? <CircleLoaded /> 
       : <div>
       <Tour
        steps={completedTutorial ? steps : firstTimeSteps}
        closeWithMask={completedTutorial ? true : false}
        startAt={0}
        isOpen={isTourOpen}
        onRequestClose={closeTour} 
        />
          <div className="App-container">
          <NavBar
            handleLogin={ handleLogin}
            handleLogout={handleLogout}
            userId={user.userid}
          />

<div className="fishies">
            {this.state.placedfish.map((f,i) => (
              f.type === 'octopus' ? <LargeFish key={i} image={this.displayFish(f.type)}/> : 
              <Fish key={i} image={this.displayFish(f.type)}/>
            ))}
            </div>
          
          <Router>
            <Aquarium
              path="/"
              fishlist={placedFishArray}
              checkifFed={checkIfFed}
              pickingFish = {pickingFish}
              popup = {popup}
              popText = {popText}
              togglePopup = {togglePopup}
              notPlacedFishArray = {notPlacedFishArray}
              addingFish = {addingFish}
              displayFish = {displayFish}
              addAllFish = {addAllFish}
              deadFishArray = {deadFishArray}
              isFishFed = {isFishFed}
              />
            <Habits
              path="/habits"
              fishList={this.state.placedfish}
              displayFish = {this.displayFish}
              moneyIndicator = {moneyIndicator}
            />
            <Store
              path="/store"
              buyFish = {buyFish}
              displayFish = {displayFish}
              fishList={placedFishArray}
              togglePopup = {togglePopup}
              moneyIndicator = {moneyIndicator}
              />
            <Inventory
              path="/inventory"
              fishList = {placedFishArray}
              displayFish = {displayFish}
              gId = {user.googleid}
              sellFish = {sellFish}
              />
            <NotFound default />
          </Router> 
          <button className="tour-button" data-tut="tourbutton" onClick={this.openTour}>Tour</button>
          <div className="signature">
            made with love (and lots of fish) by Claire, Andrea, and Cindy
          </div>
        </div>
      
       </div>
       }
      <header className="App-header">
        Header
      </header>
    </div>
  )
  }
export default App;