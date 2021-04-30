<template>
  <div class="manager">
    <header>
      <span>订单</span>
      <div class="search">
        <input type="text" placeholder="搜索" v-model="keys" />
        <img src="@/assets/img/search.png" />
        <i v-if="keys.length>0" @click="keys=''">取消</i>
      </div>
    </header>

    <div class="btns">
      <button
        v-for="(value,key,index) of statusL"
        :key="index"
        :class="key === status ? 'active' :''"
        @click="clickStatus(key)"
      >{{value}}</button>
    </div>

    <ul class="list">
      <li class="item" v-for="(item, index) in list" :key="index">
        <div class="head">
          <p class="id">{{item.order_id}}</p>
          <template v-if="item.status==='paid'">
            <div class="actions">
              <button @click="clickEdit(item)">编辑</button>
              <button @click="clickShipping(item)">发货</button>
              <button @click="clickSendMessage(item)">发消息</button>
            </div>
          </template>
          <template v-else-if="item.status==='shipping'">
            <div class="actions">
              <button @click="clickShipping(item)">修改货号</button>
              <button @click="clickComplete(item.order_id)">已完成</button>
            </div>
          </template>
        </div>
        <div class="middle">
          <p>{{`${item.size};${colors[item.color]};${item.style} ${item.tracking ? ('物流：' + item.tracking) : ''}`}}</p>
          <p>{{item.created_at}};{{item.identity_number}}</p>
          <p>备注：{{item.notes}}</p>
        </div>
        <p
          class="foot"
          v-clipboard:copy="addressInfo(item)"
          　　v-clipboard:success="click_copy_succuess"
          　　v-clipboard:error="click_copy_error"
        >{{addressInfo(item)}}</p>
      </li>
    </ul>

    <Modal v-if="modal" :show="modal" :click_modal_close="true" @close="closeModal">
      <div :class="['modal-content', modalMode ? 'edit' : '']">
        <template v-if="modalMode==='shipping'">
          <input type="text" placeholder="请输入物流编号" v-model="tracking" />
          <button @click="clickConfirmTracking">确认</button>
        </template>
        <template v-else-if="modalMode==='edit'">
          <ul class="colors">
            <li
              v-for="(item, index) in options.colors"
              :key="index"
              :class="item === color ? 'active' : ''"
              @click="clickOptions('color',item)"
            >{{colors[item]}}</li>
          </ul>
          <ul class="sizes">
            <li
              v-for="(item, index) in options.sizes"
              :key="index"
              :class="item === size ? 'active' : ''"
              @click="clickOptions('size',item)"
            >{{item}}</li>
          </ul>
          <ul class="style sizes">
            <li
              v-for="(item, index) in options.style"
              :key="index"
              :class="item === style ? 'active' : ''"
              @click="clickOptions('style',item)"
            >{{item}}</li>
          </ul>
          <input class="notes" type="text" v-model="notes" />
          <button @click="clickConfirmOptions">确认</button>
        </template>
        <template v-else-if="modalMode==='sendMessage'">
          <input type="text" placeholder="请输入要发送的信息" v-model="message" />
          <button @click="clickConfirmSend">确认</button>
        </template>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal";
import { mapState } from "vuex";

