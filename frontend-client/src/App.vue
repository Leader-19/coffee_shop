<template>
  <div class="flex bg-gray-100 font-sans min-h-screen">
    <!-- Left Sidebar -->
    <SideBarLeft class="hidden lg:flex" />

    <!-- Right Sidebar -->
    <SideBarRight class="hidden lg:flex" />

    <!-- Main Content -->
    <main class="flex-1 p-6 lg:ml-20 lg:mr-80">
      <!-- HEADER -->
      <div class="flex flex-col lg:flex-row justify-between items-center mb-8">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Welcome, Coffee</h1>
          <p class="text-gray-500 text-sm">Discover whatever you need easily</p>
        </div>
        <div class="flex items-center gap-2 mt-4 lg:mt-0 w-full lg:w-auto">
          <div class="relative w-full lg:w-80">
            <input
              type="text"
              placeholder="Search product..."
              class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <i
              class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            ></i>
          </div>
          <button class="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 hidden lg:block">
            <i class="fas fa-filter text-gray-400"></i>
          </button>
        </div>
      </div>

      <!-- CATEGORY NAV -->
      <div class="flex flex-wrap gap-4 mb-8">
        <button class="text-gray-600 hover:text-orange-500 font-semibold">All</button>
        <button class="text-gray-600 hover:text-orange-500 font-semibold">Coffee</button>
        <button class="text-gray-600 hover:text-orange-500 font-semibold">Desserts</button>
        <button class="text-gray-600 hover:text-orange-500 font-semibold">Snacks</button>
      </div>

      <!-- PRODUCTS -->
      <router-view />
      <FooterPage />
    </main>
  </div>
</template>

<script setup>
import SideBarLeft from './layout/SideBarLeft.vue';
import SideBarRight from './layout/SideBarRight.vue';
import FooterPage from './layout/FooterPage.vue';
</script>