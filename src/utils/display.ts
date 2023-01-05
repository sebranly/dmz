import { Color } from '../types';

const convertToTwoDigits = (nb: number) => {
  if (nb < 10) return `0${nb}`;
  return `${nb}`;
};

const formatMoney = (value: number) => {
  return new Intl.NumberFormat('en-US').format(value);
};

const getPlayerColor = (playerIndex: number) => {
  switch (playerIndex) {
    case 0:
    default:
      return Color.Green;
    case 1:
      return Color.Yellow;
    case 2:
      return Color.Blue;
    case 3:
      return Color.Pink;
  }
};

const pluralize = (str: string, nb: number) => {
  if (nb === 1 || nb < 0) return str;

  return `${str}s`;
};

export { convertToTwoDigits, formatMoney, getPlayerColor, pluralize };
