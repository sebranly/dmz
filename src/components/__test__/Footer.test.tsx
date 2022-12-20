import * as React from 'react';
import { render } from '@testing-library/react';

import { Footer } from '../Footer';

test('Footer', () => {
  const createComponent = () => <Footer />;

  const { container } = render(createComponent());
  expect(container.childNodes).toMatchSnapshot();
});
