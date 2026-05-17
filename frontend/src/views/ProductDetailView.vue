<template>
  <div v-if="loading" class="cargando">
    <p> Buscando los detalles del producto... </p>
    </div>

     <div v-else-if="error" class="error-contenedor">
    <p>Hubo un incoveniente al cargar el producto: {{ error }}</p>
    <button class="btn-volver" @click="$router.push('/')">Regresar al catálogo</button>
  </div>
  <div v-else-if="producto" class="detalle-contenedor">
    <img :src="producto.imagenUrl" :alt="producto.nombre">
    
    <div class="info">
      <h1>{{ producto.nombre }}</h1>
      <p class="descripcion-larga">{{ producto.descripcion }}</p>
      
      <div class="detalles-tecnicos">
        <p><strong>Disponibilidad:</strong> {{ producto.stock }} unidades tejidas</p>
        <span class="precio-grande">${{ producto.precio }}</span>
      </div>

      <div class="bloque-botones">
        <button class="btn-agregar" @click="agregarAlCarrito(producto)">
          Añadir al carrito 
        </button>
        <button class="btn-volver" @click="$router.push('/')">
          Volver al catálogo
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'; 

import { useProducts } from '@/composables/useProducts';
import { useCart } from '@/composables/useCart';

const route = useRoute(); 
const producto = ref(null);

const { fetchOneProduct, products, loading, error } = useProducts();
const { agregarAlCarrito } = useCart();

const cargarDatos = async () => {
    const id = route.params.id;
    await fetchOneProduct(id);
    if (products.value) {
    producto.value = products.value;
  }
};

onMounted(cargarDatos);
</script>

<style scoped>
.detalle-contenedor {
  display: flex;
  gap: 50px;
  padding: 40px;
  max-width: 900px;
  margin: 30px auto;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
}

img {
  width: 350px;
  height: 350px;
  object-fit: cover;
  border-radius: 15px;
}

.info {
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h1 { color: #5a3e62; margin-bottom: 20px; }

.descripcion-larga {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 20px;
}

.detalles-tecnicos {
  margin-bottom: 20px;
}

.precio-grande {
  display: block;
  font-size: 2.3rem;
  color: #a46bb5;
  font-weight: bold;
  margin-top: 10px;
}

.bloque-botones {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.btn-agregar {
  background-color: #dcb2e9;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-agregar:hover {
  background-color: #bfa0cc;
}

.btn-volver {
  background-color: #fdf5f5;
  border: 1px solid #dcb2e9;
  color: #5d4037;
  padding: 12px 20px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
}

.cargando, .error-contenedor {
  padding: 60px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #7b4f8a;
}
</style>