/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// eslint-disable-next-line no-undef
it('renders Header and it has correct class', () => {
  render(<App />);
  const Header = screen.getByText('Hello from Vite + React!');
  expect(Header).toBeEnabled();
  expect(Header).toHaveClass('app-header');
});

it('renders Add counter button', () => {
  render(<App />);
  const addButton = screen.getByRole('button', { name: 'Add 1 to counter' });
  expect(addButton).toBeInTheDocument();
});
