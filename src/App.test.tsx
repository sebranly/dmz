import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders text', () => {
  render(<App />);
  const textElement = screen.getByText(/DMZ Currency to Cooldown Converter/i);
  expect(textElement).toBeInTheDocument();
});
