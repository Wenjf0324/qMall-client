<template>
  <div class="wrap">
    <div class="shop-container">
      <div class="shop-list-title">
        <h2>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yugutou"></use>
          </svg>
          猫咪专区
        </h2>
        <ul>
          <li>主食</li>
          <li>零食</li>
          <li>日用</li>
          <li>医疗</li>
          <li>玩具</li>
        </ul>
      </div>

      <ul class="shop-list">
        <shop-list
          tag="li"
          v-for="(item, index) in cat_list"
          :item="item"
          :key="index"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import ShopList from "../../../components/ShopList";

export default {
  components: { ShopList },
  data() {
    return {
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

<style lang="stylus" scoped>
.shop-container
    margin-top 32px
    .shop-list-title
        padding 8px 6px
        display flex
        justify-content space-between
        border-bottom 2px solid #333
        h2
            font-size 26px
            color #333
            font-weight normal
        ul
            display flex
            align-items flex-end
            color #666
            font-size 14px
            li
                padding 0 10px
                border-right 1px solid #999
                &:last-child
                    border-right none

    .shop-list
        display flex
        flex-wrap wrap
        margin-right -16px
        li
            width 225px
            margin 0 16px 16px 0
            padding 8px
            border 1px solid #e7e7e7
            .list-item-title
                font-size 12px
                color #666
                line-height 1.5em
                height 40px
                overflow hidden
            .item-price
                color #e31436
                font-size 16px
                font-weight bold
                display inline-block
                margin 8px 0
</style>
