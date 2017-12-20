import React, { Component } from 'react';
import './Greeting.css';

class Greeting extends Component {

  constructor(props) {
    super(props);
    this.messageHTML = props.content.messageHTML
  }

  render() {

    return (
      <div className="Greeting applet active float" dangerouslySetInnerHTML={{ __html: this.messageHTML}}>
      </div>
    );
  }
}

export default Greeting;
