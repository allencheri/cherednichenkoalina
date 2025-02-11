<template>
    <div class="container">
        <h3 class="text-center font-weight-bold mt-4 pt-4 pb-4 text-primary "><i class="bi bi-cart"></i>
            CARRITO DE LA TIENDA</h3>
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
                    <td class="text-center align-middle">{{ truncarId(articulo._id) }}</td>
                    <td class="text-center align-middle">{{ articulo.nombre }}</td>
                    <td class="text-center align-middle">{{ articulo.precio }} &euro;</td>
                    <td class="text-center align-middle">{{ cartStore.totalItems }}</td>
                    <td>
                        <img :src="urlBaseImg+articulo.imagen_url" alt="Foto de producto" width="64" height="64"
                            class="img-thumbnail" @click="openModal(articulo)" />
                    </td>
                    <td>
                        <button class="btn btn-danger" @click="removeFromCart(articulo._id)">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div>
            <p>Total: {{ cartStore.totalPrice }} &euro;</p>
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

        cartItem() {
            const cartStore = useCartStore();
            return cartStore.items.length;
        },

        addToCart(articulo) {
            const cartStore = useCartStore();
            cartStore.addToCart(articulo);
        },

        removeFromCart(id) {
            const cartStore = useCartStore();
            cartStore.removeFromCart(id);
        },

        verCarrito() {
            this.$router.push({ name: 'carrito' });
        },

        openModal(articulo) {
            this.imagenSeleccionada = this.urlBaseImg+articulo.imagen_url;
            this.isModalOpen = true;
        },

        closeModal() {
            this.isModalOpen = false;
        }


    }

}
</script>

<style></style>