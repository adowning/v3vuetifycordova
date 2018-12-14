import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import auth from './modules/auth'
import cordova from './modules/cordova'
import device from './modules/device'
import conversations from './modules/conversations'
import cars from './modules/car'
import notifications from './modules/notifications'
import actionbars from './modules/actionbars'
import profile from './modules/profile'
import background from './modules/background'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  state: {
    appVersion: 3
  },
  modules: {
    auth,
    cordova,
    device,
    conversations,
    cars,
    notifications,
    actionbars,
    profile,
    background
  }
})
