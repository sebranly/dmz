import * as React from 'react';
import { API_VERSION, URL_DATA } from '../constants/general';
import { APITimer, TimerType } from '../types';
import { Header } from './Header';
import { EventTimer } from './EventTimer';
import { ResetTimer } from './ResetTimer';
import { StatusTimer } from './StatusTimer';
import { sanitizeAPITimers } from '../utils/sanitize';

export interface OtherTimersProps {
  className?: string;
  currentTimestamp: number;
}

const OtherTimers: React.FC<OtherTimersProps> = (props) => {
  const [timers, setTimers] = React.useState<APITimer[]>([]);

  const onMount = () => {
    const fetchAPITimers = async () => {
      try {
        const ms = Date.now();
        const response = await fetch(`${URL_DATA}?ms=${ms}`);
        const data = await response.json();

        // TODO: have function filtering out API response
        const safeTimers = sanitizeAPITimers(data[API_VERSION] || [])

        setTimers(safeTimers);
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

  if (timers.length === 0) return null;

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
        <div className="flex justify-center flex-wrap mt-2.5">{renderTimers(timers)}</div>
      </div>
    </div>
  );
};

export { OtherTimers };
