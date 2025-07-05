import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import ProductPage from '@/views/ProductPage.vue';

const routes = [
  {
    path: '/',
    component: HomePage,
    name: 'HomePage'
  },
  {
    path: '/products',
    component: ProductPage,
    name: 'ProductPage'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;