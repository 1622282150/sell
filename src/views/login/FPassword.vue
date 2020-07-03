<template>
  <div class="fpassword">
    <!-- <Return></Return> -->
    <div class="ttop">
      <i @click="goback" class="iconfont icon-zuojiantou"></i>
    </div>
    <LoginWay>
      <h3>找回密码</h3>
      <p>按步骤操作即可找回密码</p>
    </LoginWay>
    <div class="form">
      <div class="tel">
        <div class="name"></div>
        <img src="../../assets/images/login_shouji.png" alt />
        <span>手机</span>
        <div class="inp">
          <input type="text" placeholder="请输入您手机号码" v-model="tel" />
        </div>
      </div>
      <div class="code">
        <div class="psw">
          <img src="../../assets/images/login_text.png" />
          <span>验证码</span>
          <div class="inp pw">
            <input type="text" placeholder="请输入验证码" v-model="code" />
          </div>
          <button class="yanzm" @click="getcode" :disabled="disabled">{{btntxt}}</button>
        </div>
      </div>
    </div>

    <div class="form" style="margin-top:15px">
      <div class="password">
        <div class="tel">
          <img src="../../assets/images/login_suo.png" />
          <span>新密码</span>
          <div class="inp pw">
            <input type="text" placeholder="请输入您的密码" v-model="password" />
          </div>
        </div>
      </div>
      <div class="password" style="margin-top:15px">
        <div class="tel">
          <img src="../../assets/images/login_suo.png" />
          <span>确认密码</span>
          <div class="inp pw">
            <input type="text" placeholder="请再次输入您的密码" v-model="password1" />
          </div>
        </div>
      </div>
    </div>
    <div class="login_btn">
      <!-- <router-link to="/cpassword">确认修改</router-link> -->
      <div @click="queren">确认修改</div>
    </div>
    <!-- <div class="protocol">
      <div class="check fl" :class="checked ? 'active': ''">
        <input type="checkbox" v-model="checked" />
      </div>注册/登录表示您已经同意
      <a href>,魅千金会员协议</a>
    </div>-->
  </div>
</template>

<script>
import { Toast } from "vant";
/*eslint-disable*/
import Return from "../../components/Return";
import LoginWay from "./LoginWay";
export default {
  data() {
    return {
      a: 0,
      tel: "",
      code: "",
      checked: true,
      btntxt: "获取验证码",
      disabled: false,
      time: 0,
      password: "",
      password1: ""
    };
  },
  components: {
    Return,
    LoginWay
  },
  methods: {
    CheckUserIsExit() {},
    // 获取验证码
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
            // var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
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
                    this.a = 1;
                  } else {
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
        let url = this.$domain.url+"user_password";
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
    // 确认修改
    queren() {
      var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      var reg2 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
      if (this.password !== this.password1) {
        Toast("两次密码不相同");
      } else if (!reg2.test(this.password)) {
        Toast("密码只能是8-16位,必须由数字和字母组合");
      } else if (!reg.test(this.tel)) {
        Toast("手机号格式不正确");
      } else {
        // Toast('mei')
        this.axios
          .post(this.$api + "/mobile/ForgetPwd", {
            MobileNo: this.tel,
            SmgCode: this.code,
            NewPassword: this.password1
          })
          .then(res => {
            if (res.data.IsSuccess) {
              // 判断安卓ios去登陆
              var u = navigator.userAgent;
              var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
              var isAndroid =
                u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
              if (isAndroid) {
                Toast("修改成功");
                setTimeout(() => {
                  window.android.logOut();
                }, 1000);
              } else {
                Toast("修改成功");
                setTimeout(() => {
                  window.location.href = "mqjapp://logout";
                }, 1000);
                // window.location.href = "mqjapp://logout";
              }
            } else {
              Toast(res.data.Message);
              console.log(res.data);
            }
          })
          .catch(err => {});
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
.fpassword {
  width: 100%;
  height: 100%;
}
.form {
  padding: 0 40 / @base;
  margin-top: 100 / @base;
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
  .psw {
    position: relative;
    padding-right: 320 / @base;
  }
  .inp {
    padding: 25 / @base 0;
    padding-left: 45 / @base;
    border-bottom: 1 / @base solid #d2d2d2;
    background: #fff;
    input {
      height: 50 / @base;
      background: #fff;
    }
  }
  .yanzm {
    background: #fff;
    width: 200 / @base;
    height: 70 / @base;
    border-radius: 50 / @base;
    line-height: 70 / @base;
    text-align: center;
    font-size: 24 / @base;
    color: #686868;
    border: 1 / @base solid #ccc;
    position: absolute;
    right: 110 / @base;
    bottom: 10 / @base;
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
  div {
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
  position: fixed;
  bottom: 50 / @base;
  left: 40 / @base;
  margin-top: 85 / @base;
  padding: 0 40 / @base;
  font-size: 24 / @base;
  color: #7b7b7b;
  letter-spacing: 2 / @base;
  .check {
    width: 20 / @base;
    height: 20 / @base;
    border: 1 / @base solid #ccc;
    background-size: 100%;
    margin-top: 6 / @base;
    margin-right: 8 / @base;
    &.active {
      background: url(../../assets/images/login_gouxuan.png) center no-repeat;
      background-size: 100%;
      border: none;
    }
    input {
      width: 320 / @base;
      height: 20 / @base;
      opacity: 0;
    }
  }
  a {
    color: #b694ea;
    text-decoration: underline;
  }
}
</style>