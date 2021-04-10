<template>
  <div class="wrap">
    <ProductList
      title_icon="#icon-gutou"
      title="狗狗专区"
      :menu_nav="menu_nav"
      :shop_list="dogrecommend"
      :clickCellBtn="dealWithCellBtnClick"
    />
  </div>
</template>

<script>
import ProductList from "../../../components/PruductList";
import { mapState } from "vuex";
export default {
  components: { ProductList },
  computed: {
    ...mapState(["dogrecommend"])
  },
  data() {
    return {
      menu_nav: [
        { name: "主食", path: "/dog/food" },
        { name: "零食", path: "/dog/snacks" },
        { name: "日用", path: "/dog/daily" },
        { name: "医疗", path: "/dog/health" },
        { name: "玩具", path: "/dog/toy" }
      ]
    };
  },
  methods: {
    dealWithCellBtnClick() {},
    //筛选出推荐的商品
    filterRec(shoplist, resultlist) {
      shoplist.forEach((goods, index) => {
        if (goods.isRecommend) {
          resultlist.push(goods);
        }
      });
    }
  }
};
</script>
