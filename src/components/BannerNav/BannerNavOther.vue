<template>
  <div>
    <div class="banner-nav">
      <div class="wrap">
        <div class="banner-nav-left">
          <div class="menu" @mouseenter="showMenu()" @mouseleave="hideMenu()">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-menu"></use>
            </svg>
            <span>商品分类</span>

            <div class="menu-list" v-if="menuVisible">
              <div class="kind-list">
                <ul>
                  <li
                    v-for="(p, index) in petList"
                    :key="index"
                    :class="{ selected: index === currentIndex }"
                    @click="currentIndex = index"
                  >
                    <svg class="icon" aria-hidden="true">
                      <use :xlink:href="p.icon"></use>
                    </svg>
                    <p>{{ p.name }}</p>
                  </li>
                </ul>
              </div>
              <div class="shop-list">
                <ul
                  v-for="(item, index) in menuList"
                  :key="index"
                  v-show="currentIndex === index"
                >
                  <li v-for="(p, i) in item.menu" :key="i">
                    <svg class="icon" aria-hidden="true">
                      <use :xlink:href="p.icon"></use>
                    </svg>
                    <span>{{ p.name }} ></span>
                  </li>
                </ul>
              </div>
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
      currentIndex: 0,
      menuVisible: false,
      petList: [
        { name: "狗狗", icon: "#icon-gougou" },
        { name: "猫咪", icon: "#icon-maomi" }
      ],
      menuList: [
        {
          menu: [
            { name: "狗狗主粮", icon: "#icon-zhushi" },
            { name: "狗狗零食", icon: "#icon-lingshi1" },
            { name: "狗狗日用", icon: "#icon-riyong" },
            { name: "狗狗医疗", icon: "#icon-yiliao" },
            { name: "狗狗玩具", icon: "#icon-wanju" }
          ]
        },
        {
          menu: [
            { name: "猫咪主粮", icon: "#icon-zhushi" },
            { name: "猫咪零食", icon: "#icon-lingshi1" },
            { name: "猫咪日用", icon: "#icon-riyong" },
            { name: "猫咪医疗", icon: "#icon-yiliao" },
            { name: "猫咪玩具", icon: "#icon-wanju" }
          ]
        }
      ]
    };
  },
  methods: {
    switchTo(path) {
      //console.log(this.$router)
      this.$router.replace(path);
    },
    showMenu() {
      this.menuVisible = true;
    },
    hideMenu() {
      this.menuVisible = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
.banner-nav
    border-bottom 2px solid #20bfa9
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
            position relative
            .icon
              font-size 24px
              margin-right 8px
            .menu-list
                font-weight normal
                letter-spacing 0
                display flex
                position absolute
                top 36px
                left -54px
                .kind-list
                    width 54px
                    li
                        font-size 14px
                        border: 1px solid rgba(0, 0, 0, 0.3);
                        padding 20px 0
                        text-align center
                        color rgba(0, 0, 0, 0.3)
                        background rgba(0,0,0,0.3)
                        cursor pointer
                        &.selected
                            background #fff
                            color #333
                        .icon
                            font-size 25px
                            margin-bottom 4px

                .shop-list
                    width 220px
                    color #333
                    font-size 15px
                    background #fff
                    ul
                        border 1px solid #20bfa9
                    li
                        padding 16px 0
                        text-align center
                        border-bottom 1px dashed #e1e1e1
                        .icon
                            color #444
                            margin-right 8px
                            font-size 24px
                        &:hover
                            cursor pointer
                            color #20bfa9
                        &:last-child
                            border-bottom none
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
</style>
