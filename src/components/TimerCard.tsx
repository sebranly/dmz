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
import classnames from 'classnames';

export interface TimerCardProps {
  className?: string;
  currentTimestamp: number;
  deadDropHourlyRate?: number;
  deleteTimer: () => void;
  regularHourlyRate?: number;
  timer: Timer;
}

const TimerCard: React.FC<TimerCardProps> = (props) => {
  const {
    className = '',
    currentTimestamp,
    deadDropHourlyRate = DEAD_DROP_HOURLY_RATE,
    deleteTimer,
    timer,
    regularHourlyRate = REGULAR_HOURLY_RATE
  } = props;
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

  const classnamesPlayerColor = `text-${color}-500`;
  const classnamesPlayerTitle = classnames('timer-card-title', classnamesPlayerColor);
  const classnamesComponent = classnames(
    'timer-card-component',
    className,
    'border-solid',
    'border-2',
    'rounded-lg',
    `border-${color}-500`,
    'relative'
  );

  const classnamesMoney = classnames('money-value', classnamesPlayerColor);

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

    const classnamesValue = classnames({ [classnamesPlayerColor]: isFixed });

    return (
      <li className="timer-card-element" key={l}>
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
      <ul className="timer-card flex-container-timers">{items}</ul>
      <div className="timer-card-money">
        <div className="money-title">End Time:</div> <div className={classnamesMoney}>{endTime}</div>
      </div>
      <div className="timer-card-money">
        <div className="money-title">Exfiltration:</div>{' '}
        <div className={classnamesMoney}>
          ${formatMoney(convertSecondsToMoney(remainingSeconds, regularHourlyRate))}
        </div>
      </div>
      <div className="timer-card-money">
        <div className="money-title">Dead Drop:</div>{' '}
        <div className={classnamesMoney}>
          ${formatMoney(convertSecondsToMoney(remainingSeconds, deadDropHourlyRate))}
        </div>
      </div>
      <button
        className="mt-2.5 border-2 border-solid border-white text-base rounded-lg p-1 text-center bg-white text-black"
        onClick={() => deleteTimer()}
      >
        Delete this timer
      </button>
    </div>
  );
};

export { TimerCard };
