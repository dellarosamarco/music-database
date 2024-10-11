import { Outlet } from "react-router-dom";
import AudioPlayer from "../components/AudioPlayer/AudioPlayer";
import Header from "../components/Header/Header";

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <AudioPlayer />
        </>
    );
}

export default Layout;