  
import React from 'react';
import PropTypes from 'prop-types';

import styles from './OrderSummary.scss';
import {calculateTotal} from '../../../utils/calculateTotal';
import {formatPrice} from '../../../utils/formatPrice';


const OrderSummary = (props) => (
  <h2 className={styles.component}>
    Total: $<strong>{calculateTotal(formatPrice(props.totalCost), props.orderOptions)}</strong>
  </h2>
);


OrderSummary.propTypes = {
  totalCost: PropTypes.string,
  orderOptions: PropTypes.object,
};

export default OrderSummary;