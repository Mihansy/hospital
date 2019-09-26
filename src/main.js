import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as $http from './http/index.js'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$http = $http  //挂载到vue原型链上，就可以在任意vue实例/组件上使用this.$http.方法名（index.js中导出的方法）

Vue.config.productionTip = false  //生产环境里不要打印任何信息

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
