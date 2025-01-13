<template>
    <h3 class="font-weight-bold text-uppercase text-primary position-relative d-inline-block mt-4">
        <i class="bi bi-chat-left-text"></i>
        ZONA DE COMENTARIOS
        <span class="underline-effect"></span>
        <router-link to="/" class="btn btn-custom"><i class="bi bi-arrow-return-left me-2"></i></router-link>
    </h3>

    <div class="container-fluid border p-4 mt-5">
        <div class="col-10 col-m-6 col-lg-6 mx-auto w-100">
            <form class="form-in-line">
                <div class="input-group-text mb-3">
                    <span class="input-group-text me-2">Email</span>
                    <input type="text" class="form-control sm w-50" placeholder="Email"
                        v-model="comentario.clienteEmail">

                    <span class="input-group-text me-2 ms-4">Movíl</span>
                    <input type="text" class="form-control sm w-50" placeholder="Movíl"
                        v-model="comentario.clienteMovil">
                </div>

                <div class="input-group-text mb-3 w-100  flex-column">
                    <span for="comentarios" class="input-group-text mb-2 mt-2">Mensaje: </span>
                    <textarea id="comentarios" placeholder="Comentarios (máximo 256 caracteres)"
                        class="form-control ms-2 w-100" rows="4" maxlength="256"
                        v-model="comentario.clienteMensaje"></textarea>
                </div>

                <div class="star-valor input-group-text mb-3 w-100">
                    <span for="comentarios" class="input-group-text mb-2 mt-2 me-4">Valoración: </span>
                    <span v-for="n in 5" :key="n"
                        :class="n <= comentario.clienteValor ? 'bi bi-star-fill' : 'bi bi-star'" @click="setValor(n)"
                        class="star-icon"></span>
                </div>
                <button class="btn btn-light btn-sm p-0 m-1" style="border-radius: 10px" @click.prevent="resetForm()"><i
                        class="fa fa-refresh"></i></button>

                <div class="mt-4">
                    <input type="checkbox" class="me-2" placeholder="lopd" v-model="comentario.lopd">
                    <label>He leido y acepto la <a href="/privacidad">Política de Privacidad</a></label>
                </div>

                <input class="btn btn-primary m-2 mt-4 col-2 p-2 text-align-center" type="submit"
                    @click.prevent="grabarComentario()" value="Enviar">
            </form>
        </div>
    </div>

    <div class="container my-2 mt-5 mb-5">
        <div class="table-responsive">
            <h4 class="font-weight-bold text-uppercase text-primary position-relative d-inline-block mb-4">
                <i class="bi bi-file-earmark-bar-graph"></i>
                TABLA DE COMENTARIOS
                <span class="underline-effect"></span>
            </h4>

            <table class="table table-striped">
                <thead class="table-primary rounded-header text-center">
                    <tr>
                        <th scope="col" class="w-10 align-middle">ID</th>
                        <th scope="col" class="w-5 align-middle">Fecha</th>
                        <th scope="col" class="w-10 align-middle">Email</th>
                        <th scope="col" class="w-10 align-middle">Mensaje</th>
                        <th scope="col" class="w-10 align-middle">Valoración</th>
                        <th scope="col" class="pale-yellow text-center bg-warning">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="comentario in comentarios" :key="comentario.id">
                        <td class="align-middle">{{ comentario.id }}</td>
                        <td class="align-middle">{{ comentario.fechaComentario }}</td>
                        <td class="align-middle">{{ comentario.clienteEmail }}</td>
                        <td class="align-middle">{{ comentario.clienteMensaje }}</td>
                        <td class="align-middle">{{ comentario.clienteValor }}</td>
                        <td class="text-center align-middle table-warning">
                            <div>
                                <button class="btn btn-warning m-2" @click="seleccionaComentario(comentario)">
                                    <i class="fas fa-pencil-alt"></i>
                                </button>
                                <button class="btn btn-danger m-2" @click="deleteComentario(comentario)">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
    name: "TablaComentarios",

    data() {
        return {
            comentario: {
                clienteEmail: "",
                clienteMensaje: "",
                fechaComentario: "",
                clienteMovil: "",
                clienteValor: "",
                lopd: false,
            },
            comentarios: []
        };
    },

    mounted() {
        this.getComentarios();
    },

    methods: {
        setValor(n) {
            this.comentario.clienteValor = n;
        },

        async grabarComentario() {
            if (this.comentario.clienteEmail && this.comentario.clienteMovil && this.comentario.lopd) {
                try {
                    const usuariosResponse = await fetch('http://localhost:3000/usuarios');
                    if (!usuariosResponse.ok) {
                        throw new Error('Error al obtener los usuarios: ' + usuariosResponse.statusText);
                    }

                    const usuarios = await usuariosResponse.json();
                    const usuarioExistente = usuarios.find(u => u.email === this.comentario.clienteEmail);

                    if (usuarioExistente) {
                        this.comentario.fechaComentario = new Date().toLocaleDateString(); 

                        if (this.comentario.id) {
                          
                            const comentarioResponse = await fetch(`http://localhost:3000/comentarios/${this.comentario.id}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(this.comentario),
                            });

                            if (!comentarioResponse.ok) {
                                throw new Error('Error al actualizar el comentario: ' + comentarioResponse.statusText);
                            }

                           
                            const index = this.comentarios.findIndex(c => c.id === this.comentario.id);
                            if (index !== -1) {
                                this.comentarios[index] = { ...this.comentario };
                            }

                            this.mostrarAlerta('Aviso', 'Comentario actualizado correctamente', 'success');
                        } else {
                          
                            const comentarioResponse = await fetch('http://localhost:3000/comentarios', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(this.comentario),
                            });

                            if (!comentarioResponse.ok) {
                                throw new Error('Error al guardar el comentario: ' + comentarioResponse.statusText);
                            }

                            const nuevoComentario = await comentarioResponse.json();
                            this.comentarios.push(nuevoComentario);
                            this.mostrarAlerta('Aviso', 'Comentario enviado', 'success');
                        }

                        this.resetForm();
                    } else {
                        this.mostrarAlerta('Error', 'El email no está registrado como usuario.', 'error');
                    }
                } catch (error) {
                    console.error(error);
                }
            } else {
                this.mostrarAlerta('Error', 'Por favor, completa todos los campos requeridos.', 'error');
            }
        },


        async getComentarios() {
            try {
                const response = await fetch("http://localhost:3000/comentarios");
                if (!response.ok) {
                    throw new Error("Error en la solicitud: " + response.statusText);
                }
                this.comentarios = await response.json();
            } catch (error) {
                console.error(error);
            }
        },

        async seleccionaComentario(comentario) {
            try {
                this.resetForm();
                const response = await fetch('http://localhost:3000/comentarios');
                if (!response.ok) {
                    throw new Error('Error en la solicitud: ' + response.statusText);
                }
                const comentarios = await response.json();

                const comentarioEncontrado = comentarios.find(c => c.clienteEmail === comentario.clienteEmail);

                if (comentarioEncontrado) {
                    this.comentario = { ...comentarioEncontrado };
                } else {
                    this.mostrarAlerta('Error', 'Candidato no encontrado en el servidor.', 'error');
                }
            } catch (error) {
                console.error(error);
                this.mostrarAlerta('Error', 'No se pudo cargar el candidato desde el servidor.', 'error');
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
            this.comentario = {
                clienteEmail: "",
                clienteMensaje: "",
                fechaComentario: "",
                clienteMovil: "",
                clienteValor: "",
                lopd: false,
            };
        },

        async deleteComentario(comentario) {
            try {
                const response = await fetch(`http://localhost:3000/comentarios/${comentario.id}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error('Error al eliminar el comentario: ' + response.statusText);
                }

                this.comentarios = this.comentarios.filter(c => c.id !== comentario.id);
                this.mostrarAlerta('Aviso', 'Comentario eliminado correctamente', 'success');
            } catch (error) {
                console.error(error);
                this.mostrarAlerta('Error', 'No se pudo eliminar el comentario.', 'error');
            }
        },
    },
};
</script>

<style scoped>
.star-valor {
    font-size: 2rem;
    color: #ffc107;
    cursor: pointer;
}

.star-icon {
    margin-right: 5px;
}
</style>
