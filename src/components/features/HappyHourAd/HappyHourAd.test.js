import React from 'react';
import {shallow} from 'enzyme';
import HappyHourAd from './HappyHourAd';


const select = {
  title:'.title',
  promoDescription: '.promoDescription',
};

const mockProps ={
  title: 'title',
  promoDescription: 'promo',
};



describe('Component HappyHourAd', () => {
//TEST 1 czy komponent jest renderowany
  it('should render without crashing,', () => {
    const component = shallow(<HappyHourAd/>);
    expect(component).toBeTruthy();
  });
  //TEST 2 czy renderowane są oba elementy
  it('should render heading and description', () => {
    const component = shallow(<HappyHourAd/>);
    expect(component.exists(select.title)).toEqual(true);
    expect(component.exists(select.promoDescription)).toEqual(true);
  });
  //TEST 3 czy nagłówek ma treść propsa
  it('should render title and promo from props', () => {
    const component = shallow(<HappyHourAd {...mockProps} />);

    expect(component.find(select.title).text()).toEqual(mockProps.title);
  });

});
//TEST 4 czy komunikat wyświetla odpowiednią liczbę sekund
const trueDate = Date;
const mockDate = customDate => class extends Date {
  constructor(...args) {
    if(args.length){
      super(...args);
    } else {
      super(customDate);
    }
    return this;
  }
  static now(){
    return (new Date(customDate)).getTime();
  }
};


const checkDescriptionAtTime = (time, expectedDescription) => {
  it(`should show correct at ${time}`, () => {
    global.Date = mockDate(`2019-05-14T${time}.135Z`);
  
    const component = shallow(<HappyHourAd {...mockProps} />);
    const renderedTime = component.find(select.promoDescription).text();
    expect(renderedTime).toEqual(expectedDescription);
    global.Date = trueDate;

  });
};

beforeAll(() => {
  const utilsModule = jest.requireActual('../../../utils/formatTime.js');
  utilsModule.formatTime = jest.fn(seconds => seconds);
});

describe('Component HappyHourAd with mocked Date', () => {  
  checkDescriptionAtTime('11:57:58', '122');
  checkDescriptionAtTime('11:59:59', '1');
  checkDescriptionAtTime('13:00:00', 23 * 60 * 60 + '');
});


//TEST 5  czy odliczanie co sekundę zmniejsza wyświetlaną liczbę

const checkDescriptionAfterTime = (time, delaySeconds, expectedDescription) => {
  it(`should show correct value ${delaySeconds} seconds after ${time}`, () => {
    jest.useFakeTimers();
    global.Date = mockDate(`2019-05-14T${time}.135Z`); //podmiana date na mock ze zmienioną godziną
    
    const component = shallow(<HappyHourAd {...mockProps} />);
    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + delaySeconds);
    global.Date = mockDate(newTime.getTime());
    jest.advanceTimersByTime(delaySeconds * 1000);  
    const renderedTime = component.find(select.promoDescription).text();
    expect(renderedTime).toEqual(expectedDescription);

    
    global.Date = trueDate; //sprawdzanie aktualnego czasu --> Date
    jest.useRealTimers();
  });
};

describe('Component HappyHourAd with mocked Date', () => {  
  checkDescriptionAfterTime('11:57:58', 2, '120');
  checkDescriptionAfterTime('11:59:58', 1, '1');
  checkDescriptionAfterTime('13:00:00', 60 * 60, 22 * 60 * 60 + '');
});
  
  
//TEST 6 czy komunikat wyświetla informację o promocji przy otwarciu strony

describe('Component HappyHourAd with mocked Date render descrition', () => {
  checkDescriptionAtTime('12:00:00', mockProps.promoDescription);
  checkDescriptionAtTime('12:30:00', mockProps.promoDescription);
  checkDescriptionAtTime('12:59:59', mockProps.promoDescription);
});

// TEST 7 czy komunikat wyświetla informację o promocji kiedy odliczanie dotarło do zera
describe('Component HappyHourAd with mocked Date and delay render description ', () => {
  checkDescriptionAfterTime('11:59:58', 2, mockProps.promoDescription);
  checkDescriptionAfterTime('11:59:59', 2, mockProps.promoDescription);
});