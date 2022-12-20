import React from 'react';
import { PROJECT_URL, WEBSITE_TITLE } from './constants/general';
import { Footer } from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>{WEBSITE_TITLE}</p>
        <div>
          More information in the:{' '}
          <a href={PROJECT_URL} rel="noopener noreferrer" title="README.md file" target="_blank">
            <code>README.md</code>
          </a>
        </div>
      </header>
      <Footer />
    </div>
  );
}

export default App;
