// import express from 'express';
// import auth from '../auth.js';
// import User from '../entity/user.ts';
// import Fish from '../entity/fish.ts';
// import Owns from '../entity/owns.ts';
// import Habit from '../entity/habit.ts';

const express =  require('express');
const auth = require('../auth.js');
const User = require('../entity/user.ts');
const Fish = require('../entity/fish.ts');
const Owns = require('../entity/owns.ts');
const Habit = require('../entity/habit.ts');
// import { getRepository } from "typeorm";



const router = express.Router();

router.post('/login', auth.login);
router.post('/logout', auth.logut);

// fetch the user from the db
router.get("/me", (req, res)=>{
    let result = req.user ? req.user : {};
    res.send(result);
});

// return whether user has watched the tutorial or not 
router.get("/tutorial", async (req,res) => {
let user = await User.findOne({googleid: req.query.googleid})
    let googleId = user ? user : null;
    res.send(googleId);
});

  // set set_user_tut : true;
  router.post("/tutorial", (req,res) =>{
    User.update({is_tutorial_done: true}).catch(err=>console.error(err));
  })

  // return the fish to be fed;
  //BIG TODO
  router.get("/feedfish", (req, res) => {
       Fish.find({googleid: req.query.googleid}).then((ff) => {
        res.send(ff);
    });
  });

 // set new fish to be fed;  adding a fish in to_be_fed_fish;
 // NO, I think this means fish is now fed;
  router.post("/feedfish", async (req, res) => {
    let feedFish =  await Fish.findOne({
      google_id: req.user.googleid,
    });
    feedFish.last_fed = Date.now();
    feedFish.save().then(f=>res.send(f)).catch(err => console.error(err));
  });

  // TODO: getting the fish I have bought
  router.get("/buyfish", async(req, res) => {
    let fish = await Owns.find({google_id: req.query.googleId});
    res.send(fish);
  });
  
  // buying  a new fish for the user
  // TODO: check the arguments passed from the frontend; 
  router.post("/buyfish",  async(req, res) => {
    // const fish = await  
    const newfish = new Fish({
      type: req.body.type,
      price: req.body.price,
      google_id: req.body.googleId
    });
    newfish.save().then((f) => {
      res.send(f);
    });
  })

  // get habits of the given type
  router.get("/habit", (req, res) => {
    Habit.find({ "creator_id": req.user._id, "type": req.query.type}).then((habits) => {
      res.send(habits);
    });
  })
  
  // set a habit of the given type in db
  router.post("/habit", (req, res) => {
    const newHabit = new Habit({
      creator_id: req.user._id,
      content: req.body.content,
      type: req.body.type,
      date: new Date(),
    });
    newHabit.save().then((habit) => {
      res.send(habit);
    });
  })
  
  // update  habit status i.e, whether it is done or not;
  router.post("/updateHabit", async(req, res) => {
    
    let habit  = await Habit.findOne({habit_id: req.body.id});

    habit.is_done = !habit.is_done;
    habit.save().then(habit=> res.send(habit)).catch(err => console.error(err));
  })
  
  // delete a habit for the given  use
  router.post("/deleteHabit", (req, res) => {
    Habit.delete({"_id": ObjectID(req.body.id)}).then((habit) => res.send(habit));
  })

  // Increment money for the given user 
  router.post("/incrementMoney", async(req, res) => {
    let user = await User.findOne({user_id: req.user._id});
 
    user.money += req.money.amount;
    user.save().then(user => res.send(user)).catch(err => console.error(err));
  })
  

  
 // Get all fish that can be bought; 
  router.get("/allfish", async (req, res) => {
    const dateNow = new Date();
    const dateNowString = `aaaaaa${dateNow.getFullYear()}${dateNow.getMonth()}${dateNow.getDate()}`
    let allFish = [ 
      {
      "type": "stripedfish",
      "price": 35,
      "name": "Stripey",
    },{
      "type": "shrimp",
      "price": 3,
      "name": "Shrimp",
    },{
      "type": "purplepatternedfish",
      "price": 20,
      "name": "Porple",
    },{
      "type": "plankton",
      "price": 1,
      "name": "Mr. Plankton",
    },{
      "type": "patchyfish",
      "price": 25,
      "name": "Ms. Patch",
    },{
      "type": "multicolorfish",
      "price": 20,
      "name": "Very Many Colors",
    },{
      "type": "algae",
      "price": 1,
      "name": "Algae",
    },{
      "type": "doryfish",
      "price": 10,
      "name": "Dory",
    }, {
      "type": "blueyellowfish",
      "price": 5,
      "name": "Blue Yellow Angel",
    },{
      "type": "clownfish",
      "price": 30,
      "name": "Finding Nemo",
    },
    {
      "type": "greenyellowpuffer",
      "price": 15,
      "name": "Green Puffer",
    },
    {
      "type": "peachpuffer",
      "price": 10,
      "name": "Peach Puffer",
    },
    {
      "type": "pinkfish",
      "price": 5,
      "name": "Pink Angel",
    },
    {
      "type": "purplepeachfish",
      "price": 5,
      "name": "Purple Peach Angel",
    },
    {
      "type": "yellowfish",
      "price": 5,
      "name": "Yellow Angel",
    },
    {
      "type": "seahorse",
      "price": 80,
      "name": "Ms. Seahorse",
    },
  ];
    let todaysFish = allFish;
    res.send(todaysFish);
  });
  
  // Get money for the user;
  router.get("/money", (req, res) => {
    User.findOne({"creator_id": req.user._id }).then((m) => {
      let result = m ? m : null;
      res.send({money: result});
    });
  });
 
 // Update the money for the user 
  router.post("/money", async(req, res) => {
    let user = await User.findOne({"creator_id": req.user._id });
    user.money = req.body.money;
    user.save().then(money => res.send(money)).catch(err => console.error(err));
  })
  
  //Place fish in the aquarium;
  router.get("/placefish", async(req, res) => {
    let fish = await Fish.find({where: {
      is_placed: false,
      google_id: req.query.googleId,
    }});
    res.send(fish);
  });
  
  router.post("/placefish", async(req, res) => {
    let fish = await Fish.findOne({where: {
       google_id: req.query.googleId,
       type: req.body.type
    }});
    fish.placed_fish = fish.placed_fish - 1;
    if(fish.placed_fish == 0) {
      fish.is_placed = true;
    }
    fish.save().then(res => res.send(res)).catch(err => console.err(err));
  });
 // remove fish from almost bought one ;
  router.post("/removeFish", async(req, res) => {
    let fish = await Fish.findOne({where: {
       google_id: req.query.googleId,
       type: req.body.type
    }});
    if(!fish.is_placed) {   // Still have fish not placed of this type
       fish.placed_fish = fish.placed_fish - 1; 
      fish.save().then(res => res.send(res)).catch(err => console.err(err));
    }
    res.send(null);
  });
  
  router.post("/deadFish", (req, res) => {
    MyFish.deleteOne({"type": req.body.type, "googleid": req.body.googleid}).then ((deleted) => {
      res.send(deleted);
    });
  });
  
  // kill a fish: decrement one instance of fish from the owns table;
  router.post("/killFish", (req, res) => {
    const deadFish = new DeadFish({
      type: req.body.type,
      googleid: req.body.googleid,
      timestamp: Date.now(),
    })
    deadFish.save().then((f) => res.send(f));
  });
  
  
// TODO: THE TESTING OF ROUTES IN POSTMAN.IO
module.exports = router;