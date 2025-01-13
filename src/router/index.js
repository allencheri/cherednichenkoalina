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
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
