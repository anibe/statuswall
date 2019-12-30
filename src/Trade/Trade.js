import React, { Component } from 'react';
import './Trade.css';

class Trade extends Component {

  constructor(props) {
    super();
    this.settings = props;
    const coinDataObj = {};
    props.settings.properties.forEach(property => {
        coinDataObj[property.symbol] = {
            'currentPrice':'',
            'change': '',
            'direction':'',
            'action':''            
        };
    });
    this.state = {
        coinData: coinDataObj,
        lastUpdated: Date.now(),
        coinListHTML: ''
    };
    this.intervalMins = 30;
  }

  refreshFromApi() {
      // get prices
      const app = this;
      const settings = this.settings.settings;
      settings.properties.forEach(function(property) {
        const endpoint = settings.endpointString.replace(new RegExp(`{symbol}`, 'g'), property.symbol); // https://free.currconv.com/api/v7/convert?q={currency}_{symbol}&compact=ultra&apiKey={apikey}
        const oReq = new XMLHttpRequest(); // TODO: Consider fetch polyfill
        oReq.addEventListener("load", reqListener.bind(this, property.symbol));
        oReq.open('GET', endpoint);
        oReq.send();        
      });

      function reqListener(symbol, event) {
          const data = JSON.parse(event.target.response);
          app.updateCoinData(symbol, data);
      }     
  }

  updateCoinData(symbol, data) {
    let stateCoinData = Object.assign({}, this.state.coinData),
        coinPrice = data[`${this.settings.settings.currency}_${symbol}`],
        coinChange = this.state.coinData[symbol].currentPrice - coinPrice,
        lastUpdated = new Date(Date.now()),
        coinListHTML = '';
    
    function formatSign(number) {
        let sign = '';
        if (parseFloat(number) >= 0) {
            sign = '+';
        }
       return sign + number; 
    }

    function formatMoney(number) {
        return number.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }

    stateCoinData[symbol] = {
        'currentPrice': coinPrice, // coinPrice.toFixed(2),
        'change': formatSign((coinChange).toFixed(2)),
        'direction': coinChange >= 0 ? 'gain': 'loss',
        'action': this.computeAction(symbol, coinPrice)
    };
    
    Object.keys(this.state.coinData).forEach(function (key, index) {
        coinListHTML += `<li class=${this.state.coinData[key].action}><div class="symbol">${key}</div> <h4 class="prices">£${this.state.coinData[key].currentPrice} <span class=${this.state.coinData[key].direction}>${this.state.coinData[key].change}</span> <span class="action">${this.state.coinData[key].action}</span></h4></li>\n`;
    }.bind(this));
    
    this.setState({ 
        coinData: stateCoinData,
        lastUpdated: lastUpdated.toGMTString(),
        coinListHTML
    });    
  }

  computeAction(symbol, price) {
    var coinActionSettings = this.settings.settings.properties.find(containsSymbol),
        action;

    function containsSymbol(coin) {
        return coin.symbol === symbol;
    }

    switch (true) {
        case price <= coinActionSettings.buy:
            action = 'buy';
            break;
        case price >= coinActionSettings.sell:
            action = 'sell';
            break;
        default:
            action = '';
    }

    return action;
  }

  componentDidMount() {
    this.refreshFromApi();
    this.timerID = setInterval(() => this.refreshFromApi(),
        1000*60*this.intervalMins
    );    
  }

   componentWillUnmount() {
    clearInterval(this.timerID);
   }  

  render() {
    const inlineStyles = {
        backgroundColor: '#1d3442'
    };

    return (
      <div className="Trade applet" style={inlineStyles}>
      <h3>Trade</h3>
        <ul dangerouslySetInnerHTML={{ __html: this.state.coinListHTML}}/>
        <div className="last-update">Prices as at {this.state.lastUpdated}</div>
      </div>
    );
  }
}

export default Trade;