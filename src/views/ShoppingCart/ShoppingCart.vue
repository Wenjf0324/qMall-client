<template>
  <div class="cart-page">
    <!-- 头部 -->
    <order-header title="我的购物车" />
    <!-- 主体部分 -->
    <div class="cart-main">
      <div class="container">
        <div class="empty-cart" v-if="cartgoods.length === 0">
          <p>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-cart"></use>
            </svg>
            您的购物车是空的，赶紧去
            <router-link to="/">逛逛吧！</router-link>
          </p>
        </div>
        <div v-if="cartgoods.length > 0">
          <div class="cart-box">
            <ul class="cart-item-head">
              <li>
                <span
                  class="checkbox"
                  :class="{ checked: isSelectedAll }"
                  @click.stop="selectedAll(isSelectedAll)"
                ></span>
                全选
              </li>
              <li>商品名称</li>
              <li>单价(元)</li>
              <li>数量</li>
              <li>小计(元)</li>
              <li>操作</li>
            </ul>
            <!-- 遍历购物车数组 -->
            <ul class="cart-item-list">
              <li
                class="cart-item"
                v-for="(item, index) in cartgoods"
                :key="index"
              >
                <!-- 是否选中 -->
                <div class="item-check">
                  <span
                    class="checkbox"
                    :class="{ checked: item.is_checked }"
                    @click.stop="singleGoodsSelected(item)"
                  ></span>
                </div>
                <!-- 商品名称 -->
                <div class="item-name">
                  <img v-lazy="item.thumb_url" width="100%" />
                  <span>{{ item.goods_name }}</span>
                </div>
                <!-- 单价 -->
                <div class="item-price">
                  {{ item.price | moneyFormat() }}
                </div>
                <!-- 数量 -->
                <div class="item-num">
                  <div class="num-box">
                    <span @click.stop="updateGoodsCount(item, false)">-</span>
                    <input
                      type="text"
                      value="1"
                      v-model="item.buy_count"
                      disabled
                    />
                    <span @click.stop="updateGoodsCount(item, true)">+</span>
                  </div>
                </div>
                <!-- 小计 -->
                <div class="item-total">
                  {{ (item.price * item.buy_count) | moneyFormat() }}
                </div>
                <!-- 删除操作 -->
                <div class="item-del">
                  <svg
                    class="icon"
                    aria-hidden="true"
                    @click.stop="clickTrash(item, item.goods_id)"
                  >
                    <use xlink:href="#icon-close"></use>
                  </svg>
                </div>
              </li>
            </ul>
          </div>
          <div class="cart-footer">
            <div class="cart-footer-left">
              <router-link to="/">继续购物</router-link>
              <p>
                共 <span>{{ cartcount }}</span> 件商品，已选择
                <span>{{ selectedGoodsCount }}</span> 件
              </p>
            </div>
            <div class="cart-footer-right">
              <p>
                合计：<span>{{ totalPrice | moneyFormat() }}</span
                >元
              </p>
              <button @click.stop="goToOrder()">选好了</button>
            </div>
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
import { Message, MessageBox } from "element-ui";
import OrderHeader from "../../components/OrderHeader.vue";
import OrderFooter from "../../components/OrderFooter.vue";
import { updateChecked } from "../../api/index";

export default {
  name: "shoppingCart",
  components: { OrderHeader, OrderFooter },
  data() {
    return {
      isSelectedAll: false, //是否选中所有商品
      totalPrice: 0, //商品总价格
      currentDelGoods: {} //当前删除的商品
    };
  },
  mounted() {
    //请求购物车商品数据
    this.$store.dispatch("reqCartGoods");
    this.getAllGoodsPrice();
  },
  computed: {
    ...mapState(["cartgoods", "cartcount"]), //获取购物车数据
    selectedGoodsCount() {
      //已选择的商品件数
      let goodsCount = 0;
      this.cartgoods.forEach((goods, index) => {
        if (goods.is_checked) {
          goodsCount += 1;
        }
      });
      return goodsCount;
    }
  },
  //过滤器
  filters: {
    // 格式化金钱
    moneyFormat(money) {
      if (!money) return "0.00";
      return "￥" + Number(money).toFixed(2);
    }
  },
  methods: {
    //1.单个商品的增加和减少
    updateGoodsCount(goods, isAdd) {
      this.$store.dispatch("updateGoodsCount", { goods, isAdd });

      //1.1计算商品的总价格
      this.getAllGoodsPrice();
    },

    //2.是否选中所有的商品
    async selectedAll(isSelected) {
      //2.1总控制
      this.isSelectedAll = !isSelected;
      this.$store.dispatch("selectedAll", { isSelected });
      //更新商品的选中状态
      this.cartgoods.forEach(async (goods, index) => {
        await updateChecked(goods.goods_id, goods.is_checked);
      });

      //2.2计算商品的总价格
      this.getAllGoodsPrice();
    },

    //3.计算商品的总价格
    getAllGoodsPrice() {
      let totalPrice = 0;
      //3.1遍历
      this.cartgoods.forEach((goods, index) => {
        if (goods.is_checked) {
          totalPrice += goods.price * goods.buy_count;
        }
      });
      this.totalPrice = totalPrice;
    },

    //4.单个商品的选中和取消
    async singleGoodsSelected(goods) {
      this.$store.dispatch("singleGoodsSelected", { goods });

      await updateChecked(goods.goods_id, goods.is_checked);

      //4.1计算商品的总价格
      this.getAllGoodsPrice();

      //4.2判断是否全选
      this.hasSelectedAll();
    },

    //5.判断是否全选
    hasSelectedAll() {
      let flag = true;
      this.cartgoods.forEach((goods, index) => {
        if (!goods.is_checked) {
          flag = false;
        }
      });
      this.isSelectedAll = flag;
    },

    //6.点击删除
    clickTrash(goods, goods_id) {
      MessageBox.confirm("您确定删除该商品吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("delGoodsSingle", { goods });
        this.$store.dispatch("getCartCount");
        //6.1计算商品的总价格
        this.getAllGoodsPrice();
      });
    },

    //7.点击结算
    async goToOrder() {
      //no_Checked为true时，表示每一件商品都没有选中
      let no_Checked = this.cartgoods.every(item => !item.is_checked);

      if (no_Checked) {
        MessageBox.alert("请选择一件商品", "提示", {
          confirmButtonText: "确定"
        });
      } else {
        this.$router.replace("/order/confirm");
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.cart-page
    width 100%
    height auto
    background #f5f5f5
    .cart-main
        height 100%
        .container
            height inherit
            position relative
            padding 50px 0 80px
            .empty-cart
                font-size 30px
                color #999
                text-align center
                margin 120px 0 220px
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
                .checked
                    border 1px solid #f60
                    background #f60
                    &::after
                      content '\2714'
                      display block
                      color #fff
                      line-height 22px
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
                                span
                                    display inline-block
                                    width 45px
                                    cursor pointer
                                input
                                  border-left 1px solid #e1e1e1
                                  border-right 1px solid #e1e1e1
                                  border-top none
                                  border-bottom none
                                  width 60px
                                  text-align center
                                  color #333
                                  &:focus
                                    outline none
                                  &:disabled
                                    background #fff

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
              p, a
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
