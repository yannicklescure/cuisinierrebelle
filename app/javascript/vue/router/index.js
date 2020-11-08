import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import { createStore } from '../store'
// import { createRouter } from '../router'
import { sync } from 'vuex-router-sync'

// create store and router instances
const store = createStore()
console.log(store)

const Bookmarks = () => import('../views/Bookmarks.vue')
const Home = () => import('../views/Home.vue')
const Login = () => import('../views/Login.vue')
const NotFound = () => import('../views/NotFound.vue')
const Recipe = () => import('../views/Recipe.vue')
const Signup = () => import('../views/Signup.vue')
const UserFollowers = () => import('../views/UserFollowers.vue')
const UserRecipes = () => import('../views/UserRecipes.vue')

const ifAuthenticated = async (to, from, next) => {
  const vueStore = await JSON.parse(localStorage.getItem('cuisinier_rebelle'))
  const isAuthenticated = vueStore ? vueStore.data.isAuthenticated : false
  console.log(`from: ${from.path}`)
  console.log(`to: ${to.path}`)
  // store
  // .dispatch('IS_AUTHENTICATED', {})
  // .then(() => {
    console.log(`isAuthenticated: ${ isAuthenticated }`)
    if(to.meta.auth) {
      // console.log(`auth: ${ to.meta.auth }`)
      if (to.name === 'Login' && isAuthenticated) next({ name: 'Home' })
      if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
      else {
        // window.location.href = '/login'
        next()
      }
    }
    else next()
  // })
}

const routes = [
  { path: '/fr', redirect: '/' },
  { path: '/en', redirect: '/' },
  { path: '/es', redirect: '/' },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      auth: true // A protected route
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: {
      auth: false // A protected route
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/bookmarks',
    name: 'Bookmarks',
    component: Bookmarks,
    meta: {
      auth: true // A protected route
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/u/:id',
    name: 'UserRecipes',
    component: UserRecipes,
    meta: {
      auth: false // A protected route
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/u/:id/followers',
    name: 'UserFollowers',
    component: UserFollowers,
    meta: {
      auth: false // A protected route
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/r/:id',
    name: 'Recipe',
    component: Recipe,
    meta: {
      auth: false // A protected route
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth: false // A protected route
    },
    beforeEnter: ifAuthenticated,
  },
  { path: "*", component: NotFound }
]

export const createRouter = () => {
  return new VueRouter({
    mode: 'history',
    fallback: false,
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
  })
}

// const router = createRouter()
// // console.log(router)

// // sync the router with the vuex store.
// // this registers `store.state.route`
// const unsync = sync(store, router)
// // console.log('router')
// unsync()
