<template>
  <div class="orderconfirm-page">
    <order-header title="订单确认">
      <template v-slot:tip>
        <span>请认真填写收获地址</span>
      </template>
    </order-header>
    <div class="confirm-container clearfix">
      <!-- 收货地址 -->
      <div class="shipping-address">
        <h2 class="address-title">收货地址</h2>
        <div class="address-box">
          <ul>
            <li
              :class="{ selected: checkIndex === index }"
              @click.stop="clickAddr(index)"
              v-for="(item, index) in shippingslist"
              :key="index"
            >
              <div class="shipping-info">
                <h2 class="addr-name">{{ item.rec_name }}</h2>
                <p class="addr-phone">{{ item.rec_phone }}</p>
                <p class="address">
                  {{
                    item.rec_province +
                      " " +
                      item.rec_city +
                      " " +
                      item.rec_district +
                      " " +
                      item.rec_address
                  }}
                </p>
              </div>
              <div class="action">
                <!-- 删除地址 -->
                <a href="javascript:;" @click.stop="delAddress(item)">
                  <Icon name="delete" />
                </a>
                <!-- 编辑地址 -->
                <a href="javascript:;" @click.stop="editAddressModal(item)">
                  <Icon name="edit" />
                </a>
              </div>
            </li>
          </ul>
          <ul>
            <li class="add-adr" @click.stop="openAddressModal">
              <div class="add">
                <Icon name="Add" />
                <h3>添加新地址</h3>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 商品列表 -->
      <div class="goods-list">
        <h3>商品</h3>
        <ul v-if="cartList.length > 0">
          <li v-for="(item, index) in cartList" :key="index">
            <div class="item-name">
              <img v-lazy="item.thumb_url" />
              <p>{{ item.goods_name }}</p>
            </div>
            <div class="item-num">
              <span>{{ item.price | moneyFormat() }}</span
              >元×<span>{{ item.buy_count }}</span>
            </div>
            <div class="item-total">
              <span>{{ (item.price * item.buy_count) | moneyFormat() }}</span
              >元
            </div>
          </li>
        </ul>
      </div>
      <!-- 配送方式 -->
      <div class="shipping-method">
        <h2>配送方式</h2>
        <span>包邮</span>
      </div>
      <!-- 结算 -->
      <div class="settlement">
        <ul>
          <li>
            商品件数：<span>{{ totalCount }}件</span>
          </li>
          <li>
            商品总价：<span>{{ totalPrice | moneyFormat() }}元</span>
          </li>
          <li>运费：<span>0元</span></li>
          <li>
            应付：<span>{{ totalPrice | moneyFormat() }}元</span>
          </li>
        </ul>
      </div>
      <!-- 选择 -->
      <div class="operation">
        <button class="backbtn" @click="$router.replace('/shoppingcart')">
          返回购物车
        </button>
        <button class="clearbtn" @click.stop="orderSubmit">去结算</button>
      </div>
    </div>
    <modal
      title="删除确认"
      btnType="1"
      :showModal="showDelModal"
      @submit="submitAddress"
      @cancel="showDelModal = false"
    >
      <template v-slot:body>
        <p>您确认要删除此地址吗？</p>
      </template>
    </modal>

    <modal
      title="新增确认"
      btnType="1"
      :showModal="showEditModal"
      @submit="submitAddress"
      @cancel="showEditModal = false"
    >
      <template v-slot:body>
        <!-- 插槽内容 -->
        <div class="edit-wrap">
          <div class="item">
            <Input v-model="checkItem.rec_name" placeholder="姓名" />
            <Input
              v-model="checkItem.rec_phone"
              placeholder="联系方式"
              maxlength="11"
            />
          </div>
          <div class="item">
            <Select
              name="province"
              v-model="checkItem.rec_province"
              placeholder="省"
            >
              <Option value="广东省">广东省</Option>
              <Option value="湖南省">湖南省</Option>
              <Option value="河北省">河北省</Option>
            </Select>
            <Select name="city" v-model="checkItem.rec_city" placeholder="市">
              <Option value="广州市">广州市</Option>
              <Option value="深圳市">深圳市</Option>
              <Option value="中山市">中山市</Option>
              <Option value="佛山市">佛山市</Option>
              <Option value="肇庆市">肇庆市</Option>
            </Select>
            <Select
              name="district"
              v-model="checkItem.rec_district"
              placeholder="区"
            >
              <Option value="天河区">天河区</Option>
              <Option value="海珠区">海珠区</Option>
              <Option value="番禺区">番禺区</Option>
              <Option value="白云区">白云区</Option>
              <Option value="五桂山镇">五桂山镇</Option>
            </Select>
          </div>
          <div class="item">
            <Input
              type="textarea"
              placeholder="详细地址"
              v-model="checkItem.rec_address"
            />
          </div>
          <div class="item">
            <Input v-model="checkItem.rec_zip" placeholder="邮编" />
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Message, Input, Select, Option } from "element-ui";
import {
  addAddress,
  updateAddress,
  addOrders,
  updateCartGoods
} from "../../../api/index";
import OrderHeader from "../../../components/OrderHeader";
import Modal from "../../../components/Modal";
export default {
  name: "orderConfirm",
  components: {
    OrderHeader,
    Modal,
    Input,
    Select,
    Option
  },
  data() {
    return {
      showDelModal: false, //是否显示删除弹框
      showEditModal: false, //是否显示新增或编辑弹框
      checkIndex: 0, //当前选中的收货地址的索引
      checkItem: {}, //当前选中的收货地址
      userAction: "" //用户行为 0 新增，1 编辑，2 删除
    };
  },
  mounted() {
    //请求购物车商品数据
    this.$store.dispatch("reqCartGoods");

    //请求收货地址列表数据
    this.$store.dispatch("reqShippingsList");

    this.getCreateTime();
  },
  computed: {
    ...mapState(["cartgoods", "shippingslist"]), //获取购物车数据

    //购物车中需要结算的商品列表
    cartList() {
      return this.cartgoods.filter(item => item.is_checked);
    },
    //计算商品的总件数
    totalCount() {
      let totalCount = 0;
      //3.1遍历
      this.cartList.forEach((goods, index) => {
        totalCount += goods.buy_count;
      });
      return totalCount;
    },
    //计算商品的总价格
    totalPrice() {
      let totalPrice = 0;
      //3.1遍历
      this.cartList.forEach((goods, index) => {
        totalPrice += goods.price * goods.buy_count;
      });
      return totalPrice;
    }
  },
  //过滤器
  filters: {
    // 格式化金钱
    moneyFormat(money) {
      if (!money) return "0.00";
      return Number(money).toFixed(2);
    }
  },
  methods: {
    //点击地址栏
    clickAddr(flag) {
      this.checkIndex = flag;
    },
    //打开新增地址弹框
    openAddressModal() {
      this.userAction = 0;
      this.checkItem = {};
      this.showEditModal = true;
    },
    //点击编辑新增地址
    editAddressModal(addressItem) {
      this.userAction = 1;
      this.checkItem = addressItem;
      this.showEditModal = true;
    },
    //删除单个地址
    delAddress(addressItem) {
      this.checkItem = addressItem;
      this.userAction = 2;
      this.showDelModal = true;
    },
    async submitAddress() {
      let { checkItem, userAction } = this;
      let {
        rec_id,
        rec_name,
        rec_phone,
        rec_province,
        rec_city,
        rec_district,
        rec_address,
        rec_zip
      } = checkItem;

      if (userAction === 0 || userAction === 1) {
        if (!rec_name) {
          Message.error("请输入收货人名称!");
          return;
        } else if (!rec_phone || !/^[1][3,4,5,7,8][0-9]{9}$/.test(rec_phone)) {
          Message.error("请输入正确格式的手机号");
          return;
        } else if (!rec_province) {
          Message.error("请选择省份");
          return;
        } else if (!rec_city) {
          Message.error("请选择对应的城市");
          return;
        } else if (!rec_district || !rec_address) {
          Message.error("请输入收货地址");
          return;
        } else if (!/\d{6}/.test(rec_zip)) {
          Message.error("请输入六位邮编");
          return;
        }
      }
      if (userAction === 0) {
        //新增地址
        this.$store.dispatch("addAddressSingle", { checkItem }); //修改vuex中的状态
        //更新数据库表
        const result = await addAddress(
          rec_name,
          rec_phone,
          rec_province,
          rec_city,
          rec_district,
          rec_address,
          rec_zip
        );
        if (result) {
          Message.success("操作成功");
          this.closeModal();
        }
      } else if (userAction === 1) {
        //编辑地址
        const result = await updateAddress(
          rec_id,
          rec_name,
          rec_phone,
          rec_province,
          rec_city,
          rec_district,
          rec_address,
          rec_zip
        );
        if (result) {
          Message.success("操作成功");
          this.closeModal();
        }
      } else if (userAction === 2) {
        //删除地址
        this.$store.dispatch("delAddressSingle", { checkItem });
        this.closeModal();
      } else {
      }
    },
    //关闭弹窗
    closeModal() {
      this.checkItem = {};
      this.userAction = 0;
      this.showDelModal = false;
      this.showEditModal = false;
    },

    //订单提交
    async orderSubmit() {
      let addressItem = this.shippingslist[this.checkIndex];
      if (!addressItem) {
        Message.error("请选择一个收货地址");
        return;
      }
      //生成一个订单编号 当前日期 + 6位随机数
      let orderNo = this.getProjectNum() + Math.floor(Math.random() * 1000000);
      //记录订单的生成时间
      let createTime = this.getCreateTime();
      //拼接收货地址
      let addressInfo = `${addressItem.rec_province} ${addressItem.rec_city} ${addressItem.rec_district} ${addressItem.rec_address}`;
      //提交订单
      let result = await addOrders(
        orderNo,
        createTime,
        addressItem.rec_name,
        addressItem.rec_phone,
        addressInfo,
        this.totalPrice
      );
      //订单提交成功
      if (result.success_code === 200) {
        //跳转页面并传递订单号
        this.$router.push({
          path: "/order/pay",
          query: { orderNo }
        });
        //更新购物车数据，删除被选中的商品
        let mes = await updateCartGoods();
        console.log(mes);
        //获取购物车商品数量
        this.$store.dispatch("getCartCount");
      }
    },

    //获取当前日期
    getProjectNum() {
      const projectTime = new Date(); //当前中国标准时间
      const Year = projectTime.getFullYear(); //获取当前年份 支持IE和火狐
      const Month = projectTime.getMonth() + 1; //获取中国区月份
      const Day = projectTime.getDate(); //获取几号
      let currentDate = String(Year);
      //判断月份和几号是否大于10或者小于10
      if (Month >= 10) {
        currentDate += Month;
      } else {
        currentDate += "0" + Month;
      }
      if (Day >= 10) {
        currentDate += Day;
      } else {
        currentDate += "0" + Day;
      }
      return currentDate;
    },

    //获取订单生成时的日期和时间
    getCreateTime() {
      let myDate = new Date();
      const year = myDate.getFullYear(); //获取当前年份 支持IE和火狐
      const month = myDate.getMonth() + 1; //获取中国区月份
      const day = myDate.getDate(); //获取几号
      const hours = myDate.getHours(); //获取几时
      const minutes = myDate.getMinutes(); //获取几分

      let currentDate = String(year); //当前日期
      //判断月份和几号是否大于10或者小于10
      if (month >= 10) {
        currentDate += "-" + month;
      } else {
        currentDate += "-0" + month;
      }
      if (day >= 10) {
        currentDate += "-" + day;
      } else {
        currentDate += "-0" + day;
      }
      let currentTime; //当前时间
      //时
      if (hours >= 10) {
        currentTime = String(hours);
      } else {
        currentTime = "0" + String(hours);
      }
      //分
      if (minutes >= 10) {
        currentTime += ":" + minutes;
      } else {
        currentTime += ":0" + minutes;
      }
      return currentDate + " " + currentTime; //返回日期时间
    }
  }
};
</script>

