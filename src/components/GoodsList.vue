<template>
  <div>
    <ul class="shop-list" v-if="goodslist.length > 0">
      <li
        class="shop-list-item"
        v-for="(item, index) in goodslist"
        :key="index"
      >
        <img @click="switchTo('/detail')" v-lazy="item.img_url" width="100%" />
        <p @click="switchTo('/detail')" class="list-item-title">
          {{ item.goods_name }}
        </p>
        <div class="shop-list-bottom">
          <span class="item-price">{{ (item.price / 100) | currency() }} </span>
          <svg class="icon" aria-hidden="true" @click="addCart">
            <use xlink:href="#icon-cart2"></use>
          </svg>
        </div>
      </li>
    </ul>
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
  props: {
    goodslist: Array
  },
  data() {
    return {
      showModal: false
    };
  },
  //过滤器
  filters: {
    currency(val) {
      if (!val) return "0.00";
      return "￥" + val.toFixed(2);
    }
  },
  methods: {
    switchTo(path) {
      this.$router.replace(path);
    },
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
.shop-list
      display flex
      flex-wrap wrap
      justify-content left
      .shop-list-item
        width 225px
        margin 0 16px 16px 0
        padding 8px
        border 1px solid #e7e7e7
        background #fff
        transition all 0.2s linear
        img, p
          cursor pointer
        &:hover
          transform translateY(-2px)
          box-shadow 0 0 5px 2px rgba(0,0,0,.1)
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
            &:hover
              transform translateX(1px)
</style>
