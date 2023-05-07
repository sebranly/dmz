import * as React from 'react';
import { URL_DATA } from '../constants/general';
import { APITime, TimeFrequency, TimeStatus, TimeType } from '../types';
import { Header } from './Header';
import { EventTimer } from './EventTimer';
import { ResetTimer } from './ResetTimer';
import { StatusTimer } from './StatusTimer';

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

        // TODO: reset
        setTimes([{
          "type": TimeType.Challenges,
          "title": "Daily Challenges",
          "frequency": TimeFrequency.Daily,
          "status": TimeStatus.Reset,
          "time": 1678078800
        },
        {
          "type": TimeType.Season,
          "title": "Season 03 Reloaded",
          "status": TimeStatus.Launch,
          "time": 1683702000
        },
        {
          "type": TimeType.Map,
          "title": "Building 21",
          "frequency": TimeFrequency.Weekly,
          "status": TimeStatus.Opening,
          "time": 1678467600
        },
        {
          "type": TimeType.Map,
          "title": "Building 21",
          "frequency": TimeFrequency.Weekly,
          "status": TimeStatus.Closing,
          "time": 1678122000
        }]);
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

  const seasonTimer = times.find((time: APITime) => {
    const { frequency, status, type } = time;
    const isNoneFrequency = !frequency;
    const isLaunchStatus = status === TimeStatus.Launch;
    const isSeason = type === TimeType.Season;

    return isNoneFrequency && isLaunchStatus && isSeason;
  });

  const resetTimers = times.filter((time: APITime) => {
    const { status } = time;
    return status === TimeStatus.Reset;
  });

  const timesBuilding21 = times.filter((time: APITime) => {
    const { title, type } = time;
    return type === TimeType.Map && title === 'Building 21';
  });

  const renderResetTimers = (times: APITime[]) => {
    if (times.length === 0) return null;

    return times.map((time: APITime) => {
      const { frequency, title, time: resetTime, type } = time;
      const key = `${frequency}-${title}-${type}-${resetTime}`;

      return <ResetTimer currentTimestamp={currentTimestamp} key={key} time={time} />;
    });
  };

  return (
    <div className={className}>
      <Header text="Other Timers" />
      <div>
        <div className="flex justify-center flex-wrap mt-2.5">
          {renderResetTimers(resetTimers)}
          {timesBuilding21.length === 2 && (
            <StatusTimer currentTimestamp={currentTimestamp} times={timesBuilding21} />
          )}
          {seasonTimer && <EventTimer currentTimestamp={currentTimestamp} time={seasonTimer} />}
        </div>
      </div>
    </div>
  );
};

export { OtherTimers };
