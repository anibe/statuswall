import React, { Component } from 'react';
import config from './config.json';
import Clock from './Clock/Clock';
import Calendar from './Calendar/Calendar';
import Weather from './Weather/Weather';
import Trade from './Trade/Trade';
import './App.css';

class App extends Component {

  constructor(props) {
    super();
    this.settings = {
      'interval': 12,
      'Clock': {
        'is24HourFormat': true,
        'colour':'#8ba36a'
      },
      'Events': {
        title: 'Events',
        calendarId: 'primary',
        maxResults: 5,
        backgroundColor: '#62689e'
      },
      'Arsenal': {
        title: 'Arsenal',
        calendarId: 'uhdj9bf33sav2qqml8gii7l2nutab9l3@import.calendar.google.com',
        maxResults: 4,
        backgroundColor: '#a8312d'
      },
      'Trade': {
        title: 'Rates',
        currency: 'GBP',
        endpointString: 'https://free.currconv.com/api/v7/convert?q=GBP_{symbol}&compact=ultra&apiKey=c5b8b4054f212b5a5e84',
        properties: [{
            "id": "naira",
            "symbol": "NGN",
            "buy": 1,
            "sell": 500
          },
          {
            "id": "euros",
            "symbol": "EUR",
            "buy": 1,
            "sell": 2
        },
        {
          "id": "dollar",
          "symbol": "USD",
          "buy": 1,
          "sell": 2
        }]
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
        <Trade settings={this.settings.Trade} />
        <Clock format={ settings.Clock.is24HourFormat } colour={settings.Clock.colour} />
      </div>
    );
  }
}

export default App;
