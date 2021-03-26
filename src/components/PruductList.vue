<template>
  <div class="wrap">
    <div class="shop-container">
      <div class="shop-list-title">
        <h2>
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="title_icon"></use>
          </svg>
          {{ title }}
        </h2>
        <ul>
          <li v-for="(item, index) in menu_nav" :key="index">{{ item }}</li>
        </ul>
      </div>

      <ul class="shop-list">
        <li
          class="shop-list-item"
          v-for="(item, index) in shop_list"
          :key="index"
        >
          <img v-lazy="item.img_url" alt="" width="100%" />
          <p class="list-item-title">{{ item.goods_name }}</p>
          <div class="shop-list-bottom">
            <span class="item-price"
              >{{ (item.price / 100) | currency() }}
            </span>
            <svg class="icon" aria-hidden="true" @click="addCart">
              <use xlink:href="#icon-cart2"></use>
            </svg>
          </div>
        </li>
      </ul>
    </div>

    <modal
      title="提示"
      sureText="查看购物车"
      btnType="1"
      modalType="middle"
      :showModal="showModal"
      v-on:submit="goToCart"
      v-on:cancel="showModal = false"
    >
      <template v-slot:body>
        <p>商品添加成功！</p>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from "./Modal";
export default {
  components: { Modal },
  data() {
    return {
      showModal: false
    };
  },
  props: {
    title_icon: String,
    title: String,
    menu_nav: Array,
    shop_list: Array
  },
  //过滤器
  filters: {
    currency(val) {
      if (!val) return "0.00";
      return "￥" + val.toFixed(2);
    }
  },
  methods: {
    addCart() {
      this.showModal = true;
      //将数据添加到购物车

      //
    },
    goToCart() {
      this.$router.push("/shoppingcart");
    }
  }
};
</script>

<style lang="stylus" scoped>
.shop-container
    margin-bottom 32px
    .shop-list-title
        padding 8px 6px
        display flex
        justify-content space-between
        border-bottom 2px solid #333
        h2
            font-size 26px
            color #333
            font-weight normal
        ul
            display flex
            align-items flex-end
            color #666
            font-size 14px
            li
                padding 0 10px
                border-right 1px solid #999
                &:last-child
                    border-right none

    .shop-list
        display flex
        flex-wrap wrap
        margin-right -16px
        .shop-list-item
          width 225px
          margin 0 16px 16px 0
          padding 8px
          border 1px solid #e7e7e7
          background #fff
          cursor pointer
          transition all 0.2s linear
          &:hover
            transform translateY(-2px)
            box-shadow 0 0 5px 3px rgba(0,0,0,.1)
          .list-item-title
              font-size 12px
              color #666
              line-height 1.5em
              height 40px
              overflow hidden
          .shop-list-bottom
            position relative
            .item-price
                color #e31436
                font-size 16px
                font-weight bold
                display inline-block
                margin 8px 0
            .icon
              color #e31436
              font-size 18px
              margin-left 4px
              cursor pointer
</style>
