<template>
  <div class="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
    <h1 class="display-4 text-success mb-3">¡Pago Exitoso!</h1>
    <p class="lead text-secondary mb-4">Tu transacción se realizó correctamente. ¡Gracias por tu compra!</p>

    <div class="invoice-container">
      <p>Descargue su factura en formato PDF:</p>
      <button @click="generarFacturaPDF" class="btn btn-primary btn-lg">
        <i class="bi bi-file-pdf"></i> Descargar factura
      </button>
    </div>

    <router-link to="/" class="btn btn-success btn-lg mt-4">
      Volver a la tienda
    </router-link>
  </div>
</template>

<script>
import jsPDF from 'jspdf';
import "jspdf-autotable";
import { useCartStore } from '@/store/carts';
import logo from '../assets/logo.png';

export default {
  data() {
    return {
      cartItems: [],
      totalPrice: 0,
    };
  },

  mounted() {
    const cartStore = useCartStore();
    this.cartItems = cartStore.items;
    this.totalPrice = cartStore.totalPrice;
  },

  beforeUnmount() {
    const cartStore = useCartStore();
    cartStore.clearCart();
  },

  methods: {
    generarFacturaPDF() {
      if (this.cartItems.length === 0) {
        console.error("No hay productos en el carrito");
        return;
      }

      const doc = new jsPDF();
      const cart = this.cartItems;

      // Agregar logo
      doc.addImage(logo, 'PNG', 10, 10, 20, 20);

      doc.setFontSize(18);
      doc.text('FACTURA DE COMPRA', 60, 20);

      doc.setFontSize(9);
      doc.text('Razón Social: Regalos', 110, 50);
      doc.text('Dirección: Calle 123, 123 123 C', 110, 60);
      doc.text('Teléfono: 123456789', 110, 70);
      doc.text('Email: example@example.com', 110, 80);

      const headers = ['ID', 'Producto', 'Cantidad', 'Precio', 'Total'];
      const data = cart.map((item) => [
        item._id,
        item.nombre,
        item.quantity,
        `${item.precio.toFixed(2)} €`,
        `${(item.quantity * item.precio).toFixed(2)} €`,
      ]);

      doc.autoTable({
        startY: 90,
        head: [headers],
        body: data,
        columnStyles: {
          0: { halign: 'center' },
          2: { halign: 'center' },
          3: { halign: 'right' },
          4: { halign: 'right' },
        },
        theme: 'striped',
      });

      const finalY = doc.autoTable.previous.finalY;

      const totalText = `Total: ${this.cartItems.reduce((acc, item) => acc + item.precio * item.quantity, 0).toFixed(2)} €`;
      const pageWidth = doc.internal.pageSize.width;
      const totalWidth = doc.getTextWidth(totalText);
      const positionX = pageWidth - totalWidth - 14;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(totalText, positionX, finalY + 10);

      doc.save('factura.pdf');
    },
  },
};
</script>
