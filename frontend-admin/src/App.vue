<template>
  <div class="flex min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-md p-6 fixed h-full">
      <NavbarPage />
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8 ml-64">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Coffee Shop</h1>
        <input
          type="text"
          placeholder="Search..."
          class="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <RouterView />

    </main>
  </div>
</template>

<script setup>
import NavbarPage from './layout/NavbarPage.vue';
</script>