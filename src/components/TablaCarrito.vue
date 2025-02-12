<template>
    <div class="container">
        <h3 class="text-center font-weight-bold mt-4 pt-4 pb-4 text-primary">
            <i class="bi bi-cart"></i> CARRITO DE LA TIENDA
        </h3>

        <table class="table table-striped">
            <thead>
                <tr class="table-primary mt-4">
                    <th scope="col" class="w-10 text-center align-middle">ID</th>
                    <th scope="col" class="w-20 text-center align-middle">Nombre</th>
                    <th scope="col" class="w-10 text-center align-middle">Precio</th>
                    <th scope="col" class="w-10 text-center align-middle">Cantidad</th>
                    <th scope="col" class="w-10 text-center align-middle">Foto</th>
                    <th scope="col" class="table-primary text-center align-middle">Eliminar</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="articulo in cartStore.items" :key="articulo._id">
                    <!-- ID -->
                    <td class="text-center align-middle">
                        <span class="badge bg-info">{{ truncarId(articulo._id) }}</span>
                    </td>

                    <!-- Nombre -->
                    <td class="text-center align-middle">
                        <strong>{{ articulo.nombre }}</strong>
                    </td>

                    <!-- Precio -->
                    <td class="text-center align-middle">
                        <span class="fw-bold">{{ articulo.precio }} &euro;</span>
                    </td>

                    <!-- Cantidad -->
                    <td class="text-center align-middle">
                        <div class="d-flex justify-content-center align-items-center">
                            <button class="btn btn-sm btn-secondary me-2"
                                @click="cartStore.decrementQuantity(articulo._id)">-</button>
                            <input type="number" v-model="articulo.quantity" min="1" max="articulo.stock"
                                @change="cartStore.updateQuantity(articulo._id, articulo.quantity)"
                                class="form-control w-25 text-center" />
                            <button class="btn btn-sm btn-primary ms-2"
                                @click="cartStore.incrementQuantity(articulo._id)">+</button>
                        </div>
                    </td>

                    <!-- Imagen -->
                    <td class="text-center align-middle">
                        <img :src="urlBaseImg + articulo.imagen_url" alt="Foto de producto" width="80" height="80"
                            class="img-fluid rounded" @click="openModal(articulo)" />
                    </td>

                    <!-- Eliminar -->
                    <td class="text-center align-middle">
                        <button class="btn btn-danger" @click="removeFromCart(articulo._id)">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Total -->
        <div class="d-flex justify-content-between align-items-center mt-4">
            <h3 class="font-weight-bold text-primary">Total: {{ cartStore.totalPrice }} &euro;</h3>
            <!-- Botón Finalizar compra -->
            <button class="btn btn-warning" @click="finalizarCompra">Finalizar compra</button>
        </div>

        <!-- Modal -->
        <div v-if="isModalOpen" class="modal" @click="closeModal">
            <div class="modal-content" @click.stop>
                <img :src="imagenSeleccionada" alt="Imagen ampliada" class="modal-image">
            </div>
        </div>
    </div>
</template>

<script>
import { useCartStore } from '@/store/carts';

export default {
    data() {
        return {
            urlBaseImg: 'http://localhost:5000/uploads/img/',
            isModalOpen: false,
            imagenSeleccionada: null
        }
    },

    computed: {
        cartStore() {
            return useCartStore();
        },
    },
    methods: {
        truncarId(id) {
            return id.slice(-8);
        },

        removeFromCart(id) {
            const cartStore = useCartStore();
            cartStore.removeFromCart(id);
        },

        openModal(articulo) {
            this.imagenSeleccionada = this.urlBaseImg + articulo.imagen_url;
            this.isModalOpen = true;
        },

        closeModal() {
            this.isModalOpen = false;
        },

        updateQuantity(articulo) {
            this.cartStore.updateQuantity(articulo._id, articulo.quantity);
        },

        finalizarCompra() {
            
        }
    }
}
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
    max-width: 50%;
    max-height: 50%;
    object-fit: contain;
}

.modal-content:hover {
    cursor: zoom-out;
}
</style>
