<template>
  <div class="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Your Favorites</h1>
    
    <div v-if="cartStore.favorites.length === 0" class="text-center py-12">
      <p class="text-gray-600">No favorite items yet.</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="product in cartStore.favorites"
        :key="product.id"
        class="bg-white rounded-xl shadow hover:shadow-xl transition-shadow duration-300 flex flex-col"
      >
        <div class="relative w-full aspect-square overflow-hidden rounded-t-xl">
          <img
            :src="getImageUrl(product.image)"
            :alt="product.name"
            class="w-full h-full object-cover"
          />
          <button
            @click="cartStore.removeFromFavorites(product.id)"
            class="absolute top-2 left-2 p-2 bg-white rounded-full hover:bg-gray-100"
          >
            <i class="fas fa-heart text-red-500"></i>
          </button>
        </div>
        <div class="p-4 flex flex-col flex-1">
          <h2 class="text-lg font-bold text-gray-800 mb-1">{{ product.name }}</h2>
          <p class="text-orange-500 font-semibold text-sm mb-2">${{ product.price.toFixed(2) }}</p>
          <button
            @click="addToOrder(product)"
            class="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 transition-colors"
          >
            Add to Order
          </button>
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

const addToOrder = (product) => {
  cartStore.addToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: 1,
    image: product.image,
  });
};
</script>

<style scoped>
/* No changes needed */
</style>