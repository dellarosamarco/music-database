import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Album } from '../../types/album';
import AlbumCard from './AlbumCard';

const mockAlbum: Album = {
    name: "Test Album",
    images: [
        {
            url: "https://example.com/test-album-image.jpg",
            height: 30,
            width: 30
        }
    ],
    artists: [
        {
            name: "Artist 1",
            href: '',
            id: '',
            type: '',
            uri: ''
        },
        {
            name: "Artist 2",
            href: '',
            id: '',
            type: '',
            uri: ''
        }
    ],
    album_type: '',
    external_urls: {
        spotify: ''
    },
    href: '',
    id: '',
    release_date: '',
    release_date_precision: '',
    total_tracks: 0,
    type: '',
    uri: '',
    tracks: {
        items: []
    }
};

const renderComponent = (album: Album, onClick: () => void) => {
  return render(
    <AlbumCard 
      album={album} 
      onClick={onClick}
    />
  );
};

describe('AlbumCard', () => {
  it('renders the album name and artist names', () => {
    renderComponent(mockAlbum, vi.fn());

    expect(screen.getByText(mockAlbum.name)).toBeInTheDocument();
    expect(screen.getByText('Artist 1, Artist 2')).toBeInTheDocument();
  });

  it('renders the album image when available', () => {
    renderComponent(mockAlbum, vi.fn());

    const imgElement = screen.getByAltText(mockAlbum.name) as HTMLImageElement;

    expect(imgElement).toBeInTheDocument();
    expect(imgElement.src).toBe(mockAlbum.images[0].url);
  });

  it('does not render an image when album has no images', () => {
    const albumWithoutImages = {
      ...mockAlbum,
      images: []
    };
    
    renderComponent(albumWithoutImages, vi.fn());

    expect(screen.queryByRole('img')).toBeNull();
  });

  it('triggers onClick when the album card is clicked', () => {
    const mockOnClick = vi.fn();
    renderComponent(mockAlbum, mockOnClick);

    fireEvent.click(screen.getByRole('button', { hidden: true }));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
