<template>
  <div>
    <div class="box">
      <p class="title1">用科技去定制美丽</p>
      <p class="title2">教你如何用手机</p>
      <p class="title3">来高效管理皮肤</p>
      <!-- 未完成状态 -->
      <div class="main2" v-if="!over">
        <div class="hang1">
          <i class="iconfont icon-shouji"></i>
          <input type="text" v-model="tel" placeholder="请输入手机号码" />
        </div>
        <div class="hang2">
          <div class="left">
            <i class="iconfont icon-yanzhengma2"></i>
            <input v-model="code" placeholder="请输入验证码" type="text" />
          </div>
          <button ref="btn" @click="getcode" :disabled="disabled">{{btntxt}}</button>
        </div>
        <div class="hang3">
          <i class="iconfont icon-mima"></i>
          <input v-model="password" placeholder="请输入密码" type="text" />
        </div>
        <div class="zhuce" @click="zhuce">立即注册</div>
      </div>
      <!-- 完成时 -->
      <div class="main" v-else>
        <img class="img" src="../../../assets/images/code_dui.png" alt />
        <p class="success">注册成功</p>
        <p class="tishi">
          *
          <span>温馨提示</span>*
        </p>
        <p class="tequan">
          您已获得
          <span>商城购物95折优惠特权</span>
        </p>
        <p class="baohan">(不包含个人橱窗商品)</p>
      </div>
      <div class="bottom">
        <img src="../../../assets/images/invite_code.png" alt />
        <div class="right">
          <p class="p1">扫描二维码或</p>
          <p class="p2">点击"下载APP"进行下载</p>
          <div class="btn" @click="xiazai">下载APP</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      invite: "",//邀请码
      over: false,
      tel:'',//电话
      code:'',//验证码
      password:'',//密码
      btntxt: "获取验证码",
      disabled: false,
      time: 0
    };
  },
  mounted() {
    console.log(this.getQueryString("pay"));
    this.invite = this.getQueryString("pay");
  },
  methods: {
    getQueryString(name, search) {
      search =
        search ||
        window.location.search.substr(1) ||
        window.location.hash.split("?")[1];
      let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      let r = search.match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    xiazai() {
      window.location.href = "http://html.kjmrmqj.com/";
    },
      // 获取验证码
    getcode() {
      var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[0-9]|18[0-9]|19[0-9]|14[57])[0-9]{8}$/;
      if (this.tel == "") {
        Toast("手机号不能为空");
      } else if (!reg.test(this.tel)) {
        Toast("手机号格式不正确");
      } else {
        this.axios
          .post(this.$api + "/mobile/SendMsg", {
            MobileNo: this.tel
          })
          .then(res => {
            if (res.data.IsSuccess == true) {
              Toast("发送成功");
              this.time = 59;
              this.disabled = true;
              //验证码的时间设置 可有可无
              this.timer();
              //手机号争取后调取接口
            } else {
              Toast("发送失败");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    timer() {
      if (this.time > 0) {
        this.time--;
        this.btntxt = this.time + "s后获取";
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.btntxt = "重新获取";
        this.disabled = false;
      }
    },
    zhuce(){
        var reg = /^(0|86|17951)?(13[0-9]|14[0-9]|15[012356789]|16[0-9]|17[3678]|19[0-9]|18[0-9]|14[57])[0-9]{8}$/;
      var reg2 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
      if (!reg2.test(this.password)) {
        Toast("密码只能是8-16位,必须由数字和字母组合");
      } else if (!reg.test(this.tel)) {
        Toast("手机号格式不正确");
      } else {
        var data = {
          Account: this.tel,
          Password: this.password,
          Name: this.tel,
          SmgCode: this.code,
          Mobile: this.tel,
          InviteCode:this.invite
          // GroupId: 1
        };
        this.axios
          .post(this.$api + "/mobile/Register", {
            ...data
          })
          .then(res => {
            if (res.data.IsSuccess == true) {
              Toast("注册成功");
              this.over=true
              //  met.logout()
            } else Toast(res.data.Message);
          })

          .catch(err => {
            conosle.log(err);
          });
      }
    }
  }
};
</script>
<style scoped lang='less'>
@base: 37.5rem;
.box {
  width: 100%;
  position: fixed;
  top: 0px;
  bottom: 0;
  background: url("../../../assets/images/invite_b.jpg") no-repeat;
  background-size: 100% 100%;
  .title1 {
    margin-top: 40 / @base;
    text-align: center;
    font-size: 30px;
    font-weight: normal;
    font-style: italic;
    font-stretch: normal;
    line-height: 42px;
    letter-spacing: 0px;
    color: #ffffff;
    // opacity: 0.5;
  }
  .title2 {
    text-align: center;
    font-size: 24px;
    font-weight: normal;
    letter-spacing: 0px;
    color: #ffffff;
    // opacity: 0.5;
  }
  .title3 {
    text-align: center;
    font-style: italic;
    font-size: 36px;
    font-weight: normal;
    letter-spacing: 0px;
    color: #ffffff;
    // opacity: 0.5;
  }
  .main {
    margin: 20 / @base auto 17 / @base auto;
    text-align: center;
    width: calc(~"100% - 20px");
    // width: 351 / @base;
    height: 285 / @base;
    background-color: #ffffff;
    border-radius: 10px;
    padding-top: 53 / @base;
    .hang1 {
    }
    .hang2 {
    }
    .hang3 {
    }
    .img {
      margin: 0 auto auto;
      width: 45 / @base;
      height: 45 / @base;
    }
    .success {
      font-size: 18px;
      font-stretch: normal;
      line-height: 27px;
      letter-spacing: 1px;
      color: #3c3c3c;
    }
    .tishi {
      margin-top: 46 / @base;
      font-size: 14px;
      font-stretch: normal;
      line-height: 22px;
      letter-spacing: 1px;
      color: #7301ff;
      span {
        color: #262626;
      }
    }
    .tequan {
      font-size: 14px;
      font-weight: bold;
      letter-spacing: 1px;
      color: #838383;
      span {
        color: #cd7ffc;
      }
    }
    .baohan {
      font-size: 14px;
      letter-spacing: 1px;
      color: #838383;
    }
  }
  .main2 {
    margin: 20 / @base auto 17 / @base auto;
    text-align: center;
    width: calc(~"100% - 20px");
    height: 285 / @base;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 26 / @base 25 / @base 33 / @base 25 / @base;
    // padding-top: 53 / @base;
    .hang1 {
      margin-bottom: 20 / @base;
      width: 100%;
      height: 40 / @base;
      background-color: #eeeeee;
      border-radius: 20px;
      display: flex;
      align-items: center;
      padding-left: 24 / @base;
      i {
        // width: 13 / @base;
        // height: 21 / @base;
        font-size: 20px;
        color: #b8b8b8;
      }
      input {
        width: 60%;
        height: 100%;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #b8b8b8;
        background: #eeeeee;
        padding-left: 10 / @base;
      }
    }
    .hang2 {
      margin-bottom: 20 / @base;
      display: flex;
      justify-content: space-between;
      height: 40 / @base;
      width: 100%;
      .left {
        padding-left: 24 / @base;
        width:65%;
        height: 40 / @base;
        border-radius: 20px;
        display: flex;
        background: #eeeeee;
        align-items: center;
        i {
          font-size: 20px;
          color: #b8b8b8;
        }
        input {
          width: 80%;
          height: 100%;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #b8b8b8;
          background: #eeeeee;
          padding-left: 10 / @base;
        }
      }
      button {
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 29%;
        height: 40 / @base;
        background-image: linear-gradient(90deg, #9543ff 0%, #e99ee1 100%);
        border-radius: 20px;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
    .hang3 {
      margin-bottom: 26 / @base;
      width: 100%;
      height: 40 / @base;
      background-color: #eeeeee;
      border-radius: 20px;
      display: flex;
      align-items: center;
      padding-left: 24 / @base;
      i {
        // width: 13 / @base;
        // height: 21 / @base;
        font-size: 20px;
        color: #b8b8b8;
      }
      input {
        width: 60%;
        height: 100%;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #b8b8b8;
        background: #eeeeee;
        padding-left: 10 / @base;
      }
    }
    .zhuce {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 40 / @base;
      background-image: linear-gradient(90deg, #9543ff 0%, #e99ee1 100%);
      border-radius: 20px;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;
    }
  }
  .bottom {
    display: flex;
    margin: 17 / @base auto auto auto;
    width: calc(~"100% - 20px");
    height: 148 / @base;
    background: rgba(250, 250, 250, 0.2);
    border-radius: 10 / @base;
    padding: 16 / @base 11 / @base 17 / @base 22 / @base;
    img {
      min-width: 115 / @base;
      max-width: 115 / @base;
      height: 115 / @base;
      background-size: 100% 100%;
    }
    .right {
      width: 100%;
      .p1 {
        text-align: center;
        margin-top: 8 / @base;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 23px;
        letter-spacing: 1px;
        color: #fefefe;
      }
      .p2 {
        text-align: center;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 23px;
        letter-spacing: 1px;
        color: #fefefe;
      }
      .btn {
        margin: 18 / @base auto;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 140 / @base;
        height: 40 / @base;
        background-image: linear-gradient(90deg, #ff8767 0%, #ffa443 100%);
        border-radius: 20px;
      }
    }
  }
}
</style>