<template>
  <div>
    <div class="header">
      分销中心
      <img @click="back()" class="img1" src="../../../assets/images/newfan.png" alt />
    </div>
    <div class="jicheng"></div>
    <div class="title">
      <div class="mingxi" @click="show = true">规则</div>
      <img class="title_touxiang" :src="list.Avatar" alt />
      <div class="title_middle">
        <p class="name">
          {{list.UserName|usernameLength}}
          <img
            v-if="list.PointLevel === 1"
            src="../../../assets/images/vip_vv1.png"
            alt
          />
          <img v-else-if="list.PointLevel === 2" src="../../../assets/images/vip_vv2.png" alt />
          <img v-else-if="list.PointLevel === 3" src="../../../assets/images/vip_vv3.png" alt />
          <img v-else-if="list.PointLevel === 4" src="../../../assets/images/vip_vv4.png" alt />
          <img v-else-if="list.PointLevel === 5" src="../../../assets/images/vip_vv5.png" alt />
          <img v-else-if="list.PointLevel === 6" src="../../../assets/images/vip_vv6.png" alt />
          <img v-else src="../../../assets/images/vip_vv7.png" alt />
        </p>
        <p class="zhuan">
          邀请码:
          <span class="order-id">{{list.InviteCode}}</span>
          <span @click="copyID" :data-clipboard-text="list.InviteCode" class="fuzhi">复制</span>
        </p>
      </div>
    </div>
    <!-- 滑动 -->
    <van-swipe :show-indicators="false" :loop="false" :width="330">
      <van-swipe-item>
        <div class="sw_box">
          <div class="box" :style="backgroundDiv">
            <div class="box_title">收益金额</div>
            <div class="get_price">
              <div class="price_left">
                <span>¥</span>
                {{list.IncomeBalance}}
              </div>
              <div @click="tixian" style="color: #c45dff;" class="price_right">
                申请提现
                <i class="iconfont icon-youjiantou"></i>
              </div>
            </div>
            <div class="box_main">
              <div class="box_main_item">
                <div>累计收益余额</div>
                <p>
                  <span>¥</span>
                  {{list.CumulativeIncomeBalance}}
                </p>
              </div>
              <div class="box_main_item">
                <div>未到账余额(交易中)</div>
                <p>
                  <span>¥</span>
                  {{list.OutstandingBalance}}
                </p>
              </div>
            </div>
          </div>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="sw_box">
          <div class="box" :style="backgroundDiv1">
            <div class="box_title">收益积分</div>
            <div class="get_price">
              <div class="price_left">
                <!-- <span>¥</span> -->
                {{list.IncomePoints}}
              </div>
              <div @click="$router.push('/jifen_mall')" style="color: #ee832b;" class="price_right">
                兑换豪礼
                <i class="iconfont icon-youjiantou"></i>
              </div>
            </div>
            <div class="box_main">
              <div class="box_main_item">
                <div>累计收益积分</div>
                <p>
                  <!-- <span>¥</span> -->
                  {{list.CumulativeIncomePoints}}
                </p>
              </div>
              <div class="box_main_item">
                <div>未到账积分(交易中)</div>
                <p>
                  <!-- <span>¥</span> -->
                  {{list.OutstandingPoints}}
                </p>
              </div>
            </div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
    <!-- 菜单 -->
    <div class="tab">
      <div @click="$router.push('/fenxiao_team')" class="tab_item">
        <img src="../../../assets/images/fenxiao_center_t1.png" alt />
        <div class="tab_son">
          <div class="son_left">我的团队</div>
          <div class="son_right">{{list.InviteFriendCount}}人</div>
        </div>
      </div>
      <div class="tab_item" @click="$router.push('/fenxiao_order')">
        <img src="../../../assets/images/fenxiao_center_t2.png" alt />
        <div class="tab_son">
          <div class="son_left">分销订单</div>
          <div class="son_right">{{list.DistributionOrderCount}}笔</div>
        </div>
      </div>
    </div>
    <div class="tab">
      <div class="tab_item" @click="showfen = true">
        <img src="../../../assets/images/fenxiao_center_t3.png" alt />
        <div class="tab_son">
          <div class="son_left">推广好友</div>
          <!-- <div class="son_right">{{list.InviteFriendCount}}人</div> -->
        </div>
      </div>
      <div class="tab_item" @click="$router.push('/fenxiao_tixian_recode')">
        <img src="../../../assets/images/fenxiao_center_t4.png" alt />
        <div class="tab_son">
          <div class="son_left">提现明细</div>
          <div class="son_right">{{list.UserWithdrawalCount}}笔</div>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <van-popup v-model="show">
      <div class="tan">
        <div class="tan_top">
          <p>
            <span>【分销机制】</span>把个人邀请码分享给他人。他人成为魅千金用户后，在【设置】-【填写邀请码】里填写您的邀请码，每次商城购物，被邀请者都可获得商城购物95折的优惠价（不包含个人橱窗商品）。同时，分销者均可享受购买者实付金额的10%佣金及积分收益。
          </p>
          <p>
            <span>【收益结算】</span>如分销者A邀请的用户B购买了商城价值1000元的商品，但用户B实付为1000*0.95=950.00元。那么分销者A可获得的收益为95元佣金及950积分。
          </p>
          <p>
            <span>【结算时间】</span>分销后7日内，如果购买商城商品的用户退款，则该笔分成金额将撤回。因此平台会将分成金额及积分冻结7天，7天后结算给分销者。
          </p>
        </div>
        <img
          @click="show = false"
          class="tan_error"
          src="../../../assets/images/fenxiao_center_error.png"
          alt
        />
      </div>
    </van-popup>
    <!-- 弹出层分享 -->
    <van-action-sheet v-model="showfen">
      <div class="towechat">
        <div class="towechat_title">分享到</div>
        <div class="towechat_box">
          <div @click="towechat" class="towechat_item">
            <img src="../../../assets/images/fenxiang_wechat.png" alt />
            <p>微信</p>
          </div>
          <div @click="tofriend" class="towechat_item">
            <img src="../../../assets/images/fenxiang_pengyouquan.png" alt />
            <p>朋友圈</p>
          </div>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import Clipboard from "clipboard";
