import React, {Component} from 'react';

class Weather extends Component {
    render() {
        const inlineStyles = {
            backgroundColor: '#cab08f'
        };

        return (
            <div className="Weather applet" style={inlineStyles}>
                <div className="main-title">Weather</div>
                <div className="sub-title">what's it like outside</div>
            </div>
        );
    }
}

export default Weather;