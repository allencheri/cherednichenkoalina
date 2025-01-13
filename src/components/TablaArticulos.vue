<template>
    <div class="text-center my-4">
        <h3 class="font-weight-bold text-uppercase text-primary position-relative d-inline-block mt-4">
            <i class="bi bi-gear"></i>
            GESTION DE ARTÍCULOS
            <span class="underline-effect"></span>
            <router-link to="/" class="btn btn-custom"><i class="bi bi-arrow-return-left me-2"></i></router-link>
        </h3>
    </div>

    <div class="container-fluid border p-4 mt-5">
        <div class="col-10 col-m-6 col-lg-6 mx-auto w-100">
            <form class="form-in-line">
                <div class="input-group-text mb-3">
                    <span class="input-group-text me-2 ms-4">Nombre</span>
                    <input type="text" class="form-control sm w-50" placeholder="Nombre" v-model="articulo.nombre">

                    <span class="input-group-text me-2 ms-4">Categoria</span>
                    <select class="form-select w-50" v-model="articulo.categoria">
                        <option v-for="categoria in categorias" :key="categoria">
                            {{ categoria }}
                        </option>
                    </select>
                </div>
                <div class="input-group-text mb-3">
                    <span class="input-group-text mb-2 mt-2">Descripción: </span>
                    <textarea id="comentarios" placeholder="Descripción de artículo" class="form-control ms-2" rows="4"
                        maxlength="256" v-model="articulo.descripcion"></textarea>

                    <span class="input-group-text me-2 ms-4">Precio Unitario</span>
                    <input type="number" class="form-control sm w-25" v-model="articulo.precio_unitario">
                </div>

                <div class="input-group-text mb-3">
                    <span class="input-group-text me-2 ms-4">Stock</span>
                    <input type="number" class="form-control sm w-50" v-model="articulo.stock">



                    <span class="input-group-text mb-2 mt-2 ms-4">Personalización:</span>
                    <textarea id="comentarios" placeholder="Detalles de personalización" class="form-control ms-2"
                        rows="4" maxlength="256" v-model="articulo.personalizacion"></textarea>
                </div>

                <div class="input-group-text mb-3 w-100">
                    <span class="input-group-text mb-2 mt-2">Imagen URL: </span>
                    <input type="url" class="form-control sm w-100 ms-2" placeholder="http://imagen-url.com">

                    <span for="comentarios" class="input-group-text mb-2 mt-2 ms-4">Fecha de Alta:</span>
                    <input type="date" class="form-control sm w-25 ms-2" placeholder="dd/mm/yyyy"
                        v-model="articulo.fechaAlta">
                </div>


                <input class="btn btn-primary m-2 col-2 p-2 text-align-center" type="submit"
                    @click.prevent="grabarArticulo()" value="Grabar">

                <input class="btn btn-primary m-2 col-2 p-2 text-align-center" type="submit"
                    @click.prevent="resetForm()" value="Limpiar">
            </form>

            <div class="container my-2 mt-5 mb-5">
                <div class="table-responsive">

                    <h4 class="font-weight-bold text-uppercase text-primary position-relative d-inline-block mb-4">
                        <i class="bi bi-table"></i>
                        TABLA DE ARTICULOS
                        <span class="underline-effect"></span>
                    </h4>

                    <table class="table table-striped">
                        <thead class="table-primary rounded-header text-center">
                            <tr>
                                <th scope="col" class="w-10 align-middle">ID</th>
                                <th scope="col" class="w-5 align-middle">Nombre</th>
                                <th scope="col" class="w-10 align-middle">Categoria</th>
                                <th scope="col" class="w-10 align-middle">Descripción</th>
                                <th scope="col" class="w-10 align-middle">Precio</th>
                                <th scope="col" class="w-5 align-middle">Stock</th>
                                <th scope="col" class="w-5 align-middle">Fecha Alta</th>
                                <th scope="col" class="pale-yellow text-center bg-warning">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="articulo in articulos" :key="articulo.id">
                                <td class="align-middle">{{ articulo.id }}</td>
                                <td class="align-middle">{{ articulo.nombre }}</td>
                                <td class="align-middle">{{ articulo.categoria }}</td>
                                <td class="align-middle">{{ articulo.descripcion }}</td>
                                <td class="align-middle">{{ articulo.precio }}</td>
                                <td class="align-middle">{{ articulo.stock }}</td>
                                <td class="align-middle">{{ articulo.fechaAlta }}</td>
                                <td class="text-center align-middle table-warning">
                                    <div>
                                        <button class="btn btn-warning m-2" @click="seleccionaArticulo(articulo)">
                                            <i class="fas fa-pencil-alt"></i>
                                        </button>
                                        <button class="btn btn-danger m-2" @click="eliminarArticulo(articulo)">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="d-flex justify-content-center my-3">
                        <button class="btn btn-primary" :disabled="currentPage === 1" @click="paginaAnterior">
                            <i class="bi bi-chevron-left"></i>
                        </button>
                        <span class="mx-3 align-self-center"> Página {{ currentPage }}</span>
                        <button class="btn btn-primary" :disabled="currentPage * pageSize >= articulosPorPagina.length"
                            @click="siguientePagina">
                            <i class="bi bi-chevron-right"></i>
                        </button>
                    </div>

                </div>
            </div>
        </div>



    </div>



