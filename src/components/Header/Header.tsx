import SearchBar from '../SearchBar/SearchBar';
import './Header.css';
import HomeIcon from './../../assets/icons/home.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Album } from '../../types/album';
import { searchAlbums, SearchAlbumsResponse } from '../../api/services/album/search_albums';

const Header = () => {
    const navigate = useNavigate();
    const [searchBarResults, setSearchBarResults] = useState<Album[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const onSearch = (searchTerm: string) => {
        if(searchTerm === '') {
            setSearchBarResults([]);
            return;
        }

        const fetchAlbums = async () => {
            try {
                const response = await searchAlbums<SearchAlbumsResponse>({ searchTerm: searchTerm, type: 'album', limit: 5 });
                setSearchBarResults(response.albums.items);
                setIsLoading(false);
            }
            catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        }

        setIsLoading(true);
        fetchAlbums();
    }
    
    return (
        <div className="header">
            <div className='header-search-bar__home' onClick={() => navigate("/")}>
                <img src={HomeIcon} alt='Home' />
            </div>
            <div className="header-search-bar">
                <SearchBar
                    placeholder='Search for albums'
                    onSearch={onSearch}
                    isLoading={isLoading}
                    results={
                        searchBarResults.map(album => ({
                            name: album.name,
                            description: album.artists.map(artist => artist.name).join(', '),
                            image: album.images[0].url,
                            onClick: () => navigate(`/album/${album.id}`)
                        }))
                    }
                ></SearchBar>
            </div>
        </div>
    );
}

export default Header;