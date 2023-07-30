import { HOURS_PER_SLOT, MAX_TIMERS_PER_PLAYER } from '../constants/game';
import { TimeUnit, TimeValue } from '../types';

/**
 * @name convertMoneyToSeconds
 * @description Returns the time equivalent (in seconds) of a money value
 */
const convertMoneyToSeconds = (money: number, hourlyRate: number) => {
  if (money <= 0) return 0;

  const seconds = Math.floor((3_600 * money) / hourlyRate);

  return seconds;
};

/**
 * @name convertPlayerTimerIndexToSeconds
 * @description Returns the max number of seconds a timer can last per the game’s rules
 */
const convertPlayerTimerIndexToSeconds = (index: number, hoursPerSlot = HOURS_PER_SLOT) => {
  if (index < 0) return 0;
  return (index + 1) * hoursPerSlot * 3_600;
};

/**
 * @name convertSecondsToMoney
 * @description Returns the rounded up money required for covering all seconds
 * For instance if result is exactly 13_333 then 13_400 is returned
 */
const convertSecondsToMoney = (seconds: number, hourlyRate: number) => {
  const money = Math.ceil((seconds * hourlyRate) / 3_600);
  const moneyHundreds = Math.floor(money / 100);
  const roundUp = moneyHundreds * 100 !== money;
  const moneyHundredsBis = roundUp ? moneyHundreds + 1 : moneyHundreds;

  return moneyHundredsBis * 100;
};

/**
 * @name convertSecondsToTimeValue
 * @description Returns the same time value but in days, hours, minutes and seconds
 */
const convertSecondsToTimeValue = (secondsTotal: number): TimeValue => {
  if (secondsTotal <= 0) {
    return {
      [TimeUnit.Day]: 0,
      [TimeUnit.Hour]: 0,
      [TimeUnit.Minute]: 0,
      [TimeUnit.Second]: 0
    };
  }

  const days = Math.floor(secondsTotal / (3_600 * 24));
  const hours = Math.floor((secondsTotal % (3_600 * 24)) / 3_600);
  const minutes = Math.floor((secondsTotal % 3_600) / 60);
  const seconds = Math.floor(secondsTotal % 60);

  return {
    [TimeUnit.Day]: days,
    [TimeUnit.Hour]: hours,
    [TimeUnit.Minute]: minutes,
    [TimeUnit.Second]: seconds
  };
};

/**
 * @name convertTimerIndexToPlayerIndex
 * @description Returns the player a timer belongs to
 * @example 9 timers for 3 players. Timer index 3 belongs to second player, so player index 1
 */
const convertTimerIndexToPlayerIndex = (timerIndex: number, maxTimersPerPlayer = MAX_TIMERS_PER_PLAYER) => {
  const playerIndex = Math.floor(timerIndex / maxTimersPerPlayer);
  return playerIndex;
};

/**
 * @name convertTimerIndexToPlayerTimerIndex
 * @description Returns the timer index seen from its player’s perspective
 * @example 9 timers for 3 players. Timer index 3 belongs to second player and has index 0
 */
const convertTimerIndexToPlayerTimerIndex = (timerIndex: number, maxTimersPerPlayer = MAX_TIMERS_PER_PLAYER) => {
  const playerTimerIndex = timerIndex % maxTimersPerPlayer;
  return playerTimerIndex;
};

/**
 * @name convertTimeValueToSeconds
 * @description Returns the same time value but in seconds only
 */
const convertTimeValueToSeconds = (timeValue: TimeValue) => {
  const {
    [TimeUnit.Day]: days,
    [TimeUnit.Hour]: hours,
    [TimeUnit.Minute]: minutes,
    [TimeUnit.Second]: seconds
  } = timeValue;

  const secondsTotal = days * 24 * 3_600 + hours * 3_600 + minutes * 60 + seconds;
  return secondsTotal;
};

export {
  convertMoneyToSeconds,
  convertPlayerTimerIndexToSeconds,
  convertSecondsToMoney,
  convertSecondsToTimeValue,
  convertTimerIndexToPlayerIndex,
  convertTimerIndexToPlayerTimerIndex,
  convertTimeValueToSeconds
};
