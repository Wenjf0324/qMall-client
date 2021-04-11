<template>
  <div class="user-header">
    <h2>Q宠商城</h2>
    <h2>个人中心</h2>
    <ul class="right">
      <li>返回首页</li>
      <li>退出登录</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "user-header"
};
</script>

<style lang="stylus">
.user-header
    background #333
    color #b0b0b0
    height 50px
    line-height 50px
    display flex
    justify-content space-between
    border 1px solid red
    padding 0 24px
    .right
        display flex
        font-size 14px
        li
            margin-left 16px
</style>
