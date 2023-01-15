import { isNullTimeValue } from '.';
import { Color, TimeUnit, TimeValue } from '../types';

/**
 * @name displayWithTwoDigits
 * @description Ensures a number is being displayed with at least two digits
 */
const displayWithTwoDigits = (nb: number) => {
  if (nb < 10) return `0${nb}`;
  return `${nb}`;
};

/**
 * @name displayTimeValue
 * @description Displays a time value with two-digits for hours, minutes and seconds
 */
const displayTimeValue = (timeValue: TimeValue) => {
  const timeValueIsNull = isNullTimeValue(timeValue);

  if (timeValueIsNull) return '00h 00m 00s';

  const { [TimeUnit.Hour]: hours, [TimeUnit.Minute]: minutes, [TimeUnit.Second]: seconds } = timeValue;

  const hoursString = `${displayWithTwoDigits(hours)}h`;
  const minutesString = `${displayWithTwoDigits(minutes)}m`;
  const secondsString = `${displayWithTwoDigits(seconds)}s`;

  const finalString = `${hoursString} ${minutesString} ${secondsString}`;
  return finalString;
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

export { displayTimeValue, displayWithTwoDigits, formatMoney, getPlayerColor, pluralize };