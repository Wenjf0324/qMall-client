<template>
  <div class="wrap">
    <ProductList
      title_icon="#icon-gutou"
      title="狗狗专区"
      :menu_nav="menu_nav"
      :shop_list="dog_list"
    />
  </div>
</template>

<script>
import ProductList from "../../../components/PruductList";
export default {
  components: { ProductList },

  data() {
    return {
      menu_nav: ["主食", "零食", "日用", "医疗", "玩具"],
      dog_list: [
        {
          img_url: require("../../../assets/images/shop_list/dog/goods1.jpg"),
          goods_name: "宝路 Pedigree 中小型成犬粮牛肉肝蔬菜及谷物狗粮7.5kg",
          price: "14900"
        },
        {
          img_url: require("../../../assets/images/shop_list/dog/goods2.jpg"),
          goods_name: "法国皇家Royal Canin 小型犬幼犬离乳期奶糕粮 1kg",
          price: "6920"
        },
        {
          img_url: require("../../../assets/images/shop_list/dog/goods3.jpg"),
          goods_name: "风来客 毫棒混合装洁齿磨牙骨咬胶狗零食2寸 270g（30只装）",
          price: "1760"
        },
        {
          img_url: require("../../../assets/images/shop_list/dog/goods4.jpg"),
          goods_name: "曼劳 立体派牛肉味肉粒狗零食 200g",
          price: "2990"
        },
        {
          img_url: require("../../../assets/images/shop_list/dog/goods5.jpg"),
          goods_name: "贵为GiGwi 狗狗智食堡智商训练喂食器",
          price: "23930"
        },
        {
          img_url: require("../../../assets/images/shop_list/dog/goods6.jpg"),
          goods_name: "福莱希flexi 草莓系列自动伸缩狗狗牵引绳",
          price: "12560"
        },
        {
          img_url: require("../../../assets/images/shop_list/dog/goods7.jpg"),
          goods_name: "谷登 肠胃宝益生菌酵素配方 5g*10包 犬猫通用 调理肠胃",
          price: "2690"
        },
        {
          img_url: require("../../../assets/images/shop_list/dog/goods8.jpg"),
          goods_name: "小宠EHD 猫狗用优能钙 120ml 补钙骨骼愈合及发育",
          price: "3200"
        },
        {
          img_url: require("../../../assets/images/shop_list/dog/goods9.jpg"),
          goods_name: ">多可特 玩具豪华套装 响声玩具狗玩具",
          price: "1400"
        },
        {
          img_url: require("../../../assets/images/shop_list/dog/goods10.jpg"),
          goods_name: "AFP 互动玩具系列网球奖励机 狗狗玩具",
          price: "8480"
        }
      ]
    };
  }
};
</script>
