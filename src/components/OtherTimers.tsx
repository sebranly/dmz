import * as React from 'react';
import { URL_DATA } from '../constants/general';
import { APITime, TimeType } from '../types';
import { Header } from './Header';
import { OpenClosedTimer } from './OpenClosedTimer';

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

  const timesBuilding21 = times.filter((time: APITime) => {
    const { name, type } = time;
    return type === TimeType.Map && name === 'Building 21';
  });

  return (
    <div className={className}>
      <Header text="Other Timers" />
      <div>
        <OpenClosedTimer currentTimestamp={currentTimestamp} times={timesBuilding21} />
      </div>
    </div>
  );
};

export { OtherTimers };
