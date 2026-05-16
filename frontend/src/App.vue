<template>
  <header>
    <h1> Mi Tienda de Amigurumis</h1>
    <nav>
      <router-link to="/">Catálogo</router-link> |
      <router-link to="/about">Sobre Mí</router-link>
      <p>Unidad 3: SPA </p>
    </nav>
  </header>

  <main>
  <router-view />
  </main>
</template>

<script setup>

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
</style>

/*  para los links (Catálogo | Sobre Mí) */
nav a {
  font-weight: bold;
  color: #5d4037; 
  text-decoration: none; 
  padding: 5px 15px;
  margin: 0 10px;
  transition: all 0.3s; 

.router-link-active {
  background-color: #fdf5f5; 
  border-radius: 20px;
  color: #dcb2e9; 
}