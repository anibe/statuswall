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

  describe('and the time format is "24"', () => {

    const props = {
      is24HourFormat: true
    };

    beforeEach(() => {
      clock = new Clock(props);
      testDate = new Date(); // new Date('Sun May 14 2017 20:35:50 GMT+0100 (BST)');
      hours = testDate.getHours();
      minutes = testDate.getMinutes();
      seconds = testDate.getSeconds();

      spyOn(clock, ['setState']);
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

    it('should show the correct 24 hour time format', () => {
      expect(clock.formatHours(14)).toBe(14);
      expect(clock.formatHours(23)).toBe(23);
      expect(clock.formatHours(0)).toBe(0);
    });

    it('should update the date value of setStatte with the current date', ()=> {
      clock.tick();
      expect(clock.setState).toHaveBeenCalledWith({ date: new Date()});
    });

    xdescribe('And when the component successfully mounts', ()=>{
      beforeEach(()=>{
        clock.componentDidMount();
      });

      it('should update the timerId every second', ()=>{
        expect(clock.timerID).toBe(4); // What is 4?
      });
    }); 
  });

  describe('and the time format is "12"', () => {

    const props = {
      is24HourFormat: false
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

    it('should show the correct 12 hour time format', () => {
      expect(clock.formatHours(14)).toBe(2);
      expect(clock.formatHours(23)).toBe(11);
      // expect(clock.formatHours(0)).toBe(12);
    });
  });  
  
});
