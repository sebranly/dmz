import { Timer } from '../types';

/**
 * @name excludeTimerByIndex
 * @description Returns same list to the exception of specified timer
 */
const excludeTimerByIndex = (timers: Timer[], timerIndex: number) => {
  return timers.filter((timer: Timer) => timer.timerIndex !== timerIndex);
};

/**
 * @name pickTimerByIndex
 * @description Returns specified timer or empty array if it does not exist
 */
const pickTimerByIndex = (timers: Timer[], timerIndex: number) => {
  return timers.filter((timer: Timer) => timer.timerIndex === timerIndex);
};

export { excludeTimerByIndex, pickTimerByIndex };
