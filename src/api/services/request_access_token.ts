import apiClient from "../apiClient";

type RequestAccessTokenResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export const requestAccessToken = async (): Promise<RequestAccessTokenResponse> => {
    try {
        const response = await apiClient.post<RequestAccessTokenResponse>(
            'https://accounts.spotify.com/api/token',
            {
                grant_type: 'client_credentials',
                client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
                client_secret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
            },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }

        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Error fetching users');
    }
};