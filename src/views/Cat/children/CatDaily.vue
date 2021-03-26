<template>
  <div v-if="catdailylist">
    <GoodsList :goodslist="catdailylist" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import GoodsList from "../../../components/GoodsList";
export default {
  components: { GoodsList },
  computed: {
    ...mapState(["catdailylist"])
  }
};
</script>
