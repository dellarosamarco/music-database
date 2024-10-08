import { Album } from "../types/album";

type AlbumProps = {
    album: Album;
}

const AlbumCard = ({
    album
}: AlbumProps) => {
    return (
        <div>
            <h1>{album.name}</h1>
            <p>{album.release_date}</p>
            <img src={album.images[0].url} alt={album.name} />
        </div>
    );
}

export default AlbumCard;