import React, {Component} from 'react';
import './OnThisDay.css';

class OnThisDay extends Component {
    render() {
        const inlineStyles = {
            backgroundColor: '#8facca'
        };

        return (
            <div className="OnThisDay applet in-progress" style={inlineStyles}>
                <div className="main-title"></div>
                <div className="sub-title">Today in history</div>
            </div>
        );
    }
}

export default OnThisDay;