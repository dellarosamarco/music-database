import { Album } from "../../../types/album";
import apiClient from "../../apiClient";

type getNewAlbumReleasesResponse = {
    albums: {
        items: Album[];
    }
}

export const getNewAlbumReleases = async (): Promise<getNewAlbumReleasesResponse> => {
    try {
        const response = await apiClient.get<getNewAlbumReleasesResponse>('/browse/new-releases');
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Error fetching users');
    }
};