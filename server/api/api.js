import express from 'express';
import auth from '../auth';
import User from '../entity/user';
import Fish from '../entity/fish';
import {createQueryBuilder} from 'typeorm';


const router = express.Router();

router.post('/login', auth.login);
router.post('/logout', auth.logut);

// fetch the user from the db
router.get("/me", (req, res)=>{
    let result = req.user ? req.user : {};
    res.send(result);
});

// return whether user has watched the tutorial or not 
router.get("/tutorial",(req,res) => {
    User.findOne({googleid: req.query.googleid}).then((user) =>{
      if (!user) {
        res.send({googleid: null});
      }
      else {
        res.send(user);
      }
    });
  });

  // set set_user_tut : true;
  router.post("/tutorial", (req,res) =>{
      // set user.is_done_tut: true;
  })

  // return the fish to be fed;
  router.get("/feedfish", (req, res) => {
       Fish.find({googleid: req.query.googleid}).then((ff) => {
      res.send(ff);
    });
  });

 // set new fish to be fed; 
  router.post("/feedfish", (req, res) => {
    const feed = new FedFish({
      name: req.user.name,
      googleid: req.user.googleid,
      lastfed: Date.now(),
    });
    feed.save().then((f) => res.send(f));
  });

  // TODO: getting the fish I have bought
  router.get("/buyfish", (req, res) => {
    AlmostMyFish.find({googleid: req.query.googleid}).then((ff) => {
      res.send(ff);
    });
  });
  
  // buying  a new fish for the user
  router.post("/buyfish", (req, res) => {
    const newfish = new AlmostMyFish({
      type: req.body.type,
      googleid: req.user.googleid,
      price: req.body.price,
    });
    newfish.save().then((f) => {
      res.send(f);
    });
  })

  // get habits of the given type
  router.get("/habit", (req, res) => {
    Habit.find({ "creator_id": req.user._id, "type": req.query.type }).then((habits) => {
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
  router.post("/updateHabit", (req, res) => {
    Habit.updateOne(
      {"_id": ObjectID(req.body.id)},
      {$set: {isDone: req.body.isDone, date: req.body.date}},
    ).then((habit) => res.send(habit));
  })
  
  // delete a habit for the given  use
  router.post("/deleteHabit", (req, res) => {
    Habit.deleteOne({"_id": ObjectID(req.body.id)}).then((habit) => res.send(habit));
  })

  // Increment money for the given user 
  router.post("/incrementMoney", (req, res) => {
    Money.updateOne(
      {"creator_id": req.user._id},
      {$inc: {money: req.body.amount}}
    ).then((money) => res.send(money));
  })
  

  
 // Get all fish that can be bought; 
  router.get("/allfish", async (req, res) => {
    const dateNow = new Date();
    const dateNowString = `aaaaaa${dateNow.getFullYear()}${dateNow.getMonth()}${dateNow.getDate()}`
    const todayFishes = await TodayFish.findOne({date: dateNowString});
    if (todayFishes !== null) {
      return res.json(todayFishes.fishes);
    }
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
    await TodayFish.create({
      date: dateNowString,
      fishes: todaysFish
    })
  
    res.send(todaysFish);
  });
  
  // Get money for the user;
  router.get("/money", (req, res) => {
    Money.findOne({"creator_id": req.user._id }).then((m) => {
      if (m === null) {
        res.send({money: null});
      }
      else {
        res.send(m);
      }
  
    });
  });
 
  
  
  router.post("/money", (req, res) => {
    Money.updateOne(
      {"creator_id": req.user._id},
      {$set: {money: req.body.money}}
    ).then((money) => res.send(money));
  })
  
  router.get("/placefish", (req, res) => {
    MyFish.find({googleid: req.query.googleid}).then((ff) => {
      res.send(ff);
    });
  });
  
  router.post("/placefish", (req, res) => {
    const aquafish = new MyFish({
      type: req.body.type,
      googleid: req.user.googleid,
      price: req.body.price,
    });
    aquafish.save().then((f) => {
      res.send(f);
    });
  });
  
  router.post("/removeFish", (req, res) => {
    AlmostMyFish.deleteOne({"type": req.body.type, "googleid": req.body.googleid}).then ((deleted) => {
      res.send(deleted);
    });
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
  
