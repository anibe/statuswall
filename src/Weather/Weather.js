import React, {Component} from 'react';
import './Weather.css';

class Weather extends Component {

    constructor(props){
        super();
        this.apikey =  props.apikey;
        this.apiEndpoint = 'http://api.wunderground.com/api/'+ this.apikey +'/forecast/q/';
        this.location = 'UK/Hemel%20Hempstead';
        this.state = {
            forecast: {
                today: [],
                tomorrow: [],
                nexttomorrow: []
            },
            timeOfDay: 'day'
        };
        this.refreshDurationHours = 1;
    }

    getForecast() {
        let rightNow = new Date(),
            isNight = !(rightNow.getHours() >= 7 && rightNow.getHours() < 20);
        function reqListener (e) {
            this.setState({
                forecast: {
                    today: [JSON.parse(e.target.responseText).forecast.simpleforecast.forecastday[0].high.celsius, JSON.parse(e.target.responseText).forecast.simpleforecast.forecastday[0].icon],
                    tomorrow: [JSON.parse(e.target.responseText).forecast.simpleforecast.forecastday[1].high.celsius, JSON.parse(e.target.responseText).forecast.simpleforecast.forecastday[1].icon],
                    nexttomorrow: [JSON.parse(e.target.responseText).forecast.simpleforecast.forecastday[2].high.celsius, JSON.parse(e.target.responseText).forecast.simpleforecast.forecastday[2].icon]    
                },
                timeOfDay: isNight ? 'night' : 'day'
            });
            this.saveForecast();
            console.log('Weather updated from network '+ rightNow);
        }
        
        var oReq = new XMLHttpRequest(); // TODO: Consider fetch polyfill
        oReq.addEventListener("load", reqListener.bind(this));
        oReq.open('GET', this.apiEndpoint + this.location +'.json');
        oReq.send();
    }

    saveForecast() {
        localStorage.cachedForecast = JSON.stringify(this.state.forecast);
    }

    loadStoredForecast() {
        this.setState({
            forecast: JSON.parse(localStorage.cachedForecast)
        });
    }

    setWeatherCookie(hours) {
        let name = 'weatherCookieStatus=valid';
        let date = new Date();
        date.setTime(date.getTime() + (hours*60*60*1000));
        let expires = "; expires="+date.toGMTString();

        document.cookie = name+"="+expires+"; path=/";        
    }

    componentDidMount() {
        this.refresh();
        this.timerID = setInterval(() => this.refresh(),
            1000*60*2
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }    

    refresh() {
        console.log('weather refreshed!');
        let weatherCookieStatus = document.cookie.replace(/(?:(?:^|.*;\s*)weatherCookieStatus\s*=\s*([^;]*).*$)|^.*$/, "$1");
        if(weatherCookieStatus !== 'valid=') {
            this.getForecast();
            this.setWeatherCookie(3);
        } else {
            this.loadStoredForecast();
        }
    }

    mapIcons(apiIconLabel) {
        // http://unicode.org/emoji/charts/full-emoji-list.html
        let emojiIconTable = {
                'partlycloudy': 'partlycloudy',//'U+1F325',
                'chancerain':'chancerain',
                'storm':'storm',
                'chancetstorms':'chancestorms',
                'tstorms':'tstroms',
                'partlysunny': this.state.timeOfDay === 'day' ? 'partlycloudy':'halfmoon',
                'sunny': this.state.timeOfDay === 'day' ? 'sunny':'fullmoon',
                'clear':this.state.timeOfDay === 'day' ? 'sunny':'fullmoon',
                'snow':'snow',
                'rain':'rain',
                'mostlycloudy':'cloudy',
                'cloudy':'cloudy',
                'fog':'fog'
            };

        return emojiIconTable[apiIconLabel];
    }

    twoDaysFromToday() {
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var d = new Date();
        var dayNum = d.getDay() + 2;
        return (dayNum > 6) ? days[dayNum-7] : days[dayNum];
    }

    render() {
        const inlineStyles = {
            backgroundColor: this.state.timeOfDay === 'day' ? '#577b99' : '#101b23'
        };

        return (
            <div className="Weather applet" style={inlineStyles}>
                <div className="main-title">
                    {this.state.forecast.today[0]}&deg;
                </div>
                <div className={`no-font icon ${this.mapIcons(this.state.forecast.today[1])}`}>&nbsp;</div>
                <div className="other-days">
                    <div className="tomorrow">
                        <div className="heading">Tomorrow</div>
                        <div className="data">
                            <div className="temp">{this.state.forecast.tomorrow[0]}&deg;</div>
                            <div className={`small-icon ${this.mapIcons(this.state.forecast.tomorrow[1])}`}>&nbsp;</div>
                        </div>
                    </div>
                    <div className="nexttomorrow">
                        <div className="heading">{this.twoDaysFromToday()}</div>
                        <div className="data">
                            <div className="temp">{this.state.forecast.nexttomorrow[0]}&deg;</div>
                            <div className={`small-icon ${this.mapIcons(this.state.forecast.nexttomorrow[1])}`}>&nbsp;</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Weather;