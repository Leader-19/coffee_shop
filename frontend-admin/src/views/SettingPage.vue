<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <Coffee class="h-8 w-8 text-amber-600 mr-3" />
            <h1 class="text-2xl font-bold text-gray-900">Brew & Bean</h1>
          </div>
          <nav class="hidden md:flex space-x-8">
            <a href="#" class="text-gray-500 hover:text-gray-700">Dashboard</a>
            <a href="#" class="text-gray-500 hover:text-gray-700">Orders</a>
            <a href="#" class="text-gray-500 hover:text-gray-700">Menu</a>
            <a href="#" class="text-amber-600 font-medium">Settings</a>
          </nav>
          <div class="flex items-center">
            <button class="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <User class="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-gray-900">Settings</h2>
        <p class="text-gray-600 mt-2">Manage your coffee shop preferences and configurations</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar Navigation -->
        <div class="lg:col-span-1">
          <nav class="space-y-2">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'w-full text-left px-4 py-3 rounded-lg font-medium transition-colors',
                activeTab === tab.id 
                  ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                  : 'text-gray-600 hover:bg-gray-100'
              ]"
            >
              <component :is="tab.icon" class="inline-block w-5 h-5 mr-3" />
              {{ tab.name }}
            </button>
          </nav>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-3">
          <!-- General Settings -->
          <div v-if="activeTab === 'general'" class="space-y-6">
            <div class="bg-white rounded-lg shadow-sm border p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Shop Information</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Shop Name</label>
                  <input 
                    v-model="settings.shopName"
                    type="text" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input 
                    v-model="settings.phone"
                    type="tel" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea 
                    v-model="settings.address"
                    rows="3" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  ></textarea>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow-sm border p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Business Hours</h3>
              <div class="space-y-4">
                <div v-for="day in businessHours" :key="day.day" class="flex items-center justify-between">
                  <div class="flex items-center">
                    <input 
                      v-model="day.isOpen"
                      type="checkbox" 
                      class="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                    />
                    <label class="ml-3 text-sm font-medium text-gray-700 w-20">{{ day.day }}</label>
                  </div>
                  <div v-if="day.isOpen" class="flex items-center space-x-2">
                    <input 
                      v-model="day.openTime"
                      type="time" 
                      class="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <span class="text-gray-500">to</span>
                    <input 
                      v-model="day.closeTime"
                      type="time" 
                      class="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div v-else class="text-sm text-gray-500">Closed</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Menu Management -->
          <div v-if="activeTab === 'menu'" class="space-y-6">
            <div class="bg-white rounded-lg shadow-sm border p-6">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold text-gray-900">Menu Categories</h3>
                <button class="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors">
                  <Plus class="w-4 h-4 inline mr-2" />
                  Add Category
                </button>
              </div>
              <div class="space-y-3">
                <div v-for="category in menuCategories" :key="category.id" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div class="flex items-center">
                    <div class="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mr-4">
                      <component :is="category.icon" class="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h4 class="font-medium text-gray-900">{{ category.name }}</h4>
                      <p class="text-sm text-gray-500">{{ category.itemCount }} items</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <button class="p-2 text-gray-400 hover:text-gray-600">
                      <Edit class="w-4 h-4" />
                    </button>
                    <button class="p-2 text-gray-400 hover:text-red-600">
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow-sm border p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Menu Settings</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <label class="text-sm font-medium text-gray-700">Show Prices</label>
                    <p class="text-sm text-gray-500">Display item prices on the menu</p>
                  </div>
                  <input 
                    v-model="settings.showPrices"
                    type="checkbox" 
                    class="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <label class="text-sm font-medium text-gray-700">Show Nutritional Info</label>
                    <p class="text-sm text-gray-500">Display calories and nutritional information</p>
                  </div>
                  <input 
                    v-model="settings.showNutrition"
                    type="checkbox" 
                    class="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Notifications -->
          <div v-if="activeTab === 'notifications'" class="space-y-6">
            <div class="bg-white rounded-lg shadow-sm border p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Order Notifications</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <label class="text-sm font-medium text-gray-700">New Order Alerts</label>
                    <p class="text-sm text-gray-500">Get notified when new orders are placed</p>
                  </div>
                  <input 
                    v-model="notifications.newOrders"
                    type="checkbox" 
                    class="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <label class="text-sm font-medium text-gray-700">Order Ready Notifications</label>
                    <p class="text-sm text-gray-500">Notify customers when orders are ready</p>
                  </div>
                  <input 
                    v-model="notifications.orderReady"
                    type="checkbox" 
                    class="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <label class="text-sm font-medium text-gray-700">Low Stock Alerts</label>
                    <p class="text-sm text-gray-500">Get alerted when inventory is running low</p>
                  </div>
                  <input 
                    v-model="notifications.lowStock"
                    type="checkbox" 
                    class="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow-sm border p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Email Preferences</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Notification Email</label>
                  <input 
                    v-model="notifications.email"
                    type="email" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <label class="text-sm font-medium text-gray-700">Daily Summary</label>
                    <p class="text-sm text-gray-500">Receive daily sales and order summaries</p>
                  </div>
                  <input 
                    v-model="notifications.dailySummary"
                    type="checkbox" 
                    class="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Settings -->
          <div v-if="activeTab === 'payment'" class="space-y-6">
            <div class="bg-white rounded-lg shadow-sm border p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
              <div class="space-y-4">
                <div v-for="method in paymentMethods" :key="method.id" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div class="flex items-center">
                    <component :is="method.icon" class="w-8 h-8 text-gray-600 mr-4" />
                    <div>
                      <h4 class="font-medium text-gray-900">{{ method.name }}</h4>
                      <p class="text-sm text-gray-500">{{ method.description }}</p>
                    </div>
                  </div>
                  <input 
                    v-model="method.enabled"
                    type="checkbox" 
                    class="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow-sm border p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Tax Settings</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
                  <input 
                    v-model="settings.taxRate"
                    type="number" 
                    step="0.01"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Service Fee (%)</label>
                  <input 
                    v-model="settings.serviceFee"
                    type="number" 
                    step="0.01"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Save Button -->
          <div class="flex justify-end pt-6">
            <button 
              @click="saveSettings"
              class="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors flex items-center"
            >
              <Save class="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { 
  Coffee, User, Settings, Menu, Bell, CreditCard, Clock, 
  Plus, Edit, Trash2, Save 
} from 'lucide-vue-next'

