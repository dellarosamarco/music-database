import { Album } from "../../../types/album";
import apiClient from "../../apiClient";

export type searchAlbumsParams = {
    type: 'album' | 'artist' | 'playlist' | 'track';
    searchTerm: string;
    limit?: number;
}

export type SearchAlbumsResponse = {
    albums: { items: Album[]};
}

export const searchAlbums = async <T>(params: searchAlbumsParams): Promise<T> => {
    try {
        const response = await apiClient.get<T>(`/search?q=${params.searchTerm}&type=${params.type}&limit=${params.limit}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Error fetching users');
    }
};