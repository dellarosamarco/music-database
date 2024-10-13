import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { useSelector, useDispatch } from 'react-redux';
import AudioPlayer from './AudioPlayer';
import { getIsListening, getListening, setPause } from '../../store/slices/appSlice';

// Mocking the required modules
vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

vi.mock('../../store/slices/appSlice', () => ({
  getIsListening: vi.fn(),
  getListening: vi.fn(),
  setPause: vi.fn(),
  setResume: vi.fn(),
}));

// Mock listening state
const mockListening = {
  album: {
    name: 'Test Album',
    artists: [{ name: 'Artist 1' }],
    images: [{ url: 'https://example.com/image.jpg' }],
    tracks: {
      items: [
        { id: '1', name: 'Test Track', preview_url: 'https://p.scdn.co/mp3-preview/ef19656dae8419df0f640da0e8c2340cacfe0641?cid=368a8183b26045eebd073197623e9305' },
      ]
    }
  },
  trackId: '1'
};

describe('AudioPlayer Component', () => {
  const mockDispatch = vi.fn();
  const mockAudioPlay = vi.fn();
  const mockAudioPause = vi.fn();

  beforeEach(() => {
    (useDispatch as unknown as Mock).mockReturnValue(mockDispatch);
    (useSelector as unknown as Mock).mockImplementation((selectorFn) => {
      if (selectorFn === getListening) return mockListening;
      if (selectorFn === getIsListening) return true;
      return false;
    });

    vi.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(mockAudioPlay);
    vi.spyOn(window.HTMLMediaElement.prototype, 'pause').mockImplementation(mockAudioPause);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders album and track details correctly', () => {
    render(<AudioPlayer />);

    expect(screen.getByText('Test Album')).toBeInTheDocument();
    expect(screen.getByText('Artist 1')).toBeInTheDocument();
    expect(screen.getByText('Test Track')).toBeInTheDocument();

    const img = screen.getByAltText('Test Album') as HTMLImageElement;
    expect(img.src).toBe('https://example.com/image.jpg');
  });

  it('plays audio when isListening is true', () => {
    render(<AudioPlayer />);
    
    expect(mockAudioPlay).toHaveBeenCalled();
  });

  it('pauses audio when the pause button is clicked', () => {
    render(<AudioPlayer />);

    const pauseButton = screen.getByRole('button');
    fireEvent.click(pauseButton);

    expect(mockDispatch).toHaveBeenCalledWith(setPause());
    expect(mockAudioPause).toHaveBeenCalled();
  });

  it('updates audio progress bar correctly', () => {
    render(<AudioPlayer />);
    
    const progressBar = screen.getByRole('progressbar') as HTMLProgressElement;
    fireEvent.click(progressBar, { nativeEvent: { offsetX: 50 }, currentTarget: { clientWidth: 100 } });

    expect(mockAudioPlay).toHaveBeenCalled();
  });
});
