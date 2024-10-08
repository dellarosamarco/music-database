import { useSelector } from "react-redux";
import { getAlbums } from "../../store/slices/albumSlice";
import AlbumCard from "../../components/albumCard";

const Homepage = () => {
    const albums = useSelector(getAlbums);

    return (
        albums.map((album) => (
            <AlbumCard album={album} ></AlbumCard>
        ))
    );
}

export default Homepage;