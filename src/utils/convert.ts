import { MAX_TIMERS_PER_PLAYER } from '../constants/game';
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
 * @name convertPlayerTimerIndexToHourTimer
 * @description Returns the max number of hours a timer can last per the game's rules
 */
const convertPlayerTimerIndexToHourTimer = (index: number, hoursPerSlot: number) => {
  if (index < 0) return 0;
  return (index + 1) * hoursPerSlot;
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
 * @description Returns the same time value but in hours, minutes and seconds
 */
const convertSecondsToTimeValue = (seconds: number): TimeValue => {
  if (seconds <= 0) {
    return {
      [TimeUnit.Hour]: 0,
      [TimeUnit.Minute]: 0,
      [TimeUnit.Second]: 0
    };
  }

  const hours = Math.floor(seconds / 3_600);
  const minutes = Math.floor((seconds % 3_600) / 60);
  const secondsBis = Math.floor(seconds % 60);

  return {
    [TimeUnit.Hour]: hours,
    [TimeUnit.Minute]: minutes,
    [TimeUnit.Second]: secondsBis
  };
};

/**
 * @name convertTimerIndexToPlayerIndex
 * @description Returns the player a timer belongs to
 * @example 9 timers for 3 players. Timer index 3 belongs to second player, so player index 1
 */
const convertTimerIndexToPlayerIndex = (timerIndex: number) => {
  const playerIndex = Math.floor(timerIndex / MAX_TIMERS_PER_PLAYER);
  return playerIndex;
};

/**
 * @name convertTimerIndexToPlayerTimerIndex
 * @description Returns the timer index seen from its player's perspective
 * @example 9 timers for 3 players. Timer index 3 belongs to second player and has index 0
 */
const convertTimerIndexToPlayerTimerIndex = (timerIndex: number) => {
  const playerTimerIndex = timerIndex % MAX_TIMERS_PER_PLAYER;
  return playerTimerIndex;
};

/**
 * @name convertTimeValueToSeconds
 * @description Returns the same time value but in seconds only
 */
const convertTimeValueToSeconds = (timeValue: TimeValue) => {
  const { [TimeUnit.Hour]: hours, [TimeUnit.Minute]: minutes, [TimeUnit.Second]: seconds } = timeValue;
  const secondsBis = hours * 3_600 + minutes * 60 + seconds;

  return secondsBis;
};

export {
  convertMoneyToSeconds,
  convertPlayerTimerIndexToHourTimer,
  convertSecondsToMoney,
  convertSecondsToTimeValue,
  convertTimerIndexToPlayerIndex,
  convertTimerIndexToPlayerTimerIndex,
  convertTimeValueToSeconds
};
