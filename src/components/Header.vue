<template>
  <div class="header">
    <Logo />
    <div class="search">
      <form action="">
        <input type="text" placeholder="请输入关键字" />
        <button>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-search"></use>
          </svg>
        </button>
      </form>
      <ul>
        <li></li>
      </ul>
    </div>

    <div class="cart">
      <router-link to="/shoppingcart">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gouwuche"></use>
        </svg>
        购物车(<span>0</span>)
      </router-link>
    </div>
  </div>
</template>

<script>
import Logo from "./Logo";
export default {
  components: {
    Logo
  }
};
</script>

<style lang="stylus" scoped>
.header
        width 1190px
        height 100px
        margin 0 auto
        position relative

        margin-bottom 10px
        .search
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            form
                border 2px solid #20bfa9
                border-radius: 2px;
                width: 500px;
                display: flex;
                input
                    width 100%
                    border none
                    padding-left 10px
                    &:focus
                        outline none
                button
                    border 1px solid #20bfa9
                    outline 1px solid #20bfa9
                    background #20bfa9
                    color #fff
                    padding 8px 16px
                    font-size 14px
                    .icon
                        font-size 18px
                    &:hover
                        cursor pointer
        .cart
            font-size: 14px;
            color: #666;
            padding: 8px 16px;
            border: 1px solid #e1e1e1;
            position: absolute;
            right: 8px;
            top: 50%;
            transform: translateY(-50%);
            .icon
                font-size 24px
            span
                color red
            &:hover
                cursor pointer
</style>
