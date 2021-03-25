<template>
  <div v-if="catfoodlist">
    <ul class="shop-list" v-if="catfoodlist.length > 0">
      <shop-list
        tag="li"
        v-for="(item, index) in catfoodlist"
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
    ...mapState(["catfoodlist"])
  }
};
</script>

<style lang="stylus" scoped>
.shop-list
      display flex
      flex-wrap wrap
      justify-content left
</style>

