<template>
    <h3 class="text-center font-weight-bold mt-4 pt-4 pb-4 text-primary">
        <i class="bi bi-chat-right-quote me-2"></i> CONTACTAR
    </h3>

    <div class="container d-flex justify-content-center align-items-center mb-5">
        <div class="card p-5 bg-light" style="max-width: 600px; width: 100%; border-radius: 20px;">
            <form @submit.prevent="enviarCorreo">
                <div class="mb-4">
                    <label for="nombre" class="form-label">Nombre</label>
                    <input v-model="contactos.nombre" type="text" class="form-control" id="nombre" placeholder="Nombre" required>
                </div>

                <div class="mb-4">
                    <label for="telefono" class="form-label">Teléfono</label>
                    <input v-model="contactos.telefono" type="tel" class="form-control" id="telefono" placeholder="678909876" required>
                </div>

                <div class="mb-4">
                    <label for="email" class="form-label">Email</label>
                    <input v-model="contactos.email" type="email" class="form-control" id="email" placeholder="ejemplo@ejemplo.com">
                </div>

                <div class="mb-4">
                    <label for="mensaje" class="form-label">Mensaje</label>
                    <textarea v-model="contactos.mensaje" class="form-control" id="mensaje" rows="4" placeholder="Escribe tu mensaje" required></textarea>
                </div>

                <button type="submit" class="btn btn-primary w-100" style="border-radius: 10px;">Enviar</button>
            </form>
        </div>
    </div>
</template>

<script>
import emailjs from 'emailjs-com';

export default {
    name: "TablaContacto",

    data() {
        return {
            contactos: {
                nombre: '',
                telefono: '',
                email: '',
                mensaje: '',
            }
        }
    },

    methods: {
        // Método de validación de nombre
        esNombreValido() {
            return this.contactos.nombre.trim() !== '';
        },

        // Método de validación de teléfono (Empieza con 6 o 7 y tiene 9 dígitos)
        esTelefonoValido() {
            const regexTelefono = /^[67]\d{8}$/;
            return regexTelefono.test(this.contactos.telefono);
        },

        // Método de validación de email
        esEmailValido() {
            const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return this.contactos.email === '' || regexEmail.test(this.contactos.email);
        },

        // Enviar correo solo si las validaciones son correctas
        enviarCorreo() {
            // Verificar que todos los campos son válidos
            if (!this.esNombreValido()) {
                alert('Por favor ingrese un nombre válido.');
                return;
            }

            if (!this.esTelefonoValido()) {
                alert('Por favor ingrese un teléfono válido.');
                return;
            }

            if (!this.esEmailValido()) {
                alert('Por favor ingrese un email válido.');
                return;
            }

            const templateParams = {
                nombre: this.contactos.nombre,
                telefono: this.contactos.telefono,
                email: this.contactos.email,
                mensaje: this.contactos.mensaje
            };

            // Enviar el correo usando EmailJS
            emailjs.send('service_r8i9768', 'template_0qraxw9', templateParams, 'gP-fl2kLMiBf0N2N-')
                .then((response) => {
                    console.log('Correo enviado exitosamente', response);
                    alert('Tu mensaje ha sido enviado con éxito.');
                    // Limpiar el formulario después de enviar
                    this.contactos = { nombre: '', telefono: '', email: '', mensaje: '' };
                })
                .catch((error) => {
                    console.error('Error al enviar correo', error);
                    alert('Error al enviar el correo. Por favor, inténtalo de nuevo más tarde.');
                });
        }
    }
}
</script>

<style scoped>
</style>
