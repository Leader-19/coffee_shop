import { defineStore } from 'pinia'
import api from '../api/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: null,
  }),
  actions: {
    async login(credentials) {
      const response = await api.post('/login', credentials)
      this.token = response.data.token
      localStorage.setItem('token', this.token)
      api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
    },

    async getUser() {
      const res = await api.get('/user', {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      this.user = res.data
    },

    async logout() {
      await api.post('/logout', {}, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
    }
  }
})
