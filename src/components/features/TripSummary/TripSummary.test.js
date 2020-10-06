import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';


describe('Component TripSummary', () => {
//czy generowany jest component TripSummary
  it('should render without crashing', () => {
    const component = shallow(<TripSummary id='abc' image='image.jpg' cost='cost' days={1} tags={[]} />);
    expect(component).toBeTruthy();
  });
  //czy generowany jest link do poprawnego adresu, np. '/trip/abc', jeśli props id ma wartość 'abc',
  it('should render correct link', () => {
    const component = shallow(<TripSummary id='abc' image='image.jpg' cost='cost' days={1} tags={[]} />);
    expect(component.find('.link').prop('to')).toEqual('/trip/abc');
  });
  ////czy <img> ma poprawne src i alt,
  it('should render correct src and  alt', () => {
    const expectedSrc = 'src';
    const expectedAlt = 'alt';
    const component = shallow(<TripSummary id='abc' image={expectedSrc} name={expectedAlt} cost='cost' days={1} tags={[]} />);
    expect(component.find('img').prop('src')).toEqual(expectedSrc);
    expect(component.find('img').prop('alt')).toEqual(expectedAlt);
  });
  //czy poprawnie renderują się propsy name, cost i days,
  it('should render correct props', () => {
    const expectedName = 'name';
    const expectedCost = 'cost';
    const expectedDays = 1;
    const component = shallow(<TripSummary id='abc' image='image.jpg' name={expectedName} cost={expectedCost} days={expectedDays} tags={[]} />);

    const renderedName = component.find('.title').text();
    expect(renderedName).toEqual(expectedName);

    const renderedCost = component.find('.details').childAt(1).text();
    expect(renderedCost).toEqual(`from ${expectedCost}`);

    const renderedDays = component.find('.details').childAt(0).text();
    expect(renderedDays).toEqual(`${expectedDays} days`);

  });
  //czy jest wywoływany błąd w przypadku braku któregokolwiek z propsów: id, image, name, cost i days
  it('should throw error without required props', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });
  //czy renderowane są tagi
  it('should render tags', () => {
    const expectedTags = ['a', 'b', 'c'];
    const component = shallow(<TripSummary id='abc' image='image.jpg' name='name' cost='cost' days={1} tags={expectedTags} />);

    for(let tag in expectedTags){
      const renderedTag = component.find('.tag').at(tag).text();
      expect(renderedTag).toEqual(expectedTags[tag]);
    }
  });
});


