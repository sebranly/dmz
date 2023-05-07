import classnames from 'classnames';
import * as React from 'react';
import { APITime, Color, TimeFrequency, TimeUnit } from '../types';
import { getDailyTime, getNextTime, getWeeklyTime } from '../utils';
import { convertSecondsToTimeValue } from '../utils/convert';
import {
  displayWithTwoDigits,
  getTimeUnitAbbreviation,
  pluralize,
  titleize
} from '../utils/display';
import { getTimerClasses } from '../utils/tailwind';

export interface ResetTimerProps {
  className?: string;
  currentTimestamp: number;
  time: APITime;
}

const ResetTimer: React.FC<ResetTimerProps> = (props) => {
  const { className, currentTimestamp, time } = props;
  const { title, time: resetTime, status, frequency, data } = time;
  // TODO: improve tempColor
  const { color: tempColor } = data[0];
  const color = tempColor || Color.Red;

  const nextTime = getNextTime(currentTimestamp, resetTime, frequency);
  const remainingSeconds = nextTime - currentTimestamp;

  // TODO: create utils for default frequency
  const isDaily = frequency === TimeFrequency.Daily || !frequency;
  // TODO: reset should not be hardcoded
  const subtitle = `They reset in`;

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
  const isFixedReset = isDaily && days === 1 && hours === 0 && minutes === 0 && seconds === 0;

  const resetTimeString = isDaily ? getDailyTime(nextTime) : getWeeklyTime(nextTime);

  const classnamesComponent = getTimerClasses(color, className);
  const commonItemsObj = [
    { value: hours, label: TimeUnit.Hour },
    { value: minutes, label: TimeUnit.Minute },
    { value: seconds, label: TimeUnit.Second }
  ];

  const itemsObj = isDaily ? commonItemsObj : [{ value: days, label: TimeUnit.Day }, ...commonItemsObj];

  const items = itemsObj.map((element: { value: number; label: TimeUnit }) => {
    const { value, label: l } = element;
    const isFixed =
      isFixedReset ||
      (l === TimeUnit.Day && isFixedDays) ||
      (l === TimeUnit.Hour && isFixedHours) ||
      (l === TimeUnit.Minute && isFixedMinutes) ||
      (l === TimeUnit.Second && isFixedSeconds);

    const classnamesValue = classnames('font-bold', {
      [classnamesColor]: isFixed,
      'text-4xl': !isDaily,
      'text-5xl': isDaily
    });

    return (
      <li className="inline-block mx-2.5" key={l}>
        <span className={classnamesValue}>{displayWithTwoDigits(value)}</span>
        <div className="text-sm">{isDaily ? pluralize(l, value) : getTimeUnitAbbreviation(l)}</div>
      </li>
    );
  });

  // TODO: use utils below for frequency
  // TODO: remove hardcoded Launch
  return (
    <div className={classnamesComponent}>
      <div className={classnamesTitle}>{title}</div>
      <div className={classnamesSubtitle}>{subtitle}</div>
      <ul className="timer-card flex justify-center">{items}</ul>
      <div className="text-sm">
        <div className="flex text-left pl-2.5">
          <div className="grow">{`${titleize(frequency || TimeFrequency.Daily)} Launch:`}</div>
          <div className={classnamesTime}>{resetTimeString}</div>
        </div>
      </div>
    </div>
  );
};

export { ResetTimer };
