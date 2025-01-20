<template>
  <div>
    <div class="row">
      <h3 class="text-center font-weight-bold mt-4 pt-4 pb-4 text-primary"><i class="bi bi-people-fill"></i>
        REGISTRO DE USUARIOS</h3>
    </div>
    <br />
    <div class="container-fluid border p-4">
      <div class="col-10 col-m-6 col-lg-6 mx-auto w-100">
        <form @submit.prevent="grabarUsuario" class="form-in-line ">
          <div class="input-group-text mb-3">
            <span class="input-group-text curstom-span me-2">DNI-NIE</span>
            <input type="text" class="form-control sm w-25" :disabled="editDni" placeholder="DNI-NIE"
              v-model="usuario.dni" />
          </div>
          <div class="input-group-text mb-3">
            <span class="input-group-text curstom-span me-2">Apellidos</span>
            <input type="text" class="form-control sm w-50" placeholder="Apellidos" v-model="usuario.apellidos" />
            <span class="input-group-text curstom-span ms-2 me-2">Nombre</span>
            <input type="text" class="form-control sm w-50" placeholder="Nombre" v-model="usuario.nombre" />
          </div>
          <div class="input-group-text mb-3">
            <span class="input-group-text curstom-span ms-auto me-2">Direccion</span>
            <input type="text" class="form-control sm w-50" placeholder="Direccion" v-model="usuario.direccion" />

            <span class="input-group-text curstom-span ms-2 me-2">Email</span>
            <input type="text" class="form-control sm w-25" placeholder="Email" v-model="usuario.email" />

            <span class="input-group-text custom-span mx-2 ms-2">Móvil: </span>
            <input type="text" class="form-control sm w-25 " placeholder="Móvil" v-model="usuario.movil" />
          </div>

          <div class="input-group-text mb-3">
            <span class="input-group-text curstom-span me-2">Provincia</span>
            <select class="form-select sm w-25" v-model="usuario.provincia" @change="getProvincias">
              <option value="">Provincia</option>
              <option v-for="provincia in provincias" :key="provincia.id" :value="provincia">
                {{ provincia.nm }}
              </option>
            </select>

            <span class="input-group-text curstom-span me-2 ms-2">Municipio</span>
            <select class="form-select sm w-25 me-4" v-model="usuario.municipio" @change="cargarMunicipios">
              <option value="">Municipio</option>
              <option v-for="municipio in municipios" :key="municipio.id" :value="municipio">
                {{ municipio.nm }}
              </option>
            </select>

            <button class="btn btn-light btn-sm p-0 m-1" style="border-radius: 10px" @click.prevent="resetForm()"><i
                class="fa fa-refresh"></i></button>
          </div>

          <div class="input-group-text mb-3">
            <span class="input-group-text curstom-span me-2">Contraseña</span>
            <input type="password" class="form-control sm w-50" placeholder="Contraseña" v-model="usuario.pass" />
            <span class="input-group-text curstom-span ms-2 me-2">Repetir Contraseña</span>
            <input type="password" class="form-control sm w-50" placeholder="Repetir Contraseña" v-model="passrep" />
          </div>



          <!-- Botones -->
          <div class="btn-group mb-3 my-3 w-40">
            <button class="btn btn-primary btn-custom me-2" style="border-radius: 10px" @click.prevent="grabarUsuario()"
              type="submit">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import passport from "../config/passport.mjs";

