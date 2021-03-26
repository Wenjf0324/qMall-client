<template>
  <div v-if="cattoylist">
    <GoodsList :goodslist="cattoylist" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import GoodsList from "../../../components/GoodsList";
export default {
  components: { GoodsList },
  computed: {
    ...mapState(["cattoylist"])
  }
};
</script>
