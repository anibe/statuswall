import React, { Component } from 'react';
import Clock from './Clock/Clock';
import './App.css';

class App extends Component {

  constructor(props) {
    super();
    this.settings = {
      'Clock': {
        'format': 24,
        'colour':'#CA8FCA'
      }
    }
  }

  render() {
    let settings = this.settings;
    return (
      <div className="App">
        <Clock format={ settings.Clock.format } colour={settings.Clock.colour} />
      </div>
    );
  }
}

export default App;
