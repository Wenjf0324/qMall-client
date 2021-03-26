import "./index.styl";
import Vue from "vue";
import App from "./App";
import router from "./router/index";
import store from "./store";
import axios from "axios";
import VueLazyLoad from "vue-lazyload";

//mock开关
const mock = true;
if (mock) {
  require("./mock/api");
}

//根据前端的跨域方式做调整
// axios.defaults.baseURL = "/api";
axios.defaults.timeout = 8000;

// //接口错误拦截
// axios.interceptors.response.use(function(response) {
//   let res = response.data; //获取接口返回值
//   if (res.status === 0) {
//     //请求成功
//     return res.data;
//   } else if (res.status === 10) {
//     //未登录拦截,跳转到登录页面
//     window.location.href = "/#/login";
//   } else {
//     alert(res.msg);
//   }
// });

Vue.prototype.axios = axios;

Vue.use(VueLazyLoad, {
  loading: "./assets/images/loading-svg/loading-bars.svg"
});

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
