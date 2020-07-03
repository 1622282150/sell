<template>
  <div>
    <header>
      <i @click="$router.back()" class="iconfont icon-zuojiantou"></i>
      <div class="head">支付宝绑定</div>
    </header>
    <div class="bu"></div>
    <!-- neirong -->
    <div class="box">
        <!-- <div v-show="same" class="err">
            <img src="../../../assets/images/payment_err.png" alt="">
            <p>两次输入的密码不一样</p>
        </div> -->
       <div class="box_item">
         <p>支付宝</p>
         <input type="text"  v-model="account" placeholder="请输入您的支付宝号" >
          <img v-show="same" @click="del" class="del" src="../../../assets/images/payment_del.png" alt="">
       </div>
    </div>
    <div class="bottom1" v-if="!same">确认</div>
    <div class="bottom2" v-else @click="tijiao">确认</div>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  data() {
    return {
      same:false,
      account:''
    };
  },
  methods:{
    del(){
          this.account=''
      },
        tijiao(){
        request.post(this.$api+'/mobile/UpdateIdAlipayId',{
             Str:this.account
        }).then(res=>{
             if(res.IsSuccess){
               this.$router.back()
             }else{

             }
        }).catch(err=>{})
      },
  },
   watch: {
      account() {
        if(this.account.length){
           
            this.same=true
        }else{
            this.same=false
        }
      }
    }
};
</script>
<style scoped lang='less'>
@base:75rem;
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
.box{
    position: relative;
    width: 100%;
    height: 921/@base;
    // background:red;
  
    .err{
        display: flex;
        justify-content: center;
        width: 100%;
        
        position: absolute;
        bottom: 0;
        left: 0;
        font-size: 0;
        img{
            display: inline-block;
            width: 20/@base;
            height: 20/@base;
            background-size: 100% 100%;
            margin:auto 0;
        }
        p{  margin-left: 10/@base;
            color: #bb0000;
            font-size: 24/@base;
            font-weight: normal;
        }
    }
    .box_item{
        display: flex;
        width: 100%;
        height: 90/@base;
        border-bottom: 1px solid #e6e6e6;
        padding: 0 40/@base;
         .del{
            position: absolute;
            right: 40/@base;
            top: 34/@base;
           width: 28/@base;
           height: 28/@base;
           background-size: 100% 100%;
        }
        p{
          line-height: 90/@base;
          // font-family: 'PingFangRegular';
          font-size: 30/@base;
          font-weight: normal;
          font-stretch: normal;
          color: #333333;
        }
        input{
         width: 376/@base;
         height: 40/@base;
         margin-top: 25/@base;
         margin-left: 31/@base;
        font-size: 30/@base;
        color: #a6a6a6;
        }
    }
}
  .bottom1{
        width: 601/@base;
        height: 80/@base;
        line-height: 80/@base;
        text-align: center;
        border-radius: 40/@base;
        margin: 35/@base auto;
        background: #b9b5c0;
        color: #ffffff;
        font-size: 30/@base;
        font-weight: bold;
        // font-family: 'PingFangRegular';
    }
      .bottom2{
        width: 601/@base;
        height: 80/@base;
        line-height: 80/@base;
        text-align: center;
        border-radius: 40/@base;
        margin: 35/@base auto;
        background:#b695e9;
        color: #ffffff;
        font-size: 30/@base;
        font-weight: bold;
        // font-family: 'PingFangRegular';
    }
</style>