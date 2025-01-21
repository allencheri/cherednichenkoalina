import { createRouter, createWebHistory } from 'vue-router'
import PaginaInicio from '@/components/PaginaInicio.vue'
import TablaContacto from '@/components/TablaContacto.vue'
import NotFound from '@/components/NotFound.vue'
import TablaEmpleo from '@/components/TablaEmpleo.vue'
import AvisoLegal from '@/components/AvisoLegal.vue'
import PoliticaPrivacidad from '@/components/PoliticaPrivacidad.vue'
import TablaUsuarios from '@/components/TablaUsuarios.vue'
import TablaComentarios from '@/components/TablaComentarios.vue'
import TablaArticulos from '@/components/TablaArticulos.vue'
import TablaRegistro from '@/components/TablaRegistro.vue'
import TablaLogin from '@/components/TablaLogin.vue'

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: PaginaInicio
  },
  {
    path: '/usuarios',
    name: 'usuario',

    component: TablaUsuarios

  },
  {
    path: '/contacto',
    name: 'contacto',

    component: TablaContacto

  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',

    component: NotFound
  },

  {
    path: '/empleo',
    name: 'empleo',

    component: TablaEmpleo

  },

  {
    path: '/avisos-legales',
    name: 'avisoLegal',

    component: AvisoLegal

  },

  {
    path: '/privacidad',
    name: 'politicaPrivacidad',

    component: PoliticaPrivacidad

  },

  {
    path: '/comentarios',
    name: 'comentarios',

    component: TablaComentarios
  },

  {
    path: '/articulos',
    name: 'articulos',

    component: TablaArticulos
  },

  {
    path: '/registro',
    name: 'registro',

    component: TablaRegistro
  },

  {
    path: '/login',
    name: 'login',

    component: TablaLogin
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//Guarda de navegación global
router.beforeEach((to, from, next) => {
  //Verificar si es administrador
  if (to.meta.requiresAdmin) {
    //Verifica si el usuario está logueado y si es administrador
    const isLogueado = localStorage.getItem('isLogueado') === 'true';
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    if (!isLogueado || !isAdmin) {
      //Si no es administrador, redirige a otra ruta
      next({ name: 'login' });
    } else {
      next(); //Permite el acceso a la ruta
    }
  } else {
    next(); //Si no es necesaria la verificación de administrador, permite el acceso a la ruta
  }
})

export default router;
