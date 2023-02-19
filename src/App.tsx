import React from 'react';
import { useCookies } from 'react-cookie';
import { COOKIE_TIMERS, DEFAULT_SORT_OPTION, SORT_OPTIONS, WEBSITE_SUBTITLE, WEBSITE_TITLE } from './constants/general';
import {
  CURRENT_SEASON,
  DEAD_DROP_HOURLY_RATE,
  HOURS_PER_SLOT,
  MAX_HOURS_FOR_TIMER,
  MAX_PLAYERS,
  MAX_PLAYERS_WITHOUT_ASSIMILATION,
  MAX_TIMERS,
  MAX_TIMERS_PER_PLAYER,
  REGULAR_HOURLY_RATE
} from './constants/game';
import { Footer } from './components/Footer';
import './App.css';
import { TimerCard } from './components/TimerCard';
import { getCurrentTimestamp, isNullTimeValue, numberRange, sanitizeTimersCookie } from './utils';
import {
  convertMoneyToSeconds,
  convertPlayerTimerIndexToHourTimer,
  convertSecondsToTimeValue,
  convertTimerIndexToPlayerIndex,
  convertTimerIndexToPlayerTimerIndex,
  convertTimeValueToSeconds
} from './utils/convert';
import { displayTimeValue, displayWithTwoDigits, getPlayerColor } from './utils/display';
import { sortTimers } from './utils/sort';
import { Sort, Timer, TimeUnit, TimeValue } from './types';
import { excludeTimerByIndex, pickTimerByIndex } from './utils/filter';
import { FAQ } from './components/FAQ';

