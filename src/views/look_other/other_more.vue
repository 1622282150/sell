<template>
  <div>
    <div class="header">
        <i @click="$router.back()" style="position:absolute;left:20px;" class="iconfont icon-zuojiantou"></i>
        <span>更多</span>
        <!-- <i style="position:absolute;right:20px;"
          class="iconfont icon-fenxiang2"
        ></i> -->
    </div>
    <div class="jicheng"></div>
    <img class="img1" :src="selfinfo.UserPhoto" alt="">
    <p class="p1">{{selfinfo.Username}}</p>
    <p class="p2">{{selfinfo.PersonalitySignature}}</p>
    <div class="box">
        <div class="jvbao" @click="jvbao">举报</div>
        <div class="lahei" @click="lahei" v-if="type === 0">拉黑</div>
        <div class="sel_lahei" @click="sel_lahei" v-else>解除拉黑</div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import { Toast } from "vant";
export default {
  data() {
    return {
        id:'',
        selfinfo:[],
        type:''
    };
  },
  mounted(){
      this.id=this.$route.query.id
      this.get_selfinfo()
      this.ishei()
  },
  methods:{
    //   去举报
    jvbao(){
     this.$router.push({
         path:'/jvbao_userlist',
         query:{
             id:this.id
         }
     })
    },
    //   获取它的信息
    get_selfinfo () {
      request.post(this.$api + '/mobile/GetOtherUserInfo', {
        Id: this.id
      }).then(res => {
        if (res.IsSuccess) {
          this.selfinfo = res.Data
        } else {
          Toast(res.Message)
        }
      }).catch(err => {

      })
    },
    // 获取我是否被拉黑
    ishei(){
      request.post(this.$api+'/mobile/HaveUserBlackList',{
         Id:this.id 
      }).then(res=>{
        this.type=res.Type
      }).catch(err=>{})
    },
    // 拉黑他
     lahei(){
      request.post(this.$api+'/mobile/UserBlackListAdd',{
         UserId:this.id 
      }).then(res=>{
        this.ishei()
      }).catch(err=>{})
    },
    // 解除拉黑他
     sel_lahei(){
      request.post(this.$api+'/mobile/UserBlackListDelete',{
        Id:this.id 
      }).then(res=>{
        this.ishei()
      }).catch(err=>{})
    },
   
    
   
    
  },
};
</script>
<style scoped lang='less'>
@base:75rem;
.header {
  position: relative;
  width: 100%;
  height: 120 / @base;
  line-height: 120 / @base;
  text-align: center;
  font-size: 35 / @base;
  border-bottom: 1 / @base solid #ccc;
  position: fixed;
  top: 0;
  background: white;
  z-index: 1;
  i {
    font-size: 25px;
  }
}
.jicheng {
  width: 100%;
  height: 120 / @base;
}
.img1{
 margin: 25/@base auto 0 auto;
 width: 155/@base;
 height: 155/@base;
 border-radius: 50%;
 background-size: 100% 100%;
}
.p1{
  margin-top: 33/@base;
  text-align: center;
  font-size: 36/@base;
  // font-family: 'PingFangBold';
  color: #333333;
}
.p2{
  margin-top: 14/@base;
  text-align: center;
  font-size: 24/@base;
  color: #333333;
}
.box{
    width: calc(~ '100% - 50px');
    height: 80/@base;
    margin: 77/@base auto;
    display: flex;
    justify-content: space-between;
    .jvbao{
        width: 300/@base;
        height: 80/@base;
        line-height: 80/@base;
        text-align: center;
        font-size: 36/@base;
        border-radius: 40/@base;
        color: #ffffff;
        background: #b8b4bf;
    }
    .lahei{
        width: 300/@base;
        height: 80/@base;
        line-height: 80/@base;
        text-align: center;
        font-size: 36/@base;
        border-radius: 40/@base;
        color: #ffffff;
        background: #facd89;
    }
    .sel_lahei{
        width: 300/@base;
        height: 80/@base;
        line-height: 80/@base;
        text-align: center;
        font-size: 36/@base;
        border-radius: 40/@base;
        color: #ffffff;
        background: #ccbda6;
    }
}
</style>