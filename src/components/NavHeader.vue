<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-left">
          <span>欢迎访问Q宠商城！</span>
        </div>
        <ul class="topbar-user">
          <li v-if="userInfo.id">您好，{{ userName | phoneFormat }}</li>
          <li @click="switchTo('/login')" v-if="!userInfo.id">登录</li>
          <li @click="switchTo('/shoppingcart')">购物车</li>
          <li @click="switchTo('/me')">个人中心</li>
          <!-- <li @click="switchTo('/manager')">管理员通道</li> -->
          <li v-if="userInfo.id" class="signup" @click="dealLogout">
            退出登录
          </li>
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
          购物车(<span>{{ cartcount }}</span
          >)
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "./Logo";
import { Message, MessageBox } from "element-ui";
import { mapState, mapActions } from "vuex";
export default {
  name: "nav-header",
  components: { Logo },
  data() {
    return {
      user_name: ""
    };
  },
  computed: {
    ...mapState(["userInfo", "cartcount"]),
    userName() {
      if (!this.userInfo.user_phone) {
        return this.userInfo.user_name;
      } else {
        return this.userInfo.user_phone;
      }
    }
  },
  mounted() {
    //获取购物车商品数量
    this.$store.dispatch("getCartCount");
  },
  filters: {
    phoneFormat(phone) {
      //1.转成数组
      let phoneArr = [...phone];
      //2.判断数组是否为手机号
      let zg = /^\d{11}$/;
      if (!zg.test(phone)) {
        return phone;
      } else {
        //3.遍历
        let str = "";
        phoneArr.forEach((item, index) => {
          if (index === 3 || index === 4 || index === 5 || index === 6) {
            str += "*";
          } else {
            str += item;
          }
        });
        return str;
      }
    }
  },
  methods: {
    ...mapActions(["logout"]),
    switchTo(path) {
      if (this.userInfo.id) {
        //已经登录
        this.$router.replace(path);
      } else {
        // Message.warning("请先登录");
        this.$router.replace("/login");
      }
    },
    dealLogout() {
      MessageBox.confirm("您确定要退出登录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(actions => {
        // console.log(actions);
        this.logout({});
        Message.success("退出登录成功！");
      });
    }
  }
};
</script>

<style lang="stylus">
$color = #20bfa9
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
            padding 0 16px
            cursor pointer
            border-right 1px solid #e1e1e1
            &:hover
                color $color
                background #e1e1e1
            &.signup:hover
                color red
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
        border 2px solid $color
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
          border 1px solid $color
          outline 1px solid $color
          background $color
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
