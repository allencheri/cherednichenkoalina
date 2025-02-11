<template>
    <div class="container">
        <h3 class="text-center font-weight-bold mt-4 pt-4 pb-4 text-primary "><i class="bi bi-box"></i>
            BIENVENIDA A LA TIENDA</h3>
        <nav class="navbar">
            <form class="container-fluid justify-content-start mt-3">
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
        <div class="align-items-">
            <router-link to="/carrito" class="btn btn-outline-primary m-2">
                <i class="bi bi-cart"> </i>
            </router-link>
        </div>
        <table class="table table-striped mt-4">
            <thead>
                <tr class="table-primary mt-4">
                    <th scope="col" class="w-10 text-center align-middle">ID</th>
                    <th scope="col" class="w-20 text-center align-middle">Nombre</th>
                    <th scope="col" class="w-45 text-center align-middle">Descripción</th>
                    <th scope="col" class="w-10 text-center align-middle">Precio</th>
                    <th scope="col" class="w-10 text-center align-middle">Stock</th>
                    <th scope="col" class="w-10 text-center align-middle">Foto</th>
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
                        <img :src="urlBaseImg + articulo.imagen_url" alt="Foto de producto" width="64" height="64"
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
    },

    mounted() {
        this.getArticulos();
    },

    methods: {

        truncarId(id) {
            return id.slice(-8);
        },

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

        seleccionarCategoria(categoria) {
            this.categoria = categoria;
            this.getArticulos()
        },

        openModal(articulo) {
            this.imagenSeleccionada = this.urlBaseImg + articulo.imagen_url;
            this.isModalOpen = true;
        },


        closeModal() {
            this.isModalOpen = false;
        },

        addToCart(articulo) {
            const cartStore = useCartStore();
            cartStore.addToCart(articulo);

        }
    }



}
</script>

<style scoped>
/* El modal (ventana emergente) */
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

/* Estilo para la imagen expandida dentro del modal */
.modal-content {
    max-width: 80%;
    max-height: 80%;
    object-fit: contain;
}

/* Para el estilo del cursor sobre la imagen del modal */
.modal-content:hover {
    cursor: zoom-out;
}
</style>