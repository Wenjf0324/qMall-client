<template>
  <div class="me-page">
    <user-header />
    <!-- <order-header title="个人中心"> </order-header> -->
    <div class="container clearfix">
      <div class="aside">
        <div class="headshot">
          <div class="user-headshot">
            <img src="../../assets/images/touxiang.jpg" />
            <p>{{ username | phoneFormat }}</p>
          </div>
        </div>
        <ul class="me-list">
          <li @click.stop="showContent(0)">
            <div class="menu-item" :class="{ selected: currentIndex === 0 }">
              <div class="menu-title">
                <svg class="icon" style="font-size:18px;" aria-hidden="true">
                  <use xlink:href="#icon-ziliao"></use>
                </svg>
                <span>我的资料</span>
              </div>
              <div class="zhankai">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-zhankai"></use>
                </svg>
              </div>
            </div>
          </li>
          <li>
            <div
              class="menu-item"
              :class="{ selected: currentIndex === 1 }"
              @click.stop="showContent(1)"
            >
              <div class="menu-title">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-bianji"></use>
                </svg>
                编辑信息
              </div>
              <div class="zhankai">
                <svg
                  class="icon"
                  :class="{ open: editMenu }"
                  aria-hidden="true"
                >
                  <use xlink:href="#icon-zhankai"></use>
                </svg>
              </div>
            </div>
            <ul class="edit-list" :class="{ show: editMenu }">
              <li>修改基本信息</li>
              <li>修改密码</li>
            </ul>
          </li>
          <li>
            <div
              class="menu-item"
              :class="{ selected: currentIndex === 2 }"
              @click.stop="showContent(2)"
            >
              <div class="menu-title">
                <svg class="icon" style="font-size:15px" aria-hidden="true">
                  <use xlink:href="#icon-dingdan"></use>
                </svg>
                我的订单
              </div>
              <div class="zhankai">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-zhankai"></use>
                </svg>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="me-content">
        <div class="user-info" :class="{ show: currentIndex === 0 }">
          <h2 class="info-title">基本信息</h2>
          <ul class="info-list">
            <li>
              <p>头像</p>
              <img src="../../assets/images/touxiang.jpg" />
            </li>
            <li>
              <p>手机</p>
              <p>{{ userInfo.user_phone || "暂无" | phoneFormat }}</p>
            </li>
            <li>
              <p>昵称</p>
              <p>{{ userInfo.user_name || "未填写" | phoneFormat }}</p>
            </li>
            <li>
              <p>性别</p>
              <p>
                {{ userInfo.user_gender || "未填写" }}
                <!-- {{ userGender }} -->
              </p>
            </li>
            <li>
              <p>常住地</p>
              <p>{{ userInfo.user_address || "未填写" }}</p>
            </li>
            <li>
              <p>生日</p>
              <p>{{ userInfo.user_birthday || "未填写" }}</p>
            </li>
            <li>
              <p>个性签名</p>
              <p>{{ userInfo.user_sign || "未填写" }}</p>
            </li>
          </ul>
        </div>
        <div class="edit-info">
          <div class="base-info" :class="{ show: currentIndex === 1 }">
            <h2 class="info-title">编辑信息</h2>
            <ul class="info-list">
              <li>
                <p>头像</p>
                <img src="../../assets/images/touxiang.jpg" />
              </li>
              <li>
                <p>昵称</p>
                <p>
                  <input type="text" placeholder="昵称" v-model="user_name" />
                </p>
              </li>
              <li>
                <p>性别</p>
                <p>
                  <radio-group v-model="user_gender" @change="selectGender">
                    <radio label="男">男</radio>
                    <radio label="女">女</radio>
                  </radio-group>
                  <!-- {{ userInfo.user_gender }} -->
                </p>
              </li>
              <li>
                <p>常住地</p>
                <p>
                  <input
                    type="text"
                    placeholder="常住地"
                    v-model="user_address"
                  />
                </p>
              </li>
              <li>
                <p>生日</p>
                <p>
                  <date-picker
                    v-model="user_birthday"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    @change="selectBirthday"
                  ></date-picker>
                </p>
              </li>
              <li>
                <p>个性签名</p>
                <p>
                  <input
                    type="text"
                    placeholder="个性签名"
                    v-model="user_sign"
                  />
                </p>
              </li>
            </ul>
            <div class="submit-info">
              <button @click="saveUserInfo">保存</button>
            </div>
          </div>
        </div>
        <div class="order-info" :class="{ show: currentIndex === 2 }">
          <h2 class="info-title">订单列表</h2>
          <ul class="order-list">
            <li class="order-item">
              <div class="item-title">
                <p>2021-04-13 | wenwen | 订单号：20210411403800 | 在线支付</p>
                <p>应付金额：<span>306</span>元</p>
              </div>
              <div class="item-detail">
                <ul class="goods-info">
                  <li>
                    <img
                      src="../../assets/images/shop_list/dog/goods1.jpg"
                      alt=""
                    />
                    <p>谷登 肠胃宝益生菌酵素配方 5g*10包 犬猫通用 调理肠胃</p>
                  </li>
                </ul>
                <div class="pay-state">未支付</div>
              </div>
            </li>
            <li class="order-item">
              <div class="item-title">
                <p>2021-04-13 | wenwen | 订单号：20210411403800 | 在线支付</p>
                <p>应付金额：<span>306</span>元</p>
              </div>
              <div class="item-detail">
                <ul class="goods-info">
                  <li>
                    <img
                      src="../../assets/images/shop_list/dog/goods1.jpg"
                      alt=""
                    />
                    <p>谷登 肠胃宝益生菌酵素配方 5g*10包 犬猫通用 调理肠胃</p>
                  </li>
                </ul>
                <div class="pay-state">未支付</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserHeader from "../../components/UserHeader.vue";
