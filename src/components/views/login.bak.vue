<template>
  <div>
    <div class="user-form container" v-if="!startScan">
      <h1>This device requires an owner before it can be used</h1>
      <div class="form row">
        <div class="col-sm-12 col-md-12">
          <button
            class="btn-primary btn-search btn-facebook btn-with-icon"
            :disabled="startScan"
            @click="startScan = true"
          >
            <span class="btn-with-icon--icon">
              <i class="fa fa-barcode" aria-hidden="true"></i>
            </span>
            <span class="btn-with-icon--label">
              <span>Clock in with ID Badge</span>
              <spinner class="blue" v-if="fbLoading"></spinner>
            </span>
          </button>
          <div
            class="fb-terms"
          >By clocking in with this device you agree that it is now under your care according to our
            <router-link :to="{name: 'terms'}">employee handbook</router-link>.
          </div>
          <hr>
          <button
            ref="btn_show_login"
            id="btn_show_login"
            class="btn btn-primary btn-shadowed-black"
            @click="showLogin; startScan = true"
            v-show="!isShowLogin"
          >
            <span>Clock in with Camera</span>
          </button>
        </div>

        <div class="col-sm-12 col-md-12 login-box" v-show="isShowLogin || !isMobile"></div>
        <div style="margin: 1em 0" v-show="isShowLogin "></div>
        <div class="col-sm-12 col-md-12">
          <span
            class="register"
            v-if="isMobile"
          >No ID badge? Use the camera to clock in. Please note a message will alert a superviser per our
            <router-link class="login-register" :to="{name:'register'}">ID policy</router-link>
          </span>
        </div>
        <div class="col-sm-12 col-md-12 facebook-box">
          <img :src="andrews_logo">
        </div>
        <!--<span v-if="loading"> Loading... </span>-->
      </div>
    </div>
    <VueQrcodeReader v-if="startScan" @decode="onDecode"></VueQrcodeReader>
    <hr>
    <button
      class="btn btn-primary btn-shadowed-black"
      @click="goBack"
      :disabled="fbLoading"
      v-if="startScan"
    >
      <span class="btn-with-icon--label">
        <span v-if="!fbLoading" @click="startScan = true">Cancel</span>
        <spinner class="blue" v-if="fbLoading"></spinner>
      </span>
    </button>
    <VueSignaturePad width="90%" height="100px" ref="signaturePad" required :options="{ onEnd }"/>
  </div>
</template>
<script>
import Vue from 'vue'
import * as CB from 'cloudboost'
import VueSignaturePad from 'vue-signature-pad'
import VueQrcodeReader from 'vue-qrcode-reader'
import { mapGetters, mapActions } from 'vuex'
import dialogs from '../../services/dialogs.js'
import router from '../../router'
import bus from '../../services/bus-event'
import spinner from './Spinner.vue'
import cache from '../../services/cache'
Vue.use(VueSignaturePad)
Vue.use(VueQrcodeReader)

export default {
  name: 'login',
  components: {
    VueQrcodeReader,
    VueSignaturePad,
    spinner
  },
  data () {
    return {
      email: '',
      password: '',
      loading: false,
      fbLoading: false,
      error: '',
      // carpoolear_logo: process.env.ROUTE_BASE + 'static/img/carpoolear_logo.png',
      andrews_logo: process.env.ROUTE_BASE + 'static/img/andrews_logo.png',
      hasScroll: false,
      isUnderstood: true,
      dontShowAgain: false,
      isShowLogin: false,

      username: null,
      // password: null,
      startScan: false,
      accept: false,
      scanned: false,
      items: [],
      select: false,
      userList: [],
      checkboxId: false,
      // error: "",
      bytes: null
    }
  },

  computed: {
    ...mapGetters({
      checkLogin: 'auth/checkLogin',
      isMobile: 'device/isMobile'
    })
  },
  methods: {
    ...mapActions({
      doLogin: 'auth/login', // map this.add() to this.$store.dispatch('increment')
      fbLogin: 'cordova/facebookLogin'
    }),
    onEnd () {
      this.bytes = VueSignaturePad.data().signatureData.src
      this.signed = true
    },
    onDecode (_code) {
      var code = JSON.parse(_code)
      if (code.name) {
        // if online
        var user = new CB.CloudUser()
        user.set('username', code.name)
        user.set('password', code.password)
        user.logIn({
          success: function (user) {
            this.username = code.name
            this.password = code.password
            this.scanned = true
          },
          error: function (error) {
            this.error = 'bad login'
          }
        })
      } else {
        this.error = 'bad scan'
      }
    },
    // login() {
    //   if (!this.fbLoading) {
    //     this.loading = true;
    //     let email = this.email;
    //     let password = this.password;
    //     this.doLogin({ email, password }).then(
    //       data => {
    //         this.loading = false;
    //         // router.push({ name: 'trips' });
    //         // router.rememberBack();
    //       },
    //       error => {
    //         dialogs.message("Email o password incorrecto.", {
    //           duration: 10,
    //           estado: "error"
    //         });
    //         if (error) {
    //           this.error = error.error;
    //         }
    //         this.loading = false;
    //       }
    //     );
    //   } else {
    //     dialogs.message(
    //       "Su solicitud ya fue enviada, aguarde un momento por favor.",
    //       { duration: 10, estado: "error" }
    //     );
    //   }
    // },
    // showLogin() {
    //   this.isShowLogin = true;
    // },
    onClearClick () {
      router.back()
    }
  },
  mounted () {
    bus.on('clear-click', this.onClearClick)
    let viewPort = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    )

    // if (!this.isMobile) {
    //   this.$refs.txt_user.focus();
    // }

    this.hasScroll = document.body.scrollHeight > viewPort
    cache.getItem('fbLoginWarningDontShow').then(value => {
      console.log('fbLoginWarningDontShow', value)
      if (value) {
        this.isUnderstood = true
      }
    })
  },

  beforeDestroy () {
    bus.off('clear-click', this.onClearClick)
  }
}
</script>

