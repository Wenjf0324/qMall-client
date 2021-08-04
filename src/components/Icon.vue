<template>
  <svg class="icon" aria-hidden="true" @click="$emit('click', $event)">
    <use :xlink:href="'#icon-' + name" />
  </svg>
</template>

<script>
export default {
  name: "Icon",
  props: {
    name: String
  }
};
</script>

<style lang="stylus" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
