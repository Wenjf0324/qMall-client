<template>
  <div class="detail-page">
    <banner-nav-other />
    <div class="container">
      <ul class="page-nav-bar">
        <li @click="$router.push('/')">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-home"></use>
          </svg>
          <span>首页</span>
        </li>
        <li @click="secSwitchTo">{{ subPageNav }}</li>
        <li @click="thiSwitchTo">{{ singlegoods.category }}</li>
      </ul>

      <div class="main-box">
        <div class="detail-left">
          <div class="intro">
            <div class="img-box">
              <!-- 放大镜特效的小容器 -->
              <div class="big-img small-box" ref="smallBox">
                <!-- 最顶层的透明遮罩，避免高频颤动 -->
                <div
                  class="maskTop"
                  @mouseover="showFloatAndBigBox"
                  @mouseout="hideFloatAndBigBox"
                  @mousemove="moveFloatBox"
                ></div>
                <!-- 可移动的放大镜 -->
                <div
                  class="float-box"
                  ref="floatBox"
                  v-show="isMouseOver"
                ></div>
                <ul class="bigimg-list">
                  <li
                    v-for="(item, index) in singlegoods.img_list"
                    :key="index"
                  >
                    <img :src="item" v-if="currentIndex === index" />
                  </li>
                </ul>
              </div>
              <!-- 放大镜特效的大容器 -->
              <div class="big-box" ref="bigBox" v-show="isMouseOver">
                <div class="wrapper">
                  <ul class="bigimg-list" ref="bigBoxImage">
                    <li
                      v-for="(item, index) in singlegoods.img_list"
                      :key="index"
                    >
                      <img :src="item" v-if="currentIndex === index" />
                    </li>
                  </ul>
                </div>
              </div>
              <!-- 小图片列表 -->
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
              <div class="addcartBtn">
                <div class="wrapper"></div>
                <button class="wrapper" @click="addCart(singlegoods)">
                  加入购物车
                </button>
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
              <li
                :class="{ selected: detailsType }"
                @click="changeDetails(true)"
              >
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
            <li v-for="(item, index) in recommendList" :key="index">
              <img :src="item.img_url" width="100%" />
              <div class="desc">
                <p
                  @click="
                    getGoodsInfoAndSwitchTo(item, `/detail/${item.goods_id}`)
                  "
                >
                  {{ item.goods_name }}
                </p>
                <p class="price">{{ item.price | currency() }}</p>
                <span
                  @click="
                    getGoodsInfoAndSwitchTo(item, `/detail/${item.goods_id}`)
                  "
                  >立即购买</span
                >
              </div>
            </li>
          </ul>
        </div>
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
import PicZoom from "vue-piczoom";
export default {
  name: "detail",
  components: {
    BannerNavOther,
    Modal,
    PicZoom
  },
  props: {
    goods: Array
  },
  data() {
    return {
      isMouseOver: false, //鼠标是否移到图片上
      currentIndex: 0, //当前展示的图片
      checkIndex: 0, //选中的图片
      goods_count: 1, //购买数量
      detailsType: true, //true 详细信息，false 用户评价
      showModal: false
    };
  },
  computed: {
    ...mapState(["userInfo", "singlegoods", "dogrecommend", "catrecommend"]),
    subPageNav() {
      if (this.singlegoods.category.substr(0, 2) === "狗狗") {
        return "狗狗专区";
      } else {
        return "猫咪专区";
      }
    },
    recommendList() {
      let dogArr = [];
      let catArr = [];
      for (let i = 0; i < this.dogrecommend.length; i++) {
        let item = this.dogrecommend[i];
        if ((i + 1) % 2 === 0) {
          dogArr.push(item);
        }
      }
      for (let i = 0; i < this.catrecommend.length; i++) {
        let item = this.catrecommend[i];
        if ((i + 1) % 2 === 0) {
          catArr.push(item);
        }
      }
      if (this.subPageNav === "狗狗专区") {
        return dogArr;
      } else {
        return catArr;
      }
    }
  },
  mounted() {
    //请求狗狗推荐列表
    this.$store.dispatch("reqDogRecommend");
    //请求猫咪推荐列表
    this.$store.dispatch("reqCatRecommend");
  },
  //过滤器
  filters: {
    currency(val) {
      if (!val) return "0.00";
      return "￥" + Number(val).toFixed(2);
    }
  },
  methods: {
    // 导航栏的二级页面跳转
    secSwitchTo() {
      if (this.subPageNav === "狗狗专区") {
        this.$router.push("/dog");
      } else if (this.subPageNav === "猫咪专区") {
        this.$router.push("/cat");
      }
    },
    // 导航栏的三级页面跳转
    thiSwitchTo() {
      if (this.singlegoods.category === "狗狗主食") {
        this.$router.push("/dog/food");
      } else if (this.singlegoods.category === "狗狗零食") {
        this.$router.push("/dog/snacks");
      } else if (this.singlegoods.category === "狗狗日用") {
        this.$router.push("/dog/daily");
      } else if (this.singlegoods.category === "狗狗医疗") {
        this.$router.push("/dog/health");
      } else if (this.singlegoods.category === "狗狗玩具") {
        this.$router.push("/dog/toy");
      } else if (this.singlegoods.category === "猫咪主食") {
        this.$router.push("/cat/food");
      } else if (this.singlegoods.category === "猫咪零食") {
        this.$router.push("/cat/snacks");
      } else if (this.singlegoods.category === "猫咪日用") {
        this.$router.push("/cat/daily");
      } else if (this.singlegoods.category === "猫咪医疗") {
        this.$router.push("/cat/health");
      } else if (this.singlegoods.category === "猫咪玩具") {
        this.$router.push("/cat/toy");
      }
    },
    //显示放大镜和放大镜区域
    showFloatAndBigBox() {
      this.isMouseOver = true;
    },
    //隐藏放大镜和放大镜区域
    hideFloatAndBigBox() {
      this.isMouseOver = false;
    },
    //移动放大镜
    moveFloatBox(event) {
      let smallBox = this.$refs.smallBox;
      let floatBox = this.$refs.floatBox;
      let bigBox = this.$refs.bigBox;
      let bigBoxImage = this.$refs.bigBoxImage;

      //放大境到图片的距离
      let left = event.offsetX - floatBox.offsetWidth / 2;
      let top = event.offsetY - floatBox.offsetHeight / 2;

      //放大镜到达左右边界点
      if (left < 0) {
        left = 0;
      } else if (left > smallBox.offsetWidth - floatBox.offsetWidth) {
        left = smallBox.offsetWidth - floatBox.offsetWidth;
      }

      if (top < 0) {
        top = 0;
      } else if (top > smallBox.offsetHeight - floatBox.offsetHeight) {
        top = smallBox.offsetHeight - floatBox.offsetHeight;
      }

      floatBox.style.left = left + "px";
      floatBox.style.top = top + "px";

      let percentX = left / (smallBox.offsetWidth - floatBox.offsetWidth);
      let percentY = top / (smallBox.offsetHeight - floatBox.offsetHeight);

      bigBoxImage.style.left =
        -percentX * (bigBoxImage.offsetWidth - bigBox.offsetWidth) + "px";
      bigBoxImage.style.top =
        -percentY * (bigBoxImage.offsetHeight - bigBox.offsetHeight) + "px";
    },
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
    },
    getGoodsInfoAndSwitchTo(singlegoods, path) {
      this.$router.replace(path);
      this.$store.dispatch("getGoodsSingle", { singlegoods });
    }
  }
};
</script>

