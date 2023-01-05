import * as React from 'react';
import { DEAD_DROP_HOURLY_RATE, REGULAR_HOURLY_RATE } from '../constants/game';
import { NEW_RIBBON_DURATION_SEC } from '../constants/general';
import { Timer, TimeUnit } from '../types';
import { calculateRemainingSeconds, getEndTime } from '../utils';
import {
  convertSecondsToMoney,
  convertSecondsToTimeValue,
  convertTimerIndexToPlayerIndex,
  convertTimerIndexToPlayerTimerIndex
} from '../utils/convert';
import { displayWithTwoDigits, formatMoney, getPlayerColor, pluralize } from '../utils/display';

export interface TimerCardProps {
  className?: string;
  currentTimestamp: number;
  deleteTimer: () => void;
  timer: Timer;
}

const TimerCard: React.FC<TimerCardProps> = (props) => {
  const { className = '', currentTimestamp, deleteTimer, timer } = props;
  const { timerIndex, timestampStart } = timer;

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
  const showRibbon = currentTimestamp - timestampStart <= NEW_RIBBON_DURATION_SEC;

  const classnamesPlayerColor = `color-${color}`;
  const classnamesPlayerTitle = `timer-card-title ${classnamesPlayerColor}`;
  const classnamesComponent = `timer-card-component ${className} border-color-${color} ribbon-container`;
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
      <li className="timer-card-element flex-child" key={l}>
        <span className={classnamesValue}>{displayWithTwoDigits(value)}</span>
        <div className="timer-card-unit">{pluralize(l, value)}</div>
      </li>
    );
  });

  return (
    <div className={classnamesComponent}>
      {showRibbon && <div className="ribbon-child">NEW</div>}
      <div className={classnamesPlayerTitle}>{playerTitle}</div>
      <div className="timer-card-title">{timerTitle}</div>
      <ul className="timer-card flex-container">{items}</ul>
      <div className="timer-card-money">
        <div className="money-title">End Time:</div> <div className={classnamesMoney}>{endTime}</div>
      </div>
      <div className="timer-card-money">
        <div className="money-title">Exfil Money:</div>{' '}
        <div className={classnamesMoney}>
          ${formatMoney(convertSecondsToMoney(remainingSeconds, REGULAR_HOURLY_RATE))}
        </div>
      </div>
      <div className="timer-card-money">
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

export { TimerCard };
