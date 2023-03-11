import { isNullTimeValue } from '.';
import { Color, TimeStatus, TimeUnit, TimeValue } from '../types';

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
 * @description Displays a time value with two-digits for days, hours, minutes and seconds
 */
const displayTimeValue = (timeValue: TimeValue) => {
  const timeValueIsNull = isNullTimeValue(timeValue);

  if (timeValueIsNull) return '00h 00m 00s';

  const {
    [TimeUnit.Day]: days,
    [TimeUnit.Hour]: hours,
    [TimeUnit.Minute]: minutes,
    [TimeUnit.Second]: seconds
  } = timeValue;

  const daysString = `${displayWithTwoDigits(days)}d`;
  const hoursString = `${displayWithTwoDigits(hours)}h`;
  const minutesString = `${displayWithTwoDigits(minutes)}m`;
  const secondsString = `${displayWithTwoDigits(seconds)}s`;

  const daysStringSuffix = days > 0 ? `${daysString} ` : '';
  const finalString = `${daysStringSuffix}${hoursString} ${minutesString} ${secondsString}`;
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
    case 4:
      return Color.Orange;
    case 5:
      return Color.Gray;
  }
};

/**
 * @name getStatusColor
 * @description Returns the current color based on next status
 */
const getStatusColor = (nextStatus: TimeStatus) => {
  return nextStatus === TimeStatus.Closing ? Color.Green : Color.Orange;
};

/**
 * @name getStatusAdjective
 * @description Returns the adjective for current status based on next status
 */
const getStatusAdjective = (nextStatus: TimeStatus) => {
  return nextStatus === TimeStatus.Closing ? 'open' : 'closed';
};

/**
 * @name getStatusVerb
 * @description Returns the verb for next status based on next status
 */
const getStatusVerb = (nextStatus: TimeStatus) => {
  return nextStatus === TimeStatus.Closing ? 'closes' : 'opens';
};

/**
 * @name getPlayersSize
 * @description Returns a word describing the size of the squad
 */
const getPlayersSize = (length: number) => {
  switch (length) {
    case 0:
    default:
      return '';
    case 1:
      return 'solo players';
    case 2:
      return 'duos';
    case 3:
      return 'trios';
    case 4:
      return 'quatuors';
  }
};

/**
 * @name getTimeUnitAbbreviation
 * @description Returns an abbreviation for a time unit
 */
const getTimeUnitAbbreviation = (unit: TimeUnit) => {
  switch (unit) {
    case TimeUnit.Day:
      return 'days';
    case TimeUnit.Hour:
      return 'hrs';
    case TimeUnit.Minute:
      return 'min';
    case TimeUnit.Second:
      return 'sec';
    default:
      return '';
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

export {
  displayTimeValue,
  displayWithTwoDigits,
  formatMoney,
  getPlayerColor,
  getPlayersSize,
  getStatusAdjective,
  getStatusColor,
  getStatusVerb,
  getTimeUnitAbbreviation,
  pluralize
};
