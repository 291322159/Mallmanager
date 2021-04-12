import Vue from 'vue'
import App from './App'
import router from './router'

import MyServerHttp from './plugins/http.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/assets/css/normalize.css'
import '@/assets/css/reset.css'

import myBread from '@/components/content/Bread'

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

//使用vue插件
Vue.use(ElementUI);
Vue.use(MyServerHttp)

Vue.config.productionTip = false

// 全局自定义组建
Vue.component('my-bread', myBread)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
