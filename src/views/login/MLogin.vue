<template>
  <div class="mlogin">
    <Return></Return>
    <LoginWay>
      <h3>手机快捷登录</h3>
      <p>手机号1s登录方便快捷</p>
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
            <input type="text" placeholder="请输入您收到的验证码" v-model="code" />
          </div>
          <div class="yanzm">获取验证码</div>
        </div>
      </div>
    </div>
    <div class="login_btn">
      <span>登录</span>
    </div>

    <div class="protocol">
      <div class="check fl" :class="checked ? 'active': ''">
        <input type="checkbox" v-model="checked" />
      </div>注册/登录表示您已经同意
      <a href>,魅千金会员协议</a>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import Return from "../../components/Return";
import LoginWay from "./LoginWay";
export default {
  data() {
    return {
      tel: "",
      code: "",
      checked: ""
    };
  },
  components: {
    Return,
    LoginWay
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
.mlogin {
  width: 100%;
  height: 100%;
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