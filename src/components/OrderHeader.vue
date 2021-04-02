<template>
  <div class="order-header">
    <div class="container">
      <Logo />
      <div class="title">
        <h1>{{ title }}</h1>
        <slot name="tip"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "./Logo";
export default {
  name: "order-header",
  components: {
    Logo
  },
  props: {
    title: String
  }
};
</script>

<style lang="stylus">
.order-header
    height 100px
    background #fff
    border-bottom 2px solid #20bfa9
    .container
        height inherit
        position relative
        .title
            height 50px
            line-height 50px
            color #333
            padding-left 24px
            border-left 1px solid #e1e1e1
            position absolute
            top 50%
            left 180px
            transform translateY(-50%)
            h1
              font-size 28px
              display inline-block
            span
              font-size 14px
              margin-left 17px
              color #999
              font-weight 200
</style>
