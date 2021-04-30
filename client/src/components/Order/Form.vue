<template>
  <div class="form">
    <div class="notes">
      <p>备注</p>
      <input
        type="text"
        @input="setInput($event,'notes')"
        :value="notes"
        placeholder="输入您想要的赠品颜色、尺码、款式等"
      />
    </div>
    <div class="address">
      <p>收货地址</p>
      <input type="text" @input="setInput($event,'name')" :value="name" placeholder="收货人" />
      <input type="number" @input="setInput($event,'phone')" :value="phone" placeholder="手机号" />
      <div
        class="area"
        @click="toggleCityStatus(true)"
      >{{region.province ? `${region.province+ ' ' +region.city+ ' ' +region.area}` : '所在地区'}}</div>
      <textarea
        @input="setInput($event,'address')"
        placeholder="详细地址：如道路、门牌号、小区、楼栋号、单元室等"
        :value="address"
      ></textarea>
    </div>
    <SelectCity :status="selectCityStatus" @close="toggleCityStatus" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import SelectCity from "./City.vue";
export default {
  name: "OrderForm",
  components: { SelectCity },
  data() {
    return {
      selectCityStatus: false
    };
  },
  computed: {
    ...mapState("order", ["notes", "name", "phone", "region", "address"])
  },
  methods: {
    setInput(e, key) {
      let { value } = e.target;
      this.$DC("order", { [key]: value });
    },
    toggleCityStatus(status) {
      this.selectCityStatus = status;
    }
  },
  mounted() {
    let { phone } = this.$ls.get("user");
    if (!this.phone && phone && phone.startsWith("+86"))
      this.$DC("order", { phone: phone.slice(3) });
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

input,
.area,
textarea {
  width: 100%;
  box-sizing: border-box;
  display: block;
  background: #f6faff;
  border-radius: 10px;
  font-size: 15px;
  margin: 8px 0;
  padding: 0 20px;
  height: 60px;
  color: #3d5072;
  &::placeholder {
    color: #93a6b9;
  }
}

.area {
  line-height: 60px;
  color: #93a6b9;
}

textarea {
  padding: 18px 20px;
  height: 84px;
  resize: none;
}
</style>