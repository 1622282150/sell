<template>
  <div>
    <!-- 顶部返回分享容器 -->
    <div id="top_f" class="top_fixed">
      <div id="top_l" class="top_left">
        <i @click="back" id="top_li" class="iconfont icon-zuojiantou"></i>
      </div>
    </div>
    <!-- 图片或者视频容器 -->
    <div class="top_show">
      <img :src="product.BannerImg" alt />
    </div>
    <!-- 标题 -->
    <p class="jifen_title">{{product.Name}}</p>
    <div class="jifen_price">
      <div class="jifen_price_left">
        <img src="../../../assets/images/jifen_ji.png" alt />
        <span>{{product.Points}}</span>
      </div>
      <div class="jifen_price_right">已兑换{{product.SellCount}}</div>
    </div>
    <div class="huise"></div>
    <!-- 描述盒子 -->
    <div class="des_box">
      <h4>温馨提示</h4>
      <p>1.兑换后7个工作日内发货，请魅友们耐心等待；</p>
      <p>2. 本活动奖品包邮发送，仅限中国大陆地区，其他地区不能发货；</p>
      <p>
        3.请在【我的】-【设置】-【收货地址】，填写正确的地址信息
        及电话；提供错误信息导致损失将由用户自行承担。
      </p>
    </div>
    <div class="des_box">
      <h4>重要说明</h4>
      <p>1.除商品本身不能正常兑换外，商品一经兑换，一律不退换;</p>
      <p>
        2.通过非法途径获得积分后进行的正常兑换行为，或不按商品使
        用规则进行兑换，商家有权不提供服务;
      </p>
      <p>
        3.凡以不正当手段(包括但不限于作弊、扰乱系统、实施网络攻击
        等)进行兑换，魅千金有权终止该次兑换;
      </p>
      <p>
        4.对于每位用户限兑一次的商品,若发现多个用户账号使用相同手
        机号或收货地址兑换同一商品，则自动取消订单,被扣除的积分不
        予退还;
      </p>
      <p>
        5.请填写正确的地址因地址、电话错误、停机等导致快递配送不
        成功，商品被退回的。不再进行二次发货，同时消耗的积分不予
        退回。
      </p>
    </div>
    <div class="buwei"></div>
    <div class="bottom">
      <div class="bottom_top">
        <div class="bottom_top_left">
          <img src="../../../assets/images/jifen_ji.png" alt />
          <span class="ssp">{{product.Points * value}}</span>
          <div>
            <span>M{{product.MinLevel}}专享</span>
          </div>
        </div>
        <div class="bottom_top_right">
          <!--步进 -->
          <van-stepper disable-input button-size="16px" v-model="value" min="1" max="8" />
        </div>
      </div>
      <div class="bottom_btn" @click="showPopup" v-if="status === 1">立即兑换</div>
      <div class="bottom_btn" @click="torenwu" v-else-if="status === 2">积分不足,去赚取 ></div>
      <div class="bottom_btn" @click="mai" v-else-if="status === 3">马上领取</div>
    </div>
    <!-- 弹出层 -->
    <van-popup round v-model="show">
      <div class="tan">
        <div class="imgg">
          <img :src="product.BannerImg" alt />
        </div>
        <p class="tan_name">{{product.Name}}</p>
        <p class="tan_price">
          兑换需要扣除
          <span>{{product.Points * value}}</span>积分
        </p>
        <div class="tan_btn" @click="change_status">确认</div>
        <div class="tan_havepoint">您当前有{{userinfo.CurrentPoints}}积分</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import request from "@/utils/request";
