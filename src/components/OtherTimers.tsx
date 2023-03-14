import * as React from 'react';
import { URL_DATA } from '../constants/general';
import { APITime, TimeStatus, TimeType } from '../types';
import { Header } from './Header';
import { OpenClosedTimer } from './OpenClosedTimer';
import { PeriodicTimer } from './PeriodicTimer';

export interface OtherTimersProps {
  className?: string;
  currentTimestamp: number;
}

const OtherTimers: React.FC<OtherTimersProps> = (props) => {
  const [times, setTimes] = React.useState<APITime[]>([]);

  const onMount = () => {
    const fetchAPITimes = async () => {
      try {
        const response = await fetch(URL_DATA);
        const data = await response.json();
        const safeTimes = (data.times || []) as APITime[];

        setTimes(safeTimes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAPITimes();
  };

  React.useEffect(() => {
    onMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { className, currentTimestamp } = props;

  if (times.length === 0) return null;

  const periodicTimers = times.filter((time: APITime) => {
    const { status } = time;
    return status === TimeStatus.Reset;
  });

  const timesBuilding21 = times.filter((time: APITime) => {
    const { name, type } = time;
    return type === TimeType.Map && name === 'Building 21';
  });

  const renderPeriodicTimers = (times: APITime[]) => {
    if (times.length === 0) return null;

    return times.map((time: APITime) => {
      const { frequency, name, time: resetTime, type } = time;
      const key = `${frequency}-${name}-${type}-${resetTime}`;

      return <PeriodicTimer currentTimestamp={currentTimestamp} key={key} time={time} />;
    });
  };

  return (
    <div className={className}>
      <Header text="Other Timers" />
      <div>
        <div className="flex justify-center flex-wrap mt-2.5">
          {renderPeriodicTimers(periodicTimers)}
          {timesBuilding21.length === 2 && (
            <OpenClosedTimer currentTimestamp={currentTimestamp} times={timesBuilding21} />
          )}
        </div>
      </div>
    </div>
  );
};

export { OtherTimers };
