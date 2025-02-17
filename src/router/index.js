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
import PanelGestion from '@/components/PanelGestion.vue'
import PaginaTienda from '@/components/PaginaTienda.vue'
import TablaCarrito from '@/components/TablaCarrito.vue'
import TablaCancel from '@/components/TablaCancel.vue'
import TablaSuccess from '@/components/TablaSuccess.vue'

const routes = [
  {
    path: '/',
    name: 'inicio',

    component: PaginaInicio
  },
  {
    path: '/gestion',
    name: 'gestion',
    component: PanelGestion
  },
  {
    path: '/tienda',
    name: 'tienda',

    component: PaginaTienda
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
  },

  {
    path: '/carrito',
    name: 'carrito',

    component: TablaCarrito
  },

  {
    path: '/cancel',
    name: 'cancel',

    component: TablaCancel
  },

  {
    path: '/success',
    name: 'success',

    component: TablaSuccess
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAdmin) {
    const isLogueado = localStorage.getItem('isLogueado') === 'true';
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    if (!isLogueado || !isAdmin) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router;
