import { Sort } from '../types';

export const AUTHOR_NAME = 'sebranly';
export const PROJECT_NAME = 'dmz';
export const PROJECT_URL = `https://github.com/${AUTHOR_NAME}/${PROJECT_NAME}`;
export const CHANGELOG_URL = `${PROJECT_URL}/releases`;
export const NEW_RIBBON_DURATION_SEC = 5;
export const WEBSITE_TITLE = 'DMZ';
export const WEBSITE_SUBTITLE = 'Currency to Cooldown Converter';
export const WEBSITE_VERSION = '1.0.0';

export const SORT_OPTIONS = [
  Sort.oldestToNewest,
  Sort.newestToOldest,
  Sort.shortestToLongest,
  Sort.longestToShortest,
  Sort.firstPlayerToLastPlayer,
  Sort.lastPlayerToFirstPlayer
];
