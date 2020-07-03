<template>
  <div>
    <header>
      <Return>提交订单</Return>
    </header>
    <div class="bu"></div>
    <!-- 行 -->
    <div class="item">
      <div class="item_left">{{list.Name |shopProduct}}</div>
      <div class="item_right">¥{{list.Price}}</div>
    </div>
    <div class="item">
      <div class="item_left">数量</div>
      <div class="item_right">
        <van-stepper async-change v-model="count" integer />
      </div>
    </div>
    <div class="item">
      <div class="item_left">小计</div>
      <div class="item_right" style="color:#b695e9">¥{{list.Price*count}}</div>
    </div>
    <div class="kongxi"></div>
    <div class="item">
      <div class="item_left">抵用券</div>
      <div class="item_right" style="color:#b695e9">暂无可用</div>
    </div>
    <div class="item">
      <div class="item_left">订单总价</div>
      <div class="item_right" style="color:#b695e9">¥{{list.Price*count}}</div>
    </div>
    <div class="kongxi"></div>
    <div class="item" @click="$router.push('/set_mobile')">
      <div class="item_left">手机号码</div>
      <div class="item_right">
        {{tel}}
        <i class="iconfont icon-youjiantou"></i>
      </div>
    </div>
    <div class="kongxi"></div>
    <div class="item" @click="active_baozhang = true">
      <div class="item_left">购买须知</div>
      <div class="item_right">
        <i class="iconfont icon-youjiantou"></i>
      </div>
    </div>
    <!-- 底部 -->
    <div class="order_bottom" @click="zhifu">去支付{{list.Price*count}}元</div>

    <!-- 保障弹出层 -->
    <van-popup v-model="active_baozhang" position="bottom" :style="{ height: '70%' }">
      <div class="baozhang_box">
        <div class="baozhang_p">购买须知</div>
        <div class="baozhang_boxbox">
          <div class="baozhang_box_title">有效期</div>
          <div class="baozhang_box_content">
            <span>.</span>请你提前一小时预约
          </div>
          <div class="baozhang_box_title">预约信息</div>
          <div class="baozhang_box_content">
            <span>.</span>请你提前一小时预约
          </div>
          <div class="baozhang_box_title">规则提醒</div>
          <div class="baozhang_box_content">
            <span>.</span>需你当日一次性体验完
          </div>
          <div class="baozhang_box_title">商家服务</div>
          <div class="baozhang_box_content">
            <span>.</span>提供免费wifi
          </div>
          <div class="baozhang_box_content">
            <span>.</span>提供免费停车位
          </div>
          <div class="baozhang_box_title">商家服务</div>
          <div class="baozhang_box_content">
            <span>.</span>提供免费wifi
          </div>
          <div class="baozhang_box_content">
            <span>.</span>提供免费停车位
          </div>
          <div class="baozhang_box_title">商家服务</div>
          <div class="baozhang_box_content">
            <span>.</span>提供免费wifi
          </div>
          <div class="baozhang_box_content">
            <span>.</span>提供免费停车位
          </div>
        </div>
        <div class="baozhang_box_bottom" @click="active_baozhang=false">已了解</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import request from "@/utils/request";
import { Progress, Toast, Stepper } from "vant";
import Return from "../../../components/Return";
export default {
  components: {
    Return
  },
  data() {
    return {
      id: "",
      orderid: "",
      list: [],
      count: 1,
      active_baozhang: false,
      tel: ""
    };
  },
  created() {},
  mounted() {
    this.id = this.$route.query.id;
    this.tal = window.localStorage.getItem("mobile");
    this.get();
  },
  methods: {
    get() {
      request
        .post(this.$api + "/mobile/GetCommodityProjectDetail", {
          Id: this.id
        })
        .then(res => {
          this.list = res.Data;
        })
        .catch(err => {});
    },
    zhifu() {
      // mobile/AddOrder
      request
        .post(this.$api + "/mobile/BuildTrade", {
          Type: 0,
          ReceivingAddressId: 0,
          Data: [
            {
              CommodityId: this.list.CommodityId,
              Type:0,
              Count: this.count
            }
          ]
        })
        .then(res => {
          if (res.IsSuccess) {
            // this.orderid = res.Data.OrderId;

            let OrderId=res.Data.TradeNo
            let OrderTime=res.Data.TradeNoTime
            this.$router.push({
              path: "/pay",
              query: {
                OrderId: this.OrderId,
                TotalPrice:this.list.Price*this.count
              }
            });
          } else {
            Toast(res.Message);
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
header {
  background: white;
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
// item
.item {
  overflow: hidden;
  width: 100%;
  height: 90 / @base;
  line-height: 90 / @base;
  padding: 0 40 / @base;
  font-size: 30 / @base;
  border-bottom: 1px solid #e6e6e6;
  .item_left {
    float: left;
  }
  .item_right {
    float: right;
    i {
      color: #a6a6a6;
    }
    /deep/ .van-stepper__minus {
      width: 23px;
      background: none;
      border: 1px solid #a0a0a0;
    }
    /deep/ .van-stepper__input {
      width: 40px;
      margin: 0;
      border-top: 1px solid #a0a0a0;
      border-bottom: 1px solid #a0a0a0;
      background: none;
    }
    /deep/ .van-stepper__plus {
      width: 23px;
      background: none;
      border: 1px solid #a0a0a0;
    }
  }
}
.kongxi {
  width: 100%;
  height: 20 / @base;
  background: #f5f5f5;
}
// 尾部
.order_bottom {
  position: fixed;
  bottom: 20 / @base;
  left: 10%;
  width: 80%;
  height: 80 / @base;
  line-height: 80 / @base;
  background: #b695e9;
  color: #fff;
  font-size: 30 / @base;
  text-align: center;
  border-radius: 20px;
}
// 保障弹出层
.baozhang_box {
  padding-top: 30 / @base;
  position: relative;
  width: 100%;
  height: 100%;
  .baozhang_p {
    font-size: 30 / @base;
    font-weight: bold;
    color: #333333;
    text-align: center;
    margin-bottom: 56 / @base;
    // margin-top: 30/@base;
  }
  .baozhang_boxbox {
    padding: 0 43 / @base;
    width: 664 / @base;
    height: 700 / @base;
    overflow: scroll;
    .baozhang_box_title {
      font-size: 28 / @base;
      font-weight: bold;
      margin-top: 30 / @base;
    }
    .baozhang_box_content {
      font-size: 26 / @base;
      // color: #666762;
      // margin-top: 10/@base;
      // margin-bottom: 7/@base;
      span {
        font-size: 18px;
        position: relative;
        top: -3px;
      }
    }
  }

  .baozhang_box_bottom {
    position: absolute;
    bottom: 20 / @base;
    left: 183 / @base;
    width: 400 / @base;
    height: 70 / @base;
    line-height: 70 / @base;
    color: white;
    text-align: center;
    background: #b694e8;
    font-size: 32 / @base;
    border-radius: 20px;
  }
}
</style>