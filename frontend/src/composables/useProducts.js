import { useApi } from './useApi';
import {ref} from 'vue'; //para categorias
import axios from 'axios';

export function useProducts() {

    const apiProductos = useApi();
    const apiCategorias = useApi();

    const products = apiProductos.data;
    const loading = apiProductos.loading;
    const error = apiProductos.error;

    const categories = ref([]);

    const fetchAllProducts = async () => {
        await apiProductos.request('http://localhost:3000/api/products');
    };

    const fetchOneProduct = async (id) => {
        await apiProductos.request(`http://localhost:3000/api/products/${id}`);
    };

    const fetchCategories = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/categories');
            categories.value = res.data; 
        } catch (err) {
            console.error("Error al cargar categorías mediante Axios:", err);
        }
    };

    return { products, categories, loading, error, fetchAllProducts, fetchOneProduct, fetchCategories };
}