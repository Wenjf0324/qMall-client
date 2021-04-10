<template>
  <div class="wrap">
    <div class="shop-container">
      <div class="shop-list-title">
        <!-- 标题 -->
        <h2>
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="title_icon"></use>
          </svg>
          {{ title }}
        </h2>
        <!-- 导航 -->
        <ul>
          <li
            @click="switchTo(item.path)"
            v-for="(item, index) in menu_nav"
            :key="index"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>

      <!-- 商品列表 -->
      <ul class="shop-list">
        <li
          class="shop-list-item"
          v-for="(item, index) in shop_list"
          :key="index"
        >
          <img
            @click="getGoodsInfoAndSwitchTo(item, `/detail/${item.goods_id}`)"
            v-lazy="item.img_url"
            width="100%"
          />
          <p
            @click="getGoodsInfoAndSwitchTo(item, `/detail/${item.goods_id}`)"
            class="list-item-title"
          >
            {{ item.goods_name }}
          </p>
          <div class="shop-list-bottom">
            <span class="item-price">{{ item.price | currency() }} </span>
            <!-- 加入购物车 -->
            <svg class="icon" aria-hidden="true" @click="addCart(item)">
              <use xlink:href="#icon-cart2"></use>
            </svg>
          </div>
        </li>
      </ul>
    </div>

    <modal
      title="提示"
      sureText="查看购物车"
      btnType="1"
      modalType="middle"
      :showModal="showModal"
      v-on:submit="goToCart"
      v-on:cancel="showModal = false"
    >
      <template v-slot:body>
        <p>商品添加成功！</p>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from "./Modal";
import { addGoodsToCart } from "../api/index";
import { MessageBox } from "element-ui";
import { mapState } from "vuex";
export default {
  components: { Modal },

  data() {
    return {
      showModal: false
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  props: {
    title_icon: String,
    title: String,
    menu_nav: Array,
    shop_list: Array
  },
  //过滤器
  filters: {
    currency(val) {
      if (!val) return "0.00";
      return "￥" + Number(val).toFixed(2);
    }
  },
  methods: {
    //跳转到商品详情页并展示商品数据
    getGoodsInfoAndSwitchTo(singlegoods, path) {
      this.$router.replace(path);
      this.$store.dispatch("getGoodsSingle", { singlegoods });
    },
    switchTo(path) {
      this.$router.replace(path);
    },
    async addCart(goods) {
      //console.log(goods);

      //1.发送请求
      //user_id,goods_id,goods_name,thumb_url,price
      let result = await addGoodsToCart(
        this.userInfo.id,
        goods.goods_id,
        goods.goods_name,
        goods.img_url,
        goods.price
      );
      console.log(result);
      if (!this.userInfo.id) {
        // Message.error("请先登录");
        MessageBox.confirm("请先登录", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error"
        });
      } else if (result) {
        this.showModal = true;
      }
    },
    goToCart() {
      this.$router.push("/shoppingcart");
      this.showModal = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
.shop-container
    margin-bottom 32px
    .shop-list-title
        display flex
        justify-content space-between
        border-bottom 2px solid #333
        h2
            font-size 26px
            color #333
            font-weight normal
            padding 8px 0 8px 6px
        ul
            display flex
            align-items flex-end
            color #666
            font-size 14px
            li
                padding 6px 20px
                cursor pointer
                position relative
                &:hover
                  color #fff
                  background #333
                &:after
                  content ''
                  display block
                  width 1px
                  height 14px
                  background #999
                  position absolute
                  top 50%
                  right 0
                  transform translateY(-50%)
                &:last-child:after, &:hover:after
                  background transparent


    .shop-list
        display flex
        flex-wrap wrap
        margin-right -16px
        .shop-list-item
          width 225px
          margin 0 16px 16px 0
          padding 8px
          border 1px solid #e7e7e7
          background #fff
          transition all 0.2s linear
          img, p
            cursor pointer
          &:hover
            transform translateY(-2px)
            box-shadow 0 0 5px 3px rgba(0,0,0,.1)
          .list-item-title
              margin 6px 0
              font-size 12px
              color #666
              line-height 1.5em
              height 36px
              overflow hidden
              text-overflow ellipsis
              display -webkit-box
              -webkit-line-clamp 2
              -webkit-box-orient vertical
          .shop-list-bottom
            position relative
            .item-price
                color #e31436
                font-size 16px
                font-weight bold
                display inline-block
                margin 8px 0
            .icon
              color #e31436
              font-size 18px
              margin-left 4px
              cursor pointer
              &:hover
                transform translateX(1px)
</style>
