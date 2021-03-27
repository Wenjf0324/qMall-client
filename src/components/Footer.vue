<template>
  <div class="footer">
    <div class="container">
      <div class="service-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zhengpin"></use>
        </svg>
        <h3>正品保障</h3>
      </div>
      <div class="service-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-pinlei"></use>
        </svg>
        <h3>品类丰富</h3>
      </div>
      <div class="service-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fuwu"></use>
        </svg>
        <h3>优质服务</h3>
      </div>
      <div class="service-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-kexue"></use>
        </svg>
        <h3>科学养宠</h3>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
.footer
  background #f5f5f5
  width 100%
  .container
    height 80px
    display flex
    justify-content center
    align-items center
    .service-item
      font-weight bold
      color #333
      display flex
      border-right 1px solid #ccc
      padding 0 80px
      &:last-child
        border-right none
      .icon
        font-size 26px
        margin-right 4px
      h3
        font-size 21px
        margin-top 2px
</style>
