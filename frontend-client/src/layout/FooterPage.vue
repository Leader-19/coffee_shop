<template>
    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center gap-3 mb-4">
              <i class="fas fa-coffee h-8 w-8 text-amber-600"></i>
              <h3 class="text-xl font-bold">Brew & Bean Café</h3>
            </div>
            <p class="text-gray-400 mb-4">
              Your neighborhood coffee shop serving premium coffee and creating memorable experiences 
              since 2015.
            </p>
            <div class="flex space-x-4">
              <div class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors cursor-pointer">
                <span class="text-sm font-bold">f</span>
              </div>
              <div class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors cursor-pointer">
                <span class="text-sm font-bold">t</span>
              </div>
              <div class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors cursor-pointer">
                <span class="text-sm font-bold">i</span>
              </div>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white transition-colors">Menu</a></li>
              <li><a href="#" class="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div>
            <h4 class="text-lg font-semibold mb-4">Contact</h4>
            <ul class="space-y-2 text-gray-400">
              <li>123 Coffee Street</li>
              <li>City, State 12345</li>
              <li>(555) 123-4567</li>
              <li>hello@brewbean.com</li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2024 Brew & Bean Café. All rights reserved.</p>
        </div>
      </div>
    </footer>
</template>

<script setup></script>
<style scoped></style>