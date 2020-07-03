<template>
  <div>
    <header>
      <Return>支付</Return>
    </header>
    <div class="bu"></div>
    <!-- 金额 -->
    <div class="jine">
      <span class="jine_left">金额</span>
      <span class="jine_right">¥{{price}}</span>
    </div>
    <div class="hui"></div>
    <div class="hang" @click="sel_active(index)" v-for="(item,index) in typeinfo" :key="index">
      <div class="hang_left">
        <img :src="item.img" alt />
        <span>{{item.name}}</span>
      </div>
      <img v-if="active === index" class="active" src="../../../assets/images/对号.png" alt />
      <div v-else class="hang_right"></div>
    </div>
    <p class="sheng">剩余支付时间</p>
    <van-count-down @finish='finish' :time="30 * 60 * 1000" />
    <div class="fukuan" @click="payfor()">付款</div>
  </div>
</template>

<script>
import { Icon, CountDown, Popup ,Toast} from "vant";
import Return from "../../../components/Return";
export default {
  components: {
    Return
  },
  data() {
    return {
      active: 0,
      typeinfo: [
        // {name:'余额',img:require('../../../assets/images/order_1.png')},
        { name: "微信", img: require("../../../assets/images/order_2.png") },
        { name: "支付宝", img: require("../../../assets/images/order_3.png") }
      ],
      orderid: "",
      price: ""
    };
  },
  methods: {
    finish(){
      Toast('订单关闭,如要支付请重新')
    },
    sel_active(index) {
      this.active = index;
    },
    payfor() {
      console.log(this.orderid);
      var type;
      if (this.active === 0) {
        type = 2;
      } else {
        type = 1;
      }
      console.log(type);
      var params = {
        type: type,
        orderid: this.orderid,
      };
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        window.android.ToPay(type,this.orderid);
      } else if (isiOS) {
        this.$bridge.callhandler("ToPay", params, data => {});
      }
    }
  },
  mounted() {
    this.orderid = this.$route.query.OrderId;
    this.price = this.$route.query.TotalPrice;
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
.van-count-down {
  color: #b695e9;
  margin: 22 / @base auto 0 auto;
  text-align: center;
}
header {
  background: #e2d2ff;
  width: 100%;
  text-align: center;
  position: fixed;
  top: 0;
  border-bottom: 1px solid #e6e6e6;
  z-index: 100;
}
.bu {
  width: 100%;
  height: 102 / @base;
}
.jine {
  width: 100%;
  height: 90 / @base;
  line-height: 90 / @base;
  padding: 0 40 / @base;
  .jine_left {
    font-size: 30 / @base;
    color: #333333;
    font-weight: bold;
  }
  .jine_right {
    float: right;
    color: #b695e9;
    font-size: 30 / @base;
    font-weight: bold;
  }
}
.hui {
  width: 100%;
  height: 15 / @base;
  background: #eeeeee;
}
.hang {
  width: 100%;
  height: 100 / @base;
  line-height: 100 / @base;
  padding: 0 40 / @base;
  .hang_left {
    float: left;
    width: 50%;
    height: 100%;
    display: flex;
    img {
      margin-top: 32 / @base;
      display: block;
      width: 37 / @base;
      height: 37 / @base;
    }
    span {
      font-size: 28 / @base;
      margin-left: 14 / @base;
      font-weight: bold;
      color: #363636;
    }
  }
  .hang_right {
    float: right;
    width: 30 / @base;
    height: 30 / @base;
    border: solid 1px #a0a0a0;
    background: #eeeeee;
    margin-top: 30 / @base;
    border-radius: 50%;
    box-sizing: border-box;
  }
  .active {
    z-index: 1;
    display: block;
    float: right;
    width: 30 / @base;
    height: 30 / @base;
    margin-top: 30 / @base;
    border-radius: 50%;
    background-size: 100% 100%;
  }
}
.sheng {
  text-align: center;
  margin-top: 560 / @base;
  font-size: 29 / @base;
  font-weight: bold;
}
.fukuan {
  width: 670 / @base;
  height: 75 / @base;
  line-height: 75 / @base;
  text-align: center;
  border-radius: 37 / @base;
  background: #b694ea;
  color: #fff;
  margin: 39 / @base auto 0 auto;
  font-size: 30 / @base;
  font-weight: bold;
}
</style>