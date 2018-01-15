import React, { Component } from 'react';
import './Coin.css';

class Coin extends Component {

  constructor(props) {
    super();
    this.settings = {
        currency: 'GBP',
        apikey: props.apikey,
        coins: [{
            'symbol': 'BTC',
            'buy': 9000,
            'sell': 24000
        },
        {
            'symbol': 'ETH',
            'buy': 800,
            'sell': 24000    
        },
        {
            'symbol': 'XRP',
            'buy': 9000,
            'sell': 24000    
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
            }
        }
    };
  }

  refresh() {
      // get prices
      const app = this;
      const settings = this.settings;
      settings.coins.forEach(function(coin) {
        var oReq = new XMLHttpRequest(); // TODO: Consider fetch polyfill
        oReq.addEventListener("load", reqListener.bind(this, coin.symbol));
        oReq.open('GET', 'https://api.cryptonator.com/api/full/'+ coin.symbol +'-'+ settings.currency);
        oReq.send();        
      });

      function reqListener(symbol, event) {
          const data = JSON.parse(event.target.response);
          app.updateCoinData(symbol, data);
      }     
  }

  updateCoinData(symbol, data) {
    let stateCoinData = Object.assign({}, this.state.coinData),
        coinPrice = parseFloat(data.ticker.price),
        coinChange = parseFloat(data.ticker.change),
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
        'change': formatSign(((((coinPrice + coinChange) - coinPrice) / coinPrice) * 100).toFixed(3)),
        'direction': coinChange > 0 ? 'gain': 'loss',
        'action': ''
    };
    stateCoinData.lastUpdated = lastUpdated.toGMTString();
    this.setState({ coinData: stateCoinData });
  }

  componentDidMount() {
    this.refresh();
    this.timerID = setInterval(() => this.refresh(),
        1000*60*60
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
            <li><div className="symbol">BTC</div> <h4 className="prices">£{this.state.coinData['BTC'].currentPrice} <span className={this.state.coinData['BTC'].direction}>{this.state.coinData['BTC'].change}%</span></h4></li>
            <li><div className="symbol">ETH</div> <h4 className="prices">£{this.state.coinData['ETH'].currentPrice} <span className={this.state.coinData['ETH'].direction}>{this.state.coinData['ETH'].change}%</span></h4></li>
            <li><div className="symbol">XRP</div> <h4 className="prices">£{this.state.coinData['XRP'].currentPrice} <span className={this.state.coinData['XRP'].direction}>{this.state.coinData['XRP'].change}%</span></h4></li>
            {/* <li className="buy"><div className="symbol">XRP</div> <h4 className="prices">£6,817 <span className="loss">-30%</span> BUY</h4></li>
            <li className="sell"><div className="symbol">XRP</div> <h4 className="prices">£6,817 <span className="loss">-30%</span> SELL</h4></li> */}
        </ul>
        <div className="last-update">Prices as at {this.state.coinData['lastUpdated']}</div>
      </div>
    );
  }
}

export default Coin;
