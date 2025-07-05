<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
    <h2 class="text-2xl font-bold mb-4 text-center">Edit Product</h2>

    <form @submit.prevent="updateProduct" class="space-y-4" enctype="multipart/form-data">
      <!-- Name -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Name</label>
        <input v-model="name" type="text" class="border w-full p-2 rounded" />
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Description</label>
        <input v-model="description" type="text" class="border w-full p-2 rounded" />
      </div>

      <!-- Price -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Price</label>
        <input v-model="price" type="number" class="border w-full p-2 rounded" />
      </div>

      <!-- Image -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Product Image</label>
        <input
          type="file"
          accept="image/*"
          @change="handleImage"
          class="mt-1 block w-full border rounded p-2"
        />
      </div>

      <!-- Submit -->
      <div class="text-center">
        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Update Product
        </button>
      </div>

      <p v-if="message" class="text-green-600 mt-2 text-center">{{ message }}</p>
      <p v-if="error" class="text-red-600 mt-2 text-center">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const name = ref('')
const description = ref('')
const price = ref('')
const image = ref(null)

const message = ref('')
const error = ref('')

// Handle file input
const handleImage = (e) => {
  image.value = e.target.files[0]
}

onMounted(async () => {
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/products/${id}`)
    const product = res.data
    name.value = product.name
    description.value = product.description
    price.value = product.price
  } catch (err) {
    console.error(err)
    error.value = '❌ Failed to load product.'
  }
})

const updateProduct = async () => {
  error.value = ''
  message.value = ''

  const formData = new FormData()
  formData.append('name', name.value)
  formData.append('description', description.value)
  formData.append('price', price.value)
  if (image.value) {
    formData.append('image', image.value)
  }

  try {
    await axios.post(`http://127.0.0.1:8000/api/products/${id}?_method=PUT`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    message.value = '✅ Product updated successfully!'
    setTimeout(() => {
      router.push('/products')
    }, 1000)
  } catch (err) {
    console.error(err)
    error.value = '❌ Update failed. Please try again.'
  }
}
</script>
