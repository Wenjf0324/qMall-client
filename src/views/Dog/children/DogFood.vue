<template>
  <div v-if="dogfoodlist">
    <GoodsList :goodslist="dogfoodlist" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import GoodsList from "../../../components/GoodsList";
export default {
  components: { GoodsList },
  computed: {
    ...mapState(["dogfoodlist"])
  }
};
</script>
