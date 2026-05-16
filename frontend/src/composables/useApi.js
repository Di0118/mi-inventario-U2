import { ref } from 'vue';
import axios from 'axios';

export function useApi(){
    const data = ref (null);
    const loading = ref(false);
    const error = ref(null);

    const request = async (url, options = {}, retry = true) => {
        loading.value = true;
        error.value = null;

        try{
            const response = await axios (url, options);
            data.value = response.data;
        } catch (err) {

            if (retry) {
                console.log("Fallo, reintentando...");
                return request(url, options, false);
            }
            error.value = "Ocurrió un error al traer los datos";
            console.error(err);
        } finally {
            loading.value = false;
        } 
    };
    return {data, loading, error, request };
}
