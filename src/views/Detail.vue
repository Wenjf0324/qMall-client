<template>
  <div class="detail-page">
    <banner-nav-other />
    <div class="container">
      <div class="detail-left">
        <div class="intro">
          <div class="img-box">
            <div class="big-img">
              <img
                src="../assets/images/shop_list/cat/goods1.jpg"
                width="100%"
              />
            </div>
            <div class="small-img">
              <div class="prebtn"></div>
              <div class="nextbtn"></div>
              <ul class="smallImg-list">
                <li class="smallImg-item">
                  <img
                    src="../assets/images/shop_list/cat/goods1.jpg"
                    width="100%"
                  />
                </li>
                <li class="smallImg-item">
                  <img
                    src="../assets/images/shop_list/cat/goods1.jpg"
                    width="100%"
                  />
                </li>
                <li class="smallImg-item">
                  <img
                    src="../assets/images/shop_list/cat/goods1.jpg"
                    width="100%"
                  />
                </li>
              </ul>
            </div>
          </div>

          <div class="summary">
            <h1>牛肉肝蔬菜及谷物狗粮7.5kg</h1>
            <div class="price"><span>￥149.0</span></div>
            <div class="description">
              <p><span class="sumTit">品牌：</span>宝路</p>
              <p><span class="sumTit">产品规格：</span>7.5kg</p>
              <p><span class="sumTit">适用犬类：</span>中小型犬成犬</p>
              <p>
                <span class="sumTit">购买数量：</span>
                <span class="number">-</span>
                <span class="number">1</span>
                <span class="number">+</span>
              </p>
            </div>
            <div class="buy">
              <router-link to="/detail">立即购买</router-link>
              <router-link to="/detail">加入购物车</router-link>
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
              src="../assets/images/shop_list/dog/goods1-4.jpg"
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
              <p>小型犬幼犬离乳期奶糕粮...</p>
              <p class="price">￥69.2</p>
              <router-link to="/detail">立即购买</router-link>
            </div>
          </li>
          <li>
            <img src="../assets/images/shop_list/dog/goods3.jpg" width="100%" />
            <div class="desc">
              <p>小型犬幼犬离乳期奶糕粮...</p>
              <p class="price">￥69.2</p>
              <router-link to="/detail">立即购买</router-link>
            </div>
          </li>
          <li>
            <img src="../assets/images/shop_list/dog/goods1.jpg" width="100%" />
            <div class="desc">
              <p>小型犬幼犬离乳期奶糕粮...</p>
              <p class="price">￥69.2</p>
              <router-link to="/detail">立即购买</router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BannerNavOther from "../components/BannerNav/BannerNavOther.vue";
export default {
  components: {
    BannerNavOther
  },
  data() {
    return {
      detailsType: true //true 详细信息，false 用户评价
    };
  },
  methods: {
    changeDetails(flag) {
      this.detailsType = flag;
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
            border 1px solid #e1e1e1
            margin-bottom 12px
          .small-img
            overflow hidden
            .smallImg-list
              display flex
              li
                border 1px solid #e1e1e1
                margin-right 6px
            img
              width 64px
        .summary
          width 420px
          margin 6px 0 0 50px
          h1
            font-weight normal
            font-size 22px
            color #333
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
              .number
                display inline-block
                border 1px solid #e1e1e1
                padding 6px 8px
                margin-right -5px
                &:nth-child(3)
                  padding: 6px 16px
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
            p
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
