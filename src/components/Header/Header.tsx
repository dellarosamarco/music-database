import { useSelector } from 'react-redux';
import SearchBar from '../SearchBar/SearchBar';
import './Header.css';
import { getAlbums } from '../../store/slices/albumSlice';
import HomeIcon from './../../assets/icons/home.svg';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const albums = useSelector(getAlbums);
    const navigate = useNavigate();
    
    return (
        <div className="header">
            <div className='header-search-bar__home' onClick={() => navigate("/")}>
                <img src={HomeIcon} alt='Home' />
            </div>
            <div className="header-search-bar">
                <SearchBar
                    placeholder='Search for albums'
                    results={
                        albums.map(album => ({
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