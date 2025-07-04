<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Payment Tracker</h1>
            <p class="text-gray-600 mt-1">Monitor payment status for all orders</p>
          </div>
          
          <!-- Stats -->
          <div class="flex gap-4">
            <div class="bg-green-50 px-4 py-2 rounded-lg">
              <div class="text-sm text-green-600 font-medium">Paid</div>
              <div class="text-xl font-bold text-green-700">{{ paidCount }}</div>
            </div>
            <div class="bg-red-50 px-4 py-2 rounded-lg">
              <div class="text-sm text-red-600 font-medium">Unpaid</div>
              <div class="text-xl font-bold text-red-700">{{ unpaidCount }}</div>
            </div>
            <div class="bg-blue-50 px-4 py-2 rounded-lg">
              <div class="text-sm text-blue-600 font-medium">Total</div>
              <div class="text-xl font-bold text-blue-700">${{ totalAmount.toFixed(2) }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div class="flex flex-col sm:flex-row gap-4">
          <!-- Status Filter -->
          <div class="flex gap-2">
            <button
              @click="selectedFilter = 'all'"
              :class="selectedFilter === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              All ({{ orders.length }})
            </button>
            <button
              @click="selectedFilter = 'paid'"
              :class="selectedFilter === 'paid' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Paid ({{ paidCount }})
            </button>
            <button
              @click="selectedFilter = 'unpaid'"
              :class="selectedFilter === 'unpaid' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Unpaid ({{ unpaidCount }})
            </button>
          </div>

          <!-- Search -->
          <div class="flex-1 max-w-md">
            <div class="relative">
              <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by name, email, or order ID..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Orders Table -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Details
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-gray-50">
                <!-- Customer Info -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <UserIcon class="h-5 w-5 text-gray-600" />
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ order.customerName }}</div>
                      <div class="text-sm text-gray-500">{{ order.customerEmail }}</div>
                    </div>
                  </div>
                </td>

                <!-- Order Details -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">#{{ order.orderNumber }}</div>
                  <div class="text-sm text-gray-500">{{ order.items.length }} items</div>
                </td>

                <!-- Amount -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">${{ order.amount.toFixed(2) }}</div>
                  <div class="text-sm text-gray-500">{{ order.paymentMethod }}</div>
                </td>

                <!-- Payment Status -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="order.isPaid 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'"
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  >
                    <CheckCircleIcon v-if="order.isPaid" class="h-3 w-3 mr-1" />
                    <XCircleIcon v-else class="h-3 w-3 mr-1" />
                    {{ order.isPaid ? 'Paid' : 'Unpaid' }}
                  </span>
                  <div v-if="order.isPaid && order.paidAt" class="text-xs text-gray-500 mt-1">
                    Paid: {{ formatDate(order.paidAt) }}
                  </div>
                </td>

                <!-- Date -->
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(order.createdAt) }}
                </td>

                <!-- Actions -->
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex gap-2">
                    <button
                      v-if="!order.isPaid"
                      @click="markAsPaid(order.id)"
                      class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs transition-colors"
                    >
                      Mark Paid
                    </button>
                    <button
                      v-else
                      @click="markAsUnpaid(order.id)"
                      class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition-colors"
                    >
                      Mark Unpaid
                    </button>
                    <button
                      @click="viewOrderDetails(order)"
                      class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="filteredOrders.length === 0" class="text-center py-12">
          <CreditCardIcon class="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p class="text-gray-500 text-lg">No orders found</p>
          <p class="text-gray-400 text-sm">Try adjusting your filters or search query</p>
        </div>
      </div>
    </div>

    <!-- Order Details Modal -->
    <div v-if="selectedOrder" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h3 class="text-xl font-semibold text-gray-900">Order Details</h3>
              <p class="text-gray-600">#{{ selectedOrder.orderNumber }}</p>
            </div>
            <button
              @click="selectedOrder = null"
              class="text-gray-400 hover:text-gray-600"
            >
              <XIcon class="h-6 w-6" />
            </button>
          </div>

          <!-- Customer Info -->
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 class="font-medium text-gray-900 mb-2">Customer Information</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-gray-600">Name:</span>
                <span class="ml-2 text-gray-900">{{ selectedOrder.customerName }}</span>
              </div>
              <div>
                <span class="text-gray-600">Email:</span>
                <span class="ml-2 text-gray-900">{{ selectedOrder.customerEmail }}</span>
              </div>
              <div>
                <span class="text-gray-600">Phone:</span>
                <span class="ml-2 text-gray-900">{{ selectedOrder.customerPhone }}</span>
              </div>
              <div>
                <span class="text-gray-600">Payment Method:</span>
                <span class="ml-2 text-gray-900">{{ selectedOrder.paymentMethod }}</span>
              </div>
            </div>
          </div>

          <!-- Order Items -->
          <div class="mb-6">
            <h4 class="font-medium text-gray-900 mb-3">Order Items</h4>
            <div class="space-y-3">
              <div
                v-for="item in selectedOrder.items"
                :key="item.id"
                class="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <div class="font-medium text-gray-900">{{ item.name }}</div>
                  <div class="text-sm text-gray-600">Qty: {{ item.quantity }}</div>
                </div>
                <div class="text-right">
                  <div class="font-medium text-gray-900">${{ (item.price * item.quantity).toFixed(2) }}</div>
                  <div class="text-sm text-gray-600">${{ item.price.toFixed(2) }} each</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Summary -->
          <div class="border-t border-gray-200 pt-4">
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Subtotal:</span>
                <span class="text-gray-900">${{ selectedOrder.subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Tax:</span>
                <span class="text-gray-900">${{ selectedOrder.tax.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Tip:</span>
                <span class="text-gray-900">${{ selectedOrder.tip.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                <span>Total:</span>
                <span>${{ selectedOrder.amount.toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <!-- Payment Status Actions -->
          <div class="mt-6 flex gap-3">
            <button
              v-if="!selectedOrder.isPaid"
              @click="markAsPaid(selectedOrder.id); selectedOrder = null"
              class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Mark as Paid
            </button>
            <button
              v-else
              @click="markAsUnpaid(selectedOrder.id); selectedOrder = null"
              class="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Mark as Unpaid
            </button>
            <button
              @click="selectedOrder = null"
              class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  SearchIcon,
  UserIcon,
  CheckCircleIcon,
  XCircleIcon,
  XIcon,
  CreditCardIcon
} from 'lucide-vue-next'

// Reactive data
const selectedFilter = ref('all')
const searchQuery = ref('')
const selectedOrder = ref(null)

// Sample orders data
const orders = ref([
  {
    id: 1,
    orderNumber: 'ORD001',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '+1 (555) 123-4567',
    amount: 24.75,
    subtotal: 20.50,
    tax: 1.75,
    tip: 2.50,
    paymentMethod: 'Credit Card',
    isPaid: true,
    paidAt: new Date('2024-01-15T10:30:00'),
    createdAt: new Date('2024-01-15T09:15:00'),
    items: [
      { id: 1, name: 'Cappuccino', price: 4.50, quantity: 2 },
      { id: 2, name: 'Croissant', price: 3.95, quantity: 1 },
      { id: 3, name: 'Latte', price: 4.25, quantity: 2 }
    ]
  },
  {
    id: 2,
    orderNumber: 'ORD002',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    customerPhone: '+1 (555) 987-6543',
    amount: 18.50,
    subtotal: 15.75,
    tax: 1.34,
    tip: 1.41,
    paymentMethod: 'Digital Wallet',
    isPaid: false,
    paidAt: null,
    createdAt: new Date('2024-01-15T11:20:00'),
    items: [
      { id: 4, name: 'Green Tea', price: 3.25, quantity: 1 },
      { id: 5, name: 'Blueberry Muffin', price: 4.25, quantity: 2 },
      { id: 6, name: 'Americano', price: 3.75, quantity: 2 }
    ]
  },
  {
    id: 3,
    orderNumber: 'ORD003',
    customerName: 'Mike Johnson',
    customerEmail: 'mike@example.com',
    customerPhone: '+1 (555) 456-7890',
    amount: 32.25,
    subtotal: 28.00,
    tax: 2.38,
    tip: 1.87,
    paymentMethod: 'Cash',
    isPaid: true,
    paidAt: new Date('2024-01-15T12:45:00'),
    createdAt: new Date('2024-01-15T12:30:00'),
    items: [
      { id: 7, name: 'Mocha', price: 5.25, quantity: 3 },
      { id: 8, name: 'Croissant', price: 3.95, quantity: 2 },
      { id: 9, name: 'Earl Grey', price: 3.50, quantity: 2 }
    ]
  },
  {
    id: 4,
    orderNumber: 'ORD004',
    customerName: 'Sarah Wilson',
    customerEmail: 'sarah@example.com',
    customerPhone: '+1 (555) 321-0987',
    amount: 15.75,
    subtotal: 13.50,
    tax: 1.15,
    tip: 1.10,
    paymentMethod: 'Credit Card',
    isPaid: false,
    paidAt: null,
    createdAt: new Date('2024-01-15T13:15:00'),
    items: [
      { id: 10, name: 'Latte', price: 4.25, quantity: 2 },
      { id: 11, name: 'Cappuccino', price: 4.50, quantity: 1 }
    ]
  },
  {
    id: 5,
    orderNumber: 'ORD005',
    customerName: 'David Brown',
    customerEmail: 'david@example.com',
    customerPhone: '+1 (555) 654-3210',
    amount: 27.90,
    subtotal: 24.25,
    tax: 2.06,
    tip: 1.59,
    paymentMethod: 'Digital Wallet',
    isPaid: true,
    paidAt: new Date('2024-01-15T14:20:00'),
    createdAt: new Date('2024-01-15T14:00:00'),
    items: [
      { id: 12, name: 'Mocha', price: 5.25, quantity: 2 },
      { id: 13, name: 'Blueberry Muffin', price: 4.25, quantity: 1 },
      { id: 14, name: 'Green Tea', price: 3.25, quantity: 3 }
    ]
  }
])

// Computed properties
const filteredOrders = computed(() => {
  let filtered = orders.value

  // Filter by payment status
  if (selectedFilter.value === 'paid') {
    filtered = filtered.filter(order => order.isPaid)
  } else if (selectedFilter.value === 'unpaid') {
    filtered = filtered.filter(order => !order.isPaid)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(order =>
      order.customerName.toLowerCase().includes(query) ||
      order.customerEmail.toLowerCase().includes(query) ||
      order.orderNumber.toLowerCase().includes(query)
    )
  }

  return filtered
})

const paidCount = computed(() => {
  return orders.value.filter(order => order.isPaid).length
})

const unpaidCount = computed(() => {
  return orders.value.filter(order => !order.isPaid).length
})

const totalAmount = computed(() => {
  return orders.value.reduce((sum, order) => sum + order.amount, 0)
})

// Methods
const markAsPaid = (orderId) => {
  const order = orders.value.find(o => o.id === orderId)
  if (order) {
    order.isPaid = true
    order.paidAt = new Date()
  }
}

const markAsUnpaid = (orderId) => {
  const order = orders.value.find(o => o.id === orderId)
  if (order) {
    order.isPaid = false
    order.paidAt = null
  }
}

const viewOrderDetails = (order) => {
  selectedOrder.value = order
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}
</script>