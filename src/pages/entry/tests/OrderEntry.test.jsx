/* eslint-disable no-undef */
import React from 'react';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '../../../test-utils/testing-library-utils';
import OrderEntry from '../OrderEntry';
import { server } from '../../../mocks/server';

const SERVER = import.meta.env.VITE_SERVER;

test('handles error for scoops and toppings routes', async () => {
  server.resetHandlers(
    rest.get(`${SERVER}/scoops`, (req, res, ctx) => res(ctx.status(500))),
    rest.get(`${SERVER}/toppings`, (req, res, ctx) => res(ctx.status(500))),
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);
  });
});

test('disable order button if there are no scoops ordered', async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  // заблокарована при рендере
  const orderButton = screen.getByRole('button', { name: /order sundae/i });
  expect(orderButton).toBeDisabled();

  // становится доступной после выбора
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(orderButton).toBeEnabled();

  // снова блокируется если выбор изменен на 0
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '0');
  expect(orderButton).toBeDisabled();
});
