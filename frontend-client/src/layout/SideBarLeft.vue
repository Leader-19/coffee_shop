<template>
  <div
    class="fixed top-0 left-0 w-20 h-screen bg-white shadow-lg flex flex-col items-center py-8 border-r border-gray-100 z-50"
  >
    <div
      class="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mb-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
    >
      <i class="fas fa-coffee text-white text-lg group-hover:scale-110 transition-transform duration-300"></i>
    </div>
    <nav class="flex flex-col space-y-4 mb-auto">
      <router-link
        v-for="item in navItems"
        :key="item.name"
        :to="item.path"
        :class="[
          'w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 relative',
          item.active ? 'text-orange-500 bg-orange-50' : 'text-gray-400 hover:text-orange-500 hover:bg-orange-50'
        ]"
      >
        <i :class="['text-lg', item.icon]"></i>
        <div
          v-if="item.badge"
          :class="[
            'absolute -right-1 -top-1 rounded-full flex items-center justify-center font-bold',
            item.badge.type === 'dot'
              ? 'w-3 h-3 bg-orange-500'
              : `w-4 h-4 bg-${item.badge.color}-500 text-white text-xs`
          ]"
        >
          <span v-if="item.badge.type === 'number'">{{ item.badge.value }}</span>
        </div>
      </router-link>
    </nav>
    <div class="flex flex-col space-y-4 mt-8">
      <button
        v-for="item in bottomNavItems"
        :key="item.name"
        :class="[
          'w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300',
          item.name === 'Logout'
            ? 'text-gray-400 hover:text-red-500 hover:bg-red-50'
            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
        ]"
      >
        <i
          :class="[
            'text-lg',
            item.icon,
            item.name === 'Settings' ? 'hover:rotate-90 transition-transform duration-300' : ''
          ]"
        ></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();

const navItems = ref([
  { name: 'Home', icon: 'fas fa-home', active: false, path: '/' },
  { name: 'Products', icon: 'fas fa-th-large', active: true, badge: { type: 'dot', color: 'orange' }, path: '/products' },
  {
    name: 'Favorites',
    icon: 'fas fa-heart',
    active: false,
    badge: {
      type: 'number',
      value: computed(() => cartStore.favorites.length),
      color: 'red'
    },
    path: '/favorites'
  },
  {
    name: 'Orders',
    icon: 'fas fa-shopping-bag',
    active: false,
    badge: {
      type: 'number',
      value: computed(() => cartStore.cartItems.length),
      color: 'blue'
    },
    path: '/orders'
  },
  { name: 'Profile', icon: 'fas fa-user', active: false, path: '/profile' },
]);

const bottomNavItems = ref([
  { name: 'Settings', icon: 'fas fa-cog' },
  { name: 'Logout', icon: 'fas fa-sign-out-alt' },
]);
</script>

<style scoped>
/* No changes needed */
</style>