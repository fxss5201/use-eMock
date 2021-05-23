import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Article from '../views/Article.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/login',
    children: [
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/article',
        name: 'Article',
        component: Article
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
