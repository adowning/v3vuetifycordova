<template>
  <v-app id="app">
    <v-expansion-panel v-if="this.$devmode">
      <v-expansion-panel-content>
        <div slot="header">developer shit</div>
        <v-card>
          <v-btn block color="primary" @click="reload">reload</v-btn>
          <v-btn block @click="addEmp">addEmp</v-btn>
          <v-btn block @click="removeEmp">removeEmp</v-btn>
          <v-btn block @click="getClockStatusOf1444044">getClockStatusOf1444044</v-btn>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <router-view></router-view>
  </v-app>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "app",
  // computed: {
  //   ...mapActions({
  //     doAddEmployee: "device/addEmployee",
  //     doRemoveEmployee: "device/removeEmployee",

  //   })
  // },
  mounted() {
    if (process.env.NODE_ENV == "development") {
      // store.dispatch("auth/getClockStatusOf1444044");
    }
    // CB.CloudObject.sync().then(
    //   function(res) {
    //     console.log(res);
    //   },
    //   function(err) {
    //     console.log(err);
    //   }
    // );
  },
  methods: {
    reload() {
      location.reload();
    },
    getClockStatusOf1444044() {
      store.dispatch("auth/getClockStatusOf1444044");
    },
    addEmp() {
      var employeeId = "Z3o1zDDS";
      store.dispatch("device/addEmployee", employeeId);
    },
    removeEmp() {
      var employeeId = "Z3o1zDDS";
      store.dispatch("device/removeEmployee", employeeId);
    }
  }
};
</script>
<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
