import React from 'react';
import styles from './HappyHourAd.scss';
import PropTypes from 'prop-types';
import {formatTime} from '../../../utils/formatTime';



class HappyHourAd extends React.Component {

  constructor(){
    super();
    
    this.state = {
      interval: setInterval(() => this.forceUpdate(), 1000),
    };

  }
  
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }


  getCountdownTime(){
    const currentTime = new Date();
    const nextNoon = new Date(Date.UTC(currentTime.getUTCFullYear(), currentTime.getUTCMonth(), currentTime.getUTCDate(), 12, 0, 0, 0));

    if(currentTime.getUTCHours() >= 12){
      nextNoon.setUTCDate(currentTime.getUTCDate()+1);
    }

    return Math.round((nextNoon.getTime() - currentTime.getTime())/1000);
  }
  
  render() {
    const {title, promoDescription} = this.props;
    const countdown = this.getCountdownTime()/3600;
    let message = promoDescription;
    {/* Jeśli ta liczba jest większa niż równowartość 23 godzin, 
    to ma zostać wyświetlona informacja o promocji (przekazywana w propsie).
    W przeciwnym wypadku, powinna zostać wyświetlona wartość tej stałej, co da taki sam efekt, jak do tej pory.*/}
    if (countdown > 23) {
      message = promoDescription;
    } else {
      message = formatTime(this.getCountdownTime());
    }

    return(
      <div className={styles.component}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.promoDescription}>{message}</div>
      </div>
    );
    
  }

}

HappyHourAd.propTypes = {
  title: PropTypes.string,
  promoDescription: PropTypes.string,
};


export default HappyHourAd;