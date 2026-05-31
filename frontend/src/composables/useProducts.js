import { useApi } from './useApi';
import { ref } from 'vue';

export function useProducts() {
    const apiProductos = useApi();
    const apiCategorias = useApi();

    const products = apiProductos.data;
    const loading = apiProductos.loading;
    const error = apiProductos.error;
    
   const categories = ref([]);

    const fetchAllProducts = async () => {
        await apiProductos.request('/api/products');
    };

    const fetchOneProduct = async (id) => {
    await apiProductos.request(`/api/products/${id}`);
};

    const fetchCategories = async () => {
        try {
            await apiCategorias.request('/api/categories');
             categories.value = apiCategorias.data.value || [];

        } catch (err) {
            console.error("Error al cargar categorías:", err);
        }
    };
       
    return { products, categories, loading, error, fetchAllProducts, fetchOneProduct, fetchCategories };
}