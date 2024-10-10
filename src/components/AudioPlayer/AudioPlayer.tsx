import { useSelector } from 'react-redux';
import './AudioPlayer.css';
import { getListening } from '../../store/slices/appSlice';
import { useEffect, useState } from 'react';
import TextComponent from '../Text/Text';

const AudioPlayer = () => {
    const listening = useSelector(getListening);
    const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | undefined>(undefined);
    const [currentAudioTime, setCurrentAudioTime] = useState(0);
    const [currentAudioDuration, setCurrentAudioDuration] = useState(0);

    useEffect(() => {
        if(!listening) return;

        if(audioPlayer) audioPlayer.pause();

        const track = listening.album.tracks.items.filter(track => track.id === listening.trackId)[0];
        const audio = new Audio(track.preview_url);
        audio.play();
        setAudioPlayer(audio);

        const _setCurrentAudioTime = () => { setCurrentAudioTime(audio.currentTime); }
        const _setCurrentAudioDuration = () => { setCurrentAudioDuration(audio.duration); }

        audio.addEventListener('timeupdate', _setCurrentAudioTime);
        audio.addEventListener('loadedmetadata', _setCurrentAudioDuration);

        return () => {
            audio.removeEventListener('timeupdate', _setCurrentAudioTime);
            audio.removeEventListener('loadedmetadata', _setCurrentAudioDuration);
        }
        
    }, [listening]);

    if(!listening) return null;

    return (
        <div className="audio-player">
            <div className="audio-player__info">
                <img className='audio-player__info-image' src={listening.album.images[0].url} alt={listening.album.name} />
                <div className="audio-player__info-text">
                    <TextComponent>{listening.album.name}</TextComponent>
                    <TextComponent>{listening.album.artists.map(artist => artist.name).join(', ')}</TextComponent>
                </div>
            </div>
            <div className="audio-player__track">
                <progress 
                    value={currentAudioTime}
                    max={currentAudioDuration}
                    onClick={(e) => {
                        if(!audioPlayer) return;
                        audioPlayer.currentTime = e.nativeEvent.offsetX * currentAudioDuration / e.currentTarget.clientWidth;
                    }}
                ></progress>
            </div>
            <div className="audio-player__controls">
                <button onClick={() => audioPlayer?.play()}>Play</button>
            </div>
        </div>
    );
}

export default AudioPlayer;