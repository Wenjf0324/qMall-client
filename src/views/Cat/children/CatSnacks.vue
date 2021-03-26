<template>
  <div v-if="catsnackslist">
    <GoodsList :goodslist="catsnackslist" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import GoodsList from "../../../components/GoodsList";
export default {
  components: { GoodsList },
  computed: {
    ...mapState(["catsnackslist"])
  }
};
</script>
