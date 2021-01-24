import React from 'react';


class FishDiePopup extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount () {
  }

  render() {
    return (
        
      <div className="big-window"  onClick={this.props.onCloseFDP}>
        <div className="window" onClick={(event) => event.stopPropagation()}>
            <p> {this.props.popText}</p>
            {this.props.deadFish.map((f) => (
                <>
                <img src={this.props.displayFish(f.type)} alt="fish" height="100%" width="100%"></img>
                </>
            ))}
            
            <button className="closeButton" onClick={this.props.onCloseFDP}>
                Close
            </button>
            
            
            
        </div>
      </div>
    );
  }
}


export default FishDiePopup;