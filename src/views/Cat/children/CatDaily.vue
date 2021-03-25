<template>
  <div v-if="catdailylist">
    <ul class="shop-list" v-if="catdailylist.length > 0">
      <shop-list
        tag="li"
        v-for="(item, index) in catdailylist"
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
    ...mapState(["catdailylist"])
  }
};
</script>

<style lang="stylus" scoped>
.shop-list
      display flex
      flex-wrap wrap
      justify-content left
</style>
