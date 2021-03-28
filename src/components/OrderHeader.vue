<template>
  <div class="order-header">
    <div class="container">
      <Logo />
      <h1>{{ title }}</h1>
    </div>
  </div>
</template>

<script>
import Logo from "./Logo";
export default {
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
        h1
            height 50px
            font-size 28px
            line-height 50px
            color #333
            padding-left 24px
            border-left 1px solid #e1e1e1
            position absolute
            top 50%
            left 180px
            transform translateY(-50%)
</style>
