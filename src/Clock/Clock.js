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
    return (
      <div className="Clock" style={{ backgroundColor: this.colour }}>
        <p>{this.showTime()}</p>
      </div>
    );
  }
}

export default Clock;
