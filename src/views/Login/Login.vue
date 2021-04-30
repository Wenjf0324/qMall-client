<template>
  <div class="login-page clearfix">
    <!-- 登录页面头部 -->
    <div class="header">
      <div class="wrap">
        <Logo />
        <h1>用户登录</h1>
      </div>
    </div>
    <!-- 登录页面内容部分 -->
    <div class="main">
      <div class="wrap">
        <img src="../../assets/images/login.png" alt="" />

        <div class="login-container">
          <!-- 标题 -->
          <ul class="login-title">
            <li :class="{ selected: loginMode }" @click="changeLoginMode(true)">
              手机动态码登录
            </li>
            <li
              :class="{ selected: !loginMode }"
              @click="changeLoginMode(false)"
            >
              账号密码登录
            </li>
          </ul>

          <form action="">
            <!-- 手机验证码登录部分 -->
            <div :class="{ current: loginMode }">
              <section class="login-message">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-shoujihao"></use>
                </svg>
                <input
                  type="tel"
                  maxlength="11"
                  placeholder="手机号"
                  v-model="phone"
                />
              </section>

              <section class="login-verification">
                <svg class="icon on" aria-hidden="true">
                  <use xlink:href="#icon-verify"></use>
                </svg>
                <input
                  type="tel"
                  maxlength="8"
                  placeholder="验证码"
                  v-model="code"
                />
                <!-- 动态绑定类phone_right，当手机号码正确时此按钮高亮显示 -->
                <button
                  v-if="!countDown"
                  class="get-verification"
                  :class="{ phone_right: phoneRight }"
                  @click.prevent="getVerifyCode()"
                >
                  获取验证码
                </button>
                <button v-else disabled="disabled" class="get-verification">
                  已发送({{ countDown }}s)
                </button>
              </section>

              <section class="login-hint">
                <p>
                  温馨提示：
                  未注册Q宠账号的手机号，登陆时将自动注册，且代表已同意
                  <a href="javascript:;">服务协议与隐私政策</a>
                </p>
              </section>
            </div>

            <!-- 密码登录部分 -->
            <div :class="{ current: !loginMode }">
              <section class="login-message">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-user"></use>
                </svg>
                <input
                  type="text"
                  maxlength="11"
                  placeholder="用户名"
                  v-model="user_name"
                />
              </section>

              <section class="login-verification">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-password"></use>
                </svg>
                <!-- 密文 -->
                <input
                  type="password"
                  maxlength="18"
                  placeholder="密码"
                  v-if="pwdMode"
                  v-model="pwd"
                />
                <!-- 明文 -->
                <input
                  type="text"
                  maxlength="18"
                  placeholder="密码"
                  v-else
                  v-model="pwd"
                />
                <div class="switch-show">
                  <div
                    :class="{ selected: pwdMode }"
                    @click.prevent="changePwdMode(false)"
                  >
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-password_off"></use>
                    </svg>
                  </div>
                  <div
                    :class="{ selected: !pwdMode }"
                    @click.prevent="changePwdMode(true)"
                  >
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-password_visible"></use>
                    </svg>
                  </div>
                </div>
              </section>

              <section class="login-message">
                <svg class="icon on" aria-hidden="true">
                  <use xlink:href="#icon-verify"></use>
                </svg>
                <input
                  type="text"
                  maxlength="11"
                  placeholder="验证码"
                  v-model="captcha"
                />
                <!-- 图形验证码 -->
                <!-- 图形验证码每刷新一次变换一次，每点击一次变换一次 -->
                <img
                  class="code"
                  ref="captcha"
                  src="http://localhost:3000/api/captcha"
                  alt="captcha"
                  @click.prevent="getCaptcha()"
                />
              </section>
            </div>
            <button class="login-submit" @click.prevent="login()">登录</button>
          </form>
          <button class="login-back">返回</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "../../components/Logo";
