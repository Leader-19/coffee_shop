<template>
  <div class="h-full flex flex-col text-black">
    <!-- Logo Section -->
    <div class="flex items-center justify-center mb-8 p-4">
      <div class="flex items-center">
        <svg
          class="w-12 h-12 text-indigo-400"
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z"
            fill="white"
          />
        </svg>
        <div class="ml-3">
          <span class="text-xl font-bold">Coffee Shop</span>
          <p class="text-xs text-gray-400">Admin Panel</p>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1">
      <ul class="space-y-2 px-2">
        <!-- Dashboard -->
        <li>
          <router-link
            to="/"
            :class="getNavLinkClass"
            class="w-full flex items-center px-4 py-2 text-left rounded-lg transition-all duration-300 border-l-4 border-transparent hover:bg-gray-800 hover:text-white-500 hover:border-indigo-500"
          >
            <svg
              class="w-5 h-5 mr-3 text-gray-400 group-hover:text-indigo-400 transition-colors duration-300"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 10C2 5.58172 5.58172 2 10 2V10H18C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z"
                fill="currentColor"
              />
              <path
                d="M12 2.25195C14.8113 2.97552 17.0245 5.18877 17.748 8.00004H12V2.25195Z"
                fill="currentColor"
              />
            </svg>
            <span class="font-medium">Dashboard</span>
          </router-link>
        </li>

        <!-- Products -->
        <li>
          <router-link
            to="/products"
            :class="getNavLinkClass"
            class="hover:text-white-500 w-full flex items-center px-4 py-2 text-left rounded-lg transition-all duration-300 border-l-4 border-transparent hover:bg-gray-800 hover:border-indigo-500 group"
          >
            <svg
              class="w-5 h-5 mr-3 text-gray-400 group-hover:text-indigo-400 transition-colors duration-300"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 3C3.89543 3 3 3.89543 3 5V7C3 8.10457 3.89543 9 5 9H7C8.10457 9 9 8.10457 9 7V5C9 3.89543 8.10457 3 7 3H5Z"
                fill="currentColor"
              />
              <path
                d="M5 11C3.89543 11 3 11.8954 3 13V15C3 16.1046 3.89543 17 5 17H7C8.10457 17 9 16.1046 9 15V13C9 11.8954 8.10457 11 7 11H5Z"
                fill="currentColor"
              />
              <path
                d="M11 5C11 3.89543 11.8954 3 13 3H15C16.1046 3 17 3.89543 17 5V7C17 8.10457 16.1046 9 15 9H13C11.8954 9 11 8.10457 11 7V5Z"
                fill="currentColor"
              />
              <path
                d="M11 13C11 11.8954 11.8954 11 13 11H15C16.1046 11 17 11.8954 17 13V15C17 16.1046 16.1046 17 15 17H13C11.8954 17 11 16.1046 11 15V13Z"
                fill="currentColor"
              />
            </svg>
            <span class="font-medium">Products</span>
            <span class="ml-auto bg-indigo-500 text-white text-xs px-2 py-1 rounded-full transition-all duration-300 group-hover:bg-indigo-600">{{ productCount }}</span>
          </router-link>
        </li>

        <!-- Users (only show for admin) -->
        <li v-if="user?.role === 'admin'">
          <router-link
            to="/users"
            :class="getNavLinkClass"
            class="hover:text-white-500 w-full flex items-center px-4 py-2 text-left rounded-lg transition-all duration-300 border-l-4 border-transparent hover:bg-gray-800 hover:border-indigo-500 group"
          >
            <svg
              class="w-5 h-5 mr-3 text-gray-400 group-hover:text-indigo-400 transition-colors duration-300"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 3C6.44772 3 6 3.44772 6 4C6 4.55228 6.44772 5 7 5H13C13.5523 5 14 4.55228 14 4C14 3.44772 13.5523 3 13 3H7Z"
                fill="currentColor"
              />
              <path
                d="M4 7C4 6.44772 4.44772 6 5 6H15C15.5523 6 16 6.44772 16 7C16 7.55228 15.5523 8 15 8H5C4.44772 8 4 7.55228 4 7Z"
                fill="currentColor"
              />
              <path
                d="M2 11C2 9.89543 2.89543 9 4 9H16C17.1046 9 18 9.89543 18 11V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V11Z"
                fill="currentColor"
              />
            </svg>
            <span class="font-medium">Users</span>
            <span class="ml-auto bg-indigo-500 text-white text-xs px-2 py-1 rounded-full transition-all duration-300 group-hover:bg-indigo-600">{{ userCount }}</span>
          </router-link>
        </li>

        

        <!-- Reports -->
        <li>
          <router-link
            to="/reports"
            :class="getNavLinkClass"
            class="hover:text-white-500 w-full flex items-center px-4 py-2 text-left rounded-lg transition-all duration-300 border-l-4 border-transparent hover:bg-gray-800 hover:border-indigo-500 group"
          >
            <svg
              class="w-5 h-5 mr-3 text-gray-400 group-hover:text-indigo-400 transition-colors duration-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
              />
              <path
                fill-rule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="font-medium">Reports</span>
          </router-link>
        </li>

        <!-- Payments -->
        <li>
          <router-link
            to="/payments"
            :class="getNavLinkClass"
            class="hover:text-white-500 w-full flex items-center px-4 py-2 text-left rounded-lg transition-all duration-300 border-l-4 border-transparent hover:bg-gray-800 hover:border-indigo-500 group"
          >
            <svg
              class="w-5 h-5 mr-3 text-gray-400 group-hover:text-indigo-400 transition-colors duration-300"
              viewBox="0 0 20 20"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path
                fill-rule="evenodd"
                d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="font-medium">Payments</span>
            <span class="ml-auto bg-green-500 text-white text-xs px-2 py-1 rounded-full transition-all duration-300 group-hover:bg-green-600">${{ paymentTotal }}</span>
          </router-link>
        </li>

        <!-- Settings -->
        <li>
          <router-link
            to="/settings"
            :class="getNavLinkClass"
            class="hover:text-white-500 w-full flex items-center px-4 py-2 text-left rounded-lg transition-all duration-300 border-l-4 border-transparent hover:bg-gray-800 hover:border-indigo-500 group"
          >
            <svg
              class="w-5 h-5 mr-3 text-gray-400 group-hover:text-indigo-400 transition-colors duration-300"
              viewBox="0 0 20 20"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
              <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
              <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
            </svg>
            <span class="font-medium">Settings</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Logout Button -->
    <div class="p-4 border-t border-gray-800">
      <button
        @click="handleLogout"
        class="hover:text-white-500 w-full flex items-center px-4 py-2 text-left rounded-lg transition-all duration-300 text-gray-400 hover:bg-red-600 hover:text-white"
        :disabled="isLoggingOut"
      >
        <svg
          class="w-5 h-5 mr-3 text-gray-400 hover:text-white transition-colors duration-300"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
            clip-rule="evenodd"
          />
        </svg>
        <span class="font-medium">
          {{ isLoggingOut ? 'Logging out...' : 'Logout' }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const isLoggingOut = ref(false)

// Example data - replace with real data from your API
const productCount = ref(24)
const userCount = ref(2)
const paymentTotal = ref('2.4k')

const getNavLinkClass = computed(() => {
  return ({ isActive }) => {
    if (isActive) {
      return 'text-indigo-400 hover:text-white-500 bg-gray-800 border-indigo-500'
    }
    return 'text-white-400 border-transparent hover:text-indigo-400'
  }
})

const handleLogout = async () => {
  try {
    isLoggingOut.value = true
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Logout failed:', error)
  } finally {
    isLoggingOut.value = false
  }
}
</script>