<template>
  <div :class="['info', finished && 'finished']">
    <img :src="`https://taskwall.zeromesh.net/t-shit-shop/${color}.jpg?t=2`" />
    <div class="name-color-size">
      <p class="name">{{name}}</p>
      <p class="color-size">{{colorSizeStyle}}</p>
    </div>
    <div class="price-amount">
      <p class="price">{{`${price} ${symbol}`}}</p>
      <p class="amount">X 1</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "OrderInfo",
  props: {
    finished: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState("product", [
      "name",
      "color",
      "size",
      "style",
      "price",
      "symbol",
      "colors"
    ]),
    colorSizeStyle() {
      let { color, size, colors, style } = this;
      return `${colors[color]}; ${size}; ${style}`;
    }
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.info {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 0 1.25rem 0 0.88rem;
  margin: 0.5rem 0.88rem;
  box-shadow: 0px 4px 20px rgba(196, 211, 225, 0.6);
  border-radius: 10px;
  height: 70px;

  img {
    width: 44px;
    margin-right: 1.25rem;
  }
}

.name-color-size {
  flex: 1;
}

.name {
  font-weight: 500;
}

.name,
.amount {
  color: #3d5072;
}
.price {
  color: #ee8336;
  font-weight: 900;
}
.name,
.price {
  font-size: 18px;
}

.color-size,
.amount {
  font-size: 14px;
}
.color-size {
  color: #93a6b9;
}

.price-amount {
  text-align: right;
}

.finished {
  position: relative;

  &::before {
    content: "已支付";
    position: absolute;
    background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA4NCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMjRDMCAxMC43NDUyIDEwLjc0NTIgMCAyNCAwSDg0VjE0Qzg0IDE5LjUyMjggNzkuNTIyOSAyNCA3NCAyNEgwWiIgZmlsbD0idXJsKCNwYWludDBfbGluZWFyKSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyIiB4MT0iNDIiIHkxPSIwIiB4Mj0iNDIiIHkyPSIyNCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjRUU4MzM2IiBzdG9wLW9wYWNpdHk9IjAuNDEiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRUU4MzM2Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==");
    bottom: 0;
    right: 0;
    width: 84px;
    height: 24px;
    color: #ffffff;
    font-size: 14px;
    line-height: 24px;

    text-align: center;
  }
  .amount {
    opacity: 0;
  }
}
</style>