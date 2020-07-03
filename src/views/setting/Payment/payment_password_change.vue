<template>
  <div>
    <header>
      <i @click="$router.back()" class="iconfont icon-zuojiantou"></i>
      <div class="head">支付密码修改</div>
    </header>
    <div class="bu"></div>
    <!-- neirong -->
    <div class="box">
      <div v-show="same" class="err">
        <img src="../../../assets/images/payment_err.png" alt />
        <p>两次输入的密码不一样</p>
      </div>
      <div class="box_item">
        <p>手机号码</p>
        <input type="text" v-model="tel" placeholder="请输入您的手机号码" />
      </div>
      <div class="box_item">
        <p>验证码</p>
        <input style="width:100px" type="text" v-model="code"  placeholder="请输入验证码" />
        <div class="code" :disabled="disabled" @click="getcode">{{btntxt}}</div>
      </div>
      <!-- <div class="bu"></div> -->
      <div class="box_item">
        <p>请输入支付密码</p>
        <input type="text" v-model="password1" placeholder="请输入您的6位数密码" />
      </div>
      <div class="box_item">
        <p>请确认支付密码</p>
        <input type="text" v-model="password2" placeholder="请输入您的6位数密码" />
      </div>
    </div>
    <div class="bottom1" v-if="same">确认提交</div>
    <div class="bottom2" v-else>确认提交</div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
        btntxt: "获取验证码",
        disabled: false,
      same: true,
      tel:'',
      code:'',
      password1: "",
      password2: ""
    };
  },
  watch: {
    password2() {
      if (this.password1 != this.password2) {
        console.log("不一样");
        this.same = true;
      } else {
        this.same = false;
      }
    }
  },
  methods:{
      getcode() {
      this.axios
        .post(this.$api + "/mobile/CheckUserIsExit", {
          Account: this.tel
        })
        .then(res => {
          console.log(res);
          if (res.data.Data.ExitFalg == false) {
            Toast("该用户不存在");
          } else {
            console.log("jixuzhuceba --");
            var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
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
                    this.a = 1;
                  } else {
                      Toast('短信发送失败')
                  }
                })
                .catch(err => {
                  console.log(err);
                });
              this.disabled = true;
              this.time = 60;

              //验证码的时间设置 可有可无
              this.timer();
              //手机号争取后调取接口
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
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
.bu{
  width: 100%;
  height: 15/@base;
  background: #eeeeee;
}
//
.box {
  position: relative;
  width: 100%;
  height: 921 / @base;
  // background:red;
 .bu{
    width: 100%;
    height: 15/@base;
    background: #eeeeee;
    }
  .err {
    display: flex;
    justify-content: center;
    width: 100%;

    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 0;
    img {
      display: inline-block;
      width: 20 / @base;
      height: 20 / @base;
      background-size: 100% 100%;
      margin: auto 0;
    }
    p {
      margin-left: 10 / @base;
      color: #bb0000;
      font-size: 24 / @base;
      font-weight: normal;
    }
  }
  .box_item {
    display: flex;
    width: 100%;
    height: 90 / @base;
    border-bottom: 1px solid #e6e6e6;
    padding: 0 40 / @base;
    p {
      line-height: 90 / @base;
      // font-family: "PingFangRegular";
      font-size: 30 / @base;
      font-weight: normal;
      font-stretch: normal;
      color: #333333;
    }
    input {
      width: 376 / @base;
      height: 40 / @base;
      margin-top: 25 / @base;
      margin-left: 31 / @base;
      font-size: 30 / @base;
      color: #a6a6a6;
    }
    .code{
        width: 200/@base;
        height: 70/@base;
        line-height: 70/@base;
        margin: 10/@base 0;
        background: #b694e8;
        border-radius: 35/@base;
        color: #ffffff;
        font-weight: normal;
        font-size: 28/@base;
        text-align: center;
        margin-left: 120/@base;
    }

  }
}
.bottom1 {
  width: 601 / @base;
  height: 80 / @base;
  line-height: 80 / @base;
  text-align: center;
  border-radius: 40 / @base;
  margin: 35 / @base auto;
  background: #b9b5c0;
  color: #ffffff;
  font-size: 30 / @base;
  font-weight: bold;
  // font-family: "PingFangRegular";
}
.bottom2 {
  width: 601 / @base;
  height: 80 / @base;
  line-height: 80 / @base;
  text-align: center;
  border-radius: 40 / @base;
  margin: 35 / @base auto;
  background: #b695e9;
  color: #ffffff;
  font-size: 30 / @base;
  font-weight: bold;
  // font-family: "PingFangRegular";
}
</style>