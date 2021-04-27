<template>
  <div v-if="dogfoodlist">
    <!-- 遍历并渲染dogfoodlist数据 -->
    <GoodsList :goodslist="dogfoodlist" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import GoodsList from "../../../components/GoodsList";
export default {
  components: { GoodsList },
  computed: {
    ...mapState(["dogfoodlist"]) //获取狗狗主食商品列表
  }
};
</script>
