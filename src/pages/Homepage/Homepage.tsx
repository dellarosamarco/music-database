import { useDispatch, useSelector } from "react-redux";
import { fetchNewReleases, getAlbums, getLoading } from "../../store/slices/albumSlice";
import AlbumCard from "../../components/AlbumCard/AlbumCard";
import './Homepage.css';
import isVisibleY from "../../utils/isVisible";
import { useEffect, useRef, useState } from "react";
import { AppDispatch } from "../../store/store";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";
import { ALBUM_DETAIL_PATH } from "../../router/routes";

const Homepage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const albums = useSelector(getAlbums);
    const loading = useSelector(getLoading);
    const albumRefs = useRef<HTMLDivElement[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchNewReleases({page: currentPage}));
    }, [currentPage, dispatch]);

    const checkVisibility = () => {
        if(loading) return;

        if(window.scrollY >= document.body.scrollHeight - document.body.offsetHeight - 25) {
            if(isVisibleY(albumRefs.current[albumRefs.current.length - 1])) {
                setCurrentPage(currentPage + 1);
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
            <div className="homepage__header">
                <div className="homepage__header-search-bar">
                    <SearchBar
                        results={
                            albums.map(album => ({
                                name: album.name,
                                description: album.artists.map(artist => artist.name).join(', '),
                                image: album.images[0].url
                            }))
                        }
                    ></SearchBar>
                </div>
            </div>
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
        </div>
    );
}

export default Homepage;