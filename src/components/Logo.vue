<template>
  <div>
    <router-link to="/">
      <div class="logo">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-petshop"></use>
        </svg>
        <div class="logoName">
          <p>Q宠</p>
          <p>PetShop</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style lang="stylus" scoped>
.logo
    color #1a9787
    margin-left 8px
    position absolute
    top 50%
    left 0
    transform translateY(-50%)
    display flex
    align-items flex-start
    .icon
        font-size 56px
    .logoName
        margin-top 4px
        font-weight bold
        p
            &:first-child
                font-size 40px
            &:last-child
                letter-spacing 1px
</style>
