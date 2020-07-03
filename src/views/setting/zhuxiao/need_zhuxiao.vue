<template>
  <div>
    <header>
      <i @click="goback()" class="iconfont icon-zuojiantou"></i>
      <div class="head">注销申请</div>
    </header>
    <div class="bu"></div>
    <p class="title">请先验证身份</p>
    <div class="form">
      <div class="tel">
        <div class="name"></div>
        <img src="../../../assets/images/login_shouji.png" alt />
        <span>手机</span>
        <div class="inp">
          <input type="text" placeholder="请输入您手机号码" v-model="tel" />
        </div>
      </div>
      <div class="code">
        <div class="psw">
          <img src="../../../assets/images/login_text.png" />
          <span>验证码</span>
          <div class="inp pw">
            <input type="text" placeholder="请输入您收到的验证码" v-model="code" />
          </div>
          <button class="yanzm" @click="getcode" :disabled="disabled">{{btntxt}}</button>
        </div>
      </div>
    </div>
    <div  class="login_btn">
      <span @click="next">下一步</span>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import request from "@/utils/request";
export default {
  data() {
    return {
      tel: "",
      code: "",
      btntxt: "获取验证码",
      disabled: false,
      time: 0,
    };
  },
  mounted(){
   this.getmobile()
  },
  methods: {
    goback() {
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
    // 获取是否有手机号
    getmobile(){
        request.post(this.$api+'/mobile/GetUserMobile',{

        }).then(res=>{
           this.tel=res.Data.No
        }).catch(err=>{

        })
    },
    // 下一步
    next(){
        request.post(this.$api+'/mobile/ValidateMsgCode',{
           MobileNo:this.tel,
           SmgCode:this.code
        }).then(res=>{
          if(res.IsSuccess){
             this.$router.push({
                 path:'need_zhuxiao_next',
                 query:{
                     sign:res.Data.sign,
                     mobile:this.tel
                 }
             })
          }else{
              Toast(res.Message)
          }
        }).catch(err=>{

        })
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
    position: fixed;
    top: 0;
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
  height: 100 / @base;
}
.title {
  font-size: 36 / @base;
  font-weight: bold;
  text-align: center;
  margin: 80 / @base auto;
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
    background: url(../../../assets/images/login_btn.png) center no-repeat;
    background-size: 100%;
  }
}
</style>