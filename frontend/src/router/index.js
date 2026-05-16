import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { 
    path: '/product/:id', 
    name: 'product-detail', 
    component: () => import('@/views/ProductDetailView.vue') 
  },
  { 
    path: '/about', 
    name: 'about', 
    component: () => import('@/views/AboutView.vue') 
  },
  // Ruta 404 
  { 
    path: '/:pathMatch(.*)*', 
    name: 'not-found', 
    component: () => import('@/views/NotFoundView.vue') 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;