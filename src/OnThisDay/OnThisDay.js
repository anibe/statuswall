import React, {Component} from 'react';

class OnThisDay extends Component {
    render() {
        const inlineStyles = {
            backgroundColor: '#8facca'
        };

        return (
            <div className="OnThisDay applet" style={inlineStyles}>
                <div className="main-title">On This Day</div>
                <div className="sub-title">Events in history that happened today</div>
            </div>
        );
    }
}

export default OnThisDay;