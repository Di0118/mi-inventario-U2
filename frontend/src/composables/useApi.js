import { ref } from 'vue';
import axios from 'axios';

export function useApi(){
    const data = ref (null);
    const loading = ref(false);
    const error = ref(null);
    

    const request = async (url, options = {}, retry = true) => {
        loading.value = true;
        error.value = null;

        const baseUrl = import.meta.env.VITE_API_URL;

        const urlCompleta = url.startsWith('http') 
        ? url 
    : `${baseUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;

       try {
        console.log("URGENTE: La URL que estoy llamando es:", urlCompleta);
            const response = await axios({
                url: urlCompleta,
                ...options
            });
            data.value = response.data;
        } catch (err) {
            console.error(" [API] Error al conectar a:", urlCompleta, err);
            
            if (retry) {
                console.log(" Fallo, reintentando...");
                return request(url, options, false);
            }
            error.value = "Ocurrió un error al traer los datos";
        } finally {
            loading.value = false;
        } 
    };
    return { data, loading, error, request };
}