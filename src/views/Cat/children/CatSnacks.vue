<template>
  <div v-if="catsnackslist">
    <ul class="shop-list" v-if="catsnackslist.length > 0">
      <shop-list
        tag="li"
        v-for="(item, index) in catsnackslist"
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
    ...mapState(["catsnackslist"])
  }
};
</script>

<style lang="stylus" scoped>
.shop-list
      display flex
      flex-wrap wrap
      justify-content left
</style>
