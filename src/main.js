// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import "babel-polyfill"
import ElementUI from 'element-ui'
import axios from 'axios'
import VueAxios from 'vue-axios'
import "element-ui/lib/theme-chalk/index.css"
import { get, post } from "@/axios/http";
import { apiUrl } from "@/axios/api";
import Router from 'vue-router'
import Clipboard from 'clipboard'; //复制
Vue.prototype.Clipboard=Clipboard;
//
Vue.prototype.get = get
Vue.prototype.post = post
Vue.prototype.apiUrl = apiUrl
import getReg from "./axios/rulesData"
import { log } from 'util';
import VueRouter from 'vue-router';
Vue.prototype.getReg = getReg

//重复跳转路由
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
//

Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})
// 弹框底部页面滚动问题
//1.禁止滚动
Vue.prototype.noScroll = function () {
  var mo = function (e) { e.preventDefault() }
  document.body.style.overflow = 'hidden'
  document.addEventListener('touchmove', mo, false)// 禁止页面滑动
}
//2.可以滚动
Vue.prototype.canScroll = function () {
  var mo = function (e) {
    e.preventDefault()
  }
  document.body.style.overflow = ''// 出现滚动条
  document.removeEventListener('touchmove', mo, false)
}
Vue.use("comfirm")
router.beforeEach((to, from, next) => {

  let isLogin = localStorage.getItem('token');


  if (isLogin) {
    //如果用户信息存在则往下执行。
    next()
  } else {
    //如果用户token不存在则跳转到login页面
    if (to.path === '/webNotice'||to.path==="/"||to.path=="/service") {                                              
      next()
    } else {
      if (store.state.lmodelShow == true) {

      } else {
        Vue.prototype.$confirm("您还没有登录,请前往登录后,继续访问!", "提示", {})
          .then(() => {
            store.commit("umodelShow", false);
            store.commit("lmodelShow", true);
          })
          .catch(() => { });
      }
    }
  }
})


Vue.use(ElementUI, VueAxios, axios)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
