<template>
  <div class="flex min-h-screen bg-gray-100 font-sans">
    <!-- Left Sidebar -->
    <SideBarLeft :products="products" @add-to-cart="addToCart" />

    <!-- Main Content -->
    <div class="flex-0.1 ml-13 p-6">
      <!-- Header -->
      <div class="flex items-center ml-12 justify-between mb-8">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Welcome, Coffee</h1>
          <p class="text-gray-500 text-sm">Discover whatever you need easily</p>
        </div>
        <div class="flex items-center space-x-4">
          <div class="relative">
            <input
              type="text"
              placeholder="Search product..."
              class="w-80 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-custom focus:border-transparent"
            />
            <i
              class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            ></i>
          </div>
          <button class="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <i class="fas fa-filter text-gray-400"></i>
          </button>
        </div>
      </div>

      <!-- Category Navigation -->
      <div class="flex space-x-6 mb-8 ml-12">
        <button class="text-gray-600 hover:text-orange-custom font-semibold">All</button>
        <button class="text-gray-600 hover:text-orange-custom font-semibold">Coffee</button>
        <button class="text-gray-600 hover:text-orange-custom font-semibold">Desserts</button>
        <button class="text-gray-600 hover:text-orange-custom font-semibold">Snacks</button>
      </div>

      <!-- Product Section -->
      <ProductPage />
    </div>

    <!-- Right Sidebar -->
    <SideBarRight :cart-items="cartItems" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SideBarLeft from './layout/SideBarLeft.vue';
import SideBarRight from './layout/SideBarRight.vue';
import ProductPage from './views/ProductPage.vue';

const products = ref([
  { name: 'appuccino', price: 4.99, image: 'https://via.placeholder.com/50', category: 'Coffee' },
  { name: 'Iced Caramel Latte', price: 5.25, image: 'https://via.placeholder.com/50', category: 'Coffee' },
  // Add more products as needed
]);

const cartItems = ref([]);

const addToCart = (product) => {
  const existingItem = cartItems.value.find(item => item.name === product.name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.value.push({ ...product, quantity: 1 });
  }
};
</script>

<style scoped>
@media (max-width: 768px) {
  .flex-1 {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>