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

export const generateInfoTitles = (trips) => {
  switch (trips.length) {
    case 1:
      return [trips[0].destination.name];
    case 2:
      return [trips[0].destination.name, trips[1].destination.name];
    case 3:
      return [trips[0].destination.name, trips[1].destination.name, trips[2].destination.name];
    default:
      return [trips[0].destination.name, '...', trips[trips.length-1].destination.name];
  }
};

export const generateInfoDates = (trips) => [dayjs(trips[0].dateFrom).format('MMM D').toUpperCase(), dayjs(trips[trips.length-1].dateTo).format('D')];

export const generateInfoCost = (trips) => {
  let total = 0;

  trips.forEach((element) => {
    total += element.basePrice;
    if (element.offer.length > 0) {
      element.offer.forEach((offer) => (total += offer.price));
    }
  });

  return total;
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};
