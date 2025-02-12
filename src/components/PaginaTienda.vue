<template>
    <div class="container">
        <h3 class="text-center font-weight-bold mt-4 pt-4 pb-4 text-primary "><i class="bi bi-box"></i>
            BIENVENIDA A LA TIENDA</h3>
        <nav class="navbar">
            <form class="container-fluid justify-content-start">
                <button class="btn btn-outline-primary me-2" @click.prevent="seleccionarCategoria(null)">Todos</button>
                <button class="btn btn-outline-primary me-2"
                    @click.prevent="seleccionarCategoria('Ofimática')">Ofimática</button>
                <button class="btn btn-outline-primary me-2"
                    @click.prevent="seleccionarCategoria('Electrónica')">Electrónica</button>
                <button class="btn btn-outline-primary me-2"
                    @click.prevent="seleccionarCategoria('Deporte')">Deporte</button>
                <button class="btn btn-outline-primary me-2"
                    @click.prevent="seleccionarCategoria('Libros')">Libros</button>
                <button class="btn btn-outline-primary me-2"
                    @click.prevent="seleccionarCategoria('Hogar')">Hogar</button>
                <button class="btn btn-outline-primary" @click.prevent="seleccionarCategoria('Otros')">Otros</button>
            </form>
        </nav>
        <div class="align-items">
            <router-link to="/carrito" class="btn btn-outline-dark m-2" v-if="isLogueado">
                <i class="bi bi-cart"></i> ({{ cartStore.totalItems }})
            </router-link>
            <div v-if="!isLogueado">
                <router-link to="#" class="btn btn-outline-dark m-2" >
                    <i class="bi bi-cart"></i> ({{ cartStore.totalItems }})
                </router-link>
                <p>Tienes que <a href="/login">Iniciar Sesión</a> para poder comprar</p>
            </div>


        </div>

        <table class="table table-striped mt-4">
            <thead>
                <tr class="table-primary mt-4">
                    <th scope="col" class="w-10 text-center align-middle">ID</th>
                    <th scope="col" class="w-20 text-center align-middle">Nombre</th>
                    <th scope="col" class="w-45 text-center align-middle">Descripción</th>
                    <th scope="col" class="w-10 text-center align-middle">Precio</th>
                    <th scope="col" class="w-10 text-center align-middle">Stock</th>
                    <th scope="col" class="w-25 text-center align-middle">Foto</th>
                    <th scope="col" class="table-primary text-center align-middle">Comprar</th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="articulo in articulosPorPagina" :key="articulo._id">
                    <td class="text-center align-middle">{{ truncarId(articulo._id) }}</td>
                    <td class="text-center align-middle">{{ articulo.nombre }}</td>
                    <td class="text-center align-middle">{{ articulo.descripcion }}</td>
                    <td class="text-center align-middle">{{ articulo.precio }} &euro;</td>
                    <td class="text-center align-middle">{{ articulo.stock }}</td>
                    <td class="text-center align-middle">
                        <img :src="urlBaseImg+articulo.imagen_url" alt="Foto de producto" width="74" height="74"
                            class="img-thumbnail" @click="openModal(articulo)" />

                    </td>
                    <td class="table-primary text-center align-middle">
                        <button class="btn btn-light" @click="addToCart(articulo)">
                            <i class="fas fa-shopping-cart"></i>
                        </button>
                    </td>
                    <div v-if="isModalOpen" class="modal" @click="closeModal">
                        <img :src="imagenSeleccionada" alt="Imagen ampliada" class="modal-content rounded">
                    </div>

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
import { useCartStore } from '@/store/carts';

export default {
    name: "PaginaTienda",
    components: {

    },

    data() {
        return {
            categoria: "",
            urlBaseImg: 'http://localhost:5000/uploads/img/',
            articulos: [],
            categorias: [],
            pageSize: 5,
            currentPage: 1,
            isModalOpen: false,
            imagenSeleccionada: null
        }
    },

    computed: {
        articulosPorPagina() {
            const indiceInicial = (this.currentPage - 1) * this.pageSize;
            console.log(this.articulos.slice(indiceInicial, indiceInicial + this.pageSize));
            return this.articulos.slice(indiceInicial, indiceInicial + this.pageSize);
        },
        cartStore() {
            return useCartStore();
        },
    },

    mounted() {
        this.getArticulos();
        this.isLogueado = JSON.parse(localStorage.getItem('isLogueado'));
    },

    methods: {
        truncarId(id) {
            return id.slice(-8);
        },

        async getArticulos() {
            try {
                this.articulos = await obtenerArticulos();
                if (this.categoria) {
                    this.articulos = this.articulos.filter(a => a.categoria === this.categoria);
                }
            } catch (error) {
                console.error(error);
            }
        },

        seleccionarCategoria(categoria) {
            this.categoria = categoria;
            this.getArticulos();
        },

        addToCart(articulo) {
            this.cartStore.addToCart(articulo);
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