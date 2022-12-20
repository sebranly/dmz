import React from 'react';
import { WEBSITE_TITLE } from './constants/general';
import { Footer } from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <section className="main">
        <h1>{WEBSITE_TITLE}</h1>
      </section>
      <Footer />
    </div>
  );
}

export default App;
