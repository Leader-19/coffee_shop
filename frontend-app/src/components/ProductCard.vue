<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5">
    <a
      v-for="product in products.data"
      :key="product.id"
      href="#"
      class="block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {{ product.name }}
      </h5>
      <p class="font-normal text-gray-700 dark:text-gray-400">
        {{ product.description }}
      </p>
      <p class="font-normal text-gray-700 dark:text-gray-400">
        {{ product.price }}
      </p>
    </a>
  </div>
</template>

<script setup>
const props = defineProps(['products']);
</script>
