<template>
  <div class="city" v-if="status">
    <BottomModal :close="close_modal" @close="$emit('close', false)" :show="status">
      <div class="country-main">
        <p class="header">请选择</p>
        <i class="close" @click="close"></i>

        <template v-if="!region.province">
          <div class="title">热门城市</div>
          <ul class="hot-city">
            <li
              v-for="(item, index) in Object.keys(hostCity)"
              :key="index"
              @click="clickHostCity(item)"
            >{{item}}</li>
          </ul>
        </template>
        <template v-else>
          <div class="process">
            <i class="bar">
              <i
                class="dot"
                v-for="(key, value,index ) of region"
                :key="index"
                :class="!key && 'no'"
              ></i>
            </i>
            <p
              v-for="(key, value,index ) of region"
              :key="index"
              :class="!key && 'no'"
              @click="clickProcess(key,index)"
            >{{key || '请' + title[index]}}</p>
          </div>
        </template>

        <div class="title">{{title[activeIdx]}}</div>
        <ul class="province">
          <li v-for="(item, index) in currentSelect" :key="index" @click="setRegion(item)">{{item}}</li>
        </ul>
      </div>
    </BottomModal>
  </div>
</template>

<script>
import city from "./city";
import BottomModal from "@/components/BottomModal";
import { mapState } from "vuex";
export default {
  name: "CitySelect",
  props: {
    status: {
      type: Boolean,
      default: false
    }
  },
  components: { BottomModal },
  data() {
    return {
      city: city.city,
      hostCity: city.hostCity,
      close_modal: 0,
      title: ["选择省份", "选择城市", "选择地区"],
      activeIdx: 0
    };
  },
  computed: {
    ...mapState("order", ["region"]),
    currentSelect() {
      let { province, city, area } = this.region;
      if (city) {
        this.activeIdx = 2;
        return this.city[province][city];
      }
      if (province) {
        this.activeIdx = 1;
        return Object.keys(this.city[province]);
      }
      this.activeIdx = 0;
      return Object.keys(this.city);
    }
  },
  methods: {
    setRegion(value) {
      let region = JSON.parse(JSON.stringify(this.region));
      let { province, city, area } = region;
      if (!province) {
        region.province = value;
      } else if (!city) {
        region.city = value;
      } else {
        region.area = value;
        this.close();
      }
      this.$DC("order", { region });
    },
    clickHostCity(item) {
      let [province, city] = this.hostCity[item];
      let region = { province, city, area: "" };
      this.$DC("order", { region });
    },
    clickProcess(key, index) {
      if (!key) return;
      let region;
      if (index === 0) region = { province: "", city: "", area: "" };
      let { province, city, area } = this.region;
      if (index === 1) region = { province, city: "", area: "" };
      if (index === 2) region = { province, city, area: "" };
      this.$DC("order", { region });
    },
    close() {
      this.close_modal++;
      setTimeout(() => {
        this.$emit("close", false);
      }, 300);
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .--modal {
  .modal-show {
    top: 100px;
  }
}
.country-main {
  position: relative;
  height: 100%;
  overflow: auto;
}

.header {
  text-align: center;
  font-size: 0.75rem;
  margin: 0.88rem 0 1.25rem 0;
  color: #1e1e1e;
}
.close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 1rem;
  height: 1rem;
  padding: 4px;

  &::after,
  &::before {
    content: "";
    position: absolute;
    width: 1rem;
    height: 2px;
    background-color: #93a6b9;
    border-radius: 2px;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
}

.title {
  background: #f6faff;
  text-align: center;
  font-size: 0.88rem;
  line-height: 24px;
  color: #93a6b9;
}

.hot-city {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  li {
    width: 60px;
    line-height: 30px;
    margin-bottom: 10px;
    background: #edf2f8;
    border-radius: 15px;
    margin-right: 6px;
    text-align: center;
  }
}

.process {
  margin-bottom: 20px;
  position: relative;
  .bar {
    position: absolute;
    top: 16px;
    left: 24px;
    width: 1px;
    height: 66px;
    background: #ee8336;
  }
  .dot {
    position: absolute;
    left: 0;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ee8336;

    &:nth-child(1) {
      transform: translate(-50%, -50%);
      top: 0;
    }

    &:nth-child(2) {
      top: 50%;
      transform: translate(-50%, -50%);
    }

    &:nth-child(3) {
      transform: translate(-50%, 50%);
      bottom: 0;
    }

    &.no {
      box-sizing: border-box;
      background: #ffffff;
      border: 0.4px solid #ee8336;
    }
  }

  p {
    padding-left: 50px;
    color: #3d5072;
    line-height: 32px;
    &.no {
      color: #ee8336;
    }
  }
}

.province {
  color: #3d5072;
  li {
    padding-left: 50px;
    line-height: 54px;
  }
}
</style>