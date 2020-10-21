import React from 'react';
import styles from './Hero.scss';
import PropTypes from 'prop-types';
import HappyHourAd from '../../features/HappyHourAd/HappyHourAd';
import DaysToSummer from '../../features/DaysToSummer/DaysToSummer';
import moment from 'moment';

const eventdate = moment('2020-06-21');
const todaysdate = moment();
const daysLeft = eventdate.diff(todaysdate, 'days');



const Hero = ({variant = '', titleText, imageSrc, ...otherProps}) => (
  <div {...otherProps} className={styles.component + variant.split(' ').map(name => ' ' + (styles[name] || name)).join('')}>
    <h2 className={styles.title}>{titleText}</h2>
    <img className={styles.image}  src={imageSrc} />
    <div className={styles.happyHour}>
      <DaysToSummer days={daysLeft}/>
    </div>
    <div className={styles.happyHour}>
      <HappyHourAd title = {'Happy Hour'} />

    </div>
  </div>
);

Hero.propTypes = {
  variant: PropTypes.string,
  titleText: PropTypes.node.isRequired,
  imageSrc: PropTypes.string,
};

export default Hero;
