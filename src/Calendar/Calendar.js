import React, {Component} from 'react';
import './Calendar.css';

class Calendar extends Component {
    render() {
        const inlineStyles = {
            backgroundColor: '#8fcaa9'
        };

        return (
            <div className="Calendar applet" style={inlineStyles}>
                <div className="main-title">Calendar</div>
                <div className="sub-title">What have we got planned this week?</div>
            </div>
        );
    }
}

export default Calendar;