import { Toast, Swipe, SwipeItem, Popup, ActionSheet } from "vant"; //引入vant ui库
import request from "@/utils/request";
export default {
  data() {
    return {
      showfen: false, //分享
      show: false,
      backgroundDiv: {
        backgroundImage:
          "url(" + require("../../../assets/images/fenxiao_center_b1.png") + ")"
      },
      backgroundDiv1: {
        backgroundImage:
          "url(" + require("../../../assets/images/fenxiao_center_b2.png") + ")"
      },
      list: []
    };
  },
  mounted() {
    this.get_center();
  },
  methods: {
    back() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        console.log("我是要去安卓");
        window.android.closePage();
        this.$router.back();
      } else if (isiOS) {
        console.log("我是要去ios");
        let url = this.$domain.url + "fenxiao_center";
        console.log(url);
        this.$bridge.callhandler("closePage", url, data => {
          // 处理返回数据
        });
        this.$router.back();
        //  window.location.href='mqjapp://home'
      } else {
        console.log("我不是安卓也不是ios,我在哪");
        this.$router.back();
      }
    },
    towechat() {
      var dizhi = this.$domain.url + "fenxiao_code?pay=" + this.list.InviteCode;
      var name = "快试试，这个app能让你变更美！";
      var description = "5秒测出你的皮肤及妆容状态，并教你如何快速改善！";
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        console.log("我是要去安卓");
        // var data={
        //  address:window.location.href,
        //  name:name,
        //  description:description,
        //  type:'wechat'
        // }
        console.log(dizhi);
        window.android.shareToWechat(dizhi, name, description, "wechat");
        // window.android.shareToWechat(data)
      } else if (isiOS) {
        console.log("我是要去ios");
        var params = {
          address: dizhi,
          name: name,
          description: description,
          type: "wechat"
        };

        console.log(params);
        // window.webkit.messageHandlers.shareToWechat.postMessage(window.location.href,name,description,'微信');
        this.$bridge.callhandler("shareToWechat", params, data => {
          // 处理返回数据
          //   Dialog.alert({
          //   message: "ios收到通知后才会触发的" + JSON.stringify(data)
          // }).then(() => {
          //   // on close
          // });
        });
      } else {
        console.log("我不是安卓也不是ios,我在哪");
      }
      this.showfen = false;
    },
    tofriend() {
      var dizhi = this.$domain.url + "fenxiao_code?pay=" + this.list.InviteCode;
      var name = "快试试，这个app能让你变更美！";
      var description = "5秒测出你的皮肤及妆容状态，并教你如何快速改善！";
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        console.log("我是要去安卓");
        console.log(dizhi);
        window.android.shareToWechat(dizhi, name, description, "FriendCircle");
      } else if (isiOS) {
        console.log("我是要去ios");
        //  window.webkit.messageHandlers.shareToWechat.postMessage(window.location.href,name,description,'朋友圈');
        var params = {
          address: dizhi,
          name: name,
          description: description,
          type: "FriendCircle"
        };
        console.log(params);
        // window.webkit.messageHandlers.shareToWechat.postMessage(window.location.href,name,description,'微信');
        this.$bridge.callhandler("shareToWechat", params, data => {
          // 处理返回数据
        });
      } else {
        console.log("我不是安卓也不是ios,我在哪");
      }
      this.showfen = false;
    },
    // 点击复制
    copyID() {
      var clipboard = new Clipboard(".fuzhi"); //绑定数据标签的类名
      clipboard.on("success", e => {
        console.log("复制成功", e);
        Toast.success("复制成功");
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        Toast.fail("该浏览器或手机权限不支持复制功能");
        // 释放内存
        clipboard.destroy();
      });
    },
    get_center() {
      request
        .post(this.$api + "/mobile/GetDistributionCenter", {})
        .then(res => {
          this.list = res.Data;
        })
        .catch(err => {});
    },
    tixian() {
      if (this.list.AccountBalance <= 0) {
        Toast("余额不足无法提现");
      } else {
        this.$router.push({
          path: "/fenxiao_tixian",
          query: {
            money: this.list.AccountBalance
          }
        });
      }
    }
  }
};
</script>
<style scoped lang='less'>
@base: 37.5rem;
.towechat {
  width: 100%;
  height: 200 / @base;
  background: #ffffff;
  border-radius: 10 / @base 10 / @base 0 0;
  .towechat_title {
    margin: 30 / @base auto;
    font-size: 15 / @base;
    text-align: center;
    color: #333333;
  }
  .towechat_box {
    width: 232 / @base;
    height: 70 / @base;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    .towechat_item {
      img {
        width: 48 / @base;
        height: 48 / @base;
        background-size: 100% 100%;
      }
      p {
        text-align: center;
        width: 100%;
        font-size: 12 / @base;
        color: #333333;
        margin-top: 8 / @base;
      }
    }
  }
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 56 / @base;
  font-size: 18px;
  color: #252525;
  letter-spacing: 0 / @base;
  z-index: 11;
  background: white;
  span {
    position: absolute;
    top: 21 / @base;
    right: 14 / @base;
    font-size: 12px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #9d80f3;
  }
  .img1 {
    position: absolute;
    top: 19 / @base;
    left: 13 / @base;
    width: auto;
    height: 21 / @base;
    background-size: 100% 100%;
  }
}
.jicheng {
  width: 100%;
  height: 56 / @base;
  margin-bottom: 2px;
}
.title {
  position: relative;
  display: flex;
  width: 100%;
  height: 68 / @base;
  //   border-bottom: 1px solid #e6e6e6;
  padding-left: 14 / @base;
  .mingxi {
    position: absolute;
    right: 14 / @base;
    top: 15 / @base;
    width: 47 / @base;
    height: 20 / @base;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #3e3e3e;
    font-size: 13px;
    border-radius: 20px;
  }
  .title_touxiang {
    width: 51 / @base;
    height: 51 / @base;
    border-radius: 50%;
    background-size: 100% 100%;
  }
  .title_middle {
    padding-left: 11 / @base;
    .name {
      margin-top: 2 / @base;
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: bold;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #3e3e3e;
      img {
        height: 17 / @base;
        width: auto;
        background-size: 100% 100%;
        margin-left: 5 / @base;
      }
    }
    .zhuan {
      display: flex;
      align-items: center;
      margin-top: 10 / @base;
      font-size: 12px;
      // font-weight: bold;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #3e3e3e;
      .fuzhi {
        margin-left: 7 / @base;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        border: solid 1px #b454ff;
        padding: 0.5 / @base 8 / @base;
        color: #b556ff;
        font-size: 10px;
        font-weight: normal;
      }
    }
  }
}
// Lunbo
/deep/.van-swipe-item {
}
.sw_box {
  padding-left: 10px;
  width: 100%;
  //   height: 133 / @base;
  .box {
    padding: 13 / @base 10 / @base;
    // height: 133 / @base;
    border-radius: 8px;
    .box_title {
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;
    }
    .get_price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 16 / @base;
      .price_left {
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 0px;
        color: #ffffff;
        span {
          margin-right: 5 / @base;
          font-size: 12px;
          letter-spacing: 0px;
          color: #ffffff;
        }
      }
      .price_right {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 20 / @base;
        padding: 0 / @base 7 / @base;
        background-color: #ffffff;
        border-radius: 15px;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        i {
          font-size: 7px;
        }
      }
    }
    .box_main {
      display: flex;
      color: #ffffff;
      width: 100%;
      margin-top: 21 / @base;
      .box_main_item {
        width: 50%;
        div {
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #ffffff;
        }
        p {
          margin-top: 8 / @base;
          font-size: 16px;
          font-weight: normal;
          letter-spacing: 0px;
          color: #ffffff;
          span {
            margin-right: 5 / @base;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #ffffff;
          }
        }
      }
    }
  }
}
// tab
.tab {
  display: flex;
  justify-content: space-between;
  margin: 22 / @base auto 0 auto;
  width: calc(~"100% - 40px");
  .tab_item {
    padding: 16 / @base 10 / @base 14 / @base 14 / @base;
    width: 160 / @base;
    background-color: #ffffff;
    box-shadow: 0px 2px 10px 0px rgba(160, 160, 160, 0.35);
    border-radius: 10px;
    img {
      height: 27 / @base;
      width: auto;
      background-size: 100% 100%;
    }
    .tab_son {
      margin-top: 23 / @base;
      display: flex;
      justify-content: space-between;
      .son_left {
        font-size: 14px;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #3e3e3e;
      }
      .son_right {
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #666666;
      }
    }
  }
}
/deep/ .van-popup {
  background: none;
}
.tan {
  width: 313 / @base;
  .tan_top {
    padding: 100 / @base 12 / @base 10/@base 12 / @base;
    width: 100%;
    min-height: 428 / @base;
    background: url("../../../assets/images/fenxiao_center_tan2.png") no-repeat;
    background-size: 100% 100%;
    border-radius: 10px;

    p {
      font-size: 13px;
      font-weight: normal;
      letter-spacing: 0px;
      color: #3e3e3e;
      line-height: 24 / @base;
      span {
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        color: #9c49fc;
      }
    }
  }
  .tan_error {
    margin: 15 / @base auto;
    width: 35 / @base;
    height: 35 / @base;
    background-size: 100% 100%;
  }
}
</style>