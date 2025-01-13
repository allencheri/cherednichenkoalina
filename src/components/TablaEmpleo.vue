<template>
    <div class="text-center my-4">
        <h3 class="font-weight-bold text-uppercase text-primary position-relative d-inline-block mt-4">
            <i class="bi bi-file-earmark-person"></i>
            TRABAJA CON NOSOTROS
            <span class="underline-effect"></span>
            <router-link to="/" class="btn btn-custom"><i class="bi bi-arrow-return-left me-2"></i></router-link>
        </h3>
    </div>

    <div class="container-fluid border p-4 mt-5">
        <div class="col-10 col-m-6 col-lg-6 mx-auto w-100">
            <form class="form-in-line">
                <div class="input-group-text mb-3">
                    <span class="input-group-text me-2">Apellidos</span>
                    <input type="text" class="form-control sm w-50" placeholder="Apellidos"
                        v-model="datosEmpleado.apellidos">
                    <span class="input-group-text me-2 ms-4">Nombre</span>
                    <input type="text" class="form-control sm w-50" placeholder="Nombre" v-model="datosEmpleado.nombre">
                </div>
                <div class="input-group-text mb-3">
                    <span class="input-group-text me-2">Email</span>
                    <input type="text" class="form-control sm w-50" placeholder="Email" v-model="datosEmpleado.email">
                    <span class="input-group-text me-2 ms-4">Movil</span>
                    <input type="text" class="form-control sm w-25" placeholder="Movil" v-model="datosEmpleado.movil">
                </div>

                <div class="input-group-text mb-3">
                    <span class="input-group-text me-2">Departamento:</span>
                    <select name="provincia" id="provincia" class="form-select w-50">
                        <option value="" disabled>Departamento</option>
                        <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.nombre">
                            {{ categoria.nombre }}</option>
                    </select>

                    <span class="input-group-text cuatom-span ms-4">Modalidad</span>
                    <div class="d-flex justify-content-evenly align-items-center w-50 flex-wrap">
                        <div>
                            <input id="remoto" class="form-check-input ms-2" type="radio" name="modalidad"
                                v-model="datosEmpleado.modalidad" value="Remoto">
                            <label for="remoto" class="custom-span me-2 ms-1">Remoto</label>
                        </div>
                        <div>
                            <input id="hibrido" class="form-check-input ms-2" type="radio" name="modalidad"
                                v-model="datosEmpleado.modalidad" value="Hibrido">
                            <label for="hibrido" class="custom-span me-2 ms-1">Híbrido</label>
                        </div>
                        <div>
                            <input id="presencial" class="form-check-input ms-2" type="radio" name="modalidad"
                                v-model="datosEmpleado.modalidad" value="Presencial">
                            <label for="presencial" class="custom-span me-2 ms-1">Presencial</label>
                        </div>
                    </div>

                </div>

                <div class="input-group-text mb-3 w-100  flex-column">
                    <span for="comentarios" class="input-group-text mb-2 mt-2">Comentarios: </span>
                    <textarea id="comentarios" placeholder="Comentarios (máximo 256 caracteres)"
                        class="form-control ms-2 w-100" rows="4" maxlength="256"></textarea>
                </div>

                <div class="input-group-text mb-3">
                    <span class="input-group-text me-2">CV(PDF)</span>
                    <input type="file" class="form-control sm w-100">
                </div>

                <div class="container text-center mt-4">
                    <input type="checkbox" v-model="datosEmpleado.avisolegal" class="me-2">He leido y acepto la
                    <router-link to="/privacidad">Politica de privacidad</router-link>
                </div><br>


                <input class="btn btn-primary m-2 col-2 p-2 text-align-center" type="submit"
                    @click.prevent="grabarCandidato()" value="Enviar">
            </form>

            <div class="container my-2 mt-5 mb-5">
                <div class="table-responsive">

                    <h4 class="font-weight-bold text-uppercase text-primary position-relative d-inline-block mb-4">
                        <i class="bi bi-file-earmark-person"></i>
                        GESTIÓN CANDIDATOS
                        <span class="underline-effect"></span>
                    </h4>

                    <table class="table table-striped">
                        <thead class="table-primary rounded-header text-center">
                            <tr>
                                <th scope="col" class="w-10 align-middle">Nombre</th>
                                <th scope="col" class="w-5 align-middle">Apellidos</th>
                                <th scope="col" class="w-10 align-middle">Email</th>
                                <th scope="col" class="w-10 align-middle">Movil</th>
                                <th scope="col" class="w-10 align-middle">Departamento</th>
                                <th scope="col" class="w-5 align-middle">Modalidad</th>
                                <th scope="col" class="pale-yellow text-center bg-warning">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="candidato in candidatos" :key="candidato.movil">
                                <td class="align-middle">{{ candidato.nombre }}</td>
                                <td class="align-middle">{{ candidato.apellidos }}</td>
                                <td class="align-middle">{{ candidato.email }}</td>
                                <td class="align-middle">{{ candidato.movil }}</td>
                                <td class="align-middle">{{ candidato.categoria }}</td>
                                <td class="align-middle">{{ candidato.modalidad }}</td>
                                <td class="text-center align-middle table-warning">
                                    <div>
                                        <button class="btn btn-warning m-2" @click="seleccionaCandidato(candidato)">
                                            <i class="fas fa-pencil-alt"></i>
                                        </button>
                                        <button class="btn btn-danger m-2" @click="deleteCandidato(candidato)">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>



    </div>



