import React, { Component } from 'react';
import './Adder.css';

import {Button, FormControl, Glyphicon, Tooltip, OverlayTrigger} from 'react-bootstrap'

class Adder extends Component {
	state = {inputVisible: false};

	handleAdder() {
    let newStuff = {
      title: this.input.value,
      id: this.generateUniqueId()
    };

		this.props.handleAdder(newStuff);
    this.handleInput(false);
	}

  handleInput(state) {
    this.setState({inputVisible: state});

    if (!state) {
      this.input.value = "";
    }
  }

  generateUniqueId() {
    return Math.floor(Math.random() * 10000);
  }

  renderTooltip() {
    return (
      <Tooltip id='tooltip'>
        # - Header
        <br/>
        * - Bold
        <br/>
        ** - Italic
      </Tooltip>
    );
  }

  render() {
  	const {inputVisible} = this.state;
    const {type} = this.props;

    return (
    	<div className="adder">
        {
          inputVisible
          ? <div className='input-wrapper'>
              <FormControl type="text" placeholder={`Add a ${type}`} inputRef={ref => { this.input = ref; }}/>
              <Button bsStyle="success" bsSize="small" onClick={() => this.handleAdder()}>
                Save
              </Button>
              <Button bsSize="small" onClick={() => this.handleInput(false)}>
                <Glyphicon glyph="remove" />
              </Button>
              {
                type === 'task' && 
                <OverlayTrigger placement="bottom" overlay={this.renderTooltip()}>
                  <Glyphicon glyph="font" />
                </OverlayTrigger>
              }
            </div>
          : <Button bsStyle="info" onClick={() => this.handleInput(true)}>
              Add a {type}
            </Button>
        }
    	</div>
    );
  }
}

export default Adder;
