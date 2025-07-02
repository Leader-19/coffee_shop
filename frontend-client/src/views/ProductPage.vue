<template>
  <div class="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 m-5">
    <div v-if="loading" class="text-center py-10">
      <p class="text-gray-600">Loading products...</p>
    </div>
    <div v-else-if="products.data.length === 0" class="text-center py-10">
      <p class="text-gray-600">No products available.</p>
    </div>
    <div v-else v-for="product in products.data" :key="product.id"
      class="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm hover:shadow-xl transition-shadow duration-300">
      <!-- Product Image -->
      <div class="relative">
        <img :src="getImageUrl(product.image)" alt="Product Image" class="w-full h-64 object-cover" />
        <div v-if="product.discount"
          class="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
          -{{ product.discount }}%
        </div>
      </div>

      <!-- Product Info -->
      <div class="p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-2">{{ product.name }}</h2>
        <p class="text-gray-600 text-sm mb-4">{{ product.description }}</p>

        <!-- Price -->
        <div class="flex items-center mb-4">
          <span class="text-2xl font-bold text-gray-900">
            ${{ (product.price * (1 - (product.discount || 0) / 100)).toFixed(2) }}
          </span>
          <span v-if="product.discount" class="text-lg text-gray-500 line-through ml-2">
            ${{ product.price.toFixed(2) }}
          </span>
        </div>

        <!-- Quantity Controls -->
        <div class="flex items-center justify-between mb-6">
          <span class="text-gray-700 font-medium">Quantity:</span>
          <div class="flex items-center border border-gray-300 rounded-lg">
            <button @click="decreaseQuantity(product.id)"
              class="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-200 rounded-l-lg"
              :disabled="quantities[product.id] <= 1">
              -
            </button>
            <span class="px-4 py-2 text-gray-800 font-semibold border-l border-r border-gray-300">
              {{ quantities[product.id] }}
            </span>
            <button @click="increaseQuantity(product.id)"
              class="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-200 rounded-r-lg">
              +
            </button>
          </div>
        </div>

        <!-- Total Price -->
        <div class="flex items-center justify-between mb-4">
          <span class="text-gray-700 font-medium">Total:</span>
          <span class="text-xl font-bold text-gray-900">
            {{
              (
                product.price *
                (1 - (product.discount || 0) / 100) *
                quantities[product.id]
              ).toFixed(2)
            }}
          </span>
        </div>

        <!-- Add to Order Button -->
        <button @click="addToOrder(product)"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          :disabled="loading">
          Add to Order
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const products = ref({ data: [] });
const loading = ref(true);
const quantities = ref({});

const fetchData = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
    const response = await axios.get(`${apiUrl}/products`);
    products.value = response.data;

    console.log(products)

    // Initialize quantities for each product
    products.value.data.forEach((product) => {
      quantities.value[product.id] = quantities.value[product.id] || 1;
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    products.value.data = []; // Reset to empty array on error
  } finally {
    loading.value = false;
  }
};

const getImageUrl = (imagePath) => {
  if (!imagePath) return 'https://via.placeholder.com/256x256';
  return `http://127.0.0.1:8000/storage/${imagePath}`;
};


const increaseQuantity = (productId) => {
  quantities.value[productId] = (quantities.value[productId] || 1) + 1;
};

const decreaseQuantity = (productId) => {
  if ((quantities.value[productId] || 1) > 1) {
    quantities.value[productId] -= 1;
  }
};

const addToOrder = (product) => {
  const item = {
    id: product.id,
    name: product.name,
    price: product.price * (1 - (product.discount || 0) / 100),
    quantity: quantities.value[product.id],
    image: product.image || 'https://via.placeholder.com/256x256',
  };
  emit('add-to-cart', item); // Emit event to parent component
};

defineEmits(['add-to-cart']);

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
/* Optional styling for better visuals */
.container {
  padding: 1rem;
}

button:disabled {
  background-color: #93c5fd;
  cursor: not-allowed;
}

.hover:shadow-xl:hover {
  transform: translateY(-2px);
  transition: all 0.3s ease;
}
</style>