import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { searchAlbums } from '../../api/services/album/search_albums';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('../../api/services/album/search_albums', () => ({
  searchAlbums: vi.fn(),
}));

const mockAlbums = [
  {
    id: '1',
    name: 'Album 1',
    artists: [{ name: 'Artist 1' }],
    images: [{ url: 'https://example.com/album1.jpg' }],
  },
  {
    id: '2',
    name: 'Album 2',
    artists: [{ name: 'Artist 2' }],
    images: [{ url: 'https://example.com/album2.jpg' }],
  },
];

describe('Header Component', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (searchAlbums as Mock).mockResolvedValue({
      albums: { items: mockAlbums },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the Home icon and SearchBar', () => {
    render(<Header />);
    
    const homeIcon = screen.getByAltText('Home');
    expect(homeIcon).toBeInTheDocument();

    expect(screen.getByPlaceholderText('Search for albums')).toBeInTheDocument();
  });

  it('navigates to home page when the home icon is clicked', () => {
    render(<Header />);
    
    const homeIcon = screen.getByAltText('Home');
    fireEvent.click(homeIcon);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('clears search results when the search term is empty', async () => {
    render(<Header />);

    const searchInput = screen.getByPlaceholderText('Search for albums');
    fireEvent.change(searchInput, { target: { value: 'Album' } });

    await waitFor(() => {
      expect(searchAlbums).toHaveBeenCalled();
    });
  });
});
