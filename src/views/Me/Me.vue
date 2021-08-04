<template>
  <div class="me-page">
    <user-header />
    <!-- <order-header title="个人中心"> </order-header> -->
    <div class="container clearfix">
      <!-- 左侧菜单栏 -->
      <div class="aside">
        <!-- 头像 -->
        <div class="headshot">
          <div class="user-headshot">
            <img src="../../assets/images/touxiang.jpg" />
            <p>{{ username | phoneFormat }}</p>
          </div>
        </div>
        <!-- 菜单 -->
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

      <!-- 基本信息 -->
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

        <!-- 编辑个人信息 -->
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
              <button @click="saveUserInfo">保存更改</button>
            </div>
          </div>
        </div>

        <!-- 订单列表 -->
        <div class="order-info" :class="{ show: currentIndex === 2 }">
          <h2 class="info-title">订单列表</h2>
          <ul class="order-list">
            <li
              class="order-item"
              v-for="(item, index) in orderlist"
              :key="index"
            >
              <div class="item-title">
                <p>
                  日期：{{ item.create_time }}&nbsp;&nbsp;&nbsp;&nbsp;订单号：{{
                    item.order_no
                  }}
                </p>
                <p>
                  合计：<span>{{ item.total_price | moneyFormat() }}</span
                  >元
                </p>
              </div>
              <div class="item-detail">
                <ul class="goods-info">
                  <li v-for="(goods, index) in item.goodslist" :key="index">
                    <div class="info-main">
                      <img :src="goods.thumb_url" />
                      <p>{{ goods.goods_name }}</p>
                    </div>
                    <p class="info-num">
                      <span>{{ goods.price | moneyFormat() }}元</span>×<span>{{
                        goods.buy_count
                      }}</span>
                    </p>
                    <p class="info-total">
                      {{ (goods.price * goods.buy_count) | moneyFormat() }}元
                    </p>
                  </li>
                </ul>
              </div>
              <div class="pay-state">
                <span @click="switchToPay(item.order_no)">未支付</span>
                <span @click="cancelOrder(item)">取消</span>
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
import { Message, MessageBox, Radio, RadioGroup, DatePicker } from "element-ui";
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
  mounted() {
    //请求订单列表数据
    this.$store.dispatch("reqOrderList");
  },
  computed: {
    ...mapState(["userInfo", "orderlist"]),
    username() {
      if (!this.userInfo.user_phone) {
        return this.userInfo.user_name;
      } else {
        return this.userInfo.user_phone;
      }
    }
  },
  //过滤器
  filters: {
    // 格式化金钱
    moneyFormat(money) {
      if (!money) return "0.00";
      return Number(money).toFixed(2);
    },
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
    },
    //跳转到支付页面
    switchToPay(orderNo) {
      //跳转页面并传递订单号
      this.$router.push({
        path: "/order/pay",
        query: { orderNo }
      });
    },
    cancelOrder(order) {
      MessageBox.confirm("您确定取消该订单吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("delOrderSingle", { order });
      });
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
    height 100%
    background #f5f5f5
    position relative
    .container
      padding 30px 0
      position absolute
      top 50px
      left 50%
      bottom 0
      transform translateX(-50%)
      .aside
        width 220px
        height 100%
        border-radius 4px
        background #fff
        float left
        .headshot
          height 170px
          position relative
          text-align center
          .user-headshot
            position absolute
            top 50%
            left 50%
            transform translate(-50%, -50%)
            img
              width 80px
              height 80px
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
        height 100%
        margin-left 240px
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
              margin-top 40px
              text-align center
              button
                width 160px
                height 35px
                font-size 16px
                background #20bfa9
                color #fff
                border none
                border-radius 4px
                cursor pointer
                &:focus
                  outline none
        .order-info
          height 100%
          padding 24px 20px 24px 32px
          .info-title
            margin-bottom 20px
          .order-list
            height 90%
            font-size 14px
            padding-right 16px
            overflow-x hidden
            overflow-y scroll
            &::-webkit-scrollbar
              width 6px
            &::-webkit-scrollbar-track
              background transparent
            &::-webkit-scrollbar-thumb
              background rgba(0,0,0,0.2)
              border-radius 8px
            .order-item
              border 1px solid #e1e1e1
              overflow hidden
              margin-bottom 24px
              &:last-child
                margin-bottom 0
              .item-title
                display flex
                justify-content space-between
                align-items center
                // background #fffaf7
                padding 10px 16px
                span
                  font-size 16px
              .item-detail
                padding 10px 20px
                border-top 1px solid #e1e1e1
                .goods-info > li
                    display flex
                    justify-content space-between
                    font-size 14px
                    padding 10px 0
                    display flex
                    align-items center
                    border-bottom 1px dashed #e1e1e1
                    &:last-child
                      margin-bottom 0
                      border-bottom none
                    .info-main
                      display flex
                      align-items center
                      flex 3
                      img
                        width 70px
                      p
                        margin-left 20px
                    .info-num
                      flex 1
                      text-align right
                    .info-total
                      flex 1
                      text-align right
              .pay-state
                  text-align right
                  padding 0 16px 10px 0
                  font-size 15px
                  span
                    cursor pointer
                    &:first-child
                      color #f60
                      display inline-block
                      margin-right 12px
</style>
