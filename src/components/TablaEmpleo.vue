<template>
    <div>
        <div class="row d-flex align-items-center">
            <h2 class="text-center front-weight-bold text-primary p-3 underline-effect"><i
                    class="bi bi-person-workspace m-2"></i>
                Trabaja con nosotros <router-link to="/"><i
                        class="bi bi-arrow-return-left me-2 black"></i></router-link> </h2>


        </div>
    </div>
    <div class="container">
        <div class="col-10 col-m-10 col-lg-10 border p-4 mx-auto">
            <form @submit.prevent="grabarCandidato" class="d-inline">

                <div class="input-group-text mb-3">
                    <span class="input-group-text custom-span me-2">Apellidos: </span>
                    <input type="text" class="form-control sm w-50" placeholder="Apellidos"
                        v-model="empleado.apellidos">
                    <span class="input-group-text custom-span mx-2">Nombre: </span>
                    <input type="text" placeholder="Nombre" class="form-control sm w-50" v-model="empleado.nombre">
                </div>

                <div class="input-group-text mb-3">
                    <span class="input-group-text custom-span me-2">Email: </span>
                    <input type="text" class="form-control sm w-75" placeholder="Email" v-model="empleado.email"
                        @blur="validarEmail(this.empleado.email)">

                    <span class="input-group-text custom-span mx-2 ms-2">Móvil: </span>
                    <input type="text" class="form-control sm w-25 " placeholder="Móvil" v-model="empleado.movil"
                        @blur="validarMovil(this.empleado.movil)">
                </div>

                <div class="input-group-text mb-3">
                    <span class="input-group-text custom-span me-2">Departamento: </span>
                    <select name="provincia" id="provincia" class="form-select w-50" v-model="empleado.categoria">
                        <option value="" disabled>Departamento</option>
                        <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.nombre">{{
                            categoria.nombre }}</option>
                    </select>

                    <span class="input-group-text custom-span mx-2">Modalidad: </span>
                    <div class="d-flex justify-content-evenly align-items-center w-50 flex-wrap">
                        <div>
                            <input id="remoto" class="form-check-input ms-2 " type="radio" name="modalidad"
                                v-model="empleado.modalidad" value="Remoto">
                            <label for="remoto" class="custom-span me-2 ms-1">Remoto</label>
                        </div>

                        <div>
                            <input id="hibrido" class="form-check-input ms-2 " type="radio" name="modalidad"
                                v-model="empleado.modalidad" value="Híbrido">
                            <label for="hibrido" class="custom-span me-2  ms-1">Híbrido</label>
                        </div>

                        <div>
                            <input id="presencial" class="form-check-input ms-2 " type="radio" name="modalidad"
                                v-model="empleado.modalidad" value="Presencial">
                            <label for="presencial" class="custom-span me-2  ms-1">Presencial</label>
                        </div>
                    </div>

                </div>

                <div class="input-group-text mb-3">
                    <span class="input-group-text custom-span me-2 h-100 p-3">Comentarios: </span>
                    <textarea class="form-control w-100" v-model="empleado.comentarios"
                        placeholder="Comentarios (máximo 256 caracteres)"
                        @blur="validarComentario(this.empleado.comentarios)"></textarea>
                </div>

                <div class="input-group-text mb-3 ">
                    <span class="input-group-text custom-span me-2">CV (.pdf): </span>
                    <input type="file" class="form-control sm w-100" placeholder="" @change="handleFileUpload">

                </div>
                <div class="container text-center">
                    <input type="checkbox" v-model="empleado.avisolegal"> He leído y acepto la <router-link
                        to="/privacidad">Política de privacidad</router-link>
                </div>
                <div class="d-flex justify-content-center flex-sm-wrap row">
                    <input class="btn btn-primary m-2 col-2" type="submit" @click.prevent="grabarCandidato"
                        value="Enviar">
                </div>
            </form>
        </div>


        <div class="container" v-if="isAdmin">
            <h5 class="text-primary p-5"><i class="bi bi-tools m-2"></i>Gestión de Candidatos</h5>
            <table class="table table-striped mt-2">
                <thead>
                    <tr class="table-primary">
                        <th scope="col" class="w-15 text-center align-middle">Apellidos</th>
                        <th scope="col" class="w-25 text-start  align-middle">Nombre</th>
                        <th scope="col" class="w-20 text-center align-middle">Email</th>
                        <th scope="col" class="w-10 text-center align-middle">Móvil</th>
                        <th scope="col" class="w-10 text-center align-middle">Categoría</th>
                        <th scope="col" class="w-10 text-center align-middle">Modalidad</th>
                        <th scope="col" class="w-10 text-center align-middle">Modalidad</th>

                        <th scope="col" class="table-info text-center align-middle">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="empleado in candidatosPorPagina" :key="empleado.id">
                        <td class="text-start align-middle">{{ empleado.apellidos }}</td>
                        <td class="text-start align-middle">{{ empleado.nombre }}</td>
                        <td class="text-center align-middle">{{ empleado.email }}</td>
                        <td class="text-start align-middle">{{ empleado.movil }}</td>
                        <td class="text-start align-middle">{{ empleado.categoria }}</td>
                        <td class="text-start align-middle">{{ empleado.modalidad }}</td>
                        <td class="text-start align-middle"><a :href=urlBase+empleado.cv target="_blank"><i
                                    class="fas fa-file-alt text-primary me-2"></i></a></td>

                        <td class="text-center align-middle table-info">
                            <div>
                                <button class="btn btn-warning m-2" @click="seleccionaCandidato(empleado)">
                                    <i class="fas fa-pencil-alt"></i>
                                </button>
                                <button class="btn btn-danger m-2" @click="deleteCandidato(empleado)"><i
                                        class="bi bi-trash"></i></button>
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
                <button class="btn btn-primary" :disabled="currentPage * pageSize >= this.candidatos.length"
                    @click="siguientePagina">
                    <i class="bi bi-chevron-right"></i>
                </button>
            </div>

        </div>
    </div>
