<template>
  <ProductPage @data="handleData" />
  <ProductCard :products="products" />
</template>

<script setup>
import { ref } from "vue";
import ProductPage from "./views/ProductPage.vue";
import ProductCard from "./components/ProductCard.vue";

const products = ref([]);

const handleData = (data) => {
  products.value = data;
  console.log("Products in App.vue", products.value);
};
</script>
