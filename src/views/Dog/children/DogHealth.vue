<template>
  <div v-if="doghealthlist">
    <ul class="shop-list" v-if="doghealthlist.length > 0">
      <shop-list
        tag="li"
        v-for="(item, index) in doghealthlist"
        :item="item"
        :key="index"
      />
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ShopList from "../../../components/ShopList.vue";
export default {
  components: { ShopList },
  computed: {
    ...mapState(["doghealthlist"])
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
