<template>
  <div class="contain">
    <Head>手机号设置</Head>
    <div class="form">
      <!-- <div class="input">
        <input type="text" placeholder="旧手机号:(没有可不填)" v-model="jiu" />
       
      </div> -->
      <!-- <div class="input">
        <input type="text" placeholder="请输入新密码" />
      </div>-->
      <div class="input">
        <input type="text" placeholder="请输入新手机号" v-model="xin" />
        <button class="yanzm" @click="getcode" :disabled="disabled">{{btntxt}}</button>
      </div>
      <div class="input">
        <input type="text" placeholder="请输入验证码" v-model="code" />
      </div>
    </div>

    <div class="submit">
      <button @click="xiugai">确定</button>
    </div>

    <!-- banner -->
  </div>
</template>
<script>
/*eslint-disable*/
import request from "@/utils/request";
// import "../fonts/iconfont.css";
import Head from "@/components/Header";
import { Toast } from "vant";
export default {
  data() {
    return {
      xin: "",
      jiu: "",
      code: "",
      btntxt: "获取验证码",
      disabled: false,
      time: 0
    };
  },
  components: {
    Head
  },
  methods: {
    xiugai() {
      if (this.xin === this.jiu) {
        Toast("两次手机号不能相同");
      } else {
        request
          .post(this.$api + "/mobile/CheckLoginStatus")
          .then(res => {
            if (!res.Data.OnlineFlag) {
              Toast("用户登录态失效请重新登陆");
              var u = navigator.userAgent;
              var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
              var isAndroid =
                u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
              if (isAndroid) {
                console.log("我是要去安卓");
                window.android.logOut();
              } else if (isiOS) {
                console.log("我是要去ios");
                window.location.href = "mqjapp://logout";
                //  Dialog.alert({
                //       message: "接口报：401请登录就会看到我"
                //     }).then(() => {
                //       // on close

                //     });
              } else {
                console.log("我不是安卓也不是ios,我在哪");
              }
              //  this.$router.push('/Login')
            } else {
              request
                .post(this.$api + "/mobile/UpdateMobile", {
                  // OldMobile: this.jiu,
                  NewMobile: this.xin,
                  SmgCode: this.code
                })
                .then(res => {
                  if (res.IsSuccess) {
                    Toast("修改成功");
                    window.localStorage.setItem('mobile',this.xin)
                    this.$router.back();
                  } else {
                    Toast(res.Message);
                  }
                })
                .catch(err => {});
            }
          })
          .catch(err => {});
      }
    },
    getcode() {
      if (this.xin == "") {
        Toast("手机号不能为空");
      } else {
        this.axios
          .post(this.$api + "/mobile/SendMsg", {
            MobileNo: this.xin
          })
          .then(res => {
            if (res.data.IsSuccess) {
              this.disabled = true;
              this.time = 60;

              //验证码的时间设置 可有可无
              this.timer();
            } else {
              Toast(res.data.Message);
            }
          })
          .catch(err => {});

        //手机号争取后调取接口
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
    }
  }
};
</script>
<style lang="less" scoped>
@desgin: 1080;
@base: 108rem;
.contain {
  width: 100%;
  // height: 10000 / @base;
}
.active {
  color: #8e5aa2;
}
.header {
  border-bottom: 1px solid #ccc;
}

.form {
  padding-top: 45 / @base;
  .input {
    margin-bottom: 20 / @base;
    font-size: 20 / @base;
    padding: 50 / @base 40 / @base 50 / @base 74 / @base;
    border: 1px solid #b8b8b8;
    width: 1000 / @base;
    margin: 0 auto;
    font-size: 32 / @base;
    border-radius: 15 / @base;
    margin-bottom: 45 / @base;
    position: relative;
    button {
      position: absolute;
      height: 100%;
      background-color: #fff;
      border: none;
      right: 50 / @base;
      top: 0;
      color: #8d5aa2;
    }
  }
}

.submit {
  margin-top: 150 / @base;
  button {
    display: block;
    width: 900 / @base;
    height: 120 / @base;
    line-height: 120 / @base;
    text-align: center;
    background-color: #8f58a7;
    margin: 0 auto;
    font-size: 44 / @base;
    color: #fff;
  }
}
</style>


