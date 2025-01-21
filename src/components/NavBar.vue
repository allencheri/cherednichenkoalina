<template>
  <div id="navbar" class="container">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">

            <li class="nav" v-if="isAdmin">
              <router-link to="/" class="nav-link text-white" exact-active-class="active">Inicio</router-link>
            </li>

            <li class="nav">
              <router-link to="/usuarios" class="nav-link text-white" exact-active-class="active">Usuarios</router-link>
            </li>

            <li class="nav">
              <router-link to="/empleo" class="nav-link text-white" exact-active-class="active">Empleo</router-link>
            </li>

            <li class="nav">
              <router-link to="/articulos" class="nav-link text-white"
                exact-active-class="active">Articulos</router-link>
            </li>

            <li class="nav">
              <router-link to="/contacto" class="nav-link text-white" exact-active-class="active">Contacto</router-link>
            </li>

            <li class="nav">
              <router-link to="/comentarios" class="nav-link text-white"
                exact-active-class="active">Comentarios</router-link>
            </li>


          </ul>

          <div class="d-flex ms-auto">
            <input class="form-control form-control-sm me-2 w-50" type="search" placeholder="Buscar..."
              aria-label="Search">
            <button class="btn btn-outline-light btn-sm rounded-circle" type="submit">
              <i class="bi bi-search"></i>
            </button>
          </div>

          <div class="d-flex align-items-center">
            <div class="dropdown m-2">
              <button class="btn btn-light btn-sm rounded-circle shadow-sm" type="button" id="dropdownMenuButton1"
                data-bs-toggle="dropdown" aria-expanded="false" aria-label="Menú de usuario">
                <i class="bi bi-person fs-5"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end shadow-sm" 
                  :class="{ show: isDropdownVisible }" 
                  aria-labelledby="dropdownMenuButton1">
                  
                <li><a class="dropdown-item" href="/login">Acceder</a></li>
                <li><a class="dropdown-item" href="/registro">Registrar</a></li>
                <li><a class="dropdown-item" href="#" @click="logout">Cerrar sesión</a></li>
              </ul>
            </div>
          </div>


        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>


<script>
export default {
  name: "NavBar",
  data() {
    return {
      isDropdownVisible: false,
      isAdmin: false,
    };
  },
  mounted() {
    //Comprobar si el usuario está logueado
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
  },
  methods: {
    toggleDropdown() {
      console.log("botón pulsado");
      this.isDropdownVisible = !this.isDropdownVisible;
    },

    logout() {
      localStorage.removeItem('isLogueado');
      localStorage.removeItem('isAdmin');

      this.$router.push({ name: 'login' }).then(() => {
        window.location.reload();
      });
    }
  }
};
</script>

<style scoped>
.navbar {
  border-radius: 0px 0px 5px 5px;
}

.nav-link.active {
  color: #FAD02E !important;
  font-size: 1.1rem;
  transition: font-size 0.5s ease;
}
</style>