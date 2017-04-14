import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './Clock';
// import TestUtils from 'react-addons-test-utils';

// const clock = TestUtils.renderIntoDocument(<Clock />);

it('Clock renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Clock />, div);
});

describe('When the Clock component has rendered',() => {
  let clock, testDate, hours, minutes, seconds, dateObj;
  const props = {
    format: 24
  };

  beforeEach(() => {
    clock = new Clock(props);
    testDate = new Date();
    hours = testDate.getHours();
    minutes = testDate.getMinutes();
    seconds = testDate.getSeconds();
  });

  it('shows the current time with hours, minutes and seconds defined', () => {
    dateObj = [hours, minutes, seconds];
    expect(clock.showTime()).toEqual(dateObj);
  });

  it('formatTime should format time values into 2 digits', () => {
    expect(clock.formatTime(12)).toBe("12");
    expect(clock.formatTime(2)).toBe("02");
    expect(clock.formatTime(0)).toBe("00");
  });  
  
});
