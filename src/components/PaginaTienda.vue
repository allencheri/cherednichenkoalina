<template>
  <div class="container">
    <h2 class="font-weight-bold text-uppercase text-primary position-relative d-inline-block mt-4">
            <i class="bi bi-box-seam"></i>
            Bienvenida a la tienda
            <span class="underline-effect"></span>
            <router-link to="/" class="btn btn-custom"><i class="bi bi-arrow-return-left me-2"></i></router-link>
        </h2>
      <nav class="navbar">
          <form class="container-fluid justify-content-start mt-5">
              <button class="btn btn-outline-dark me-2" @click.prevent="seleccionarCategoria(null)" >Todos</button>
              <button class="btn btn-outline-dark me-2" @click.prevent="seleccionarCategoria('Ofimática')">Ofimática</button>
              <button class="btn btn-outline-dark me-2" @click.prevent="seleccionarCategoria('Electrónica')">Electrónica</button>
              <button class="btn btn-outline-dark me-2" @click.prevent="seleccionarCategoria('Deporte')">Deporte</button>
              <button class="btn btn-outline-dark me-2" @click.prevent="seleccionarCategoria('Libros')">Libros</button>
              <button class="btn btn-outline-dark me-2" @click.prevent="seleccionarCategoria('Hogar')">Hogar</button>
              <button class="btn btn-outline-dark" @click.prevent="seleccionarCategoria('Otros')">Otros</button>
            </form>
      </nav>
      <table class="table table-striped mt-4">
              <thead>
                  <tr class="table-primary mt-4">
                      <th scope="col" class="w-10 text-center align-middle">Foto</th>
                      <th scope="col" class="w-20 text-start  align-middle">Nombre</th>
                      <th scope="col" class="w-45 text-center align-middle">Descripción</th>
                      <th scope="col" class="w-10 text-center align-middle">Precio</th>
                      <th scope="col" class="w-10 text-center align-middle">Stock</th>
                      <th scope="col" class="table-primary text-center align-middle">Comprar</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="articulo in articulosPorPagina" :key="articulo.id">
                      <td class="d-flex justify-content-center align-items-center align-middle">
                          <img :src="articulo.imagen_url" :alt="articulo.nombre" width="100px" height="100px" class="rounded">
                      </td>
                      <td class="text-center align-middle">{{ articulo.nombre }}</td>
                      <td class="text-center align-middle">{{ articulo.descripcion }}</td>
                      <td class="text-center align-middle">{{ articulo.precio }} &euro;</td>
                      <td class="text-center align-middle">{{ articulo.stock }}</td>
                      <td class="table-primary text-center align-middle">
                          <button class="btn btn-light m-2" @click="comprarArticulo(articulo.id)">
                              <i class="bi bi-cart"></i>
                          </button>
                      </td>
                  </tr>
              </tbody>
          </table>
          <div class="d-flex justify-content-center my-3 mb-5">
              <button class="btn btn-primary" :disabled="currentPage === 1" @click="paginaAnterior">
                  <i class="bi bi-chevron-left"></i>
              </button>
              <span class="mx-3 align-self-center"> Página {{ currentPage }}</span>
              <button class="btn btn-primary" :disabled="currentPage * pageSize >= this.articulos.length"
                  @click="siguientePagina">
                  <i class="bi bi-chevron-right"></i>
              </button>
          </div>
  </div>
  
</template>

<script>
import { obtenerArticulos } from '@/js/articuloServicios';
export default {
  name : "PaginaTienda",
  components : {

  },

  data() {
      return {
          categoria : "",
          articulos : [],
          categorias : [], 
          pageSize: 5,
          currentPage: 1,
      }
  },

  computed: {
      articulosPorPagina() {
          const indiceInicial = (this.currentPage - 1) * this.pageSize;
          console.log(this.articulos.slice(indiceInicial, indiceInicial + this.pageSize)); 
          return this.articulos.slice(indiceInicial, indiceInicial + this.pageSize);
      },
  },
  
  mounted() {
      this.getArticulos(); 
  },

  methods : {
      siguientePagina() {
          if (this.currentPage * this.pageSize < this.articulos.length) {
              this.currentPage++;
          }
      },

      paginaAnterior() {
          if (this.currentPage > 1) {
              this.currentPage--;
          }
      },

      async getArticulos() {
          try {
              if (!this.categoria) {
                  this.articulos = await obtenerArticulos(); 
                  return; 
              }
              let articulos = await obtenerArticulos(); 
              console.log(articulos)
              this.articulos = articulos.filter((articulo) => articulo.categoria === this.categoria); 
          } catch (error) {
              console.error(error);
          }
      },

      seleccionarCategoria(categoria){
          this.categoria = categoria; 
          this.getArticulos()
      }
  }


}
</script>
