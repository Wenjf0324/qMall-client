<template>
  <div class="wrap">
    <ProductList
      title_icon="#icon-yugutou"
      title="猫咪专区"
      :menu_nav="menu_nav"
      :shop_list="catrecommend"
    />
  </div>
</template>

<script>
import ProductList from "../../../components/PruductList";
import { mapState } from "vuex";
export default {
  components: { ProductList },
  computed: {
    ...mapState(["catrecommend"])
  },
  data() {
    return {
      menu_nav: [
        { name: "主食", path: "/cat/food" },
        { name: "零食", path: "/cat/snacks" },
        { name: "日用", path: "/cat/daily" },
        { name: "医疗", path: "/cat/health" },
        { name: "玩具", path: "/cat/toy" }
      ]
    };
  }
};
</script>
