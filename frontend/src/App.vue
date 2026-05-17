<template>
  <header>
    <h1> Mi Tienda de Amigurumis</h1>
    <nav>
      <router-link to="/">Catálogo</router-link> |
      <router-link to="/about">Sobre Mí</router-link> |
      
      <router-link to="/cart" class="link-carrito">
        Carrito 
        <span v-if="cantidadProductos > 0" class="burbuja-contador">
          {{ cantidadProductos }}
        </span>
      </router-link>
    </nav>
    <p class="subtitulo-spa">Unidad 3: SPA</p>
  </header>

  <main>
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <Suspense :timeout="0">
          <component :is="Component" />
          
          <template #fallback>
            <div class="cargando-seccion">
              <p>Cargando sección...<router-view v-slot="{ Component }">
      <template v-if="Component">
        <Suspense :timeout="0">
          <component :is="Component" />
          
          <template #fallback>
            <div class="cargando-seccion">
              <p>Cargando sección... 🌸 ✨</p>
            </div>
          </template>
        </Suspense>
      </template>
    </router-view></p>
            </div>
          </template>
        </Suspense>
      </template>
    </router-view>
  </main>
</template>

<script setup>
import { useCart } from '@/composables/useCart';
const { cantidadProductos } = useCart();
</script>

<style>
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  background-color: #fdf5f5;
  color: #5d4037;
  text-align: center;
}
header {
  background-color: #dcb2e9;
  padding: 20px;
  margin-bottom: 20px;
}
.subtitulo-spa {
  margin: 10px 0 0 0;
  font-size: 0.9rem;
  font-weight: bold;
  color: #5d4037;
}

nav a {
  font-weight: bold;
  color: #5d4037; 
  text-decoration: none; 
  padding: 5px 15px;
  margin: 0 5px;
  transition: all 0.3s; 
  display: inline-flex;
  align-items: center;
}

.router-link-active {
  background-color: #fdf5f5; 
  border-radius: 20px;
  color: #dcb2e9; 
}

.link-carrito {
  gap: 5px;
}
</style>