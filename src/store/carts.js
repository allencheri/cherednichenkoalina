import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cartItems')) || [], // Cargar desde localStorage
  }),

  getters: {
    totalItems: (state) => state.items.reduce((acc, item) => acc + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((acc, item) => acc + item.precio * item.quantity, 0),
  },

  actions: {
    saveToLocalStorage() {
      localStorage.setItem('cartItems', JSON.stringify(this.items));
    },

    addToCart(product) {
      const existingProduct = this.items.find(item => item._id === product._id);
      if (existingProduct) {
        existingProduct.quantity += 1; 
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
      this.saveToLocalStorage(); // Guardar cambios
    },

    removeFromCart(productId) {
      this.items = this.items.filter(item => item._id !== productId);
      this.saveToLocalStorage();
    },

    incrementQuantity(productId) {
      const product = this.items.find(item => item._id === productId);
      if (product) {
        product.quantity += 1;
      }
      if (product.quantity > product.stock) {
        product.quantity = product.stock;
      }
      this.saveToLocalStorage();
    },

    updateQuantity(productId, quantity) {
      const product = this.items.find(item => item._id === productId);
      if (product) {
        product.quantity = quantity;
      }
      this.saveToLocalStorage();
    },

    decrementQuantity(productId) {
      const product = this.items.find(item => item._id === productId);
      if (product) {
        product.quantity -= 1;
        if (product.quantity === 0) {
          product.quantity = 1;
        }
      }
      this.saveToLocalStorage();
    },

    clearCart() {
      this.items = [];
      this.saveToLocalStorage();
    },

    loadCart() {
      this.items = JSON.parse(localStorage.getItem('cartItems')) || [];
    }
  },
});
