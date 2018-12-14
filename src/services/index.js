/* jshint esversion: 6 */
/*
    Vue Plugin
    Install all services on Vue System
*/

import Network from './network.js'
import Auth from './auth.js'
import Api from './api'

function plugin(Vue) {
  if (plugin.installed) {
    return
  }
  if (process.env.NODE_ENV === 'development') {
    Vue.prototype.$devmode = true
  }
  Vue.prototype.$network = Network
  Vue.prototype.$auth = Auth
  Vue.prototype.$api = Api
}
console.log('called ')

if (typeof window !== 'undefined' && window.Vue) {
  console.log('window ')
  console.log('window ')
  console.log('window ')
  window.Vue.use(plugin)
}

export default plugin
