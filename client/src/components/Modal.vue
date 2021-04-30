<template>
  <div class="modal">
    <div @click.self="close_modal" class="mask">
      <transition name="fade-up">
        <div v-if="show" class="main">
          <slot></slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    click_modal_close: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close_modal() {
      if (this.click_modal_close) this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 999;
  bottom: 0;
  user-select: none;
}
.mask {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
}
.main {
  border-radius: 16px;
  padding: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  overflow: auto;
}
.fade-up-enter-active,
.fade-up-leave-active {
  transition: margin 0.3s, opacity 0.3s;
}
.fade-up-enter {
  margin-top: -20px;
  opacity: 0;
}
.fade-up-leave-to {
  margin-top: 20px;
  opacity: 0;
}
</style>