function App() {
  const [cookies, setCookie] = useCookies([COOKIE_TIMERS]);
  const [moneyInput, setMoneyInput] = React.useState(REGULAR_HOURLY_RATE / 2);
  const [timers, setTimers] = React.useState<Timer[]>(
    sortTimers(sanitizeTimersCookie(cookies[COOKIE_TIMERS]), getCurrentTimestamp(), DEFAULT_SORT_OPTION)
  );

  const [sort, setSort] = React.useState(DEFAULT_SORT_OPTION);
  const [timerIndex, setTimerIndex] = React.useState(0);
  const [currentTimestamp, setCurrentTimestamp] = React.useState(getCurrentTimestamp());
  const [timerValue, setTimerValue] = React.useState<TimeValue>({
    [TimeUnit.Hour]: HOURS_PER_SLOT,
    [TimeUnit.Minute]: 0,
    [TimeUnit.Second]: 0
  });

  const playerTimerIndex = convertTimerIndexToPlayerTimerIndex(timerIndex);
  const hoursForTimer = convertPlayerTimerIndexToHourTimer(playerTimerIndex);
  const quickOptionTimerValue = { [TimeUnit.Hour]: hoursForTimer, [TimeUnit.Minute]: 0, [TimeUnit.Second]: 0 };
  const copyLostWeapon = `Add new ${hoursForTimer}-hour timer`;
  const copyLostWeaponEdit = `Edit to ${hoursForTimer}-hour timer`;
  const timerValuesAreNull = isNullTimeValue(timerValue);

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

  React.useEffect(() => {
    setCookie(COOKIE_TIMERS, timers, { path: '/' });
  }, [setCookie, timers]);

  const onChangeMoneyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newValue = Number(value);
    setMoneyInput(newValue);
  };

  const onChangeTimerIndex = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const newValue = Number(value);
    setTimerIndex(newValue);
  };

  const onChangeTimerValue = (timeLabel: TimeUnit) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const newValue = Number(value);
    const isMaxHour = timeLabel === TimeUnit.Hour && newValue === MAX_HOURS_FOR_TIMER;
    const newTimerValue = isMaxHour
      ? { [TimeUnit.Hour]: MAX_HOURS_FOR_TIMER, [TimeUnit.Minute]: 0, [TimeUnit.Second]: 0 }
      : { ...timerValue, [timeLabel]: newValue };

    setTimerValue(newTimerValue);
  };

  const onChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const newSort = value as Sort;
    const sortedTimers = sortTimers(timers, currentTimestamp, newSort);
    setSort(newSort);
    setTimers(sortedTimers);
  };

  const onClickEditTimer = (timerValue: TimeValue) => {
    const newTimer: Timer = {
      timerIndex,
      timestampStart: currentTimestamp,
      durationSec: convertTimeValueToSeconds(timerValue)
    };

    const newTimers = [...excludeTimerByIndex(timers, timerIndex), newTimer];
    const sortedTimers = sortTimers(newTimers, currentTimestamp, sort);
    setTimers(sortedTimers);
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
          {displayWithTwoDigits(value)}
        </option>
      );
    });
  };

  const renderPlayerTimerOptions = (playerIndex: number) => {
    const timers = numberRange(0, MAX_TIMERS_PER_PLAYER - 1);

    return timers.map((idx: number) => {
      const key = `player-${playerIndex}-timer-${idx}`;
      const uniqueTimerIdx = playerIndex * MAX_TIMERS_PER_PLAYER + idx;
      const label = `Insured Slot ${idx + 1}`;

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
        <React.Fragment key={label}>
          {idx === 0 && (
            <option disabled key="base-players" label="Base Players">
              Base Players
            </option>
          )}
          {idx === MAX_PLAYERS_WITHOUT_ASSIMILATION && (
            <>
              <option disabled key="separator" label="__________">
                __________
              </option>
              <option disabled key="assimilated-players" label="Assimilated Players">
                Assimilated Players
              </option>
            </>
          )}
          <optgroup key={label} label={label}>
            {renderPlayerTimerOptions(idx)}
          </optgroup>
        </React.Fragment>
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
  const timerExists = pickTimerByIndex(timers, timerIndex).length > 0;
  const isMaxTimer = timerValue[TimeUnit.Hour] === MAX_HOURS_FOR_TIMER;

  const deadDropTimeEquivalentSeconds = convertMoneyToSeconds(moneyInput, DEAD_DROP_HOURLY_RATE);
  const deadDropTimeEquivalent = convertSecondsToTimeValue(deadDropTimeEquivalentSeconds);
  const deadDropTimeEquivalentText = displayTimeValue(deadDropTimeEquivalent);

  const regularTimeEquivalentSeconds = convertMoneyToSeconds(moneyInput, REGULAR_HOURLY_RATE);
  const regularTimeEquivalent = convertSecondsToTimeValue(regularTimeEquivalentSeconds);
  const regularTimeEquivalentText = displayTimeValue(regularTimeEquivalent);

  const xpEquivalent = Math.floor(moneyInput / 10);
  const xpEquivalentTitle = `${xpEquivalent} points`;

  return (
    <div className="App">
      <section className="main">
        <h1>{WEBSITE_TITLE}</h1>
        <h2>{WEBSITE_SUBTITLE}</h2>
        <div className="color-orange">{`Updated for Season ${displayWithTwoDigits(CURRENT_SEASON)}`}</div>
        <div>
          <h3>Money to Time Converter</h3>
          <div className="flex-container">
            <div className="margin-flex-20 flex-child">
              <div className="money-input-title">Enter Money Value</div>
              <div className="inline lightgreen">$</div>{' '}
              <input
                className="margin-top-10 money-input"
                min="0"
                max="1000000"
                step="100"
                type="number"
                onChange={onChangeMoneyInput}
                value={moneyInput}
              />
            </div>
            <div className="time-equivalent-card margin-flex-20 flex-child">
              <div className="time-equivalent-title">Time equivalent</div>
              <div className="margin-top-10">
                <div className="time-equivalent">
                  <div className="money-title">Exfiltration:</div> {regularTimeEquivalentText}
                </div>
                <div className="time-equivalent">
                  <div className="money-title">Dead Drop:</div> {deadDropTimeEquivalentText}
                </div>
              </div>
            </div>
            <div className="xp-equivalent-card margin-flex-20 flex-child">
              <div>XP equivalent</div>
              <div className="margin-top-10">
                <div className="xp-equivalent">
                  <div className="xp-title">XP:</div> {xpEquivalentTitle}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3>Time to Money Converter</h3>
          <h4>Add a timer</h4>
          <div className="flex-container new-timer">
            <div className="margin-flex-20 flex-child">
              <div className="new-timer-option">Select Insured Slot</div>
              <div className={`margin-top-10 new-timer-option color-${playerColor}`}>{`Player ${playerIndex + 1}`}</div>
              <select className="margin-top-10 new-timer-select" onChange={onChangeTimerIndex} value={timerIndex}>
                {renderPlayerIndexesOptionGroups()}
              </select>
              {timerExists ? (
                <div className="warning">Existing timer will be edited.</div>
              ) : (
                <div className="information">A new timer will be added.</div>
              )}
            </div>
            <div className="margin-flex-20 flex-child">
              <div className="new-timer-option">Current remaining time</div>
              <div className="margin-top-10">
                {[TimeUnit.Hour, TimeUnit.Minute, TimeUnit.Second].map((timeLabel: TimeUnit) => {
                  return (
                    <div className="inline" key={timeLabel}>
                      <select
                        disabled={timeLabel !== TimeUnit.Hour && isMaxTimer}
                        onChange={onChangeTimerValue(timeLabel)}
                        value={timerValue[timeLabel]}
                      >
                        {renderTimerUnitOptions(timeLabel)}
                      </select>
                      <div className="new-timer-separator">{timeLabel.charAt(0).toLowerCase()}</div>
                    </div>
                  );
                })}
              </div>
              <button
                className="margin-top-20"
                onClick={() => onClickEditTimer(timerValue)}
                disabled={timerValuesAreNull}
              >
                {timerExists ? 'Modify existing timer' : 'Add new timer'}
              </button>
            </div>
            <div className="margin-flex-20 flex-child">
              <div className="new-timer-option">Quick option</div>
              <button className="margin-top-10" onClick={() => onClickEditTimer(quickOptionTimerValue)}>
                {timerExists ? copyLostWeaponEdit : copyLostWeapon}
              </button>
            </div>
          </div>
        </div>
        <h4>{`View all timers (${timers.length}/${MAX_TIMERS})`}</h4>
        <select disabled={timers.length <= 1} onChange={onChangeSort} value={sort}>
          {renderSortOptions()}
        </select>
        <div className="flex-container-timers flex-wrap all-timers">{renderTimers()}</div>
        <FAQ />
      </section>
      <Footer />
    </div>
  );
}

export default App;
