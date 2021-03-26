<template>
  <div v-if="dogsnackslist">
    <GoodsList :goodslist="dogsnackslist" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import GoodsList from "../../../components/GoodsList";
export default {
  components: { GoodsList },
  computed: {
    ...mapState(["dogsnackslist"])
  }
};
</script>
