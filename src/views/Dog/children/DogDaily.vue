<template>
  <div v-if="dogdailylist">
    <GoodsList :goodslist="dogdailylist" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import GoodsList from "../../../components/GoodsList";
export default {
  components: { GoodsList },
  computed: {
    ...mapState(["dogdailylist"])
  }
};
</script>
