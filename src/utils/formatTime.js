export const formatTime = time => {
  if (typeof (time) != 'number' || time < 0) {
    return null;
  }

  const hour = parseInt(time / 3600);
  const minutes = parseInt((time - (hour * 3600)) / 60);
  const seconds = parseInt(time - (hour * 3600) - (minutes * 60));

  return timeDisplay(hour, minutes, seconds).join(':');
};

const timeDisplay = (...timeElements) => {

  return timeElements;
};

//jak zrobić ten zero padding ??
//https://stackoverflow.com/questions/25198968/padding-zero-to-the-left-of-number-in-javascript