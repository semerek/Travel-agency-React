import React from 'react';
import PropTypes from 'prop-types';
import styles from './DaysToSummer.scss';




const DaysToSummer = ({ days }) => (
  <div className={styles.title}>
    {days > 0 && <h2>Do lata pozostało {days} dni</h2>}
    {days <= 0  && <h2>Jest Lato</h2>}
    {days == 1 &&  <h2>Do lata pozostał 1 dzień</h2>}
  </div>
);

DaysToSummer.propTypes = {
  days: PropTypes.number,
};

export default DaysToSummer;


