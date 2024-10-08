import { useSelector } from "react-redux";
import { getAlbums } from "../../store/slices/albumSlice";
import AlbumCard from "../../components/AlbumCard/AlbumCard";
import './Homepage.css';

const Homepage = () => {
    const albums = useSelector(getAlbums);

    return (
        <div className="homepage">
            {
                albums.map((album) => (
                    <AlbumCard album={album} ></AlbumCard>
                ))
            }
        </div>
    );
}

export default Homepage;