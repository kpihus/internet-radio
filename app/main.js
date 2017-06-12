import Vue from 'vue'
import App from './App.vue'
import VueSocketio from 'vue-socket.io'

import {store} from './store'

Vue.use(VueSocketio, 'http://localhost:3003', store);

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
