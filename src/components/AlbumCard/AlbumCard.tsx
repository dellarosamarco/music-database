import { Album } from "../../types/album";
import TextComponent from "../Text/Text";
import './AlbumCard.css';

type AlbumProps = {
    album: Album;
}

const AlbumCard = ({
    album
}: AlbumProps) => {
    return (
        <div className="album-card">
            <img src={album.images[0].url} alt={album.name} />
            <h1>{album.name}</h1>
            <TextComponent>{album.release_date}</TextComponent>
        </div>
    );
}

export default AlbumCard;