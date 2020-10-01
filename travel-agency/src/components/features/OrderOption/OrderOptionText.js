import React from 'react';
import styles from './OrderOption.scss';
import PropTypes from 'prop-types';


const OrderOptionText =({setOptionValue}) => (

  <div className={styles.component} >
    <input
      className={styles.input}
      type='text'
      onChange={event => setOptionValue(event.currentTarget.value)}>
    </input>
  </div>
);

OrderOptionText.propTypes = {
 setOptionValue: PropTypes.func,
};

export default OrderOptionText;

