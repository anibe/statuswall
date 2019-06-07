import React, {Component} from 'react';
import './Weather.css';

class Weather extends Component {

    constructor(props){
        super();
        this.apikey = 'e9jdE9IoDZTAS2lZippALSfGar8eAiIy'; // props.apikey;
        // this.apiEndpoint = 'http://api.wunderground.com/api/'+ this.apikey +'/forecast/q/';
        this.location = 328487; //'UK/Hemel%20Hempstead';
        this.apiEndpoint = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${this.location}?apikey=${this.apikey}&metric=true`;
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
        const rightNow = new Date(),
            isNight = !(rightNow.getHours() >= 7 && rightNow.getHours() < 19);
        function reqListener (e) {
            const data = JSON.parse(e.target.responseText);
            this.setState({
                forecast: {    
                    today: [parseInt(data.DailyForecasts[0].Temperature.Maximum.Value, 10), isNight ? data.DailyForecasts[0].Night.IconPhrase : data.DailyForecasts[0].Day.IconPhrase],
                    tomorrow: [parseInt(data.DailyForecasts[1].Temperature.Maximum.Value, 10), isNight ? data.DailyForecasts[1].Night.IconPhrase : data.DailyForecasts[1].Day.IconPhrase],
                    nexttomorrow: [parseInt(data.DailyForecasts[2].Temperature.Maximum.Value, 10), isNight ? data.DailyForecasts[2].Night.IconPhrase : data.DailyForecasts[2].Day.IconPhrase]
                },
                timeOfDay: isNight ? 'night' : 'day'
            });
            this.saveForecast();
            console.log('Weather updated from network '+ rightNow);
        }
        
        var oReq = new XMLHttpRequest(); // TODO: Consider fetch polyfill
        oReq.addEventListener("load", reqListener.bind(this));
        oReq.open('GET', this.apiEndpoint);
        oReq.send();
    }

    saveForecast() {
        localStorage.cachedForecast = JSON.stringify(this.state.forecast);
    }

    loadStoredForecast() {
        if (localStorage.cachedForecast) {
            this.setState({
                forecast: JSON.parse(localStorage.cachedForecast)
            });
        }
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
                'Intermittent clouds': 'partlycloudy',//'U+1F325',
                'chancerain':'chancerain',
                'storm':'storm',
                'chancetstorms':'chancestorms',
                'Thunderstorms':'tstroms',
                'Partly sunny': this.state.timeOfDay === 'day' ? 'partlycloudy':'halfmoon',
                'Sunny': this.state.timeOfDay === 'day' ? 'sunny':'fullmoon',
                'Clear':this.state.timeOfDay === 'day' ? 'sunny':'fullmoon',
                'Mostly clear':this.state.timeOfDay === 'day' ? 'partlycloudy':'halfmoon',
                'Snow':'snow',
                'Rain':'rain',
                'Mostly cloudy':'mostlycloudy',
                'Cloudy':'cloudy',
                'Fog':'fog',
                'Mostly Sunny': this.state.timeOfDay === 'day' ? 'sunny':'fullmoon',
                'Hazy Sunshine': 'partlycloudy',
                'Dreary (Overcast)': 'mostlycloudy',
                'Showers':'rain',
                'Mostly cloudy w/ showers': 'rain',
                'Partly sunny w/ showers':'sunnyrain',          
                'Partly cloudy':'partlycloudy',
                'Mostly sunny': this.state.timeOfDay === 'day' ? 'sunny':'fullmoon',
                'Partly sunny w/ t-storms': 'sunnyrain'  
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
                <div className="credits">Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" rel="noopener noreferrer" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
            </div>
        );
    }
}

export default Weather;