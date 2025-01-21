<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div >
                <div class="text-center my-4">
                    <h5 class="font-weight-bold text-uppercase text-primary position-relative d-inline-block">
                        <i class="bi bi-people-fill me-2"></i> Iniciar sesión
                        
                    </h5>
                </div>

                <form @submit.prevent="iniciarSesion" class="shadow p-4 rounded border">
                    <div class="mb-3">
                        <label for="dni" class="form-label">DNI:</label>
                        <input type="text" id="dni" class="form-control" v-model="dni" required />
                    </div>

                    <div class="mb-3">
                        <label for="pass" class="form-label">Contraseña:</label>
                        <input type="password" id="pass" class="form-control" v-model="pass" required />
                    </div>

                    <div class="d-flex justify-content-between align-items-center">
                        <router-link to="/" class="btn btn-outline-secondary">
                            <i class="bi bi-arrow-return-left me-2"></i>Volver
                        </router-link>
                        <button type="submit" class="btn btn-primary">Iniciar sesión</button>
                    </div>
                </form>

                <!-- Mensaje de error -->
                <div v-if="errorMessage" class="alert alert-danger mt-3">
                    {{ errorMessage }}
                </div>

                <!-- Mensaje de éxito -->
                <div v-if="successMessage" class="alert alert-success mt-3">
                    {{ successMessage }}
                </div>
            </div>
        </div>
    </div>
</template>



<script>
//import Swal from 'sweetalert2';
import passport from '../config/passport.mjs';

export default {
    name: "TablaLogin",
    components: {

    },
    data() {
        return {
            dni: "",
            pass: "",
            errorMessage: "",
            successMessage: "",
            usuarios: [] // Aquí se almacenarán los usuarios cargados desde el archivo JSON
        };
    },

    created() {
        // Cargar los usuarios desde el archivo datos.json al crear el componente
        this.getUsuarios();
    },

    methods: {

        async resetForm() {
            this.dni = "";
            this.pass = "";
        },

        async getUsuarios() {
            try {
                const response = await fetch('http://localhost:3000/usuarios');
                if (!response.ok) {
                    throw new Error('Error en la solicitud: ' + response.statusText);
                }

                // Obtener y ordenar usuarios por apellidos y luego por nombre
                this.usuarios = (await response.json()).sort((a, b) =>
                    a.apellidos.localeCompare(b.apellidos) || a.nombre.localeCompare(b.nombre)
                );

            } catch (error) {
                console.error(error);
            }
        },


        async iniciarSesion() {
            // Buscar el usuario con el DNI proporcionado
            const usuario = this.usuarios.find((user) => user.dni === this.dni);

            // Verificar si el usuario existe
            if (usuario) {
                // Verificar la contraseña usando passport para compararla con la encriptada
                const contrasenaCorrecta = await passport.verificarContrasena(
                    this.pass,
                    usuario.pass
                );

                if (contrasenaCorrecta) {
                    if(usuario.tipo === "admin"){          
                        this.errorMessage = ""; // Limpiar mensaje de error si las credenciales son correctas
                        this.successMessage = "Inicio de sesión exitoso";

                        localStorage.setItem('isLogueado', 'true')
                        localStorage.setItem('isAdmin', 'true')

                        this.$router.push({ name: 'inicio' }).then(() => {
                            window.location.reload(); 
                        });
                    }
                } else {
                    this.errorMessage = "DNI o contraseña incorrectos. Inténtalo de nuevo.";
                    this.successMessage = "";
                    this.resetForm();
                }
            } else {
                this.errorMessage = "DNI o contraseña incorrectos. Inténtalo de nuevo.";
                this.successMessage = "";
                this.resetForm();
            }
        }
    }
};
</script>

<style scoped>
.container {
    max-width: 400px;
    margin-top: 50px;
}
</style>