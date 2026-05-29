
<template>
  <div class="tarjeta">
    <img :src="product.imagenUrl" :alt="product.nombre">

    <router-link :to="'/product/' + product._id" class="link-detalle">
        <h3>{{ product.nombre }}</h3>
    </router-link>

    <p>{{ product.descripcion }}</p>
    <span class="precio">${{ product.precio }}</span>
    
    <button @click="avisarCarrito">Añadir al carrito</button>
    <button @click="$emit('editar-producto', product)" class="btn-editar">
   Editar
</button>

   <button @click="eliminarProducto(product._id)" class="btn-eliminar">
  Eliminar
</button>



  </div>
</template>

<script setup>
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const eliminarProducto = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/products/${id}`);
    alert("Producto eliminado correctamente");

    emit('producto-eliminado'); // avisar al padre

  } catch (error) {
    console.error(error);
    alert("Error al eliminar producto");
  }
};

const props = defineProps({
  product: Object 
});


const emit = defineEmits(['added-to-cart', 'producto-eliminado']);

const avisarCarrito = () => {
 
  emit('added-to-cart', props.product);
  alert('¡Añadido al carrito: ' + props.product.nombre + '!');
};
</script>

<style scoped>
.tarjeta {
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  width: 250px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  text-align: center;
}
.tarjeta img {
  width: 100%;
  height: 200px;
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
button {
  background-color: #dcb2e9;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.link-detalle {
  text-decoration: none; 
  color: #333;           
  transition: color 0.3s;
}

.link-detalle:hover {
  color: #dcb2e9;        
}
</style>