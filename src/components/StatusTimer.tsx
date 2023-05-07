import classnames from 'classnames';
import * as React from 'react';
import { APITime, APITimeData, Color, TimeFrequency, TimeStatus, TimeUnit } from '../types';
import { getNextStatus, getNextTime, getWeeklyTime } from '../utils';
import { convertSecondsToTimeValue } from '../utils/convert';
import { displayWithTwoDigits, getStatusAdjective, getTimeUnitAbbreviation } from '../utils/display';
import { getTimerClasses } from '../utils/tailwind';

export interface StatusTimerProps {
  className?: string;
  currentTimestamp: number;
  time: APITime;
}

const StatusTimer: React.FC<StatusTimerProps> = (props) => {
  const { className, currentTimestamp, time } = props;

  const { data, frequency, title } = time;

  if (!data || data.length < 2) return null;

  const nextStatus = getNextStatus(currentTimestamp, time);

  if (nextStatus === -1 || !nextStatus) return null;

  const dataElement = data.find((d: APITimeData) => d.status === nextStatus);

  if (!dataElement) return null;

  // TODO: do not name it resetTime
  const { color: tempColor, time: resetTime, titlePrefix, titleSuffix } = dataElement;
  const color = tempColor || Color.Red;

  const nextTime = getNextTime(currentTimestamp, resetTime, frequency);
  const remainingSeconds = nextTime - currentTimestamp;

  // TODO: compact?
  const statusTitle = [titlePrefix, title, titleSuffix].join(' ');
  // TODO: should not be hardcoded
  const statusSubtitle = `It opens/closes in`;

  const otherStatus = nextStatus === TimeStatus.Closing ? TimeStatus.Opening : TimeStatus.Closing;
  const otherDataElement = data.find((d: APITimeData) => d.status === otherStatus);

  if (!otherDataElement) return null;

  const { color: tempOtherColor, time: otherResetTime } = otherDataElement;
  const otherColor = tempOtherColor || Color.Red;
  const nextOtherTime = getNextTime(currentTimestamp, otherResetTime, frequency);

  const classnamesStatusColor = `text-${color}-500`;
  const classnamesSubtitle = 'font-bold my-1 text-lg';
  const classnamesTitle = classnames(classnamesSubtitle, classnamesStatusColor);

  const classnamesTime = 'font-bold pr-1';
  // TODO: red should not be hardcoded
  const classnamesOpeningTime = classnames(classnamesTime, `text-${color}-500`);
  const classnamesClosingTime = classnames(classnamesTime, `text-${otherColor}-500`);

  const {
    [TimeUnit.Day]: days,
    [TimeUnit.Hour]: hours,
    [TimeUnit.Minute]: minutes,
    [TimeUnit.Second]: seconds
  } = convertSecondsToTimeValue(remainingSeconds);

  const isFixedDays = days === 0;
  const isFixedHours = isFixedDays && hours === 0;
  const isFixedMinutes = isFixedHours && minutes === 0;
  const isFixedSeconds = isFixedMinutes && seconds === 0;

  const weeklyOpeningTime = nextStatus === TimeStatus.Opening ? getWeeklyTime(nextTime) : getWeeklyTime(nextOtherTime);
  const weeklyClosingTime = nextStatus === TimeStatus.Closing ? getWeeklyTime(nextTime) : getWeeklyTime(nextOtherTime);
  const classnamesComponent = getTimerClasses(color, className);

  const items = [
    { value: days, label: TimeUnit.Day },
    { value: hours, label: TimeUnit.Hour },
    { value: minutes, label: TimeUnit.Minute },
    { value: seconds, label: TimeUnit.Second }
  ].map((element: { value: number; label: TimeUnit }) => {
    const { value, label: l } = element;
    const isFixed =
      (l === TimeUnit.Day && isFixedDays) ||
      (l === TimeUnit.Hour && isFixedHours) ||
      (l === TimeUnit.Minute && isFixedMinutes) ||
      (l === TimeUnit.Second && isFixedSeconds);

    const classnamesValue = classnames('font-bold text-4xl', { [classnamesStatusColor]: isFixed });

    return (
      <li className="inline-block mx-2.5" key={l}>
        <span className={classnamesValue}>{displayWithTwoDigits(value)}</span>
        <div className="text-sm">{getTimeUnitAbbreviation(l)}</div>
      </li>
    );
  });

  return (
    <div className={classnamesComponent}>
      <div className={classnamesTitle}>{statusTitle}</div>
      <div className={classnamesSubtitle}>{statusSubtitle}</div>
      <ul className="timer-card flex justify-center">{items}</ul>
      {/** TODO: Why is weekly forced here? */}
      {/** TODO: Use description here */}
      {frequency === TimeFrequency.Weekly && (
        <div className="text-xs sm:text-sm">
          <div className="flex text-left pl-2.5">
            <div className="grow">Weekly Opening:</div> <div className={classnamesOpeningTime}>{weeklyOpeningTime}</div>
          </div>
          <div className="flex text-left pl-2.5">
            <div className="grow">Weekly Closing:</div> <div className={classnamesClosingTime}>{weeklyClosingTime}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export { StatusTimer };
