import "./index.styl";
import Vue from "vue";
import App from "./App";

//引入路由器
import router from "./router/index";
//引入Vuex对象
import store from "./store";

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
