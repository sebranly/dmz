import React from 'react';
import { SORT_OPTIONS, WEBSITE_SUBTITLE, WEBSITE_TITLE } from './constants/general';
import { DEBUG_TIMERS } from './constants/debug';
import { MAX_HOURS_FOR_TIMER, MAX_PLAYERS, MAX_TIMERS_PER_PLAYER } from './constants/game';
import { Footer } from './components/Footer';
import './App.css';
import { TimerCard } from './components/TimerCard';
import {
  convertPlayerTimerIndexToHourTimer,
  convertTimerIndexToPlayerIndex,
  convertTimerIndexToPlayerTimerIndex,
  convertTimeValueToSeconds,
  getCurrentTimestamp,
  numberRange
} from './utils';
import { convertToTwoDigits, getPlayerColor } from './utils/display';
import { sortTimers } from './utils/sort';
import { Sort, TimeUnit, Timer, TimeValue } from './types';
import { excludeTimerByIndex, filterTimersByIndex } from './utils/filter';

function App() {
  const [timers, setTimers] = React.useState<Timer[]>(DEBUG_TIMERS);
  const [sort, setSort] = React.useState(Sort.oldestToNewest);
  const [timerIndex, setTimerIndex] = React.useState(0);
  const [currentTimestamp, setCurrentTimestamp] = React.useState(getCurrentTimestamp());
  const [timerValue, setTimerValue] = React.useState<TimeValue>({
    [TimeUnit.Hour]: 0,
    [TimeUnit.Minute]: 0,
    [TimeUnit.Second]: 0
  });

  const playerTimerIndex = convertTimerIndexToPlayerTimerIndex(timerIndex);
  const hoursForTimer = convertPlayerTimerIndexToHourTimer(playerTimerIndex);
  const maxTimers = MAX_PLAYERS * MAX_TIMERS_PER_PLAYER;
  const quickOptionTimerValue = { [TimeUnit.Hour]: hoursForTimer, [TimeUnit.Minute]: 0, [TimeUnit.Second]: 0 };
  const copyLostWeapon = `Add ${hoursForTimer}-hour timer`;
  const timerValuesAreZero =
    timerValue[TimeUnit.Hour] === 0 && timerValue[TimeUnit.Minute] === 0 && timerValue[TimeUnit.Second] === 0;

  const onMount = () => {
    const interval = setInterval(() => {
      setCurrentTimestamp(getCurrentTimestamp());
    }, 1000);

    return () => clearInterval(interval);
  };

  React.useEffect(() => {
    onMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeTimerIndex = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const newValue = Number(value);
    setTimerIndex(newValue);
  };

  const onChangeTimerValue = (timeLabel: TimeUnit) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const newValue = Number(value);
    const newTimerValue = { ...timerValue, [timeLabel]: newValue };
    setTimerValue(newTimerValue);
  };

  const onChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const sortValue = value as Sort;
    const newTimers = sortTimers(timers, currentTimestamp, sortValue);
    setSort(sortValue);
    setTimers(newTimers);
  };

  const onClickAddTimer = (timerValue: TimeValue) => {
    const newTimer: Timer = {
      timerIndex,
      timestampStart: currentTimestamp,
      durationSec: convertTimeValueToSeconds(timerValue)
    };

    const newTimers = [...timers, newTimer];
    setTimers(sortTimers(newTimers, currentTimestamp, sort));
  };

  const deleteTimer = (timerIndex: number) => () => {
    setTimers(excludeTimerByIndex(timers, timerIndex));
  };

  const renderTimerUnitOptions = (label: string) => {
    const isHour = label === TimeUnit.Hour;
    const maxValue = isHour ? MAX_HOURS_FOR_TIMER : 59;
    const values = numberRange(0, maxValue);

    return values.map((value: number) => {
      const key = `${label}-${value}`;
      return (
        <option key={key} value={value}>
          {convertToTwoDigits(value)}
        </option>
      );
    });
  };

  const renderPlayerTimerOptions = (playerIndex: number) => {
    const timers = numberRange(0, MAX_TIMERS_PER_PLAYER - 1);

    return timers.map((idx: number) => {
      const key = `player-${playerIndex}-timer-${idx}`;
      const uniqueTimerIdx = playerIndex * MAX_TIMERS_PER_PLAYER + idx;
      const label = `Timer ${idx + 1}`;

      return (
        <option key={key} label={label} value={uniqueTimerIdx}>
          {label}
        </option>
      );
    });
  };

  const renderSortOptions = () => {
    return SORT_OPTIONS.map((s: Sort) => {
      return (
        <option key={s} label={s} value={s}>
          {s}
        </option>
      );
    });
  };

  const renderPlayerIndexesOptionGroups = () => {
    const allPlayerIndexes = numberRange(0, MAX_PLAYERS - 1);

    return allPlayerIndexes.map((idx: number) => {
      const label = `Player ${idx + 1}`;
      return (
        <optgroup key={label} label={label}>
          {renderPlayerTimerOptions(idx)}
        </optgroup>
      );
    });
  };

  const renderTimers = () => {
    return timers.map((timer: Timer) => {
      const { timerIndex } = timer;

      return (
        <TimerCard
          currentTimestamp={currentTimestamp}
          deleteTimer={deleteTimer(timerIndex)}
          key={timerIndex}
          timer={timer}
        />
      );
    });
  };

  const playerIndex = convertTimerIndexToPlayerIndex(timerIndex);
  const playerColor = getPlayerColor(playerIndex);
  const timerExists = filterTimersByIndex(timers, timerIndex).length > 0;

  return (
    <div className="App">
      <section className="main">
        <h1>{WEBSITE_TITLE}</h1>
        <h2>{WEBSITE_SUBTITLE}</h2>
        <div>
          <h3>Add a timer</h3>
          <div className="flex-container new-timer">
            <div className="margin-right border-select">
              <div className="new-timer-option">Pick Timer ID</div>
              <div className={`new-timer-option color-${playerColor}`}>{`Player ${playerIndex + 1}`}</div>
              <select className="new-timer-select" onChange={onChangeTimerIndex} value={timerIndex}>
                {renderPlayerIndexesOptionGroups()}
              </select>
              {timerExists ? (
                <div className="warning">Timer already exists.</div>
              ) : (
                <div className="information">Timer can be created.</div>
              )}
            </div>
            <div className="margin-right border-select">
              <div className="new-timer-option">Current remaining time</div>
              {[TimeUnit.Hour, TimeUnit.Minute, TimeUnit.Second].map((timeLabel: TimeUnit) => {
                return (
                  <div className="inline" key={timeLabel}>
                    <select
                      disabled={timerExists}
                      onChange={onChangeTimerValue(timeLabel)}
                      value={timerValue[timeLabel]}
                    >
                      {renderTimerUnitOptions(timeLabel)}
                    </select>
                    <div className="new-timer-separator">{timeLabel.charAt(0).toLowerCase()}</div>
                  </div>
                );
              })}
              <button
                className="margin-top block"
                onClick={() => onClickAddTimer(timerValue)}
                disabled={timerValuesAreZero || timerExists}
              >
                Add this timer
              </button>
            </div>
            <div className="border-select">
              <div className="new-timer-option">Quick option</div>
              <button disabled={timerExists} onClick={() => onClickAddTimer(quickOptionTimerValue)}>
                {copyLostWeapon}
              </button>
            </div>
          </div>
        </div>
        <h3>{`View all timers (${timers.length}/${maxTimers})`}</h3>
        <select onChange={onChangeSort} value={sort}>
          {renderSortOptions()}
        </select>
        <div className="flex-container flex-wrap all-timers">{renderTimers()}</div>
      </section>
      <Footer />
    </div>
  );
}

export default App;
