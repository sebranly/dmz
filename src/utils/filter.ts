import { Timer } from '../types';

const excludeTimerByIndex = (timers: Timer[], timerIndex: number) => {
  return timers.filter((timer: Timer) => timer.timerIndex !== timerIndex);
};

const filterTimersByIndex = (timers: Timer[], timerIndex: number) => {
  return timers.filter((timer: Timer) => timer.timerIndex === timerIndex);
};

export { excludeTimerByIndex, filterTimersByIndex };
