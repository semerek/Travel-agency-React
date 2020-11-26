import { Row, Col } from 'react-flexbox-grid';
import React from 'react';
import OrderSummary from '../OrderSummary/OrderSummary';
import PropTypes from 'prop-types';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption';
import settings from '../../../data/settings.js';
import Button from '../../common/Button/Button';
import {calculateTotal} from '../../../utils/calculateTotal';



const sendOrder = (options, tripCost, tripName, tripId) => {
  const totalCost = calculateTotal(tripCost, options);

  const {contact, name} = options;

  if (name == '' || name < 5) {
    alert('Please fill in correct name, please');
    return;
  }
  if (contact == '' || contact < 5) {
    alert('Please fill in correct contact, please');
    return;
  }

  const payload = {
    ...options,
    totalCost,
    tripName,
    tripId,

  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function(response){
      return response.json();
    }).then(function(parsedResponse){
      console.log('parsedResponse', parsedResponse);
    });
};

const OrderForm = ({tripCost, options, setOrderOption, tripName, tripId}) => (
  
  <Row>
    {pricing.map(option => (
      <Col md={4} key={option.id}>
        <OrderOption currentValue={options[option.id]} setOrderOption={setOrderOption} {...option}/>
      </Col>
    ))}
    <Col xs={12}>
      <OrderSummary totalCost={tripCost} orderOptions={options} />
    </Col>
    <Button onClick={() => sendOrder(options, tripCost, tripName, tripId)}>Order now!</Button>

  </Row>
);



OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
  tripName: PropTypes.string, 
  tripId: PropTypes.string,
  countryCode: PropTypes.string,
};

export default OrderForm;
