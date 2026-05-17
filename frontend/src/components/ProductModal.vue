<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal-contenedor">
      <h2> Registrar Nuevo Amigurumi</h2>
      
      <form @submit.prevent="guardarAmigurumi" class="formulario-alta">
        
        <div class="grupo-campo">
          <label>Nombre del Producto:</label>
          <input type="text" v-model="nuevoProd.nombre" placeholder="Ej: Llavero Capibara" />
          <p v-if="errores.nombre" class="alerta-error">{{ errores.nombre }}</p>
        </div>

        <div class="grupo-campo">
  <label>Descripción del Amigurumi:</label>
  <textarea v-model="nuevoProd.descripcion" placeholder="..." rows="3"></textarea>
  <p v-if="errores.descripcion" class="alerta-error">{{ errores.descripcion }}</p>
</div>

        <div class="grupo-campo">
          <label>Precio ($):</label>
          <input type="number" step="0.01" v-model.number="nuevoProd.precio" placeholder="0.00" />
          <p v-if="errores.precio" class="alerta-error">{{ errores.precio }}</p>
        </div>

        <div class="grupo-campo">
          <label>Categoría del Tejido:</label>
          <select v-model="nuevoProd.categoria">
            <option value="">-- Selecciona una categoría --</option>
            <option v-for="cat in categories" :key="cat._id" :value="cat._id">
              {{ cat.nombre }}
            </option>
          </select>
          <p v-if="errores.categoria" class="alerta-error">{{ errores.categoria }}</p>
        </div>

        <div class="grupo-campo">
          <label>Cantidad en Stock:</label>
          <input type="number" v-model.number="nuevoProd.stock" placeholder="Ej: 3" />
          <p v-if="errores.stock" class="alerta-error">{{ errores.stock }}</p>
        </div>

        <div class="grupo-campo">
          <label>URL de la Imagen:</label>
          <input type="text" v-model="nuevoProd.imageUrl" placeholder="http://localhost:3000/uploads/..." />
          <p v-if="errores.imageUrl" class="alerta-error">{{ errores.imageUrl }}</p>
        </div>

        <div class="botones-modal">
          <button type="submit" class="btn-guardar">Guardar Producto </button>
          <button type="button" class="btn-cancelar" @click="cerrarYLimpiar">Cancelar</button>
        </div>

      </form>
    </div>
  </div>
</template>

 <script setup>
import { ref, watch } from 'vue';
import axios from 'axios';

const props = defineProps({
  isOpen: Boolean,
  categories: Array,
  productoDatos: Object
});

const emit = defineEmits(['close', 'producto-guardado']);

const nuevoProd = ref({
  nombre: '',
  descripcion: '',
  precio: 0,
  categoria: '',
  stock: 0,
  imageUrl: ''
});

const errores = ref({
  nombre: '',
  descripcion: '',
  precio: '',
  categoria: '',
  stock: '',
  imageUrl: ''
});

watch(() => props.productoDatos, (nuevoValor) => {
  if (nuevoValor) {
    nuevoProd.value = {
      _id: nuevoValor._id, 
      nombre: nuevoValor.nombre,
      descripcion: nuevoValor.descripcion || '',
      precio: nuevoValor.precio,
      categoria: nuevoValor.categoriaId?._id || nuevoValor.categoriaId || '', 
      stock: nuevoValor.stock,
      imageUrl: nuevoValor.imagenUrl
    };
  } else {
    nuevoProd.value = { nombre: '', descripcion: '', precio: 0, categoria: '', stock: 0, imageUrl: '' };
  }
}, { immediate: true });

const validarFormulario = () => {
  let esValido = true;
errores.value = { nombre: '', descripcion: '', precio: '', categoria: '', stock: '', imageUrl: '' };

if (!nuevoProd.value.descripcion.trim()) {
  errores.value.descripcion = 'La descripción es obligatoria';
  esValido = false;
}

  if (isNaN(nuevoProd.value.precio) || nuevoProd.value.precio <= 0) {
    errores.value.precio = 'El precio debe ser un número mayor a cero';
    esValido = false;
  }

  if (!nuevoProd.value.categoria) {
    errores.value.categoria = 'Se debe selccionar una categoria';
    esValido = false;
  }

  if (isNaN(nuevoProd.value.stock) || nuevoProd.value.stock <= 0) {
    errores.value.stock = 'El stock disponible debe ser mayor a cero';
    esValido = false;
  }

  if (!nuevoProd.value.imageUrl.trim() || !nuevoProd.value.imageUrl.startsWith('http')) {
    errores.value.imageUrl = 'Se debe ingresar una URL válida (que empiece con http)';
    esValido = false;
  }

  return esValido;
};

const guardarAmigurumi = async () => {
  if (!validarFormulario()) return; 
  try {
    const objetoEnvio = {
      nombre: nuevoProd.value.nombre,
      descripcion: nuevoProd.value.descripcion,
      precio: nuevoProd.value.precio,
      stock: nuevoProd.value.stock,
      imagenUrl: nuevoProd.value.imageUrl, 
      categoriaId: nuevoProd.value.categoria 
    };

    if (nuevoProd.value._id) {
      await axios.put(`http://localhost:3000/api/products/${nuevoProd.value._id}`, objetoEnvio);
      alert('¡Amigurumi actualizado con éxito! 🌸');
    } else {
      await axios.post('http://localhost:3000/api/products', objetoEnvio);
      alert('¡Amigurumi registrado con éxito! 🌸');
    }
    
    emit('producto-guardado'); 
    cerrarYLimpiar();
  } catch (err) {
    console.error("Error al procesar la solicitud:", err);
    alert("Hubo un inconveniente en el servidor.");
  }
};

const cerrarYLimpiar = () => {
  nuevoProd.value = { nombre: '', descripcion: '', precio: 0, categoria: '', stock: 0, imageUrl: '' };
  errores.value = { nombre: '', descripcion: '', precio: '', categoria: '', stock: '', imageUrl: '' };
  emit('close'); 
};

</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-contenedor {
  background: white;
  padding: 30px;
  border-radius: 20px;
  width: 420px;
  text-align: left;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}
h2 { color: #5a3e62; text-align: center; margin-bottom: 20px; }
.grupo-campo { margin-bottom: 15px; }
label { font-weight: bold; display: block; color: #5d4037; margin-bottom: 5px; font-size: 0.95rem; }
input, select {
  width: 100%; padding: 8px 12px;
  border-radius: 15px; border: 1px solid #dcb2e9;
  box-sizing: border-box;
}
.alerta-error {
  color: #ff6b6b; font-size: 0.85rem; margin: 5px 0 0 0; font-weight: bold;
}
.botones-modal { display: flex; gap: 15px; margin-top: 25px; }
.btn-guardar {
  background: #a46bb5; color: white; border: none; padding: 10px 20px;
  border-radius: 20px; font-weight: bold; cursor: pointer; flex: 1;
}
.btn-cancelar {
  background: #fdf5f5; border: 1px solid #dcb2e9; color: #5d4037;
  padding: 10px 20px; border-radius: 20px; cursor: pointer;
}

input, select, textarea {
  width: 100%; 
  padding: 8px 12px;
  border-radius: 15px; 
  border: 1px solid #dcb2e9;
  box-sizing: border-box;
  font-family: inherit; 
  resize: none; 
}
</style>