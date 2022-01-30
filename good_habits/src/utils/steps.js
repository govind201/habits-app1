
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

const defaultSteps = [
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

module.exports =  {
    firstTimeSteps,
    defaultSteps
};