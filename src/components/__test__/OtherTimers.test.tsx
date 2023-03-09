import * as React from 'react';
import { render } from '@testing-library/react';
import { OtherTimers } from '../OtherTimers';

test('OtherTimers', () => {
  const createComponent = () => <OtherTimers currentTimestamp={123} />;

  const { container } = render(createComponent());
  expect(container.childNodes).toMatchSnapshot();
});
