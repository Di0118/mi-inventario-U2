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

          
  <select v-model="nuevoProd.categoriaId">
            <option value="">-- Selecciona una categoría --</option>
            <option v-for="cat in props.categories" :key="cat._id" :value="cat._id">
              {{ cat.nombre }}
            </option>
          </select>

          <p v-if="errores.categoriaId" class="alerta-error">{{ errores.categoriaId }}</p>
        </div>

        <div class="grupo-campo">
          <label>Stock:</label>
          <input type="number" v-model.number="nuevoProd.stock" />
          <p v-if="errores.stock" class="alerta-error">{{ errores.stock }}</p>
        </div>

        <div class="grupo-campo">
          <label>URL de la Imagen:</label>
          <input type="text" v-model="nuevoProd.imageUrl" placeholder="http://..." />
          <p v-if="errores.imageUrl" class="alerta-error">{{ errores.imageUrl }}</p>
        </div>

        <div class="botones-modal">
          <button type="submit" class="btn-guardar">Guardar Producto</button>
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
const API_BASE_URL = import.meta.env.VITE_API_URL;

const nuevoProd = ref({
  nombre: '',
  descripcion: '',
  precio: 0,
  categoriaId: '',
  stock: 0,
  imageUrl: ''
});

const errores = ref({
  nombre: '',
  descripcion: '',
  precio: '',
  categoriaId: '',
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
      categoriaId: nuevoValor.categoriaId?._id || nuevoValor.categoriaId || '',
      stock: nuevoValor.stock,
      imageUrl: nuevoValor.imagenUrl
    };
  } else {
    nuevoProd.value = {
      nombre: '',
      descripcion: '',
      precio: 0,
      categoriaId: '',
      stock: 0,
      imageUrl: ''
    };
  }
}, { immediate: true });

const validarFormulario = () => {
  let esValido = true;

  errores.value = {
    nombre: '',
    descripcion: '',
    precio: '',
    categoriaId: '',
    stock: '',
    imageUrl: ''
  };

  if (!nuevoProd.value.nombre.trim()) {
    errores.value.nombre = 'El nombre es obligatorio';
    esValido = false;
  }

  if (!nuevoProd.value.descripcion.trim()) {
    errores.value.descripcion = 'La descripción es obligatoria';
    esValido = false;
  }

  if (nuevoProd.value.precio <= 0) {
    errores.value.precio = 'Precio inválido';
    esValido = false;
  }

  if (!nuevoProd.value.categoriaId) {
    errores.value.categoriaId = 'Selecciona una categoría';
    esValido = false;
  }

  if (nuevoProd.value.stock < 0) {
    errores.value.stock = 'Stock inválido';
    esValido = false;
  }

  if (!nuevoProd.value.imageUrl.startsWith('http')) {
    errores.value.imageUrl = 'URL inválida';
    esValido = false;
  }

  return esValido;
};

const guardarAmigurumi = async () => {
  if (!validarFormulario()) return;

  try {
    const data = {
      nombre: nuevoProd.value.nombre,
      descripcion: nuevoProd.value.descripcion,
      precio: nuevoProd.value.precio,
      stock: nuevoProd.value.stock,
      imagenUrl: nuevoProd.value.imageUrl,
      categoriaId: nuevoProd.value.categoriaId
    };

    if (nuevoProd.value._id) {
      await axios.put(`${API_BASE_URL}/products/${nuevoProd.value._id}`, data);
    } else {
      await axios.post(`${API_BASE_URL}/products`, data);
    }

    emit('producto-guardado');
    cerrarYLimpiar();

  } catch (error) {
    console.error(error);
    alert("Error al guardar");
  }
};

const cerrarYLimpiar = () => {
  nuevoProd.value = {
    nombre: '',
    descripcion: '',
    precio: 0,
    categoriaId: '',
    stock: 0,
    imageUrl: ''
  };
  emit('close');
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; 
  left: 0; 
  width: 100%; 
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-contenedor {
  background: #ffffff;
  padding: 28px;
  border-radius: 18px;
  width: 420px;
  text-align: left;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  font-family: Arial, sans-serif;
}

h2 {
  color: #5a3e62;
  text-align: center;
  margin-bottom: 20px;
}

.grupo-campo {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  display: block;
  color: #5d4037;
  margin-bottom: 5px;
  font-size: 0.95rem;
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

.alerta-error {
  color: #ff6b6b;
  font-size: 0.85rem;
  margin: 5px 0 0 0;
  font-weight: bold;
}

.botones-modal {
  display: flex;
  gap: 15px;
  margin-top: 25px;
}

.btn-guardar {
  background: #a46bb5 !important;
  color: white !important;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  flex: 1;
}

.btn-cancelar {
  background: #fdf5f5;
  border: 1px solid #dcb2e9;
  color: #5d4037;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
}

button {
  font-family: inherit;
  background: none;
}

.btn-guardar,
.btn-cancelar {
  background-clip: padding-box;
}
</style>