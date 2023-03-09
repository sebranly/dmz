import { Sort } from '../types';

export const AUTHOR_NAME = 'sebranly';
export const AUTHOR_GITHUB = `https://${AUTHOR_NAME}.github.io`;
export const DEFAULT_SORT_OPTION = Sort.OldestToNewest;
export const PROJECT_NAME = 'dmz';
export const PROJECT_URL = `https://github.com/${AUTHOR_NAME}/${PROJECT_NAME}`;
export const CHANGELOG_URL = `${PROJECT_URL}/releases`;
export const COOKIE_TIMERS = 'timers-live-save';
export const NEW_RIBBON_DURATION_SEC = 5;
export const URL_DATA = `${AUTHOR_GITHUB}/json/${PROJECT_NAME}/times.json`;
export const YOUTUBE_REFERENCE = 'https://youtu.be/XtsRwpnUNAY';
export const WEBSITE_TITLE = 'DMZ';
export const WEBSITE_SUBTITLE = 'Currency to Cooldown Converter';
export const WEBSITE_VERSION = '1.6.0';

export const SORT_OPTIONS = [
  DEFAULT_SORT_OPTION,
  Sort.NewestToOldest,
  Sort.ShortestToLongest,
  Sort.LongestToShortest,
  Sort.FirstPlayerToLastPlayer,
  Sort.LastPlayerToFirstPlayer
];
