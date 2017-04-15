import React, { Component } from 'react';
import './Clock.css';

class Clock extends Component {

  constructor(props) {
    super(props);
    this.state = {date: new Date()};
    this.is24HourFormat = props.is24HourFormat;
    this.colour = props.colour;
  }

  showTime() {
    let currentTime = this.state.date;
    return [currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds()];
  }

  formatTime(digit) {
    return ("0" + digit).slice(-2);
  }

  showDate() {
    return this.state.date.toDateString();
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
    let timeArray = this.showTime(),
        hours = (!this.is24HourFormat && timeArray[0] > 12) ? timeArray[0]-12 : timeArray[0],
        minutes = timeArray[1],
        seconds = timeArray[2];

    return (
      <div className="Clock applet" style={inlineStyles}>
        <div className="main-title time">
          <span className="hours">{hours}</span>:
          <span className="minutes">{this.formatTime(minutes)}</span>
          <span className="seconds blink">
            :
            {this.formatTime(seconds)}
          </span>
        </div>
        <div className="sub-title date">{this.showDate()}</div>
      </div>
    );
  }
}

export default Clock;
