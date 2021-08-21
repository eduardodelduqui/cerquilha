import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import { IconsPlugin } from 'bootstrap-vue'

import { routes } from './routes'
import './sass/global.scss'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(IconsPlugin)

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
