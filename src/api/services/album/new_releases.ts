import { Album } from "../../../types/album";
import apiClient from "../../apiClient";

const defaultLimit = 50;
const maxLimit = 50;

type getNewAlbumReleasesResponse = {
    albums: {
        items: Album[];
    }
}

export const getNewAlbumReleases = async (limit?: number): Promise<getNewAlbumReleasesResponse> => {
    try {
        const _limit = limit && limit <= maxLimit ? limit : defaultLimit;
        const response = await apiClient.get<getNewAlbumReleasesResponse>(`/browse/new-releases?limit=${_limit}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Error fetching users');
    }
};