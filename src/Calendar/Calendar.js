import React, {Component} from 'react';
// import google from 'googleapis';
import './Calendar.css';

// Client ID and API key from the Developer Console
const CLIENT_ID = '1030765228226-o5qp4k2qhn50hm99ssu5kdbg44gk7f26.apps.googleusercontent.com';

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

class Calendar extends Component {

    constructor(props){
        super();
        this.apiEndpoint = '';
        this.state = {
            events: [{
                start: {
                    date: 'date'
                },
                summary: 'summary'
            }],
            buttons: {
                authStyle: 'none',
                soStyle: 'none'
            }
        }
    }

    handleClientLoad() {
        window.gapi.load('client:auth2', this.initClient.bind(this));
    }

    /**
     *  Initializes the API client library and sets up sign-in state
     *  listeners.
     */
    initClient() {
        let updateSigninStatus = this.updateSigninStatus,
            context = this;

        window.gapi.client.init({
            discoveryDocs: DISCOVERY_DOCS,
            clientId: CLIENT_ID,
            scope: SCOPES
        }).then(function () {
            // Listen for sign-in state changes.
            console.log(this);
            window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

            // Handle the initial sign-in state.
            updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get(), context);
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

    /**
     *  Called when the signed in status changes, to update the UI
     *  appropriately. After a sign-in, the API is called.
     */
    updateSigninStatus(isSignedIn, context) {
        if (isSignedIn) {
            context.setState({
                buttons : {
                    authStyle: 'none',
                    soStyle: 'block'
                }
            });
            context.listUpcomingEvents(context);
        } else {
            context.setState({
                buttons : {
                    authStyle: 'block',
                    soStyle: 'none'
                }
            });
        }
    }

    /**
     * Print the summary and start datetime/date of the next ten events in
     * the authorized user's calendar. If no events are found an
     * appropriate message is printed.
     */
    listUpcomingEvents(context) {
        window.gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        }).then(function(response) {
            var events = response.result.items;
            console.log('Upcoming events:');

            if (events.length > 0) {

                context.setState({
                    events: events                
                });

                for (let i = 0; i < events.length; i++) {
                    var event = events[i];
                    var when = event.start.dateTime;
                    if (!when) {
                        when = event.start.date;
                    }
                    console.log(event.summary + ' (' + when + ')');                    
                }
            } else {
                console.log('No upcoming events found.');
            }
        });
    }
    
    /**
     * Append a pre element to the body containing the given message
     * as its text node. Used to display the results of the API call.
     *
     * @param {string} message Text to be placed in pre element.
     */
    appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
    }    

    /**
     *  Sign in the user upon button click.
     */
    handleAuthClick(event) {
        window.gapi.auth2.getAuthInstance().signIn();
    }

    /**
     *  Sign out the user upon button click.
     */
    handleSignoutClick(event) {
        window.gapi.auth2.getAuthInstance().signOut();
    }      

    componentDidMount() {
        this.loadApi();
        // this.timerID = setInterval(() => this.getEvents(),
        //     1000*60*60*4
        // );  
    }

    loadApi() {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/api.js";
        document.body.appendChild(script);

        script.onload = () => { 
            window.gapi.load('client:auth2', this.handleClientLoad.bind(this));
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
                        <div className="dates">{this.state.events[0].start.date}</div>
                        <h4>{this.state.events[0].summary}</h4>
                    </li>
                    <li>
                        <div className="dates">{this.state.events[1].start.date}</div>
                        <h4>{this.state.events[1].summary}</h4>
                    </li>
                    <li>
                        <div className="dates">{this.state.events[2].start.date}</div>
                        <h4>{this.state.events[2].summary}</h4>
                    </li>                                                                             
                </ul>
                <button id="authorize-button" onClick={this.handleAuthClick} style={{display: this.state.buttons.authStyle}}>Authorize</button>
                <button id="signout-button" onClick={this.handleSignoutClick} style={{display: this.state.buttons.soStyle}}>Sign Out</button>

                <pre id="content"></pre>                  
                {/*<div className="sub-title">No events this week</div>*/}
            </div>
        );
    }
}

export default Calendar;