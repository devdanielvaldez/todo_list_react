/*
Daniel A. Valdez Guzman
FullStack Developer
hello@daniel-valdez.com
https://daniel-valdez.com
+1 (829) 696 - 7695 **/

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
