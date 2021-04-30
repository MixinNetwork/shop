<template>
  <Modal
    class="modal"
    :show="noticeModal"
  >
    <ul>
      <li
        v-for="(item, idx) in $t('product.ps')"
        :key="idx"
      >{{item}}</li>
    </ul>
    <button @click="moveToOrder">{{$t('product.confirm')}}</button>
    <button @click="closeModal">{{$t('product.cancel')}}</button>
  </Modal>
</template>

<script>
import { mapState } from "vuex";
import Modal from "@/components/Modal";
export default {
  name: "NoticeModal",
  components: { Modal },
  computed: {
    ...mapState("product", ["noticeModal"]),
  },
  methods: {
    moveToOrder() {
      this.MoveTo("/order");
      this.closeModal();
    },
    closeModal() {
      this.$DC("product", { noticeModal: false });
    },
  },
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