import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('App renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('when it initialises', () => {
  const settings = {
    'Clock': {
      'format':12,
      'colour': '#CA8FCA'
    }
  };
  let app;
  beforeEach(()=>{
    app = new App();
  });

  describe('when all components have loaded', () => {
    
    beforeEach(()=>{
      app.componentDidMount();
    });

    it('should get the list of all applet DOM nodes', ()=>{
      
    });
  });

  xit('should get the settings', () => {
    expect(app.settings).toEqual(settings);
  });

});
