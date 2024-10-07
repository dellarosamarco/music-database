/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from "../../apiClient";

export const getNewAlbumReleases = async () => {
    try {
        const response = await apiClient.get<any>('/browse/new-releases');
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Error fetching users');
    }
};