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
          </ul>
        </div>
      </div>
    </div>

    <!-- 商品列表 -->
    <div class="pruduct-box">
      <ProductList
        title_icon="#icon-dog"
        title="狗狗专区"
        :menu_nav="dog_nav"
        :shop_list="dogrecommend"
      />
      <ProductList
        title_icon="#icon-cat"
        title="猫咪专区"
        :menu_nav="cat_nav"
        :shop_list="catrecommend"
      />
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import { mapState } from "vuex";
import BannerNavHome from "../components/BannerNav/BannerNavHome";
import ProductList from "../components/PruductList";

export default {
  name: "Home",
  components: { BannerNavHome, ProductList },
  data() {
    return {
      dog_nav: [
        { name: "主食", path: "/dog/food" },
        { name: "零食", path: "/dog/snacks" },
        { name: "日用", path: "/dog/daily" },
        { name: "医疗", path: "/dog/health" },
        { name: "玩具", path: "/dog/toy" }
      ],
      cat_nav: [
        { name: "主食", path: "/cat/food" },
        { name: "零食", path: "/cat/snacks" },
        { name: "日用", path: "/cat/daily" },
        { name: "医疗", path: "/cat/health" },
        { name: "玩具", path: "/cat/toy" }
      ]
    };
  },
  computed: {
    ...mapState(["homecasual", "userInfo", "dogrecommend", "catrecommend"])
  },
  mounted() {
    //1.请求轮播图的数据
    this.$store.dispatch("reqHomeCasual");

    //2.请求狗狗推荐列表
    this.$store.dispatch("reqDogRecommend");

    //3.请求猫咪推荐列表
    this.$store.dispatch("reqCatRecommend");
  },
  watch: {
    homecasual() {
      //数据完全请求下来之后再创建swiper实例
      this.$nextTick(() => {
        new Swiper(".swiper-container", {
          loop: true, //循环
          autoplay: true, //自动轮播

          pagination: {
            //分页器
            el: ".swiper-pagination"
          }
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
        background #01d4b4
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
                            background #20bfa9
                            color #fff
                        &.signup:hover
                            border 1px solid red
                            background red
                            color #fff
    .pruduct-box
      margin 40px 0 60px 0
</style>
