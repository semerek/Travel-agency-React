import {connect} from 'react-redux';
import {getOrderOptions, setOrderOption} from '../../../redux/orderRedux';
import OrderForm from './OrderForm';

////mapowanie selektora getOrderOptions z pliku orderRedux.js do propsa options,

const mapStateToProps = state => ({
  options: getOrderOptions(state),
    
});

const mapDispatchToProps = dispatch => ({
  setOrderOption: option => dispatch(setOrderOption(option)),
});


export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
