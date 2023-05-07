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
            subtitle: 'They reset in',
            frequency: TimeFrequency.Daily,
            data: [
              {
                color: Color.Green,
                description: 'Daily Reset:',
                time: 1678078800
              }
            ]
          },
          {
            type: TimeType.Event,
            title: 'Season 03 Reloaded',
            showPostEvent: false,
            subtitle: 'It launches in',
            subtitlePostEvent: 'It launched already',
            data: [
              {
                color: Color.Red,
                description: 'Release Date:',
                time: 1683702000 // TODO: test with 0,
              }
            ]
          },
          {
            type: TimeType.Status,
            title: 'Building 21',
            frequency: TimeFrequency.Weekly,
            data: [
              {
                color: Color.Orange, // TODO: invert?
                time: 1678467600,
                status: TimeStatus.Opening,
                subtitlePrefix: 'It opens in',
                titleSuffix: 'is closed' // TODO: invert?
              },
              {
                color: Color.Green, // TODO: invert?
                time: 1678122000,
                status: TimeStatus.Closing,
                subtitleSuffix: 'It closes in',
                titleSuffix: 'is open'
              }
            ]
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
      const { frequency, title, type } = timer;
      // TODO: add stringified data as key
      const key = `${frequency}-${title}-${type}`;
      const commonProps = {
        currentTimestamp,
        key
      };

      // TODO: rename in JSON to timers, also add a versioning
      // TODO: rename each prop to timer
      switch (type) {
        case TimeType.Event:
          return <EventTimer {...commonProps} time={timer} />;
        case TimeType.Reset:
          return <ResetTimer {...commonProps} time={timer} />;
        case TimeType.Status:
          return <StatusTimer {...commonProps} time={timer} />;
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
