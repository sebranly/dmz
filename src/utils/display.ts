import { isNullTimeValue } from '.';
import { Color, TimeUnit, TimeValue } from '../types';

/**
 * @name displaySeason
 * @description Displays the season title with two digits and reloaded if applicable
 */
const displaySeason = (nb: number) => {
  const floor = Math.floor(nb);

  if (nb === floor) return displayWithTwoDigits(nb);

  return `${displayWithTwoDigits(floor)} Reloaded`;
};

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
const displayTimeValue = (timeValue: TimeValue, shouldCompact = false) => {
  const timeValueIsNull = isNullTimeValue(timeValue);

  if (timeValueIsNull) {
    if (shouldCompact) return '0s';
    return '00h 00m 00s';
  }

  const {
    [TimeUnit.Day]: days,
    [TimeUnit.Hour]: hours,
    [TimeUnit.Minute]: minutes,
    [TimeUnit.Second]: seconds
  } = timeValue;

  const daysString = `${displayWithTwoDigits(days)}d`;
  const hoursString = hours === 0 && shouldCompact ? '' : `${displayWithTwoDigits(hours)}h`;
  const minutesString = minutes === 0 && shouldCompact ? '' : `${displayWithTwoDigits(minutes)}m`;
  const secondsString = seconds === 0 && shouldCompact ? '' : `${displayWithTwoDigits(seconds)}s`;

  const daysStringPrefix = days > 0 ? `${daysString}${shouldCompact ? '' : ' '}` : '';
  const finalString = shouldCompact
    ? `${daysStringPrefix}${hoursString}${minutesString}${secondsString}`
    : `${daysStringPrefix}${hoursString} ${minutesString} ${secondsString}`;

  if (finalString === '') return '0s';

  return finalString;
};

/**
 * @name formatMoney
 * @description Ensures money is being displayed with thousands being comma-separated or shortened with k symbol
 */
const formatMoney = (value: number, shortenThousands = false): string => {
  const thousands = value / 1_000;

  if (shortenThousands && thousands >= 1) {
    return `${formatMoney(thousands)}k`;
  }

  const formattedValue = new Intl.NumberFormat('en-US').format(value);
  return `$${formattedValue}`;
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

// TODO: do we still need it?
/**
 * @name titleize
 * @description Returns the same string but starting with a capital letter
 */
const titleize = (str: string) => {
  if (!str) return '';

  const capitalLetter = str.charAt(0).toUpperCase();

  return `${capitalLetter}${str.substring(1)}`;
};

export {
  displaySeason,
  displayTimeValue,
  displayWithTwoDigits,
  formatMoney,
  getPlayerColor,
  getPlayersSize,
  getTimeUnitAbbreviation,
  pluralize,
  titleize
};
