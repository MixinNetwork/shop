<template>
  <div :class="['product',zoomMode && 'zoom']">
    <div class="content">
      <header>
        <img :src="user_info.avatar_url" @click="clickAvatar" alt />
        <span>Mixin T 恤</span>
      </header>

      <section>
        <MainPic />
        <Info />
      </section>
    </div>

    <Modal v-if="noticeModal" />

    <FixBtn v-if="!zoomMode" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { MainPic, Info } from "@/components/Product";
import Modal from "@/components/Product/NoticeModal";

import FixBtn from "@/components/Product/FixBtn";
export default {
  name: "Product",
  components: { MainPic, Info, Modal, FixBtn },
  computed: {
    ...mapState("product", ["zoomMode", "status", "noticeModal"]),
    ...mapState("user", ["user_info"])
  },
  methods: {
    clickAvatar() {
      if (this.status !== "ok") this.MoveTo("/orderDetail");
    },
    ...mapActions("product", ["checkProduct"])
  },
  mounted() {
    this.$DC({ themeColor: "#edf2f8" });
    if (!this.$ls.get("token")) {
      this.$DC({ loading: true });
      return this.$bus.toAuth();
    }
    this.checkProduct();
  }
};
</script>


<style lang="scss" scoped>
.product {
  background-color: #edf2f8;
  overflow: visible;
  &.zoom {
    overflow: hidden;
  }
}

.content {
  width: 100%;
  height: 100vh;
  overflow: auto;
}

header {
  height: 45px;
  display: flex;
  align-items: center;
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;

    margin: 0 10px 0 14px;
  }
}

</style>