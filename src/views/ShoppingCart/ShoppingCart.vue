<template>
  <div class="cart-page">
    <!-- 头部 -->
    <order-header title="我的购物车" />
    <!-- 主体部分 -->
    <div class="cart-main">
      <div class="container">
        <div class="empty-cart">
          <p>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-cart"></use>
            </svg>
            您的购物车是空的，赶紧去
            <router-link to="/">逛逛吧！</router-link>
          </p>
        </div>
        <div class="cart-box">
          <ul class="cart-item-head">
            <li><span class="checkbox checked"></span> 全选</li>
            <li>商品名称</li>
            <li>单价(元)</li>
            <li>数量</li>
            <li>小计(元)</li>
            <li>操作</li>
          </ul>
          <ul class="cart-item-list">
            <li
              class="cart-item"
              v-for="(item, index) in cartgoods"
              :key="index"
            >
              <div class="item-check">
                <span class="checkbox checked"></span>
              </div>
              <div class="item-name">
                <img v-lazy="item.thumb_url" width="100%" />
                <span>{{ item.goods_name }}</span>
              </div>
              <div class="item-price">{{ item.price / 100 }}</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;">-</a>
                  <input type="text" value="1" v-model="item.buy_count" />
                  <a href="javascript:;">+</a>
                </div>
              </div>
              <div class="item-total">
                {{ (item.price / 100) * item.buy_count }}
              </div>
              <div class="item-del">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-close"></use>
                </svg>
              </div>
            </li>
          </ul>
        </div>
        <div class="cart-footer">
          <div class="cart-footer-left">
            <p style="cursor:pointer">继续购物</p>
            <p>共 <span>2</span> 件商品，已选择 <span>0</span> 件</p>
          </div>
          <div class="cart-footer-right">
            <p>合计：<span>0</span>元</p>
            <button>去结算</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <OrderFooter />
  </div>
</template>

<script>
import { mapState } from "vuex";
import OrderHeader from "../../components/OrderHeader.vue";
import OrderFooter from "../../components/OrderFooter.vue";

export default {
  components: { OrderHeader, OrderFooter },
  computed: {
    ...mapState(["cartgoods"])
  },
  mounted() {
    //请求商品数据
    this.$store.dispatch("reqCartGoods");
  }
};
</script>

<style lang="stylus" scoped>
.cart-page
    width 100%
    height auto
    background #f5f5f5
    .cart-main
        height inherit
        .container
            height inherit
            position relative
            padding 50px 0 80px
            .empty-cart
                font-size 30px
                color #999
                text-align center
                margin 120px 0 220px
                display none
                .icon
                    font-size 40px
                    color #ff6500
                a
                    color #ff6500
            .cart-box
                width inherit
                background #fff
                border-radius 4px
                .checkbox
                    display inline-block
                    width 22px
                    height 22px
                    border 1px solid #e1e1e1
                    vertical-align middle
                    margin-right 17px
                    cursor pointer
                .cart-item-head
                    height 80px
                    display flex
                    justify-content space-between
                    li
                        font-size 14px
                        color #999
                        line-height 80px
                        text-align center
                        width 136px
                        &:nth-child(2)
                            flex 3
                        &:nth-child(4)
                            flex 2
                .cart-item-list
                    .cart-item
                        color #333
                        height 125px
                        border-top 1px solid #e1e1e1
                        display flex
                        justify-content space-between
                        align-items center
                        > div
                            text-align center
                        .item-total, .item-del, .item-check, .item-price
                            flex 1
                        .item-name
                            flex 3
                            font-size 16px
                            display flex
                            align-items center
                            img
                                width 80px
                            span
                                display inline-block
                                margin-left 18px
                                text-align center
                                line-height 20px
                        .item-price
                            line-height 125px
                        .item-num
                            flex 2
                            .num-box
                                display inline-flex
                                justify-content space-between
                                width 150px
                                height 40px
                                line-height 40px
                                border 1px solid #e1e1e1
                                font-size 14px
                                a
                                    width 50px
                                input
                                  width 50px
                                  text-align center
                                  border none
                                  color #333

                        .item-total
                            color #f60
                        .item-del > .icon
                          font-size 22px
                          color #666
                          cursor pointer
            .cart-footer
              margin-top 20px
              color #666
              font-size 14px
              height 50px
              line-height 50px
              display flex
              justify-content  space-between
              p
                display inline-block
                margin-right 27px
              span
                color #f60
              .cart-footer-left
                margin-left 29px
              .cart-footer-right
                p
                  color #f60
                  span
                    font-size 24px
                button
                  width 202px
                  height 50px
                  color #fff
                  line-height 50px
                  font-size 18px
                  margin-left 37px
                  background #20bfa9
                  border-radius 4px
                  border none
                  cursor pointer
                  &:focus
                    outline none
</style>
