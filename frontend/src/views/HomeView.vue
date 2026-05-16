<template>
  <div class="home">
    <h2> Nuestro Catálogo 🗒ˎˊ˗ </h2>
    <p> Aquí verás mis creaciones ¡Bienvenida al catálogo de crochet!</p>

    <div class="filtros">
      <input
        v-model="busqueda"
        type="text" 
        placeholder="Buscar producto (ej: girasol)..."
      />

      <select v-model="categoriaSeleccionada" class="selector-categoria">
        <option value="">Todas las categorías </option>
        <option 
          v-for="cat in categories" 
          :key="cat._id" 
          :value="cat._id"
        >
          {{ cat.nombre }} </option>
      </select>
    </div>

<p v-if="loading" class="mensaje">Cargando tus amigurumis... </p>
<p v-if="error" class="error">{{ error }}</p>

<div v-if="!loading && !error" class="contenedor-productos">
  <ProductCard
    v-for="amigurumi in listaFiltrada"
    :key="amigurumi._id" 
    :product="amigurumi"
    @added-to-cart="gestionarCarrito"
  />
</div>
</div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import { useProducts } from '../composables/useProducts';

const { products, categories, loading, error, fetchAllProducts, fetchCategories } = useProducts();
const busqueda = ref('');
const categoriaSeleccionada = ref('');

const gestionarCarrito= (producto) => {
console.log("Evento recibido para:", producto.nombre);
};

// 1. Obtener productos del Backend
const listaFiltrada = computed(() => {
  if (!products.value) return [];

  return products.value.filter(amigurumi => {
    const coincideTexto = amigurumi.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
                          amigurumi.descripcion.toLowerCase().includes(busqueda.value.toLowerCase());

    const coincideCategoria = !categoriaSeleccionada.value || 
      (amigurumi.categoriaId && amigurumi.categoriaId._id.toString() === categoriaSeleccionada.value.toString());

    return coincideTexto && coincideCategoria;
  }); 
});

onMounted(async () => {
  await fetchAllProducts();
  await fetchCategories();
});
</script>

<style scoped>

.contenedor-productos {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
}
.selector-categoria {
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #dcb2e9;
  margin-bottom: 20px;
  margin-left: 10px;
  background-color: white;
  color: #333;
  cursor: pointer;
  }
.tarjeta {
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  width: 250px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
.tarjeta img {
  width: 100%;
  height: 200px;
  display: block;
  object-fit: cover;
  border-radius: 5px;
}
.precio {
  display: block;
  font-weight: bold;
  color: #dcb2e9;
  font-size: 1.2rem;
  margin: 10px 0;
}
input {
  padding: 10px;
  width: 300px;
  border-radius: 20px;
  border: 1px solid #dcb2e9;
  margin-bottom: 20px;
}
</style>