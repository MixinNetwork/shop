<template>
  <Modal class="modal" :show="noticeModal">
    <ul>
      <li>限量商品，每个 Mixin ID 限购一次，请在备注填写赠品颜色、号码</li>
      <li>非质量问题不退不换</li>
      <li>如需客服支持，请直接给机器人留言</li>
      <li>本活动最终解释权归 Mixin 团队</li>
    </ul>
    <button @click="moveToOrder">同意并继续</button>
    <button @click="closeModal">再想想</button>
  </Modal>
</template>

<script>
import { mapState } from "vuex";
import Modal from "@/components/Modal";
export default {
  name: "NoticeModal",
  components: { Modal },
  computed: {
    ...mapState("product", ["noticeModal"])
  },
  methods: {
    moveToOrder() {
      this.MoveTo("/order");
      this.closeModal();
    },
    closeModal() {
      this.$DC("product", { noticeModal: false });
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  ul {
    padding: 10px 0 0 20px;
    margin-bottom: 14px;
  }
  li {
    width: 240px;
    list-style: decimal;
    font-size: 14px;
    line-height: 24px;
    color: #3d5072;
  }
  button {
    width: 160px;
    height: 44px;
    margin-bottom: 14px;
    font-size: 1rem;
    &:nth-child(3) {
      background: #3d5072;
      margin-bottom: 5px;
    }
  }
}
</style>