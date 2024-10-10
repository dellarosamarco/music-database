import { Album } from "../../../types/album";
import apiClient from "../../apiClient";

const defaultLimit = 50;

type getNewAlbumReleasesResponse = {
    albums: {
        items: Album[];
    }
}

export type getNewAlbumReleasesParams = {
    page?: number;
}

export const getNewAlbumReleases = async (params: getNewAlbumReleasesParams): Promise<getNewAlbumReleasesResponse> => {
    try {
        const offset = params.page ? params.page * defaultLimit : 0;
        const response = await apiClient.get<getNewAlbumReleasesResponse>(`/browse/new-releases?limit=${defaultLimit}&offset=${offset}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Error fetching users');
    }
};