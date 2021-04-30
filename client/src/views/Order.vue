<template>
  <div class="order-page">
    <BackHeader name="支付" />
    <Info />
    <Form />
    <button class="confirm" @click="clickPay">确认并支付</button>
  </div>
</template>

<script>
import BackHeader from "@/components/BackHeader";
import { Form, Info } from "@/components/Order";
import { mapActions } from "vuex";

export default {
  name: "Order",
  components: { BackHeader, Info, Form },
  data() {
    return {
      colors: {
        black: "黑色",
        timer: null
      }
    };
  },
  methods: {
    async clickPay() {
      this.$DC({ loading: true, opacity: 0.5 });
      let data = await this.confirmOrder();
      if (!data) return this.$DC({ loading: false, opacity: 1 });
      if (data === "networkError")
        return this.$DC({ loading: false, opacity: 1 });
      if (data === "limited") {
        this.$message("请勿重复购买");
        this.$DC({ loading: false, opacity: 1 });
        return this.MoveTo("/orderDetail");
      }
      let memo = encodeURIComponent("购买 Mixin 限量T恤");
      let url = `https://mixin.one/pay?recipient=${process.env.VUE_APP_CLIENT_ID}&asset=${process.env.VUE_APP_ASSET_ID}&amount=0.1&memo=${memo}&trace=${data}`;
      window.location.href = url;
      this.timer = setInterval(async () => {
        let data = await this.checkPaid();
        if (data) {
          this.$DC({ loading: false, opacity: 1 });
          this.MoveTo("/orderDetail");
          clearInterval(this.timer);
        }
      }, 500);
    },
    ...mapActions("order", ["confirmOrder", "checkPaid"])
  },
  deactivated() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="scss" scoped>
.order-page {
  background-color: #edf2f8;
  overflow: auto;
}

.confirm {
  margin: 2.5rem auto;
}
</style>