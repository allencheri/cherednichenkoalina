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

            <li class="nav">
              <router-link to="/" class="nav-link text-white" exact-active-class="active">Inicio</router-link>
            </li>

            <li class="nav">
              <router-link to="/usuarios" class="nav-link text-white" exact-active-class="active">Usuarios</router-link>
            </li>

            <li class="nav">
              <router-link to="/empleo" class="nav-link text-white" exact-active-class="active">Empleo</router-link>
            </li>

            <li class="nav">
              <router-link to="/articulos" class="nav-link text-white" exact-active-class="active">Articulos</router-link>
            </li>

            <li class="nav">
              <router-link to="/contacto" class="nav-link text-white" exact-active-class="active">Contacto</router-link>
            </li>

            <li class="nav">
              <router-link to="/comentarios" class="nav-link text-white" exact-active-class="active">Comentarios</router-link>
            </li>

            
          </ul>

          <div class="d-flex ms-auto">
            <input class="form-control form-control-sm me-2 w-50" type="search" placeholder="Buscar..."
              aria-label="Search">
            <button class="btn btn-outline-light btn-sm rounded-circle" type="submit">
              <i class="bi bi-search"></i>
            </button>
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