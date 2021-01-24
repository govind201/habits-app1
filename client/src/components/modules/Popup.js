import React from 'react';

import "./Popup.css";

class Popup extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="big-window" onClick={this.props.onCloseP}>
      <div className="feed-window" onClick={(event) => event.stopPropagation()}>
          <p> {this.props.popText}</p>
        <button className="closeButton" onClick={this.props.onCloseP}>
            Close
        </button>
      </div>
      </div>
    );
  }
}


export default Popup;