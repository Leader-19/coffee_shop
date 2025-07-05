import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref([]);
  const favorites = ref([]);

  const isValidPrice = (price) => {
    return typeof price === 'number' && !isNaN(price) && price >= 0;
  };

  const addToCart = (product) => {
    if (!isValidPrice(product.price)) return;
    const existingItem = cartItems.value.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += product.quantity;
    } else {
      cartItems.value.push({
        id: product.id,
        name: product.name || 'Unnamed Product',
        price: parseFloat(product.price),
        quantity: product.quantity,
        image: product.image,
      });
    }
  };

  const addToFavorites = (product) => {
    if (!isValidPrice(product.price)) return;
    if (!favorites.value.some(item => item.id === product.id)) {
      favorites.value.push({
        id: product.id,
        name: product.name || 'Unnamed Product',
        price: parseFloat(product.price),
        image: product.image,
      });
    }
  };

  const removeFromFavorites = (productId) => {
    favorites.value = favorites.value.filter(item => item.id !== productId);
  };

  const subtotal = () => {
    return cartItems.value
      .reduce((sum, item) => sum + (isValidPrice(item.price) ? item.price * item.quantity : 0), 0)
      .toFixed(2);
  };

  const taxRate = 0.06;
  const tax = () => (parseFloat(subtotal()) * taxRate).toFixed(2);
  const total = () => (parseFloat(subtotal()) + parseFloat(tax())).toFixed(2);

  return { cartItems, favorites, addToCart, addToFavorites, removeFromFavorites, subtotal, tax, total };
});