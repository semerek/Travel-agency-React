import React from 'react';
import PropTypes from 'prop-types';
import styles from './DaysToSummer.scss';
import moment from 'moment';

class DaysToSummer extends React.Component {

  daysRemaining() {
    const eventdate = moment('2021-06-21');
    const todaysdate = moment();
    return eventdate.diff(todaysdate, 'days');
  }

  render() {
    const days = this.daysRemaining();
    return(
      <div className={styles.title}>
        {days> 0 && <h2>Do lata pozostało {days} dni</h2>}
        {days <= 0  && <h2>Jest Lato</h2>}
        {days == 1 &&  <h2>Do lata pozostał 1 dzień</h2>}
      </div>
    );
  }

}

DaysToSummer.propTypes = {
  days: PropTypes.func,
};
export default DaysToSummer;