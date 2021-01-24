import React, { Component } from "react";
import SingleMessage from "../modules/SingleMessage.js";
import { get, post } from "../../utilities";
import { Link } from "@reach/router";
import {css} from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";
import StorePopup from "../modules/StorePopup.js";
import sanddollar from "../data/sanddollar.png";


import "../../utilities.css";
import "./Store.css";
import CustomChatbot from "../modules/CustomChatbot.js";
import Fish from "../modules/Fish.js";
import { createHistory } from "@reach/router";

//import { get } from "mongoose";

const override = css`
  display: block;
  margin: 30px auto;
  border-color: red;
`;

class Store extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fishtoday: [],
            money: -1,
            messages: [],
            name: "#@!",
          random: Math.random(),
          conversationRestartEligible: false,
          showChat: true,
          showStorePopup: false,
        }
        this.changeMoney = this.changeMoney.bind(this);
        this.changeName = this.changeName.bind(this);
      this.endConversation = this.endConversation.bind(this);
      this.restartConversation = this.restartConversation.bind(this);
    }

    // loadMessageHistory(value) {
    //     get("/api/chat").then((messages) => {
    //       this.setState({
    //         messages : messages,
    //       });
    //     });
    //   }

    componentDidMount(){
        get("/api/todaysfish").then((res) => {
            this.setState({
              fishtoday: res,
            });
          });
        // this.loadMessageHistory();

        get("/api/money").then((res) => {
            if(typeof res.money==='undefined' || res.money==null){
                const body = { money: 0};
                post("/api/money", body);
                this.setState({
                  money: 0,
                });
            } else {
                this.setState({
                  money: res.money,
                });
            };
        });
        get("/api/name").then((res) => {
          if(typeof res.name=='undefined' || res.name==null){
              const body = { name: null};
              post("/api/name", body);
              this.setState({
                name: null,
              });
          } else {
              this.setState({
                name: res.name,
              });
          };
      });

    }

    componentDidUpdate(prevProps) {

      const {tutorialMoneyIndicator} = this.props;
  
      if (prevProps) {
        if (prevProps.tutorialMoneyIndicator !== tutorialMoneyIndicator) {
          get("/api/money").then((moneyObj) => {
            this.setState( { money: moneyObj.money });
          });
        }
      }
    }
  

    changeMoney(price, previousmoney){

      post("/api/incrementMoney", {amount: -price}).then((money) => {
        this.setState({
          money: this.state.money - price,
        });
    });
    }

  endConversation() {
      this.setState({
        conversationRestartEligible: true
      })
  }

  toggleStorePopup = () => {
    this.setState({
      showStorePopup : !this.state.showStorePopup
    })
  }

  restartConversation() {
      this.setState({
        random: Math.random(),
        showChat: false,
        name: this.state.name,
      })
    const contextThis = this;
    setTimeout(() => {
      contextThis.setState({
        showChat: true,
        conversationRestartEligible: false
      })
    }, 500)
  }

    changeName(nameObj){
      post("/api/name", {name: nameObj}).then((name)=>{
        this.setState({
          name: nameObj,
        });
      });
    }


    addMessage(data){//work in progress
        this.setState((prevstate) => ({
            messages: prevstate.activeChat.messages.concat(data),

          }));

      }

    sendMessage = (value) => {
        const body = { recipient: this.props.recipient, content: value };
        post("/api/message", body);
    };

    render() {
        return (
      <>
      <div className="popup-holder">
        {(this.state.conversationRestartEligible ? (
          <StorePopup popText="Return to your Aquarium or talk to Ray again!"
          onCloseP={this.toggleStorePopup} restart={this.restartConversation} ></StorePopup>
        ) : null)}
        </div>

        <div className = "Money">
          {this.state.money}
          <img src={sanddollar} alt="sanddollar"></img>
        </div>
        <div className="ChatContainer" style={{"padding-top": "60px"}}>
          {(this.state.fishtoday.length > 0 && this.state.money > -1 && this.state.name != "#@!" && this.state.showChat) ?
            <CustomChatbot name={this.state.name}
                           changeName={this.changeName}
                           displayFish={this.props.displayFish}
                           changeMoney = {this.changeMoney}
                           fish={this.state.fishtoday}
                           boughtFish={this.props.boughtFish}
                           money={this.state.money}
                           randomState={this.state.random} // Adding a random state to force refresh when needed
                           endConversationCallback={this.endConversation}
            /> : 
            <CircleLoader
              css={override}
                size={150}
                color={"white"}
              />
        }</div>


      </>

        );
    }

}

export default Store;
