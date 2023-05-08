import classnames from 'classnames';
import * as React from 'react';
import { APITime, APITimeData, Color, TimeFrequency, TimeUnit } from '../types';
import { getNextStatus, getNextTime, getWeeklyTime } from '../utils';
import { convertSecondsToTimeValue } from '../utils/convert';
import { displayWithTwoDigits, getTimeUnitAbbreviation } from '../utils/display';
import { getTimerClasses } from '../utils/tailwind';

export interface StatusTimerProps {
  className?: string;
  currentTimestamp: number;
  time: APITime;
}

const StatusTimer: React.FC<StatusTimerProps> = (props) => {
  const { className, currentTimestamp, time } = props;

  const { data, frequency, subtitle, title } = time;

  if (!data || data.length < 2) return null;

  const nextStatusTime = getNextStatus(currentTimestamp, time);

  if (!nextStatusTime) return null;

  // TODO: do not name it resetTime
  const { color: tempColor, time: resetTime, textOverride } = nextStatusTime;
  const color = tempColor || Color.Red;

  const nextTime = getNextTime(currentTimestamp, resetTime, frequency);
  const remainingSeconds = nextTime - currentTimestamp;

  const statusTitle = textOverride?.title ?? title;
  const statusSubtitle = textOverride?.subtitle ?? subtitle;

  const classnamesStatusColor = `text-${color}-500`;
  const classnamesSubtitle = 'font-bold my-1 text-lg';
  const classnamesTitle = classnames(classnamesSubtitle, classnamesStatusColor);

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
      {statusSubtitle && <div className={classnamesSubtitle}>{statusSubtitle}</div>}
      <ul className="timer-card flex justify-center">{items}</ul>
      {/** TODO: Why is weekly forced here? */}
      {frequency === TimeFrequency.Weekly && (
        <div className="text-xs sm:text-sm">
          {data.map((dataEl: APITimeData) => {
            const { color, description, time } = dataEl;
            const classnamesTime = classnames('font-bold pr-1', `text-${color}-500`);
          return description ? <div className="flex text-left pl-2.5" key={dataEl.time}>
            <div className="grow">{description}</div> <div className={classnamesTime}>{getWeeklyTime(time)}</div>
          </div> : null})}
        </div>
      )}
    </div>
  );
};

export { StatusTimer };
