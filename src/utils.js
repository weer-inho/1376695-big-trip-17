import dayjs from 'dayjs';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const formatTime = (time) => (String(time).length === 1) ? `0${time}` : time;

export const getDuration = (startDate, endDate) => {
  const days = dayjs(endDate).diff(startDate, 'd');
  const hours = dayjs(endDate).diff(startDate, 'h') - days*24;
  const minutes = dayjs(endDate).diff(startDate, 'm') - days*24*60 - hours*60;

  if (days === 0 && hours === 0) {
    return `${formatTime(minutes)}M`;
  }

  if (days === 0 ) {
    return `${formatTime(hours)}H ${formatTime(minutes)}M`;
  }

  return `${formatTime(days)}D ${formatTime(hours)}H ${formatTime(minutes)}M`;
};
