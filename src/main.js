// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Vuex from 'vuex'
import store from './vuex/store'
Vue.use(Vuex)
import 'lib-flexible'
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import scroll from 'vue-seamless-scroll'
Vue.use(scroll)
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
   /* 路由发生变化修改页面title */
   if (to.meta.title) {
    document.title = to.meta.title;
   }
   next()
  });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
