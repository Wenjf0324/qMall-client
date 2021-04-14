<template>
  <div class="detail-page">
    <banner-nav-other />
    <div class="container">
      <div class="detail-left">
        <div class="intro">
          <div class="img-box">
            <div class="big-img">
              <ul class="bigimg-list">
                <li v-for="(item, index) in singlegoods.img_list" :key="index">
                  <img :src="item" width="100%" v-if="currentIndex === index" />
                </li>
              </ul>
            </div>
            <div class="small-img">
              <div class="prebtn"></div>
              <div class="nextbtn"></div>
              <ul class="smallImg-list">
                <li
                  class="smallImg-item"
                  :class="{ selected: checkIndex === index }"
                  v-for="(item, index) in singlegoods.img_list"
                  :key="index"
                  @click.stop="showImg(index)"
                >
                  <img v-lazy="item" width="100%" />
                </li>
              </ul>
            </div>
          </div>

          <div class="summary">
            <h1>{{ singlegoods.goods_name }}</h1>
            <div class="price">
              <span>{{ singlegoods.price | currency() }}</span>
            </div>
            <div class="description">
              <p><span class="sumTit">品牌：</span>{{ singlegoods.brand }}</p>
              <p>
                <span class="sumTit">产品规格：</span>{{ singlegoods.weight }}
              </p>
              <p>
                <span class="sumTit">适用对象：</span>{{ singlegoods.object }}
              </p>
              <p>
                <span class="sumTit">购买数量：</span>
                <span class="num-box">
                  <span @click.stop="updateGoodsCount(false)">-</span>
                  <!-- <span class="number">{{ goods_count }}</span> -->
                  <input type="text" :value="goods_count" disabled />
                  <span @click.stop="updateGoodsCount(true)">+</span>
                </span>
              </p>
            </div>
            <div class="buy">
              <router-link to="/order/confirm">立即购买</router-link>
              <!-- <router-link to="/shoppingcart" @click="addCart(singlegoods)"
                >加入购物车</router-link
              > -->
              <button @click="addCart(singlegoods)">加入购物车</button>
            </div>
            <div class="collection">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shoucang"></use>
              </svg>
              收藏
            </div>
          </div>
        </div>

        <div class="intro-details">
          <ul class="details-nav">
            <li :class="{ selected: detailsType }" @click="changeDetails(true)">
              详细信息
            </li>
            <li
              :class="{ selected: !detailsType }"
              @click="changeDetails(false)"
            >
              用户评价
            </li>
          </ul>
          <div class="details-content">
            <img
              v-lazy="singlegoods.detail_img"
              width="100%"
              class="details-item"
              :class="{ current: detailsType }"
            />
            <p class="details-item" :class="{ current: !detailsType }">
              目前还未有评论<br />只有买过此商品的客户登录后才能发表评论
            </p>
          </div>
        </div>
      </div>

      <div class="detail-right">
        <div class="recommend-title">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tuijian"></use>
          </svg>
          <span>相关推荐</span>
        </div>

        <ul class="recommend-list">
          <li>
            <img src="../assets/images/shop_list/cat/goods1.jpg" width="100%" />
            <div class="desc">
              <p>法国皇家Royal Canin 小型犬幼犬离乳期奶糕粮 1kg</p>
              <p class="price">￥69.2</p>
              <router-link to="/detail">立即购买</router-link>
            </div>
          </li>
          <li>
            <img src="../assets/images/shop_list/dog/goods3.jpg" width="100%" />
            <div class="desc">
              <p>法国皇家Royal Canin 小型犬幼犬离乳期奶糕粮 1kg</p>
              <p class="price">￥69.2</p>
              <router-link to="/detail">立即购买</router-link>
            </div>
          </li>
          <li>
            <img src="../assets/images/shop_list/dog/goods1.jpg" width="100%" />
            <div class="desc">
              <p>法国皇家Royal Canin 小型犬幼犬离乳期奶糕粮 1kg</p>
              <p class="price">￥69.2</p>
              <router-link to="/detail">立即购买</router-link>
            </div>
          </li>
        </ul>
      </div>
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
import Modal from "../components/Modal";
import BannerNavOther from "../components/BannerNav/BannerNavOther.vue";
import { addGoodsToCart } from "../api/index";
import { mapState } from "vuex";
import { Message, MessageBox } from "element-ui";
export default {
  name: "detail",
  components: {
    BannerNavOther,
    Modal
  },
  props: {
    goods: Array
  },
  data() {
    return {
      currentIndex: 0, //当前展示的图片
      checkIndex: 0, //选中的图片
      goods_count: 1, //购买数量
      detailsType: true, //true 详细信息，false 用户评价
      showModal: false
    };
  },
  computed: {
    ...mapState(["userInfo", "singlegoods"])
    // goodsInfo() {
    //   return this.$store.state.singlegoods;
    // }
  },
  methods: {
    showImg(index) {
      this.checkIndex = index;
      this.currentIndex = index;
    },
    changeDetails(flag) {
      this.detailsType = flag;
    },
    //单个商品的增加和减少
    updateGoodsCount(isAdd) {
      if (isAdd) {
        this.goods_count += 1;
      } else {
        this.goods_count -= 1;
        if (this.goods_count === 0) {
          this.goods_count = 1;
          Message.warning("商品至少保留一件");
        }
      }
    },
    async addCart(goods) {
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
        MessageBox.confirm("请先登录", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error"
        });
      } else if (result) {
        console.log("添加成功");
        this.showModal = true;
      }
    },
    goToCart() {
      this.$router.push("/shoppingcart");
      this.showModal = false;
    }
  },
  //过滤器
  filters: {
    currency(val) {
      if (!val) return "0.00";
      return "￥" + Number(val).toFixed(2);
    }
  }
};
</script>

