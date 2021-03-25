<template>
  <div v-if="dogdailylist">
    <ul class="shop-list" v-if="dogdailylist.length > 0">
      <shop-list
        tag="li"
        v-for="(item, index) in dogdailylist"
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
    ...mapState(["dogdailylist"])
  }
};
</script>

<style lang="stylus" scoped>
.shop-list
      display flex
      flex-wrap wrap
      justify-content left
</style>
