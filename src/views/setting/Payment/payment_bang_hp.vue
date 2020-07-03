<template>
  <div>
    <div class="header">
      绑定支付宝
      <img @click="$router.back()" class="img1" src="../../../assets/images/newfan.png" alt />
    </div>
    <div class="jicheng"></div>
    <div class="box">
      <p class="little_p">我们需要对您的手机号进行验证</p>
      <div class="shuru">
        <div class="left">手机号</div>
        <input type="tel" disabled v-model="tel_rel" placeholder="请输入手机号" />
      </div>
      <div class="shuru">
        <div class="left">验证码</div>
        <input type="tel" v-model="code" placeholder="请输入短信验证码" />
        <button class="yanzm" ref="btn" @click="getcode" :disabled="disabled">{{btntxt}}</button>
      </div>
      <div class="shuru">
        <div class="left">支付宝</div>
        <input type="tel" v-model="account" placeholder="请输入支付宝账户" />
      </div>
      <div class="shuru">
        <div class="left">收款人</div>
        <input type="text" v-model="user" placeholder="与账户相应的收款人" />
      </div>
      <div v-if="!showb" class="xia">完成</div>
      <div v-else @click="next" class="xia" style="background:#c976ff;">完成</div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import request from "@/utils/request";
export default {
  data() {
    return {
        id:0,
      showb: false,
      tel: "",
      tel_rel: "",
      code: "",
      btntxt: "获取验证码",
      disabled: false,
      time: 0,
      account: "",
      user: "",
      sign:'',
    };
  },
  computed: {
    address() {
      const { tel_rel, code, account, user } = this;
      return {
        tel_rel,
        code,
        account,
        user
      };
    }
  },
  watch: {
    address(val) {
      if (val.tel_rel && val.code && val.account && val.user) {
        this.showb = true;
      } else {
        this.showb = false;
      }
    }
  },
  mounted() {
      this.id=this.$route.query.id
    this.getPhone();
  },
  methods: {
    //   获取电话号码
    getPhone() {
      request
        .post(this.$api + "/mobile/GetUserMobile", {})
        .then(res => {
          if (res.IsSuccess) {
            this.tel = res.Data.No;
            this.tel_rel = res.Data.Nx;
          }
        })
        .catch(err => {});
    },
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
              this.$refs.btn.style.color = "#666666";
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
        this.btntxt = this.time + "s";
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.$refs.btn.color = "#9c49fc";
        this.btntxt = "重新获取";
        this.disabled = false;
      }
    },
    next() {
      //   先掉签名
      request
        .post(this.$api + "/mobile/ValidateMsgCode", {
          MobileNo: this.tel,
          SmgCode: this.code
        })
        .then(res => {
          if (res.IsSuccess) {
              this.sign=res.Data.sign
            request
              .post(this.$api + "/mobile/UpdatePayBindAccount", {
                Id:this.id,
                ThreeAccountId: this.account,
                ThreeUserRealName: this.user,
                Type: 1,
                MobileNo: this.tel,
                Sign: this.sign
              })
              .then(res => {
                if (res.IsSuccess) {
                  this.$router.push("/payment_main");
                } else {
                  Toast(res.Message);
                }
              })
              .catch(err => {});
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
  .little_p {
    font-size: 11px;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #999999;
    margin: 13 / @base auto 12 / @base 20px;
  }
  .shuru {
    position: relative;
    width: 100%;
    height: 44 / @base;
    display: flex;
    align-items: center;
    padding-left: 20 / @base;
    background: #ffffff;
    .left {
      font-size: 14px;
      letter-spacing: 1px;
      color: #3c3c3c;
    }
    input {
      height: 100%;
      border: none;
      font-size: 14px;
      letter-spacing: 1px;
      color: #3e3e3e;
      margin-left: 41 / @base;
      background: white;
    }
    .yanzm {
      position: absolute;
      top: 0;
      right: 25 / @base;
      height: 100%;
      border: none;
      background: none;
      font-size: 12px;
      letter-spacing: 1px;
      color: #9c49fc;
    }
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
    margin: 50 / @base auto;
  }
}
</style>