<template>
  <div class="wrap">
    <div class="shop-container">
      <div class="shop-list-title">
        <h2>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gutou"></use>
          </svg>
          狗狗专区
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
          v-for="(item, index) in dog_list"
          :item="item"
          :key="index"
        />
      </ul>

      <!-- <ul class="shop-list" v-if="homeshoplist.length > 0">
        <li
          class="shop-list-item"
          v-for="(shop, index) in homeshoplist"
          :key="index"
        >
          <img :src="shop.img_url" alt="" width="100%" />
          <p class="list-item-title">{{ shop.goods_name }}</p>
          <span class="item-price">￥{{ shop.normal_price / 100 }}</span>
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script>
import ShopList from "../../../components/ShopList";
export default {
  components: { ShopList },
  data() {
    return {
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
</style>
