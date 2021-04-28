<template>
  <div>
    <div class="nav-box">
      <div class="wrap">
        <div class="nav-left">
          <div
            class="category"
            @mouseenter="showMenu(true)"
            @mouseleave="showMenu(false)"
          >
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-menu"></use>
            </svg>
            <span>商品分类</span>

            <div
              class="menu-container"
              :class="{ isvisible: show_menu === true }"
            >
              <div class="menu">
                <div class="pet-list">
                  <ul>
                    <li
                      v-for="(p, index) in petList"
                      :key="index"
                      :class="{ selected: index === currentIndex }"
                      @click="currentIndex = index"
                    >
                      <router-link to="">
                        <svg class="icon" aria-hidden="true">
                          <use :xlink:href="p.icon"></use>
                        </svg>
                        <p>{{ p.name }}</p>
                      </router-link>
                    </li>
                  </ul>
                </div>
                <div class="shop-list">
                  <ul
                    v-for="(item, index) in menuList"
                    :key="index"
                    v-show="currentIndex === index"
                  >
                    <li
                      v-for="(p, i) in item.menu"
                      :key="i"
                      @click="switchTo(p.path)"
                    >
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
      show_menu: false,
      petList: [
        { name: "狗狗", icon: "#icon-gougou" },
        { name: "猫咪", icon: "#icon-maomi" }
      ],
      menuList: [
        {
          menu: [
            { name: "狗狗主粮", icon: "#icon-zhushi", path: "/dog/food" },
            { name: "狗狗零食", icon: "#icon-lingshi1", path: "/dog/snacks" },
            { name: "狗狗日用", icon: "#icon-riyong", path: "/dog/daily" },
            { name: "狗狗医疗", icon: "#icon-yiliao", path: "/dog/health" },
            { name: "狗狗玩具", icon: "#icon-wanju", path: "/dog/toy" }
          ]
        },
        {
          menu: [
            { name: "猫咪主粮", icon: "#icon-zhushi", path: "/cat/food" },
            { name: "猫咪零食", icon: "#icon-lingshi1", path: "/cat/snacks" },
            { name: "猫咪日用", icon: "#icon-riyong", path: "/cat/daily" },
            { name: "猫咪医疗", icon: "#icon-yiliao", path: "/cat/health" },
            { name: "猫咪玩具", icon: "#icon-wanju", path: "/cat/toy" }
          ]
        }
      ]
    };
  },
  methods: {
    switchTo(path) {
      //console.log(this.$router)
      this.$router.replace(path);
      this.showMenu(false);
    },
    showMenu(flag) {
      this.show_menu = flag;
    }
  }
};
</script>

<style lang="stylus">
.nav-box
    border-bottom 2px solid #20bfa9
    z-index 20
    .wrap
        display flex
    .nav-left
        width 220px
        .category
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
            cursor pointer
            .icon
              font-size 24px
              margin-right 8px
            .menu-container
              overflow hidden
              position absolute
              top 36px
              left -55px
              height 0
              opacity 0
              transition all 250ms
              z-index 20
              &.isvisible
                opacity 1
                height 300px
              .menu
                  font-weight normal
                  letter-spacing 0
                  display flex
                  height 100%
                  .pet-list
                      width 54px
                      li
                          font-size 13px
                          border 1px solid #e1e1e1
                          padding 8px 0
                          text-align center
                          color rgba(0, 0, 0, 0.3)
                          background #e1e1e1
                          cursor pointer
                          &.selected
                              background #fff
                              color #333
                          .icon
                              font-size 25px
                              margin 0 0 4px 2px

                  .shop-list
                      width 220px
                      height 100%
                      color #333
                      font-size 15px
                      background #fff
                      ul
                          height inherit
                          border 1px solid #20bfa9
                          display flex
                          flex-wrap wrap
                          justify-content center
                      li
                          text-align center
                          border-bottom 1px dashed #e1e1e1
                          width 100%
                          display flex
                          justify-content center
                          align-items center
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
