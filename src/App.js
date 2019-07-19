import React, { Component } from 'react';
import config from './config.json';
import Clock from './Clock/Clock';
import Coin from './Coin/Coin';
import Calendar from './Calendar/Calendar';
import Weather from './Weather/Weather';
import './App.css';

class App extends Component {

  constructor(props) {
    super();
    this.settings = {
      'interval': 10,
      'Clock': {
        'is24HourFormat': true,
        'colour':'#ca8fa3'
      },
      'Events': {
        title: 'Events',
        calendarId: 'primary',
        maxResults: 5,
        backgroundColor: '#68a39d'
      },
      'Arsenal': {
        title: 'Arsenal',
        calendarId: 'uhdj9bf33sav2qqml8gii7l2nutab9l3@import.calendar.google.com',
        maxResults: 4,
        backgroundColor: '#a8312d'
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
        <Calendar settings={this.settings.Events} />
        <Calendar settings={this.settings.Arsenal} />
        <Coin />
        <Clock format={ settings.Clock.is24HourFormat } colour={settings.Clock.colour} />
      </div>
    );
  }
}

export default App;
