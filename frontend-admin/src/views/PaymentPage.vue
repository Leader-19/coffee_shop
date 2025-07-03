<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center gap-3">
            <CoffeeIcon class="h-8 w-8 text-amber-600" />
            <div>
              <h1 class="text-xl font-bold text-gray-900">Brew & Bean Café</h1>
              <p class="text-sm text-gray-600">Premium Coffee Experience</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="relative">
              <ShoppingCartIcon class="h-6 w-6 text-gray-600" />
              <span v-if="cartItems.length > 0" 
                    class="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {{ cartItems.length }}
              </span>
            </div>
            <span class="text-lg font-bold text-gray-900">${{ cartTotal.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Menu Section -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-xl font-semibold text-gray-900">Our Menu</h2>
              <p class="text-sm text-gray-600 mt-1">Select your favorite items</p>
            </div>

            <!-- Menu Categories -->
            <div class="px-6 py-4 border-b border-gray-200">
              <div class="flex gap-4 overflow-x-auto">
                <button
                  v-for="category in categories"
                  :key="category"
                  @click="selectedCategory = category"
                  class="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
                  :class="selectedCategory === category 
                    ? 'bg-amber-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
                >
                  {{ category }}
                </button>
              </div>
            </div>

            <!-- Menu Items -->
            <div class="p-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  v-for="item in filteredMenuItems"
                  :key="item.id"
                  class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div class="flex justify-between items-start mb-3">
                    <div class="flex-1">
                      <h3 class="font-semibold text-gray-900">{{ item.name }}</h3>
                      <p class="text-sm text-gray-600 mt-1">{{ item.description }}</p>
                      <div class="flex items-center gap-1 mt-2">
                        <StarIcon v-for="star in 5" :key="star" 
                          class="h-4 w-4" 
                          :class="star <= item.rating ? 'text-yellow-400' : 'text-gray-300'" 
                        />
                        <span class="text-sm text-gray-500 ml-1">({{ item.reviews }})</span>
                      </div>
                    </div>
                    <div class="text-right ml-4">
                      <p class="text-lg font-bold text-gray-900">${{ item.price.toFixed(2) }}</p>
                      <button
                        @click="addToCart(item)"
                        class="mt-2 bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded-md text-sm transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Cart & Payment Section -->
        <div class="space-y-6">
          <!-- Cart Summary -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900">Your Order</h3>
            </div>
            <div class="p-6">
              <div v-if="cartItems.length === 0" class="text-center py-8">
                <ShoppingCartIcon class="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p class="text-gray-500">Your cart is empty</p>
                <p class="text-sm text-gray-400">Add some delicious items!</p>
              </div>
              
              <div v-else class="space-y-4">
                <div v-for="item in cartItems" :key="item.id" class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                      <CoffeeIcon class="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <p class="font-medium text-gray-900">{{ item.name }}</p>
                      <p class="text-sm text-gray-500">Qty: {{ item.quantity }}</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="font-semibold text-gray-900">${{ (item.price * item.quantity).toFixed(2) }}</span>
                    <button
                      @click="removeFromCart(item.id)"
                      class="text-red-500 hover:text-red-700 p-1"
                    >
                      <XIcon class="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <!-- Order Summary -->
                <div class="border-t border-gray-200 pt-4 space-y-2">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Subtotal</span>
                    <span class="text-gray-900">${{ subtotal.toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Tax (8.5%)</span>
                    <span class="text-gray-900">${{ tax.toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Tip</span>
                    <span class="text-gray-900">${{ tip.toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                    <span>Total</span>
                    <span>${{ cartTotal.toFixed(2) }}</span>
                  </div>
                </div>

                <!-- Tip Selection -->
                <div class="border-t border-gray-200 pt-4">
                  <p class="text-sm font-medium text-gray-700 mb-3">Add Tip</p>
                  <div class="grid grid-cols-4 gap-2">
                    <button
                      v-for="tipOption in tipOptions"
                      :key="tipOption"
                      @click="selectedTip = tipOption"
                      class="px-3 py-2 text-sm rounded-md border transition-colors"
                      :class="selectedTip === tipOption 
                        ? 'bg-amber-600 text-white border-amber-600' 
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'"
                    >
                      {{ tipOption }}%
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Methods -->
          <div v-if="cartItems.length > 0" class="bg-white rounded-xl shadow-sm border border-gray-100">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900">Payment Method</h3>
            </div>
            <div class="p-6 space-y-4">
              <!-- Payment Method Selection -->
              <div class="grid grid-cols-1 gap-3">
                <label
                  v-for="method in paymentMethods"
                  :key="method.id"
                  class="flex items-center p-4 border rounded-lg cursor-pointer transition-colors"
                  :class="selectedPaymentMethod === method.id 
                    ? 'border-amber-600 bg-amber-50' 
                    : 'border-gray-200 hover:bg-gray-50'"
                >
                  <input
                    type="radio"
                    :value="method.id"
                    v-model="selectedPaymentMethod"
                    class="sr-only"
                  />
                  <component :is="method.icon" class="h-6 w-6 text-gray-600 mr-3" />
                  <div class="flex-1">
                    <p class="font-medium text-gray-900">{{ method.name }}</p>
                    <p class="text-sm text-gray-500">{{ method.description }}</p>
                  </div>
                  <div v-if="selectedPaymentMethod === method.id" class="text-amber-600">
                    <CheckCircleIcon class="h-5 w-5" />
                  </div>
                </label>
              </div>

              <!-- Card Payment Form -->
              <div v-if="selectedPaymentMethod === 'card'" class="space-y-4 pt-4 border-t border-gray-200">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                  <input
                    v-model="cardForm.number"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                    <input
                      v-model="cardForm.expiry"
                      type="text"
                      placeholder="MM/YY"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                    <input
                      v-model="cardForm.cvv"
                      type="text"
                      placeholder="123"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                  <input
                    v-model="cardForm.name"
                    type="text"
                    placeholder="John Doe"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>

              <!-- Process Payment Button -->
              <button
                @click="processPayment"
                :disabled="isProcessing"
                class="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <LoaderIcon v-if="isProcessing" class="h-5 w-5 animate-spin" />
                <span>{{ isProcessing ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}` }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <div class="text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircleIcon class="h-8 w-8 text-green-600" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Payment Successful!</h3>
          <p class="text-gray-600 mb-6">Your order has been confirmed and will be ready shortly.</p>
          
          <!-- Receipt -->
          <div class="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <div class="flex justify-between items-center mb-3">
              <span class="font-medium">Order #{{ orderNumber }}</span>
              <span class="text-sm text-gray-500">{{ formatTime(new Date()) }}</span>
            </div>
            <div class="space-y-2 text-sm">
              <div v-for="item in cartItems" :key="item.id" class="flex justify-between">
                <span>{{ item.name }} x{{ item.quantity }}</span>
                <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
              <div class="border-t border-gray-300 pt-2 font-medium">
                <div class="flex justify-between">
                  <span>Total Paid</span>
                  <span>${{ cartTotal.toFixed(2) }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex gap-3">
            <button
              @click="downloadReceipt"
              class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors"
            >
              Download Receipt
            </button>
            <button
              @click="startNewOrder"
              class="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              New Order
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { 
  CoffeeIcon, 
  ShoppingCartIcon, 
  StarIcon, 
  XIcon, 
  CheckCircleIcon,
  CreditCardIcon,
  SmartphoneIcon,
  DollarSignIcon,
  LoaderIcon
} from 'lucide-vue-next'

// Reactive data
const selectedCategory = ref('Coffee')
const selectedPaymentMethod = ref('card')
const selectedTip = ref(15)
const isProcessing = ref(false)
const showSuccessModal = ref(false)
const orderNumber = ref('')

const categories = ['Coffee', 'Tea', 'Pastries', 'Sandwiches', 'Desserts']
const tipOptions = [10, 15, 20, 25]

const cartItems = ref([])

const cardForm = reactive({
  number: '',
  expiry: '',
  cvv: '',
  name: ''
})

// Menu items
const menuItems = ref([
  {
    id: 1,
    name: 'Cappuccino',
    description: 'Rich espresso with steamed milk foam',
    price: 4.50,
    category: 'Coffee',
    rating: 5,
    reviews: 124
  },
  {
    id: 2,
    name: 'Latte',
    description: 'Smooth espresso with steamed milk',
    price: 4.25,
    category: 'Coffee',
    rating: 5,
    reviews: 98
  },
  {
    id: 3,
    name: 'Americano',
    description: 'Bold espresso with hot water',
    price: 3.75,
    category: 'Coffee',
    rating: 4,
    reviews: 76
  },
  {
    id: 4,
    name: 'Mocha',
    description: 'Espresso with chocolate and steamed milk',
    price: 5.25,
    category: 'Coffee',
    rating: 5,
    reviews: 156
  },
  {
    id: 5,
    name: 'Green Tea',
    description: 'Premium organic green tea',
    price: 3.25,
    category: 'Tea',
    rating: 4,
    reviews: 45
  },
  {
    id: 6,
    name: 'Earl Grey',
    description: 'Classic black tea with bergamot',
    price: 3.50,
    category: 'Tea',
    rating: 4,
    reviews: 67
  },
  {
    id: 7,
    name: 'Croissant',
    description: 'Buttery, flaky French pastry',
    price: 3.95,
    category: 'Pastries',
    rating: 5,
    reviews: 89
  },
  {
    id: 8,
    name: 'Blueberry Muffin',
    description: 'Fresh baked with wild blueberries',
    price: 4.25,
    category: 'Pastries',
    rating: 4,
    reviews: 112
  }
])

const paymentMethods = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    description: 'Visa, Mastercard, American Express',
    icon: CreditCardIcon
  },
  {
    id: 'digital',
    name: 'Digital Wallet',
    description: 'Apple Pay, Google Pay, Samsung Pay',
    icon: SmartphoneIcon
  },
  {
    id: 'cash',
    name: 'Cash',
    description: 'Pay with cash at the counter',
    icon: DollarSignIcon
  }
]

// Computed properties
const filteredMenuItems = computed(() => {
  return menuItems.value.filter(item => item.category === selectedCategory.value)
})

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const tax = computed(() => {
  return subtotal.value * 0.085 // 8.5% tax
})

const tip = computed(() => {
  return subtotal.value * (selectedTip.value / 100)
})

const cartTotal = computed(() => {
  return subtotal.value + tax.value + tip.value
})

// Methods
const addToCart = (item) => {
  const existingItem = cartItems.value.find(cartItem => cartItem.id === item.id)
  
  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cartItems.value.push({
      ...item,
      quantity: 1
    })
  }
}

const removeFromCart = (itemId) => {
  const index = cartItems.value.findIndex(item => item.id === itemId)
  if (index > -1) {
    if (cartItems.value[index].quantity > 1) {
      cartItems.value[index].quantity -= 1
    } else {
      cartItems.value.splice(index, 1)
    }
  }
}

const processPayment = async () => {
  if (cartItems.value.length === 0) return
  
  isProcessing.value = true
  
  // Simulate payment processing
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Generate order number
  orderNumber.value = Math.random().toString(36).substr(2, 9).toUpperCase()
  
  isProcessing.value = false
  showSuccessModal.value = true
}

const downloadReceipt = () => {
  // Simulate receipt download
  const receiptData = {
    orderNumber: orderNumber.value,
    items: cartItems.value,
    subtotal: subtotal.value,
    tax: tax.value,
    tip: tip.value,
    total: cartTotal.value,
    timestamp: new Date()
  }
  
  console.log('Receipt downloaded:', receiptData)
  alert('Receipt downloaded successfully!')
}

const startNewOrder = () => {
  cartItems.value = []
  showSuccessModal.value = false
  selectedPaymentMethod.value = 'card'
  selectedTip.value = 15
  cardForm.number = ''
  cardForm.expiry = ''
  cardForm.cvv = ''
  cardForm.name = ''
}

const formatTime = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(date)
}
</script>