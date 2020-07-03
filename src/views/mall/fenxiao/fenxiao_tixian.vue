<template>
  <div>
    <div class="header">
      提现
      <img @click="$router.back()" class="img1" src="../../../assets/images/newfan.png" alt />
    </div>
    <div class="jicheng"></div>
    <!-- 灰色盒子 -->
    <div class="box">
      <div class="box_title" @click="tobang" v-if="!haveAccount">
        <div class="title_left">
          <i class="iconfont icon-jiahao"></i>添加支付宝账户
        </div>
        <div class="title_right">
          <i class="iconfont icon-youjiantou"></i>
        </div>
      </div>
      <div class="box_title" v-else>
        <div class="title_left">
          <i class="iconfont icon-zhifubao" style="color:#009ee9;width:16px;height:16px"></i>支付宝
          <span style="color: #999999;">(账号: {{AccountInfo[0].ThreeAccountId}})</span>
        </div>
        <div class="title_right">
          <i class="iconfont icon-youjiantou"></i>
        </div>
      </div>
      <div class="main">
        <p class="main_title">提现金额</p>
        <div class="main_input">
          <div>¥</div>
          <input id="datePicker" type="tel" v-model="text" @blue="shijin" @focus="jine" />
        </div>
        <div class="line"></div>
        <!-- <p class="main_all">
          可用金额¥{{money}},
          <span>全部提现</span>
        </p> -->
        <div class="btn" v-if="!allright">提现</div>
        <div @click="tixian" class="btn" style="background:#cb7bfd" v-else>提现</div>
      </div>
    </div>
    <!-- 弹窗 -->
    <van-popup v-model="show" closeable :close-on-click-overlay="false">
      <div class="tanp">
        <p class="tan_title">请输入提现密码</p>
        <van-password-input :value="value" :focused="true" @focus="showKeyboard = true" />
        <div @click="over" class="xia" style="background:#c976ff;">完成</div>
      </div>
    </van-popup>
    <van-number-keyboard
      :z-index="1000000"
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />
    <van-number-keyboard
      :show="showjin"
      theme="custom"
      extra-key="."
      close-button-text="完成"
      @blur="showjin = false"
      @input="onInput1"
      @delete="onDelete1"
    />
  </div>
</template>

