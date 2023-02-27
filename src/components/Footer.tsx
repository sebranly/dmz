import * as React from 'react';
import { AUTHOR_NAME, CHANGELOG_URL, PROJECT_URL, WEBSITE_VERSION } from '../constants/general';

const Footer = () => (
  <div className="App-footer">
    <div>
      Developed by{' '}
      <a
        className="text-green-700 underline"
        href={PROJECT_URL}
        rel="noopener noreferrer"
        title="GitHub page for repository"
        target="_blank"
      >
        {AUTHOR_NAME}
      </a>{' '}
      with 💚
    </div>
    <div>
      Website version{' '}
      <a
        className="text-green-700 underline"
        href={CHANGELOG_URL}
        rel="noopener noreferrer"
        title="Website changelog"
        target="_blank"
      >
        {WEBSITE_VERSION}
      </a>
    </div>
  </div>
);

export { Footer };
