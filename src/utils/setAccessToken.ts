import { requestAccessToken } from "../api/request_access_token";

/*
    Il token andrebbe salvato in un cookie dal backend, ma in questo caso il backend non c'è,
    quindi lo salvo nel localStorage (anche se non è una pratica sicura) per poi riprenderlo all'interno dell'interceptor
    e aggiungerlo manualmente come header ad ogni richiesta
*/
const setAccessToken = async (): Promise<void> => {
    try {
        const response = await requestAccessToken();
        localStorage.setItem('access_token', response.access_token);
    } 
    catch (error) {
        console.log(error);
    }
};

export default setAccessToken;