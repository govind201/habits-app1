import React from 'react';

import "./StorePopup.css";
import { Link } from "@reach/router";

class StorePopup extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="big-store-window" onClick={this.props.onCloseP}>
      <div className="store-popup-window" onClick={(event) => event.stopPropagation()}>
          <p> {this.props.popText}</p>
        <div className='btn-containers'>
        <Link className="closeButton" style={{color:"black", "text-decoration":"none", border: '1px solid gray', background: 'none', padding: '5px', cursor: 'pointer', "font-size": "10px"}} to="/">Return to Aquarium</Link>
        <button className="closeButton" onClick={this.props.restart}>Talk to Ray Again</button>
        </div>
      </div>
      </div>
    );
  }
}

export default StorePopup;