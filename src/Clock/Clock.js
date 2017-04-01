import React, { Component } from 'react';
import './Clock.css';

function showTime() {
    return 'The time is now';
}

class Clock extends Component {

  static showTime() {
      return 'The time is now';
  }

  render() {
    return (
      <div className="Clock">
        <p>{Clock.showTime()}</p>
      </div>
    );
  }
}

export default Clock;