<style lang="stylus" scoped>
.detail-page
  width 100%
  height auto
  .container
    margin-bottom 50px
    .page-nav-bar
      font-size 14px
      color #595959
      padding 24px 0 12px
      border-bottom 1px solid #e1e1e1
      display flex
      li
        padding-right 32px
        position relative
        cursor pointer
        &:hover
          color #20bfa9
        &:before
          content ''
          display inline-block
          width 6px
          height 6px
          border-top 1px solid #595959
          border-right 1px solid #595959
          margin-right 14px
          position absolute
          right 0
          top 50%
          transform translateY(-50%) rotate(45deg)

    .main-box
      display flex
      justify-content space-between
      padding-top 32px
    .detail-left
      width 920px
      border-right 1px solid #e1e1e1
      .intro
        margin-bottom 50px
        display flex
        .img-box
          width 400px
          border 1px solid #e1e1e1
          padding 20px 20px 0
          position relative
          .small-box
            width 360px
            height 360px
            position relative
            .maskTop
              width 360px
              height 360px
              position absolute
              top 0
              left 0
              z-index 1
              cursor move
            .float-box
              width 160px
              height 120px
              position absolute
              left 0
              top 0
              // background #ffffcc
              // opacity 0.5
              background rgba(0,0,0,0.5)
          .big-box
            width 400px
            height 400px
            border 1px solid #ccc
            overflow hidden
            position absolute
            top 0
            left 400px
            z-index 1
            .wrapper
              width 400px
              height 400px
              position relative
            .bigimg-list
              width 900px
              height 900px
              position absolute
              left 0
              top 0
              img
                width 900px
                height 900px
          .big-img
            overflow hidden
            img
                width 360px
                vertical-align top
          .small-img
            overflow hidden
            margin 16px 0
            .smallImg-list
              display flex
              li
                border 1px solid #e1e1e1
                margin-right 10px
                cursor pointer
                &:hover
                  border 1px solid #f60
              .selected
                border 1px solid #f60
            img
              width 55px
              vertical-align top
        .summary
          width 435px
          margin 6px 0 0 45px
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
              margin 30px 0
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
          .addcartBtn > button
                width 200px
                padding 12px 0
                border none
                background #fff
                border 1px solid #f60
                color #f60
                font-size 16px
                cursor pointer
                &:focus
                  outline none
                &:hover
                  background #f60
                  color #fff
          .collection
            color #666
            font-size 14px
            margin 30px 0
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
      width 230px
      .recommend-title
        font-size 15px
        background #000
        border-radius 50px
        color #fff
        padding 12px 28px
        .icon
          font-size 20px
          margin-right 8px
      .recommend-list
        margin 12px 10px
        li
          padding 10px 0
          display flex
          align-items center
          border-bottom 1px dashed #e1e1e1
          &:last-child
            border-bottom none
          img
            width 82px
            cursor pointer
          .desc
            margin-left 8px
            overflow hidden
            p
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
              &:first-child
                color #999
                font-size 12px
                cursor pointer
                &:hover
                  color #666
            .price
              color #ed462f
              margin 10px 0
              font-size 16px
            span
              color #333
              font-weight bold
              font-size 12px
              cursor pointer
</style>
