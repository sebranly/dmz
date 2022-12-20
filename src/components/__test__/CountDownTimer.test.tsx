import * as React from 'react';
import { render } from '@testing-library/react';
import { CountDownTimer } from '../CountDownTimer';

test('CountDownTimer', () => {
  const createComponent = () => <CountDownTimer remainingSeconds={3662} />;

  const { container } = render(createComponent());
  expect(container.childNodes).toMatchSnapshot();
});
