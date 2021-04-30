<template>
  <div class="selection">
    <div class="color">
      <p>{{$t('product.color')}}</p>
      <div class="color-list">
        <img
          v-for="(item, index) in options.colors"
          :class="item===colorT && 'active'"
          @click="clickSelect('color',item)"
          :key="index"
          :src="`https://taskwall.zeromesh.net/t-shit-shop/${size.includes('女') && 'W' || ''}${item}.jpg?t=2`"
        />
      </div>
    </div>
    <div class="size">
      <p>{{$t('product.size')}}</p>
      <ul class="size-list">
        <li
          v-for="(item, index) in options.sizes"
          :class="item===sizeT && 'active'"
          @click="clickSelect('size',item)"
          :key="index"
        >{{item}}</li>
      </ul>
    </div>
    <div class="style">
      <p>{{$t('product.style')}}</p>
      <ul class="size-list">
        <li
          v-for="(item, index) in options.style"
          :class="item===styleT && 'active'"
          @click="clickSelect('style',item)"
          :key="index"
        >{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ProductInfo",
  computed: {
    ...mapState("product", [
      "color",
      "colorT",
      "size",
      "sizeT",
      "style",
      "styleT",
      "options",
      "status"
    ]),
    ...mapState("user", ["user_info"])
  },
  methods: {
    clickSelect(mode, modeName) {
      let obj = { [mode + "T"]: modeName };
      if (this.status === "ok") obj[mode] = modeName;
      this.$DC("product", obj);
    }
  },
  mounted() {
    this.$DC("product", { colorT: this.color, sizeT: this.size });
  }
};
</script>

<style lang="scss" scoped>
.selection {
  padding-left: 20px;
  margin-top: 25px;
}

p {
  margin: 1.25rem 0 0.5rem 0;
  color: #3d5072;
}

.color {
  margin-right: 20px;
}

.color-list {
  display: flex;
  justify-content: space-between;
  img {
    width: 56px;
    height: 56px;
    border-radius: 4px;
    border: 1px solid transparent;
    transition: all 0.3s;

    &.active {
      border: 1px solid #93a6b9;
      box-shadow: 0px 4px 4px #c4d3e1;
      border-radius: 4px;
    }
  }

  @media screen AND (max-width: 359px) {
    img {
      width: 50px;
      height: 50px;
    }
  }
}

.size-list {
  display: flex;
  flex-wrap: wrap;

  li {
    margin-right: 10px;
    margin-bottom: 10px;
    font-size: 14px;
    padding: 0 10px;
    line-height: 30px;
    text-align: center;
    background: linear-gradient(180deg, #ebf3fa 0%, #cedce9 100%);
    border-radius: 4px;
    transition: all 0.3s;

    &:last-child {
      margin-right: 0;
    }

    &.active {
      background: #3d5072;
      color: #fff;
    }
  }
}

.style {
  margin-bottom: 80px;
  p {
    margin-top: 10px;
  }
}
</style>