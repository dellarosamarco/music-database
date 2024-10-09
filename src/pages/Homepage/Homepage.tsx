import { useDispatch, useSelector } from "react-redux";
import { fetchNewReleases, getAlbums, getLoading } from "../../store/slices/albumSlice";
import AlbumCard from "../../components/AlbumCard/AlbumCard";
import './Homepage.css';
import isVisibleY from "../../utils/isVisible";
import { useEffect, useRef } from "react";
import { AppDispatch } from "../../store/store";

const Homepage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const albums = useSelector(getAlbums);
    const loading = useSelector(getLoading);
    const albumRefs = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        dispatch(fetchNewReleases());
    }, [dispatch]);

    const checkVisibility = () => {
        if(loading) return;
        
        if(window.scrollY >= document.body.scrollHeight - document.body.offsetHeight - 25) {
            if(isVisibleY(albumRefs.current[albumRefs.current.length - 1])) {
                dispatch(fetchNewReleases());
            }
        }
    }

    useEffect(() => {    
        window.addEventListener('scroll', checkVisibility);
    
        return () => {
          window.removeEventListener('scroll', checkVisibility);
        };
    });

    return (
        <div className="homepage" onScroll={() => checkVisibility()}>
            <button onClick={checkVisibility}>x</button>
            {
                albums.map((album, index) => (
                    <AlbumCard 
                        album={album} 
                        key={album.id}
                        ref={(ref: HTMLDivElement) => albumRefs.current[index] = ref}
                    ></AlbumCard>
                ))
            }
        </div>
    );
}

export default Homepage;