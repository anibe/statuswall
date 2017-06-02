import React, {Component} from 'react';

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
            }
        };
    }

    getForecast() {
        function reqListener (e) {
            this.setState({
                forecast: {
                    today: [JSON.parse(e.target.responseText).forecast.simpleforecast.forecastday[0].high.celsius, JSON.parse(e.target.responseText).forecast.simpleforecast.forecastday[0].icon],
                    tomorrow: [JSON.parse(e.target.responseText).forecast.simpleforecast.forecastday[1].high.celsius, JSON.parse(e.target.responseText).forecast.simpleforecast.forecastday[1].icon],
                    nexttomorrow: [JSON.parse(e.target.responseText).forecast.simpleforecast.forecastday[2].high.celsius, JSON.parse(e.target.responseText).forecast.simpleforecast.forecastday[2].icon]    
                }
            });
            this.saveForecast();
        }

        var oReq = new XMLHttpRequest();
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
    }

    refresh() {
        let weatherCookieStatus = document.cookie.replace(/(?:(?:^|.*;\s*)weatherCookieStatus\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        if(weatherCookieStatus !== 'valid=') {
            this.getForecast();
            this.setWeatherCookie(3);
        } else {
            this.loadStoredForecast();
        }
    }

    mapIcons(apiIconLabel) {

    }

    render() {
        const inlineStyles = {
            backgroundColor: '#cab08f'
        };

        return (
            <div className="Weather applet" style={inlineStyles}>
                <div className="main-title">
                    {this.state.forecast.today[0]}&deg;c
                    <span>{this.state.forecast.today[1]}</span></div>
                <div className="sub-title">Hemel Hempstead</div>
            </div>
        );
    }
}

export default Weather;