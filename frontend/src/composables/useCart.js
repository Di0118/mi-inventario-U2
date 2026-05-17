import { ref, computed } from 'vue';

const carrito = ref(JSON.parse(localStorage.getItem('mercapp_carrito')) || []);

export function useCart() {

  // guardar en el almacenamiento del navegador
  const guardarEnDisco = () => {
    localStorage.setItem('mercapp_carrito', JSON.stringify(carrito.value));
  };

  // 1. Agregar al carrito 
  const agregarAlCarrito = (producto) => {
    const existe = carrito.value.find(item => item._id === producto._id);

    if (existe) {
      existe.cantidad++;
    } else {
       carrito.value.push({
        _id: producto._id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagenUrl: producto.imagenUrl,
        cantidad: 1
      });
    }
    guardarEnDisco();
    console.log("Producto agregado:", producto.nombre);
  };

  const restarCantidad = (productId) => {
    const existe = carrito.value.find(item => item._id === productId);

    if (existe) {
      if (existe.cantidad > 1) {
        existe.cantidad--;
      } else {
  
        carrito.value = carrito.value.filter(item => item._id !== productId);
      }
      guardarEnDisco();
    }
  };
  // eliminar producto
  const eliminarTotalmente = (productId) => {
    carrito.value = carrito.value.filter(item => item._id !== productId);
    guardarEnDisco();
  };

  // vaciar todo
  const vaciarCarrito = () => {
    carrito.value = [];
    guardarEnDisco();
  };

  // calcular totales
  const totalPagar = computed(() => {
    return carrito.value.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  });

  const cantidadProductos = computed(() => {
    return carrito.value.reduce((sum, item) => sum + item.cantidad, 0);
  });

  return {
    carrito,
    agregarAlCarrito,
    restarCantidad,
    eliminarTotalmente,
    vaciarCarrito,
    totalPagar,
    cantidadProductos
  };
}
