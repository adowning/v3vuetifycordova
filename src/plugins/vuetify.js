import Vue from 'vue'
import Vuetify from 'vuetify' // transitions // VBtn, // VToolbar, // VFooter, // VNavigationDrawer, // VApp, // required
import 'vuetify/src/stylus/app.styl'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  // components: {
  // VApp, // required
  // VNavigationDrawer,
  // VFooter,
  // VToolbar,
  // VBtn,
  // transitions
  // },
  theme: {
    primary: colors.indigo.base, // #E53935
    secondary: colors.indigo.lighten4, // #FFCDD2
    accent: colors.indigo.base // #3F51B5
  },
  iconfont: 'fa4', // 'md' || 'mdi' || 'fa' || 'fa4'
  options: {
    // themeVariations: ['primary', 'secondary', 'accent'],
    extra: {
      mainToolbar: {
        color: 'primary'
      },
      sideToolbar: {},
      sideNav: 'primary',
      mainNav: 'primary lighten-1',
      bodyBg: ''
    }
  }
})
