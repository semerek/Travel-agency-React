import { Row, Col } from 'react-flexbox-grid';
import React from 'react';
import OrderSummary from '../OrderSummary/OrderSummary';
import PropTypes from 'prop-types';



const OrderForm = (props) => {
  return (
    <Row>
      <Col xs={12}>
        <OrderSummary totalCost={props.tripCost} orderOptions={props.options} />
      </Col>
    </Row>
  )
};

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.node,

}

export default OrderForm;