export default {
  name: "Manager",
  components: { Modal },
  data() {
    return {
      modal: false,
      modalMode: "",
      keys: "",
      status: "paid",
      list: [],
      order_id: "",
      tracking: "",

      size: "",
      color: "",
      style: "",
      notes: "",

      identity_number: "",
      message: "",
      statusL: {
        paid: "待发货",
        shipping: "待收货",
        compelete: "已完成"
      }
    };
  },
  computed: {
    ...mapState("product", ["options", "colors"])
  },
  watch: {
    async keys(val) {
      if (val.length === 0) {
        updateOrderList.call(this);
      } else if (
        val.length === 15 ||
        (val.length >= 5 && /^[0-9]+$/g.test(val))
      ) {
        let t = await this.APIS.searchOrder(val);
        this.list = t && [t];
      }
    }
  },
  methods: {
    closeModal() {
      this.modal = false;
    },
    clickStatus(status) {
      this.status = status;
      updateOrderList.call(this);
    },
    clickShipping({ order_id, tracking }) {
      this.order_id = order_id;
      this.tracking = tracking;
      this.modalMode = "shipping";
      this.modal = true;
    },
    async clickComplete(order_id) {
      await updateOrder.call(this, order_id, "complete");
    },
    async clickConfirmTracking() {
      let { order_id, tracking } = this;
      await updateOrder.call(this, order_id, "shipping", tracking);
    },
    async clickEdit({ size, color, order_id, style, notes }) {
      this.style = style;
      this.notes = notes;
      this.order_id = order_id;
      this.size = size;
      this.color = color;
      this.modalMode = "edit";
      this.modal = true;
      debugger;
    },
    async clickSendMessage({ identity_number }) {
      this.identity_number = identity_number;
      this.modalMode = "sendMessage";
      this.modal = true;
    },
    async clickConfirmSend() {
      let { message, identity_number } = this;
      message = encodeURIComponent(message);
      let params = { identity_number, message };
      let status = await this.APIS.sendMessage(params);
      let msg = status ? "发送成功" : "发送失败";
      this.$message(msg);
      this.modalMode = "";
      this.modal = false;
    },
    async clickOptions(mode, value) {
      this[mode] = value;
    },
    async clickConfirmOptions() {
      let status = await updateOptions.call(this);
      await refreshPage.call(this, status);
    },
    addressInfo(item) {
      return `${item.name} ${item.phone} ${item.region} ${item.address}`;
    },
    click_copy_succuess() {
      this.$message("复制成功");
    },
    click_copy_error() {}
  },
  mounted() {
    updateOrderList.call(this);
  }
};

async function updateOptions() {
  let { order_id, size, color, style, notes } = this;
  return await this.APIS.updateOptions(order_id, size, color, style, notes);
}
async function updateOrder(order_id, status, tracking) {
  let _status = await this.APIS.updateOrder(order_id, status, tracking);
  await refreshPage.call(this, _status);
}
async function refreshPage(status) {
  let message = status ? "操作成功" : "操作失败";
  await updateOrderList.call(this);
  this.$message(message);
  this.modal = false;
}
async function updateOrderList() {
  this.list = await this.APIS.getAllOrder(this.status);
}
</script>

<style lang="scss" scoped>
.manager {
  background-color: #edf2f8;
  padding: 0 14px;
  box-sizing: border-box;
  font-size: 12px;
  overflow: auto;
}
header {
  display: flex;
  height: 60px;
  align-items: center;
}
.search {
  display: flex;
  align-items: center;
  position: relative;
  flex: 1;
  margin: 0 10px;

  input {
    padding: 0 30px;
    height: 26px;
    border-radius: 23px;
    flex: 1;
    color: #93a6b9;
  }

  img {
    position: absolute;
    width: 15px;
    height: 15px;
    left: 10px;
  }

  i {
    position: absolute;
    right: 10px;
    padding: 5px;
    font-style: normal;
    color: #3d5072;
    cursor: pointer;
  }
}

.btns {
  display: flex;
  margin-bottom: 1rem;

  button {
    margin-right: 1rem;
    color: #3d5072;
    background: linear-gradient(180deg, #ebf3fa 0%, #cedce9 100%);
  }

  .active {
    color: #fff;
    background: #3d5072;
  }
}

button {
  margin: 0;
  width: initial;
  padding: 0 10px;
  line-height: 20px;
  height: 20px;
  border-radius: 4px;
  font-size: 12px;
}

.item {
  // display: flex;
  // flex-direction: column;
  background: #f6faff;
  border-radius: 10px;
  margin-bottom: 8px;
  padding: 14px 20px;
}

.actions {
  display: flex;
  button {
    margin-right: 10px;
  }
}

p {
  color: #3d5072;
}

.head {
  display: flex;
  justify-content: space-between;
  button {
    background: #3d5072;
  }
}

.modal-content {
  width: 280px;
  height: 150px;
  padding-top: 20px;
  box-sizing: border-box;
  input {
    box-sizing: border-box;
    height: 60px;
    width: 100%;
    border: 1px solid #edf2f8;
    border-radius: 20px;
    padding-left: 20px;
  }
  button {
    margin-top: 10px;
    font-size: 15px;
    width: 100px;
    height: 30px;
    margin: 30px auto 0;
    background-color: #3d5072;
  }
}
.modal-content.edit {
  height: 250px;
}

.sizes,
.colors {
  display: flex;
  flex-wrap: wrap;
  li {
    padding: 10px;
    background-color: #eee;
    margin: 5px;
    border-radius: 5px;
    &.active {
      background-color: #3d5072;
      color: #fff;
    }
  }
}

.edit .notes {
  height: 45px;
}
</style>