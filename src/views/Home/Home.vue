<template>
  <div class="home">
    <!-- 导航 -->
    <BannerNavHome />

    <!-- 轮播区域 -->
    <div class="banner">
      <div class="wrap">
        <div class="swiper-container" v-if="homecasual.length > 0">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(casual, index) in homecasual"
              :key="index"
            >
              <img :src="casual.imgurl" alt="" width="100%" />
            </div>
          </div>
          <!-- 分页器 -->
          <div class="swiper-pagination"></div>
        </div>

        <!-- banner区域右边 -->
        <div class="banner-right">
          <div class="logo">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-petshop"></use>
            </svg>
          </div>
          <p>Hi~ 欢迎来到Q宠商城！</p>
          <ul>
            <li @click="switchTo('/login')">登录</li>
            <li @click="switchTo('/me')">个人中心</li>
            <li @click="switchTo('/me')" v-if="userInfo.id" class="signup">
              退出登录
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 商品列表 -->
    <div class="pruduct-box">
      <DogShopList />
      <CatShopList />
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import BannerNavHome from "../../components/BannerNav/BannerNavHome";
import DogShopList from "./children/DogShopList";
import CatShopList from "./children/CatShopList";

import { mapState } from "vuex";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: { BannerNavHome, DogShopList, CatShopList },
  computed: {
    ...mapState(["homecasual"]),
    ...mapState(["userInfo"])
  },
  mounted() {
    //1.请求轮播图的数据
    this.$store.dispatch("reqHomeCasual");

    //2.请求首页商品列表数据
    // this.$store.dispatch("reqHomeShopList");

    //3.请求狗狗主食的商品列表数据
    this.$store.dispatch("reqDogFoodList");

    //3.请求狗狗零食的商品列表数据
    this.$store.dispatch("reqDogSnacksList");
  },
  watch: {
    homecasual() {
      //数据完全请求下来之后再创建swiper实例
      this.$nextTick(() => {
        new Swiper(".swiper-container", {
          pagination: {
            el: ".swiper-pagination"
          },
          loop: true,
          autoplay: true
        });
      });
    }
  },
  methods: {
    switchTo(path) {
      //console.log(this.$router)
      this.$router.replace(path);
    }
  }
};
</script>

<style lang="stylus" scoped>
.home
    .banner
        background #20bfa9
        height 428px
        .wrap
            display flex
            .swiper-container
                margin-left 220px
                width 760px
            .banner-right
                border 1px solid #e1e1e1
                height 428px
                width 210px
                color #666
                background #fff
                position relative
                .logo

                    font-size 48px
                    margin-top 60px
                    position absolute
                    left 50%
                    top 0
                    transform translateX(-50%)
                p
                    margin-top 155px
                    text-align center
                ul
                    margin-top 40px
                    padding 0 48px
                    font-size 13px
                    li
                        border: 1px solid #333
                        text-align center
                        padding 10px
                        margin-bottom 32px
                        border-radius 16px
                        cursor pointer
                        &:hover
                            border 1px solid #20bfa9
                            // color #20bfa9
                            background #20bfa9
                            color #fff
                        &.signup:hover
                            border 1px solid red
                            background red
                            color #fff
    .pruduct-box
      margin-top 40px
</style>
