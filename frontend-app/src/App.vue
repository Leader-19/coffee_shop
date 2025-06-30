<template>
  <div class="flex min-h-screen bg-gray-100 font-sans">
    <!-- Left Sidebar -->
    <SideBarLeft />
    
    <!-- Main Content -->
    <div class="flex-1 flex">
      <!-- Product Section -->
      <div class="flex-1 p-6">
        <!-- Header -->
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-2xl font-bold text-gray-800">Welcome, Gorry</h1>
            <p class="text-gray-500 text-sm">Discover whatever you need easily</p>
          </div>
          <div class="flex items-center space-x-4">
            <div class="relative">
              <input type="text" placeholder="Search product..." class="w-80 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-custom focus:border-transparent" />
              <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            <button class="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <i class="fas fa-filter text-gray-400"></i>
            </button>
          </div>
        </div>

        <!-- Category Navigation -->
        <div class="flex space-x-6 mb-8">
          <ProductPage />
          <!-- <ProductCard /> -->
        </div>

        <!-- Product Grid -->
        <div class="grid grid-cols-3 gap-6">
          <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
      </div>

      <!-- Right Sidebar -->
      <SideBarRight  />
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import ProductPage from "./views/ProductPage.vue";
import ProductCard from "./components/ProductCard.vue";
import SideBarLeft from "./layout/SideBarLeft.vue";
import SideBarRight from "./layout/SideBarRight.vue";

</script>
