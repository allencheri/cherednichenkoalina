<template>
    <h3 class="text-center font-weight-bold mt-4 pt-4 pb-4 text-primary"><i class="bi bi-gear-wide-connected"></i>
        PANEL DE CONTROL</h3>
    <div class="container mt-5">
        <div class="row mb-4">

            
        
            <router-link to="/usuarios"  class="col bg-primary me-4 rounded containerAltura d-flex justify-content-center align-items-center" v-if="!usuarioLogeado">
                <div class="text-white link-underline link-underline-opacity-0  d-flex justify-content-center align-items-center" >Gestión de usuarios</div>
            </router-link>
        
            <router-link to="/empleo"  class="col bg-primary me-4 rounded containerAltura d-flex justify-content-center align-items-center">
                <div class="text-white link-underline link-underline-opacity-0  d-flex justify-content-center align-items-center" >Gestión de empleo</div>
            </router-link>
            
        </div>

        <div class="row mb-4">
            <router-link to="/comentarios"  class="col bg-primary me-4 rounded containerAltura d-flex justify-content-center align-items-center">
                <div class="text-white link-underline link-underline-opacity-0  d-flex justify-content-center align-items-center">Comentarios</div>
            </router-link>
        
            <router-link to="/articulos"  class="col bg-primary me-4 rounded containerAltura d-flex justify-content-center align-items-center">
                <div class="text-white link-underline link-underline-opacity-0  d-flex justify-content-center align-items-center">Articulos</div>
            </router-link>
        </div>

        <div class="row mb-4">
            <router-link to="/"  class="col bg-secondary me-4 rounded containerAltura d-flex justify-content-center align-items-center" >
                <div class="text-white d-flex justify-content-center align-items-center text-decoration-none" >En construcción</div>
            </router-link>
        
            <router-link to="/"  class="col bg-secondary me-4 rounded containerAltura d-flex justify-content-center align-items-center">
                <div class="text-white   d-flex justify-content-center align-items-center construccion" >En construcción</div>
            </router-link>
        </div>
        
    </div>

</template>

<script>

    export default {
        name : "PaginaInicio",
        components : {
            
        }
    }
</script>

<style scoped>
 .containerAltura{
    height: 50px;
 }
 .construccion{
    text-decoration: none !important;
 }
</style>