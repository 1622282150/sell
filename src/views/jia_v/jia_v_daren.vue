<template>
  <div>
    <header>
      <i @click="goback()" class="iconfont icon-zuojiantou"></i>
      <div class="head">美妆达人认证</div>
    </header>
    <div class="bu"></div>
    <div class="card_one">
      <p class="p1">
        美妆达人认证
        <img src="../../assets/images/jia_vv.png" alt />
      </p>
      <p class="p2">适用于在美妆领域有一定的知名度或创作过高质量美妆内容的用户</p>
    </div>
    <div class="hang">
      <img src="../../assets/images/jia_v_id.png" alt />
      <span style="margin-left:10px">身份认证</span>
      <div class="over" v-if="shenfen === ''" @click="$router.push('/realname')">去完成</div>
      <div class="over" v-else-if="shenfen === 'UnApprove'">审核未通过</div>
      <div class="isover" v-else-if="shenfen === 'UnAudit'">审核中</div>
      <div class="isover" v-else>已完成</div>
    </div>
    <div class="hang">
      <img class="img1" src="../../assets/images/jia_v_phone.png" alt />
      <span style="margin-left:14px">绑定手机</span>
      <div class="over" v-if="!haveMObile.length" @click="$router.push('/set_mobile')">去完成</div>
      <div class="isover" v-else>已完成</div>
    </div>
    <div class="hang">
      <img class="img2" src="../../assets/images/jia_v_shou.png" alt />
      <span style="margin-left:12px">满足下列其中一条：</span>
    </div>
    <div class="hang2">
      <div class="xuhao">1</div>
      <div class="middle">在本平台原创2篇美妆作品阅读量均达到10w+，点赞数5000</div>
      <!-- <div class="over">去完成</div> -->
    </div>
    <div class="hang2">
      <div class="xuhao">2</div>
      <div class="middle">其他平台美妆账号粉丝超过10万+</div>
      <div v-if="!this.list.length" class="over" @click="fans">去完成</div>
      <div v-else class="isover">已完成</div>
    </div>
    <div class="hang2">
      <div class="xuhao">3</div>
      <div class="middle">其他平台创作过单篇超过100万+阅读量的美妆内容</div>
      <div v-if="!this.list.length" class="over" @click="fans">去完成</div>
      <div v-else class="isover">已完成</div>
    </div>
    <div class="btn" v-if="isZancun != 'UnAudit'" @click="like">立刻申请成为美妆达人</div>
    <div class="btn" v-else>审核中</div>

    <img class="title_bottom" src="../../assets/images/jia_v_title.png" alt />
    <div class="title_box">
      <div class="title_item">
        <img src="../../assets/images/jia_v_b1.png" alt />
        <p class="p1">独家标识</p>
        <p class="p2">享有专属标识彰显独特身份</p>
      </div>
      <div class="title_item">
        <img src="../../assets/images/jia_v_b2.png" alt />
        <p class="p1">优先推荐</p>
        <p class="p2">内容优先推荐，增加曝光快速涨粉</p>
      </div>
      <div class="title_item">
        <img class="img" src="../../assets/images/jia_v_b3.png" alt />
        <p class="p11">创作奖励</p>
        <p class="p2">平台根据所发布作品的阅读量创作者进行相应金额奖励</p>
      </div>
    </div>
    <!-- 弹出层 -->
    <van-popup v-model="show">
      <div class="tan">
        <p class="p1">申请提交成功</p>
        <p class="p2">预计审核时间3个工作日</p>
        <div @click="show = false">我知道了</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Popup, Toast } from "vant";
