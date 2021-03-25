<template>
  <div class="shop-list-item">
    <img :src="item.img_url" alt="" width="100%" />
    <p class="list-item-title">{{ item.goods_name }}</p>
    <span class="item-price">￥{{ item.price / 100 }} </span>
  </div>
</template>

<script>
export default {
  name: "ShopList",
  props: {
    item: Object
  }
};
</script>

<style lang="stylus" scoped>
.shop-list-item
  width 225px
  margin 0 16px 16px 0
  padding 8px
  border 1px solid #e7e7e7
  .list-item-title
      font-size 12px
      color #666
      line-height 1.5em
      height 40px
      overflow hidden
  .item-price
      color #e31436
      font-size 16px
      font-weight bold
      display inline-block
      margin 8px 0
</style>
