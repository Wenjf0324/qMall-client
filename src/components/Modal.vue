<template>
  <transition name="slide">
    <div class="modal" v-show="showModal">
      <div class="mask">
        <div class="modal-dialog">
          <div class="modal-header">
            <span>{{ title }}</span>
            <a
              href="javascript:;"
              class="icon-close"
              v-on:click="$emit('cancel')"
            >
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-close"></use>
              </svg>
            </a>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <div class="modal-footer">
            <a
              href="javascript:;"
              class="btn"
              v-shows="btnType === 1"
              v-on:click="$emit('submit')"
              >{{ sureText }}</a
            >
            <a
              href="javascript:;"
              class="btn"
              v-show="btnType === 2"
              v-on:click="$emit('cancel')"
              >{{ cancelText }}</a
            >
            <div class="btn-group" v-show="btnType === 3">
              <a href="javascript:;" class="btn" v-on:click="$emit('submit')">{{
                sureText
              }}</a>
              <a
                href="javascript:;"
                class="btn btn-default"
                v-on:click="$emit('cancel')"
                >{{ cancelText }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "modal",
  props: {
    //弹框类型：小small、中middle、大large、表单form
    modalType: {
      type: String,
      default: "form"
    },
    //弹框标题
    title: String,
    //按钮类型：1.确定按钮 2.取消按钮 3.确定按钮
    btnType: String,
    sureText: {
      type: String,
      default: "确定"
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    showModal: Boolean
  }
};
</script>

<style lang="stylus">
@import '../assets/css/modal.styl';
    @import '../assets/css/button.styl'
</style>
