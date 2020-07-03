<template>
  <div class="login">
    <Return></Return>

    <LoginWay>
      <h3>账号密码登录</h3>
      <p>输入您的用户名和密码即可登录</p>
    </LoginWay>

    <div class="form">
      <div class="username">
        <div class="name"></div>
        <img src="../../assets/images/login_user.png" alt />
        <span>用户名</span>
        <div class="inp">
          <input type="text" placeholder="请输入您的用户名" v-model="username" />
        </div>
      </div>
      <div class="password">
        <div class="psw">
          <img src="../../assets/images/login_suo.png" />
          <span>密码</span>
          <div class="inp pw">
            <input type="password" placeholder="请输入您的密码" v-model="password" />
          </div>
        </div>
      </div>
      <div class="link clearfix">
        <router-link class="fl" to="/fpassword">忘记密码?</router-link>
        <router-link class="fr" to="/vregister">注册</router-link>
      </div>
    </div>

    <div class="login_btn">
      <span @click="denglu">登录</span>
    </div>

    <ThirdLogin class="mart"></ThirdLogin>

    <div class="protocol">
      <div class="check fl" :class="checked ? 'active': ''">
        <input type="checkbox" v-model="checked" />
      </div>注册/登录表示您已经同意
      <a href>魅千金会员协议</a>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import Return from "../../components/Return";
import LoginWay from "./LoginWay";
import ThirdLogin from "./ThirdLogin";
import { Toast } from "vant";
export default {
  data() {
    return {
      username: "",
      password: "",
      checked: ""
    };
  },
  components: {
    Return,
    LoginWay,
    ThirdLogin
  },
  methods: {
    denglu() {
      var reg = /^[a-z0-9]+$/i;
      if (this.username == "" && this.password == "") {
        Toast("账号或者密码不能为空");
      } else if (!reg.test(this.username)) {
        Toast("账号只能是数字和字母");
      } else if (this.password.length < 6 || this.password.length > 20) {
        Toast("密码6-20位");
      } else {
        this.axios
          .post(this.$api + "/mobile/ValidateUser", {
            Account: this.username,
            Password: this.password
          })
          .then(res => {
            if (res.data.IsSuccess == true) {
              Toast.success("登陆成功");
              console.log(res.headers.aspxauth);
              var token = res.headers.aspxauth;
              window.localStorage.setItem("token", token);
              this.$router.push("/");
            } else {
              Toast(res.data.Message);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>
<style scoped lang='less'>
@base : 75rem;
.login {
  width: 100%;
  height: 100%;
}
.mart {
  margin-top: 125 / @base;
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
  .password {
    margin-top: 25 / @base;
  }
  .inp {
    padding: 25 / @base 0;
    border-bottom: 1 / @base solid #d2d2d2;
    padding-left: 45 / @base;
    input {
      height: 50 / @base;
    }
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
      border: none;
      background-size: 100%;
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