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
            'BTC': {
                'currentPrice':'',
                'daychange': '',
                'action':''
            }
        }
    };
    this.updateCoinData = this.updateCoinData.bind(this);
  }

  refresh() {
      // get prices
      const app = this;
      const settings = this.settings;
      settings.coins.forEach(function(coin) {
        var oReq = new XMLHttpRequest(); // TODO: Consider fetch polyfill
        oReq.addEventListener("load", reqListener.bind(this, coin.symbol));
        oReq.open('GET', '//www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol='+ coin.symbol +'&market='+ settings.currency +'&apikey='+ settings.apikey);
        oReq.send();        
      });

      function reqListener(symbol, event) {
          const data = JSON.parse(event.target.response);
          app.updateCoinData(symbol, data);
      }
      
    //   function reqListener (symbol, e) {
    //     const data = JSON.parse(e.target.response);
    //     console.log(data);
    //     let stateCoinData = Object.assign({}, this.state.coinData);
    //     stateCoinData[symbol] = {
    //         'currentPrice':'',
    //         'daychange': '',
    //         'action':''
    //     };
    //     this.setState({ coinData: stateCoinData });
    //   }      
  }

  updateCoinData(symbol, data) {
    console.log(data);
    let stateCoinData = Object.assign({}, this.state.coinData);
    stateCoinData[symbol] = {
        'currentPrice': data["Time Series (Digital Currency Intraday)"][0]["1a. price (GBP)"],
        'daychange': '',
        'action':''
    };
    this.setState({ coinData: stateCoinData });
  }

  componentDidMount() {
    this.refresh();
    // this.timerID = setInterval(() => this.refresh(),
    //     1000*10 // 20mins
    //     //1000*60*20 // 20mins
    // );
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
      <h3>Coins</h3>
        <ul>
            <li><div className="symbol">BTC</div> <h4 className="prices">£11,817 <span className="gain">+3%</span></h4></li>
            <li><div className="symbol">ETH</div> <h4 className="prices">£817 <span className="gain">+5.39%</span></h4></li>
            <li className="buy"><div className="symbol">XRP</div> <h4 className="prices">£6,817 <span className="loss">-30%</span> BUY</h4></li>
            <li className="sell"><div className="symbol">XRP</div> <h4 className="prices">£6,817 <span className="loss">-30%</span> SELL</h4></li>
        </ul>
        <div className="last-update">Prices as at Saturday 16:59</div>
      </div>
    );
  }
}

export default Coin;
