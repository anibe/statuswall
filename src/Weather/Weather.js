import React, {Component} from 'react';

class Weather extends Component {

    constructor(){
        super();
        this.apiEndpoint = 'http://api.wunderground.com/api/{api-key}/forecast/q/';
        this.location = 'UK/Hemel%20Hempstead.json';
    }

    getForecast() {

    }

    render() {
        const inlineStyles = {
            backgroundColor: '#cab08f'
        };

        return (
            <div className="Weather applet" style={inlineStyles}>
                <div className="main-title">26&deg;c <span>🌤</span></div>
                <div className="sub-title">Hemel Hempstead</div>
            </div>
        );
    }
}

export default Weather;