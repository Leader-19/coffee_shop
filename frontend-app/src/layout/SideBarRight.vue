<template>
  <div class="w-80 bg-white p-6 shadow-sm">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-lg font-semibold text-gray-800">Current Order</h2>
      <button class="p-2 hover:bg-gray-50 rounded-lg">
        <i class="fas fa-ellipsis-h text-gray-400"></i>
      </button>
    </div>

    <!-- Order Items -->
    <div class="space-y-4 mb-6">
      <div v-for="item in cartItems" :key="item.id" class="flex items-center space-x-3">
        <img :src="item.image" :alt="item.name" class="w-12 h-12 object-cover rounded-lg">
        <div class="flex-1">
          <h4 class="font-medium text-gray-800 text-sm">{{ item.name }}</h4>
          <p class="text-orange-custom font-semibold text-sm">{{ item.price }}</p>
        </div>
        <div class="flex items-center space-x-2">
          <span class="w-6 h-6 bg-orange-light rounded-full flex items-center justify-center text-orange-custom text-xs font-semibold">{{ item.quantity }}</span>
          <button class="w-6 h-6 bg-orange-custom rounded-full flex items-center justify-center">
            <i class="fas fa-times text-white text-xs"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Order Summary -->
    <div class="border-t pt-4 space-y-3">
      <div class="flex justify-between text-sm">
        <span class="text-gray-600">Subtotal</span>
        <span class="font-semibold">$37.61</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-gray-600">Discount sales</span>
        <span class="font-semibold">-</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-gray-600">Total sales tax</span>
        <span class="font-semibold">$2.25</span>
      </div>
      <div class="border-t pt-3">
        <div class="flex justify-between">
          <span class="font-semibold text-gray-800">Total</span>
          <span class="font-bold text-lg">$34.86</span>
        </div>
      </div>
    </div>

    <!-- Continue Button -->
    <button class="w-full bg-orange-custom text-white py-3 rounded-lg font-semibold mt-6 hover:bg-orange-600 transition-colors">
      Continue to Payment
    </button>
  </div>
</template>

<script>
export default {
  name: 'RightSidebar',
  props: {
    cartItems: {
      type: Array,
      required: true
    }
  }
};
</script>