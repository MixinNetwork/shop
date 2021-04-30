<template>
  <div class="order-page">
    <BackHeader :name="$t('order.pay')" />
    <Info />
    <Form />
    <button class="confirm" @click="clickPay">{{$t('order.confirmPay')}}</button>
  </div>
</template>

<script>
import BackHeader from "@/components/BackHeader";
import { Form, Info } from "@/components/Order";
import { mapActions } from "vuex";

export default {
  name: "Order",
  components: { BackHeader, Info, Form },
  methods: {
    async clickPay() {
      this.$DC({ loading: true, opacity: 0.5 });
      let data = await this.confirmOrder();
      if (!data) return this.$DC({ loading: false, opacity: 1 });
      if (data === "networkError")
        return this.$DC({ loading: false, opacity: 1 });
      if (data === "limited") {
        this.$message(this.$t("order.repeat"));
        this.$DC({ loading: false, opacity: 1 });
        return this.MoveTo("/orderDetail");
      }
      let memo = encodeURIComponent(this.$t('order.buyMemo'));
      let url = `https://mixin.one/pay?recipient=${process.env.VUE_APP_CLIENT_ID}&asset=${process.env.VUE_APP_ASSET_ID}&amount=${process.env.VUE_APP_AMOUNT}&memo=${memo}&trace=${data}`;
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