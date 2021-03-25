<template>
  <div v-if="dogsnackslist">
    <ul class="shop-list" v-if="dogsnackslist.length > 0">
      <shop-list
        tag="li"
        v-for="(item, index) in dogsnackslist"
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
    ...mapState(["dogsnackslist"])
  }
};
</script>

<style lang="stylus" scoped>
.shop-list
      display flex
      flex-wrap wrap
      justify-content left
</style>