</template>

<script>

import Swal from 'sweetalert2';
import axios from "axios";

export default {
    name: "TablaEmpleo",
    components: {

    },

    data() {
        return {
            empleado: {
                apellidos: "",
                nombre: "",
                email: "",
                movil: "",
                cv: "",
                categoria: "",
                modalidad: "",
                avisolegal: "",
                comentarios: "",
            },
            candidatos: [],
            categorias: [],
            pageSize: 5,
            currentPage: 1,
            editEmail: true,
            filtroEmpleado: "",
            file: null,
            urlBase: 'http://localhost:5000/uploads/cv/',
            isAdmin: false,
        }
    },

    mounted() {
        this.isAdmin = localStorage.getItem("isAdmin") === "true";
        this.getDepartamentos();
        this.getCandidatos();
    },

    computed: {
        candidatosPorPagina() {

            const indiceInicial = (this.currentPage - 1) * this.pageSize;
            return this.candidatos.slice(indiceInicial, indiceInicial + this.pageSize);
        },

    },

    methods: {
        // Métodos principales
        //metodo para manejar la subida del archivo
        handleFileUpload(event) {
            this.file = event.target.files[0];
        },
        // Método para grabar el candidato
        async grabarCandidato() {
            if (this.empleado.apellidos && this.empleado.email && this.empleado.nombre && this.empleado.categoria && this.empleado.movil && this.empleado.modalidad) {
                if (this.empleado.avisolegal) {
                    if (this.empleado.comentarios.length > 256) this.empleado.comentarios = "";

                    try {
                        if (!this.file) {
                            alert("Selecciona un archivo primero.");
                            return;
                        }

                        // Subida de archivo antes de enviar el candidato
                        const formData = new FormData();
                        formData.append("file", this.file);

                        const uploadResponse = await axios.post("http://localhost:5000/upload", formData, {
                            headers: { "Content-Type": "multipart/form-data" }
                        });

                        // Asignar URL del archivo subido al objeto empleado
                        this.empleado.cv = uploadResponse.data.fileUrl;

                        // Ahora sí, guardar candidato en la base de datos
                        const crearResponse = await fetch('http://localhost:3000/candidatos', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(this.empleado)
                        });

                        if (!crearResponse.ok) {
                            throw new Error('Error al guardar el usuario: ' + crearResponse.statusText);
                        }

                        const nuevoCandidato = await crearResponse.json();
                        this.candidatos.push(nuevoCandidato);
                        this.mostrarAlerta('Aviso', 'Candidatura Enviada', 'success');
                        this.limpiarFormCli();

                    } catch (error) {
                        console.error(error);
                        this.mostrarAlerta('Error', 'No se pudo grabar el empleado.', 'error');
                    }
                } else {
                    this.mostrarAlerta('Error', 'Debe aceptar la política de privacidad para continuar', 'error');
                }
            } else {
                this.mostrarAlerta('Error', 'Por favor, completa todos los campos requeridos.', 'error');
            }
        }
        ,


        async seleccionaCandidato(candidato) {
            // Buscar el comentario por el id en el archivo JSON
            try {
                this.limpiarFormCli()
                const response = await fetch('http://localhost:3000/candidatos');
                if (!response.ok) {
                    throw new Error('Error en la solicitud: ' + response.statusText);
                }
                const candidatos = await response.json();

                // Encontrar el usuario por su email
                const candidatoEncontrado = candidatos.find(candidato => candidato.email === candidato.email);


                if (candidatoEncontrado) {
                    this.empleado = candidato;
                } else {
                    this.mostrarAlerta('Error', 'Candidato no encontrado en el servidor.', 'error');
                }
            } catch (error) {
                console.error(error);
                this.mostrarAlerta('Error', 'No se pudo cargar el candidato desde el servidor.', 'error');
            }
        },

        async deleteCandidato(candidato) {
            const resp = await Swal.fire({
                title: "Are you sure?",
                html: `Desea Eliminar a <strong>${candidato.nombre} ${candidato.apellidos}</strong> <br><br>Esta accion no se puede deshacer`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar"
            })
            if (resp.isConfirmed) {
                try {
                    const response = await fetch('http://localhost:3000/candidatos');
                    if (!response.ok) {
                        throw new Error('Error al obtener los candidatos: ' + response.statusText);
                    }

                    const candidatosExistentes = await response.json();
                    // Verificar si el Email ya está registrado
                    const candidatoExistente = candidatosExistentes.find(c => c.id === candidato.id);
                    if (candidatoExistente) {
                        if (candidatoExistente.cv) {
                            const cvName = candidatoExistente.cv;
                            await axios.delete(`http://localhost:5000/uploads/cv/${cvName}`);
                        }

                        await fetch(`http://localhost:3000/candidatos/${candidatoExistente.id}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(candidatoExistente)
                        });

                        this.mostrarAlerta("Aviso", "Candidato dado de baja correctamente", "success")
                        this.getCandidatos();
                    } else {
                        this.mostrarAlerta("Error", "Candidato no encontrado", "error")
                    }
                    this.limpiarFormCli()
                } catch (error) {
                    console.error(error);
                    this.mostrarAlerta('Error', 'No se pudo dar de baja el candidato.', 'error');
                }
            }
        },

        async modificarCandidato() {
            const resp = await Swal.fire({
                title: "Are you sure?",
                html: `Desea modificar el candidato?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar"
            })
            if (resp.isConfirmed) {
                try {
                    this.editEmail = false;
                    const response = await fetch('http://localhost:3000/candidatos');
                    if (!response.ok) {
                        throw new Error('Error al obtener los candidatos: ' + response.statusText);
                    }

                    const candidatosExistentes = await response.json();

                    // Verificar si el DNI ya está registrado
                    let candidatoExistente = candidatosExistentes.find(candidato => candidato.email === this.candidato.email);

                    if (candidatoExistente) {
                        candidatoExistente = this.candidato;

                        await fetch(`http://localhost:3000/usuarios/${candidatoExistente.id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(candidatoExistente)
                        });

                        this.mostrarAlerta("Aviso", "Candidato modificado correctamente", "success")
                        this.getCandidatos();
                    } else {
                        this.mostrarAlerta("Error", "Candidato no encontrado", "error")
                    }
                    this.limpiarFormCli()
                } catch (error) {
                    console.error(error);
                    this.mostrarAlerta('Error', 'No se pudo modificar el candidato.', 'error');
                }
            }
        },



        //Métodos auxiliares: 

        //Valida el email
        validarEmail(email) {
            const emailPattern = /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
            if (!emailPattern.test(email)) {
                this.mostrarAlerta('Error', 'Formato correo electrónico no válido', 'error');
                this.emailError = "";
            } else {
                return true;
            }
        },

        //Valida el móvil
        validarMovil(movil) {
            if (movil === '') {
                // Si el campo está vacío, no hace nada
                return true;
            }
            // Comprobar el formato del móvil -> Empieza por 6 o 7 seguido de 8 dígitos
            const movilRegex = /^[67]\d{8}$/;

            if (!movilRegex.test(movil)) {
                this.mostrarAlerta('Error', 'Móvil con formato no válido.', 'error');
                return false;
            }

        },

        validarComentario(comentario) {
            if (this.empleado.comentarios.length > 256) {
                this.mostrarAlerta('Error', 'Has sobrepasado el número máximo de caracteres', 'error');
                return false;
            } else {
                this.empleado.comentarios = comentario
                return false;
            }
        },

        // Método para mostrar alertas
        mostrarAlerta(titulo, mensaje, icono) {
            Swal.fire({
                title: titulo,
                text: mensaje,
                icon: icono,
                customClass: {
                    container: 'custom-alert-container',
                    popup: 'custom-alert-popup',
                    modal: 'custom-alert-modal'
                }
            });
        },

        limpiarFormCli() {
            this.empleado = {
                apellidos: "",
                nombre: "",
                email: "",
                movil: "",
                cv: "",
                avisolegal: false,
            }
        },


        async getDepartamentos() {
            try {
                const response = await fetch("http://localhost:3000/categorias")
                if (!response.ok) {
                    throw new Error("Error en la solicitud" + response.statusText)
                }
                this.categorias = await response.json();
            } catch (error) {
                console.error(error);
            }
        },

        async getCandidatos() {
            try {
                const response = await fetch("http://localhost:3000/candidatos")
                if (!response.ok) {
                    throw new Error("Error en la solicitud" + response.statusText)
                }
                this.candidatos = await response.json();
            } catch (error) {
                console.error(error);
            }
        },

    }
}
</script>
