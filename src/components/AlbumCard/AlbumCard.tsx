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
            <img className="album-card__image" src={album.images[0].url} alt={album.name} />
            <div className="album-card__title">
                <TextComponent 
                    fontWeight="bold"
                    overflow="ellipsis"
                >
                    {album.name}
                </TextComponent>
            </div>
            <TextComponent 
                fontWeight="bold"
                overflow="ellipsis"
                color="ghost"
            >
                {album.artists.map(artist => artist.name).join(', ')}
            </TextComponent>
        </div>
    );
}

export default AlbumCard;