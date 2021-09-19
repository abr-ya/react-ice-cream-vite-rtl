/* eslint-disable import/no-extraneous-dependencies */
import { render } from '@testing-library/react';
import { OrderDetailsProvider } from '../contexts/OrderDetails';

const renderWithContext = (ui, options) => render(ui, { wrapper: OrderDetailsProvider, ...options });

export * from '@testing-library/react'; // всё как есть
export { renderWithContext as render }; // переопределяем
