import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/freelancers',
    name: 'freelancers',
    component: () => import(/* webpackChunkName: "about" */ '../views/Freelancers.vue')
  },
  {
    path: '/freelancer/:id',
    name: 'freelancer',
    component: () => import(/* webpackChunkName: "about" */ '../views/Freelancer.vue')
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import(/* webpackChunkName: "about" */ '../views/Projects.vue')
  },
  {
    path: '/project/:id',
    name: 'project',
    component: () => import(/* webpackChunkName: "about" */ '../views/Project.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
