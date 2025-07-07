<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
    <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>

    <form @submit.prevent="submit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Name</label>
        <input
          v-model="name"
          type="text"
          class="w-full p-2 border rounded"
          required
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="email"
          type="email"
          class="w-full p-2 border rounded"
          required
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Password</label>
        <input
          v-model="password"
          type="password"
          class="w-full p-2 border rounded"
          required
          placeholder="Enter your password"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          v-model="password_confirmation"
          type="password"
          class="w-full p-2 border rounded"
          required
          placeholder="Confirm your password"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Register
      </button>
    </form>

    <p class="mt-4 text-center">
      Already have an account?
      <router-link to="/login" class="text-blue-600 hover:underline">Login</router-link>
    </p>
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
const errorMessage = ref('')

const router = useRouter()

const submit = async () => {
  errorMessage.value = ''
  
  try {
    const response = await api.post('/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
    })
    
    if (response.status === 201) {
      alert('Registration successful! Please login.')
      router.push('/login')
    }
  } catch (error) {
    console.error('Registration error:', error)
    
    if (error.response) {
      // Handle validation errors
      if (error.response.status === 422 && error.response.data.errors) {
        const errors = Object.values(error.response.data.errors).flat()
        errorMessage.value = errors.join('\n')
      } else {
        errorMessage.value = error.response.data.message || 'Registration failed'
      }
    } else if (error.request) {
      errorMessage.value = 'No response from server. Please try again.'
    } else {
      errorMessage.value = 'Registration failed. Please try again.'
    }
    
    alert(errorMessage.value)
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
