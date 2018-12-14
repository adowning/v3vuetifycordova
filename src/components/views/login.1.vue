<template>
  <!-- <div class="login"> -->
  <div>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm10 md8 v-if="!scanning && !scanned">
            <v-card class="elevation-0">
              <v-alert :value="true" class="mb-3" color="warning" icon="priority_high" outline>
                <span class="black--text title">This device requires an owner before it can be used</span>
              </v-alert>
              <div mt-5 row>
                <v-btn @click="scanning && startScan()" block color="info">Clock in with ID badge</v-btn>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
        <!-- <template>
          <v-layout row justify-center>
            <v-dialog
              v-model="dialog"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition"
            >
              <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn>
            </v-dialog>
          </v-layout>
        </template>-->
      </v-container>
    </v-content>
  </div>
</template>
<script>
// import store from "../../store/";

export default {
  data: () => ({
    drawer: null,
    scanning: false,
    scanned: false,
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false
  }),
  methods: {
    data: () => ({
      drawer: null,
      scanning: false,
      scanned: false
    }),
    methods: {
      startScan (code) {
        // var creds = {
        //   name: code.name,
        //   pass: code.pass
        // };
        // store.dispatch("getEmployeeInfo", creds);
      }
    },
    props: {
      source: String
    }
  },
  props: {
    source: String
  }
}
</script>
