import * as React from 'react';
import { URL_DATA } from '../constants/general';
import { APITime } from '../types';
import { Header } from './Header';

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
        console.log(safeTimes);
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

  return <div className={className}><Header text="Other Timers" /></div>;
};

export { OtherTimers };
