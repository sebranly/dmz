import { Color } from '../types';

/**
 * @name displayWithTwoDigits
 * @description Ensures a number is being displayed with at least two digits
 */
const displayWithTwoDigits = (nb: number) => {
  if (nb < 10) return `0${nb}`;
  return `${nb}`;
};

/**
 * @name formatMoney
 * @description Ensures money is being displayed with thousands being comma-separated
 */
const formatMoney = (value: number) => {
  return new Intl.NumberFormat('en-US').format(value);
};

/**
 * @name getPlayerColor
 * @description Returns the DMZ color of each player
 */
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

/**
 * @name pluralize
 * @description Returns the same string or plural version if applicable
 */
const pluralize = (str: string, nb: number) => {
  if (nb === 1 || nb < 0) return str;

  return `${str}s`;
};

export { displayWithTwoDigits, formatMoney, getPlayerColor, pluralize };