import OrderHeader from "../../components/OrderHeader";
import Modal from "../../components/Modal";
import { mapState } from "vuex";
import { Message, Radio, RadioGroup, DatePicker } from "element-ui";
import { changeUserInfo } from "../../api/index";
export default {
  name: "me",
  components: { UserHeader, OrderHeader, Modal, Radio, RadioGroup, DatePicker },
  data() {
    return {
      currentIndex: 0,
      editMenu: false, //是否展开编辑信息菜单
      user_name: "", //昵称
      user_gender: "", //性别
      user_address: "", //常住地
      user_birthday: "", //生日
      user_sign: "" //个性签名
    };
  },

  watch: {
    //对userInfo进行深度监听，当数据有变化时跟着变化
    userInfo: {
      handler() {
        this.user_name = this.userInfo.user_name || "";
        this.user_gender = this.userInfo.user_gender || "";
        this.user_address = this.userInfo.user_address || "";
        this.user_birthday = this.userInfo.user_birthday || "";
        this.user_sign = this.userInfo.user_sign || "";
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    ...mapState(["userInfo"]),
    username() {
      if (!this.userInfo.user_phone) {
        return this.userInfo.user_name;
      } else {
        return this.userInfo.user_phone;
      }
    }
  },
  filters: {
    //手机号显示格式
    phoneFormat(val) {
      //2.判断数组是否为手机号
      let zg = /^\d{11}$/;
      if (!zg.test(val)) {
        return val;
      } else {
        //1.转成数组
        let phoneArr = [...val];
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
    showEditMenu() {
      this.editMenu = !this.editMenu;
    },
    showContent(index) {
      this.currentIndex = index;
    },
    //选择性别
    selectGender(val) {
      this.user_gender = val;
    },
    //选择生日
    selectBirthday(date) {
      this.user_birthday = date;
    },
    //修改用户信息
    async saveUserInfo() {
      //请求接口
      let result = await changeUserInfo(
        this.userInfo.id,
        this.user_name,
        this.user_gender,
        this.user_address,
        this.user_birthday,
        this.user_sign
      );
      console.log(result);
      if (result.success_code === 200) {
        Message.success("保存成功");
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.clearfix:after
  content ''
  display block
  clear both
.me-page
    width 100%
    height auto
    background #f5f5f5
    position relative
    padding-bottom 30px
    .container
      margin 30px auto
      .aside
        width 235px
        // background #F8F9FA
        border-radius 4px
        background #fff
        float left
        .headshot
          height 180px
          position relative
          text-align center
          .user-headshot
            position absolute
            top 25px
            left 50%
            transform translateX(-50%)
            img
              width 100px
              height 100px
              border-radius 50%
            p
              margin-top 12px
        .me-list
            .menu-item
              padding 18px 10px 24px 20px
              cursor pointer
              display flex
              justify-content space-between
              &:hover
                color #20bfa9
                background #eee
              &.selected
                color #20bfa9
              .zhankai
                .icon
                  transform rotate(-90deg)
                  transition all .5s
                .open
                    transform rotate(0deg)

            .edit-list
              font-size 15px
              display none
              transition all .5s
              li
                cursor pointer
                padding 12px 0 12px 36px
                &:hover
                  color #20bfa9
              &.show
                display block
      .me-content
        margin-left 255px
        background #fff
        border-radius 4px
        .user-info, .base-info, .order-info
          padding 36px 64px
          display none
        .show
          display block
        .info-title
            font-size 30px
            color #757575
            margin-bottom 16px
        .info-list
            li
              padding 16px
              display flex
              justify-content space-between
              align-items center
              border-bottom 1px solid #e1e1e1
              p
                display inline-block
            img
              width 50px
              height 50px
              border-radius 50%
        .edit-info
          .base-info
            input
              border none
              text-align right
              font-size 16px
              &:focus
                outline none
                &::placeholder
                  color transparent
            .submit-info
              margin-top 50px
              text-align center
              button
                width 160px
                height 30px
                line-height 30px
                font-size 16px
                text-align center
                background #20bfa9
                color #fff
                border none
                border-radius 4px
                cursor pointer
                &:focus
                  outline none
        .order-info
          padding 36px
          .info-title
            margin-bottom 24px
          .order-list
            .order-item
              border 1px solid #e1e1e1
              border-radius 4px
              overflow hidden
              margin-bottom 24px
              &:last-child
                margin-bottom 0
              .item-title
                display flex
                justify-content space-between
                align-items center
                height 50px
                background #fffaf7
                padding 0 16px
                span
                  font-size 20px
              .item-detail
                display flex
                justify-content space-between
                padding 20px
                .goods-info > li
                    font-size 15px
                    margin-bottom 20px
                    display flex
                    align-items center
                    &:last-child
                      margin-bottom 0
                    img
                      width 50px
                    p
                      margin-left 8px
</style>
