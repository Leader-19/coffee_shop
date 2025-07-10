<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation -->
    <!-- Hero Section -->
    <section id="home" class="relative bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden">
      <div class="absolute inset-0 bg-black opacity-10"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Hero Content -->
          <div class="text-center lg:text-left">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Welcome to
              <span class="text-amber-600">Fresh & Enjoy</span>
              Café
            </h1>
            <p class="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
              Experience the perfect blend of premium coffee, cozy atmosphere, and exceptional service. 
              Every cup tells a story of passion, quality, and craftsmanship.
            </p>
            <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button class="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg hover:shadow-xl">
                Explore Menu
              </button>
              <button class="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                Visit Us
              </button>
            </div>
          </div>

          <!-- Hero Image -->
          <div class="relative">
            <div class="relative z-10 bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <img 
                src="../../public/coffee.jpg" 
                alt="Premium Coffee" 
                class="w-full h-80 object-cover rounded-xl"
              />
              <div class="absolute -top-4 -right-4 bg-amber-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                Fresh Daily!
              </div>
            </div>
            <!-- Decorative elements -->
            <div class="absolute top-10 -left-4 w-20 h-20 bg-amber-200 rounded-full opacity-60"></div>
            <div class="absolute bottom-10 -right-8 w-32 h-32 bg-orange-200 rounded-full opacity-40"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Story
          </h2>
          <div class="w-24 h-1 bg-amber-600 mx-auto mb-8"></div>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Founded in 2015, Brew & Bean Café has been serving the community with exceptional coffee 
            and warm hospitality. We source our beans directly from sustainable farms around the world, 
            ensuring every cup supports both quality and ethical practices.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-coffee h-8 w-8 text-amber-600"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Premium Quality</h3>
            <p class="text-gray-600">
              We carefully select and roast our beans to perfection, ensuring every cup delivers 
              exceptional flavor and aroma.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-heart h-8 w-8 text-amber-600"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Made with Love</h3>
            <p class="text-gray-600">
              Our skilled baristas craft each drink with passion and attention to detail, 
              creating memorable experiences for every customer.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-users h-8 w-8 text-amber-600"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Community Focus</h3>
            <p class="text-gray-600">
              We're more than a coffee shop - we're a gathering place where friends meet, 
              ideas flow, and community connections are made.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Products Banner -->
    <section class="py-20 bg-gradient-to-r from-amber-600 to-orange-600 text-white relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
        <div class="absolute top-32 right-20 w-20 h-20 border-2 border-white rounded-full"></div>
        <div class="absolute bottom-20 left-32 w-24 h-24 border-2 border-white rounded-full"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Our Popular Products
          </h2>
          <div class="w-24 h-1 bg-white mx-auto mb-8"></div>
          <p class="text-lg text-amber-100 max-w-2xl mx-auto">
            Discover our customers' favorite drinks and treats, crafted with the finest ingredients 
            and served with a smile.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Product Cards -->
          <div 
            v-for="product in popularProducts" 
            :key="product.id"
            class="bg-white rounded-2xl p-6 text-center transform hover:scale-105 transition-transform duration-300 shadow-xl"
          >
            <div class="relative mb-6">
              <img 
                :src="product.image" 
                :alt="product.name" 
                class="w-full h-48 object-cover rounded-xl"
              />
              <div class="absolute -top-3 -right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {{ product.badge }}
              </div>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ product.name }}</h3>
            <p class="text-gray-600 text-sm mb-4">{{ product.description }}</p>
            <div class="flex items-center justify-between mb-4">
              <span class="text-2xl font-bold text-amber-600">${{ product.price.toFixed(2) }}</span>
              <div class="flex items-center gap-1">
                <i 
                  v-for="star in 5" 
                  :key="star"
                  :class="star <= product.rating ? 'fas fa-star text-yellow-400 fill-current' : 'fas fa-star text-gray-300'"
                  class="h-4 w-4"
                ></i>
                <span class="text-sm text-gray-500 ml-1">({{ product.reviews }})</span>
              </div>
            </div>
            <button class="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition-colors">
              Add to Cart
            </button>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="text-center mt-16">
          <button class="bg-white text-amber-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg">
            View Full Menu
          </button>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Stay Connected
        </h2>
        <p class="text-lg text-gray-600 mb-8">
          Subscribe to our newsletter for exclusive offers, new product announcements, and coffee tips.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <button 
            @click="subscribeNewsletter"
            class="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>

    
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Reactive data
const email = ref('');

// Popular products data
const popularProducts = ref([
  {
    id: 1,
    name: 'Signature Cappuccino',
    description: 'Rich espresso with perfectly steamed milk foam',
    price: 4.50,
    rating: 5,
    reviews: 124,
    badge: 'Best Seller',
    image: '../../public/p-1.jpg'
  },
  {
    id: 2,
    name: 'Caramel Macchiato',
    description: 'Espresso with vanilla syrup and caramel drizzle',
    price: 5.25,
    rating: 5,
    reviews: 98,
    badge: 'Popular',
    image: '../../public/p2.jpg'
  },
  {
    id: 3,
    name: 'Artisan Croissant',
    description: 'Buttery, flaky French pastry baked fresh daily',
    price: 3.95,
    rating: 4,
    reviews: 76,
    badge: 'Fresh',
    image: '../../public/p3.jpg'
  },
  {
    id: 4,
    name: 'Cold Brew Special',
    description: 'Smooth cold brew coffee with a hint of vanilla',
    price: 4.75,
    rating: 5,
    reviews: 156,
    badge: 'New',
    image: '../../public/p4.jpg'
  }
]);

// Methods
const subscribeNewsletter = () => {
  if (email.value) {
    alert(`Thank you for subscribing with email: ${email.value}`);
    email.value = '';
  } else {
    alert('Please enter a valid email address');
  }
};
</script>

<style scoped>
/* Custom styles if needed */
.fill-current {
  fill: currentColor;
}
</style>