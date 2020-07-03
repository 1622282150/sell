<template>
  <div>
    <header>
      <i @click="back" class="iconfont icon-zuojiantou"></i>
      <div class="head">支付设置</div>
    </header>
    <div class="bu"></div>

    <div class="box_item" v-if="userinfo.IdCardStatus != '正常'" @click="todetail('/realname')">
      <div class="item_left">
        <img src="../../../assets/images/payment_1.png" alt />
        <p>实名认证</p>
      </div>
      <div class="item_right">
        <!-- <img class="shiming" src="../../../assets/images/payment_over.png" alt=""> -->
        <p>上传认证资料</p>
        <i class="iconfont icon-youjiantou"></i>
      </div>
    </div>
    <div class="box_item" v-else>
      <div class="item_left">
        <img src="../../../assets/images/payment_1.png" alt />
        <p>实名认证</p>
      </div>
      <div class="item_right">
        <img class="shiming" src="../../../assets/images/payment_over.png" alt />
        <p>认证完成</p>
        <i class="iconfont icon-youjiantou"></i>
      </div>
    </div>
    <div class="box_item" @click="todetail('/payment_before_pwd')">
      <div class="item_left">
        <img src="../../../assets/images/payment_2.png" alt />
        <p>支付密码设置</p>
      </div>
      <div class="item_right">
        <!-- <img class="shiming" src="../../../assets/images/payment_over.png" alt=""> -->
        <p>去设置</p>
        <i class="iconfont icon-youjiantou"></i>
      </div>
    </div>
    <div class="box_item" @click="todetail('/zhifu')">
      <div class="item_left">
        <img src="../../../assets/images/payment_3.png" alt />
        <p>
          支付宝
        </p>
      </div>
      <div class="item_right">
        <!-- <img class="shiming" src="../../../assets/images/payment_over.png" alt=""> -->
        <p v-if="haveAccount ===false">去设置</p>
        <p v-else>去修改</p>
        <i class="iconfont icon-youjiantou"></i>
      </div>
    </div>
    <!-- <div class="box_item" @click="todetail('/wechat_binding')">
      <div class="item_left">
        <img src="../../../assets/images/payment_4.png" alt="">
        <p>微信</p>
      </div>
      <div class="item_right">
        <p v-if="userinfo.WeChatId === ''">去绑定</p>
        <p v-else>去修改</p>
        <i class="iconfont icon-youjiantou"></i>
      </div>
    </div>-->
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      id:0,
      haveAccount: false,
      account: "",
     havePhone: false, //是否有绑定号码
      list: [
        {
          img: require("../../../assets/images/payment_1.png"),
          name: "实名认证",
          des: "上传认证资料",
          src: "/realname"
        },
        {
          img: require("../../../assets/images/payment_2.png"),
          name: "支付密码设置",
          des: "去设置",
          src: "/payment_password_set"
        },
        {
          img: require("../../../assets/images/payment_3.png"),
          name: "支付宝",
          des: "去绑定",
          src: "/alipay_binding"
        },
        {
          img: require("../../../assets/images/payment_4.png"),
          name: "微信",
          des: "去绑定",
          src: "/wechat_binding"
        }
        // {img:require('../../../assets/images/payment_5.png'),name:'银行卡',des:'去绑定',src:'/realname'},
      ],
      yishiming: false,
      userinfo: [], //个人信息
      password: ""
    };
  },
  mounted() {
    this.getuserinfo();
    this.getAccount();
    // this.getpsd()
  },
  methods: {
    back() {
      console.log("我是子组件返回");
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        // on close
        console.log("我是要去安卓");
        // let url='http://test1.merrychange.net/#/articlestie?id='+this.articleid
        window.android.closePage();
        this.$router.back();
      } else {
        this.$router.back(-1);
      }
    },
     // 获取当前是否绑定手机号
    getPhone() {
      request
        .post(this.$api + "/mobile/GetUserMobile", {})
        .then(res => {
          this.havePhone=res.Data.Flag
        })
        .catch(err => {});
    },
    todetail(src) {
      if(src == '/zhifu'){
        //  有绑定过
        if(this.havePhone){
          this.$router.push({
            path:'/payment_bang_hp',
            query:{
              id:this.id
            }
          })
        }else{
          // 没有绑定
          this.$router.push('/payment_before_np')
        }
      }else{
        this.$router.push(src)
      }
    },
    // huo获取我的信息
    getuserinfo() {
      request
        .post(this.$api + "/mobile/GetUserInfo")
        .then(res => {
          this.userinfo = res.Data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //   获取绑定账户
    //   获取绑定账户
    getAccount() {
      request
        .post(this.$api + "/mobile/GetPayBindAccount", {})
        .then(res => {
          if (res.Data.List.length == 0) {
            this.haveAccount = false;
          } else {
            this.haveAccount = true;
            this.id=res.Data.List[0].Id
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
  width: 100%;
  position: relative;
  // z-index: 10;
  i {
    position: fixed;
    left: 30 / @base;
    top: 30 / @base;
    font-size: 50 / @base;
    color: black;
    z-index: 11;
  }
  .head {
    // position: fixed;
    // top: 0;
    width: 100%;
    height: 100 / @base;
    background: white;
    font-size: 35 / @base;
    text-align: center;
    line-height: 100 / @base;
    border-bottom: 1px solid #e6e6e6;
  }
}
.bu {
  width: 100%;
  height: 15 / @base;
  background: #eeeeee;
}
.box_item {
  display: flex;
  width: 100%;
  height: 90 / @base;
  border-bottom: 1px solid #e6e6e6;
  padding: 0 40 / @base;
  .item_left {
    display: flex;
    width: 65%;
    height: 90 / @base;
    line-height: 90 / @base;
    img {
      margin: auto 0;
      width: 36 / @base;
      height: 36 / @base;
      background-size: 100% 100%;
    }
    p {
      // font-family: 'PingFangRegular';
      font-size: 30 / @base;
      font-weight: bold;
      font-stretch: normal;
      color: #3c3c3c;
      margin-left: 21 / @base;
    }
  }
  .item_right {
    // display: flex;
    font-size: 0;
    width: 35%;
    height: 90 / @base;
    line-height: 90 / @base;
    text-align: right;
    .shiming {
      display: inline-block;
      width: 20 / @base;
      height: 20 / @base;
      background-size: 100% 100%;
    }
    p {
      margin-right: 4 / @base;
      display: inline-block;
      font-size: 24 / @base;
      font-weight: bold;
      font-stretch: normal;
      // letter-spacing: -1px;
      color: #939393;
    }
    i {
      width: 18 / @base;
      height: 32 / @base;
      margin-top: 3 / @base;
    }
  }
}
</style>