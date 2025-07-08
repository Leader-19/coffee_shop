import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import ProductPage from '@/views/ProductPage.vue';
import FavoritePage from '@/views/FavoritePage.vue';
import OrderPage from '@/views/OrderPage.vue';
import ProfilePage from '@/views/ProfilePage.vue';
import LoginPage from '@/auth/LoginPage.vue';
import RegisterPage from '@/auth/RegisterPage.vue';

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
  },
  {
    path : '/favorites',
    component :FavoritePage,
    name : 'FavoritePage'
  },
  {
    path : '/orders',
    component : OrderPage,
    name : 'OrderPage'
  },
  {
    path : '/profile',
    component : ProfilePage,
    name : 'ProfilePage'
  },
  {
    path : '/login',
    component : LoginPage,
    name : 'LoginPage'
  },

  {
    path : '/register',
    component : RegisterPage,
    name : 'RegisterPage'
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;