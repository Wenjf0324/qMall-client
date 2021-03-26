<template>
  <div class="wrap">
    <ProductList
      title_icon="#icon-yugutou"
      title="猫咪专区"
      :menu_nav="menu_nav"
      :shop_list="cat_list"
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
      cat_list: [
        {
          img_url: require("../../../assets/images/shop_list/cat/goods1.jpg"),
          goods_name: "怡亲 成猫粮专用粮2.5KG",
          price: "6900"
        },
        {
          img_url: require("../../../assets/images/shop_list/cat/goods2.jpg"),
          goods_name: "佩玛思特 成猫粮专业去毛球配方猫粮2kg",
          price: "13500"
        },
        {
          img_url: require("../../../assets/images/shop_list/cat/goods3.jpg"),
          goods_name: "滋益巅峰Ziwi peak 牛肉猫罐头 185g",
          price: "3500"
        },
        {
          img_url: require("../../../assets/images/shop_list/cat/goods4.jpg"),
          goods_name: "BOTH 幼猫山羊奶果冻布丁补钙猫零食 15g*15粒",
          price: "2200"
        },
        {
          img_url: require("../../../assets/images/shop_list/cat/goods5.jpg"),
          goods_name: "伊丽Elite陶瓷碗浅口卡通猫狗食盆",
          price: "1060"
        },
        {
          img_url: require("../../../assets/images/shop_list/cat/goods6.jpg"),
          goods_name: "小佩 智能自动喂食器mini",
          price: "42700"
        },
        {
          img_url: require("../../../assets/images/shop_list/cat/goods7.jpg"),
          goods_name: "博来恩 中型猫用滴剂L 3支/盒(2.5-7.5kg)",
          price: "23860"
        },
        {
          img_url: require("../../../assets/images/shop_list/cat/goods8.jpg"),
          goods_name: "Proden博乐丹 猫用牙洁粉20g",
          price: "10100"
        },
        {
          img_url: require("../../../assets/images/shop_list/cat/goods9.jpg"),
          goods_name: "田田猫 毛球发声逗猫棒 多颜色可选",
          price: "700"
        },
        {
          img_url: require("../../../assets/images/shop_list/cat/goods10.jpg"),
          goods_name: "伊丽 Elite 小怪兽猫窝爬架",
          price: "17550"
        }
      ]
    };
  }
};
</script>
