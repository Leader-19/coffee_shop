<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
    <h2 class="text-2xl font-bold mb-6 text-center">Admin Registration</h2>

    <form @submit.prevent="submit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Name</label>
        <input
          v-model="name"
          type="text"
          class="w-full p-2 border rounded"
          required
          placeholder="Enter admin name"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="email"
          type="email"
          class="w-full p-2 border rounded"
          required
          placeholder="Enter admin email"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Password</label>
        <input
          v-model="password"
          type="password"
          class="w-full p-2 border rounded"
          required
          placeholder="Enter password"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          v-model="password_confirmation"
          type="password"
          class="w-full p-2 border rounded"
          required
          placeholder="Confirm password"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Admin Secret Key</label>
        <input
          v-model="admin_secret"
          type="password"
          class="w-full p-2 border rounded"
          required
          placeholder="Enter admin secret key"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Register Admin
      </button>
    </form>

    <div v-if="errorMessage" class="mt-4 p-3 bg-red-100 text-red-700 rounded">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../api/axios'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const admin_secret = ref('')
const errorMessage = ref('')

const router = useRouter()

const submit = async () => {
  errorMessage.value = ''
  
  try {
    const response = await api.post('/register-admin', {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
      admin_secret: admin_secret.value
    })
    
    if (response.status === 201) {
      alert('Admin registration successful!')
      router.push('/login')
    }
  } catch (error) {
    console.error('Admin registration error:', error)
    
    if (error.response) {
      if (error.response.status === 422 && error.response.data.errors) {
        const errors = Object.values(error.response.data.errors).flat()
        errorMessage.value = errors.join('\n')
      } else if (error.response.status === 401) {
        errorMessage.value = 'Invalid admin secret key'
      } else {
        errorMessage.value = error.response.data.message || 'Admin registration failed'
      }
    } else {
      errorMessage.value = 'Network error. Please try again.'
    }
  }
}
</script>

<style scoped>
input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 1px #2563eb;
}
</style>