import {connect} from 'react-redux';
import {getOrderOptions} from '../../../redux/orderRedux';
import OrderForm from './OrderForm';

////mapowanie selektora getOrderOptions z pliku orderRedux.js do propsa options,

const mapStateToProps = state => ({
  options: getOrderOptions(state),
    
});

export default connect(mapStateToProps)(OrderForm);
