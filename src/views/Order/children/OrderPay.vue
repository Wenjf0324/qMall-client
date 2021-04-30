<template>
  <div class="order-pay">
    <order-header title="订单支付">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话</span>
      </template>
    </order-header>
    <div class="pay-container">
      <div class="order-details">
        <div class="item-order">
          <div class="icon-succ">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-submit"></use>
            </svg>
          </div>
          <div class="order-info">
            <h2>订单提交成功！去付款咯~</h2>
            <p>请在<span>30分钟</span>内完成支付，超时后将取消订单</p>
            <p>收货信息：{{ addressInfo }}</p>
          </div>
          <div class="order-total">
            <p>
              应付总额：<span>{{
                currentOrders.total_price | moneyFormat
              }}</span
              >元
            </p>
            <div>
              订单详情
              <div
                class="icon-detailsbtn"
                :class="{ up: showDetail }"
                @click.stop="showDetails()"
              >
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-down"></use>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class="item-detail" :class="{ show: isActive }">
          <div class="item">
            <div class="detail-title">订单号:</div>
            <div class="detail-info">{{ orderNo }}</div>
          </div>
          <div class="item">
            <div class="detail-title">收货信息:</div>
            <div class="detail-info">{{ addressInfo }}</div>
          </div>
          <div class="item">
            <div class="detail-title">商品信息:</div>
            <ul class="detail-info goods-info">
              <li
                v-for="(goods, index) in currentOrders.goodslist"
                :key="index"
              >
                <img v-lazy="goods.thumb_url" alt="" />
                <p>{{ goods.goods_name }}</p>
              </li>
            </ul>
          </div>
          <!-- <div class="item">
            <div class="detail-title">发票信息:</div>
            <div class="detail-info">电子发票 个人</div>
          </div> -->
        </div>
      </div>
      <div class="pay-methods">
        <h3>选择以下支付方式付款</h3>
        <div class="pay-way">
          <p>支付平台</p>
          <div class="pay pay-ali"></div>
          <div class="pay pay-wechat"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderHeader from "../../../components/OrderHeader";
import { mapState } from "vuex";
export default {
  name: "order-pay",
  components: { OrderHeader },
  data() {
    return {
      isActive: false, //是否显示订单详情
      showDetail: false, //订单详情的上拉和下拉图标的隐藏
      orderNo: this.$route.query.orderNo //订单号
    };
  },
  mounted() {
    //请求订单列表数据
    this.$store.dispatch("reqOrderList");
  },
  computed: {
    ...mapState(["orderlist"]), //获取订单列表数据

    //当前订单号的订单详情
    currentOrders() {
      let currentorders = {};
      if (this.orderlist.length > 0) {
        this.orderlist.forEach((orders, index) => {
          if (orders.order_no === this.orderNo) {
            currentorders = orders;
            console.log(currentorders);
          }
        });
      }
      return currentorders;
    },

    //收货人地址
    addressInfo() {
      return `${this.currentOrders.rec_name} ${this.currentOrders.rec_phone} ${this.currentOrders.rec_addressInfo}`;
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
    //显示、隐藏详情
    showDetails() {
      this.isActive = !this.isActive;
      this.showDetail = !this.showDetail;
    }
  }
};
</script>

<style lang="stylus">
.order-pay
  .pay-container
    width 1190px
    margin 50px auto 80px
    border-radius 4px
    .order-details
      padding 42px
      background #fff
      border-radius 4px
      .item-order
        display flex
        span
          color #ff6700
        .icon-succ
          width 92px
          margin-right 40px
          .icon
            margin-top -4px
            margin-left -4px
            font-size 100px
            color #80c58a
        .order-info
          margin-right 248px
          margin-top 6px
          h2
            font-size 24px
            margin-bottom 20px
            font-weight bold
          p
            color #666
            font-size 14px
            line-height 1.5em
        .order-total
          font-size 14px
          margin-top 6px
          p
            margin-bottom 30px
            span
              font-size 28px
          .icon-detailsbtn
            display inline-block
            cursor pointer
            transition all .5s
          .up
            transform rotate(180deg)

      .item-detail
        border-top 1px solid #e1e1e1
        padding-top 47px
        padding-left 130px
        font-size 14px
        margin-top 45px
        display none
        transition height 0.3s
        .item
          display flex
          align-items flex-start
          margin-bottom 19px
          font-size 14px
          .detail-title
            float left
            width 100px
          .goods-info
            // border 1px solid #e1e1e1
            // padding 0 8px
            li
              display flex
              align-items center
              margin-bottom 8px
              // padding 8px 0
              // border-bottom 1px dashed #e1e1e1
              // &:last-child
              //   border-bottom none
              img
                width 38px
                margin-right 8px

      .show
        display block

    .pay-methods
      margin-top 30px
      padding 42px 42px 64px
      background #fff
      border-radius 4px
      h3
        font-size 20px
        font-weight 200
        padding-bottom 24px
        border-bottom 1px solid #e1e1e1
        margin-bottom 26px
      .pay-way
        font-size 18px
        .pay
          display inline-block
          width 188px
          height 64px
          border 1px solid #e1e1e1
          cursor pointer
          &:last-child
            margin-left 20px
        .pay-ali
          background url('../../../assets/images/pay-ali.png') no-repeat 50%
          background-size 103px 38px
          margin-top 19px
        .pay-wechat
          background url('../../../assets/images/pay-wechat.png') no-repeat 50%
          background-size 103px 38px
</style>
