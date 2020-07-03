<template>
  <div>
    <header>
      <Return>订单详情</Return>
    </header>
    <div class="bu"></div>
    <!-- 地址 -->
    <div class="address">
      <img src="../../../assets/images/confirm_dingwei.png" alt />
      <div class="address_right" v-if="list.ReceivingAddress">
        <div class="address_right_top">
          <span class="address_right_name">{{list.ReceivingAddress.Name}}</span>
          <span class="address_right_tel">{{list.ReceivingAddress.Mobile}}</span>
        </div>
        <div
          class="address_right_bottom"
        >{{list.ReceivingAddress.Province}} {{list.ReceivingAddress.City}} {{list.ReceivingAddress.Area}} {{list.ReceivingAddress.StreetRoad}} {{list.ReceivingAddress.DetailedAddress}}</div>
      </div>
    </div>
    <div class="hui"></div>
    <!-- 商品盒子 -->
    <div class="box" v-for="(item,index) in list.OrderList" :key="index">
      <div class="box_title" @click="todian(item.SellerId)">
        <img src="../../../assets/images/confirm_project.png" alt />
        <span>{{item.SellerName}}</span>
        <van-icon name="arrow" />
        <!-- <div v-if="!isPay" class="naozhong"><i class="iconfont icon-naozhong"></i><van-count-down  format="mm:ss" :time="1440000" /></div>
        <div v-else class="naozhong">买家已付款</div>-->
      </div>
      <div>
        <div
          class="box_item"
          v-for="(i,index) in item.ProductList"
          :key="index"
          @click="todetail(i.CommodityId,i.Price)"
        >
          <img :src="i.Img" alt />
          <div class="item_right">
            <div class="item_name">{{i.Name}}</div>
            <div class="item_des" v-if="i.SCText">{{i.SCText}}</div>
            <div v-else class="item_des">标准</div>
            <div v-if="i.Price != 0" class="item_price">
              <span class="renminbi">¥</span>
              <span class="jiage">{{i.Price}}</span>
              <span class="num">x{{i.Count}}</span>
            </div>
            <div v-else class="item_price">
              <!-- <span class="renminbi">¥</span> -->
              <span class="jiage">{{i.Points}}积分</span>
              <span class="num">x{{i.Count}}</span>
            </div>
          </div>
        </div>
        <div class="tuikuan" v-show="isPay">
          <div class="tuikuan_item">退款</div>
        </div>
      </div>
    </div>
    <!--商品价格-->
    <div class="price">
      <div class="hang">
        <div class="left">商品总价</div>
        <div v-if="list.TotalPrice != 0" class="right">¥{{list.TotalPrice}}</div>
        <div v-else class="right">{{list.TotalPoints}}积分</div>
      </div>
      <div class="hang">
        <div class="left">运费</div>
        <div class="right">¥0</div>
      </div>
      <div class="hang">
        <div class="left">满减</div>
        <div class="right">¥0</div>
      </div>
      <div class="hang2">
        <div class="left">实付款(含运费)</div>
        <div v-if="list.TotalPrice != 0" class="right">¥{{list.TotalPrice}}</div>
        <div v-else class="right">{{list.TotalPoints}}积分</div>
      </div>
    </div>
    <div class="hui"></div>
    <div class="order">
      <div class="bang"></div>
      <div class="order_title">订单详情</div>
      <div class="order_item">订单编号:{{OrderId}}</div>
      <div class="order_item">创建时间:{{OrderTime}}</div>
      <!-- <div class="order_item">付款时间: 2019-09-10  <span>12:29:34</span></div> -->
    </div>
    <div v-if="list.TotalPrice != 0">
      <div class="bottom" v-if="list.Status === 0 || list.Status === -1">
        <div class="quxiao" @click="showPopup">取消订单</div>
        <div class="fukuan" @click="fukuan">付 款</div>
      </div>
      <div class="bottom" v-else-if="list.Status === -2">
        <div class="tixing" @click="del_order">删除订单</div>
      </div>
    </div>
    <div v-else>
      <div class="bottom">
        <div class="tixing" @click="fukuan">提交</div>
      </div>
    </div>
    <!-- <div class="bottom" v-else>
      <div class="tixing" @click="tixing">提醒发货</div>
    </div>-->

    <!-- 弹出层 -->

    <van-popup
      v-model="show"
      style="border-top-left-radius:7px;border-top-right-radius:7px;"
      position="bottom"
      :style="{ height: '70%' }"
    >
      <div class="tan_title">取消订单</div>
      <div class="tan_des">订单取消后无法恢复,红包,优惠券可退回,请注意在有效期内使用</div>
      <div class="cause_title">请选择取消订单的原因</div>
      <div
        class="cause_item"
        :class="index === 4?'none':''"
        @click="sel_active(index)"
        v-for="(item,index) in causeinfo"
        :key="index"
      >
        <div class="cause_left">{{item}}</div>
        <!-- <div v-if="active === index" class="active"></div> -->
        <img v-if="active === index" class="active" src="../../../assets/images/对号.png" alt />
        <div v-else class="cause_right"></div>
      </div>
      <!-- 底部按钮 -->
      <div class="di1" @click="zanbu">暂不取消</div>
      <div class="di2" @click="quxiao_order()">确定取消</div>
    </van-popup>
  </div>
