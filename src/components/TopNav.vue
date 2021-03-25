<template>
    <div class="top-nav">
        <div class="wrap">
            <div class="top-left">
                <span>欢迎访问Q宠商城！</span>
            </div>
            
        <ul class="top-right">
            <li @click = "switchTo('/login')">登录</li>
            <li @click = "switchTo('/')">注册</li>
            <li @click = "switchTo('/me')">个人中心</li>
            <li @click = "switchTo('/shoppingcart')">购物车</li>
            <li @click = "switchTo('/manager')">管理员通道</li>
        </ul>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        switchTo(path){
            //console.log(this.$router)
            this.$router.replace(path);
        }
    }
}
</script>

<style lang="stylus" scoped>
.top-nav
    width 100%
    height 32px
    background #f5f5f5
    position relative
.wrap
    height inherit
    font-size 12px
    color #666
    display flex 
    justify-content space-between
    align-items center
    .top-right
        display flex
        li
            padding 0 16px
            &:hover
                cursor pointer
                color #20bfa9
      
</style>