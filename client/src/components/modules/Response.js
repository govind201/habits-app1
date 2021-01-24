import React, { Component } from "react";
import { get, post } from "../../utilities";

import "./Response.css";


/**
 * Renders a single response option.
 *
 * Proptypes
 * @param {String} response
 */
class Response extends Component {
    constructor(props) {
      super(props);
      this.state = {
          value: "dory",
      };
    }

    buyFish = (value) => {
        const body = { type: this.state.value };
        post("/api/buyfish", body);
        };

    handleClick = (e) => {
        e.preventDefault();
    };
  
    render() {
      return (
        <div>
            <button
            type="submit"
            className="Chat-button u-pointer"
            value="Submit"
            onClick={this.buyFish}
            >
                {this.props.response}
            </button>
        </div>
      );
    }
  }
  
export default Response;
  