import * as React from 'react';
import { URL_DATA } from '../constants/general';
import { APITime, Color, TimeFrequency, TimeStatus, TimeType } from '../types';
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

        // TODO: reset to actual API fetch
        // TODO: have function filtering out API response
        setTimes([
          {
            type: TimeType.Reset,
            title: 'Daily Challenges',
            frequency: TimeFrequency.Daily,
            time: 1678078800,
            data: [{
              color: Color.Green,
              time: 1678078800
            }]
          },
          {
            type: TimeType.Event,
            title: 'Season 03 Reloaded',
            time: 1683702000,
            data: [{
              color: Color.Red,
              time: 1683702000
          }]
          },
          {
            type: TimeType.Status,
            title: 'Building 21',
            frequency: TimeFrequency.Weekly,
            time: 1678467600,
            data: [{
              color: Color.Orange, // TODO: invert
              time: 1678467600,
              status: TimeStatus.Opening
          }]
          },
          {
            type: TimeType.Status,
            title: 'Building 21',
            frequency: TimeFrequency.Weekly,
            time: 1678122000,
            data: [{
              color: Color.Green, // TODO: invert
              time: 1678122000,
              status: TimeStatus.Closing,
          }]
          }
        ]);
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

  const renderTimers = (timers: APITime[]) => {
    if (timers.length === 0) return null;

    // TODO: rename to APITimer ?
    return timers.map((timer: APITime) => {
      const { frequency, title, time: resetTime, type } = timer;
      const key = `${frequency}-${title}-${type}-${resetTime}`;
      const commonProps = {
        currentTimestamp,
        key
      };

      // TODO: rename in JSON to timers, also add a versioning
      switch (type) {
        case TimeType.Event:
          return <EventTimer {...commonProps} time={timer} />;
        case TimeType.Reset:
          return <ResetTimer {...commonProps} time={timer} />;
        case TimeType.Status:
          return <StatusTimer {...commonProps} time={[timer]} />;
        default:
          return null;
      }
    });
  };

  return (
    <div className={className}>
      <Header text="Other Timers" />
      <div>
        <div className="flex justify-center flex-wrap mt-2.5">{renderTimers(times)}</div>
      </div>
    </div>
  );
};

export { OtherTimers };
