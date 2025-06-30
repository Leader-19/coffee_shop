<template>
  <!-- You can optionally list them here too -->
   <div v-for="product in products" :key="product.id">
    {{ product.name }}
    {{ product.description }}
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const products = ref([]);
const emit = defineEmits(['data']);

const fetchProducts = () => {
  axios
    .get("http://127.0.0.1:8000/api/products")
    .then(response => {
      products.value = response.data;
      emit('data', products.value);
    })
    .catch(error => {
      console.error("Failed to fetch products:", error);
    });
};

onMounted(() => {
  fetchProducts();
});
</script>
