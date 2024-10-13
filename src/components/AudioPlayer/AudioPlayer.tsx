import { useDispatch, useSelector } from 'react-redux';
import './AudioPlayer.css';
import { getIsListening, getListening, setPause, setResume } from '../../store/slices/appSlice';
import { useEffect, useState } from 'react';
import TextComponent from '../Text/Text';
import Button from '../Button/Button';
import { AppDispatch } from '../../store/store';
import PlayIcon from '../../assets/icons/play.svg';
import PauseIcon from '../../assets/icons/pause.svg';

const AudioPlayer = () => {
    const listening = useSelector(getListening);
    const [audioPlayer] = useState<HTMLAudioElement>(new Audio());
    const [currentAudioTime, setCurrentAudioTime] = useState(0);
    const [currentAudioDuration, setCurrentAudioDuration] = useState(0);
    const isListening = useSelector(getIsListening);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if(!listening) return;

        const preview_url = listening.album.tracks.items.filter(track => track.id === listening.trackId)[0].preview_url

        if(!preview_url) return;

        audioPlayer.pause();
        audioPlayer.src = preview_url;
        audioPlayer.load();
        audioPlayer.play();

        const _setCurrentAudioTime = () => { setCurrentAudioTime(audioPlayer.currentTime); }
        const _setCurrentAudioDuration = () => { setCurrentAudioDuration(audioPlayer.duration); }
        const _onAudioEnd = () => { dispatch(setPause()); }

        audioPlayer.addEventListener('timeupdate', _setCurrentAudioTime);
        audioPlayer.addEventListener('loadedmetadata', _setCurrentAudioDuration);
        audioPlayer.addEventListener('ended', _onAudioEnd);

        return () => {
            audioPlayer.removeEventListener('timeupdate', _setCurrentAudioTime);
            audioPlayer.removeEventListener('loadedmetadata', _setCurrentAudioDuration);
            audioPlayer.removeEventListener('ended', _onAudioEnd);
        }
        
    }, [listening]);

    useEffect(() => {
        if(!audioPlayer) return;

        if(isListening) {
            audioPlayer.play();
        } 
        else {
            audioPlayer.pause();
        }
    }, [isListening])

    if(!listening) return null;

    return (
        <div className="audio-player">
            <div className='audio-player__header'>
                <div className="audio-player__info">
                    <img className='audio-player__info-image' src={listening.album.images[0].url} alt={listening.album.name} />
                    <div className="audio-player__info-text">
                        <TextComponent>{listening.album.name}</TextComponent>
                        <TextComponent>{listening.album.artists.map(artist => artist.name).join(', ')}</TextComponent>
                        <TextComponent
                            size="h3"
                        >
                            {listening.album.tracks.items.filter(track => track.id === listening.trackId)[0].name}
                        </TextComponent>
                    </div>
                </div>
                <div className="audio-player__track">
                    <div className='audio-player__track-time'>
                        <TextComponent>{currentAudioTime.toFixed(0).toString()}</TextComponent>
                    </div>
                    <progress
                        className='audio-player__track-progress'
                        value={currentAudioTime}
                        max={currentAudioDuration}
                        onClick={(e) => {
                            const point = e.nativeEvent.offsetX * currentAudioDuration / e.currentTarget.clientWidth;
                            if(isNaN(point)) return;
                            audioPlayer.currentTime = point;
                            audioPlayer.play();
                            if(!isListening) {
                                dispatch(setResume());
                            }
                        }}
                    ></progress>
                    <div className='audio-player__track-time'>
                        <TextComponent>{currentAudioDuration.toFixed(0).toString()}</TextComponent>
                    </div>
                </div>
            </div>
            <div className="audio-player__controls">
                <Button
                    isCircular={true}
                    onClick={() => {
                        if(isListening) {
                            dispatch(setPause());
                        }
                        else {
                            dispatch(setResume());
                        }
                    }}
                ><img src={isListening ? PauseIcon : PlayIcon}></img>
                </Button>
            </div>
        </div>
    );
}

export default AudioPlayer;