</template>

<script>
import Swal from 'sweetalert2';

export default {
    name: "TablaEmpleo",
    components: {

    },

    data() {
        return {
            datosEmpleado: {
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
        }
    },

    mounted() {
        this.getDepartamento();
        this.getCandidatos();
    },

    computed: {
        candidatosPorPagina() {
            const indiceInicial = (this.currentPage - 1) * this.pageSize;
            return this.candidatos.slice(indiceInicial, indiceInicial + this.pageSize);
        },


    },

    methods: {


        async grabarCandidato() {

            if (this.datosEmpleado.apellidos && this.datosEmpleado.nombre && this.datosEmpleado.email && this.datosEmpleado.movil && this.datosEmpleado.modalidad) {
                if (this.datosEmpleado.avisolegal) {
                    if (this.datosEmpleado.comentarios.length > 256) this.datosEmpleado.comentarios = "";
                    try {
                        const response = await fetch('http://localhost:3000/candidatos');
                        if (!response.ok) {
                            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
                        }

                        const candidatosExistentes = await response.json();

                        // Verificar si el email ya está registrado
                        const candidatoExistente = candidatosExistentes.find(c => c.email === this.datosEmpleado.email);

                        if (candidatoExistente) {
                            // Si el email ya existe, mostrar un mensaje de error
                            this.mostrarAlerta('Error', 'El email ya está registrado.', 'error');
                        } else {
                            // Si el DNI no existe, agregar el usuario a la base de datos
                            const crearResponse = await fetch('http://localhost:3000/candidatos', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(this.datosEmpleado)
                            });

                            if (!crearResponse.ok) {
                                throw new Error('Error al guardar el empleado: ' + crearResponse.statusText);
                            }

                            const nuevoCandidato = await crearResponse.json();
                            this.candidatos.push(nuevoCandidato);
                            this.mostrarAlerta('Aviso', 'Candidatura Enviada', 'success');
                            this.resetForm();
                        }

                    } catch (error) {
                        console.error('Error al conectar con el servidor:', error.message);
                        this.mostrarAlerta('Error', 'No se pudo conectar con el servidor.', 'error');
                    }
                } else {
                    this.mostrarAlerta('Error', 'Debe aceptar la política de privacidad para continuar', 'error');
                }
            } else {
                this.mostrarAlerta('Error', 'Por favor, completa todos los campos requeridos.', 'error');
            }
        },


        async seleccionaCandidato(candidato) {
            // Buscar el usuario por email en el archivo JSON
            try {
                this.resetForm()
                const response = await fetch('http://localhost:3000/candidatos');
                if (!response.ok) {
                    throw new Error('Error en la solicitud: ' + response.statusText);
                }
                const candidatos = await response.json();

                const candidatoEncontrado = candidatos.find(c => c.email === candidato.email);


                if (candidatoEncontrado) {
                    this.datosEmpleado = candidato;
                } else {
                    this.mostrarAlerta('Error', 'Candidato no encontrado en el servidor.', 'error');
                }
            } catch (error) {
                console.error(error);
                this.mostrarAlerta('Error', 'No se pudo cargar el candidato desde el servidor.', 'error');
            }
        },

        async deleteCandidato(candidato) {
            try {
                const response = await fetch('http://localhost:3000/candidatos');
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
                }

                const candidatosExistentes = await response.json();
                const candidatoExistente = candidatosExistentes.find(c => c.email === candidato.email);
                if (candidatoExistente) {
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
                this.resetForm()
            } catch (error) {
                console.error(error);
            }
        },

        async modificarUsuario() {
            try {
                this.editEmail = false;
                const response = await fetch('http://localhost:3000/candidatos');
                if (!response.ok) {
                    throw new Error('Error al obtener los candidatos: ' + response.statusText);
                }

                const candidatosExistentes = await response.json();

                // Verificar si el DNI ya está registrado
                let candidatoExistente = candidatosExistentes.find(c => c.email === this.candidato.email);

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
                    this.mostrarAlerta("Error", "Usuario no encontrado", "error")
                }
                this.resetForm()
            } catch (error) {
                console.error(error);
                this.mostrarAlerta('Error', 'No se pudo modificar el usuario.', 'error');
            }
        },

        validarEmail(email) {
            const emailPattern = /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(\.[a-zA-Z]{2, })+$/;
            if (!emailPattern.test(email)) {
                this.mostrarAlerta('Error', 'Formato correo electronico no válido', 'error')
                this.emailError = "";
            } else {
                return true;
            }
        },

        validarMovil(movil) {
            if (movil === '') {
                return true;
            }

            const movilRegex = /^[67]\d{8}$/;

            if (!movilRegex.test(movil)) {
                this.mostrarAlerta('Error', 'Movil con formato no válido', 'error');
                return false;
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
            this.datosEmpleado = {
                apellidos: "",
                nombre: "",
                email: "",
                movil: "",
                cv: "",
                categoria: "",
                modalidad: "",
                avisolegal: ""
            }
        },

        async getDepartamento() {
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
                const response = await fetch("http://localhost:3000/candidatos");
                if (!response.ok) {
                    throw new Error("Error en la solicitud: " + response.statusText);
                }
                const candidatos = await response.json();
                console.log(candidatos);
                this.candidatos = candidatos;
            } catch (error) {
                console.error(error);
            }
        }



    },
};


</script>