<style lang="stylus">
.clearfix:after
  content ''
  display block
  clear both
  zoom 1
.orderconfirm-page
  width 100%
  height auto
  .edit-wrap
    font-size 14px
    .item
      margin-bottom 15px
      .el-input
        width 280px
        &:nth-child(2)
          margin-left 14px
      input
        &:focus
          border 1px solid #20bfa9
      .el-select
        .el-input
          width 120px
          margin-right 16px
      textarea
        &:focus
          border 1px solid #20bfa9

  .confirm-container
    width 1190px
    background #fff
    margin 50px auto 80px
    padding-top 42px
    border-radius 4px
    .shipping-address
      padding 0 42px
      .address-title
        font-size 20px
        font-weight 300
        color #333
        margin-bottom 21px
      .address-box
        display flex
        flex-wrap wrap
        ul
          display inline-block
          .add-adr
            position relative
            .add
              position absolute
              left 50%
              top 50%
              transform translate(-50%, -50%)
              text-align center
              .icon
                font-size 38px
                margin-bottom 8px
              h3
                font-size 14px
                color #999
          li
            float left
            border 1px solid #e1e1e1
            border-radius 4px
            width 260px
            height 180px
            color #757575
            margin-right 15px
            margin-bottom 15px
            padding 15px 24px
            cursor pointer
            &.selected
              border 1px solid #ed462f
            .shipping-info
              height 80%
              .addr-name
                height 27px
                font-size 18px
                font-weight 300
                color #333
                margin-bottom 6px
              .addr-phone
                font-size 14px
                color #757575
                line-height 1.3em
              .address
                font-size 14px
                line-height 1.3em
                color #757575
                height 50px
            .action
              display flex
              justify-content space-between
              .icon
                font-size 25px
                color #666
                margin 8px 0
                &:hover
                  color #ed462f
    .goods-list
      margin 30px 0
      padding 0 42px
      h3
        font-size 18px
        color #333
        font-weight bold
        padding-bottom 10px
      ul
        border-top 1px solid #e1e1e1
        border-bottom 1px solid #e1e1e1
        li
          padding 8px 18px 8px 0
          display flex
          align-items center
          border-bottom 1px dashed #e1e1e1
          &:last-child
            border-bottom none
          .item-name
            width 700px
            display flex
            align-items center
            img
              width 50px
              margin-right 16px
          .item-num
            width 150px
            text-align right
          .item-total
            width 300px
            text-align right
            color #ed462f
    .shipping-method
      line-height 20px
      padding 0 42px
      h2
        display inline-block
        margin-right 70px
        font-size 20px
        width 80px
        font-weight bold
      span
        color #ed462f
    .settlement
      margin-top 50px
      padding 0 42px
      text-align right
      ul
        li
          text-align right
          font-size 16px
          color #666
          line-height 2em
          span
            color #ed462f
            display inline-block
            width 150px
          &:last-child
            margin-top 24px
            span
              font-size 28px
    .operation
      margin-top 40px
      padding 0 42px
      height 125px
      line-height 125px
      text-align right
      border-top 1px solid #e1e1e1
      button
        width 200px
        border none
        height 50px
        color #fff
        font-size 18px
        margin-left 20px
        border-radius 4px
        cursor pointer
        &:focus
          outline none
      .backbtn
        background #B0B0B0
      .clearbtn
        background #20bfa9
</style>