<script>
import request from "@/utils/request";
import { Toast, Popup, PasswordInput, NumberKeyboard } from "vant";
export default {
  data() {
    return {
      show: false, //控制弹窗
      showjin: false, //控制金额键盘
      value: "", //提现输入的密码
      showKeyboard: false,
      haveAccount: false, //是否绑定账户
      havePhone: false, //是否绑定手机
      havePsd: false, //是否设置支付密码
      AccountInfo: [], //绑定的账户信息
      allright: false,
      text:'', //绑定输入框的价钱,
      tel: "",
      money:0
    };
  },
  watch: {
    text(newName, oldName) {
      if (this.text && this.haveAccount) {
        this.allright = true;
      } else {
        this.allright = false;
      }
    }
  },
  mounted() {
    this.money = this.$route.query.money;
    this.getAccount(); //获取支付宝号码
    this.getPhone(); //获取电话
    this.getpsd(); //获取支付密码
  },
  methods: {
    tobang(){
      console.log(this.havePhone)
      if(!this.havePhone){
        console.log('我是没有')
        this.$router.push('/fenxiao_before_np')
      }else{
        console.log('我是有')
        this.$router.push('/fenxiao_bang_hp')
      }
    },
    //金额
    jine() {
      document.activeElement.blur();
      this.showjin = true;
    },
    shijin() {
      this.showjin = false;
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    onInput1(key) {
      this.text = this.text + key;
    },
    onDelete1() {
      this.text = this.text.slice(0, this.text.length - 1);
    },
    over() {
      // 点击完成  开始提现
      request
        .post(this.$api + "/mobile/ApplyUserWithdrawal", {
          UserBindThreeAccountId:this.AccountInfo[0].Id,
          Money: this.text,
          Pwd: this.value,
          Type: 1,
          Message: ""
        })
        .then(res => {
          if (res.IsSuccess) {
            //  提现成功,跳走
            this.$router.push({
              path: "/fenxiao_tixian_over",
              query: {
                start: res.Data.ApplyDate,
                finish: res.Data.PreFinishDate,
                money: res.Data.Money,
                account: res.Data.BindAccount
              }
            });
          } else {
            this.value = "";
            this.showKeyboard = false;
            this.show = false;
            Toast(res.Message);
          }
        })
        .catch(err => []);
    },
    //   提现
    tixian() {
      if (!this.havePsd) {
        // 去设置支付密码
        console.log("去设置支付密码");
        this.$router.push("/fenxiao_before_pwd");
      } else {
        //可提现
        console.log('text',this.text,'money',this.money)
        if (Number(this.text) > Number(this.money)) {
          Toast("提现金额不能大于余额");
        } else {
          this.show = true;
          this.showKeyboard = true;
        }
      }
    },
    //   获取绑定账户
    getAccount() {
      request
        .post(this.$api + "/mobile/GetPayBindAccount", {})
        .then(res => {
          if (res.Data.List.length == 0) {
            this.haveAccount = false;
          } else {
            this.haveAccount = true;
            this.AccountInfo = res.Data.List;
          }
        })
        .catch(err => {});
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
    // 获取是否绑定支付密码
    getpsd() {
      request
        .post(this.$api + "/mobile/CheckSetPayPwdFlag", {})
        .then(res => {
          this.havePsd = res.Data.Flag;
          console.log(this.havePsd);
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
.box {
  position: fixed;
  top: 56 / @base;
  bottom: 0;
  width: 100%;
  background: #f5f5f5;
  .box_title {
    margin: 10 / @base 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 39 / @base;
    background: white;
    font-size: 13px;
    font-weight: bold;
    color: #3e3e3e;
    padding: 0 22 / @base;
    .title_left {
      display: flex;
      align-items: center;
      i {
        margin-right: 7 / @base;
        font-size: 18px;
      }
    }
    .title_right {
      i {
        font-size: 15px;
      }
    }
  }
  .main {
    width: 100%;
    padding: 25 / @base 20 / @base 15 / @base 20 / @base;
    background: #ffffff;
    .main_title {
      font-size: 13px;
      letter-spacing: 1px;
      color: #3e3e3e;
    }
    .main_input {
      margin-top: 20 / @base;
      display: flex;
      height: 52/@base;
      align-items: center;
      font-size: 26px;
      font-weight: bold;
      color: #3c3c3c;
      // padding-bottom: 26/@base;
      input {
        border: none;
        margin-left: 20 / @base;
      }
    }
    .line {
      width: 100%;
      height: 1px;
      background: #e6e6e6;
      margin-top: 0/ @base;
    }
    .main_all {
      margin-top: 7 / @base;
      font-size: 11px;
      font-weight: bold;
      letter-spacing: 1px;
      color: #999999;
      span {
        color: #9c49fc;
      }
    }
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 175 / @base;
      height: 30 / @base;
      background-color: #c4c4c4;
      border-radius: 5px;
      color: #ffffff;
      font-size: 15px;
      letter-spacing: 1px;
      margin: 28 / @base auto 0 auto;
    }
  }
}
/deep/ .van-popup {
  border-radius: 10px;
}
.tanp {
  width: 280 / @base;
  min-height: 1 / @base;
  padding-top: 40 / @base;
  .tan_title {
    font-size: 14px;
    color: #999999;
    text-align: center;
    margin-bottom: 15 / @base;
  }
  .xia {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 175 / @base;
    height: 30 / @base;
    background-color: #c4c4c4;
    border-radius: 10 / @base;
    font-size: 15px;
    font-weight: bold;
    letter-spacing: 1px;
    color: #ffffff;
    margin: 20 / @base auto;
  }
}
</style>
