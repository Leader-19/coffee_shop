<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5">
    <a
      v-for="product in products"
      :key="product.id"
      href="#"
      class="block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100"
    >
      <img
        v-if="product.image"
        :src="product.image"
        alt="product image"
        class="w-full h-40 object-cover mb-4 rounded"
      />
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
        {{ product.name }}
      </h5>
      <p class="font-normal text-gray-700">
        {{ product.description }}
      </p>
      <p class="font-normal text-gray-700">
        ${{ product.price }}
      </p>
    </a>
  </div>
</template>

<script setup>
defineProps(['products']);
</script>
