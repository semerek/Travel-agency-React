import React from 'react';
import styles from './OrderOption.scss';
import PropTypes from 'prop-types';


const OrderOptionText =({setOptionValue, currentValue}) => (

  <div className={styles.component} >
    <input
      className={styles.input}
      type='text'
      value={currentValue}
      onChange={event => setOptionValue(event.currentTarget.value)}>
    </input>
  </div>
);

OrderOptionText.propTypes = {
  setOptionValue: PropTypes.func,
  currentValue: PropTypes.string,
};

export default OrderOptionText;