</template>

<script>
import request from "@/utils/request";
import { Icon, CountDown, Popup, Toast } from "vant";
import Return from "../../../components/Return";
export default {
  components: {
    Return
  },
  data() {
    return {
      status: "",
      OrderId: "",
      OrderTime: "",
      active: 0,
      isPay: 0, //0是取消订单或者付款  1是删除订单
      show: false,
      causeinfo: [
        "我不想买了",
        "信息填写错误,重新拍",
        "卖家缺货",
        "同城见面交易",
        "其他原因"
      ],
      list: []
    };
  },
  created() {
    this.OrderId = this.$route.query.OrderId;
    this.OrderTime = this.$route.query.OrderTime;
  },
  mounted() {
    this.get_detail();
  },
  methods: {
    // 提醒发货
    tixing() {
      Toast("提醒成功");
    },
    // 删除订单
    del_order() {
      request
        .post(this.$api + "/mobile/DelOrder", {
          Id: this.OrderId
        })
        .then(res => {
          if (res.IsSuccess) {
            //  删除成功之后跳转订单页面
          } else {
            Toast(res.Message);
          }
        })
        .catch(err => {});
    },
    // 取消订单
    quxiao_order() {
      // mobile/CancelOrder
      //  console.log(this.active+1)
      request
        .post(this.$api + "/mobile/CancelTrade", {
          Id: this.OrderId,
          Type: this.active + 1
        })
        .then(res => {
          if (res.IsSuccess) {
            this.show = false;
            this.$router.back();
          } else {
            Toast(res.Message);
          }
        })
        .catch(err => {});
    },
    fukuan() {
      // 积分商品
      if (this.list.TotalPrice == 0) {
        request
          .post(this.$api + "/mobile/BeginPayTrade", {
            tradeNo: this.list.TradeNo,
            payType: 1
          })
          .then(res => {
            this.$router.push("/order?index=1");
          })
          .catch(err => {});
      } else {
        var params = this.OrderId;
        this.$router.push({
          path: "/pay",
          query: {
            OrderId: params,
            TotalPrice: this.list.TotalPrice
          }
        });
      }
    },
    // 得到订单数据
    get_detail() {
      request
        .post(this.$api + "/mobile/GetTradeInfoDetail", {
          TradeNo: this.OrderId
        })
        .then(res => {
          if (res.IsSuccess) {
            this.list = res.Data;
            this.status = res.Data.Status;
          } else {
            Toast(res.Message);
          }
        })
        .catch(err => {});
    },
    // 展示弹出层
    showPopup() {
      this.show = true;
    },
    zanbu() {
      this.active = 0;
      this.show = false;
    },
    sel_active(index) {
      this.active = index;
    },
    todian(id) {
      this.$router.push({
        path: "/store_page",
        query: {
          id: id
        }
      });
    },
    todetail(id, price) {
      if (price == 0) {
        this.$router.push({
          path: "/jifen_detail",
          query: {
            id: id
          }
        });
      } else {
        this.$router.push({
          path: "/product_detail",
          query: {
            id: id
          }
        });
      }
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
.address {
  position: relative;
  display: flex;
  width: 670 / @base;
  height: 150 / @base;
  // line-height: 150/@base;
  border-radius: 20 / @base;
  background: #ffffff;
  margin: 0 auto;

  img {
    display: inline-block;
    width: 70 / @base;
    height: 70 / @base;
    margin: auto 36 / @base auto 0;
  }
  i {
    position: absolute;
    top: 60 / @base;
    left: 30 / @base;
    color: #b695e9;
    font-weight: bold;
    font-size: 16px;
  }
  .span1 {
    line-height: 150 / @base;
    margin-left: 70 / @base;
    color: #b695e9;
    font-weight: bold;
    font-size: 36 / @base;
    // font-family: "PingFangMedium";
  }
  .address_right_name {
    font-size: 30 / @base;
    color: #333333;
    font-weight: bold;
    // font-family: "PingFangMedium";
  }
  .address_right_tel {
    font-size: 23 / @base;
    // font-family: "PingFangRegular";
    color: #686868;
    font-weight: bold;
  }
  .address_right_bottom {
    width: 100%;
    height: 70 / @base;
    font-size: 25 / @base;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; //行数
    -webkit-box-orient: vertical;
  }
}
.hui {
  width: 100%;
  height: 15 / @base;
  background: #eeeeee;
}
.box {
  width: 670 / @base;
  margin: 32 / @base auto 0 auto;
  background: #fff;
  border-radius: 20 / @base;
  padding: 31 / @base 0 / @base 20 / @base 0 / @base;

  .box_title {
    position: relative;
    display: flex;
    height: 35 / @base;
    line-height: 35 / @base;
    font-size: 24 / @base;
    margin-bottom: 51 / @base;
    .naozhong {
      position: absolute;
      right: 0;
      text-align: right;
      width: 150 / @base;
      height: 100%;
      color: #b695e9;
      //   font-size: 0;
      div {
        color: #b695e9;
        display: inline-block;
      }
      i {
        font-size: 40 / @base;
        display: inline-block;
        height: 100%;
        height: 20 / @base;
        line-height: 20 / @base;
      }
    }
    img {
      display: inline-block;
      width: 35 / @base;
      height: 35 / @base;
    }
    span {
      display: inline-block;
      min-width: 160 / @base;
      max-width: 250 / @base;
      height: 35 / @base;
      font-size: 32 / @base;
      color: #333333;
      font-weight: bold;
      // font-family: "PingFangMedium";
      margin-left: 10 / @base;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1; //行数
      -webkit-box-orient: vertical;
    }
    i {
      display: inline-block;
      font-size: 12px;
      line-height: 35 / @base;
    }
  }
  .tuikuan {
    position: relative;
    width: 100%;
    padding: 35 / @base 0 55 / @base 0;
    .tuikuan_item {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 26 / @base;
      color: #838383;
      width: 150 / @base;
      height: 55 / @base;
      line-height: 55 / @base;
      border: 1px solid #bfbfbf;
      border-radius: 27.5 / @base;
      text-align: center;
    }
  }
  .box_item {
    width: 100%;
    height: 203 / @base;
    margin: 27 / @base 0;
    display: flex;

    img {
      width: 200 / @base;
      height: 200 / @base;
      border-radius: 5 / @base;
      background-size: 100% 100%;
    }
    .item_right {
      width: 100%;
      height: 100%;

      padding-left: 23 / @base;
      .item_name {
        // height: 61/@base;
        width: 100%;
        font-size: 28 / @base;
        color: #333333;
        font-weight: bold;
        // font-family: "PingFangRegular";
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; //行数
        -webkit-box-orient: vertical;
      }
      .item_des {
        font-size: 24 / @base;
        margin-top: 33 / @base;
        color: #828282;
        font-weight: bold;
        // font-family: 'PingFangRegular';
      }
      .item_price {
        //   display: flex;
        //   width:130/@base;
        height: 58 / @base;

        .renminbi {
          font-size: 24 / @base;
          color: #b695e9;
          font-weight: bold;
          // font-family: 'PingFangRegular';
        }
        .jiage {
          font-size: 37 / @base;
          font-weight: bold;
          color: #b695e9;
          font-weight: bold;
        }
        .num {
          font-size: 26 / @base;
          // font-family: 'PingFangRegular';
          font-weight: bold;
          color: #6e6e6e;
        }
      }
    }
  }
}
.price {
  width: 100%;
  padding: 27 / @base 40 / @base 58 / @base 40 / @base;
  .hang {
    width: 100%;
    height: 38 / @base;
    overflow: hidden;
    margin-bottom: 15 / @base;
    .left {
      float: left;
      font-size: 28 / @base;
      color: #333333;
      font-weight: bold;
      // font-family: 'PingFangRegular';
    }
    .right {
      float: right;
      font-size: 28 / @base;
      color: #333333;
    }
  }
  .hang2 {
    width: 100%;
    height: 40 / @base;
    overflow: hidden;
    margin-bottom: 15 / @base;
    .left {
      float: left;
      font-size: 32 / @base;
      color: #333333;
      font-weight: bold;
      // font-family: 'PingFangRegular';
    }
    .right {
      float: right;
      font-size: 32 / @base;
      color: #b695e9;
    }
  }
}
.order {
  position: relative;
  width: 100%;
  // height: 203/@base;
  padding: 33 / @base 40 / @base 120 / @base 40 / @base;
  .bang {
    position: absolute;
    top: 32 / @base;
    left: 40 / @base;
    width: 5 / @base;
    height: 39 / @base;
    background: #b695e9;
  }
  .order_title {
    margin-left: 13 / @base;
    font-size: 31 / @base;
    color: #333333;
    font-weight: bold;
  }
  .order_item {
    font-size: 26 / @base;
    color: #333333;
    font-weight: bold;
    margin-top: 15 / @base;
    margin-left: 15 / @base;
    span {
      color: #777777;
    }
  }
}
.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100 / @base;
  border-top: 1px solid #e6e6e6;
  background: #fff;
  z-index: 1;
  .quxiao {
    position: absolute;
    right: 250 / @base;
    top: 19 / @base;
    width: 170 / @base;
    height: 55 / @base;
    line-height: 55 / @base;
    border: solid 1px #bfbfbf;
    border-radius: 27 / @base;
    text-align: center;
    font-size: 26 / @base;
    color: #333333;
  }
  .fukuan {
    position: absolute;
    right: 40 / @base;
    top: 19 / @base;
    width: 170 / @base;
    height: 55 / @base;
    line-height: 55 / @base;
    border: solid 1px #b695e9;
    border-radius: 27 / @base;
    text-align: center;
    font-size: 26 / @base;
    color: #b695e9;
  }
  .tixing {
    position: absolute;
    right: 40 / @base;
    top: 19 / @base;
    width: 170 / @base;
    height: 55 / @base;
    line-height: 55 / @base;
    border: solid 1px #bfbfbf;
    border-radius: 27 / @base;
    text-align: center;
    font-size: 26 / @base;
    color: #333333;
  }
}
.tan_title {
  font-size: 36 / @base;
  color: #333333;
  font-weight: bold;
  margin: 40 / @base 0;
  text-align: center;
}
.tan_des {
  width: 670 / @base;
  height: 96 / @base;
  background: #efe5ff;
  border-radius: 5px;
  margin: 0 auto;
  padding: 21 / @base 11 / @base 10 / @base 17 / @base;
  font-size: 24 / @base;
  line-height: 28 / @base;
  color: #6c6c6c;
}
.cause_title {
  margin-left: 40 / @base;
  margin-top: 36 / @base;
  margin-bottom: 27 / @base;
  font-size: 30 / @base;
  font-weight: bold;
  color: #333333;
  //  font-family: 'PingFangRegular';
}
.none {
  border-bottom: none !important;
}
.cause_item {
  width: 670 / @base;
  height: 90 / @base;
  line-height: 90 / @base;
  margin: 0 auto;
  border-bottom: 1px solid #e6e6e6;

  .cause_left {
    float: left;
    font-size: 28 / @base;
    font-weight: bold;
    color: #333333;
  }
  .cause_right {
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
.di1 {
  display: inline-block;
  margin-top: 51 / @base;
  margin-left: 115 / @base;
  width: 250 / @base;
  height: 65 / @base;
  line-height: 65 / @base;
  border-radius: 32 / @base;
  background-image: linear-gradient(131deg, #ffbc66 0%, #ffa530 100%);
  color: #ffffff;
  text-align: center;
  font-size: 28 / @base;
  font-weight: bold;
}
.di2 {
  display: inline-block;
  margin-top: 51 / @base;
  margin-left: 30 / @base;
  width: 250 / @base;
  height: 65 / @base;
  line-height: 65 / @base;
  border-radius: 32 / @base;
  background-image: linear-gradient(131deg, #9557f6 0%, #8536ff 100%);
  color: #ffffff;
  text-align: center;
  font-size: 28 / @base;
  font-weight: bold;
}
</style>