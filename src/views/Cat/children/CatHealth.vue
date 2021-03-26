<template>
  <div v-if="cathealthlist">
    <GoodsList :goodslist="cathealthlist" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import GoodsList from "../../../components/GoodsList";
export default {
  components: { GoodsList },
  computed: {
    ...mapState(["cathealthlist"])
  }
};
</script>
