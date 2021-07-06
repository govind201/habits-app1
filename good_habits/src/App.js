import './App.css';
import React, {useEffect, useState} from "react";
import { get, post } from './utils/fetch';
import { socket } from './socketio-client';
import { threeDays } from './utils/util';

   const CLIENT_ID = '600958172796-05nnr8dkvl4h6u9hm4r6lc6slt3plhfh.apps.googleusercontent.com';
   const tutorial = [
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
  const [completeTutotial, setCompletedTutorial] = useState(false);
  const [notPlacedFish, setNotPlacedFish] = useState(0);
  const [placedFishArray, setPlacedFishArray] = useState([]);
  const [lastFedObject, setLastFedObject] = useState({});
  const [deadFishArray, setDeadFishArray] = useState([]);
  const [popText, setPopText] =  useState('');
  const [moneyIndicator, setMoneyIndicator] = useState(false);
  const [popUp, setPopUp] = useState(false);
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
        const notPlacedFish = await get('/buyfish', {googleid: user.googleid}); 
          setNotPlacedFish(notPlacedFish);

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
        const notPlacedFish = await get('/buyfish', {googleid: user.googleid}); 
          setNotPlacedFish(notPlacedFish);

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
                  // what about fish die toggle tho
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
           togglePopUp();
        } 
        else if(lastFedObject.lastFed === 0) {
          await post('/feedfish');
           setPopText("Yay, you have fed your fish");
           setIsFishFed(true);
           togglePopUp();
        }

   } 
     
   const togglePopUp = ()=> {
        setPopUp((curr) => !curr);
   }
         
  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  )
  }
export default App;