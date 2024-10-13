import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SearchBarItem } from './SearchBarItem';

describe('SearchBarItem Component', () => {
  const mockOnClick = vi.fn();
  const mockProps = {
    name: 'Test Album',
    description: 'Test Artist',
    image: 'https://example.com/test-album.jpg',
    onClick: mockOnClick,
  };

  it('renders the SearchBarItem with correct data', () => {
    render(<SearchBarItem {...mockProps} />);

    expect(screen.getByText('Test Album')).toBeInTheDocument();
    expect(screen.getByText('Test Artist')).toBeInTheDocument();

    const image = screen.getByAltText('album-icon');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockProps.image);
  });

  it('calls onClick when the item is clicked', () => {
    render(<SearchBarItem {...mockProps} />);

    const searchBarItem = screen.getByText('Test Album').closest('.search-bar__result');
    fireEvent.click(searchBarItem!);

    expect(mockOnClick).toHaveBeenCalled();
  });

  it('matches the snapshot', () => {
    const { container } = render(<SearchBarItem {...mockProps} />);
    
    expect(container).toMatchSnapshot();
  });
});
