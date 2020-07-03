<template>
  <div>
    <!-- 头部标题 -->
    <div class="header">
      积分抽奖
      <img @click="$router.back()" class="img1" src="../../../assets/images/newfan.png" alt />
      <!-- <i @click="showfen = true" class="iconfont icon-fenxiang2"></i> -->
    </div>
    <!-- 页面主要部分 -->
    <div class="main">
      <div class="wheel-box">
        <!-- 转盘指针 -->
        <div class="wheel-pointer" @click="rotate_handle()">
          <p class="p1">点击抽奖</p>
          <p class="p2">({{list.Points}}积分/次)</p>
        </div>
        <div class="wheel-bg" :style="{transform:rotate_angle,transition:rotate_transition}">
          <div class="gift-list" v-if="giftList.length">
            <div class="award-item" v-for="(item,index) in giftList" :key="index">
              {{item.Name}}
              <img :src="item.Img" alt />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <p class="foot_p">
      当前积分:
      <span>{{jifen}}</span>
    </p>
    <div class="foot_btn">
      <swiper
        auto
        height="35px"
        direction="vertical"
        :interval="3000"
        class="text-scroll"
        :loop="true"
        :show-dots="false"
      >
        <swiper-item v-for="(item,index) in swiper_list" :key="index">
          <p>
            恭喜 {{item.UserName}} 获得了
            <span>{{item.PrizeName}}</span>
          </p>
        </swiper-item>
      </swiper>
    </div>
    <!-- 弹窗 -->
    <van-popup v-model="show">
      <div v-if="getlist.Type === 1" class="tan">
        <div class="tan_top">
          <div class="tan_box">
            <div class="tan_box_left">
              <img :src="getlist.Img" alt />
            </div>
            <div class="tan_box_right">{{getlist.Name}}</div>
          </div>
          <p>
            <span>领取方式:</span>点击
            <span>查看奖品</span>或进入
            <span>我的</span>页面--
            <span>未发货</span>领取奖品
          </p>
          <div class="tan_btn">
            <div class="tan_btn_left" @click="show = false"></div>
            <div class="tan_btn_right" @click="$router.push('/jifen_card')"></div>
          </div>
        </div>
        <div @click="show = false" class="tan_close"></div>
      </div>
      <div v-else class="tan">
        <div class="tan_top">
          <div class="tan_box2">
            <div>{{getlist.Name}}</div>
          </div>
          <div class="tan_btn2">
            <div @click="show = false"></div>
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 活动结束弹窗 -->
  </div>
</template>

