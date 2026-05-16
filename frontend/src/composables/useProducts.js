import { useApi } from './useApi';
import {ref} from 'vue'; //para categorias

export function useProducts() {

    const apiProductos = useApi();
    const apiCategorias = useApi();

    const products = apiProductos.data;
    const loading = apiProductos.loading;
    const error = apiProductos.error;

    const categories = ref([]);

    const fetchAllProducts = async () => {
        await apiProductos.request('http://localhost:3000/api/productos');
    };

    const fetchOneProduct = async (id) => {
        await apiProductos.request(`http://localhost:3000/api/productos/${id}`);
    };

    const fetchCategories = async () => {
        await apiCategorias.request('http://localhost:3000/api/categorias'); // <--- Cambiado a categorias
        if (apiCategorias.data.value) {
            categories.value = apiCategorias.data.value;
        }
    };

    return { products, categories, loading, error, fetchAllProducts, fetchOneProduct, fetchCategories };
}