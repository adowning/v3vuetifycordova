import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import bus from './services/bus-event'
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
// import '@fortawesome/fontawesome-free/css/all.css'
import * as humanity from './services/humanity'

humanity.setToken()
import cordova from './cordova'

Vue.config.productionTip = false
if (process.env.NODE_ENV === 'development') {
  Vue.prototype.$devmode = true
}
Vue.config.errorHandler = function(err, vm, info) {
  // handle error
  // `info` is a Vue-specific error info, e.g. which lifecycle hook
  // the error was found in. Only available in 2.2.0+
  let data = {}
  data.log = err.stack
  console.log(data)
}
window.store = store
if (process.env.NODE_ENV === 'development') {
  console.log('In development wait for cordova')
  setTimeout(function() {
    if (!window.cordova) {
      console.log('Not running in cordova')
      store.dispatch('init')
    }
  }, 2000)
}
bus.on('system-ready', () => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')
