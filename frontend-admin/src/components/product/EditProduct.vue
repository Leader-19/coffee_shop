<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
    <h2 class="text-2xl font-bold mb-4 text-center">Edit Product</h2>

    <form @submit.prevent="updateProduct" class="space-y-4" enctype="multipart/form-data">
      <!-- Name -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input
          v-model="name"
          type="text"
          id="name"
          placeholder="Input name of product"
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <p v-if="nameError" class="text-red-600 text-sm mt-1">{{ nameError }}</p>
      </div>

      <!-- Description -->
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <input
          v-model="description"
          type="text"
          id="description"
          placeholder="Write description"
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <p v-if="descriptionError" class="text-red-600 text-sm mt-1">{{ descriptionError }}</p>
      </div>

      <!-- Price -->
      <div>
        <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
        <input
          v-model="price"
          type="number"
          id="price"
          placeholder="Enter price"
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <p v-if="priceError" class="text-red-600 text-sm mt-1">{{ priceError }}</p>
      </div>

      <!-- Current Image Preview -->
      <div v-if="currentImage">
        <label class="block text-sm font-medium text-gray-700">Current Image</label>
        <img
          :src="getImageUrl(currentImage)"
          alt="Current Product"
          class="mt-2 h-24 w-24 object-cover rounded"
        />
      </div>

      <!-- Image Upload -->
      <div>
        <label for="image" class="block text-sm font-medium text-gray-700">Upload New Image (Optional)</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          @change="handleImage"
          class="mt-1 block w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <!-- Submit -->
      <div class="text-center">
        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          Update Product
        </button>
      </div>

      <!-- Messages -->
      <p v-if="message" class="mt-4 text-center text-green-600">{{ message }}</p>
      <p v-if="error" class="mt-4 text-center text-red-600">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import api from '@/api/axios'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const id = route.params.id

// Reactive form fields
const name = ref('')
const description = ref('')
const price = ref('')
const image = ref(null)
const currentImage = ref(null)

// Validation error messages
const nameError = ref('')
const descriptionError = ref('')
const priceError = ref('')

// Feedback messages
const message = ref('')
const error = ref('')

// Image URL generator
const getImageUrl = (imagePath) => {
  if (!imagePath) return 'https://via.placeholder.com/256x256'
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'
  return `${baseUrl}/storage/${imagePath}`
}

// Handle file input
const handleImage = (e) => {
  image.value = e.target.files[0]
}

// Check authentication and fetch product on mount
onMounted(async () => {
  if (!authStore.token) {
    router.push('/login')
    return
  }

  try {
    const res = await api.get(`/products/${id}`)
    const product = res.data.product // Adjust based on backend response structure
    name.value = product.name
    description.value = product.description
    price.value = product.price
    currentImage.value = product.image
  } catch (err) {
    console.error('Error fetching product:', err)
    error.value = '❌ Failed to load product.'
    if (err.response?.status === 401) {
      router.push('/login')
    }
  }
})

// Update product
const updateProduct = async () => {
  // Reset messages
  error.value = ''
  message.value = ''
  nameError.value = ''
  descriptionError.value = ''
  priceError.value = ''

  // Client-side validation
  if (!name.value.trim()) {
    nameError.value = 'Name is required'
  }
  if (!description.value.trim()) {
    descriptionError.value = 'Description is required'
  }
  if (!price.value || isNaN(price.value)) {
    priceError.value = 'Valid price is required'
  }

  if (nameError.value || descriptionError.value || priceError.value) {
    return
  }

  // Prepare form data
  const formData = new FormData()
  formData.append('name', name.value)
  formData.append('description', description.value)
  formData.append('price', price.value)
  if (image.value) {
    formData.append('image', image.value)
  }
  formData.append('_method', 'PUT') // Laravel expects this for form-data PUT requests

  try {
    const res = await api.post(`/products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    message.value = '✅ Product updated successfully!'
    setTimeout(() => {
      router.push('/products')
    }, 1000)
  } catch (err) {
    console.error('Error updating product:', err)
    if (err.response?.status === 422) {
      const errors = err.response.data.errors
      nameError.value = errors.name ? errors.name[0] : ''
      descriptionError.value = errors.description ? errors.description[0] : ''
      priceError.value = errors.price ? errors.price[0] : ''
      error.value = '⚠️ Validation failed. Please check your input.'
    } else if (err.response?.status === 401) {
      error.value = '⚠️ You are not authenticated. Please log in.'
      router.push('/login')
    } else {
      error.value = '❌ Update failed. Please try again.'
    }
  }
}
</script>