<style>
.app-container {
  min-height: 100vh;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fb-terms {
  color: #eee;
}

.facebook-box {
  margin-top: 0.5em !important;
}

.password-not {
  text-align: center;
  margin-top: 16px;
  display: block;
  text-align: center;
  color: #ddd;
  font-weight: bold;
  text-decoration: underline;
  padding-left: 10px;
}

label {
  margin-top: 0.3em;
  font-weight: bold;
}

.login-forget {
  font-weight: bold;
  padding-left: 12px;
  color: #016587;
}

.user-form .btn-primary.btn-facebook {
  width: 90%;
  margin: 1em auto;
}

.description {
  font-size: 11px;
  text-transform: none;
  color: #fff;
  display: block;
}

.btn-facebook.btn-with-icon--icon {
  background-color: var(--button-facebook-blue-left);
}

.register {
  /* font-weight: 300; */
  font-size: 14px;
  display: block;
  padding: 1.4em 0;
  position: relative;
  display: inline-block;
}

.register::before {
  position: absolute;
  /* border-top: solid 1px #2793ff; */
  width: 90%;
  margin-left: 5%;
  content: " ";
  top: 0;
  left: 0;
}

.register::after {
  position: absolute;
  border-bottom: solid 1px #2793ff;
  width: 90%;
  margin-left: 5%;
  content: " ";
  bottom: 0;
  left: 0;
}

.alert-warning a {
  color: #337ab7;
}

.register {
  color: #ccc;
}

.alert-warning {
  position: fixed;
  top: 0;
  left: 0;
  width: 94%;
  margin: 10vh 3%;
  height: 80vh;
  z-index: 100;
}

@media only screen and (min-width: 768px) {
  .login-box {
    margin-right: 0;
  }
  .alert-warning {
    position: static;
    width: auto;
    height: auto;
    margin: auto;
    margin-bottom: 1em;
  }
  .register {
    color: #555;
  }
  .description {
    display: inline;
    padding-left: 0.4em;
    color: rgb(1, 101, 135);
  }
  .visual-trick {
    border-right: solid 1px #ccc;
    padding-right: 4rem;
  }
  .form > div:last-child {
    padding-left: 4em;
  }
  .user-form .btn-primary.btn-facebook {
    width: 100%;
    max-width: 280px;
    margin: 1.6em 0 0.6em 0;
  }
  .register {
    display: inline;
    margin-bottom: 2em;
    font-weight: 400;
  }
  .register::before {
    display: none;
  }
  .register::after {
    display: none;
  }
}

.form-warning-login label {
  color: black;
}

.form-warning-login .checkbox {
  display: inline-block;
  margin-right: 1em;
}

.form-warning-login .checkbox span {
  text-transform: none;
}

.form-warning-login * {
  vertical-align: middle;
}

.form-warning-login button {
  margin-top: 0em;
}

@media only screen and (min-width: 768px) {
  .form-warning-login button {
    margin-top: 0.5em;
  }
  [type="checkbox"] {
    margin-top: 0;
  }
}

#btn_show_login {
  border: 2px solid rgba(215, 37, 33, 0.8);
  color: #fff;
  background: rgba(215, 37, 33, 0.8);
}
</style>
