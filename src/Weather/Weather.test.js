import React from 'react';
import ReactDOM from 'react-dom';
import Weather from './Weather';

it('Weather renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Weather />, div);
});

describe('When the Weather component has rendered',() => {
 
  
});
