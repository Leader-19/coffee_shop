<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const error = ref('')
const auth = useAuthStore()
const router = useRouter()

const submit = async () => {
  try {
    error.value = ''
    const success = await auth.login({
      email: email.value,
      password: password.value
    })
    
    if (success) {
      await auth.fetchUser()
      router.push('/')
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Login failed. Please try again.'
    console.error('Login error:', err)
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
    <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>

    <form @submit.prevent="submit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="email"
          type="email"
          class="w-full p-2 border rounded"
          placeholder="Enter your email"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Password</label>
        <input
          v-model="password"
          type="password"
          class="w-full p-2 border rounded"
          placeholder="Enter your password"
          required
        />
      </div>

      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </form>

    <p class="mt-4 text-center">
      Don't have an account?
      <router-link to="/register" class="text-blue-600 hover:underline">
        Register here
      </router-link>
    </p>
  </div>
</template>