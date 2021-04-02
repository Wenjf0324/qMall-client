<template>
  <div class="order-page">
    <order-header :title="title">
      <template v-slot:tip>
        <span>{{ tip }}</span>
      </template>
    </order-header>
    <router-view></router-view>
    <order-footer />
  </div>
</template>

<script>
import OrderHeader from "../../components/OrderHeader";
import OrderFooter from "../../components/OrderFooter";
export default {
  name: "order",
  data() {
    return {
      title: "", //页面标题
      tip: "" //页面提示
    };
  },
  components: {
    OrderHeader,
    OrderFooter
  },
  mounted() {
    //当前页面的路由地址
    let path = this.$route.path;
    if (path === "/order/confirm") {
      //订单确认
      this.title = "订单确认";
      this.tip = "请认真填写收获地址";
    } else if (path === "/order/list") {
      //订单列表
      this.title = "订单列表";
      this.tip = "请谨防钓鱼链接或诈骗电话";
    } else if (path === "/order/pay") {
      //订单支付
      this.title = "订单支付";
      this.tip = "请谨防钓鱼链接或诈骗电话";
    }
  }
};
</script>

<style lang="stylus">
.order-page
  width 100%
  height auto
  background #f5f5f5
</style>
