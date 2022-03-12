import React, { Component } from "react";

import "../../utilities.css";
import "./Aquarium.css";

import bubble from "./bubble.png";
import Popup from "../modules/Popup.js";
import FishPopup from "../modules/FishPopup.js";
import FishDiePopup from "../modules/FishDiePopup.js";



import ReactInputPosition, {MOUSE_ACTIVATION, TOUCH_ACTIVATION} from "react-input-position";


class Aquarium extends Component {

    constructor(props) {
        super(props);
        this.state = {
          x : 0,
          y: 0,
          placeItem: false,
        }

    }

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());
      }
    
      handleResize() {
        this.setState({
          height: window.innerHeight,
          width: window.innerWidth
        })
      }

      getMouseCoor = (e) => {
        this.setState({
          x : e.nativeEvent.clientX,
          y: e.nativeEvent.clientY,
          placeItem: true,
        });
      }

      render() {
        
        return (

            <div className="full-window">
            
            <div className="both-buttons">
              <div></div>
              <div></div>
              <div></div>
              <div className="button-container" data-tut="feedfishbutton">
                <button onClick={this.props.pickFish ? this.props.pickingFish : this.props.checkifFed}
                   >Feed fish</button>
              </div>
              <div className="button-container" data-tut="placeitemsbutton">
                <button onClick={this.props.showPopup ? this.props.togglePopup  : this.props.pickingFish}>Place Items</button>
              </div>
            
              </div>


        {!this.props.fishDie ? null : <FishDiePopup onCloseFDP={this.props.closeFishDiePopup} popText = {this.props.popText} deadFish={this.props.deadFish} displayFish={this.props.displayFish}></FishDiePopup>}
        {this.props.showPopup ? <Popup popText={this.props.popText}
          onCloseP={this.props.togglePopup}>
        </Popup> : null}
        {this.props.pickFish ? <FishPopup onCloseFP={this.props.pickingFish} addAllFish = {this.props.addAllFish} availFish = {this.props.notplaced} addingFish ={byfish => this.props.addingFish(byfish)} displayFish = {this.props.displayFish}></FishPopup> : null}
            <div className='water' style={{ ...this.state, zIndex:-1 }}>
                <div>
                  <img className='bubble' src={bubble} alt="bubble"></img>

                </div>
                <div>
                  <img className='bubble2' src={bubble} alt="bubble"></img>
                </div>
                
              {/* {this.props.releasedHeart ? (!this.state.releasedHeart ? <div>
                <img className="feed-heart" src={heart} alt="heart"></img> </div>
                : null) : null} */}
            </div>
          </div>
        );
      }
    }

export default Aquarium;