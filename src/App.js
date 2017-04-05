import React, { Component } from 'react';
import Clock from './Clock/Clock';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Clock format="24" />
      </div>
    );
  }
}

export default App;
