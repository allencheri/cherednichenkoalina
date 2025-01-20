<template>
  <div>
    <div class="row">
      <h3 class="text-center font-weight-bold mt-4 pt-4 pb-4 text-primary"><i class="bi bi-people-fill"></i>
        GESTIÓN USUARIOS</h3>
    </div>
    <br />
    <div class="container-fluid border p-4">
      <div class="col-10 col-m-6 col-lg-6 mx-auto w-100">
        <form @submit.prevent="grabarUsuario" class="form-in-line ">
          <div class="input-group-text mb-3">
            <span class="input-group-text curstom-span me-2">DNI-NIE</span>
            <input type="text" class="form-control sm w-25" :disabled="editDni" placeholder="DNI-NIE"
              v-model="usuario.dni" />

            <button class="input-group-text curstom-span me-2 ms-2" @click="buscarUsuario(usuario.dni)"><i
                class="bi bi-search"></i></button>

            <span class="input-group-text curstom-span ms-auto me-2">Fecha de Alta</span>
            <input type="date" class="form-control sm w-25" placeholder="dd/mm/yyyy" v-model="usuario.alta" />
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
            <select class="form-select sm w-25" v-model="usuario.municipio" @change="cargarMunicipios">
              <option value="">Municipio</option>
              <option v-for="municipio in municipios" :key="municipio.id" :value="municipio">
                {{ municipio.nm }}
              </option>
            </select>

            <span class="input-group-text curstom-span me-2 ms-2">Tipo</span>
            <select class="form-select sm w-25" v-model="usuario.tipo">
              <option value="" disabled>Tipo</option>
              <option v-for="tipo in tipos" :key="tipo.id" :value="tipo.nombre">{{ tipo.nombre }}</option>
            </select>


            <span class="input-group-text curstom-span ms-3">Histórico</span>
            <input id="historico" type="checkbox" class="form-check-input ms-2 me-4" v-model="isChecked" />

            <button class="btn btn-light btn-sm p-0 m-1" style="border-radius: 10px" @click.prevent="resetForm()"><i
                class="fa fa-refresh"></i></button>
          </div>

          <!-- Botones -->
          <div class="btn-group mb-3 my-3 w-40">
            <button class="btn btn-primary btn-custom me-2" style="border-radius: 10px" @click.prevent="grabarUsuario()"
              type="submit"><i class="bi bi-save2"></i>
              Alta
            </button>
            <button class="btn btn-primary btn-custom me-2" style="border-radius: 10px"
              @click.prevent="modificarUsuario()" type="submit"><i class="bi bi-cloud-check"></i>
              Modificar
            </button>
            <button class="btn btn-primary btn-custom me-2" style="border-radius: 10px"
              @click.prevent="eliminarUsuario()" type="submit"><i class="bi bi-trash3"></i>
              Eliminar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Tabla -->
  <div class="container my-2">
    <div class="table-responsive">
      <table class="table table-striped">
        <thead class="table-primary rounded-header text-center">
          <tr>
            <th scope="col" class="w-5 align-middle">DNI</th>
            <th scope="col" class="w-5 align-middle">Apellidos</th>
            <th scope="col" class="w-10 align-middle">Nombre</th>
            <th scope="col" class="w-10 align-middle">Email</th>
            <th scope="col" class="w-10 align-middle">Movil</th>
            <th scope="col" class="w-10 align-middle">Tipo</th>
            <th scope="col" class="w-5 align-middle">Fecha Baja</th>
            <th scope="col" class="table-warning text-center align-middle">Editar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuario in usuariosPorPagina" :key="usuario.id">
            <td class="align-middle">{{ usuario.dni }}</td>
            <td class="align-middle">{{ usuario.apellidos }}</td>
            <td class="align-middle">{{ usuario.nombre }}</td>
            <td class="align-middle">{{ usuario.email }}</td>
            <td class="align-middle">{{ usuario.movil }}</td>
            <td class="align-m GESTIÓN USUARIOSiddle">{{ usuario.tipo }}</td>
            <td class="align-middle">{{ usuario.baja }}</td>
            <td class="text-center align-middle table-warning">
              <div>
                <button class="btn btn-warning m-2" @click="seleccionaUsuario(usuario)">
                  <i class="fa GESTIÓN USUARIOSs fa-pencil-alt"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-center my-3">
        <button class="btn btn-primary" :disabled="currentPage === 1" @click="paginaAnterior()">
          <i class="bi bi-chevron-left"></i>
        </button>

        <span class="mx-3 align-middle mt-2">Página {{ currentPage }}</span>

        <button class="btn btn-primary" :disabled="currentPage * pageSize >= filtroUsuarios.length"
          @click="siguientePagina()">
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>

    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

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
    this.getUsuarios();
    this.getProvincias();
    this.getMunicipios();
    this.getTipos();
  },

  computed: {
    filtroUsuarios() {
      if (this.isChecked) {
        return this.usuarios;
      } else {
        return this.usuarios.filter((usuario) => !usuario.baja);
      }
    },

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
      const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
      const fechaFormateada = new Intl.DateTimeFormat('es-ES', opciones).format(fecha);
      return fechaFormateada;
    },

    convertirFecha(fecha) {
      const partes = fecha.split('-');
      return `${partes[1]}/${partes[2]}/${partes[0]}`;
    },

    //--------------------------------------------------------//

    // Método para grabar el usuario
    async grabarUsuario() {
      if (this.usuario.dni && this.usuario.apellidos) {
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

              await fetch(`http://localhost:3000/usuarios/${usuarioExistente.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuarioExistente)
              });

              this.mostrarAlerta("Aviso", "usuario dado de alta correctamente", "success");
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
              this.getUsuarios();
            }
            this.resetForm();
          } catch (error) {
            console.error(error);
            this.mostrarAlerta('Error', 'No se pudo grabar el usuario.', 'error');
          }
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

    async buscarUsuario(dni) {
      if (dni) {
        try {
          const response = await fetch('http://localhost:3000/usuarios');
          if (!response.ok) {
            throw new Error('Error al obtener los usuarios: ' + response.statusText);
          }

          const usuariosExistentes = await response.json();
          const usuarioEncontrado = usuariosExistentes.find(usuario => usuario.dni === dni);

          if (usuarioEncontrado) {
            this.usuario = { ...usuarioEncontrado };
            if (this.usuario.alta) {
              this.usuario.alta = this.usuario.alta.split('T')[0];
            }
            this.editDni = true;
            this.mostrarAlerta('usuario encontrado', `usuario con DNI ${dni} encontrado`, 'success');
          } else {
            this.mostrarAlerta('Error', 'usuario no encontrado', 'error');
            this.resetForm();
          }
        } catch (error) {
          console.error(error);
          this.mostrarAlerta('Error', 'No se pudo buscar el usuario.', 'error');
        }
      } else {
        this.mostrarAlerta('Error', 'Por favor, ingrese un DNI.', 'error');
      }
    },


    //--------------------------------------------------------//

    async getUsuarios() {
      try {
        const response = await fetch("http://localhost:3000/usuarios");
        if (!response.ok) {
          throw new Error("Error en la solicitud: " + response.statusText);
        }
        this.usuarios = await response.json();
      } catch (error) {
        console.error(error);
      }
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

    async getTipos() {
      try {
        const response = await fetch("http://localhost:3000/tiposUsuario");
        if (!response.ok) {
          throw new Error("Error en la solicitud" + response.statusText);
        }
        this.tipos = await response.json();
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


    //--------------------------------------------------------//

    async seleccionaUsuario(usuario) {
      try {
        this.resetForm()
        const response = await fetch('http://localhost:3000/usuarios');
        if (!response.ok) {
          throw new Error('Error en la solicitud: ' + response.statusText);
        }
        const usuarios = await response.json();

        const usuarioEncontrado = usuarios.find(c => c.dni === usuario.dni);
        console.log(usuarioEncontrado)


        if (usuarioEncontrado) {
          if (this.usuario.provincia) {
            this.usuario.provincia = this.provincias.find(p => p.nm === this.usuario.provincia).nm;
            if (this.usuario.provincia) {
              console.log("Provincia encontrada", this.usuario.provincia);

            }
          }

          this.usuario = { ...usuarioEncontrado };
          this.editDni = true;

          if (this.usuario.alta) {
            this.usuario.alta = this.usuario.alta.split('T')[0];
          }
        } else {
          this.mostrarAlerta('Error', 'usuario no encontrado en el servidor.', 'error');
        }
      } catch (error) {
        console.error(error);
        this.mostrarAlerta('Error', 'No se pudo cargar el usuario desde el servidor.', 'error');
      }
    },


    //--------------------MODIFICAR------------------------//

    async modificarUsuario() {
      if (this.usuario.dni && this.usuario.id) {
        try {
          const response = await fetch(`http://localhost:3000/usuarios/${this.usuario.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.usuario),
          });

          if (!response.ok) {
            throw new Error('Error al modificar el usuario: ' + response.statusText);
          }

          this.mostrarAlerta('Aviso', 'Usuario modificado con éxito', 'success');
          this.getUsuarios();
        } catch (error) {
          console.error(error);
          this.mostrarAlerta('Error', error.message || 'Hubo un error al modificar el usuario', 'error');
        }
      } else {
        this.mostrarAlerta('Error', 'Debe seleccionar un usuario para modificar', 'error');
      }
    },


    //------------------BORRAR (PONER FECHA DE BAJA)-----------------------------------//

    async eliminarUsuario() {
      try {
        const response = await fetch('http://localhost:3000/usuarios');
        if (!response.ok) {
          throw new Error('Error al obtener los usuarios: ' + response.statusText);
        }

        const usuariosExistentes = await response.json();

        const usuarioExistente = usuariosExistentes.find(usuario => usuario.dni === this.usuario.dni);

        if (usuarioExistente) {
          const hoy = this.obtenerFechaHoy();
          usuarioExistente.baja = hoy;

          await fetch(`http://localhost:3000/usuarios/${usuarioExistente.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuarioExistente)
          });

          this.mostrarAlerta("Aviso", "usuario dado de baja correctamente", "success")
          this.getusuarios();
        } else {
          this.mostrarAlerta("Error", "usuario no encontrado", "error")
        }
        this.resetForm()
      } catch (error) {
        console.error(error);
      }
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
