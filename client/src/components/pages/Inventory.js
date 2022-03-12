import React, { Component } from "react";

import "../../utilities.css";
import Fish from "../modules/Fish.js";
import InventoryCard from "../modules/InventoryCard.js";
import { get, post } from "../../utilities";

import sanddollar from "../data/sanddollar.png";

import "./Inventory.css";

class Inventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected : [],
            inventoryList : [],
            switched : false,
            selectedTotal : 0,
        };
    }

    componentDidMount(){
    }

    addToSelect = (fish) => {
        if (this.state.switched) {
            var temp = this.state.inventoryList;
            let ind = this.state.inventoryList.indexOf(fish);
            temp.splice(ind, 1);
            this.setState({
                selected : this.state.selected.concat(fish),
                inventoryList : temp,
                selectedTotal : this.state.selectedTotal + fish.price,
            });
        }
        else {
            var temp = this.props.fishList.slice();
            let ind = this.props.fishList.indexOf(fish);
            temp.splice(ind, 1);
            this.setState({
                selected : this.state.selected.concat(fish),
                inventoryList : temp,
                switched: true,
                selectedTotal : this.state.selectedTotal + fish.price,
            })
        }  
    }

    removeFromSelect = (fish) => {
        if (this.state.switched) {
            var temp = this.state.selected;
            let ind = this.state.selected.indexOf(fish);
            temp.splice(ind, 1);
            this.setState({
                selected : temp,
                inventoryList : this.state.inventoryList.concat(fish),
                selectedTotal : this.state.selectedTotal - fish.price,
            });
        }
        else {
            var temp = this.state.selected;
            let ind = this.state.selected.indexOf(fish);
            temp.splice(ind, 1);
            this.setState({
                selected : temp,
                inventoryList : this.props.fishList.concat(fish),
                switched: true,
                selectedTotal : this.state.selectedTotal - fish.price,
            });
        }
        
    }

    sellingFish = () => {
        var f;
        for (f = 0; f < this.state.selected.length; f++){
            const body = {type: this.state.selected[f].type, googleid: this.props.gId};
            post("/api/deadFish", body);
            this.props.soldFish(this.state.selected[f]);
        }
        post("/api/incrementMoney", {amount: this.state.selectedTotal}).then((money) => {
        });
        this.setState({
            selected : [],
            selectedTotal : 0,
        });
        
    }

    render() {
        return ( <>
        
        <div className="Inventory-container">
            <div className="fishGroup">
            <div className="InventoryCardGroup">
            
            {this.state.switched ? (
                this.state.inventoryList.length == 0 ? 
                <div className="no-fish">You don't have any fish!</div> :
                this.state.inventoryList.map((f) => (<>
                    <div>
                      <InventoryCard displayFish={this.props.displayFish} fish={f} clickFx={f => this.addToSelect(f)}/>
                      </div>
                  </>
                ))
            )
             : 
             (this.props.fishList.length == 0 ? <div className="no-fish">You don't have any fish!</div> :
            this.props.fishList.map((f) => (<>
                  <InventoryCard displayFish={this.props.displayFish} fish={f} clickFx={f => this.addToSelect(f)}/>
              </>
            ))
             )
            }
            
            </div>
            </div>
            <div className="Inventory-selling-container">
                <div className="Inventory-selling-text">
                    Although we all love and adore our fish, we understand that sometimes too many is too many. Select any fish you want to sell back to Ray, and click on any fish in the box below to cancel the selection.
                </div>
                <button onClick={this.sellingFish} className="Inventory-sell-button">Sell Selected</button>
                <div className="Inventory-selected-balance">
                <span>Selected Balance: {this.state.selectedTotal}</span>
                <span><img src={sanddollar} style={{display:"inline-block", width:"20px", height:"20px", margin: "5px 0 -5px 0"}}></img></span>
                </div>
                    <div className="InventoryCardGroup2">
                    
                        {this.state.selected.length == 0 ? <div className="none-selected">No fish selected</div> : 
                        this.state.selected.map((f) => (
                            <>
                                <InventoryCard displayFish={this.props.displayFish} fish={f} clickFx={f => this.removeFromSelect(f)}/>
                        </>
                        ))
                        }
                    </div>
            </div>
            
        </div>
        
            </>
        );
    }

}

export default Inventory;