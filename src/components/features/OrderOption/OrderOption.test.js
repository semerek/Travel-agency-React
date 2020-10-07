import React from 'react';
import { shallow } from 'enzyme';
import OrderOption from './OrderOption.js';
import DatePicker from 'react-datepicker';



describe('Component OrderOption', () => {
  //czy generowany jest component OrderOption
  it('should render without crashing', () => {
    const component = shallow(<OrderOption id='abc' name='name' type='typ' />);
    expect(component).toBeTruthy();
  });
  //czy przy braku typu opcji komponent zwróci null
  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });

});

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};
const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    { id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0 },
    { id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100 },
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: { currentValue: [mockProps.currentValue] },
  number: { currentValue: 1 },
  text: {},
  date: { currentValue: mockProps.DatePicker },
};

const testValue = mockProps.values[1].id;
const testValueNumber = 3;

for (let type in optionTypes) {
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */
    let component;
    let subcomponent;
    let renderedSubcomponent;
    let mockSetOrderOption;

    beforeEach(() => {
      mockSetOrderOption = jest.fn();
      component = shallow(
        <OrderOption
          type={type}
          setOrderOption={mockSetOrderOption}
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
    });

    /* common tests */
    it('passes dummy test', () => {
      expect(1).toBe(1);
    });
    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });

    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        /* tests for dropdown */
        it('contains select and options', () => {
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);

          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);

          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
      case 'icons': {
        it( 'contains div', () => {
          const div = renderedSubcomponent.find('.icon');
          expect(div.length).toBe(3);
          expect(div.at(0).type()).toBe('div');
          expect(div.at(1).type()).toBe('div');
          expect(div.at(2).type()).toBe('div');
        });
        it ('should run setOrderOption function on click', () => {
          renderedSubcomponent.find('.icon').at(2).simulate('click',);
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue});
        });
        break;
      }
      case 'checkboxes': {
        it('contains div, input', () => {
          const div = renderedSubcomponent.find('.checkboxes');
          expect(div.length).toBe(1);

          const input = div.find('input[type="checkbox"]');
          expect(input.length).toBe(mockProps.values.length);

          expect(input.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(input.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it ('should render setOrderOption function on change', () => {
          //znalezienie input'u o atrybucie value równy wartości stałej testValue
          renderedSubcomponent.find(`input[value="${testValue}"]`).simulate ('change',{currentTarget: {checked: true}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          //wartością opcji dla checkbox jest tablica!
          expect(mockSetOrderOption).toBeCalledWith({[mockProps.id]: [mockProps.currentValue, testValue]});
        });
        break;
      }
      case 'number': {
        it('contains, div, input', () => {
          const div =renderedSubcomponent.find('.number');
          expect(div.length).toBe(1);

          const input = div.find('input[type="number"]');
          expect(input.length).toBe(1);
        });
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValueNumber}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
        });
        break;
      }
      case 'text': {
        it('contains div, input', () => {
          const div =renderedSubcomponent.find('div');
          expect(div.length).toBe(1);

          const input = div.find('input[type="text"]');
          expect(input.length).toBe(1);
        });
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({[mockProps.id]: testValue});
        });
        break;
      }

      case 'date': {
        it('contains DatePicker', () => {
          const datePicker = renderedSubcomponent.find(DatePicker);
          expect(datePicker.length).toBe(1);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find(DatePicker).simulate('change', testValue);
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({[mockProps.id]: testValue});
          console.log(subcomponent.debug());

        });
        break;
      } 
    }
  });
}