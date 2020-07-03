<template>
  <div>
    <header>
      <i @click="$router.back()" class="iconfont icon-zuojiantou"></i>
      <div class="head">注销申请</div>
    </header>
    <div class="bu"></div>
    <p class="title">请确认您的账号是否满足以下注销条件</p>
    <div class="list" v-for="(item,index) in list" :key="index">
        <div class="list_left">{{item.Name}}</div>
        <div class="list_right"><i v-if="item.Flag" class="iconfont icon-wancheng"></i><i v-else style="color:red;" class="iconfont icon-shibai"></i></div>
    </div>
    <div class="middle"><div @click="checked = !checked" :class="{'active':checked}" class="cicle"></div><p>我已阅读并知晓了<span @click="$router.push('/zhuxiao_explain')">《魅千金注销说明》</span></p></div>
    <div class="btn" @click="queren" style="background:#b695e9" v-if="checked">确认申请</div>
    <div class="btn" v-else>确认申请</div>
  </div>
</template>

<script>
import { Toast } from "vant";
import request from "@/utils/request";
export default {
  data() {
    return {
        sign:'',
        list:[],
        checked:false,
        over:false,
        mobile:''
    };
  },
  mounted(){
    this.sign=this.$route.query.sign
    this.mobile=this.$route.query.mobile
    this.getTiao()
  },
  methods:{
    getTiao(){
        request.post(this.$api+'/appauth/CheckBeforeDel',{
          
        }).then(res=>{
          this.list=res.Data.List
          this.over=res.Data.Flag
        }).catch(err=>{

        })
    },
    queren(){
       if(!this.over){
           Toast('条件没有达成')
       }else{
           console.log('可以下一步')
           this.$router.push({
               path:'/zhuxiao',
               query:{
                   sign:this.sign,
                   mobile:this.mobile
               }
           })
       }
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
.list{
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30/@base 15/@base;
    width: 90%;
    font-size: 30/@base;
    .list_left{

    }
    .list_right{
      i{
          font-size: 16px;
          color: green;
      }
    }
}
.middle{
    width: 70%;
    display: flex;
    align-items: center;
    margin: 40/@base auto 20/@base auto;
    .cicle{
        margin-right: 3/@base;
        width: 30/@base;
        height: 30/@base;
        border: 1px solid #aaaaaa;
        border-radius: 50%;
    }
    .active{
        background:url('../../../assets/images/code_dui.png') no-repeat;
        background-size: 100% 100%;
        border: none !important;
    }
    p{
        font-size:26/@base;
        span{
            color: #b695e9;
        }
    }
}
.btn{
    width: 200/@base;
    height: 60/@base;
    font-size: 28/@base;
    color: #ffffff;
    background:#aaaaaa;
    border-radius: 20px;
    display:flex;
    align-items: center;
    justify-content: center;
    margin: 40/@base auto;
}
</style>