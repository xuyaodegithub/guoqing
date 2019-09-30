// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import axios from './fetch/request'
// import axios from 'axios'
// axios.defaults.timeout=10000
// axios.defaults.baseURL=process.env.API_HOST
import store from './store'
import './assets/public.css'
import './assets/reset.css'
import filters from './filters/filters'
import Vant from 'vant';
import 'vant/lib/index.css';
import $wechat from 'weixin-js-sdk'

Vue.use(Vant);
Vue.config.productionTip = false;
Vue.prototype.$http=axios;
Vue.prototype.$wechat=$wechat
Object.keys(filters).map((val,index)=>{
  Vue.filter(val,filters[val])
  // console.log(val,filters[val])
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  $,
  store,
  router,
  data: {//时间派发调用$emit 方法 this.$root.eventHub.$emit('eventfunction', yourData)，this.$root.eventHub.$on('eventfunction', fun)
    eventHub: new Vue()
  },
  components: { App },
  template: '<App/>'
})
