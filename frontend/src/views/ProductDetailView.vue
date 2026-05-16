<template>
  <div v-if="producto" class="detalle-contenedor">
    <img :src="'http://localhost:3000' + producto.imagenUrl" :alt="producto.nombre">
    
    <div class="info">
      <h1>{{producto.nombre }}</h1>
      <p class="descripcion-larga">{{ producto.descripcion }}</p>
      <div class="detalles-tecnicos">
        <p><strong>Stock disponible:</strong> {{ producto.stock }} unidades</p>
        <span class="precio-grande">${{ producto.precio }}</span>
      </div>
      <button class="btn-volver" @click="$router.push('/')">Volver al catálogo</button>
    </div>
  </div>
  
  <div v-else class="cargando">
    <p>Buscando los detalles del amigurumi... </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'; 
import axios from 'axios';

const route = useRoute(); 
const producto = ref(null);

const cargarDetalle = async () => {
  try {
    const id = route.params.id;
    const respuesta = await axios.get(`http://localhost:3000/api/productos/${id}`);
    producto.value = respuesta.data;
  } catch (error) {
    console.error("No pudimos traer el detalle:", error);
  }
};

onMounted(cargarDetalle);
</script>

<style scoped>
.detalle-contenedor {
  display: flex;
  gap: 50px;
  padding: 40px;
  max-width: 1000px;
  margin: 50px auto;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
}

img {
  width: 400px;
  height: 400px;
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

.precio-grande {
  display: block;
  font-size: 2.5rem;
  color: #dcb2e9;
  font-weight: bold;
  margin-top: 10px;
}

.btn-volver {
  margin-top: 30px;
  background-color: #f3e5f5;
  border: 1px solid #dcb2e9;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
}
</style>