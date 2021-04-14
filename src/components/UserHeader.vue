<template>
  <div class="user-header">
    <div class="container">
      <h2>Q宠商城</h2>
      <h2>个人中心</h2>
      <ul class="right">
        <li @click="$router.replace('/home')">返回首页</li>
        <li class="signup" @click.stop="dealLogout">退出登录</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Message, MessageBox } from "element-ui";
import { mapActions } from "vuex";
export default {
  name: "user-header",
  methods: {
    ...mapActions(["logout"]),
    dealLogout() {
      MessageBox.confirm("已登录，确定要退出登录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(actions => {
        this.logout({});
        Message.success("退出登录成功！");
        this.$router.replace("/home");
      });
    }
  }
};
</script>

<style lang="stylus">
.user-header
    background #343A40
    color #b0b0b0
    .container
      height 50px
      line-height 50px
      display flex
      justify-content space-between
      .right
          display flex
          font-size 14px
          li
              margin-left 16px
              cursor pointer
              &:hover
                color #fff
              &.signup:hover
                color #f60
</style>
