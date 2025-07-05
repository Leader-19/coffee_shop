<template>
  <div class="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Your Profile</h1>
    
    <div class="bg-white rounded-xl shadow hover:shadow-xl transition-shadow duration-300 p-6 max-w-2xl mx-auto">
      <div class="flex items-center space-x-4 mb-6">
        <div class="relative">
          <img
            :src="user.image || 'https://via.placeholder.com/100'"
            alt="Profile Image"
            class="w-24 h-24 rounded-full object-cover"
          />
          <button
            @click="triggerFileInput"
            class="absolute bottom-0 right-0 p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600"
          >
            <i class="fas fa-camera"></i>
          </button>
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="hidden"
            @change="uploadProfileImage"
          />
        </div>
        <div>
          <h2 class="text-xl font-semibold text-gray-800">{{ user.name }}</h2>
          <p class="text-gray-500 text-sm">{{ user.email }}</p>
        </div>
      </div>

      <form @submit.prevent="updateProfile" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input
            v-model="user.name"
            type="text"
            class="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="user.email"
            type="email"
            class="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            disabled
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Phone</label>
          <input
            v-model="user.phone"
            type="tel"
            class="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          :disabled="loading"
        >
          Update Profile
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const user = ref({
  name: '',
  email: '',
  phone: '',
  image: '',
});
const loading = ref(false);
const fileInput = ref(null);

const fetchUser = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
    const response = await axios.get(`${apiUrl}/user`);
    user.value = response.data;
  } catch (e) {
    console.error('Error fetching user:', e);
  }
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const uploadProfileImage = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('image', file);

  try {
    loading.value = true;
    const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
    const response = await axios.post(`${apiUrl}/user/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    user.value.image = response.data.image;
  } catch (e) {
    console.error('Error uploading image:', e);
  } finally {
    loading.value = false;
  }
};

const updateProfile = async () => {
  try {
    loading.value = true;
    const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
    await axios.put(`${apiUrl}/user`, {
      name: user.value.name,
      phone: user.value.phone,
    });
    alert('Profile updated successfully!');
  } catch (e) {
    console.error('Error updating profile:', e);
    alert('Failed to update profile.');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchUser();
});
</script>

<style scoped>
/* Responsive adjustments if needed */
</style>