import request from "@/utils/request";
export default {
  data() {
    return {
      show: false,
      haveMObile: "",
      shenfen: "",
      isZancun: "",
      isone: "",
      list: []
    };
  },
  mounted() {
    // console.log(window.localStorage.getItem('mobile'))
    // this.haveMObile=window.localStorage.getItem('mobile')
    // this.shenfen=window.localStorage.getItem('shenfen')
    this.getstatus();
    // this.getuserinfo()
    // if(this.haveMObile.length){
    //   console.log('有')
    // }else{
    //   console.log('没')
    // }
  },
  methods: {
    // 申请成为美妆达人
    like() {
      //
      console.log(this.list);
      if (
        this.haveMObile.length &&
        this.shenfen != "" &&
        this.list.OtherStatus != ""
      ) {
        request
          .post(this.$api + "/mobile/UpdatePlusVCertificationStatus", {
            Id: this.list[0].Id
          })
          .then(res => {
            if (res.IsSuccess) {
              this.show = true;
              this.getstatus();
            }
          })
          .catch(err => {});
      } else {
        Toast("信息不完整");
      }
    },
    getstatus() {
      request
        .post(this.$api + "/mobile/MyPlusVCertification", {
          Type: "美妆达人认证"
        })
        .then(res => {
          this.list = res.Data.ListData;
          this.shenfen = res.Data.IdCardStatus;
          console.log(this.list);
          this.haveMObile = res.Data.Mobile;
          //  var OtherType=res.Data.ListData[0].OtherType
          this.isZancun = res.Data.ListData[0].Status;
          //  if(OtherType == '1'){
          //    this.isone=1
          //  }else if(OtherType == '2'){
          //     this.isone=2
          //  }
        })
        .catch(err => {});
    },
    getuserinfo() {
      request
        .post(this.$api + "/mobile/GetUserInfo")
        .then(res => {
          // window.localStorage.setItem("mobile", res.Data.Mobile);
          // window.localStorage.setItem("shenfen", res.Data.IdCardStatus);
        })
        .catch(err => {
          console.log(err);
        });
    },
    goback() {
      this.$router.back();
    },
    fans() {
      if (this.haveMObile.length && this.shenfen != "") {
        this.$router.push({
        path: "/jia_v_daren_fans",
        query: {
          title: 1
        }
      });
      } else {
        Toast('请先完成前两步')
      }

      
    },
    read() {
      this.$router.push({
        path: "/jia_v_daren_fans",
        query: {
          title: 2
        }
      });
    }
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
// tanchuang
.tan {
  width: 519 / @base;
  height: 597 / @base;
  border-radius: 20 / @base;
  background: url("../../assets/images/jia_v_tan.png") no-repeat;
  background-size: 100% 100%;
  padding-top: 343 / @base;
  .p1 {
    font-size: 28 / @base;
    color: #191919;
    font-weight: bold;
    text-align: center;
  }
  .p2 {
    margin-top: 28 / @base;
    font-size: 24 / @base;
    color: #666666;
    text-align: center;
  }
  div {
    margin-top: 39 / @base;
    width: 440 / @base;
    height: 80 / @base;
    line-height: 80 / @base;
    border-radius: 40 / @base;
    margin: 39 / @base auto 0 auto;
    text-align: center;
    font-size: 36 / @base;
    color: #fff;
    background-image: linear-gradient(0deg, #8f23e3 0%, #9b81f3 100%);
    box-shadow: 0 12 / @base 24 / @base 0 rgba(40, 45, 200, 0.27);
  }
}
header {
  width: 100%;
  position: relative;
  // background:#B694E8;
  z-index: 1;
  i {
    position: fixed;
    left: 30 / @base;
    top: 30 / @base;
    font-size: 50 / @base;
    color: black;
    z-index: 11;
  }
  .head {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100 / @base;
    background: #fff;
    font-size: 35 / @base;
    text-align: center;
    line-height: 100 / @base;
    border-bottom: 1px solid #e6e6e6;
  }
}
.bu {
  width: 100%;
  height: 100 / @base;
}
.card_one {
  position: relative;
  width: 670 / @base;
  background: url("../../assets/images/jia_v_title1.png") no-repeat;
  background-size: 100% 100%;
  box-shadow: 0px 20 / @base 40 / @base 0px rgba(160, 92, 225, 0.25);
  border-radius: 10 / @base;
  margin: 35 / @base auto;
  padding: 32 / @base 0 34 / @base 34 / @base;
  .p1 {
    font-size: 36 / @base;
    color: #ffffff;
    // font-family: "PingFangBold";
    img {
      display: inline-block;
      width: 24 / @base;
      height: 21 / @base;
      margin-left: 10 / @base;
    }
  }
  .p2 {
    width: 415 / @base;
    font-size: 26 / @base;
    color: #ffffff;
    margin-top: 18 / @base;
  }
}
.hang {
  position: relative;
  width: 89%;
  margin: 0 auto;
  border-bottom: 1px solid #e6e6e6;
  font-size: 0;
  height: 105 / @base;
  line-height: 105 / @base;
  overflow: hidden;

  img {
    display: inline-block;
    width: 31 / @base;
    height: 23 / @base;
    background-size: 100% 100%;
  }
  .img1 {
    display: inline-block;
    width: 23 / @base;
    height: 31 / @base;
    background-size: 100% 100%;
  }
  .img2 {
    display: inline-block;
    width: 28 / @base;
    height: 32 / @base;
    background-size: 100% 100%;
  }
  span {
    // font-family: "PingFangBold";
    font-size: 30 / @base;
    color: #262525;
  }
  .over {
    float: right;
    width: 100 / @base;
    height: 43 / @base;
    line-height: 43 / @base;
    border: solid 2 / @base #8d26e3;
    font-size: 26 / @base;
    color: #8e22e2;
    margin-top: 31 / @base;
    text-align: center;
    border-radius: 10 / @base;
  }
  .isover {
    float: right;
    // line-height: 43 / @base;
    font-size: 26 / @base;
    color: #a6a6a6;
  }
}
.hang2 {
  position: relative;
  display: flex;
  width: 89%;
  margin: 0 auto;
  border-bottom: 1px solid #e6e6e6;
  height: 105 / @base;
  .isover {
    position: absolute;
    right: 0;
    line-height: 105 / @base;
    // line-height: 43 / @base;
    font-size: 26 / @base;
    color: #a6a6a6;
  }
  .xuhao {
    margin-top: 37 / @base;
    margin-left: 75 / @base;
    width: 30 / @base;
    height: 30 / @base;
    line-height: 29 / @base;
    border-radius: 50%;
    text-align: center;
    font-size: 30 / @base;
    color: #bb7bef;
    border: 1px solid #bb7bef;
  }
  .middle {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    margin-left: 10 / @base;
    font-size: 24 / @base;
    width: 378 / @base;
    height: 105 / @base;
  }
  .over {
    position: absolute;
    top: 31 / @base;
    right: 0;
    width: 100 / @base;
    height: 43 / @base;
    line-height: 43 / @base;
    border: solid 2 / @base #8d26e3;
    font-size: 26 / @base;
    color: #8e22e2;
    text-align: center;
    border-radius: 10 / @base;
  }
}
.btn {
  width: 444 / @base;
  height: 84 / @base;
  text-align: center;
  line-height: 84 / @base;
  border-radius: 42 / @base;
  font-size: 36 / @base;
  color: #fff;
  margin: 80 / @base auto 0 auto;
  background: url("../../assets/images/jia_v_btn.png") no-repeat;
  background-size: 100% 100%;
}
// 下边的部分
.title_bottom {
  width: 45%;
  height: 30 / @base;
  margin: 105 / @base auto 83 / @base auto;
}
.title_box {
  width: 100%;
  padding: 0 44 / @base 120 / @base 44 / @base;
  display: flex;
  justify-content: space-around;
  .title_item {
    width: 30%;
    text-align: center;
    img {
      width: 63 / @base;
      height: 60 / @base;
      background-size: 100% auto;
      margin: 0 auto;
    }
    .img {
      width: 50 / @base;
      height: 80 / @base;
      background-size: 100% auto;
      margin: 0 auto;
    }
    .p11 {
      font-size: 28 / @base;
      font-weight: bold;
      color: #333333;
      margin-top: 15 / @base;
      text-align: center;
    }
    .p1 {
      font-size: 28 / @base;
      font-weight: bold;
      color: #333333;
      margin-top: 35 / @base;
      text-align: center;
    }
    .p2 {
      font-size: 22 / @base;
      color: #666666;
    }
  }
}
</style>