<template>
  <div class="dog-page">
    <!-- 导航栏 -->
    <BannerNavOther />

    <div class="dog-area">
      <div class="wrap">
        <!-- 左边 -->
        <div class="aside">
          <div class="aside-title">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-tuijian"></use>
            </svg>
            <span>狗狗专区</span>
          </div>
          <ul class="aside-menu">
            <li><router-link to="/dog/food">狗狗主食</router-link></li>
            <li><router-link to="/dog/snacks">狗狗零食</router-link></li>
            <li><router-link to="/dog/daily">狗狗日用</router-link></li>
            <li><router-link to="/dog/health">狗狗医疗</router-link></li>
            <li><router-link to="/dog/toy">狗狗玩具</router-link></li>
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
import BannerNavOther from "./../../components/BannerNav/BannerNavOther";

export default {
  name: "Home",
  components: {
    BannerNavOther
  },
  mounted() {
    //1.请求狗狗主食的商品列表数据
    this.$store.dispatch("reqDogFoodList");

    //2.请求狗狗零食的商品列表数据
    this.$store.dispatch("reqDogSnacksList");

    //3.请求狗狗日用的商品列表数据
    this.$store.dispatch("reqDogDailyList");

    //4.请求狗狗医疗的商品列表数据
    this.$store.dispatch("reqDogHealthList");

    //5.请求狗狗玩具的商品列表数据
    this.$store.dispatch("reqDogToyList");
  }
};
</script>

<style lang="stylus" scoped>
.dog-page
  height 100%
.dog-area
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
