<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header and other components remain the same -->

    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <!-- Stats and Action Bar remain the same -->

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
                  <router-link
                    :to="{ name: 'EditProduct', params: { id: product.id } }"
                    class="text-green-600 hover:text-green-900"
                  >
                    <EditIcon class="h-4 w-4" />
                  </router-link>
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api/axios'
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
} from 'lucide-vue-next'

const products = ref([])
const router = useRouter()

const fetchProducts = async () => {
  try {
    const response = await api.get('/products')
    products.value = response.data.data
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

const getImageUrl = (imagePath) => {
  if (!imagePath) return 'https://via.placeholder.com/256x256'
  return `${import.meta.env.VITE_API_BASE_URL}/storage/${imagePath}`
}

const deleteProduct = async (id) => {
  try {
    const confirmed = window.confirm('Are you sure you want to delete this product?')
    if (!confirmed) return

    await api.delete(`/products/${id}`)
    await fetchProducts()
  } catch (error) {
    console.error('Error deleting product:', error)
    alert('Failed to delete product. Please try again.')
  }
}

onMounted(() => {
  fetchProducts()
})
</script>