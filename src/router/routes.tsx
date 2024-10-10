import { RouteObject } from "react-router-dom";
import Homepage from "../pages/Homepage/Homepage";
import AlbumDetail from "../pages/AlbumDetail/AlbumDetail";

export const ALBUM_DETAIL_PATH = (id: string) => `/album/${id}`;

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <Homepage></Homepage>
    },
    {
        path: "/album/:id",
        element: <AlbumDetail></AlbumDetail>,
    }
]