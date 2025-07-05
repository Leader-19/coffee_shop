<template>
  <div class="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen ml-20 mr-80">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Your Orders</h1>
    
    <div v-if="cartStore.cartItems.length === 0" class="text-center py-12">
      <p class="text-gray-600">No orders placed yet.</p>
    </div>

    <div v-else class="space-y-6">
      <div
        class="bg-white rounded-xl shadow hover:shadow-xl transition-shadow duration-300 p-6"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-gray-800">Current Order</h2>
          <span class="text-sm text-gray-500">{{ formatDate(new Date()) }}</span>
        </div>
        
        <div class="space-y-4">
          <div
            v-for="item in cartStore.cartItems"
            :key="item.id"
            class="flex items-center space-x-3"
          >
            <img
              :src="getImageUrl(item.image)"
              :alt="item.name || 'Product'"
              class="w-12 h-12 object-cover rounded-lg"
            />
            <div class="flex-1">
              <h4 class="font-medium text-gray-800 text-sm">{{ item.name || 'Unnamed Product' }}</h4>
              <p class="text-orange-500 font-semibold text-sm">
                {{ isValidPrice(item.price) ? `$ ${item.price.toFixed(2)}` : 'Price N/A' }}
              </p>
            </div>
            <div>
              <span class="text-gray-700 text-sm">Qty: {{ item.quantity }}</span>
            </div>
          </div>
        </div>

        <div class="border-t pt-4 mt-4">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Subtotal</span>
            <span class="font-semibold">${{ cartStore.subtotal() }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Total sales tax</span>
            <span class="font-semibold">${{ cartStore.tax() }}</span>
          </div>
          <div class="flex justify-between font-semibold text-gray-800">
            <span>Total</span>
            <span>${{ cartStore.total() }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();

const getImageUrl = (path) => {
  if (!path) return 'https://via.placeholder.com/256x256';
  return `http://127.0.0.1:8000/storage/${path}`;
};

const isValidPrice = (price) => {
  return typeof price === 'number' && !isNaN(price) && price >= 0;
};

const formatDate = (date) => {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};
</script>

<style scoped>
/* No changes needed */
</style>