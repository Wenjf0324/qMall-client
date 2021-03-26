<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-left">
          <span>欢迎访问Q宠商城！</span>
        </div>
        <ul class="topbar-user">
          <li v-if="user_name">{{ user_name }}</li>
          <li @click="switchTo('/login')">登录</li>
          <li @click="switchTo('/')">我的订单</li>
          <li @click="switchTo('/shoppingcart')">购物车</li>
          <!-- <li @click="switchTo('/me')">个人中心</li> -->
          <!-- <li @click="switchTo('/manager')">管理员通道</li> -->
        </ul>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <Logo />

        <div class="header-search">
          <form action="">
            <input type="text" placeholder="请输入关键字" />
            <button>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-search"></use>
              </svg>
            </button>
          </form>
          <ul>
            <li></li>
          </ul>
        </div>
        <div class="header-cart" @click="switchTo('/shoppingcart')">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gouwuche"></use>
          </svg>
          购物车(<span>0</span>)
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "./Logo";
export default {
  name: "nav-header",
  components: { Logo },
  data() {
    return {
      user_name: ""
    };
  },
  mounted() {},
  methods: {
    switchTo(path) {
      this.$router.replace(path);
    }
  }
};
</script>

<style lang="stylus">
.nav-topbar
  height 32px
  line-height 32px
  background #f5f5f5
  color #666
  .container
    font-size 12px
    display flex
    justify-content space-between
    align-items center
    .topbar-user
        display flex
        li
            padding 0 17px
            &:hover
                cursor pointer
                color #20bfa9
.nav-header
  background #fff
  margin-bottom 10px
  .container
    height 120px
    position relative
    .header-search
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      form
        border 2px solid #20bfa9
        border-radius: 2px;
        width: 500px;
        display: flex;
        input
          width 100%
          border none
          padding-left 10px
          &:focus
            outline none
        button
          border 1px solid #20bfa9
          outline 1px solid #20bfa9
          background #20bfa9
          color #fff
          padding 8px 16px
          font-size 14px
          .icon
              font-size 18px
          &:hover
              cursor pointer
    .header-cart
        font-size: 14px;
        color: #666;
        padding: 8px 16px;
        border: 1px solid #e1e1e1;
        border-radius 4px
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        .icon
            font-size 24px
        span
            color red
        &:hover
            cursor pointer
</style>
