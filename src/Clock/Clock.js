import React, { Component } from 'react';
import './Clock.css';

class Clock extends Component {

  showTime() {
      return 'The time is now';
  }
  
  render() {
    return (
      <div className="Clock">
      </div>
    );
  }
}

export default Clock;
