<template>
  <div id="app">
    <nav-header v-show="$route.meta.showNavHeader" />

    <!-- 缓存路由对象数据，购物车保持刷新 -->
    <keep-alive exclude="shoppingCart,orderConfirm,detail">
      <router-view></router-view>
    </keep-alive>

    <Footer v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
import NavHeader from "./components/NavHeader";
import Footer from "./components/Footer";
import storage from "./storage/index";
export default {
  name: "App",
  //拉取用户信息
  created() {
    this.$store.dispatch("getUserInfo");
  },
  components: {
    NavHeader,
    Footer
  },
  mounted() {
    // storage.setItem("a", 1);
    // storage.setItem("user", { a: 1 });
    // storage.setItem("abc", { a: 1 }, "user");
    // storage.clear("a");
    // storage.clear("a", "user");
    // this.axios.get("/api/homecasual").then(res => {
    //   this.res = res;
    // });
  }
};
</script>

<style lang="stylus">
// @import '../static/css/reset.scss'
#app
    width 100%
    height 100%
</style>
