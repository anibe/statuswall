import React, {Component} from 'react';
// import google from 'googleapis';
import './WorldCup.css';

// Client ID and API key from the Developer Console
var CLIENT_ID = '288482386496-vtni4bnou340b2jj49p008nqn66idub2.apps.googleusercontent.com';

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

const trackedCountries = ['Nigeria', 'England', 'France', 'Spain', 'Uruguay'];

class WorldCup extends Component {

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
            eventListHTML: '',
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
            window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

            // Handle the initial sign-in state.
            updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get(), context);
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
            'calendarId': 'bphso965blgpbtaiq1k8vc65kl41aa8q@import.calendar.google.com',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 64,
            'orderBy': 'startTime'
        }).then(function(response) {
            console.log('calendar updated');
            let events = response.result.items,
                eventListHTML = '';

            let filteredEvents = [];
            events.forEach((ev) => {
                trackedCountries.forEach((country) => {
                    if (ev.summary.includes(country)) {
                        filteredEvents.push(ev);
                    }
                });
            });

            function formatDate(date) {
                let calDate = new Date(date);
                let oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
                let rightNow = new Date();
                let dateFormatted;
                let monthNames = [
                    "Jan", "Feb", "Mar",
                    "Apr", "May", "Jun", "Jul",
                    "Aug", "Sept", "Oct",
                    "Nov", "Dec"
                  ];
                let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];                  
                
                let diffDays = Math.round(Math.abs((calDate.getTime() - rightNow.getTime())/(oneDay)));

                if (diffDays < 7) {
                    var dayNum = calDate.getDay();
                    dateFormatted = days[dayNum];
                } else {
                    dateFormatted = monthNames[calDate.getMonth()] +' '+ calDate.getDate();
                }

                return dateFormatted;
            }

            function formatTime(digit) {
                return ("0" + digit).slice(-2);
            }
            
            function transformHTML4Flag(data) {
                let transformed;
                trackedCountries.forEach((country) => {
                    if (data.includes(country)) {
                        transformed = data.replace(country, '<b class="watched '+ country +'">'+ country +'</b>');
                    }
                });

                if (transformed) {
                    return transformed;
                } else {
                    return data;
                }
            }

            if (filteredEvents.length > 0) {

                for (let i = 0; i < 4; i++) {
                    var event = filteredEvents[i];
                    var when = event.start.dateTime;
                    var time = null;
                    if (!when) {
                        when = event.start.date;
                    }  else {
                        time = formatTime(new Date(when).getHours()) +':'+ formatTime(new Date(when).getMinutes());
                    }
                    eventListHTML += '<li><div class="dates">';
                    eventListHTML += formatDate(when) +'</div><h4>';
                    eventListHTML += transformHTML4Flag(event.summary);
                    eventListHTML += time ? '<br/><span class="time">'+ time +'</span>' : '';
                    eventListHTML += '</h4></li>';
                }

                context.setState({
                    events: filteredEvents,
                    eventListHTML           
                });                
            } else {
                context.setState({
                    eventListHTML: '<li><h4>No upcoming events</h4></li>'
                });
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
        this.timerID = setInterval(() => this.listUpcomingEvents(this),
            1000*60*60*1 //refresh calendar every 1 hours
        );  
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
            backgroundColor: '#ca8fad'
        };

        return (            
            <div className="Calendar WorldCup applet" style={inlineStyles}>
                <h3>FIFA World Cup 2018</h3>
                <ul dangerouslySetInnerHTML={{ __html: this.state.eventListHTML}}/>
                <button id="authorize-button" onClick={this.handleAuthClick} style={{display: this.state.buttons.authStyle}}>Authorize</button>
                <button id="signout-button" onClick={this.handleSignoutClick} style={{display: this.state.buttons.soStyle}}>Sign Out</button>
            </div>
        );
    }
}

export default WorldCup;