import { Stepper, Popup, Toast } from "vant";
export default {
  data() {
    return {
      show: false, //弹出层控制
      lv_aright: false,
      status: 1, //1表示原始状态   2表示积分不足  3表示可以领取要跳走
      value: 1, //步进器的val,
      id: 0,
      userinfo: [],
      product: [],
      paramsinfo: [] //商品scid数组
    };
  },
  watch: {
    value(newval, oldval) {
      if (this.value * this.product.Points > this.userinfo.CurrentPoints) {
        console.log("超过了", this.value);
        this.status = 2;
      } else {
        console.log("没超过");
        this.status = 1;
      }
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getuserinfo();
    this.getparams();
    window.addEventListener("scroll", this.handleFun);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleFun);
  },
  methods: {
    back() {
      this.$router.back();
    },
    // 立即购买
    mai() {
      var obj = this.product;
      window.localStorage.setItem("type", 0);
      obj.Count = this.value;
      obj.SCID = this.paramsinfo.SCID;
      console.log(obj,'我是')
      this.$router.push({
        path: "/confirm_order",
        query: {
          list: JSON.stringify(obj)
        }
      });
    },
    change_status() {
      this.status = 3;
      this.show = false;
    },
    torenwu() {
      this.$router.push("/task_center");
    },
    // 展示弹出
    showPopup() {
      console.log(this.lv_aright);
      if (!this.lv_aright) {
        Toast("等级还不够哦~~");
      } else {
        this.show = true;
      }
    },
    // 获取商品详情
    getdetail() {
      request
        .post(this.$api + "/mobile/GetCommodityDetail", {
          Id: this.id
        })
        .then(res => {
          this.product = res.Data;
          // this.product.Points = 60;
          // 判断等级
          if (this.userinfo.PointLevel < this.product.MinLevel) {
            this.lv_aright = false;
          } else {
            this.lv_aright = true;
          }
          // 判断积分
          if (this.userinfo.CurrentPoints < this.product.Points) {
            this.status = 2;
          }
        })
        .catch(err => {});
    },
    // 获取商品默认参数
    getparams() {
      request
        .post(this.$api + "/mobile/GetCommoditySellInfo", {
          id: this.id
        })
        .then(res => {
          this.paramsinfo = res.Data.DataList[0];
        })
        .catch(err => {});
    },
    getuserinfo() {
      request
        .post(this.$api + "/mobile/GetUserPointsInfo", {})
        .then(res => {
          this.userinfo = res.Data;
          this.getdetail();
        })
        .catch(err => {});
    },
    // 滚动监听
    handleFun() {
      var top_fixed = document.querySelector("#top_f");
      var top_left = document.querySelector("#top_l");
      //   var top_right = document.querySelector("#top_r");
      var top_li = document.querySelector("#top_li");
      //   var top_ri = document.querySelector("#top_ri");
      this.offsetTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (this.offsetTop != 0) {
        top_fixed.style.background = "#FFFFFF";
        top_left.style.background = "#FFFFFF";
        top_li.style.color = "#040307";
        // top_right.style.background = "#FFFFFF";
        // top_ri.style.color = "#040307";
      } else {
        top_fixed.style.background = "none";
        top_left.style.background = "rgba(102, 103, 98, 0.5)";
        top_li.style.color = "#ffffff";
        // top_right.style.background = "rgba(102, 103, 98, 0.5)";
        // top_ri.style.color = "#ffffff";
      }
    }
  }
};
</script>
<style scoped lang='less'>
@base: 37.5rem;
.top_fixed {
  position: fixed;
  top: 0;
  width: 100%;
  height: 60 / @base;
  z-index: 1;
  .top_left {
    position: fixed;
    top: 10 / @base;
    left: 20 / @base;
    width: 40 / @base;
    height: 40 / @base;
    line-height: 40 / @base;
    background: rgba(102, 103, 98, 0.5);
    text-align: center;
    border-radius: 50%;
    z-index: 2;
    i {
      width: 40 / @base;
      height: 40 / @base;
      line-height: 40 / @base;
      font-size: 25px;
      color: white;
    }
  }
}
// 视频图片容器
.top_show {
  position: relative;
  width: 100%;
  height: 310 / @base;
  overflow: hidden;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    background-size: 100% 100%;
  }
}
// 标题
.jifen_title {
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #3e3e3e;
  margin: 17 / @base auto 0 / @base 17 / @base;
}
.jifen_price {
  padding: 16 / @base 13 / @base 14 / @base 13 / @base;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .jifen_price_left {
    display: flex;
    align-items: center;
    img {
      width: 24px;
      height: 24px;
    }
    span {
      font-size: 20px;
      font-weight: bold;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #efbd32;
      margin-left: 8 / @base;
    }
  }
  .jifen_price_right {
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #999999;
  }
}
.huise {
  width: 100%;
  height: 10 / @base;
  background: #e6e6e6;
}
.des_box {
  width: 100%;
  padding: 20 / @base 12 / @base 6 / @base 12 / @base;
  h4 {
    font-size: 13px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #3e3e3e;
    margin-bottom: 14 / @base;
  }
  p {
    font-size: 12px;
    font-stretch: normal;
    line-height: 24 / @base;
    letter-spacing: 0px;
    color: #666666;
  }
}
.buwei {
  width: 100%;
  height: 130 / @base;
}
// 底部固定定位
.bottom {
  background: white;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1px solid #eeeeee;
  padding-bottom: 10 / @base;
  .bottom_top {
    padding: 14 / @base;
    width: 100%;
    height: 61 / @base;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .bottom_top_left {
      display: flex;
      align-items: center;
      img {
        width: 24 / @base;
        height: 24 / @base;
      }
      .ssp {
        font-size: 20px;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #efbd32;
        margin-left: 7 / @base;
      }
      div {
        margin-left: 7 / @base;
        padding: 1 / @base 3 / @base;
        font-size: 10px;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        background-image: linear-gradient(58deg, #d57bd0 0%, #be7fdd 100%),
          linear-gradient(#782ad9, #782ad9);
        background-blend-mode: normal, normal;
        border-radius: 0px 8px 8px 8px;
        span {
          display: inline-block;
          transform: scale(0.8);
        }
      }
    }
    .bottom_top_right {
      // 步进
      /deep/.van-stepper__input {
        background: none !important;
        color: #666666;
      }
      /deep/.van-stepper__minus {
        font-size: 16px;
        font-weight: bold;
        background-color: #dbbffe;
        color: #782ad9;
        border-radius: 4px !important;
      }
      /deep/ .van-stepper__plus {
        font-size: 16px;
        font-weight: bold;
        background-color: #dbbffe;
        color: #782ad9;
        border-radius: 4px !important;
      }
      /deep/.van-stepper__minus--disabled {
        color: #c8c9cc;
        background-color: #f7f8fa;
      }
      /deep/.van-stepper__plus--disabled {
        color: #c8c9cc;
        background-color: #f7f8fa;
      }
    }
  }
  .bottom_btn {
    width: 350 / @base;
    height: 40 / @base;
    line-height: 40 / @base;
    margin: 0 auto;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
    background-image: linear-gradient(#782ad9, #782ad9),
      linear-gradient(#ffffff, #ffffff);
    background-blend-mode: normal, normal;
    border-radius: 20px;
  }
}
// 弹出层
.tan {
  text-align: center;
  width: 280 / @base;
  height: auto;
  border-radius: 20px;
  background-color: #ffffff;
  padding: 44 / @base 42 / @base 19 / @base 42 / @base;
  .imgg {
    position: relative;
    width: 100%;
    height: 116 / @base;
    overflow: hidden;
    margin-bottom: 26 / @base;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: auto;
      background-size: 100% 100%;
    }
  }
  .tan_name {
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #3e3e3e;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; //行数
    -webkit-box-orient: vertical;
    margin-bottom: 18 / @base;
  }
  .tan_price {
    margin-bottom: 22 / @base;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 2px;
    color: #3e3e3e;
    span {
      color: #9946fd;
    }
  }
  .tan_btn {
    width: 187 / @base;
    height: 39 / @base;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(-87deg, #9441ff 0%, #eb9fdf 100%),
      linear-gradient(#4867eb, #4867eb);
    background-blend-mode: normal, normal;
    border-radius: 20px;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #ffffff;
    margin-bottom: 4 / @base;
  }
  .tan_havepoint {
    font-size: 12px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #999999;
  }
}
</style>