export default {
  name: "TablaUsuarios",
  components: {

  },
  data() {
    return {
      usuario: {
        dni: "",
        alta: "",
        apellidos: "",
        nombre: "",
        direccion: "",
        email: "",
        provincia: "",
        municipio: {
          id: "",
          nm: "",
        },
        pass: "",
        baja: "",
        movil: "",
        tipo: "",
      },
      usuarios: [],
      provincias: [],
      municipios: [],
      currentPage: 1,
      pageSize: 5,
      errores: [],
      tipos: [],
      isChecked: false,
      usuarioSeleccionado: null,
      editDni: false,
    };
  },

  mounted() {
    this.getProvincias();
    this.getMunicipios();
  },

  computed: {
    usuariosPorPagina() {
      const usuariosFiltrados = this.filtroUsuarios;
      const indiceInicial = (this.currentPage - 1) * this.pageSize;
      return usuariosFiltrados.slice(indiceInicial, indiceInicial + this.pageSize);
    },
  },

  methods: {

    //--------------------------------------------------------//

    obtenerFechaHoy() {
      const fecha = new Date();
      const day = fecha.getDate();
      const month = fecha.getMonth() + 1;
      const year = fecha.getFullYear();
      const fechaFormateada = `${day}/${month}/${year}`;

      return fechaFormateada;

    },

    //--------------------------------------------------------//

    // Método para grabar el usuario
    async grabarUsuario() {
      if (this.usuario.dni && this.usuario.apellidos) {
        if (this.usuario.pass === this.passrep) {

          const passEncriptado = await passport.encriptarContrasena(this.usuario.pass);
          this.usuario.pass = passEncriptado;

          const response = await fetch('http://localhost:3000/usuarios');
          if (!response.ok) {
            throw new Error('Error al obtener los usuarios: ' + response.statusText);
          }

          const usuariosExistentes = await response.json();

          const usuarioExistente = usuariosExistentes.find(usuario => usuario.dni === this.usuario.dni);
          if (this.usuario.baja) {
            try {
              if (usuarioExistente) {
                usuarioExistente.baja = "";
                this.usuario.alta = this.obtenerFechaHoy();
                this.usuario.tipo = "usuario";
                
                await fetch(`http://localhost:3000/usuarios/${usuarioExistente.id}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(usuarioExistente)
                });

                this.mostrarAlerta("Aviso", "usuario dado de alta correctamente", "success");
                this.resetForm();
                this.getUsuarios();
              } else {
                this.mostrarAlerta("Error", "usuario no encontrado", "error");
              }
              this.resetForm();
            } catch (error) {
              console.error(error);
              this.mostrarAlerta('Error', 'No se pudo dar de alta el usuario.', 'error');
            }
          } else {
            try {
              this.usuario.baja = '';

              if (usuarioExistente) {
                this.mostrarAlerta('Error', 'El DNI ya está registrado.', 'error');
              } else {

                this.usuario.alta = this.obtenerFechaHoy();
                this.usuario.tipo = "usuario";


                const crearResponse = await fetch('http://localhost:3000/usuarios', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(this.usuario)
                });

                if (!crearResponse.ok) {
                  throw new Error('Error al guardar el usuario: ' + crearResponse.statusText);
                }

                const nuevousuario = await crearResponse.json();
                this.usuarios.push(nuevousuario);
                this.mostrarAlerta('Aviso', 'usuario Grabado', 'success');
                this.resetForm();
                this.getUsuarios();
              }
              this.resetForm();
            } catch (error) {
              console.error(error);

            }
          }
        } else {
          this.mostrarAlerta('Error', 'Contraseñas no iguales', 'error');
          this.resetForm();
        }
      } else {
        this.mostrarAlerta('Error', 'Por favor, completa todos los campos requeridos.', 'error');
      }
    },


    //--------------------------------------------------------//

    resetForm() {
      this.usuario = {
        dni: "",
        alta: "",
        apellidos: "",
        nombre: "",
        direccion: "",
        email: "",
        provincia: "",
        municipio: "",
        pass: "",
        passrep: "",
        baja: "",
        movil: "",
        tipo: "",
      }
      this.editDni = false;
    },

    //--------------------------------------------------------//

    validarDNI(dni) {
      if (dni === "") {
        return true;
      }
      dni = dni.toUpperCase();
      this.usuario.dni = dni;
      const dniRegex = /^[XYZ0-9][0-9]{7}[A-Z]$/;

      if (!dniRegex.test(dni)) {
        this.mostrarAlerta(
          "Error",
          "El NIE/DNI con formato no válido.",
          "error"
        );
        return false;
      }

      let dniNum = dni.substring(0, 8);
      const letra = dni.charAt(8);
      if (dniNum.charAt(0) === "X") {
        dniNum = dniNum.substring(1, 8);
        dniNum = "0" + dniNum;
      } else if (dniNum.charAt(0) === "Y") {
        dniNum = dniNum.substring(1, 8);
        dniNum = "1" + dniNum;
      } else if (dni.charAt(0) === "Z") {
        dniNum = dniNum.substring(1, 8);
        dniNum = "2" + dniNum;
      }

      const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
      const letraCalculada = letras[dniNum % 23];
      if (letra !== letraCalculada) {
        this.mostrarAlerta("Error", "DNI/NIE Incorrecto.", "error");
        return false;
      }

      return true;
    },


    //--------------------------------------------------------//

    async getProvincias() {
      try {
        const response = await fetch("http://localhost:3000/provincias");
        if (!response.ok) {
          throw new Error("Error en la solicitud: " + response.statusText);
        }
        this.provincias = await response.json();
      } catch (error) {
        console.error(error);
      }
    },


    //--------------------------------------------------------//

    async getMunicipios() {
      try {
        const response = await fetch("http://localhost:3000/municipios");
        if (!response.ok) {
          throw new Error("Error en la solicitud: " + response.statusText);
        }
        this.municipios = await response.json();
      } catch (error) {
        console.error(error);
      }
    },

    //--------------------------------------------------------//

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

    //METODOS AUXILIAROS//

    paginaAnterior() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    siguientePagina() {
      const totalPages = Math.ceil(this.filtroUsuarios.length / this.pageSize);
      if (this.currentPage < totalPages) {
        this.currentPage++;
      }
    }
  },
};
</script>