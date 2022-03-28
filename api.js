/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const FedFish = require("./models/fedfish.js");
const Habit = require("./models/habit.js");
const Message = require("./models/message.js");
const MyFish = require("./models/myfish.js");
const AlmostMyFish = require("./models/almostmyfish.js");
const AllFish = require("./models/allfish.js");
const Money = require("./models/money.js");
const TodayFish = require("./models/todayfish.js");
const Name = require("./models/name.js");
const DeadFish = require("./models/deadfish.js");
const Tutorial = require("./models/tutorial.js");

const ObjectID = require('mongodb').ObjectID;

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socket = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socket.addUser(req.user, socket.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// anything else falls to this "not found" case

router.get("/tutorial",(req,res) => {
  Tutorial.findOne({googleid: req.query.googleid}).then((lol) =>{
    if (lol === null) {
      res.send({googleid: null});
    }
    else {
      res.send(lol);
    }
  });
});

router.post("/tutorial", (req,res) =>{
  const name = new Tutorial({
    googleid: req.user.googleid,
  });
  name.save();
})

router.get("/feedfish", (req, res) => {
  FedFish.find({googleid: req.query.googleid}).then((ff) => {
    res.send(ff);
  });
});

router.post("/feedfish", (req, res) => {
  const feed = new FedFish({
    name: req.user.name,
    googleid: req.user.googleid,
    lastfed: Date.now(),
  });
  feed.save().then((f) => res.send(f));
});

router.get("/buyfish", (req, res) => {
  AlmostMyFish.find({googleid: req.query.googleid}).then((ff) => {
    res.send(ff);
  });
});

router.get("/habit", (req, res) => {
  Habit.find({ "creator_id": req.user._id, "type": req.query.type }).then((habits) => {
    res.send(habits);
  });
})

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

router.post("/updateHabit", (req, res) => {
  Habit.updateOne(
    {"_id": ObjectID(req.body.id)},
    {$set: {isDone: req.body.isDone, date: req.body.date}},
  ).then((habit) => res.send(habit));
})

router.post("/deleteHabit", (req, res) => {
  Habit.deleteOne({"_id": ObjectID(req.body.id)}).then((habit) => res.send(habit));
})

// TODO: will not pass a security review. fix.
router.post("/incrementMoney", (req, res) => {
  Money.updateOne(
    {"creator_id": req.user._id},
    {$inc: {money: req.body.amount}}
  ).then((money) => res.send(money));
})

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


router.get("/todaysfish", async (req, res) => {
  const dateNow = new Date();
  const dateNowString = `aaaaaa${dateNow.getFullYear()}${dateNow.getMonth()}${dateNow.getDate()}`
  const todayFishes = await TodayFish.findOne({date: dateNowString});
  if (todayFishes !== null) {
    return res.json(todayFishes.fishes);
  }
  let allFish = [{
    "type": "turtle",
    "price": 50,
    "name": "Turtle",
  },{
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
    "type": "octopus",
    "price": 100,
    "name": "Mr. Octopus",
  },
  {
    "type": "seahorse",
    "price": 80,
    "name": "Ms. Seahorse",
  },
];
  //randomizes order of allFish array
  // for(let i = allFish.length - 1; i > 0; i--){
  //   const j = Math.floor(Math.random() * i)
  //   const temp = allFish[i]
  //   allFish[i] = allFish[j]
  //   allFish[j] = temp
  // }
  // let todaysFish = allFish.slice(-3);
  // let testfish = [1,2,3];
  let todaysFish = allFish;
  await TodayFish.create({
    date: dateNowString,
    fishes: todaysFish
  })

  res.send(todaysFish);
});

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

router.post("/createmoney", (req, res) => {
  const newMoney = new Money({
    creator_id: req.user._id,
    money: 10,
  });
  newMoney.save().then((money) => {
    res.send(money);
  });
})

router.post("/name", (req, res) => {
  Name.updateOne(
    {"creator_id": req.user._id},
    {$set: {name: req.body.name}}
  ).then((money) => res.send(money));
})

router.post("/newName", (req, res) => {
  const newName = new Name({
    creator_id: req.user._id,
    name: null,
  });
  newName.save().then((name) => {
    res.send(name);
  });
})

router.get("/name", (req, res) => {
  Name.findOne({"creator_id": req.user._id }).then((n) => {
    if (n === null) {
      res.send({name: null});
    }
    else {
      res.send(n);
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

// TODO: an inventory check needs to happen before a new MyFish instance is created
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

router.post("/killFish", (req, res) => {
  const deadFish = new DeadFish({
    type: req.body.type,
    googleid: req.body.googleid,
    timestamp: Date.now(),
  })
  deadFish.save().then((f) => res.send(f));
});

router.get("/killFish", (req, res) => {
  DeadFish.find({googleid: req.query.googleid}).then((f) => {
    res.send(f);
  });
});


router.post("/chat", (req, res) => {
  const newMessage = new Message({
    recipient: req.body.recipient,
    sender: req.body.sender,
    content: req.body.content,
    timestamp: Date.now(),
  })
  newMessage.save().then((f) => res.send(f));

});

router.get("/chat", (req, res) => {
  // get messages that are from me->you OR you->me
  let query = {
      $or: [
        { "sender": req.user._id, "recipient": 'ray' },
        { "sender": 'ray', "recipient": req.user._id },
      ],
    };

  Message.find(query).then((messages) => res.send(messages));
});



router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});



module.exports = router;
