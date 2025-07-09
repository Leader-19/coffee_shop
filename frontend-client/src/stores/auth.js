import { defineStore } from 'pinia';
import api from '@/api/axios';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
  }),
  actions: {
    async register(userData) {
      try {
        const response = await api.post('/register', userData);
        this.token = response.data.token;
        this.user = response.data.user;
        localStorage.setItem('token', this.token);
        localStorage.setItem('user', JSON.stringify(this.user));
        return response;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
    async login(credentials) {
      try {
        const response = await api.post('/login', credentials);
        this.token = response.data.token;
        this.user = response.data.user;
        localStorage.setItem('token', this.token);
        localStorage.setItem('user', JSON.stringify(this.user));
        return response;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
    async logout() {
      try {
        await api.post('/logout');
        this.clearAuthData();
        const router = useRouter();
        router.push('/login');
      } catch (error) {
        this.clearAuthData();
        const router = useRouter();
        router.push('/login');
        throw error.response?.data || error;
      }
    },
    async fetchUser() {
      try {
        const response = await api.get('/user');
        this.user = response.data;
        localStorage.setItem('user', JSON.stringify(this.user));
        return response;
      } catch (error) {
        this.clearAuthData();
        throw error.response?.data || error;
      }
    },
    clearAuthData() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});