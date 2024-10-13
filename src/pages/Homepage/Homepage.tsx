import { useDispatch, useSelector } from "react-redux";
import { fetchNewReleases, getAlbums, getCurrentPage, getHasMoreAlbum, getLoading } from "../../store/slices/albumSlice";
import AlbumCard from "../../components/AlbumCard/AlbumCard";
import './Homepage.css';
import isVisibleY from "../../utils/isVisible";
import { useEffect, useRef } from "react";
import { AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { ALBUM_DETAIL_PATH } from "../../router/routes";
import Loader from "../../components/Loader/Loader";

const Homepage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const albums = useSelector(getAlbums);
    const loading = useSelector(getLoading);
    const albumRefs = useRef<HTMLDivElement[]>([]);
    const currentPage = useSelector(getCurrentPage);
    const navigate = useNavigate();
    const hasMoreAlbum = useSelector(getHasMoreAlbum);

    useEffect(() => {
        if(hasMoreAlbum) dispatch(fetchNewReleases({page: currentPage}));
    }, []);

    const checkVisibility = () => {
        if(loading) return;

        if(window.scrollY >= document.body.scrollHeight - document.body.offsetHeight - 25) {
            if(isVisibleY(albumRefs.current[albumRefs.current.length - 1])) {
                if(hasMoreAlbum) dispatch(fetchNewReleases({page: currentPage}));
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
            <div className="homepage__albums">
                {
                    albums.map((album, index) => (
                        <AlbumCard 
                            album={album} 
                            key={album.id}
                            ref={(ref: HTMLDivElement) => albumRefs.current[index] = ref}
                            onClick={() => {
                                navigate(ALBUM_DETAIL_PATH(album.id));
                            }}
                        ></AlbumCard>
                    ))
                }
            </div>
            {
                loading && <div className="homepage__loader"><Loader size="lg"></Loader></div>
            }
        </div>
    );
}

export default Homepage;