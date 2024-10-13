import { forwardRef } from "react";
import { Album } from "../../types/album";
import './AlbumCard.css';
import TextComponent from "../Text/Text";

type AlbumProps = {
    album: Album;
    ref?: React.Ref<HTMLDivElement>;
    onClick: () => void;
}

const AlbumCard = forwardRef<HTMLDivElement, AlbumProps>((
    { 
        album,
        onClick
    }, 
    ref
) => {
    return (
        <div className="album-card" ref={ref} onClick={onClick} role="button">
            {album.images.length > 0 && <img className="album-card__image" src={album.images[0].url} alt={album.name} />}
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
});

export default AlbumCard;