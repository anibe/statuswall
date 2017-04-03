import React, { Component } from 'react';
import './Clock.css';

class Clock extends Component {

  showTime() {
      return 'The time is now!';
  }

  render() {
    return (
      <div className="Clock">
        <p>{this.showTime()}</p>
      </div>
    );
  }
}

export default Clock;
