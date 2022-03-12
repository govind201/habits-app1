import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Option from './Option';
import OptionElement from './OptionElement';
import Options from './Options';
import OptionsStepContainer from './OptionsStepContainer';
import sanddollar from "../../../../../src/components/data/sanddollar.png";

class OptionsStep extends Component {
  onOptionClick = ({ value }) => {
    const { triggerNextStep } = this.props;

    triggerNextStep({ value });
  };

  renderOption = option => {
    const { bubbleOptionStyle, step } = this.props;
    const { user } = step;
    const { value, label } = option;

    let labelRender;
    if (label.includes('$#$')) {
      const [text, price, pic] = label.split('$#$')
      labelRender = (<div><div><span style={{fontFamily: '\'Quicksand\', sans-serif', "text-align": "left"}}>{text}</span>
      <span style={{fontFamily: '\'Quicksand\', sans-serif', "text-align": "right"}}>{price}</span>
      <span><img src={sanddollar} alt="sanddollar" style={{display:"inline-block", width:"20px", height:"20px", margin: "10px 0 -5px 0"}}></img></span>

      </div>
      
      <img src={pic} style={{"height": "100px"}}></img></div>);
    } else {
      labelRender = label
    }

    return (
      <Option key={value} className="rsc-os-option">
        <OptionElement
          className="rsc-os-option-element"
          style={bubbleOptionStyle, {fontFamily: '\'Quicksand\', sans-serif'}}
          user={user}
          onClick={() => this.onOptionClick({ value })}
        >
          {labelRender}
        </OptionElement>
      </Option>
    );
  };

  render() {
    const { step } = this.props;
    const { options } = step;

    return (
      <OptionsStepContainer className="rsc-os">
        <Options className="rsc-os-options">
          {Object.keys(options).map(key => options[key]).map(this.renderOption)}
        </Options>
      </OptionsStepContainer>
    );
  }
}

OptionsStep.propTypes = {
  bubbleOptionStyle: PropTypes.objectOf(PropTypes.any).isRequired,
  step: PropTypes.objectOf(PropTypes.any).isRequired,
  triggerNextStep: PropTypes.func.isRequired
};

export default OptionsStep;
