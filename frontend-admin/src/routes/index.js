import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import FormCreateProduct from '@/components/FormCreateProduct.vue';
import EditProduct from '@/components/product/EditProduct.vue';
import DashboardPage from '@/views/DashboardPage.vue';
import PaymentPage from '@/views/PaymentPage.vue';
import ProductPage from '@/views/ProductPage.vue';
import ReportPage from '@/views/ReportPage.vue';
import SettingPage from '@/views/SettingPage.vue';
import UserManagement from '@/views/UserManagement.vue';
import LoginPage from '@/auth/LoginPage.vue';
import RegisterPage from '@/auth/RegisterPage.vue';
import AdminRegister from '@/auth/AdminRegister.vue';

const routes = [
  { path: '/', component: DashboardPage, name: 'DashboardPage', meta: { requiresAdmin: true } },
  { path: '/products', component: ProductPage, name: 'ProductPage', meta: { requiresAdmin: true } },
  { path: '/users', component: UserManagement, name: 'UserManagement', meta: { requiresAdmin: true } },
  { path: '/create_product', component: FormCreateProduct, name: 'FormCreateProduct', meta: { requiresAdmin: true } },
  { path: '/edit_product/:id', component: EditProduct, name: 'EditProduct', meta: { requiresAdmin: true } },
  { path: '/reports', component: ReportPage, name: 'ReportPage', meta: { requiresAdmin: true } },
  { path: '/payments', component: PaymentPage, name: 'PaymentPage', meta: { requiresAdmin: true } },
  { path: '/settings', component: SettingPage, name: 'SettingPage', meta: { requiresAdmin: true } },
  { path: '/login', component: LoginPage, name: 'LoginPage' },
  { path: '/register', component: RegisterPage, name: 'RegisterPage' },
  { path: '/admin/register', component: AdminRegister, name: 'AdminRegister' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Fetch user data if token exists but user is not loaded
  if (authStore.token && !authStore.user) {
    try {
      await authStore.fetchUser();
    } catch (error) {
      authStore.clearAuthData();
      next('/login');
      return;
    }
  }

  // Check if the route requires admin access
  if (to.meta.requiresAdmin) {
    if (authStore.user && authStore.user.role === 'admin') {
      next(); // Allow access
    } else {
      next('/login'); // Redirect to login if not admin
    }
  } else {
    next(); // Allow access to public routes
  }
});

export default router;