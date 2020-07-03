<template>
  <div>
    <div class="header">
      绑定支付密码
      <img @click="$router.back()" class="img1" src="../../../assets/images/newfan.png" alt />
    </div>
    <div class="jicheng"></div>
    <div class="box">
      <p class="little_p">请设置6位数字密码</p>
      <div class="shuru">
        <div class="left">输入密码</div>
        <input type="tel"  v-model="pwd" placeholder="请输入密码" />
      </div>
       <div class="shuru">
        <div class="left">再次输入</div>
        <input type="tel"  v-model="pwd2" placeholder="请输入密码" />
      </div>

      <div v-if="!showb" class="xia">完成</div>
      <div v-else @click="next" class="xia" style="background:#c976ff;">完成</div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import { Toast } from 'vant';
export default {
  data() {
    return {
      pwd:'',
      pwd2:'',
      showb:false,
      sign:'',
      mobile:'',
    };
  },
   computed: {
    address() {
      const { pwd,pwd2 } = this;
      return {
        pwd,pwd2
      };
    }
  },
  watch: {
    address(val) {
      if (val.pwd && val.pwd2) {
        this.showb = true;
      } else {
        this.showb = false;
      }
    }
  },
  mounted(){
     this.sign=this.$route.query.sign
     this.mobile=this.$route.query.mobile
  },
  methods:{
      next(){
          if(this.pwd != this.pwd2 &&this.pwd.length!=6){
              Toast('长度6位且两次输入密码需相同')
          }else{
            //  设置完成
            request.post(this.$api+'/mobile/SetPayPwd',{
                Pwd:this.pwd,
                MobileNo:this.mobile,
                Sign:this.sign

            }).then(res=>{
               if(res.IsSuccess) {
                   Toast('设置成功')
                   this.$router.push('/fenxiao_tixian')
               }else{
                   Toast(res.Message)
               }
            }).catch(err=>{

            })
          }
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