const activeTab = ref('general')

const tabs = [
  { id: 'general', name: 'General', icon: Settings },
  { id: 'menu', name: 'Menu', icon: Menu },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'payment', name: 'Payment', icon: CreditCard }
]

const settings = reactive({
  shopName: 'Brew & Bean',
  phone: '+1 (555) 123-4567',
  address: '123 Coffee Street, Bean City, BC 12345',
  showPrices: true,
  showNutrition: false,
  taxRate: 8.25,
  serviceFee: 2.50
})

const businessHours = reactive([
  { day: 'Monday', isOpen: true, openTime: '06:00', closeTime: '20:00' },
  { day: 'Tuesday', isOpen: true, openTime: '06:00', closeTime: '20:00' },
  { day: 'Wednesday', isOpen: true, openTime: '06:00', closeTime: '20:00' },
  { day: 'Thursday', isOpen: true, openTime: '06:00', closeTime: '20:00' },
  { day: 'Friday', isOpen: true, openTime: '06:00', closeTime: '21:00' },
  { day: 'Saturday', isOpen: true, openTime: '07:00', closeTime: '21:00' },
  { day: 'Sunday', isOpen: true, openTime: '07:00', closeTime: '19:00' }
])

const menuCategories = reactive([
  { id: 1, name: 'Hot Drinks', itemCount: 12, icon: Coffee },
  { id: 2, name: 'Cold Drinks', itemCount: 8, icon: Coffee },
  { id: 3, name: 'Pastries', itemCount: 15, icon: Coffee },
  { id: 4, name: 'Sandwiches', itemCount: 6, icon: Coffee }
])

const notifications = reactive({
  newOrders: true,
  orderReady: true,
  lowStock: true,
  email: 'manager@brewandbean.com',
  dailySummary: true
})

const paymentMethods = reactive([
  { id: 1, name: 'Credit Card', description: 'Visa, Mastercard, American Express', enabled: true, icon: CreditCard },
  { id: 2, name: 'Cash', description: 'Accept cash payments', enabled: true, icon: CreditCard },
  { id: 3, name: 'Mobile Pay', description: 'Apple Pay, Google Pay', enabled: true, icon: CreditCard },
  { id: 4, name: 'Gift Cards', description: 'Store gift cards', enabled: false, icon: CreditCard }
])

const saveSettings = () => {
  // Simulate saving settings
  alert('Settings saved successfully!')
}
</script>