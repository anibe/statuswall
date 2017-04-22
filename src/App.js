import React, { Component } from 'react';
import Clock from './Clock/Clock';
import './App.css';

class App extends Component {

  constructor(props) {
    super();
    this.settings = {
      'Clock': {
        'is24HourFormat': true,
        'colour':'#CA8FCA'
      }
    }
  }

  render() {
    let settings = this.settings;
    return (
      <div className="App">
        <Clock format={ settings.Clock.is24HourFormat } colour={settings.Clock.colour} />
      </div>
    );
  }
}

export default App;
