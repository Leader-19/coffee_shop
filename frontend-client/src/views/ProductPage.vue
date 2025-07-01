<template>
  <div v-for="product in products" :key="product.id">
    <h2>{{ product.name }}</h2>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const products = ref([])

const fetchData = () => {
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      products.value = response.data
      console.log(products)
    })
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
/* Add your styles here */
</style>