<style lang="stylus" scoped>
.detail-page
  width 100%
  height auto
  .container
    display flex
    justify-content space-between
    padding-top 60px
    .detail-left
      width 890px
      border-right 1px solid #e1e1e1
      .intro
        margin-bottom 35px
        display flex
        .img-box
          width 375px
          .big-img
            height 375px
            border 1px solid #e1e1e1
            margin-bottom 12px
            img
              vertical-align top
          .small-img
            overflow hidden
            .smallImg-list
              display flex
              li
                border 1px solid #e1e1e1
                margin-right 6px
              .selected
                border 1px solid #ed462f
            img
              width 64px
              vertical-align top
        .summary
          width 420px
          margin 6px 0 0 50px
          h1
            font-weight normal
            font-size 22px
            color #333
            line-height 1.3em
          .price
            width 100%
            color #ed462f
            font-size 24px
            font-weight bold
            border-bottom 1px dashed #e1e1e1
            margin-top 16px
            padding 12px 0

          .description
            font-size 14px
            color #666
            p
              margin 26px 0
              .num-box
                display inline-block
                border 1px solid #e1e1e1
                span
                  display inline-block
                  padding 6px 8px
                  cursor pointer
              input
                width 50px
                background #fff
                text-align center
                padding 6px 8px
                border-left 1px solid #e1e1e1
                border-right 1px solid #e1e1e1
                border-top none
                border-bottom none
              .sumTit
                display inline-block
                width 80px
          .buy
             a
              width: 130px;
              text-align: center;
              padding: 12px 0;
              margin-right 8px
              display inline-block
              &:first-child
                background #000
                color: #fff;
              &:last-child
                border 1px solid #f60
                color #f60
            button
                width: 130px;
                text-align: center;
                padding: 12px 0;
                margin-right 8px
                display inline-block
                background #fff
                &:focus
                  outline none
                &:first-child
                  background #000
                  color: #fff;
                &:last-child
                  border 1px solid #f60
                  color #f60
          .collection
            color #666
            font-size 14px
            margin 18px 0
      .intro-details
        .details-nav
          margin 24px
          display flex
          background #f5f5f5
          border-radius 25px
          li
            font-size 14px
            color #666
            padding 18px 32px
            cursor pointer
            &.selected
              color #000
              font-weight bold
            &:hover
              color #000
        .details-content
          width 790px
          margin 24px auto
          .details-item
            display none
          .current
            display block
          p
            color #666
            font-size 13px
            line-height 20px
            border-top 3px solid #ececec
            padding-top 14px
            display block
    .detail-right
      width 250px
      .recommend-title
        font-size 15px
        background #000
        border-radius 50px
        color #fff
        padding 18px 28px
        .icon
          font-size 20px
          margin-right 8px
      .recommend-list
        margin-top 24px
        li
          margin-bottom 16px
          padding 6px 0
          display flex
          align-items center
          img
            width 82px
          .desc
            margin-left 8px
            overflow hidden
            p
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
              &:first-child
                color #666
                font-size 12px
            .price
              color #ed462f
              margin 10px 0
              font-size 16px
            a
              color #333
              font-weight bold
              font-size 12px
</style>
