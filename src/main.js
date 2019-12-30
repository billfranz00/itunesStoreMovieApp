import Vue from 'vue'
import Itunes from './Itunes.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  store,
  render: function (h) { return h(Itunes) }
}).$mount('#itunes')
