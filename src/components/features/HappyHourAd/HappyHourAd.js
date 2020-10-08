import React from 'react';
import styles from './HappyHourAd.scss';
import PropTypes from 'prop-types';


class HappyHourAd extends React.Component {

  constructor(){
    super();
    
    setInterval(() => this.forceUpdate(), 1000);

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
    const {title} = this.props;
    {/*const countdown = this.getCountdownTime();*/}
    {/* Jeśli ta liczba jest większa niż równowartość 23 godzin, 
    to ma zostać wyświetlona informacja o promocji (przekazywana w propsie). 
    W przeciwnym wypadku, powinna zostać wyświetlona wartość tej stałej, co da taki sam efekt, jak do tej pory.*/}
    {/* if (countdown > 23) {
      message == promoDescription;
    } else {
     } */}
    return(
      <div className={styles.Component}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.promoDescription}>{/*{message}*/}</div>
      </div>
    );
    
  }

}

HappyHourAd.propTypes = {
  title: PropTypes.string,
  promoDescription: PropTypes.string,
};


export default HappyHourAd;