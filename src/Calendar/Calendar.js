import React, {Component} from 'react';
// import google from 'googleapis';
import './Calendar.css';

class Calendar extends Component {

    constructor(props){
        super();
        this.apiEndpoint = '';
        this.state = {
            events: []
        }
    }

    handleClientLoad() {
        window.gapi.load('client:auth2', initClient);
    }

    /**
     *  Initializes the API client library and sets up sign-in state
     *  listeners.
     */
    initClient() {
        gapi.client.init({
            discoveryDocs: DISCOVERY_DOCS,
            clientId: CLIENT_ID,
            scope: SCOPES
        }).then(function () {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

            // Handle the initial sign-in state.
            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            authorizeButton.onclick = handleAuthClick;
            signoutButton.onclick = handleSignoutClick;
        });
    }    

    getEvents(date, numberOfEvents) {       
        
        window.gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 4,
          'orderBy': 'startTime'
        }).then(function(response) {
          let events = response.result.items;

          if (events.length > 0) {
            for (let i = 0; i < events.length; i++) {
              var event = events[i];
              var when = event.start.dateTime;
              if (!when) {
                when = event.start.date;
              }
              events.push({
                  "date": when,
                  "summary": event.summary,
                  "location": event.location
              });
              console.log('Calendar last updated '+ new Date());
            }
            this.setState({
                events: events                
            });
          }
        });
    }

    componentDidMount() {
        this.getEvents();
        this.timerID = setInterval(() => this.getEvents(),
            1000*60*60*4
        );
        this.loadApi();
    }

    loadApi() {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/api.js";
        document.body.appendChild(script);

        script.onload = () => { 
            window.gapi.load('client:auth2', this.checkAuth.bind(this));
        }
    }      

    render() {
        const inlineStyles = {
            backgroundColor: '#8fcaa9'
        };

        return (
            <div className="Calendar applet" style={inlineStyles}>
                <h3>This week</h3>
                <ul>
                    <li>
                        <div className="dates">July 10</div>
                        <h4>Summer Series at Somerset House with American Express® -Robert Glasper</h4>
                    </li>                    
                    <li>
                        <div className="dates">July 12</div>
                        <h4>Arsenal v CSKA Moscow <em>⚽</em><br/><span className="location">Channel 5</span></h4>
                    </li>                                        
                    <li>
                        <div className="dates">Aug 5</div>
                        <h4>Dipo <em>🎂</em></h4>                        
                    </li>                                       
                </ul>                    
                {/*<div className="sub-title">No events this week</div>*/}
            </div>
        );
    }
}

export default Calendar;