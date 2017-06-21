import React, {Component} from 'react';
import './Calendar.css';

class Calendar extends Component {

    getEvents(date, numberOfEvents) {
        return {
        "kind": "calendar#events",
        "summary": "Anibe Agamah",
        "updated": "2017-06-20T05:47:39.276Z",
        "timeZone": "Europe/London",
        "accessRole": "owner",
        "defaultReminders": [
        {
        "method": "sms",
        "minutes": 10
        },
        {
        "method": "popup",
        "minutes": 10
        }
        ],
        "nextPageToken": "EnwKcV82b3BrNGdpMThrc2ppYzFtNmdvajhncGg4b3M0NmM5bTZsMWpjZGkyNzUzNDRjOWs4a3JqMGMxZzYwbzMwYzFnNjBvMzBjMWc2MG8zMGMxZzYwbzMwYzFnNjBvMzBjMWc2MG8zMGMwXzIwMjUwMTI4GICAjv6Nl4sD",
        "items": [
        {
        "kind": "calendar#event",
        "etag": "\"2980706123166000\"",
        "id": "_6tlnaqrle5p6cpb4dhmj4phpehl74ppi6ss30tj4ddm6cq9lc5jjathmelommsr8d0o3esr3e5lm4shh6pj6ccpndlln8obfeln62s1oddkme",
        "status": "confirmed",
        "htmlLink": "https://www.google.com/calendar/event?eid=XzZ0bG5hcXJsZTVwNmNwYjRkaG1qNHBocGVobDc0cHBpNnNzMzB0ajRkZG02Y3E5bGM1amphdGhtZWxvbW1zcjhkMG8zZXNyM2U1bG00c2hoNnBqNmNjcG5kbGxuOG9iZmVsbjYyczFvZGRrbWUgbWFpbEBhbmliZWFnYW1haC5jb20",
        "created": "2017-03-24T10:57:20.000Z",
        "updated": "2017-03-24T10:57:41.583Z",
        "summary": "Summer Series at Somerset House with American Express® -Robert Glasper",
        "description": "To see detailed information for automatically created events like this one, use the official Google Calendar app. https://g.co/calendar\n\nThis event was created from an email that you received in Gmail. https://mail.google.com/mail?extsrc=cal&plid=ACUX6DOsj7Trq1y35nHRAhuN2GY3E3amh1hFXBM\n",
        "location": "Somerset House, London, England, United Kingdom",
        "creator": {
            "email": "mail@anibeagamah.com",
            "self": true
        },
        "organizer": {
            "email": "unknownorganizer@calendar.google.com",
            "displayName": "Unknown Organizer"
        },
        "start": {
            "dateTime": "2017-07-11T19:30:00+01:00"
        },
        "end": {
            "dateTime": "2017-07-11T20:30:00+01:00"
        },
        "endTimeUnspecified": true,
        "transparency": "transparent",
        "visibility": "private",
        "iCalUID": "7kukuqrfedlm2f9tjrg2780vdklfi5ag5v6uqkshh07scqkbr16ff37mktaounap8kig",
        "sequence": 0,
        "attendees": [
            {
            "email": "mail@anibeagamah.com",
            "self": true,
            "responseStatus": "accepted"
            }
        ],
        "guestsCanInviteOthers": false,
        "privateCopy": true,
        "reminders": {
            "useDefault": true
        },
        "source": {
            "url": "https://mail.google.com/mail?extsrc=cal&plid=ACUX6DOsj7Trq1y35nHRAhuN2GY3E3amh1hFXBM",
            "title": ""
        }
        },
        {
        "kind": "calendar#event",
        "etag": "\"2987107281668000\"",
        "id": "_6tlnaqrle5p6cpb4dhmj4phpehl6csbl6so32r1j6lh32thie5o70ebjd0q66rpi6hm6ct1iehl6osb2e5ojco9jchmmkpr6d8s3gqb7ellme",
        "status": "confirmed",
        "htmlLink": "https://www.google.com/calendar/event?eid=XzZ0bG5hcXJsZTVwNmNwYjRkaG1qNHBocGVobDZjc2JsNnNvMzJyMWo2bGgzMnRoaWU1bzcwZWJqZDBxNjZycGk2aG02Y3QxaWVobDZvc2IyZTVvamNvOWpjaG1ta3ByNmQ4czNncWI3ZWxsbWUgbWFpbEBhbmliZWFnYW1haC5jb20",
        "created": "2017-04-30T12:00:24.000Z",
        "updated": "2017-04-30T12:00:40.834Z",
        "summary": "UNVEILING Arts Festival 2017",
        "description": "To see detailed information for automatically created events like this one, use the official Google Calendar app. https://g.co/calendar\n\nThis event was created from an email that you received in Gmail. https://mail.google.com/mail?extsrc=cal&plid=ACUX6DNMLYusP4HI47nlAUvH9-zLbI5euSpa5K4\n",
        "location": "The Engine Room, Hale VillageTottenhamN17 9FT London, London, GB, N17 9FT",
        "creator": {
            "email": "mail@anibeagamah.com",
            "self": true
        },
        "organizer": {
            "email": "unknownorganizer@calendar.google.com",
            "displayName": "Unknown Organizer"
        },
        "start": {
            "dateTime": "2017-07-21T19:00:00+01:00"
        },
        "end": {
            "dateTime": "2017-07-23T18:30:00+01:00"
        },
        "transparency": "transparent",
        "visibility": "private",
        "iCalUID": "7kukuqrfedlm2f9tjfqu701l35b1v2qpp9sh4co24lft2tjlqbqq6a3dmjgfj88igukg",
        "sequence": 0,
        "attendees": [
            {
            "email": "mail@anibeagamah.com",
            "self": true,
            "responseStatus": "accepted"
            }
        ],
        "guestsCanInviteOthers": false,
        "privateCopy": true,
        "reminders": {
            "useDefault": true
        },
        "source": {
            "url": "https://mail.google.com/mail?extsrc=cal&plid=ACUX6DNMLYusP4HI47nlAUvH9-zLbI5euSpa5K4",
            "title": ""
        }
        },
        {
        "kind": "calendar#event",
        "etag": "\"2872450147374000\"",
        "id": "_6opk4gi18ksjic1m6goj8gph8os46c9m6l1jcdi275344c9k8krj0c1g60o30c1g60o30c1g60o30c1g60o30c1g60o30c1g60o30c0_20180128",
        "status": "confirmed",
        "htmlLink": "https://www.google.com/calendar/event?eid=XzZvcGs0Z2kxOGtzamljMW02Z29qOGdwaDhvczQ2YzltNmwxamNkaTI3NTM0NGM5azhrcmowYzFnNjBvMzBjMWc2MG8zMGMxZzYwbzMwYzFnNjBvMzBjMWc2MG8zMGMxZzYwbzMwYzBfMjAxODAxMjggbWFpbEBhbmliZWFnYW1haC5jb20",
        "created": "2012-01-19T11:25:09.000Z",
        "updated": "2015-07-06T23:24:33.687Z",
        "summary": "Aldomers birthday",
        "creator": {
            "email": "mail@anibeagamah.com",
            "self": true
        },
        "organizer": {
            "email": "mail@anibeagamah.com",
            "self": true
        },
        "start": {
            "date": "2018-01-28"
        },
        "end": {
            "date": "2018-01-29"
        },
        "recurringEventId": "_6opk4gi18ksjic1m6goj8gph8os46c9m6l1jcdi275344c9k8krj0c1g60o30c1g60o30c1g60o30c1g60o30c1g60o30c1g60o30c0",
        "originalStartTime": {
            "date": "2018-01-28"
        },
        "iCalUID": "63BBAE9906414C1F8C165C66B9FB14E700000000000000000000000000000000",
        "sequence": 0,
        "reminders": {
            "useDefault": false
        }
        },
        {
        "kind": "calendar#event",
        "etag": "\"2872450147374000\"",
        "id": "_6opk4gi18ksjic1m6goj8gph8os46c9m6l1jcdi275344c9k8krj0c1g60o30c1g60o30c1g60o30c1g60o30c1g60o30c1g60o30c0_20190128",
        "status": "confirmed",
        "htmlLink": "https://www.google.com/calendar/event?eid=XzZvcGs0Z2kxOGtzamljMW02Z29qOGdwaDhvczQ2YzltNmwxamNkaTI3NTM0NGM5azhrcmowYzFnNjBvMzBjMWc2MG8zMGMxZzYwbzMwYzFnNjBvMzBjMWc2MG8zMGMxZzYwbzMwYzBfMjAxOTAxMjggbWFpbEBhbmliZWFnYW1haC5jb20",
        "created": "2012-01-19T11:25:09.000Z",
        "updated": "2015-07-06T23:24:33.687Z",
        "summary": "Aldomers birthday",
        "creator": {
            "email": "mail@anibeagamah.com",
            "self": true
        },
        "organizer": {
            "email": "mail@anibeagamah.com",
            "self": true
        },
        "start": {
            "date": "2019-01-28"
        },
        "end": {
            "date": "2019-01-29"
        },
        "recurringEventId": "_6opk4gi18ksjic1m6goj8gph8os46c9m6l1jcdi275344c9k8krj0c1g60o30c1g60o30c1g60o30c1g60o30c1g60o30c1g60o30c0",
        "originalStartTime": {
            "date": "2019-01-28"
        },
        "iCalUID": "63BBAE9906414C1F8C165C66B9FB14E700000000000000000000000000000000",
        "sequence": 0,
        "reminders": {
            "useDefault": false
        }
        },
        {
        "kind": "calendar#event",
        "etag": "\"2872450147374000\"",
        "id": "_6opk4gi18ksjic1m6goj8gph8os46c9m6l1jcdi275344c9k8krj0c1g60o30c1g60o30c1g60o30c1g60o30c1g60o30c1g60o30c0_20200128",
        "status": "confirmed",
        "htmlLink": "https://www.google.com/calendar/event?eid=XzZvcGs0Z2kxOGtzamljMW02Z29qOGdwaDhvczQ2YzltNmwxamNkaTI3NTM0NGM5azhrcmowYzFnNjBvMzBjMWc2MG8zMGMxZzYwbzMwYzFnNjBvMzBjMWc2MG8zMGMxZzYwbzMwYzBfMjAyMDAxMjggbWFpbEBhbmliZWFnYW1haC5jb20",
        "created": "2012-01-19T11:25:09.000Z",
        "updated": "2015-07-06T23:24:33.687Z",
        "summary": "Aldomers birthday",
        "creator": {
            "email": "mail@anibeagamah.com",
            "self": true
        },
        "organizer": {
            "email": "mail@anibeagamah.com",
            "self": true
        },
        "start": {
            "date": "2020-01-28"
        },
        "end": {
            "date": "2020-01-29"
        },
        "recurringEventId": "_6opk4gi18ksjic1m6goj8gph8os46c9m6l1jcdi275344c9k8krj0c1g60o30c1g60o30c1g60o30c1g60o30c1g60o30c1g60o30c0",
        "originalStartTime": {
            "date": "2020-01-28"
        },
        "iCalUID": "63BBAE9906414C1F8C165C66B9FB14E700000000000000000000000000000000",
        "sequence": 0,
        "reminders": {
            "useDefault": false
        }
        },
        {
        "kind": "calendar#event",
        "etag": "\"2872450147374000\"",
        "id": "_6opk4gi18ksjic1m6goj8gph8os46c9m6l1jcdi275344c9k8krj0c1g60o30c1g60o30c1g60o30c1g60o30c1g60o30c1g60o30c0_20210128",
        "status": "confirmed",
        "htmlLink": "https://www.google.com/calendar/event?eid=XzZvcGs0Z2kxOGtzamljMW02Z29qOGdwaDhvczQ2YzltNmwxamNkaTI3NTM0NGM5azhrcmowYzFnNjBvMzBjMWc2MG8zMGMxZzYwbzMwYzFnNjBvMzBjMWc2MG8zMGMxZzYwbzMwYzBfMjAyMTAxMjggbWFpbEBhbmliZWFnYW1haC5jb20",
        "created": "2012-01-19T11:25:09.000Z",
        "updated": "2015-07-06T23:24:33.687Z",
        "summary": "Aldomers birthday",
        "creator": {
            "email": "mail@anibeagamah.com",
            "self": true
        },
        "organizer": {
            "email": "mail@anibeagamah.com",
            "self": true
        },
        "start": {
            "date": "2021-01-28"
        },
        "end": {
            "date": "2021-01-29"
        },
        "recurringEventId": "_6opk4gi18ksjic1m6goj8gph8os46c9m6l1jcdi275344c9k8krj0c1g60o30c1g60o30c1g60o30c1g60o30c1g60o30c1g60o30c0",
        "originalStartTime": {
            "date": "2021-01-28"
        },
        "iCalUID": "63BBAE9906414C1F8C165C66B9FB14E700000000000000000000000000000000",
        "sequence": 0,
        "reminders": {
            "useDefault": false
        }
        },
        {
        "kind": "calendar#event",
        "etag": "\"2872450147374000\"",
        "id": "_6opk4gi18ksjic1m6goj8gph8os46c9m6l1jcdi275344c9k8krj0c1g60o30c1g60o30c1g60o30c1g60o30c1g60o30c1g60o30c0_20220128",
        "status": "confirmed",
        "htmlLink": "https://www.google.com/calendar/event?eid=XzZvcGs0Z2kxOGtzamljMW02Z29qOGdwaDhvczQ2YzltNmwxamNkaTI3NTM0NGM5azhrcmowYzFnNjBvMzBjMWc2MG8zMGMxZzYwbzMwYzFnNjBvMzBjMWc2MG8zMGMxZzYwbzMwYzBfMjAyMjAxMjggbWFpbEBhbmliZWFnYW1haC5jb20",
        "created": "2012-01-19T11:25:09.000Z",
        "updated": "2015-07-06T23:24:33.687Z",
        "summary": "Aldomers birthday",
        "creator": {
            "email": "mail@anibeagamah.com",
            "self": true
        },
        "organizer": {
            "email": "mail@anibeagamah.com",
            "self": true
        },
        "start": {
            "date": "2022-01-28"
        },
        "end": {
            "date": "2022-01-29"
        },
        "recurringEventId": "_6opk4gi18ksjic1m6goj8gph8os46c9m6l1jcdi275344c9k8krj0c1g60o30c1g60o30c1g60o30c1g60o30c1g60o30c1g60o30c0",
        "originalStartTime": {
            "date": "2022-01-28"
        },
        "iCalUID": "63BBAE9906414C1F8C165C66B9FB14E700000000000000000000000000000000",
        "sequence": 0,
        "reminders": {
            "useDefault": false
        }
        },
        {
        "kind": "calendar#event",
        "etag": "\"2872450147374000\"",
        "id": "_6opk4gi18ksjic1m6goj8gph8os46c9m6l1jcdi275344c9k8krj0c1g60o30c1g60o30c1g60o30c1g60o30c1g60o30c1g60o30c0_20230128",
        "status": "confirmed",
        "htmlLink": "https://www.google.com/calendar/event?eid=XzZvcGs0Z2kxOGtzamljMW02Z29qOGdwaDhvczQ2YzltNmwxamNkaTI3NTM0NGM5azhrcmowYzFnNjBvMzBjMWc2MG8zMGMxZzYwbzMwYzFnNjBvMzBjMWc2MG8zMGMxZzYwbzMwYzBfMjAyMzAxMjggbWFpbEBhbmliZWFnYW1haC5jb20",
        "created": "2012-01-19T11:25:09.000Z",
        "updated": "2015-07-06T23:24:33.687Z",
        "summary": "Aldomers birthday",
        "creator": {
            "email": "mail@anibeagamah.com",
            "self": true
        },
        "organizer": {
            "email": "mail@anibeagamah.com",
            "self": true
        },
        "start": {
            "date": "2023-01-28"
        },
        "end": {
            "date": "2023-01-29"
        },
        "recurringEventId": "_6opk4gi18ksjic1m6goj8gph8os46c9m6l1jcdi275344c9k8krj0c1g60o30c1g60o30c1g60o30c1g60o30c1g60o30c1g60o30c0",
        "originalStartTime": {
            "date": "2023-01-28"
        },
        "iCalUID": "63BBAE9906414C1F8C165C66B9FB14E700000000000000000000000000000000",
        "sequence": 0,
        "reminders": {
            "useDefault": false
        }
        },
        {
        "kind": "calendar#event",
        "etag": "\"2872450147374000\"",
        "id": "_6opk4gi18ksjic1m6goj8gph8os46c9m6l1jcdi275344c9k8krj0c1g60o30c1g60o30c1g60o30c1g60o30c1g60o30c1g60o30c0_20240128",
        "status": "confirmed",
        "htmlLink": "https://www.google.com/calendar/event?eid=XzZvcGs0Z2kxOGtzamljMW02Z29qOGdwaDhvczQ2YzltNmwxamNkaTI3NTM0NGM5azhrcmowYzFnNjBvMzBjMWc2MG8zMGMxZzYwbzMwYzFnNjBvMzBjMWc2MG8zMGMxZzYwbzMwYzBfMjAyNDAxMjggbWFpbEBhbmliZWFnYW1haC5jb20",
        "created": "2012-01-19T11:25:09.000Z",
        "updated": "2015-07-06T23:24:33.687Z",
        "summary": "Aldomers birthday",
        "creator": {
            "email": "mail@anibeagamah.com",
            "self": true
        },
        "organizer": {
            "email": "mail@anibeagamah.com",
            "self": true
        },
        "start": {
            "date": "2024-01-28"
        },
        "end": {
            "date": "2024-01-29"
        },
        "recurringEventId": "_6opk4gi18ksjic1m6goj8gph8os46c9m6l1jcdi275344c9k8krj0c1g60o30c1g60o30c1g60o30c1g60o30c1g60o30c1g60o30c0",
        "originalStartTime": {
            "date": "2024-01-28"
        },
        "iCalUID": "63BBAE9906414C1F8C165C66B9FB14E700000000000000000000000000000000",
        "sequence": 0,
        "reminders": {
            "useDefault": false
        }
        },
        {
        "kind": "calendar#event",
        "etag": "\"2872450147374000\"",
        "id": "_6opk4gi18ksjic1m6goj8gph8os46c9m6l1jcdi275344c9k8krj0c1g60o30c1g60o30c1g60o30c1g60o30c1g60o30c1g60o30c0_20250128",
        "status": "confirmed",
        "htmlLink": "https://www.google.com/calendar/event?eid=XzZvcGs0Z2kxOGtzamljMW02Z29qOGdwaDhvczQ2YzltNmwxamNkaTI3NTM0NGM5azhrcmowYzFnNjBvMzBjMWc2MG8zMGMxZzYwbzMwYzFnNjBvMzBjMWc2MG8zMGMxZzYwbzMwYzBfMjAyNTAxMjggbWFpbEBhbmliZWFnYW1haC5jb20",
        "created": "2012-01-19T11:25:09.000Z",
        "updated": "2015-07-06T23:24:33.687Z",
        "summary": "Aldomers birthday",
        "creator": {
            "email": "mail@anibeagamah.com",
            "self": true
        },
        "organizer": {
            "email": "mail@anibeagamah.com",
            "self": true
        },
        "start": {
            "date": "2025-01-28"
        },
        "end": {
            "date": "2025-01-29"
        },
        "recurringEventId": "_6opk4gi18ksjic1m6goj8gph8os46c9m6l1jcdi275344c9k8krj0c1g60o30c1g60o30c1g60o30c1g60o30c1g60o30c1g60o30c0",
        "originalStartTime": {
            "date": "2025-01-28"
        },
        "iCalUID": "63BBAE9906414C1F8C165C66B9FB14E700000000000000000000000000000000",
        "sequence": 0,
        "reminders": {
            "useDefault": false
        }
        }
        ]
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
                        <div className="dates">Monday</div>
                        <h4>Summer Series at Somerset House with American Express® -Robert Glasper</h4>
                    </li>
                    <li>
                        <div className="dates">Tuesday</div>
                        <h4>Church Meeting</h4>
                    </li>                    
                    <li>
                        <div className="dates">Thursday</div>
                        <h4>Arsenal v CSKA Moscow ⚽<br/><span>Channel 5</span></h4>
                    </li>                                        
                    <li>
                        <div className="dates">Friday</div>
                        <h4>Unveiling Arts Festival</h4>
                    </li>
                    <li>
                        <div className="dates">Sunday</div>
                        <h4>Dipo 🎂</h4>
                    </li>                                       
                </ul>                    
                {/*<div className="sub-title">No events this week</div>*/}
            </div>
        );
    }
}

export default Calendar;