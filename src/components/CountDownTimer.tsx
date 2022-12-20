import * as React from 'react';
import { convertSecondsToUnits, convertToTwoDigits, pluralize } from '../utils';

export interface CountDownTimerProps {
  className?: string;
  remainingSeconds: number;
  title: string;
}

const CountDownTimer: React.FC<CountDownTimerProps> = (props) => {
  const { className = '', remainingSeconds, title } = props;

  const classnamesComponent = `count-down ${className}`;

  const [remainingSecondsBis, setRemainingSecondsBis] = React.useState(remainingSeconds);

  const onMount = () => {
    const interval = setInterval(() => {
      setRemainingSecondsBis((prevValue: number) => {
        return prevValue - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  };

  // Note: StrictMode triggers useEffect twice on development hence the minus 2 seconds on each tick
  React.useEffect(() => {
    onMount();
  }, []);

  if (remainingSecondsBis <= 0) return null;

  const { hours, minutes, seconds } = convertSecondsToUnits(remainingSecondsBis);
  if (hours === 0 && minutes === 0 && seconds === 0) {
    return null;
  }

  const isFixedHours = hours === 0;
  const isFixedMinutes = isFixedHours && minutes === 0;

  const items = [
    { value: hours, label: 'hour' },
    { value: minutes, label: 'minute' },
    { value: seconds, label: 'second' }
  ].map((element: { value: number; label: string }) => {
    const { value, label: l } = element;
    const isFixed = (l === 'hour' && isFixedHours) || (l === 'minute' && isFixedMinutes);

    const classnamesValue = isFixed ? 'color-light-green' : '';

    return (
      <li className="count-down-timer-element flex-child" key={l}>
        <span className={classnamesValue}>{convertToTwoDigits(value)}</span>
        <div className="count-down-timer-unit">{pluralize(l, value)}</div>
      </li>
    );
  });

  return (
    <div className={classnamesComponent}>
      <h3>{title}</h3>
      <ul className="count-down-timer flex-container">{items}</ul>
    </div>
  );
};

export { CountDownTimer };
