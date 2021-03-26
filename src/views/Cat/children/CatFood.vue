<template>
  <div v-if="catfoodlist">
    <GoodsList :goodslist="catfoodlist" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import GoodsList from "../../../components/GoodsList";
export default {
  components: { GoodsList },
  computed: {
    ...mapState(["catfoodlist"])
  }
};
</script>
