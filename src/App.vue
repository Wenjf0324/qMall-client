<template>
  <div id="app">
    <nav-header v-show="$route.meta.showNavHeader" />

    <!-- 缓存路由对象数据，购物车保持刷新 -->
    <!-- <keep-alive exclude="shoppingCart,orderConfirm,detail,me,login">
      <router-view></router-view>
    </keep-alive> -->

    <router-view></router-view>

    <Footer v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
import NavHeader from "./components/NavHeader";
import Footer from "./components/Footer";
export default {
  name: "App",
  //拉取用户信息
  created() {
    this.$store.dispatch("getUserInfo");
  },
  components: {
    NavHeader,
    Footer
  }
};
</script>

<style lang="stylus">
#app
    width 100%
    height 100%
</style>
