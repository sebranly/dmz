import React from 'react';
import { WEBSITE_TITLE } from './constants/general';
import { Footer } from './components/Footer';
import './App.css';
import { CountDownTimer } from './components/CountDownTimer';

function App() {
  return (
    <div className="App">
      <section className="main">
        <h1>{WEBSITE_TITLE}</h1>
        <div className="flex-container flex-wrap">
          <CountDownTimer className="flex-child" remainingSeconds={7300} title="Timer 2h+" />
          <CountDownTimer className="flex-child" remainingSeconds={3606} title="Timer 1h+" />
          <CountDownTimer className="flex-child" remainingSeconds={66} title="Timer 1m+" />
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default App;
