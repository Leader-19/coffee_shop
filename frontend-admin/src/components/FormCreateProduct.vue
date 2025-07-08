<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-center">Create Product</h2>

    <form @submit.prevent="submitForm" class="space-y-4" enctype="multipart/form-data">
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

      <!-- Image Upload -->
      <div>
        <label for="image" class="block text-sm font-medium text-gray-700">Add Image</label>
        <input
          @change="handleImage"
          type="file"
          id="image"
          accept="image/*"
          class="mt-1 block w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
        />
      </div>

      <!-- Submit -->
      <div class="text-center">
        <button
          type="submit"
          class="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Create Product
        </button>
      </div>
    </form>

    <!-- Message -->
    <p v-if="message" class="mt-4 text-center text-green-600">{{ message }}</p>
    <p v-if="error" class="mt-4 text-center text-red-600">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import api from '@/api/axios'

const router = useRouter()
const authStore = useAuthStore()

// Reactive form fields
const name = ref('')
const description = ref('')
const price = ref('')
const image = ref(null)

// Validation error messages
const nameError = ref('')
const descriptionError = ref('')
const priceError = ref('')

// Feedback messages
const message = ref('')
const error = ref('')

// Check authentication on mount
onMounted(() => {
  if (!authStore.token) {
    router.push('/login')
  }
})

// Image handler
const handleImage = (e) => {
  image.value = e.target.files[0]
}

// Submit form with client-side validation
const submitForm = async () => {
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

  try {
    const res = await api.post('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    message.value = '✅ Product created successfully!'

    // Clear form fields
    name.value = ''
    description.value = ''
    price.value = ''
    image.value = null
    document.getElementById('image').value = ''
  } catch (err) {
    console.error('Error creating product:', err)
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
      error.value = '❌ Failed to create product. Please try again.'
    }
  }
}
</script>