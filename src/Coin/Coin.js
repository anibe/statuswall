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
        }
    };
    this.intervalMins = 3;
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
        coinPrice = parseFloat(data[0]['price_'+ this.settings.currency.toLocaleLowerCase()]),
        coinChange = parseFloat(data[0].percent_change_1h),
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
      <h3>Trade</h3>
        <ul>
            <li className={this.state.coinData['BTC'].action}><div className="symbol">BTC</div> <h4 className="prices">£{this.state.coinData['BTC'].currentPrice} <span className={this.state.coinData['BTC'].direction}>{this.state.coinData['BTC'].change}%</span> <span className="action">{this.state.coinData['BTC'].action}</span></h4></li>
            <li className={this.state.coinData['ETH'].action}><div className="symbol">ETH</div> <h4 className="prices">£{this.state.coinData['ETH'].currentPrice} <span className={this.state.coinData['ETH'].direction}>{this.state.coinData['ETH'].change}%</span> <span className="action">{this.state.coinData['ETH'].action}</span></h4></li>
            <li className={this.state.coinData['XRP'].action}><div className="symbol">XRP</div> <h4 className="prices">£{this.state.coinData['XRP'].currentPrice} <span className={this.state.coinData['XRP'].direction}>{this.state.coinData['XRP'].change}%</span> <span className="action">{this.state.coinData['XRP'].action}</span></h4></li>
            <li className={this.state.coinData['NEO'].action}><div className="symbol">NEO</div> <h4 className="prices">£{this.state.coinData['NEO'].currentPrice} <span className={this.state.coinData['NEO'].direction}>{this.state.coinData['NEO'].change}%</span> <span className="action">{this.state.coinData['NEO'].action}</span></h4></li>
            <li className={this.state.coinData['VEN'].action}><div className="symbol">VeCh</div> <h4 className="prices">£{this.state.coinData['VEN'].currentPrice} <span className={this.state.coinData['VEN'].direction}>{this.state.coinData['VEN'].change}%</span> <span className="action">{this.state.coinData['VEN'].action}</span></h4></li>
            <li className={this.state.coinData['OMG'].action}><div className="symbol">OMG</div> <h4 className="prices">£{this.state.coinData['OMG'].currentPrice} <span className={this.state.coinData['OMG'].direction}>{this.state.coinData['OMG'].change}%</span> <span className="action">{this.state.coinData['OMG'].action}</span></h4></li>
            <li className={this.state.coinData['STRAT'].action}><div className="symbol">STRAT</div> <h4 className="prices">£{this.state.coinData['STRAT'].currentPrice} <span className={this.state.coinData['STRAT'].direction}>{this.state.coinData['STRAT'].change}%</span> <span className="action">{this.state.coinData['STRAT'].action}</span></h4></li>
            <li className={this.state.coinData['XLM'].action}><div className="symbol">XLM</div> <h4 className="prices">£{this.state.coinData['XLM'].currentPrice} <span className={this.state.coinData['XLM'].direction}>{this.state.coinData['XLM'].change}%</span> <span className="action">{this.state.coinData['XLM'].action}</span></h4></li>
            <li className={this.state.coinData['QASH'].action}><div className="symbol">QASH</div> <h4 className="prices">£{this.state.coinData['QASH'].currentPrice} <span className={this.state.coinData['QASH'].direction}>{this.state.coinData['QASH'].change}%</span> <span className="action">{this.state.coinData['QASH'].action}</span></h4></li>
            <li className={this.state.coinData['IGNIS'].action}><div className="symbol">IGNIS</div> <h4 className="prices">£{this.state.coinData['IGNIS'].currentPrice} <span className={this.state.coinData['IGNIS'].direction}>{this.state.coinData['IGNIS'].change}%</span> <span className="action">{this.state.coinData['IGNIS'].action}</span></h4></li>
        </ul>
        <div className="last-update">Prices as at {this.state.coinData['lastUpdated']}. Source: coinmarketcap.com</div>
      </div>
    );
  }
}

export default Coin;
