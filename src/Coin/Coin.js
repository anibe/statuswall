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
            "buy": 90,
            "sell": 300    
        },
        {
            "id": "vechain",
            "symbol": "VEN",
            "buy": 4.9,
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
            "buy": 0.25,
            "sell": 1  
        }]
    };
    this.state = {
        coinData: {
            'lastUpdated': Date.now(),
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
            }                          
        }
    };
    this.intervalMins = 7;
  }

  refresh() {
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
        coinPrice = parseFloat(data[0].price_gbp),
        coinChange = parseFloat(data[0].percent_change_24h),
        lastUpdated = new Date(Date.now());
    
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
        'change': formatSign((coinChange).toFixed(3)),
        'direction': coinChange >= 0 ? 'gain': 'loss',
        'action': this.computeAction(symbol, coinPrice)
    };
    stateCoinData.lastUpdated = lastUpdated.toGMTString();
    this.setState({ coinData: stateCoinData });
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
    this.refresh();
    this.timerID = setInterval(() => this.refresh(),
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
      <h3>Money</h3>
        <ul>
            <li className={this.state.coinData['BTC'].action}><div className="symbol">BTC</div> <h4 className="prices">£{this.state.coinData['BTC'].currentPrice} <span className={this.state.coinData['BTC'].direction}>{this.state.coinData['BTC'].change}%</span> <span className="action">{this.state.coinData['BTC'].action}</span></h4></li>
            <li className={this.state.coinData['ETH'].action}><div className="symbol">ETH</div> <h4 className="prices">£{this.state.coinData['ETH'].currentPrice} <span className={this.state.coinData['ETH'].direction}>{this.state.coinData['ETH'].change}%</span> <span className="action">{this.state.coinData['ETH'].action}</span></h4></li>
            <li className={this.state.coinData['XRP'].action}><div className="symbol">XRP</div> <h4 className="prices">£{this.state.coinData['XRP'].currentPrice} <span className={this.state.coinData['XRP'].direction}>{this.state.coinData['XRP'].change}%</span> <span className="action">{this.state.coinData['XRP'].action}</span></h4></li>
            <li className={this.state.coinData['NEO'].action}><div className="symbol">NEO</div> <h4 className="prices">£{this.state.coinData['NEO'].currentPrice} <span className={this.state.coinData['NEO'].direction}>{this.state.coinData['NEO'].change}%</span> <span className="action">{this.state.coinData['NEO'].action}</span></h4></li>
            <li className={this.state.coinData['VEN'].action}><div className="symbol">VeCh</div> <h4 className="prices">£{this.state.coinData['VEN'].currentPrice} <span className={this.state.coinData['VEN'].direction}>{this.state.coinData['VEN'].change}%</span> <span className="action">{this.state.coinData['VEN'].action}</span></h4></li>
            {/* <li className={this.state.coinData['STORM'].action}><div className="symbol">STORM</div> <h4 className="prices">£{this.state.coinData['STORM'].currentPrice} <span className={this.state.coinData['STORM'].direction}>{this.state.coinData['STORM'].change}%</span> <span className="action">{this.state.coinData['STORM'].action}</span></h4></li> */}
        </ul>
        <div className="last-update">Prices as at {this.state.coinData['lastUpdated']}. Source: coinmarketcap.com</div>
      </div>
    );
  }
}

export default Coin;
