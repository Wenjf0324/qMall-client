<template>
  <div>
    <div class="home-banner-nav">
      <div class="wrap">
        <div class="banner-nav-left">
          <div class="menu">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-menu"></use>
            </svg>
            <span>商品分类</span>
          </div>

          <div class="menu-list wrap">
            <div class="kind-list">
              <ul>
                <li
                  :class="{ selected: selectPets }"
                  @mouseenter="showPetsMenu(true)"
                >
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-gougou"></use>
                  </svg>
                  <p>狗狗</p>
                </li>
                <li
                  :class="{ selected: !selectPets }"
                  @mouseenter="showPetsMenu(false)"
                >
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-maomi"></use>
                  </svg>
                  <p>猫咪</p>
                </li>
              </ul>
            </div>

            <div class="shop-list">
              <ul class="dog-list" v-show="selectPets">
                <li
                  v-for="(item, index) in dog_list"
                  :key="index"
                  @click="switchTo(item.path)"
                >
                  <svg class="icon" aria-hidden="true">
                    <use :xlink:href="item.icon"></use>
                  </svg>
                  <span>{{ item.name }} ></span>
                </li>
              </ul>

              <ul class="dog-list" v-show="!selectPets">
                <li
                  v-for="(item, index) in cat_list"
                  :key="index"
                  @click="switchTo(item.path)"
                >
                  <svg class="icon" aria-hidden="true">
                    <use :xlink:href="item.icon"></use>
                  </svg>
                  <span>{{ item.name }} ></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="banner-nav-right">
          <ul>
            <li @click="switchTo('/')">首页</li>
            <li @click="switchTo('/dog')">狗狗专区</li>
            <li @click="switchTo('/cat')">猫咪专区</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectPets: true, //判断选择了狗狗还是猫咪，true 狗狗，false 猫咪s
      dog_list: [
        { name: "狗狗主粮", icon: "#icon-zhushi", path: "/dog/food" },
        { name: "狗狗零食", icon: "#icon-lingshi1", path: "/dog/snacks" },
        { name: "狗狗日用", icon: "#icon-riyong", path: "/dog/daily" },
        { name: "狗狗医疗", icon: "#icon-yiliao", path: "/dog/health" },
        { name: "狗狗玩具", icon: "#icon-wanju", path: "/dog/toy" }
      ],
      cat_list: [
        { name: "猫咪主粮", icon: "#icon-zhushi", path: "/cat/food" },
        { name: "猫咪零食", icon: "#icon-lingshi1", path: "/cat/snacks" },
        { name: "猫咪日用", icon: "#icon-riyong", path: "/cat/daily" },
        { name: "猫咪医疗", icon: "#icon-yiliao", path: "/cat/health" },
        { name: "猫咪玩具", icon: "#icon-wanju", path: "/cat/toy" }
      ]
    };
  },
  methods: {
    switchTo(path) {
      //console.log(this.$router)
      this.$router.replace(path);
    },
    showPetsMenu(flag) {
      this.selectPets = flag;
    }
  }
};
</script>

<style lang="stylus">
.home-banner-nav
    .wrap
        display flex
    .banner-nav-left
        width 220px
        .menu
            width 220px
            height 36px
            color #fff
            font-weight bold
            background #20bfa9
            border 1px solid #20bfa9
            display flex
            justify-content center
            align-items center
            letter-spacing 8px
            .icon
              font-size 24px
              margin-right 8px
    .banner-nav-right
      ul
        display flex
        margin-left 8px
        height 36px
        line-height 36px
        li
          padding 0 24px
          &:hover
            cursor pointer
            color #20bfa9

.menu-list
  display flex
  position relative
  .kind-list
    width 54px
    position absolute
    left -54px
    li
      font-size 14px
      border: 1px solid rgba(0, 0, 0, 0.3);
      padding 22px 0
      text-align center
      color rgba(0, 0, 0, 0.3)
      cursor pointer
      &.selected
        background #fff
        color #333
      .icon
        font-size 26px
        margin-bottom 4px
  .shop-list
      width 220px
      color #333
      font-size 15px
      background #fff
      position absolute
      ul
        height 428px
        border 1px solid #e1e1e1
        display flex
        flex-wrap wrap
        justify-content center
      li
        width 100%
        display flex
        justify-content center
        align-items center
        border-bottom 1px dashed #e1e1e1
        .icon
          color #444
          margin-right 8px
          font-size 24px
        &:hover
          cursor pointer
          color #20bfa9
          border-top 1px solid #20bfa9
          border-bottom 1px solid #20bfa9
        &:last-child
          border-bottom none
</style>
