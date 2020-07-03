<template>
  <div class="contain">
    <Head>订单中心</Head>
    <Tabs :list="list" backgroundColor="#8d5aa2" activeColor="#8d5aa2" @id="pid"></Tabs>
    <!-- <div class="tab"> -->
    <component :is="name"></component>
    <!-- <van-tabs v-model="active" line-height="5px" title-active-color="#8e5aa2">
        <van-tab title="未支付">
          <div class="signal">
            <i class="iconfont icon-no-signal"></i>
            <p>无网络连接, 请检查您的网络 . . .</p>
            <button>重试</button>
          </div>
        </van-tab>
        <van-tab title="已支付">
          <div class="signal">
            <i class="iconfont icon-no-signal"></i>
            <p>无网络连接, 请检查您的网络 . . .</p>
            <button>重试</button>
          </div>
        </van-tab>
        <van-tab title="已完成">
          <div class="signal">
            <i class="iconfont icon-no-signal"></i>
            <p>无网络连接, 请检查您的网络 . . .</p>
            <button>重试</button>
          </div>
        </van-tab>
        <van-tab title="待评价">
          <div class="signal">
            <i class="iconfont icon-no-signal"></i>
            <p>无网络连接, 请检查您的网络 . . .</p>
            <button>重试</button>
          </div>
        </van-tab>
        <van-tab title="已取消">
          <div class="signal">
            <i class="iconfont icon-no-signal"></i>
            <p>无网络连接, 请检查您的网络 . . .</p>
            <button>重试</button>
          </div>
        </van-tab>
    </van-tabs>-->
    <!-- </div> -->

    <!-- banner -->
  </div>
</template>
<script>
/*eslint-disable*/

import Head from "../../components/Header";
import Tabs from "../../components/Tabs";

import Wpay from "./Wpay";
import Ypay from "./Ypay";
import Finish from "./Finish";
import Dcommnet from "./Dcommnet";
import Cancel from "./Cancel";
export default {
  data() {
    return {
      // active: 0,
      list: ["未支付", "已支付", "已完成", "待评价", "已取消"],
      id: ""
    };
  },
  components: {
    Head,
    Tabs
  },
  methods: {
    pid(index) {
      this.id = index;
    }
  },
  computed: {
    name() {
      let name;

      if (this.id === 0) name = Wpay;
      else if (this.id === 1) name = Ypay;
      else if (this.id === 2) name = Dcommnet;
      else if (this.id === 3) name = Ypay;
      else name = Cancel;

      return name;
    }
  }
};
</script>
<style lang="less" scoped>
@desgin: 750;
@base: 75rem;
.contain {
  width: 100%;
  height: 100%;
}
.active {
  color: #8e5aa2;
}
.header {
  height: 154 / @base;
  width: 100%;
  padding: 0 100 / @base;
  position: relative;
  font-size: 44 / @base;
  border-bottom: 1 / @base solid #ccc;
  .top {
    height: 154 / @base;
    width: 100%;
    line-height: 154 / @base;
    text-align: center;
    color: #8d5aa2;

    i {
      float: left;
      font-size: 44 / @base;
    }
  }
}

// .tab /deep/ .van-tab {
//   font-size: 40 / @base;
// }
// .tab /deep/ .van-tabs__wrap--scrollable .van-tab {
//   flex: 1;
//   line-height: 100 / @base;
// }
// .tab /deep/ .van-tabs__wrap--scrollable {
//   height: 100 / @base;
// }
// .tab /deep/ .van-tabs__line {
//   background-color: #8e5aa2;
// }

// .tab {
//   .signal {
//     padding-top: 300 / @base;
//     text-align: center;
//     i {
//       font-size: 200 / @base;
//       color: #7d7e80;
//     }
//     button {
//       width: 100 / @base;
//       height: 45 / @base;
//     }
//   }
// }
</style>


