export const formatTime = time => {
  if (typeof (time) != 'number' || time < 0) {
    return null;
  }

  const hour = parseInt(time / 3600);
  const minutes = parseInt((time - (hour * 3600)) / 60);
  const seconds = parseInt(time - (hour * 3600) - (minutes * 60));

  return timeDisplay(returnWithZero(hour), returnWithZero(minutes), returnWithZero(seconds)).join(':');
};

const timeDisplay = (...timeElements) => {

  return timeElements;
};

const returnWithZero = (number) => {
  if (number < 10) {
    return `0${number}`;
  } else {
    return number;
  }
};

