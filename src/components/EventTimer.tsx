import classnames from 'classnames';
import * as React from 'react';
import { APITime, TimeUnit } from '../types';
import { getDateTime } from '../utils';
import { convertSecondsToTimeValue } from '../utils/convert';
import { displayWithTwoDigits, getStatusColor, getStatusVerb, getTimeUnitAbbreviation } from '../utils/display';
import { getTimerClasses } from '../utils/tailwind';

export interface EventTimerProps {
  className?: string;
  currentTimestamp: number;
  time: APITime;
}

const EventTimer: React.FC<EventTimerProps> = (props) => {
  const { className, currentTimestamp, time } = props;
  const { name, time: eventTime, status } = time;

  const remainingSeconds = eventTime - currentTimestamp;
  const isPast = remainingSeconds <= 0;
  const statusVerb = getStatusVerb(status);

  const subtitle = isPast ? `It ${statusVerb}ed already` : `It ${statusVerb}es in`;
  const color = getStatusColor(status);

  const classnamesColor = `text-${color}-500`;
  const classnamesSubtitle = 'font-bold my-1 text-lg';
  const classnamesTitle = classnames(classnamesSubtitle, classnamesColor);
  const classnamesTime = classnames('font-bold pr-1', classnamesColor);

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

    const classnamesValue = classnames('font-bold text-4xl', { [classnamesColor]: isFixed });

    return (
      <li className="inline-block mx-2.5" key={l}>
        <span className={classnamesValue}>{displayWithTwoDigits(value)}</span>
        <div className="text-sm">{getTimeUnitAbbreviation(l)}</div>
      </li>
    );
  });

  return (
    <div className={classnamesComponent}>
      <div className={classnamesTitle}>{name}</div>
      <div className={classnamesSubtitle}>{subtitle}</div>
      <ul className="timer-card flex justify-center">{items}</ul>
      {isPast ? (
        <div className="text-xs sm:text-sm">The website will be updated in the next few days</div>
      ) : (
        <div className="text-xs sm:text-sm">
          <div className="flex text-left pl-2.5">
            <div className="grow">Release Date:</div> <div className={classnamesTime}>{getDateTime(eventTime)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export { EventTimer };
