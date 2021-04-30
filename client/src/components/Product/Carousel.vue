<template>
  <swiper
    :class="['carousel',mainPicIndex&&'', isFull && 'full']"
    ref="mySwiper"
    :options="swiperOptions"
  >
    <swiper-slide>
      <div class="swiper-zoom-container">
        <img
          :src="`https://taskwall.zeromesh.net/t-shit-shop/${sizeT.includes('女') && 'W' || ''}${colorT}.jpg?t=2`"
        />
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="swiper-zoom-container">
        <img
          :src="`https://taskwall.zeromesh.net/t-shit-shop/${sizeT.includes('女') && 'W' || ''}${colorT}Back${styleT === 'Bitcoin' ? 'Bitcoin' : ''}.jpg?t=2`"
        />
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="swiper-zoom-container">
        <img
          :src="`https://taskwall.zeromesh.net/t-shit-shop/${colorT === 'black' ? 'black' : 'other'}_info.jpg?t=3`"
        />
      </div>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { mapState } from "vuex";
import "swiper/css/swiper.css";
export default {
  name: "Carousel",
  props: {
    isFull: {
      type: Boolean,
      default: false
    },
    canZoom: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination"
        },
        zoom: this.canZoom,
        loop: true,
        on: {
          slideNextTransitionEnd: () => {
            this.$nextTick(() => {
              if (!this.canZoom) {
                this.$DC("product", {
                  mainPicIndex: this.swiper.activeIndex
                });
              }
            });
          },
          slidePrevTransitionEnd: () => {
            this.$nextTick(() => {
              if (!this.canZoom) {
                this.$DC("product", {
                  mainPicIndex: this.swiper.activeIndex
                });
              }
            });
          }
        }
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
    ...mapState("product", ["colorT", "sizeT", "styleT", "mainPicIndex"])
  },
  mounted() {
    this.swiper.slideTo(this.mainPicIndex, 0, false);
  }
};
</script>

<style lang="scss" scoped>
.carousel {
  overflow: hidden;
  border-radius: 16px;
  img {
    width: 100%;
    height: 100%;
  }
}

/deep/ .swiper-pagination {
  bottom: 15px;
  .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    border: 1px solid #d2d2d2;
    background: transparent;
    box-sizing: border-box;
    border-radius: 50%;
    margin-right: 4px;
    opacity: 1;
    &:last-child {
      margin-right: 0;
    }
  }
  .swiper-pagination-bullet-active {
    background: #d2d2d2;
  }
}

.full {
  overflow: visible;
  img {
    border-radius: 0;
  }
  /deep/ .swiper-pagination {
    bottom: -25px;
  }
}
</style>