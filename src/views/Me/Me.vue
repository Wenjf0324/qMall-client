<template>
  <div class="me-page">
    <!-- <user-header /> -->
    <order-header title="个人中心"> </order-header>
    <div class="container">
      <div class="me-box">
        <div class="aside">
          <div class="headshot">头像</div>
          <ul class="me-list">
            <li>我的资料</li>
            <li>编辑信息</li>
            <li>我的订单</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserHeader from "../../components/UserHeader.vue";
import OrderHeader from "../../components/OrderHeader";
export default {
  name: "Me",
  components: { UserHeader, OrderHeader }
};
</script>

<style lang="stylus" scoped>
.me-page
    width 100%
    height auto
    background #f5f5f5
    .container
      height inherit
</style>
