import React from 'react';
import { useCookies } from 'react-cookie';
import { COOKIE_TIMERS, DEFAULT_SORT_OPTION, SORT_OPTIONS, WEBSITE_SUBTITLE, WEBSITE_TITLE } from './constants/general';
import {
  BUNDLE_TIMER_VALUE,
  BUNDLE_TIMER_MIN,
  CURRENT_SEASON,
  DEAD_DROP_HOURLY_RATE,
  HOURS_PER_SLOT,
  MAX_HOURS_FOR_TIMER,
  MAX_PLAYERS,
  MAX_PLAYERS_WITHOUT_ASSIMILATION,
  MAX_TIMERS,
  MAX_TIMERS_PER_PLAYER,
  REGULAR_HOURLY_RATE,
  UPGRADES_COUNT_PER_SLOT,
  UPGRADE_PERCENT
} from './constants/game';
import { Footer } from './components/Footer';
import { TimerCard } from './components/TimerCard';
import { applyPercentOff, getCurrentTimestamp, isNullTimeValue, numberRange } from './utils';
import {
  convertMoneyToSeconds,
  convertPlayerTimerIndexToSeconds,
  convertSecondsToTimeValue,
  convertTimerIndexToPlayerIndex,
  convertTimerIndexToPlayerTimerIndex,
  convertTimeValueToSeconds
} from './utils/convert';
import { displaySeason, displayTimeValue, displayWithTwoDigits, getPlayerColor } from './utils/display';
import { sortTimers } from './utils/sort';
import { Sort, Timer, TimeUnit, TimeValue } from './types';
import { excludeTimerByIndex, pickTimerByIndex } from './utils/filter';
import { FAQ } from './components/FAQ';
import classnames from 'classnames';
import { Header } from './components/Header';
import { OtherTimers } from './components/OtherTimers';
import { sanitizeTimersCookie } from './utils/sanitize';

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
    [TimeUnit.Day]: 0,
    [TimeUnit.Hour]: HOURS_PER_SLOT,
    [TimeUnit.Minute]: 0,
    [TimeUnit.Second]: 0
  });

  const playerTimerIndex = convertTimerIndexToPlayerTimerIndex(timerIndex);
  const secondsForTimer = convertPlayerTimerIndexToSeconds(playerTimerIndex);
  const copyLostWeaponBundle = displayTimeValue(convertSecondsToTimeValue(BUNDLE_TIMER_MIN * 60), true);
  const timerValuesAreNull = isNullTimeValue(timerValue);
  const classnamesQuickOptions =
    'inline m-auto mt-2.5 border-2 border-solid border-white text-base md:text-sm lg:text-base rounded-lg p-1 text-center bg-white text-black mx-1 w-1/3';

  const onMount = () => {
    const anchor = window.location.hash.slice(1);
    if (anchor) {
      const anchorEl = document.getElementById(anchor);
      if (anchorEl) {
        anchorEl.scrollIntoView();
      }
    }

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
      ? {
          [TimeUnit.Day]: 0,
          [TimeUnit.Hour]: MAX_HOURS_FOR_TIMER,
          [TimeUnit.Minute]: 0,
          [TimeUnit.Second]: 0
        }
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

  const classnamesCardBorderBis =
    'mb-4 mr-0 md:mr-5 border border-solid border-white rounded-lg p-2.5 bg-neutral-800 text-lg md:text-base lg:text-lg';
  const classnamesCardBorder = classnames(classnamesCardBorderBis, 'min-w-[300px] md:min-w-[350px]');
  const classnamesCardBorderXp = classnames(classnamesCardBorderBis, 'min-w-[300px] md:min-w-[200px]');
  const classnamesCardBorderAddTimer = classnames(classnamesCardBorderBis, 'min-w-[300px] md:min-w-[200px]');
  const classnamesButtonTimer = classnames(
    'mt-5 border-2 border-solid text-base md:text-sm lg:text-base rounded-lg p-1 text-center text-black',
    {
      'border-white bg-white': !timerValuesAreNull,
      'border-gray-800 bg-gray-600': timerValuesAreNull
    }
  );

  const playerIndex = convertTimerIndexToPlayerIndex(timerIndex);
  const playerColor = getPlayerColor(playerIndex);
  const timerExists = pickTimerByIndex(timers, timerIndex).length > 0;
  const copyUpsertTimer = timerExists ? 'Modify existing timer' : 'Add new timer';
  const isMaxTimer = timerValue[TimeUnit.Hour] === MAX_HOURS_FOR_TIMER;

  const textInformation = timerExists ? 'Existing timer will be edited.' : 'A new timer will be added.';
  const classnamesInformation = classnames('pt-2.5 text-sm m-0 m-auto w-44', {
    'text-amber-500': timerExists,
    'text-lime-500': !timerExists
  });

  const deadDropTimeEquivalentSeconds = convertMoneyToSeconds(moneyInput, DEAD_DROP_HOURLY_RATE);
  const deadDropTimeEquivalent = convertSecondsToTimeValue(deadDropTimeEquivalentSeconds);
  const deadDropTimeEquivalentText = displayTimeValue(deadDropTimeEquivalent);

  const regularTimeEquivalentSeconds = convertMoneyToSeconds(moneyInput, REGULAR_HOURLY_RATE);
  const regularTimeEquivalent = convertSecondsToTimeValue(regularTimeEquivalentSeconds);
  const regularTimeEquivalentText = displayTimeValue(regularTimeEquivalent);

  const xpEquivalent = Math.floor(moneyInput / 10);
  const xpEquivalentTitle = `${xpEquivalent} points`;

  return (
    <div className="text-center">
      <section id="main" className="px-5 pb-5 text-white text-lg flex flex-col items-center justify-center">
        <h1 className="font-bold pt-5 my-5 text-lime-500 text-5xl" id="dmz">
          <a href="#dmz">{WEBSITE_TITLE}</a>
        </h1>
        <h2 className="font-bold text-2xl m-0">{WEBSITE_SUBTITLE}</h2>
        <div className="text-amber-500">{`Updated for Season ${displaySeason(CURRENT_SEASON)}`}</div>
        <div id="tldr-section" className="text-base lg:text-lg mt-2.5">
          <Header text="TL;DR" />
          <div className="text-left sm:text-center cursor-pointer font-bold mb-2 text-lime-400 hover:text-lime-500">
            You lost your insured weapon and want to get it back asap?
          </div>
          <div className="text-left sm:text-justify mb-5">
            <div className="mb-5">
              We got you. The quickest way is to jump into any map, head to a dead drop location (you‘ll find them{' '}
              <a
                className="underline text-white"
                href="https://warzonetacmap.online"
                rel="noopener noreferrer"
                title="Hyperlink for a DMZ Interactive Map for finding the locations of dead drops"
                target="_blank"
              >
                here
              </a>
              ), then drop money, weapons and/or items into the white dumpster. Even if you die, it will reduce your
              weapon cooldown timer.
            </div>
          </div>
        </div>
        <div>
          <Header text="Money to Time Converter" />
          <div className="flex flex-col md:flex-row justify-center">
            <div className={classnamesCardBorderBis}>
              <div>Enter Money Value</div>
              <div className="inline text-lime-500 text-sm sm:text-base">$</div>{' '}
              <input
                className="text-black mt-2.5 text-center rounded-lg text-sm sm:text-base"
                min="0"
                max="1000000"
                step="100"
                type="number"
                onChange={onChangeMoneyInput}
                value={moneyInput}
              />
            </div>
            <div className={classnamesCardBorder}>
              <div>Time equivalent</div>
              <div className="mt-2.5">
                <div className="flex text-left">
                  <div className="grow pr-5">Exfiltration:</div> {regularTimeEquivalentText}
                </div>
                <div className="flex text-left">
                  <div className="grow pr-5">Dead Drop:</div> {deadDropTimeEquivalentText}
                </div>
              </div>
            </div>
            <div className={classnamesCardBorderXp}>
              <div>XP equivalent</div>
              <div className="mt-2.5">
                <div className="flex text-left">
                  <div className="grow pr-5">XP:</div> {xpEquivalentTitle}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Header text="Time to Money Converter" />
          <h4 className="font-bold mb-5">Add a timer</h4>
          <div className="flex flex-col md:flex-row justify-center">
            <div className={classnamesCardBorderAddTimer}>
              <div>Select Insured Slot</div>
              <div className={`mt-2.5 text-${playerColor}-500`}>{`Player ${playerIndex + 1}`}</div>
              <select
                className="text-black mt-2.5 rounded-lg text-center p-1 text-base md:text-sm lg:text-base"
                onChange={onChangeTimerIndex}
                value={timerIndex}
              >
                {renderPlayerIndexesOptionGroups()}
              </select>
              <div className={classnamesInformation}>{textInformation}</div>
            </div>
            <div className={classnamesCardBorderAddTimer}>
              <div>Current remaining time</div>
              <div className="mt-2.5">
                {[TimeUnit.Hour, TimeUnit.Minute, TimeUnit.Second].map((timeLabel: TimeUnit) => {
                  return (
                    <div className="inline" key={timeLabel}>
                      <select
                        className="text-black text-base md:text-sm lg:text-base rounded-lg text-center p-1"
                        disabled={timeLabel !== TimeUnit.Hour && isMaxTimer}
                        onChange={onChangeTimerValue(timeLabel)}
                        value={timerValue[timeLabel]}
                      >
                        {renderTimerUnitOptions(timeLabel)}
                      </select>
                      <div className="inline text-base font-bold px-0.5 mr-1">{timeLabel.charAt(0).toLowerCase()}</div>
                    </div>
                  );
                })}
              </div>
              <button
                className={classnamesButtonTimer}
                onClick={() => onClickEditTimer(timerValue)}
                disabled={timerValuesAreNull}
              >
                {copyUpsertTimer}
              </button>
            </div>
            <div className={classnamesCardBorderAddTimer}>
              <div>Quick options</div>
              <div className="text-sm">{copyUpsertTimer}</div>
              <button className={classnamesQuickOptions} onClick={() => onClickEditTimer(BUNDLE_TIMER_VALUE)}>
                {copyLostWeaponBundle}
              </button>
              {Array.from({ length: UPGRADES_COUNT_PER_SLOT + 1 }, (v, i) => UPGRADES_COUNT_PER_SLOT - i).map(
                (value: number) => {
                  const percentOff = value * UPGRADE_PERCENT;
                  const secondsAfterUpgrade = applyPercentOff(secondsForTimer, percentOff);
                  const quickOptionTimerValue = convertSecondsToTimeValue(secondsAfterUpgrade);
                  const copyLostWeapon = displayTimeValue(quickOptionTimerValue, true);
                  const key = `${secondsAfterUpgrade}-${value}`;

                  return (
                    <button
                      key={key}
                      className={classnamesQuickOptions}
                      onClick={() => onClickEditTimer(quickOptionTimerValue)}
                    >
                      {copyLostWeapon}
                    </button>
                  );
                }
              )}
            </div>
          </div>
        </div>
        <h4 className="font-bold my-5">{`View all timers (${timers.length}/${MAX_TIMERS})`}</h4>
        <select
          className="text-black rounded-lg text-base text-center p-1"
          disabled={timers.length <= 1}
          onChange={onChangeSort}
          value={sort}
        >
          {renderSortOptions()}
        </select>
        <div className="flex justify-center flex-wrap mt-2.5">{renderTimers()}</div>
        <OtherTimers currentTimestamp={currentTimestamp} />
        <FAQ />
      </section>
      <Footer />
    </div>
  );
}

export default App;
