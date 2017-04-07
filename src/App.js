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
    return (
      <div className="App">
        <Clock format={ this.settings.Clock.format } />
      </div>
    );
  }
}

export default App;
