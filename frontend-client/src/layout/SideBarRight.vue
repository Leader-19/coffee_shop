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

    <div class="space-y-4 overflow-y-auto flex-1">
      <div
        v-for="orderItem in cartStore.cartItems"
        :key="orderItem.id"
        class="flex items-center space-x-3"
      >
        <img
          :src="getImageUrl(orderItem.image)"
          :alt="orderItem.name || 'Product'"
          class="w-12 h-12 object-cover rounded-lg"
        />
        <div class="flex-1">
          <h4 class="font-medium text-gray-800 text-sm">
            {{ orderItem.name || 'Unnamed Product' }}
          </h4>
          <p class="text-orange-500 font-semibold text-sm">
            {{ isValidPrice(orderItem.price) ? `$ ${orderItem.price.toFixed(2)}` : 'Price N/A' }}
          </p>
        </div>
        <div class="flex items-center space-x-2">
          <span
            class="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 text-xs font-semibold"
          >
            {{ orderItem.quantity }}
          </span>
          <button
            class="text-gray-400 hover:text-red-500"
            @click="cartStore.removeFromCart(orderItem.id)"
            title="Remove"
          >
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="border-t pt-4 space-y-3 mt-4">
      <div class="flex justify-between text-sm">
        <span class="text-gray-600">Subtotal</span>
        <span class="font-semibold">${{ cartStore.subtotal() }}</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-gray-600">Total sales tax</span>
        <span class="font-semibold">${{ cartStore.tax() }}</span>
      </div>
      <div class="border-t pt-3">
        <div class="flex justify-between">
          <span class="font-semibold text-gray-800">Total</span>
          <span class="font-bold text-lg">${{ cartStore.total() }}</span>
        </div>
      </div>
    </div>

    <button
      class="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold mt-6 hover:bg-orange-600 transition-colors"
      :disabled="cartStore.cartItems.length === 0"
    >
      Continue to Payment
    </button>
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
</script>

<style scoped>
/* Optional: Add any custom styles here */
</style>
