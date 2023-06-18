import * as React from 'react';
import { URL_DATA } from '../constants/general';
import { APITimer, TimerFrequency, TimeStatus, TimerType } from '../types';
import { Header } from './Header';
import { EventTimer } from './EventTimer';
import { ResetTimer } from './ResetTimer';
import { StatusTimer } from './StatusTimer';

export interface OtherTimersProps {
  className?: string;
  currentTimestamp: number;
}

const OtherTimers: React.FC<OtherTimersProps> = (props) => {
  const [times, setTimes] = React.useState<APITimer[]>([]);

  const onMount = () => {
    const fetchAPITimers = async () => {
      try {
        const response = await fetch(URL_DATA);
        const data = await response.json();
        const safeTimes = (data.times || []) as APITimer[];

        setTimes(safeTimes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAPITimers();
  };

  React.useEffect(() => {
    onMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { className, currentTimestamp } = props;

  if (times.length === 0) return null;

  const seasonTimer = times.find((time: APITimer) => {
    const { frequency, status, type } = time;
    const isNoneFrequency = frequency === TimerFrequency.None;
    const isLaunchStatus = status === TimeStatus.Launch;
    const isSeason = type === TimerType.Season;

    return isNoneFrequency && isLaunchStatus && isSeason;
  });

  const resetTimers = times.filter((time: APITimer) => {
    const { status } = time;
    return status === TimeStatus.Reset;
  });

  const timesBuilding21 = times.filter((time: APITimer) => {
    const { name, type } = time;
    return type === TimerType.Map && name === 'Building 21';
  });

  const renderResetTimers = (times: APITimer[]) => {
    if (times.length === 0) return null;

    return times.map((time: APITimer) => {
      const { frequency, name, time: resetTime, type } = time;
      const key = `${frequency}-${name}-${type}-${resetTime}`;

      return <ResetTimer currentTimestamp={currentTimestamp} key={key} timer={time} />;
    });
  };

  return (
    <div className={className}>
      <Header text="Other Timers" />
      <div>
        <div className="flex justify-center flex-wrap mt-2.5">
          {renderResetTimers(resetTimers)}
          {timesBuilding21.length === 2 && <StatusTimer currentTimestamp={currentTimestamp} times={timesBuilding21} />}
          {seasonTimer && <EventTimer currentTimestamp={currentTimestamp} timer={seasonTimer} />}
        </div>
      </div>
    </div>
  );
};

export { OtherTimers };
