<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <PackageIcon class="h-8 w-8 text-blue-600" />
            <div class="ml-4">
              <h1 class="text-2xl font-bold text-gray-900">Product Management</h1>
              <p class="text-sm text-gray-500">Admin Dashboard</p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-500">Welcome, Admin</span>
            <div class="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
              <UserIcon class="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main -->
    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white shadow rounded-lg p-5 flex items-center">
          <PackageIcon class="h-6 w-6 text-blue-600" />
          <div class="ml-5">
            <p class="text-sm text-gray-500">Total Products</p>
            <p class="text-lg font-medium text-gray-900">{{ products.length }}</p>
          </div>
        </div>
        <div class="bg-white shadow rounded-lg p-5 flex items-center">
          <CheckCircleIcon class="h-6 w-6 text-green-600" />
          <div class="ml-5">
            <p class="text-sm text-gray-500">Active Products</p>
            <p class="text-lg font-medium text-gray-900">
              {{ products.filter(p => p.status === 'active').length }}
            </p>
          </div>
        </div>
        <div class="bg-white shadow rounded-lg p-5 flex items-center">
          <AlertTriangleIcon class="h-6 w-6 text-yellow-600" />
          <div class="ml-5">
            <p class="text-sm text-gray-500">Low Stock</p>
            <p class="text-lg font-medium text-gray-900">
              {{ products.filter(p => p.stock <= 5).length }}
            </p>
          </div>
        </div>
        <div class="bg-white shadow rounded-lg p-5 flex items-center">
          <DollarSignIcon class="h-6 w-6 text-purple-600" />
          <div class="ml-5">
            <p class="text-sm text-gray-500">Total Value</p>
            <p class="text-lg font-medium text-gray-900">
              ${{ products.reduce((sum, p) => sum + Number(p.price || 0), 0).toLocaleString() }}
            </p>
          </div>
        </div>
      </div>

      <!-- Action Bar -->
      <div class="bg-white shadow rounded-lg mb-6">
        <div class="px-6 py-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 class="text-lg font-medium text-gray-900">Products Inventory</h2>
            <p class="text-sm text-gray-500">Manage all your products from here</p>
          </div>
          <div class="mt-4 sm:mt-0 flex space-x-3">
            <router-link
              to="/create_product"
              class="inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              <PlusIcon class="h-4 w-4 mr-2" /> Add Product
            </router-link>
          </div>
        </div>
      </div>

      <!-- Product Table -->
      <div class="bg-white shadow rounded-lg overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50">
              <td class="px-6 py-4">
                <div class="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img
                    v-if="product.image"
                    :src="getImageUrl(product.image)"
                    alt="Product"
                    class="h-12 w-12 object-cover"
                  />
                  <ImageIcon v-else class="h-6 w-6 text-gray-400" />
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">{{ product.name }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ product.description }}</td>
              <td class="px-6 py-4 text-sm text-gray-900">${{ Number(product.price).toLocaleString() }}</td>
              <td class="px-6 py-4">
                <div class="flex space-x-2">
                  <button
                    class="text-green-600 hover:text-green-900"
                    @click="editProduct(product.id)"
                  >
                    <EditIcon class="h-4 w-4" />
                  </button>
                  <button
                    class="text-red-600 hover:text-red-900"
                    @click="deleteProduct(product.id)"
                  >
                    <TrashIcon class="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

import {
  Package as PackageIcon,
  User as UserIcon,
  CheckCircle as CheckCircleIcon,
  AlertTriangle as AlertTriangleIcon,
  DollarSign as DollarSignIcon,
  Plus as PlusIcon,
  Edit as EditIcon,
  Trash as TrashIcon,
  Image as ImageIcon,
} from 'lucide-vue-next';

const products = ref([]);
const router = useRouter();

const getProduct = () => {
  axios
    .get('http://127.0.0.1:8000/api/products')
    .then((response) => {
      products.value = response.data.data;
    })
    .catch((error) => console.error(error));
};

const getImageUrl = (imagePath) => {
  if (!imagePath) return 'https://via.placeholder.com/256x256';
  return `http://127.0.0.1:8000/storage/${imagePath}`;
};

const editProduct = (id) => {
  router.push({ name: 'EditProduct', params: { id } });
};

const deleteProduct = async (id) => {
  const confirmed = window.confirm('Are you sure you want to delete this product?');
  if (!confirmed) return;

  try {
    await axios.delete(`http://127.0.0.1:8000/api/products/${id}`);
    getProduct();
  } catch (error) {
    console.error(error);
    alert('Failed to delete product.');
  }
};

onMounted(() => {
  getProduct();
});
</script>
