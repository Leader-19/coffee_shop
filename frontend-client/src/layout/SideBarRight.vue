<template>
  <div
    class="fixed top-0 right-0 w-80 h-screen bg-white p-6 shadow-lg border-l border-gray-100 z-50 flex flex-col"
  >
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-lg font-semibold text-gray-800">Current Order</h2>
      <button class="p-2 hover:bg-gray-50 rounded-lg">
        <i class="fas fa-ellipsis-h text-gray-400"></i>
      </button>
    </div>

    <!-- Order Items -->
    <div class="space-y-4 overflow-y-auto flex-1">
      <div
        v-for="orderItem in cartItems"
        :key="orderItem.name"
        class="flex items-center space-x-3"
      >
        <img
          :src="orderItem.image"
          :alt="orderItem.name"
          class="w-12 h-12 object-cover rounded-lg"
        />
        <div class="flex-1">
          <h4 class="font-medium text-gray-800 text-sm">{{ orderItem.name }}</h4>
          <p class="text-orange-500 font-semibold text-sm">${{ orderItem.price }}</p>
        </div>
        <div>
          <span
            class="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 text-xs font-semibold"
          >
            {{ orderItem.quantity }}
          </span>
        </div>
      </div>
    </div>

    <!-- Summary -->
    <div class="border-t pt-4 space-y-3 mt-4">
      <div class="flex justify-between text-sm">
        <span class="text-gray-600">Subtotal</span>
        <span class="font-semibold">${{ subtotal }}</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-gray-600">Total sales tax</span>
        <span class="font-semibold">${{ tax }}</span>
      </div>
      <div class="border-t pt-3">
        <div class="flex justify-between">
          <span class="font-semibold text-gray-800">Total</span>
          <span class="font-bold text-lg">${{ total }}</span>
        </div>
      </div>
    </div>

    <button
      class="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold mt-6 hover:bg-orange-600 transition-colors"
    >
      Continue to Payment
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const cartItems = ref([
  { name: 'Iced Caramel Latte', price: 5.25, quantity: 3, image: 'https://via.placeholder.com/50' },
  { name: 'Cappuccino', price: 4.99, quantity: 2, image: 'https://via.placeholder.com/50' },
]);

const subtotal = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
);

const taxRate = 0.06;
const tax = computed(() => (subtotal.value * taxRate).toFixed(2));
const total = computed(() => (parseFloat(subtotal.value) + parseFloat(tax.value)).toFixed(2));
</script>
