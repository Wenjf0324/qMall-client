<template>
  <div class="cat-page">
    <!-- 头部 -->
    <Header />
    <!-- 导航栏 -->
    <BannerNavOther />

    <div class="cat-area">
      <div class="wrap">
        <!-- 左边 -->
        <div class="aside">
          <div class="aside-title">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-tuijian"></use>
            </svg>
            <span>猫咪专区</span>
          </div>
          <ul class="aside-menu">
            <li><router-link to="/cat/food">猫咪主食</router-link></li>
            <li><router-link to="/cat/snacks">猫咪零食</router-link></li>
            <li><router-link to="/cat/daily">猫咪日用</router-link></li>
            <li><router-link to="/cat/health">猫咪医疗</router-link></li>
            <li><router-link to="/cat/toy">猫咪玩具</router-link></li>
          </ul>
        </div>

        <div class="shop-list-container">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./../../components/Header";
import BannerNavOther from "./../../components/BannerNav/BannerNavOther";
import ShopList from "../../components/ShopList";

export default {
  name: "Home",
  components: {
    Header,
    BannerNavOther,
    ShopList
  },
  mounted() {
    //1.请求猫咪主食的商品列表数据
    this.$store.dispatch("reqCatFoodList");

    //2.请求猫咪零食的商品列表数据
    this.$store.dispatch("reqCatSnacksList");

    //3.请求猫咪日用的商品列表数据
    this.$store.dispatch("reqCatDailyList");

    //4.请求猫咪医疗的商品列表数据
    this.$store.dispatch("reqCatHealthList");

    //5.请求猫咪玩具的商品列表数据
    this.$store.dispatch("reqCatToyList");
  }
};
</script>

<style lang="stylus" scoped>
.cat-page
  height 100%
.cat-area
  padding-top 50px
  .aside
    width 180px
    float left
    .aside-title
      font-size 15px
      background #000
      border-radius 50px
      color #fff
      padding 10px 28px
      .icon
        font-size 20px
        margin-right 8px
    .aside-menu
      margin 10px 24px
      color #666
      font-size 14px
      li
        text-align center
        border-bottom 1px dashed #e1e1e1
        &:last-child
            border-bottom none
        a
          display block
          padding 14px 0
          &:hover
            background #f5f5f5
            color #20bfa9
        .router-link-active
          color #20bfa9
          background #f5f5f5

  .shop-list-container
    height 100%
    margin-left 220px
    .shop-list
      display flex
      flex-wrap wrap
      justify-content left
</style>
