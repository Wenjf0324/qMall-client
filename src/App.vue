<template>
  <div id="app">
    <top-nav v-show="$route.meta.showTopNav" />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import TopNav from "./components/TopNav";
import Footer from "./components/Footer";
export default {
  name: "App",
  created() {
    this.$store.dispatch("getUserInfo");
  },
  components: {
    TopNav,
    Footer
  }
};

TopNav;
</script>

<style lang="stylus" scoped>
#app
    width 100%
    height 100%
</style>