<script>
import request from "@/utils/request";
import { Toast, Dialog, Popup } from "vant";
import { Swiper, SwiperItem } from "vux";
export default {
  components: {
    Swiper,
    SwiperItem
  },
  data() {
    return {
      code: "",
      jifen: 0,
      show: false, //弹窗
      showfen: false, //分享
      swiper_list: [], //底部轮播
      list: [], //总列表
      giftList: [], //奖项列表
      getlist: [], //中奖数组
      start_rotating_degree: 0, //初始旋转角度
      rotate_angle: 0, //将要旋转的角度
      rotate_transition: "transform 5s ease-in-out", //初始化选中的过渡属性控制
      click_flag: true, //是否可以旋转抽奖
      prize_index: 0 //奖品下标
    };
  },
  mounted() {
    this.code = this.$route.query.sign;
    this.get_giftlist();
    this.get_swiper();
  },
  methods: {
    get_swiper() {
      request
        .post(this.$api + "/mobile/GetLotteryUserPrizeList", {
          Code: "70f104abf44347f3be236453f82ab34b"
        })
        .then(res => {
          this.swiper_list = res.Data.List;
        })
        .catch(err => {});
    },
    rotate_handle() {
      if (!this.click_flag) return;
      // this.prize_index = Math.floor(Math.random() * 9); //指定每次旋转停止时的奖品下标
      request
        .post(this.$api + "/mobile/BeginRunLottery", {
          Id: this.list.Id,
          PNo: this.list.PNo,
          Sign: this.list.Sign
        })
        .then(res => {
          if (res.IsSuccess) {
            this.jifen=this.jifen-this.list.Points
            this.getlist = res.Data.Prize;
            var key = res.Data.Prize.LotteryPrizeId;
            console.log("key", key);
            for (let i = 0; i < this.giftList.length; i++) {
              if (key == this.giftList[i].Id) {
                // console.log('抽中了索引',i)
                this.prize_index = i;
                console.log("suoyin", this.prize_index);
                var during_time = 5000; //旋转时间
                var result_index = this.prize_index; // 最终要旋转到奖项
                var result_angle = [0, -45, -90, -135, -180, -225, -270, -315]; //最终会旋转到下标的位置所对应的度数
                var rand_circle = 6; // 附加多转几圈
                this.click_flag = false; // 旋转结束前，不允许再次触发
                // 转盘旋转
                var rotate_angle =
                  this.start_rotating_degree +
                  rand_circle * 360 +
                  result_angle[result_index] -
                  (this.start_rotating_degree % 360);
                this.start_rotating_degree = rotate_angle;
                this.rotate_angle = "rotate(" + rotate_angle + "deg)";
                console.log(
                  "初始旋转的角度" + rotate_angle,
                  this.start_rotating_degree,
                  rand_circle * 360,
                  result_angle[result_index],
                  this.start_rotating_degree % 360
                );
                // 旋转结束后，允许再次触发
                setTimeout(() => {
                  this.jifen = res.Data.CurrentPoints;
                  console.log("类型", this.getlist.Type);
                  if (this.getlist.Type == 0) {
                    this.click_flag = true;
                  } else {
                    this.show = true;
                    this.click_flag = true;
                  }
                }, during_time + 500); // 延时，保证转盘转完
              }
            }
          } else {
            Toast(res.Message);
          }
        })
        .catch(err => {});
    },
    get_giftlist() {
      request
        .post(this.$api + "/mobile/GetLotteryActivity", {
          Code: this.code
        })
        .then(res => {
          if (res.IsSuccess) {
            this.list = res.Data;
            this.giftList = res.Data.PrizeList;
            this.jifen = res.Data.CurrentPoints;
          } else {
            Dialog.alert({
              message: res.Message
            }).then(() => {
              this.$router.back();
            });
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped lang='less'>
@base: 37.5rem;
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
  .img1 {
    position: absolute;
    top: 19 / @base;
    left: 13 / @base;
    width: auto;
    height: 21 / @base;
    background-size: 100% 100%;
  }
  i {
    position: absolute;
    top: 18 / @base;
    right: 17 / @base;
    // width: 15 / @base;
    // height: 15 / @base;
    font-size: 20px;
    // font-weight: bold;
    // background-size: 100% 100%;
  }
  .img3 {
    position: absolute;
    top: 21 / @base;
    right: 50 / @base;
    width: 15 / @base;
    height: 14 / @base;
    background-size: 100% 100%;
  }
}
.main {
  position: fixed;
  top: 56 / @base;
  bottom: 0;
  width: 100%;
  background: url("../../../assets/images/jifen_turntable.png") no-repeat;
  background-size: 100% 100%;
  .wheel-box {
    position: relative;
    width: 330 / @base;
    height: 368 / @base;
    background: url(../../../assets/images/jifen_turntable_box.png) no-repeat
      center/cover;
    background-size: 100% 100%;
    margin: 30% auto 0 auto;
    z-index: 9;
    .wheel-pointer {
      width: 87.5 / @base;
      height: 91 / @base;
      background: url(../../../assets/images/jifen_turntable_btn.png) no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: 49%;
      left: 50%;
      transform: translate(-50%, -63%) scale(0.8);
      z-index: 99;
      .p1 {
        margin-top: 31/@base;
        font-size: 14 / @base;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ff8229;
        text-align: center;
      }
      .p2 {
        font-size:8/ @base;
        font-weight: normal;
        letter-spacing: 0px;
        color: #ff8229;
        text-align: center;
      }
    }
    .wheel-bg {
      width: 295 / @base;
      height: 295 / @base;
      position: absolute;
      top: 19 / @base;
      right: 17 / @base;
      z-index: 95;
      background: url("../../../assets/images/jifen_turntable_box3.png")
        no-repeat center/cover;
      .gift-list {
        width: 100%;
        height: 100%;
        position: relative;
        /* border: 1px solid #fff; */
        .award-item {
          width: 80 / @base;
          height: 148 / @base;
          font-size: 12 / @base;
          color: red;
          position: absolute;
          left: 50%;
          // display: flex;
          // flex-direction: column;
          // justify-content: center;
          // align-items: flex-start;
          padding-top: 17px;
          // writing-mode: vertical-lr; /*文字竖排*/
          text-align: center;
          transform-origin: center bottom;
          // border: 1px solid blue;
          img {
            width: 30 / @base;
            height: 30 / @base;
            background-size: 100% 100%;
            margin: 22 / @base auto 0 auto;
          }
          &:nth-child(1) {
            transform: translateX(-50%) rotate(0);
          }
          &:nth-child(2) {
            transform: translateX(-50%) rotate(45deg);
          }
          &:nth-child(3) {
            transform: translateX(-50%) rotate(90deg);
          }
          &:nth-child(4) {
            transform: translateX(-50%) rotate(135deg);
          }
          &:nth-child(5) {
            transform: translateX(-50%) rotate(180deg);
          }
          &:nth-child(6) {
            transform: translateX(-50%) rotate(225deg);
          }
          &:nth-child(7) {
            transform: translateX(-50%) rotate(270deg);
          }
          &:nth-child(8) {
            transform: translateX(-50%) rotate(315deg);
          }
        }
      }
    }
  }
}
.foot_p {
  width: 100%;
  position: fixed;
  bottom: 76 / @base;
  text-align: center;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #fffefe;
  span {
    color: #ffe358;
  }
}
.foot_btn {
  position: fixed;
  bottom: 29 / @base;
  left: 3%;
  width: 94%;
  height: 35px;
  background-color: #b795e9;
  border-radius: 35px;
  p {
    letter-spacing: 0px;
    color: #ffffff;
    font-size: 12px;
    text-align: center;
    line-height: 35px;
    span {
      color: #ff2e0c;
      margin-left: 3 / @base;
    }
  }
}
/deep/.van-popup {
  background: none;
}
.tan {
  width: 325 / @base;
  height: 455 / @base;
  // background: red;
  background: none;
  .tan_top {
    padding-top: 145 / @base;
    width: 100%;
    height: 405 / @base;
    background: url("../../../assets/images/jifen_turntable_tan2.png") no-repeat;
    background-size: 100% 100%;
    .tan_box {
      display: flex;
      margin: 0 auto;
      width: 264 / @base;
      height: 123 / @base;
      background: rgba(250, 250, 250, 0.5);
      border-radius: 20px;
      .tan_box_left {
        width: 50%;
        height: 100%;
        img {
          width: 93 / @base;
          height: 93 / @base;
          background-size: 100% 100%;
          margin: 15 / @base auto;
        }
      }
      .tan_box_right {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        width: 50%;
        height: 100%;
        color: #191919;
      }
    }
    .tan_box2 {
      display: flex;
      justify-content: center;
      align-items: center;
      color: red;
      margin: 0 auto;
      width: 264 / @base;
      height: 123 / @base;
      background: rgba(250, 250, 250, 0.5);
      border-radius: 20px;
    }
    p {
      margin: 13 / @base auto 31 / @base auto;
      width: 264 / @base;
      font-size: 12px;
      line-height: 21px;
      span {
        color: #a200e4;
      }
    }
    .tan_btn {
      margin: 0 auto;
      width: 264 / @base;
      height: 40 / @base;
      display: flex;
      justify-content: space-between;
      .tan_btn_left {
        width: 128 / @base;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        font-size: 14px;
        background: url("../../../assets/images/jifen_turntable_b1.png")
          no-repeat;
        background-size: 100% 100%;
        border-radius: 20px;
      }
      .tan_btn_right {
        width: 128 / @base;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        font-size: 14px;
        background: url("../../../assets/images/jifen_turntable_b2.png")
          no-repeat;
        background-size: 100% 100%;
        border-radius: 20px;
      }
    }
    .tan_btn2 {
      margin: 40 / @base auto;
      width: 264 / @base;
      height: 40 / @base;
      display: flex;
      justify-content: center;
      div {
        width: 128 / @base;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        background: url("../../../assets/images/jifen_turntable_b1.png")
          no-repeat;
        background-size: 100% 100%;
        border-radius: 20px;
      }
    }
  }

  .tan_close {
    width: 36 / @base;
    height: 36 / @base;
    background: url("../../../assets/images/jifen_turntable_close.png")
      no-repeat;
    background-size: 100% 100%;
    margin: 13 / @base auto auto auto;
  }
}
</style>