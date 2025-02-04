<template>
  <div class="container-fluid p-4 mt-5 shadow rounded">
    <h3 class="text-center text-primary">¡Bienvenidos a Regalos Corporativos TEIS 🎁</h3>
    <p>
      Especializados en detalles que fortalecen relaciones profesionales, ofrecemos opciones elegantes y personalizadas
      para sorprender a clientes, colaboradores y socios.
    </p>
    <img :src="currentImage" alt="Imagen de fondo cambiando" class="background-image"/>
  </div>
</template>

<script>
export default {
  name: "PaginaInicio",
  data() {
    return {
      images: [
        require('@/assets/1.jpg'),
        require('@/assets/2.jpg'),
        require('@/assets/3.jpg'),
        require('@/assets/4.jpg'),
        require('@/assets/5.jpg')
      ],
      currentImageIndex: 0,
    };
  },
  mounted() {
    setInterval(() => {
      this.changeImage();
    }, 5000); 
  },
  methods: {
    changeImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    },
  },
  computed: {
    currentImage() {
      return this.images[this.currentImageIndex];
    },
  }
}
</script>

<style>
.background-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 15px;
}
</style>
