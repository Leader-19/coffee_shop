<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Dashboard</h1>
      <p class="text-gray-600 mt-2">Welcome back! Here's what's happening with your business today.</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="p-3 bg-indigo-500 rounded-full">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-2xl font-bold text-gray-700">{{ stats.newUsers.toLocaleString() }}</h3>
            <p class="text-gray-500">New Users</p>
            <span class="text-green-500 text-sm">+12% from last month</span>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="p-3 bg-blue-500 rounded-full">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-2xl font-bold text-gray-700">{{ stats.totalOrders.toLocaleString() }}</h3>
            <p class="text-gray-500">Total Orders</p>
            <span class="text-green-500 text-sm">+8% from last month</span>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="p-3 bg-pink-500 rounded-full">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-2xl font-bold text-gray-700">{{ stats.availableProducts.toLocaleString() }}</h3>
            <p class="text-gray-500">Available Products</p>
            <span class="text-red-500 text-sm">-2% from last month</span>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="p-3 bg-green-500 rounded-full">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"/>
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-2xl font-bold text-gray-700">${{ stats.revenue.toLocaleString() }}</h3>
            <p class="text-gray-500">Total Revenue</p>
            <span class="text-green-500 text-sm">+15% from last month</span>
          </div>
        </div>
      </div>
    </div>

    <!-- import Chart -->
    <ChartOfSystem />
    <!-- end import -->

  
    <!-- Enhanced Table -->

    <table-of-user />
    
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ChartOfSystem from '@/components/ChartOfSystem.vue'
import TableOfUser from '@/components/TableOfUser.vue'
// Stats Data
const stats = ref({
  newUsers: 8282,
  totalOrders: 200521,
  availableProducts: 215542,
  revenue: 1250000
})

// Recent Activities
const recentActivities = ref([
  { id: 1, description: 'New user registered', time: '2 minutes ago' },
  { id: 2, description: 'Order #1234 completed', time: '5 minutes ago' },
  { id: 3, description: 'Product "iPhone 15" added', time: '10 minutes ago' },
  { id: 4, description: 'Payment received from John Doe', time: '15 minutes ago' },
  { id: 5, description: 'New review posted', time: '20 minutes ago' }
])

// Top Products
const topProducts = ref([
  { id: 1, name: 'iPhone 15 Pro', revenue: '1,249k', percentage: 85 },
  { id: 2, name: 'MacBook Air M2', revenue: '1,068k', percentage: 72 },
  { id: 3, name: 'AirPods Pro', revenue: '525k', percentage: 45 },
  { id: 4, name: 'iPad Air', revenue: '390k', percentage: 33 }
])

// Users List
const users = ref([
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    status: 'Active',
    role: 'Admin',
    joined: '2024-01-15',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'Active',
    role: 'User',
    joined: '2024-01-20',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    status: 'Inactive',
    role: 'User',
    joined: '2024-01-10',
    avatar:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    status: 'Active',
    role: 'Moderator',
    joined: '2024-01-28',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
])

// Method to return class based on status
const getStatusClass = (status) => {
  return status === 'Active'
    ? 'bg-green-100 text-green-800'
    : 'bg-red-100 text-red-800'
}
</script>

<style scoped>
/* Custom styles for static graphs */
.chart-bar {
  transition: all 0.3s ease;
}
</style>
