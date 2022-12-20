import { TimeUnits } from '../types';

const pluralize = (str: string, nb: number) => {
  if (nb === 1 || nb < 0) return str;

  return `${str}s`;
};

const convertSecondsToUnits = (seconds: number): TimeUnits => {
  if (seconds <= 0) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }

  const hours = Math.floor(seconds / (60 * 60));
  const minutes = Math.floor((seconds % (60 * 60)) / 60);
  const secondsBis = Math.floor(seconds % 60);

  return {
    hours,
    minutes,
    seconds: secondsBis
  };
};

const convertToTwoDigits = (nb: number) => {
  if (nb < 10) return `0${nb}`;
  return `${nb}`;
};

export { convertSecondsToUnits, convertToTwoDigits, pluralize };
