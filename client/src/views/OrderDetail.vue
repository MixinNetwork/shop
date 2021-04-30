<template>
  <div class="detail-page">
    <BackHeader :back="hasBack" :name="$t('order.detail')" />

    <Info :finished="true" />

    <Detail />
  </div>
</template>

<script>
import BackHeader from "@/components/BackHeader";
import { Detail, Info } from "@/components/Order";
import { mapActions } from "vuex";
export default {
  name: "OrderDetail",
  data() {
    return {
      hasBack: true
    };
  },
  components: { BackHeader, Info, Detail },
  methods: {
    ...mapActions("order", ["checkPaid"]),
    ...mapActions("product", ["checkProduct"])
  },
  async mounted() {
    let { t } = this.$route.query;
    if (t == 1) this.hasBack = false;
    this.$DC({ themeColor: "#edf2f8" });
    let status = await this.checkPaid();
    if (!status) this.$router.push("/");
    await this.checkProduct();
  }
};
</script>

<style lang="scss" scoped>
.detail-page {
  background-color: #edf2f8;
  overflow: auto;
}
</style>