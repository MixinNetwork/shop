<template>
  <div class="fixed-button">
    <span>{{product.price}} {{product.symbol}}</span>
    <button
      :class="['confirm', btnColor]"
      @click="clickMainBtn"
    >{{$t('product.button.' + status)}}</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Pay",
  computed: {
    ...mapState("product", ["status"]),
    btnColor() {
      switch (this.status) {
        case "ok":
          return "";
        case "finished":
          return "not";
        default:
          return "process";
      }
    },
  },
  methods: {
    clickMainBtn() {
      if (this.status === "ok") this.$DC("product", { noticeModal: true });
      else this.MoveTo("/orderDetail");
    },
  },
};
</script>

<style lang="scss" scoped>
.fixed-button {
  position: fixed;
  bottom: 0;
  height: 60px;
  left: 0;
  right: 0;
  padding: 0 20px;
  background: #edf2f8;
  box-shadow: 0px -1px 2px #dfe8f0;

  display: flex;
  align-items: center;
  justify-content: space-between;
}
span {
  font-size: 24px;
  font-weight: 700;
  color: #ee8336;
}

.confirm {
  margin: 0;
  height: 40px;
  width: 150px;
  &.not {
    background: #cacaca;
  }
  &.process {
    background: #18a0fb;
  }
}
</style>