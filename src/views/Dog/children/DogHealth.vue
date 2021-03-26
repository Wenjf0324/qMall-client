<template>
  <div v-if="doghealthlist">
    <GoodsList :goodslist="doghealthlist" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import GoodsList from "../../../components/GoodsList";
export default {
  components: { GoodsList },
  computed: {
    ...mapState(["doghealthlist"])
  }
};
</script>
