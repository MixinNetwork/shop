<template>
  <div class="form">
    <div class="notes">
      <p>备注</p>
      <div class="content">{{notes}}</div>
    </div>
    <div class="address">
      <p>收货地址</p>
      <div class="content">
        {{`${name} ${phone}`}}
        <br />
        {{`${region.province} ${region.city} ${region.area} ${address}`}}
      </div>
    </div>
    <div class="order">
      <p>订单信息</p>
      <div class="content">
        <span class="copy">
          {{'订单编号：' + orderInfo.order_id}}
          <i
            v-clipboard:copy="orderInfo.order_id"
            　　v-clipboard:success="click_copy_succuess"
            　　v-clipboard:error="click_copy_error"
          >复制</i>
        </span>
        {{'订单状态：' + $t('product.button.' + orderInfo.status)}}
        <br />
        <span class="copy">
          {{'物流编号：' + (orderInfo.tracking || '暂无')}}
          <i
            v-if="orderInfo.tracking"
            v-clipboard:copy="orderInfo.tracking"
            　　v-clipboard:success="click_copy_succuess"
            　　v-clipboard:error="click_copy_error"
          >复制</i>
        </span>
        {{'创建时间：' + orderInfo.created_at}}
      </div>
    </div>
    <ul class="ps">
      <li>物流默认顺丰，运输状态请复制物流编号后自行查询。</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "OrderForm",
  data() {
    return {
      selectCityStatus: false
    };
  },
  computed: {
    ...mapState("order", [
      "notes",
      "name",
      "phone",
      "region",
      "address",
      "orderInfo"
    ])
  },
  methods: {
    setInput(e, key) {
      let { value } = e.target;
      this.$DC("order", { [key]: value });
    },
    toggleCityStatus(status) {
      this.selectCityStatus = status;
    },
    click_copy_succuess(e) {
      this.$message("复制成功");
    },
    click_copy_error(e) {},
    ...mapActions("order", ["mock"])
  }
};
</script>

<style lang="scss" scoped>
.form {
  padding: 0 0.88rem;
}

p {
  margin: 1.5rem 0 0 0.4rem;
  color: #3d5072;
}

.content {
  box-sizing: border-box;
  width: 100%;
  display: block;
  background: #f6faff;
  border-radius: 10px;
  font-size: 15px;
  line-height: 24px;
  margin: 8px 0;
  padding: 20px;
  color: #3d5072;
}

.copy {
  display: flex;
  justify-content: space-between;
  i {
    font-style: normal;
    font-size: 14px;
    color: #ee8336;
  }
}

.ps {
  font-size: 12px;
  padding: 0 38px 0 20px;
  li {
    list-style: decimal;
    color: #93a6b9;
    line-height: 19px;
    margin-bottom: 10px;
  }
  margin-bottom: 20px;
}
</style>