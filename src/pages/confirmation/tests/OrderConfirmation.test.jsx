/* eslint-disable no-undef */
import React from 'react';
import { rest } from 'msw';
import { render, screen } from '../../../test-utils/testing-library-utils';
import server from '../../../../server';
import OrderConfirmation from '../OrderConfirmation';
import { SERVER } from '../../../constants';

test('error response from server for submitting order', async () => {
  // override default msw response for options endpoint with error response
  server.resetHandlers(
    rest.post(`${SERVER}/order`, (req, res, ctx) => res(ctx.status(500))),
  );

  render(<OrderConfirmation setOrderPhase={jest.fn()} />);

  const alert = await screen.findByRole('alert');
  expect(alert).toHaveTextContent(
    'An unexpected error occurred. Please try again later.',
  );
});
