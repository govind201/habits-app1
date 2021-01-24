import React, { Component } from "react";
import { get, post } from "../../utilities";
import sanddollar from "../data/sanddollar.png";

import "./InventoryCard.css";

class InventoryCard extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = (e) => {
    e.preventDefault();
};


  render() {
    return (
            <div onClick={() => this.props.clickFx(this.props.fish)} className="InventoryCard square u-pointer">
                <div className="content u-textCenter u-pointer">
                    <img src={this.props.displayFish(this.props.fish.type)} width="100%" ></img>
                    <div className="InventoryCard-title">
                        <div className="InventoryCard-name">
                            {this.props.fish.name}
                        </div>
                        
                        <div className="InventoryCard-price">
                        <span>{this.props.fish.price}</span>
                          <span><img src={sanddollar} style={{display:"inline-block", width:"20px", height:"20px", margin: "5px 0 -5px 0"}}></img></span>
                          
                            
                        </div>
                    </div>
                
                </div>    
            </div>
    );
  }
}

export default InventoryCard;