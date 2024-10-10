import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAlbum } from "../../api/services/album/get_album";
import { Album } from "../../types/album";
import './AlbumDetail.css';
import TextComponent from "../../components/Text/Text";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { setListening } from "../../store/slices/appSlice";

const AlbumDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [album, setAlbum] = useState<Album | undefined>(undefined);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if(!id) {
            navigate('/');
            return;
        }

        const fetchAlbum = async () => {
            try {
                const album = await getAlbum({ id });
                setAlbum(album);
            } catch (error) {
                console.log(error);
            }
        }

        fetchAlbum();
    }, [id, navigate]);
        
    return (
        <div className="album">
            <div className="album__header">
                <img className="album__header-cover" src={album?.images[0].url} alt={album?.name} />
                <div className="album__header-info">
                    <TextComponent size='h1'>{album?.name}</TextComponent>
                    <TextComponent>{album?.artists.map(artist => artist.name).join(', ')}</TextComponent>
                    <TextComponent>{album?.release_date}</TextComponent>
                </div>
            </div>
            <div className="album__tracks">
                {album?.tracks.items.map((track, index) => (
                    <div key={track.id} className="album__track">
                        <div className="album__track-title">
                            <TextComponent>{(index+1).toString()}</TextComponent>
                            <TextComponent>{track.name}</TextComponent>
                        </div>
                        <div className="album__track-actions">
                            <button onClick={() => {
                                dispatch(setListening({ trackId: track.id, album: album }));
                            }}>Play</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AlbumDetail;