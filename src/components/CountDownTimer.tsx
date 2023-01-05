import * as React from 'react';
import { DEAD_DROP_HOURLY_RATE, REGULAR_HOURLY_RATE } from '../constants/game';
import { Timer, TimeUnit } from '../types';
import {
  calculateRemainingSeconds,
  convertSecondsToMoney,
  convertSecondsToTimeValue,
  convertTimerIndexToPlayerIndex,
  convertTimerIndexToPlayerTimerIndex,
  getEndTime
} from '../utils';
import { convertToTwoDigits, formatMoney, getPlayerColor, pluralize } from '../utils/display';

export interface CountDownTimerProps {
  className?: string;
  currentTimestamp: number;
  deleteTimer: () => void;
  timer: Timer;
}

const CountDownTimer: React.FC<CountDownTimerProps> = (props) => {
  const { className = '', currentTimestamp, deleteTimer, timer } = props;
  const { timerIndex } = timer;

  const remainingSeconds = calculateRemainingSeconds(timer, currentTimestamp);
  const endTime = getEndTime(timer);

  const {
    [TimeUnit.Hour]: hours,
    [TimeUnit.Minute]: minutes,
    [TimeUnit.Second]: seconds
  } = convertSecondsToTimeValue(remainingSeconds);

  const isFixedHours = hours === 0;
  const isFixedMinutes = isFixedHours && minutes === 0;
  const isFixedSeconds = isFixedMinutes && seconds === 0;

  const playerIndex = convertTimerIndexToPlayerIndex(timerIndex);
  const playerTimerIndex = convertTimerIndexToPlayerTimerIndex(timerIndex);
  const color = getPlayerColor(playerIndex);
  const playerTitle = `Player ${playerIndex + 1}`;
  const timerTitle = `Timer ${playerTimerIndex + 1}`;
  const showRibbon = currentTimestamp - timer.timestampStart <= 5;

  const classnamesPlayerColor = `color-${color}`;
  const classnamesPlayerTitle = `count-down-title ${classnamesPlayerColor}`;
  const classnamesComponent = `count-down ${className} border-color-${color} ribbon-container`;
  const classnamesMoney = `money-value ${classnamesPlayerColor}`;
  const classnamesTimerValue = 'timer-value';

  const items = [
    { value: hours, label: TimeUnit.Hour },
    { value: minutes, label: TimeUnit.Minute },
    { value: seconds, label: TimeUnit.Second }
  ].map((element: { value: number; label: string }) => {
    const { value, label: l } = element;
    const isFixed =
      (l === TimeUnit.Hour && isFixedHours) ||
      (l === TimeUnit.Minute && isFixedMinutes) ||
      (l === TimeUnit.Second && isFixedSeconds);

    const classnamesValue = isFixed ? `${classnamesPlayerColor} ${classnamesTimerValue}` : classnamesTimerValue;

    return (
      <li className="count-down-timer-element flex-child" key={l}>
        <span className={classnamesValue}>{convertToTwoDigits(value)}</span>
        <div className="count-down-timer-unit">{pluralize(l, value)}</div>
      </li>
    );
  });

  return (
    <div className={classnamesComponent}>
      {showRibbon && <div className="ribbon-child">NEW</div>}
      <div className={classnamesPlayerTitle}>{playerTitle}</div>
      <div className="count-down-title">{timerTitle}</div>
      <ul className="count-down-timer flex-container">{items}</ul>
      <div className="count-down-timer-money">
        <div className="money-title">End Time:</div> <div className={classnamesMoney}>{endTime}</div>
      </div>
      <div className="count-down-timer-money">
        <div className="money-title">Exfil Money:</div>{' '}
        <div className={classnamesMoney}>
          ${formatMoney(convertSecondsToMoney(remainingSeconds, REGULAR_HOURLY_RATE))}
        </div>
      </div>
      <div className="count-down-timer-money">
        <div className="money-title">Dead Drop:</div>{' '}
        <div className={classnamesMoney}>
          ${formatMoney(convertSecondsToMoney(remainingSeconds, DEAD_DROP_HOURLY_RATE))}
        </div>
      </div>
      <button className="remove-timer" onClick={() => deleteTimer()}>
        Delete this timer
      </button>
    </div>
  );
};

export { CountDownTimer };
