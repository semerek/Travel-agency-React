import React from 'react';
import { shallow } from 'enzyme';
import DaysToSummer from './DaysToSummer';

const select = {
  title: '.title',
};


describe('Component DaysToSummer', () => {

  it('should render without crashing', () => {
    const component = shallow(<DaysToSummer/>);
    expect(component).toBeTruthy();    
  });

  it('should render heading', () => {
    const component = shallow(<DaysToSummer />);
    expect(component.exists(select.title)).toEqual(true);
  });

});
