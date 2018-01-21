import React, { Component } from 'react';
import config from './config.json';
import Clock from './Clock/Clock';
import Calendar from './Calendar/Calendar';
import Weather from './Weather/Weather';
import Coin from './Coin/Coin';
import './App.css';

class App extends Component {

  constructor(props) {
    super();
    this.settings = {
      'interval': 8,
      'Clock': {
        'is24HourFormat': true,
        'colour':'#CA8FCA'
      }
    }
  }

  componentDidMount() {
    this.appletDOMNodes = document.querySelectorAll('.applet');
    this.visibilityCycler(this.settings.interval);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }  

  visibilityCycler(numberOfSecs) {
    let appletNodes = this.appletDOMNodes,
        appletNodeCount = appletNodes.length - 1,
        index = 0;

    this.timerID = setInterval(()=>{
      [].forEach.call(appletNodes, function(node){
        node.classList.remove('active');
      });
      appletNodes[index].classList.add('active');
      index === appletNodeCount ? index = 0 : index++;
    }, numberOfSecs * 1000);
  }

  render() {
    let settings = this.settings;
    return (
      <div className="App">
        <Weather apikey={config.api.weatherunderground.key} />
        <Calendar />
        <Coin apikey={config.api.alphavantage.key} />
        <Clock format={ settings.Clock.is24HourFormat } colour={settings.Clock.colour} />
      </div>
    );
  }
}

export default App;
