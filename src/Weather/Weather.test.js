import React from 'react';
import ReactDOM from 'react-dom';
import Weather from './Weather';

var localStorage = {};

it('Weather renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Weather />, div);
});

describe('When the Weather component has rendered',() => {
  let weather, props;
 // and when the pollingcookie has expired
  describe('And when the pollingCookie has expired',() => {

    beforeEach(()=>{
      props = {
        apikey: 'testapikey'
      };
      document.cookie = "weatherCookieStatus=valid; expires=Fri, 2 Jun 2017 0:00:00 GMT";
      weather = new Weather(props);
      spyOn(weather, 'getForecast');
    });
    // it should get current weather from api
    it('It should get the current weather conditions from api',()=>{
      expect(weather.getForecast).toHaveBeenCalled();
    });
    // it should set a cookie for 6 hours to prevent further calls
    
  }); 

// and when the polling cookie is still valid

    // it should show the weather


  
});

describe('',() => {
 
  
});