</template>

<script>
import Swal from 'sweetalert2';
import { obtenerArticulos, agregarArticulo, eliminarArticulo, actualizarArticulo } from '@/js/articuloServicios.js';

export default {
    name: "TablaArticulos",

    data() {
        return {
            articulos: [],
            articulo: {
                nombre: '',
                categoria: '',
                descripcion: '',
                precio: 0.00,
                stock: 0,
                personalizacion: '',
                imagen_url: '',
                fechaAlta: ''
            },
            currentPage: 1,
            pageSize: 5,
            categorias: [
                'Electrónica',
                'Hogar',
                'Ofimática', 
                'Deporte',
                'Libros',
                'Otros'
            ]
        };
    },


    mounted() {
        this.getArticulos();
    },

    computed: {
        articulosPorPagina() {
            const start = (this.currentPage - 1) * this.pageSize;
            return this.articulos.slice(start, start + this.pageSize);
        }
    },

    methods: {

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

        async grabarArticulo() {

            // Verificar si los campos requeridos están llenos
            if (this.articulo.nombre && this.articulo.categoria && this.articulo.precio_unitario && this.articulo.stock) {

                try {
                    // Si existe el  articulo se modifica
                    if (this.articulo.id) {

                        actualizarArticulo(this.articulo.id, this.articulo)

                        this.mostrarAlerta("Aviso", "Artículo modificado correctamente", "success")
                        this.getArticulos();
                    } else {
                        // Borramos el id para que no de problemas
                        delete this.articulo.id;
                        // this.articulo.categoria = this.articulo.categoria.nombre; 
                        agregarArticulo(this.articulo);

                        this.mostrarAlerta("Aviso", "Artículo dado de alta correctamente", "success")
                        this.getArticulos();
                    }

                    this.resetForm()
                } catch (error) {
                    console.error(error);
                    this.mostrarAlerta('Error', 'No se pudo guardar el artículo.', 'error');
                }

            } else {
                this.mostrarAlerta('Error', 'Por favor, completa todos los campos requeridos.', 'error');
            }
        },

        async seleccionaArticulo(articulo) {
            // Buscar el articulo por DNI en el archivo JSON
            try {
                this.resetForm()
                const articulos = await obtenerArticulos();

                // Encontrar el articulo por su DNI
                const articuloEncontrado = articulos.find(c => c._id === articulo._id);

                if (articuloEncontrado) {

                    this.articulo = { ...articuloEncontrado };                    
                    this.articulo.fechaAlta = this.articulo.fechaAlta.split('T')[0];  // Para asegurarse de que la fecha esté en formato YYYY-MM-DD
                    
                } else {
                    this.mostrarAlerta('Error', 'Artículo no encontrado en el servidor.', 'error');
                }
            } catch (error) {
                console.error(error);
                this.mostrarAlerta('Error', 'No se pudo cargar el artículo desde el servidor.', 'error');
            }
        },

        async eliminarArticulo(articulo) {
            const resp = await Swal.fire({
                title: "¿Estás seguro?",
                html: `Desea Eliminar a <strong>${articulo.nombre}</strong> <br><br>Esta acción no se puede deshacer`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar"
            })
            if (resp.isConfirmed) {
                try {
                    if (articulo.id) {
                        eliminarArticulo(articulo.id)

                        this.mostrarAlerta("Aviso", "Artículo eliminado correctamente", "success")
                        this.getArticulos();
                    } else {
                        this.mostrarAlerta("Error", "Artículo no encontrado", "error")
                    }
                    this.resetForm();
                } catch (error) {
                    console.error(error);
                    this.mostrarAlerta('Error', 'No se pudo dar de baja el articulo.', 'error');
                }
            }
        },


        mostrarAlerta(titulo, mensaje, icono) {
            Swal.fire({
                title: titulo,
                text: mensaje,
                icon: icono,
                customClass: {
                    container: "custom-alert-container",
                    popup: "custom-alert-popup",
                    modal: "custom-alert-modal",
                },
            });
        },

        resetForm() {
            this.articulo = {
                nombre: "",
                categoria: "",
                descripcion: "",
                precio_unitario: 0.00,
                stock_disponible: 0,
                personalizacion: "",
                imagen_url: "",
                fecha_alta: ""
            };
        },


        async getArticulos() {
            try {
                this.articulos = await obtenerArticulos();

            } catch (error) {
                console.error(error);
            }
        },

        async obtenerArticulos() {
            try {
                this.articulos = await obtenerArticulos();
                console.log(this.articulos.length);
            } catch (error) {
                console.error("Error al obtener los articulos", error);
            }
        }


    },
};


</script>
