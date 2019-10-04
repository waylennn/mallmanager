// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import moment from 'moment'
import router from './router'
import '@/assets/css/reset.css'
import ServerHttp from '@/plugins/http.js'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(ServerHttp)
Vue.filter('fmtDate', (value) => {
  return moment(value).format('YYYY-MM-DD')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
