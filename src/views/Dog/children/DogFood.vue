<template>
  <div v-if="dogfoodlist">
    <ul class="shop-list" v-if="dogfoodlist.length > 0">
      <shop-list
        tag="li"
        v-for="(item, index) in dogfoodlist"
        :item="item"
        :key="index"
      />
    </ul>
  </div>
</template>

<script>
import ShopList from "../../../components/ShopList.vue";
import { mapState } from "vuex";
export default {
  components: { ShopList },
  computed: {
    ...mapState(["dogfoodlist"])
  }
};
</script>

<style lang="stylus" scoped>
.shop-list
      display flex
      flex-wrap wrap
      justify-content left
</style>
