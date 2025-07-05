<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-if="loading" class="col-span-full text-center py-12">
        <p class="text-gray-600">Loading products...</p>
      </div>
      <div v-else-if="products.data.length === 0" class="col-span-full text-center py-12">
        <p class="text-gray-600">No products available.</p>
      </div>
      <div
        v-else
        v-for="product in products.data"
        :key="product.id"
        class="bg-white rounded-xl shadow hover:shadow-xl transition-shadow duration-300 flex flex-col"
      >
        <div class="relative w-full aspect-square overflow-hidden rounded-t-xl">
          <img
            :src="getImageUrl(product.image)"
            :alt="product.name || 'Product'"
            class="w-full h-full object-cover"
          />
          <div
            v-if="product.discount"
            class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold"
          >
            -{{ product.discount }}%
          </div>
          <button
            @click="toggleFavorite(product)"
            class="absolute top-2 left-2 p-2 bg-white rounded-full hover:bg-gray-100"
            :disabled="!isValidPrice(product.price)"
          >
            <i
              :class="[
                'fas fa-heart',
                cartStore.favorites.some(item => item.id === product.id)
                  ? 'text-red-500'
                  : 'text-gray-400'
              ]"
            ></i>
          </button>
        </div>
        <div class="p-4 flex flex-col flex-1">
          <h2 class="text-lg font-bold text-gray-800 mb-1">{{ product.name || 'Unnamed Product' }}</h2>
          <p class="text-gray-500 text-sm mb-2 line-clamp-2">{{ product.description || 'No description' }}</p>
          <div class="flex items-center mb-2">
            <span class="text-xl font-bold text-gray-900">
              ${{ isValidPrice(product.price) ? discountedPrice(product).toFixed(2) : 'N/A' }}
            </span>
            <span v-if="product.discount" class="text-gray-400 line-through ml-2 text-sm">
              ${{ isValidPrice(product.price) ? parseFloat(product.price).toFixed(2) : 'N/A' }}
            </span>
          </div>
          <div class="flex justify-between items-center mb-2 mt-auto">
            <span class="text-gray-700 text-sm">Quantity:</span>
            <div class="flex items-center border rounded-lg overflow-hidden">
              <button
                @click="decreaseQuantity(product.id)"
                class="px-2 py-1 hover:bg-gray-100"
                :disabled="quantities[product.id] <= 1"
              >
                <i class="fas fa-minus text-gray-600 text-xs"></i>
              </button>
              <span class="px-3 py-1 text-gray-800 font-semibold">
                {{ quantities[product.id] }}
              </span>
              <button
                @click="increaseQuantity(product.id)"
                class="px-2 py-1 hover:bg-gray-100"
              >
                <i class="fas fa-plus text-gray-600 text-xs"></i>
              </button>
            </div>
          </div>
          <div class="flex justify-between text-gray-800 font-semibold mb-4">
            <span>Total:</span>
            <span>${{ isValidPrice(product.price) ? totalPrice(product).toFixed(2) : 'N/A' }}</span>
          </div>
          <button
            @click="addToOrder(product)"
            class="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="loading || !isValidPrice(product.price)"
          >
            Add to Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCartStore } from '@/stores/cart';
import axios from 'axios';

const cartStore = useCartStore();
const products = ref({ data: [] });
const loading = ref(true);
const quantities = ref({});

const fetchData = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
    const response = await axios.get(`${apiUrl}/products`);
    products.value = {
      data: response.data.data.map(product => ({
        ...product,
        price: parseFloat(product.price) || 0,
        name: product.name || 'Unnamed Product',
        description: product.description || 'No description',
      })),
    };
    products.value.data.forEach((p) => {
      quantities.value[p.id] = 1;
    });
  } catch (e) {
    console.error('Error fetching products:', e);
    products.value.data = [];
  } finally {
    loading.value = false;
  }
};

const getImageUrl = (path) => {
  if (!path) return 'https://via.placeholder.com/256x256';
  return `http://127.0.0.1:8000/storage/${path}`;
};

const isValidPrice = (price) => {
  return typeof price === 'number' && !isNaN(price) && price >= 0;
};

const discountedPrice = (product) => {
  if (!isValidPrice(product.price)) return 0;
  return product.price * (1 - (product.discount || 0) / 100);
};

const totalPrice = (product) => {
  if (!isValidPrice(product.price)) return 0;
  return discountedPrice(product) * quantities.value[product.id];
};

const increaseQuantity = (id) => {
  quantities.value[id] += 1;
};

const decreaseQuantity = (id) => {
  if (quantities.value[id] > 1) quantities.value[id] -= 1;
};

const addToOrder = (product) => {
  if (!isValidPrice(product.price)) return;
  cartStore.addToCart({
    id: product.id,
    name: product.name,
    price: discountedPrice(product),
    quantity: quantities.value[product.id],
    image: product.image,
  });
};

const toggleFavorite = (product) => {
  if (!isValidPrice(product.price)) return;
  if (cartStore.favorites.some(item => item.id === product.id)) {
    cartStore.removeFromFavorites(product.id);
  } else {
    cartStore.addToFavorites({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.image,
    });
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
/* No changes needed */
</style>