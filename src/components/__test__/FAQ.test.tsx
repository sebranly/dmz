import * as React from 'react';
import { render } from '@testing-library/react';

import { FAQ } from '../FAQ';

test('FAQ', () => {
  const createComponent = () => <FAQ />;

  const { container } = render(createComponent());
  expect(container.childNodes).toMatchSnapshot();
});
