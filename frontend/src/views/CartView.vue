<template>
  <div class="carrito-page">
    <h2>Tu Carrito de Compras </h2>

    <div v-if="carrito.length === 0" class="carrito-vacio">
      <p>Aún no se ha añadido ningún amigurumi a tu colección.</p>
      <router-link to="/" class="btn-volver">Ir al Catálogo</router-link>
    </div>

    <div v-else class="carrito-contenido">
      <table class="tabla-carrito">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in carrito" :key="item._id">
            <td class="info-producto">
              <img :src="item.imagenUrl" :alt="item.nombre" class="img-mini" />
              <span>{{ item.nombre }}</span>
            </td>
            <td>${{ item.precio }}</td>
            <td class="controles-cantidad">
              <button @click="restarCantidad(item._id)" class="btn-cant">-</button>
              <span class="cantidad">{{ item.cantidad }}</span>
              <button @click="agregarAlCarrito(item)" class="btn-cant">+</button>
            </td>
            <td class="subtotal">${{ item.precio * item.cantidad }}</td>
            <td>
              <button @click="eliminarTotalmente(item._id)" class="btn-eliminar">❌</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="resumen-carrito">
        <p>Total de productos: <strong>{{ cantidadProductos }} unidades</strong></p>
        <h3>Total a Pagar: <span class="precio-total">${{ totalPagar }}</span></h3>
        <button @click="procederPago" class="btn-pagar">Proceder al Pago ᯓ★ </button>
      </div>
    </div>
  </div>
</template>

<script setup>

import { useCart } from '../composables/useCart';

const { 
  carrito, 
  agregarAlCarrito, 
  restarCantidad, 
  eliminarTotalmente, 
  vaciarCarrito, 
  totalPagar, 
  cantidadProductos 
} = useCart();

const procederPago = () => {
  alert(`¡Gracias por tu compra! Tu total es de $${totalPagar.value}. Requerimiento de carrito completado.`);
  vaciarCarrito(); 
};

</script>


<style scoped>
.carrito-page {
  padding: 40px;
  max-width: 900px;
  margin: 0 auto;
  color: #333;
}
.carrito-vacio {
  text-align: center;
  margin-top: 40px;
}
.btn-volver {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #dcb2e9;
  color: white;
  border-radius: 20px;
  text-decoration: none;
  font-weight: bold;
}
.tabla-carrito {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}
th, td {
  padding: 15px;
  text-align: center;
  border-bottom: 1px solid #f2f2f2;
}
th {
  background-color: #fcf6ff;
  color: #7b4f8a;
}
.info-producto {
  display: flex;
  align-items: center;
  gap: 15px;
  text-align: left;
}
.img-mini {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
}
.controles-cantidad {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.btn-cant {
  background: #f0f0f0;
  border: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  cursor: pointer;
  font-weight: bold;
}
.btn-cant:hover {
  background: #dcb2e9;
  color: white;
}
.btn-eliminar {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
}
.resumen-carrito {
  margin-top: 30px;
  text-align: right;
  background: #fcf6ff;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #e8d0f5;
}
.precio-total {
  color: #a46bb5;
  font-size: 1.8rem;
  font-weight: bold;
}
.btn-pagar {
  margin-top: 15px;
  padding: 12px 30px;
  background-color: #a46bb5;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
}
.btn-pagar:hover {
  background-color: #895399;
}
</style>