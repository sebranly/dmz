import * as React from 'react';
import { render } from '@testing-library/react';
import { Header } from '../Header';

test('Header', () => {
  const createComponent = () => <Header text="Bonjour" />;

  const { container } = render(createComponent());
  expect(container.childNodes).toMatchSnapshot();
});
