export type Album = {
    album_type: string;
    artists: AlbumArtist[];
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: AlbumImage[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
    tracks: {
        items: AlbumTrack[];
    }
}

type AlbumImage = {
    height: number;
    url: string;
    width: number;
}

type AlbumArtist = {
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

type AlbumTrack = {
    id: string;
    name: string;
    uri: string;
    preview_url?: string;
}