<template>
  <div>
    <div class="header">
      绑定支付宝
      <img @click="$router.back()" class="img1" src="../../../assets/images/newfan.png" alt />
    </div>
    <div class="jicheng"></div>
    <div class="box">
      <p class="little_p">收款人与支付宝用户不一致将无法提现,请正确填写</p>
      <div class="shuru">
        <div class="left">支付宝</div>
        <input type="tel" v-model="tel" placeholder="请输入支付宝账户" />
      </div>
      <div class="shuru">
        <div class="left">收款人</div>
        <input type="text" v-model="code" placeholder="与账户相应的收款人" />
      </div>
      <div v-if="!showb" class="xia">完成</div>
      <div v-else @click="next" class="xia" style="background:#c976ff;">完成</div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import { Field, Toast } from "vant";
export default {
  data() {
    return {
      showb:false,
      tel: "",
      code: "",
      btntxt: "获取验证码",
      disabled: false,
      time: 0,
      sign:'',
      mobile:'',//用户真实手机号
    };
  },
  mounted(){
    this.sign=this.$route.query.sign
    this.mobile=this.$route.query.mobile
  },
  computed: {
    address() {
      const { tel, code } = this;
      return {
        tel,
        code
      };
    }
  },
  watch: {
    address(val) {
      if(val.tel&&val.code){
        this.showb=true
      }else{
        this.showb=false
      }
    }
  },
  methods: {
    next() {
      request.post(this.$api+'/mobile/AddPayBindAccount',{
          ThreeAccountId:this.tel,
          ThreeUserRealName:this.code,
          Type:1,
          MobileNo:this.mobile,
          Sign:this.sign
      }).then(res=>{
        if(res.IsSuccess){
            this.$router.push('/fenxiao_tixian')
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