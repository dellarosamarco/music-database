import { Outlet } from "react-router-dom";
import AudioPlayer from "../components/AudioPlayer/AudioPlayer";

const Layout = () => {
    return (
        <>
            <Outlet />
            <AudioPlayer />
        </>
    );
}

export default Layout;