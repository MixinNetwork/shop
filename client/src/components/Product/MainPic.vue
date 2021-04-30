<template>
  <div :class="zoomMode && 'zoom-mode'">
    <div v-show="zoomMode" @click.stop="toggleZoomMode(false)" class="zoom" v-if="zoomMode">
      <p>{{$t('product.img')}}</p>
      <Carousel class="full-carousel" :isFull="true" :canZoom="true" />
    </div>
    <div v-show="!zoomMode" class="main-picture" @click="toggleZoomMode(null)">
      <Carousel />
      <img class="sticker-bg" src="@/assets/img/t-shit/sticker.svg" />
      <i class="sticker">{{$t('product.sticker')}}</i>
      <ul class="dot-list">
        <li class="dot active"></li>
        <li class="dot"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Carousel from "./Carousel";
export default {
  name: "MainPicture",
  components: { Carousel },
  computed: {
    ...mapState("product", ["zoomMode"])
  },
  methods: {
    toggleZoomMode(mode) {
      let zoomMode = mode === null ? !this.zoomMode : mode;
      let color = zoomMode ? "#000" : "#edf2f8";
      this.$DC({ themeColor: color });
      this.$DC("product", { zoomMode });
    }
  }
};
</script>

<style lang="scss" scoped>
.main-picture {
  margin: 14px;
  padding: 8px;
  background: #edf2f8;
  box-shadow: 0px 4px 20px rgba(196, 211, 225, 0.6);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
}

.sticker-bg {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  width: 73px;
  height: 73px;
  z-index: 10;
}
.sticker {
  position: absolute;
  top: 1.4rem;
  right: 1rem;
  font-size: 14px;
  color: #fff;
  font-style: normal;
  transform: rotate(45deg);
  transform-origin: bottom;
  z-index: 10;
}

.zoom {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #000;
  z-index: 11;
  p {
    color: #fff;
    line-height: 45px;
    margin-left: 60px;
  }
}

.zoom-mode {
  .full-carousel {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
  img {
    border-radius: 0;
  }
}
</style>