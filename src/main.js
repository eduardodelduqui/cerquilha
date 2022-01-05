import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import MediumEditor from 'vuejs-medium-editor'
import { VueEditor } from 'vue2-quill-editor'
import { IconsPlugin } from 'bootstrap-vue'
import { routes } from './routes'
import AppLoading from './components/ui/AppLoading'
import AppText from './components/ui/AppText'
import AppList from './components/ui/AppList'
import Button from './components/Button'

import '../src/sass/global.scss'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(IconsPlugin)
Vue.use(VueEditor)

Vue.http.options.root = 'https://api-cerquilha.herokuapp.com/'
// Vue.http.options.root = 'http://localhost:3000/'

Vue.component('medium-editor', MediumEditor)
Vue.component('CerquilhaText', AppText)
Vue.component('CerquilhaLoading', AppLoading)
Vue.component('CerquilhaList', AppList)
Vue.component('Button', Button)


const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.meta.protected && !localStorage.getItem("auth")) {
    next({name: 'login'})
  } else {
    next()
  }
})

Vue.prototype.$hasUser = function () {
  return localStorage.getItem("id") ? true : false
}

Vue.prototype.$userId = function () {
  return localStorage.getItem("id")
}

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  data: {
    userId: localStorage.getItem("id")
  }
})