import { getPhoneCode, phoneCodeLogin, pwdLogin } from "../../api/index";
import { Message } from "element-ui";
import { mapActions } from "vuex";
export default {
  name: "login",
  components: {
    Logo
  },
  data() {
    return {
      loginMode: true, //登录方式，true 手机动态码登录，false 密码登录
      phone: "", //手机号码
      countDown: 0, //倒计时
      pwdMode: true, //密码的显示方式，true 密文，false 明文
      pwd: "", //密码
      code: "", //验证码
      userInfo: {}, //用户信息
      user_name: "", //用户名
      captcha: "" //图形验证码
    };
  },
  computed: {
    //验证手机号是否合理（浅验证：正则验证）
    phoneRight() {
      return /^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone);
    }
    //验证用户名是否合理
  },
  methods: {
    ...mapActions(["syncUserInfo"]),
    //1.登录的模式
    changeLoginMode(flag) {
      this.loginMode = flag;
    },
    //2.获取短信验证码
    async getVerifyCode() {
      //2.1 开启倒计时
      if (this.phoneRight) {
        this.countDown = 60;
        this.intervalId = setInterval(() => {
          this.countDown--;
          if (this.countDown === 0) {
            clearInterval(this.intervalId);
          }
        }, 1000);
      }
      //2.2 获取短信验证码
      let result = await getPhoneCode(this.phone);
      console.log(result);

      //2.3获取验证码失败
      if (result.err_code === 0) {
        //提示信息
        Message.error(result.message);
        //其他处理
        // this.countDown = 0;
      }
    },
    //3.密码的显示方式
    changePwdMode(flag) {
      this.pwdMode = flag;
    },
    //4.获取图形验证码
    getCaptcha() {
      this.$refs.captcha.src =
        "http://localhost:3000/api/captcha?time=" + new Date();
    },
    //5.登录
    async login() {
      //5.1登录模式
      if (this.loginMode) {
        //手机验证码登录
        //5.2前端校验
        if (!this.phone) {
          Message.error("请输入手机号码!");
          return;
        } else if (!this.phoneRight) {
          Message.error("请输入正确的手机号码!");
          return;
        }
        if (!this.code) {
          Message.error("请输入验证码!");
          return;
        } else if (!/^\d{6}$/gi.test(this.code)) {
          Message.error("请输入正确的验证码!");
          return;
        }
        //5.3手机验证码登录
        const result = await phoneCodeLogin(this.phone, this.code);
        // console.log(result);
        if (result.success_code === 200) {
          this.userInfo = result.message;
        } else {
          this.userInfo = {
            message: result.message
          };
        }
      } else {
        //账号密码登录
        //5.4前端校验
        if (!this.user_name) {
          Message.error("请输入用户名！");
          return;
        } else if (!this.pwd) {
          Message.error("请输入密码！");
          return;
        } else if (!this.captcha) {
          Message.error("请输入验证码！");
          return;
        }
        //5.5用户名和密码的登录
        const result = await pwdLogin(this.user_name, this.pwd, this.captcha);
        // console.log(result);
        if (result.success_code === 200) {
          this.userInfo = result.message;
        } else {
          this.userInfo = {
            message: result.message
          };
        }
      }
      //6.后续处理
      if (!this.userInfo.id) {
        //失败
        Message.warning(this.userInfo.message);
      } else {
        //成功
        //6.1同步用户数据
        this.syncUserInfo(this.userInfo);
        //获取购物车商品数量
        this.$store.dispatch("getCartCount");
        //6.2回到主界面
        this.$router.replace("/home");
        console.log("登录成功");
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.clearfix::after
    content ''
    display block
    clear both
.login-page
    height auto
    .header
        background #f8f8f8
        border 1px solid #e1e1e1
        .wrap
            width 1090px
            height 88px
            position relative
            h1
                height 50px
                font-size 28px
                line-height 50px
                color #333
                padding-left 24px
                border-left 1px solid #e1e1e1
                position absolute
                top 50%
                left 180px
                transform translateY(-50%)
    .main .wrap
        width 1000px
        padding 47px 0
        img
            width 500px
        .login-container
            width 400px
            float right
            background rgba(247,247,247, 0.9)
            box-shadow 0 0 20px #ddd
            border-radius 8px
            .login-title
                display flex
                margin 32px 0
                li
                    width 100%
                    color #333
                    font-size 18px
                    text-align center
                    padding 10px 0
                    border-right 1px solid #e1e1e1
                    cursor pointer
                    &:last-child
                        border-right none
                    &.selected
                        color #20bfa9
            form
                padding 0 40px
                .current
                    display block
                > div
                    display none
                section
                    margin-bottom 24px
                    position relative
                    color #999
                    display flex
                    &.login-hint
                        font-size 12px
                        line-height 1.3em
                        a
                            color #20bfa9
                    > .icon
                        position absolute
                        top 50%
                        left 8px
                        transform translateY(-50%)
                    input
                        width 100%
                        padding 12px 0 12px 30px
                        border 1px solid #ccc
                        border-radius 4px
                        &:focus
                            outline none
                            border 1px solid #20bfa9
                            &::placeholder
                                color transparent
                        &:hover
                            border 1px solid #20bfa9
                    .get-verification
                        color inherit
                        background #fff
                        border 1px solid #ccc
                        width 200px
                        margin-left 8px
                        border-radius 4px
                        &:focus
                          outline none
                        &.phone_right
                          border 1px solid #20bfa9
                          color #20bfa9
                          cursor pointer
                    .switch-show
                        position absolute
                        top 50%
                        right 8px
                        transform translateY(-50%)
                        cursor pointer
                        .icon
                          font-size 21px
                        > div
                          display none
                        >.selected
                          display block
                    // .code
                    //   border 1px solid #ccc
                    //   background #fff
                    //   width 120px
                    //   height inherit
                    //   margin-left 8px
                    //   border-radius 4px
                    img
                      width 130px
                      position absolute
                      right 0
                      top 50%
                      transform translateY(-50%)
                .login-submit
                    width 100%
                    background #20bfa9
                    color #fff
                    padding 10px 0
                    margin-bottom 24px
                    border none
                    border-radius 4px
                    cursor pointer
                    &:focus
                        outline none
            .login-back
                color #20bfa9
                border 1px solid #20bfa9
                border-radius 4px
                width 320px
                background #fff
                padding 10px 0
                margin 0 40px 40px
                cursor pointer
                &:focus
                    outline none
</style>
