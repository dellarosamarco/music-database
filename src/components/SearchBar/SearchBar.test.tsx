import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SearchBar, { SearchBarResult } from './SearchBar';

describe('SearchBar Component', () => {
  const mockOnSearch = vi.fn();

  const mockResults: SearchBarResult[] = [
    {
      name: 'Album 1',
      description: 'Artist 1',
      image: 'https://example.com/album1.jpg',
      onClick: vi.fn(),
    },
    {
      name: 'Album 2',
      description: 'Artist 2',
      image: 'https://example.com/album2.jpg',
      onClick: vi.fn(),
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the search bar with placeholder', () => {
    render(<SearchBar placeholder="Search for albums" />);

    const searchInput = screen.getByPlaceholderText('Search for albums');
    expect(searchInput).toBeInTheDocument();
  });

  it('calls onSearch when input value changes', () => {
    render(<SearchBar onSearch={mockOnSearch} placeholder="Search for albums" />);

    const searchInput = screen.getByPlaceholderText('Search for albums');
    fireEvent.change(searchInput, { target: { value: 'Album' } });

    expect(mockOnSearch).toHaveBeenCalledWith('album');
  });

  it('displays search results when available', () => {
    render(<SearchBar results={mockResults} placeholder='Search for albums'/>);

    const searchInput = screen.getByPlaceholderText('Search for albums');
    fireEvent.change(searchInput, { target: { value: 'A' } });

    expect(screen.getByText('Album 1')).toBeInTheDocument();
    expect(screen.getByText('Artist 1')).toBeInTheDocument();
    expect(screen.getByText('Album 2')).toBeInTheDocument();
    expect(screen.getByText('Artist 2')).toBeInTheDocument();
  });

  it('calls onClick when a search result is clicked', () => {
    render(<SearchBar results={mockResults} placeholder='Search for albums' />);

    const searchInput = screen.getByPlaceholderText('Search for albums');
    fireEvent.change(searchInput, { target: { value: 'A' } });

    const resultItem = screen.getByText('Album 1');
    fireEvent.click(resultItem);

    expect(mockResults[0].onClick).toHaveBeenCalled();
  });

  it('shows loader when isLoading is true', () => {
    render(<SearchBar isLoading={true} />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
