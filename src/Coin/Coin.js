import React, { Component } from 'react';
import './Coin.css';

class Coin extends Component {

  constructor(props) {
    super();
    this.settings = {
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
    };
    this.state = {
        coinData: {
            'BTC': {
                'currentPrice':'',
                'change': '',
                'direction':'',
                'action':''
            },
            'ETH': {
                'currentPrice':'',
                'change': '',
                'direction':'',
                'action':''
            },
            'XRP': {
                'currentPrice':'',
                'change': '',
                'direction':'',
                'action':''
            },
            'NEO': {
                'currentPrice':'',
                'change': '',
                'direction':'',
                'action':''
            },
            'VEN': {
                'currentPrice':'',
                'change': '',
                'direction':'',
                'action':''
            },
            'OMG': {
                'currentPrice':'',
                'change': '',
                'direction':'',
                'action':''
            },
            'STRAT': {
                'currentPrice':'',
                'change': '',
                'direction':'',
                'action':''
            },            
            'XLM': {
                'currentPrice':'',
                'change': '',
                'direction':'',
                'action':''
            },
            'QASH': {
                'currentPrice':'',
                'change': '',
                'direction':'',
                'action':''
            },
            'IGNIS': {
                'currentPrice':'',
                'change': '',
                'direction':'',
                'action':''
            }                                                 
        },
        lastUpdated: Date.now(),
        coinListHTML: ''
    };
    this.intervalMins = 3;
  }

  refreshFromApi() {
      // get prices
      const app = this;
      const settings = this.settings;
      settings.coins.forEach(function(coin) {
        var oReq = new XMLHttpRequest(); // TODO: Consider fetch polyfill
        oReq.addEventListener("load", reqListener.bind(this, coin.symbol));
        oReq.open('GET', 'https://api.coinmarketcap.com/v1/ticker/'+ coin.id  +'/?convert='+ settings.currency);
        oReq.send();        
      });

      function reqListener(symbol, event) {
          const data = JSON.parse(event.target.response);
          app.updateCoinData(symbol, data);
      }     
  }

  updateCoinData(symbol, data) {
    let stateCoinData = Object.assign({}, this.state.coinData),
        coinPrice = parseFloat(data[0]['price_'+ this.settings.currency.toLocaleLowerCase()]),
        coinChange = parseFloat(data[0].percent_change_1h),
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
        'currentPrice': formatMoney(coinPrice.toFixed(2)),
        'change': formatSign((coinChange).toFixed(2)),
        'direction': coinChange >= 0 ? 'gain': 'loss',
        'action': this.computeAction(symbol, coinPrice)
    };

    Object.keys(this.state.coinData).forEach(function (key, index) {
        coinListHTML += `<li class=${this.state.coinData[key].action}><div class="symbol">${key}</div> <h4 class="prices">£${this.state.coinData[key].currentPrice} <span class=${this.state.coinData[key].direction}>${this.state.coinData[key].change}%</span> <span class="action">${this.state.coinData[key].action}</span></h4></li>\n`;
    }.bind(this));    

    this.setState({ 
        coinData: stateCoinData,
        lastUpdated: lastUpdated.toGMTString(),
        coinListHTML
    });
  }

  computeAction(symbol, price) {

    var coinActionSettings = this.settings.coins.find(containsSymbol),
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
      <div className="Coin applet" style={inlineStyles}>
      <h3>Trade</h3>
        <ul dangerouslySetInnerHTML={{ __html: this.state.coinListHTML}}/>
        <div className="last-update">Prices as at {this.state.lastUpdated}. Source: coinmarketcap.com</div>
      </div>
    );
  }
}

export default Coin;
