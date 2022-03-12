import React, { Component } from "react";
import { get, post } from "../../utilities";

import "./FishCard.css";

/**
 * Renders a single card in store of fish or fish-like item.
 *
 * Proptypes
 * @param {MessageObject} message
 */
class FishCard extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = (e) => {
    e.preventDefault();
};

  buyFish = (value) => {
    const body = { type: this.props.fish.type , price: this.props.fish.price};
    post("/api/buyfish", body);
    this.props.boughtFish(body);
    this.props.sendMessage("I want " + this.props.fish.type, 'ray', this.props.userId);
  };

  render() {
    return (
      <div onClick={this.buyFish} className="FishCard square u-pointer">
        <div className="content u-textCenter u-pointer">
          <img src={this.props.displayFish(this.props.fish.type)} width="100%" >
          </img>
          <div className="FishCard-title">
          <span className="FishCard-name">
            {this.props.fish.name}
          </span>

          <span className="FishCard-price">
            {this.props.fish.price}
          </span>
          </div>

        </div>
      </div>
    );
  }
}

export default FishCard;
