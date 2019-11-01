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
      },
      'Trade': {
        title: 'Trade',
        currency: 'GBP',
        apikey: props.apikey,
        coins: [{
            "id": "bitcoin",
            "symbol": "BTC",
            "buy": 7800,
            "sell": 24000
        },
        {
            "id":"ethereum",
            "symbol": "ETH",
            "buy": 780,
            "sell": 1900    
        },
        {
            "id": "ripple",
            "symbol": "XRP",
            "buy": 0.9,
            "sell": 4    
        },        
        {
            "id": "neo",
            "symbol": "NEO",
            "buy": 100,
            "sell": 300    
        },
        {
            "id": "vechain",
            "symbol": "VEN",
            "buy": 4.6,
            "sell": 17    
        },                
        {
            "id": "omisego",
            "symbol": "OMG",
            "buy": 10.5,
            "sell": 40
        },
        {
            "id": "stratis",
            "symbol": "STRAT",
            "buy": 8,
            "sell": 32  
        },        
        {
            "id": "stellar",
            "symbol": "XLM",
            "buy": 0.4,
            "sell": 1.2  
        },
        {
            "id": "qash",
            "symbol": "QASH",
            "buy": 0.8,
            "sell": 2.4  
        },
        {
            "id": "ignis",
            "symbol": "IGNIS",
            "buy": 0.4,
            "sell": 1.6            
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
        <Coin />
        <Trade settings={this.settings.Trade} />
        <Clock format={ settings.Clock.is24HourFormat } colour={settings.Clock.colour} />
      </div>
    );
  }
}

export default App;
