import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../pages/LandingPage.vue'
import Dashboard from '../pages/DashBoard.vue'
import { supabase } from '../supabase'  // verifico sesion

const routes = [
  { path: '/', name: 'Landing', component: LandingPage },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }  // digo que esta ruta requiere autenticación
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach(async (to, from, next) => {
  const { data } = await supabase.auth.getSession()
  const isAuthenticated = !!data.session

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/')  // Redirige al landing si no hay sesión
  }

  next()
})

export default router
