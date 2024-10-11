import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAlbum } from "../../api/services/album/get_album";
import { Album } from "../../types/album";
import './AlbumDetail.css';
import TextComponent from "../../components/Text/Text";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getIsListening, getListening, setListening, setPause, setResume } from "../../store/slices/appSlice";
import Button from "../../components/Button/Button";
import PlayIcon from '../../assets/icons/play.svg';
import PauseIcon from '../../assets/icons/pause.svg';

const AlbumDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [album, setAlbum] = useState<Album | undefined>(undefined);
    const dispatch = useDispatch<AppDispatch>();
    const listening = useSelector(getListening);
    const isListening = useSelector(getIsListening);

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
                    <div>
                        <TextComponent size='h1'>{album?.name}</TextComponent>
                        <TextComponent size='h3' color="ghost">{album?.artists.map(artist => artist.name).join(', ')}</TextComponent>
                    </div>
                    {/* <TextComponent color="ghost">{album?.release_date}</TextComponent> */}
                    <div>
                        <Button
                            onClick={() => {
                                if(!album) return;
                                const track = album.tracks.items[0];
                                dispatch(setListening({ trackId:track.id, album: album }));
                            }}
                        >
                            <TextComponent size="h4" fontWeight="bold" color="black">Play</TextComponent>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="album__tracks">
                {album?.tracks.items.map((track, index) => (
                    <div key={track.id} className="album__track">
                        <div className="album__track-title">
                            <TextComponent overflow="ellipsis">{(index+1).toString()}</TextComponent>
                            <TextComponent overflow="ellipsis">{track.name}</TextComponent>
                        </div>
                        <div className="album__track-actions">
                            { track.preview_url ? <Button 
                                isCircular={true}
                                onClick={() => {
                                    if(isListening && listening?.trackId === track.id) {
                                        dispatch(setPause());
                                    }
                                    else if(!isListening && listening?.trackId === track.id) {
                                        dispatch(setResume());
                                    }
                                    else {
                                        dispatch(setListening({ trackId: track.id, album: album }));
                                    }
                                }}
                            >
                                <img src={listening?.trackId === track.id ? (isListening ? PauseIcon : PlayIcon) : PlayIcon}></img>
                            </Button> : <TextComponent overflow="ellipsis" color="ghost">No preview available</TextComponent>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AlbumDetail;