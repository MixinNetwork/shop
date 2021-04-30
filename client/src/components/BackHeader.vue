<template>
  <header>
    <img v-if="back" @click="click_back" :src="require(`@/assets/img/back_${color}.png`)" />
    <span :class="[color,back ? '' : 'noback']">{{name}}</span>
  </header>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "black"
    },
    back: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    click_back() {
      this.$DC("slider");
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  height: 2.8125rem;
  padding-left: 0.625rem;
  img {
    width: 0.48125rem;
    height: 0.90625rem;
    margin-right: 0.3125rem;
    padding: 0.3125rem;
  }
  span {
    font-size: 1rem;
    color: #2f3032;
    font-weight: 500;
    &.white {
      color: #fff;
    }
  }
  .noback {
    margin-left: 1.25rem;
  }
}
</style>