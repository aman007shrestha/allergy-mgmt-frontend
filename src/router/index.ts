import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginSignupView from '../views/LoginSignupView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: LoginSignupView,
  },
  {
    path: '/notfound',
    name: 'notfound',
    component: NotFoundView,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/notfound',
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
