import * as React from 'react';
import { URL_DATA } from '../constants/general';
import { APITimer, Color, TimerFrequency, TimerType } from '../types';
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

        // TODO: have function filtering out API response
        const safeTimes = (data.times || []) as APITimer[];

        // TODO: reset to actual API fetch
        setTimes([
          {
            type: TimerType.Reset,
            title: 'Daily Challenges',
            subtitle: 'They reset in',
            frequency: TimerFrequency.Daily,
            data: [
              {
                color: Color.Yellow,
                description: 'Daily Reset:',
                time: 1678078800
              }
            ]
          },
          {
            type: TimerType.Status,
            title: 'Building 21',
            frequency: TimerFrequency.Weekly,
            data: [
              {
                color: Color.Green, // TODO: invert?
                time: 1678467600,
                description: 'Weekly Opening:',
                textOverride: {
                  title: 'Building 21 is closed',
                  subtitle: 'It opens in'
                }
              },
              {
                color: Color.Orange, // TODO: invert?
                time: 1678122000,
                description: 'Weekly Closing:',
                textOverride: {
                  title: 'Building 21 is open',
                  subtitle: 'It closes in'
                }
              }
            ]
          },
          {
            type: TimerType.Event,
            title: 'Season 03 Reloaded',
            showPostEvent: true,
            subtitle: 'It launches in',
            subtitlePostEvent: 'It launched already',
            data: [
              {
                color: Color.Red,
                description: 'Release Date:',
                time: 1683702000 // TODO: test with 0,
              }
            ]
          }
        ]);
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

  const renderTimers = (timers: APITimer[]) => {
    if (timers.length === 0) return null;

    return timers.map((timer: APITimer) => {
      const { data, frequency, title, type } = timer;
      const key = `${frequency}-${title}-${type}-${JSON.stringify(data)}`;
      const commonProps = {
        currentTimestamp,
        key,
        timer
      };

      // TODO: rename in JSON to timers, also add a versioning
      switch (type) {
        case TimerType.Event:
          return <EventTimer {...commonProps} />;
        case TimerType.Reset:
          return <ResetTimer {...commonProps} />;
        case TimerType.Status:
          return <StatusTimer {...commonProps} />;
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
