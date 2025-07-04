<template>
  <!-- Charts Section - Pure CSS/SVG Graphs -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
    <!-- Revenue Chart -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Revenue Overview</h3>
      <div class="h-64 flex items-end justify-between space-x-2">
        <div class="flex flex-col items-center">
          <div
            class="bg-blue-500 w-8 rounded-t"
            :style="{ height: '60px' }"
          ></div>
          <span class="text-xs text-gray-500 mt-2">Jan</span>
          <span class="text-xs text-gray-700 font-medium">$65k</span>
        </div>
        <div class="flex flex-col items-center">
          <div
            class="bg-blue-500 w-8 rounded-t"
            :style="{ height: '80px' }"
          ></div>
          <span class="text-xs text-gray-500 mt-2">Feb</span>
          <span class="text-xs text-gray-700 font-medium">$78k</span>
        </div>
        <div class="flex flex-col items-center">
          <div
            class="bg-blue-500 w-8 rounded-t"
            :style="{ height: '95px' }"
          ></div>
          <span class="text-xs text-gray-500 mt-2">Mar</span>
          <span class="text-xs text-gray-700 font-medium">$85k</span>
        </div>
        <div class="flex flex-col items-center">
          <div
            class="bg-blue-500 w-8 rounded-t"
            :style="{ height: '110px' }"
          ></div>
          <span class="text-xs text-gray-500 mt-2">Apr</span>
          <span class="text-xs text-gray-700 font-medium">$92k</span>
        </div>
        <div class="flex flex-col items-center">
          <div
            class="bg-blue-500 w-8 rounded-t"
            :style="{ height: '130px' }"
          ></div>
          <span class="text-xs text-gray-500 mt-2">May</span>
          <span class="text-xs text-gray-700 font-medium">$105k</span>
        </div>
        <div class="flex flex-col items-center">
          <div
            class="bg-blue-500 w-8 rounded-t"
            :style="{ height: '150px' }"
          ></div>
          <span class="text-xs text-gray-500 mt-2">Jun</span>
          <span class="text-xs text-gray-700 font-medium">$125k</span>
        </div>
      </div>
    </div>

    <!-- User Growth Chart -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">User Growth</h3>
      <div class="h-64 relative">
        <svg class="w-full h-full" viewBox="0 0 400 200">
          <!-- Grid lines -->
          <defs>
            <pattern
              id="grid"
              width="40"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 20"
                fill="none"
                stroke="#f3f4f6"
                stroke-width="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          <!-- Line chart -->
          <polyline
            fill="none"
            stroke="#10b981"
            stroke-width="3"
            points="20,180 80,160 140,120 200,80 260,60 320,40"
          />

          <!-- Data points -->
          <circle cx="20" cy="180" r="4" fill="#10b981" />
          <circle cx="80" cy="160" r="4" fill="#10b981" />
          <circle cx="140" cy="120" r="4" fill="#10b981" />
          <circle cx="200" cy="80" r="4" fill="#10b981" />
          <circle cx="260" cy="60" r="4" fill="#10b981" />
          <circle cx="320" cy="40" r="4" fill="#10b981" />
        </svg>

        <!-- Labels -->
        <div
          class="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 px-4"
        >
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Pie Chart Section -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
    <!-- Sales Distribution -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">
        Sales Distribution
      </h3>
      <div class="flex justify-center mb-4">
        <div class="relative w-32 h-32">
          <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <!-- Electronics: 40% -->
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#3b82f6"
              stroke-width="20"
              stroke-dasharray="100.53 251.33"
              stroke-dashoffset="0"
            />
            <!-- Clothing: 25% -->
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#10b981"
              stroke-width="20"
              stroke-dasharray="62.83 251.33"
              stroke-dashoffset="-100.53"
            />
            <!-- Books: 20% -->
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#f59e0b"
              stroke-width="20"
              stroke-dasharray="50.27 251.33"
              stroke-dashoffset="-163.36"
            />
            <!-- Others: 15% -->
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#ef4444"
              stroke-width="20"
              stroke-dasharray="37.70 251.33"
              stroke-dashoffset="-213.63"
            />
          </svg>
        </div>
      </div>
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span class="text-sm">Electronics</span>
          </div>
          <span class="text-sm font-medium">40%</span>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span class="text-sm">Clothing</span>
          </div>
          <span class="text-sm font-medium">25%</span>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <span class="text-sm">Books</span>
          </div>
          <span class="text-sm font-medium">20%</span>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span class="text-sm">Others</span>
          </div>
          <span class="text-sm font-medium">15%</span>
        </div>
      </div>
    </div>
  </div>
  <!-- Recent Activities -->
  <div class="bg-white rounded-lg shadow-sm p-6 mb-5">
    <h3 class="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
    <div class="space-y-4">
      <div
        v-for="activity in recentActivities"
        :key="activity.id"
        class="flex items-center space-x-3"
      >
        <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
        <div class="flex-1">
          <p class="text-sm text-gray-800">{{ activity.description }}</p>
          <p class="text-xs text-gray-500">{{ activity.time }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Top Products -->
  <div class="bg-white rounded-lg shadow-sm p-6">
    <h3 class="text-lg font-semibold text-gray-800 mb-4">Top Products</h3>
    <div class="space-y-3">
      <div
        v-for="product in topProducts"
        :key="product.id"
        class="flex justify-between items-center"
      >
        <div class="w-full">
          <p class="text-sm font-medium text-gray-800">{{ product.name }}</p>
          <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div
              class="bg-blue-500 h-2 rounded-full transition-all duration-300"
              :style="{ width: product.percentage + '%' }"
            ></div>
          </div>
        </div>
        <span class="text-green-500 font-semibold ml-4 whitespace-nowrap">
          ${{ product.revenue.toLocaleString() }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Top Products Data
const topProducts = ref([
  { id: 1, name: 'iPhone 15 Pro', revenue: 1249000, percentage: 85 },
  { id: 2, name: 'MacBook Air M2', revenue: 1068000, percentage: 72 },
  { id: 3, name: 'AirPods Pro', revenue: 525000, percentage: 45 },
  { id: 4, name: 'iPad Air', revenue: 390000, percentage: 33 }
])

// Recent Activities
const recentActivities = ref([
  { id: 1, description: 'New user registered', time: '2 minutes ago' },
  { id: 2, description: 'Order #1234 completed', time: '5 minutes ago' },
  { id: 3, description: 'Product "iPhone 15" added', time: '10 minutes ago' },
  { id: 4, description: 'Payment received from John Doe', time: '15 minutes ago' },
  { id: 5, description: 'New review posted', time: '20 minutes ago' }
])
</script>

