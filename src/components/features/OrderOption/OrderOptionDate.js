import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import styles from './OrderOption.scss';
import PropTypes from 'prop-types';



/*const OrderOptionDate = () => {
    
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker className={styles.input} selected={startDate} onChange={date => setStartDate(date)} />
  );
  
};*/
const OrderOptionDate = ({currentValue, setOptionValue}) => (
    
  
  <DatePicker
    className={styles.input}
    type='date'
    value={currentValue}
    selected={currentValue}
    onChange={date => setOptionValue(date)}
    placeholderText = {'Date selection'}   
  />
);

OrderOptionDate.propTypes = {
  currentValue: PropTypes.instanceOf(Date),
  setOptionValue: PropTypes.func,
};
  
export default OrderOptionDate;
