<template>
  <div v-if="cathealthlist">
    <ul class="shop-list" v-if="cathealthlist.length > 0">
      <shop-list
        tag="li"
        v-for="(item, index) in cathealthlist"
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
    ...mapState(["cathealthlist"])
  }
};
</script>

<style lang="stylus" scoped>
.shop-list
      display flex
      flex-wrap wrap
      justify-content left
</style>
