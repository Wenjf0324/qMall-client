<template>
  <div v-if="dogtoylist">
    <GoodsList :goodslist="dogtoylist" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import GoodsList from "../../../components/GoodsList";
export default {
  components: { GoodsList },
  computed: {
    ...mapState(["dogtoylist"])
  }
};
</script>
