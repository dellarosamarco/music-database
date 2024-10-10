import { useParams } from "react-router-dom";

const AlbumDetail = () => {
    const { id } = useParams();
        
    return (
        <p>Album Detail {id}</p>
    );
}

export default AlbumDetail;