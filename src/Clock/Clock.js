import React, { Component } from 'react';
import './Clock.css';

class Clock extends Component {

  constructor(props) {
    super(props);
    this.state = {date: new Date()};
    this.format = props.format;
    this.colour = props.colour;
  }

  showTime() {
    return this.state.date.toLocaleTimeString();
  }

  showDate() {
    return this.state.date.toLocaleDateString();
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    const inlineStyles = {
      backgroundColor: this.colour
    };

    return (
      <div className="Clock applet" style={inlineStyles}>
        <div className="main-title">{this.showTime()}</div>
        <div className="sub-title">{this.showDate()}</div>
      </div>
    );
  }
}

export default Clock;
