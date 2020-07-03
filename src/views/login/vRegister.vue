<template>
  <div class="v_register">
    <div class="ttop">
      <i @click="goback" class="iconfont icon-zuojiantou"></i>
    </div>
    <LoginWay>
      <h3>账号注册</h3>
      <p>绑定您的微信登录更便捷</p>
    </LoginWay>
    <div class="form">
      <div class="tel">
        <div class="name"></div>
        <img src="../../assets/images/login_shouji.png" alt />
        <span>手机</span>
        <div class="inp">
          <input type="text" @blur="CheckUserIsExit" placeholder="请输入您手机号码" v-model="tel" />
        </div>
      </div>
      <div class="code">
        <div class="psw">
          <img src="../../assets/images/login_text.png" />
          <span>验证码</span>
          <div class="inp pw">
            <input type="text" placeholder="请输入您收到的验证码" v-model="code" />
          </div>
          <button class="yanzm" @click="getcode" :disabled="disabled">{{btntxt}}</button>
        </div>
      </div>
      <div class="password">
        <div class="name"></div>
        <img src="../../assets/images/login_suo.png" alt />
        <span>密码</span>
        <div class="inp">
          <input type="password" placeholder="请输入您的密码" v-model="password" />
        </div>
      </div>
    </div>
    <div v-if="checked" class="login_btn">
      <span @click="register">注册</span>
    </div>
    <div v-else class="login_btn">
      <span @click="tishi">注册</span>
    </div>
    <!-- <ThirdLogin class="mart"></ThirdLogin> -->
    <div class="protocol">
      <div class="check fl" :class="checked === true? 'active': ''">
        <input type="checkbox" v-model="checked" />
      </div>同意
      <span class="a" @click="$router.push('/serve_user')">用户协议</span>及
      <span class="a" @click="$router.push('/yinsi')">隐私政策</span>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
/*eslint-disable*/
import Return from "../../components/Return";
import LoginWay from "./LoginWay";
import ThirdLogin from "./ThirdLogin";
export default {
  data() {
    return {
      tel: "",
      code: "",
      password: "",
      checked: true,
      btntxt: "获取验证码",
      disabled: false,
      time: 0
    };
  },
  components: {
    Return,
    LoginWay,
    ThirdLogin
  },
  methods: {
    tishi() {
      Toast("请先勾选用户协议");
    },
    goback() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        console.log("我是要去安卓");
        window.android.closePage();
        this.$router.back();
      } else if (isiOS) {
        console.log("我是要去ios");
        let url = this.$domain.url+"user_register";
        console.log(url);
        this.$bridge.callhandler("closePage", url, data => {
          // 处理返回数据
        });
        this.$router.back();
      } else {
        console.log("我不是安卓也不是ios,我在哪");
        this.$router.back();
      }
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
    // 检查用户是否存在
    CheckUserIsExit() {
      this.axios
        .post(this.$api + "/mobile/CheckUserIsExit", {
          Account: this.tel
        })
        .then(res => {
          console.log(res);
          if (res.data.Data.ExitFalg == true) {
            Toast("该用户已经存在");
          } else {
            console.log("jixuzhuceba --");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 点击注册逻辑
    register() {
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
          Mobile: this.tel
          // GroupId: 1
        };
        this.axios
          .post(this.$api + "/mobile/Register", {
            ...data
          })
          .then(res => {
            if (res.data.IsSuccess == true) {
              Toast("注册成功");
              //  met.logout()

              this.$bridge.callhandler("registerOver", "", data => {
                // 处理返回数据
              });
              window.location.href = "mqjapp://logout";
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
@base: 75rem;
.ttop {
  position: relative;
  width: 100%;
  height: 100 / @base;
  i {
    font-size: 50 / @base;
    position: absolute;
    left: 40 / @base;
    top: 30 / @base;
  }
}
.v_register {
  width: 100%;
  height: 100%;
}
.mart {
  margin-top: 60 / @base;
}
.form {
  padding: 0 40 / @base;
  margin-top: 155 / @base;
  font-size: 24 / @base;
  img {
    display: inline-block;
    margin-right: 20 / @base;
    width: 28 / @base;
    height: 28 / @base;
    vertical-align: middle;
  }
  span {
    font-size: 24 / @base;
    color: #333;
    vertical-align: middle;
  }
  .code {
    margin-top: 25 / @base;
  }
  .password {
    margin-top: 25 / @base;
  }
  .psw {
    position: relative;
    padding-right: 320 / @base;
  }
  .inp {
    padding: 25 / @base 0;
    padding-left: 45 / @base;
    border-bottom: 1 / @base solid #d2d2d2;

    input {
      height: 50 / @base;
    }
  }
  .yanzm {
    width: 200 / @base;
    height: 70 / @base;
    border-radius: 50 / @base;
    line-height: 70 / @base;
    text-align: center;
    font-size: 24 / @base;
    color: #686868;
    border: 1px solid #e6e6e6;
    position: absolute;
    right: 110 / @base;
    bottom: 10 / @base;
    background: #fff;
  }
  .link {
    margin-top: 30 / @base;
    a {
      color: #b694ea;
      font-size: 24 / @base;
    }
  }
}
.login_btn {
  margin-top: 85 / @base;
  span {
    display: block;
    margin: 0 auto;
    width: 258 / @base;
    height: 78 / @base;
    line-height: 70 / @base;
    text-align: center;
    font-size: 30 / @base;
    color: #fff;
    // border-radius: 30 / @base;
    background: url(../../assets/images/login_btn.png) center no-repeat;
    background-size: 100%;
  }
}

.protocol {
  // position: fixed;
  // bottom: 50 / @base;
  // left: 40 / @base;
  margin-top: 85 / @base;
  // padding: 0 20 / @base;
  // text-align: center;
  font-size: 24 / @base;
  color: #7b7b7b;
  letter-spacing: 2 / @base;
  // text-align: center;
  .check {
    width: 20 / @base;
    height: 20 / @base;
    border: 1 / @base solid #ccc;
    background-size: 100%;
    margin-top: 6 / @base;
    margin-left: 30 / @base;
    &.active {
      background: url(../../assets/images/login_gouxuan.png) center no-repeat;
      border: none;
      background-size: 100%;
    }
    input {
      width: 320 / @base;
      height: 20 / @base;
      opacity: 0;
    }
  }
  .a {
    color: #b694ea;
    text-decoration: underline;
  }
}
</style>