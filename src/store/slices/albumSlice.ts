import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Album } from '../../types/album';

interface AlbumState {
  albums: Album[];
}

const initialState: AlbumState = {
    albums: [
        {
            "album_type": "album",
            "artists": [
                {
                    "href": "https://api.spotify.com/v1/artists/6vWDO969PvNqNYHIOW5v0m",
                    "id": "6vWDO969PvNqNYHIOW5v0m",
                    "name": "Beyoncé",
                    "type": "artist",
                    "uri": "spotify:artist:6vWDO969PvNqNYHIOW5v0m"
                }
            ],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/6BzxX6zkDsYKFJ04ziU5xQ"
            },
            "href": "https://api.spotify.com/v1/albums/6BzxX6zkDsYKFJ04ziU5xQ",
            "id": "6BzxX6zkDsYKFJ04ziU5xQ",
            "images": [
                {
                    "height": 300,
                    "url": "https://i.scdn.co/image/ab67616d00001e021572698fff8a1db257a53599",
                    "width": 300
                },
                {
                    "height": 64,
                    "url": "https://i.scdn.co/image/ab67616d000048511572698fff8a1db257a53599",
                    "width": 64
                },
                {
                    "height": 640,
                    "url": "https://i.scdn.co/image/ab67616d0000b2731572698fff8a1db257a53599",
                    "width": 640
                }
            ],
            "name": "COWBOY CARTER",
            "release_date": "2024-03-29",
            "release_date_precision": "day",
            "total_tracks": 27,
            "type": "album",
            "uri": "spotify:album:6BzxX6zkDsYKFJ04ziU5xQ"
        },
    ],
};

const albumSlice = createSlice({
  name: 'albumSlice',
  initialState,
  reducers: {
    setAlbums: (state, action: PayloadAction<Album[]>) => {
        state.albums = action.payload;
    },
  },
  selectors: {
    getAlbums: (state) => state.albums,
  }
});

export const { setAlbums } = albumSlice.actions;
export const albumSliceReducer = albumSlice.reducer;
export const { getAlbums } = albumSlice.selectors;
