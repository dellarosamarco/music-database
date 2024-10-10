import { Album } from "../../../types/album";
import apiClient from "../../apiClient";

export type getAlbumParams = {
    id: string;
}

export const getAlbum = async (params: getAlbumParams): Promise<Album> => {
    try {
        const response = await apiClient.get<Album>(`/albums/${params.id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Error fetching users');
    }
};