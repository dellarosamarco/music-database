import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loader from './Loader';

describe('Loader Component', () => {
  it('renders the loader', () => {
    render(<Loader />);

    const loaderElement = screen.getByRole('status', { hidden: true });
    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).toHaveClass('loader');
  });
});
