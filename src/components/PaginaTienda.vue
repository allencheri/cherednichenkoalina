<template>
    <div class="container">
        <h3 class="text-center font-weight-bold mt-4 pt-4 pb-4 text-primary">
            <i class="bi bi-box"></i> BIENVENIDA A LA TIENDA
        </h3>

        <!-- Filtros por categoría -->
        <nav class="navbar">
            <form class="container-fluid justify-content-start">
                <button class="btn btn-outline-primary me-2" @click.prevent="seleccionarCategoria(null)">Todos</button>
                <button v-for="cat in categorias" :key="cat" class="btn btn-outline-primary me-2"
                    @click.prevent="seleccionarCategoria(cat)">{{ cat }}</button>
            </form>
        </nav>

        <!-- Carrito -->
        <div class="align-items">
            <router-link to="/carrito" class="btn btn-outline-dark m-2" v-if="isLogueado">
                <i class="bi bi-cart"></i> ({{ cartStore.totalItems }})
            </router-link>
            <div class="mt-2" v-else >
                <p>Tienes que <a href="/login">Iniciar Sesión</a> para poder comprar</p>
            </div>
        </div>

        <!-- Tabla de artículos -->
        <table class="table table-striped mt-4">
            <thead>
                <tr class="table-primary">
                    <th class="text-center">ID</th>
                    <th class="text-center">Nombre</th>
                    <th class="text-center">Descripción</th>
                    <th class="text-center">Precio</th>
                    <th class="text-center">Stock</th>
                    <th class="text-center">Foto</th>
                    <th class="text-center">Comprar</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="articulo in articulosPaginados" :key="articulo._id">
                    <td class="text-center">{{ truncarId(articulo._id) }}</td>
                    <td class="text-center">{{ articulo.nombre }}</td>
                    <td class="text-center">{{ articulo.descripcion }}</td>
                    <td class="text-center">{{ articulo.precio }} &euro;</td>
                    <td class="text-center">{{ articulo.stock }}</td>
                    <td class="text-center">
                        <img :src="urlBaseImg + articulo.imagen_url" alt="Foto de producto" width="74" height="74"
                            class="img-thumbnail" @click="openModal(articulo)" />
                    </td>
                    <td class="text-center">
                        <button class="btn btn-light" @click="addToCart(articulo)" v-if="isLogueado">
                            <i class="fas fa-shopping-cart"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Paginación -->
        <div class="d-flex justify-content-center my-3">
            <button class="btn btn-primary" :disabled="currentPage === 1" @click="paginaAnterior">
                <i class="bi bi-chevron-left"></i>
            </button>
            <span class="mx-3 align-self-center"> Página {{ currentPage }} de {{ totalPaginas }}</span>
            <button class="btn btn-primary" :disabled="currentPage >= totalPaginas" @click="siguientePagina">
                <i class="bi bi-chevron-right"></i>
            </button>
        </div>

        <!-- Modal de imagen -->
        <div v-if="isModalOpen" class="modal" @click="closeModal">
            <img :src="imagenSeleccionada" alt="Imagen ampliada" class="modal-content rounded">
        </div>
    </div>
</template>

<script>
import { obtenerArticulos } from '@/js/articuloServicios';
import { useCartStore } from '@/store/carts';

export default {
    data() {
        return {
            urlBaseImg: 'http://localhost:5000/uploads/img/',
            articulos: [],
            categoriaSeleccionada: null,
            categorias: ['Ofimática', 'Electrónica', 'Deporte', 'Libros', 'Hogar', 'Otros'],
            pageSize: 5,
            currentPage: 1,
            isLogueado: false,
            isModalOpen: false,
            imagenSeleccionada: null
        };
    },

    computed: {
        cartStore() {
            return useCartStore();
        },

        articulosFiltrados() {
            if (!this.categoriaSeleccionada) {
                return this.articulos;
            }
            return this.articulos.filter(art => art.categoria === this.categoriaSeleccionada);
        },

        totalPaginas() {
            return Math.ceil(this.articulosFiltrados.length / this.pageSize);
        },

        articulosPaginados() {
            const inicio = (this.currentPage - 1) * this.pageSize;
            return this.articulosFiltrados.slice(inicio, inicio + this.pageSize);
        }
    },

    mounted() {
        this.getArticulos();
        this.isLogueado = JSON.parse(localStorage.getItem('isLogueado'));
    },

    methods: {
        async getArticulos() {
            try {
                this.articulos = await obtenerArticulos();
                this.currentPage = 1;
            } catch (error) {
                console.error('Error obteniendo artículos:', error);
            }
        },

        seleccionarCategoria(categoria) {
            this.categoriaSeleccionada = categoria;
            this.currentPage = 1;
        },

        truncarId(id) {
            return id.slice(-8);
        },

        addToCart(articulo) {
            this.cartStore.addToCart(articulo);
            this.cartStore.saveToLocalStorage(); // Asegurar persistencia
        },


        paginaAnterior() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },

        siguientePagina() {
            if (this.currentPage < this.totalPaginas) {
                this.currentPage++;
            }
        },

        openModal(articulo) {
            this.imagenSeleccionada = this.urlBaseImg + articulo.imagen_url;
            this.isModalOpen = true;
        },

        closeModal() {
            this.isModalOpen = false;
        }
    }
};
</script>

<style scoped>
.img-thumbnail {
    cursor: pointer;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    cursor: pointer;
}

.modal-content {
    max-width: 80%;
    max-height: 80%;
    object-fit: contain;
}

.modal-content:hover {
    cursor: zoom-out;
}
</style>
