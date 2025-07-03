<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <CoffeeIcon class="h-8 w-8 text-amber-600" />
              Brew & Bean Analytics
            </h1>
            <p class="text-sm text-gray-600 mt-1">Coffee Shop Performance Dashboard</p>
          </div>
          <div class="flex items-center gap-4">
            <select
              v-model="selectedPeriod"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            <button class="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <DownloadIcon class="h-4 w-4" />
              Export Report
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Key Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Revenue</p>
              <p class="text-3xl font-bold text-gray-900">${{ totalRevenue.toLocaleString() }}</p>
              <p class="text-sm text-green-600 mt-1">+12.5% from last period</p>
            </div>
            <div class="p-3 bg-green-100 rounded-full">
              <DollarSignIcon class="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Orders Today</p>
              <p class="text-3xl font-bold text-gray-900">{{ ordersToday }}</p>
              <p class="text-sm text-blue-600 mt-1">+8.2% from yesterday</p>
            </div>
            <div class="p-3 bg-blue-100 rounded-full">
              <ShoppingBagIcon class="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Average Order</p>
              <p class="text-3xl font-bold text-gray-900">${{ averageOrder }}</p>
              <p class="text-sm text-amber-600 mt-1">+5.1% from last period</p>
            </div>
            <div class="p-3 bg-amber-100 rounded-full">
              <TrendingUpIcon class="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Customer Satisfaction</p>
              <p class="text-3xl font-bold text-gray-900">{{ customerSatisfaction }}%</p>
              <p class="text-sm text-green-600 mt-1">+2.3% from last month</p>
            </div>
            <div class="p-3 bg-purple-100 rounded-full">
              <StarIcon class="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Sales Chart -->
        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Sales Overview</h3>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 bg-amber-500 rounded-full"></div>
              <span class="text-sm text-gray-600">Revenue</span>
            </div>
          </div>
          <div class="h-64 flex items-end justify-between gap-2">
            <div v-for="(value, index) in salesData" :key="index" class="flex flex-col items-center">
              <div 
                class="bg-amber-500 rounded-t-md w-8 transition-all duration-300 hover:bg-amber-600"
                :style="{ height: `${(value / Math.max(...salesData)) * 200}px` }"
              ></div>
              <span class="text-xs text-gray-500 mt-2">{{ getDayLabel(index) }}</span>
            </div>
          </div>
        </div>

        <!-- Popular Products -->
        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Top Selling Products</h3>
          <div class="space-y-4">
            <div v-for="product in topProducts" :key="product.name" class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <CoffeeIcon class="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ product.name }}</p>
                  <p class="text-sm text-gray-500">{{ product.sold }} sold</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-semibold text-gray-900">${{ product.revenue }}</p>
                <div class="w-20 bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    class="bg-amber-500 h-2 rounded-full transition-all duration-300"
                    :style="{ width: `${(product.sold / Math.max(...topProducts.map(p => p.sold))) * 100}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detailed Reports -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Inventory Status -->
        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Inventory Status</h3>
          <div class="space-y-4">
            <div v-for="item in inventoryItems" :key="item.name" class="flex items-center justify-between">
              <div>
                <p class="font-medium text-gray-900">{{ item.name }}</p>
                <p class="text-sm text-gray-500">{{ item.current }} / {{ item.max }} units</p>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-16 bg-gray-200 rounded-full h-2">
                  <div 
                    class="h-2 rounded-full transition-all duration-300"
                    :class="getInventoryColor(item.current, item.max)"
                    :style="{ width: `${(item.current / item.max) * 100}%` }"
                  ></div>
                </div>
                <span 
                  class="text-xs px-2 py-1 rounded-full font-medium"
                  :class="getInventoryStatusClass(item.current, item.max)"
                >
                  {{ getInventoryStatus(item.current, item.max) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Customer Analytics -->
        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Customer Insights</h3>
          <div class="space-y-6">
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-gray-600">New Customers</span>
                <span class="text-sm font-bold text-gray-900">{{ newCustomers }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-blue-500 h-2 rounded-full w-3/4"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-gray-600">Returning Customers</span>
                <span class="text-sm font-bold text-gray-900">{{ returningCustomers }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-green-500 h-2 rounded-full w-4/5"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-gray-600">Peak Hours</span>
                <span class="text-sm font-bold text-gray-900">8-10 AM</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-amber-500 h-2 rounded-full w-5/6"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Staff Performance -->
        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Staff Performance</h3>
          <div class="space-y-4">
            <div v-for="staff in staffPerformance" :key="staff.name" class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span class="text-xs font-medium text-gray-700">{{ staff.name.charAt(0) }}</span>
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ staff.name }}</p>
                  <p class="text-sm text-gray-500">{{ staff.orders }} orders</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-semibold text-gray-900">${{ staff.sales }}</p>
                <div class="flex items-center gap-1 mt-1">
                  <StarIcon v-for="star in 5" :key="star" 
                    class="h-3 w-3" 
                    :class="star <= staff.rating ? 'text-yellow-400' : 'text-gray-300'" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Orders Table -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Recent Orders</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="order in recentOrders" :key="order.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{{ order.id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ order.customer }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ order.items.join(', ') }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                  ${{ order.total }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                        :class="getOrderStatusClass(order.status)">
                    {{ order.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatTime(order.time) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  CoffeeIcon, 
  DollarSignIcon, 
  ShoppingBagIcon, 
  TrendingUpIcon, 
  StarIcon,
  DownloadIcon
} from 'lucide-vue-next'

// Reactive data
const selectedPeriod = ref('today')

// Mock data
const totalRevenue = ref(15420)
const ordersToday = ref(127)
const averageOrder = ref(12.50)
const customerSatisfaction = ref(94)
const newCustomers = ref(23)
const returningCustomers = ref(104)

const salesData = ref([1200, 1900, 3000, 5000, 2000, 3000, 4500])

const topProducts = ref([
  { name: 'Cappuccino', sold: 145, revenue: 725 },
  { name: 'Latte', sold: 132, revenue: 660 },
  { name: 'Espresso', sold: 98, revenue: 294 },
  { name: 'Americano', sold: 87, revenue: 348 },
  { name: 'Mocha', sold: 76, revenue: 456 }
])

const inventoryItems = ref([
  { name: 'Coffee Beans', current: 45, max: 50 },
  { name: 'Milk', current: 12, max: 20 },
  { name: 'Sugar', current: 8, max: 15 },
  { name: 'Cups', current: 150, max: 200 },
  { name: 'Lids', current: 89, max: 200 }
])

const staffPerformance = ref([
  { name: 'Alice Johnson', orders: 45, sales: 562, rating: 5 },
  { name: 'Bob Smith', orders: 38, sales: 475, rating: 4 },
  { name: 'Carol Davis', orders: 42, sales: 521, rating: 5 },
  { name: 'David Wilson', orders: 35, sales: 438, rating: 4 }
])

const recentOrders = ref([
  { 
    id: '1001', 
    customer: 'John Doe', 
    items: ['Cappuccino', 'Croissant'], 
    total: 8.50, 
    status: 'completed', 
    time: new Date(Date.now() - 300000) 
  },
  { 
    id: '1002', 
    customer: 'Jane Smith', 
    items: ['Latte', 'Muffin'], 
    total: 7.25, 
    status: 'preparing', 
    time: new Date(Date.now() - 600000) 
  },
  { 
    id: '1003', 
    customer: 'Mike Johnson', 
    items: ['Americano'], 
    total: 4.00, 
    status: 'completed', 
    time: new Date(Date.now() - 900000) 
  },
  { 
    id: '1004', 
    customer: 'Sarah Wilson', 
    items: ['Mocha', 'Cookie'], 
    total: 9.75, 
    status: 'pending', 
    time: new Date(Date.now() - 1200000) 
  },
  { 
    id: '1005', 
    customer: 'Tom Brown', 
    items: ['Espresso', 'Bagel'], 
    total: 6.50, 
    status: 'completed', 
    time: new Date(Date.now() - 1500000) 
  }
])

// Methods
const getDayLabel = (index) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  return days[index]
}

const getInventoryColor = (current, max) => {
  const percentage = (current / max) * 100
  if (percentage > 70) return 'bg-green-500'
  if (percentage > 30) return 'bg-yellow-500'
  return 'bg-red-500'
}

const getInventoryStatus = (current, max) => {
  const percentage = (current / max) * 100
  if (percentage > 70) return 'Good'
  if (percentage > 30) return 'Low'
  return 'Critical'
}

const getInventoryStatusClass = (current, max) => {
  const percentage = (current / max) * 100
  if (percentage > 70) return 'bg-green-100 text-green-800'
  if (percentage > 30) return 'bg-yellow-100 text-yellow-800'
  return 'bg-red-100 text-red-800'
}

const getOrderStatusClass = (status) => {
  const classes = {
    completed: 'bg-green-100 text-green-800',
    preparing: 'bg-blue-100 text-blue-800',
    pending: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const formatTime = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(date)
}
</script>