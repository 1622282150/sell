<template>
  <div>
     <header>
      <Return>Ta的粉丝</Return>
    </header>
    <div class="bu"></div>
     <div class="user_list" v-for="(item,index) in user_list" :key="index">
          <img @click="otherself(item.LinkUserId)" :src="item.UserAvator" alt />
          <div class="user_list_middle">
            <div class="user_list_middle_name">{{item.UserName | renMenLength}}</div>
            <div class="user_list_middle_des">{{item.PersonalitySignature| renMenLength}}</div>
          </div>
          <div v-if="item.Type === 1" class="user_ball">已关注</div>
          <div v-else class="user_activeball">互相关注</div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import Return from "../../../components/Return";
export default {
    components: {
    Return
  },
  data() {
    return {
      userid:'',
      user_list: [],
    };
  },
  created(){
    this.userid=this.$route.query.userid
  },
  mounted(){
   this.getlist()
  },
  methods:{
     otherself(id) {
      this.$router.push({
        path: "/otherself",
        query: {
          id: id
        }
      });
    },
     getlist(){
       request.post(this.$api+'/mobile/GetOtherFansPageList',{
         UserId:this.userid
       }).then(res=>{
          this.user_list=res.Data.List
       }).catch(err=>{

       })
     }
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
header {
  background: white;
  width: 100%;
  text-align: center;
  position: fixed;
  top: 0;
  border-bottom: 1px solid #e6e6e6;
  z-index: 100;
}
.bu {
  width: 100%;
  height: 100/ @base;
  
}

// 列表
.user_list {
  width: 100%;
  height: 100 / @base;
  //  background:red;
  padding: 10 / @base 40 / @base;
  display: flex;
  img {
    width: 80 / @base;
    height: 80 / @base;
    border-radius: 50%;
  }
  .user_list_middle {
    padding-left: 20 / @base;
    width: 60%;
    height: 80 / @base;
    //  background: blue;
    .user_list_middle_name {
      width: 100%;
      height: 40 / @base;
      font-size: 30 / @base;
    }
    .user_list_middle_des {
      width: 100%;
      height: 40 / @base;
      font-size: 28 / @base;
      color: #b1b1b1;
    }
  }
  .user_ball {
    font-size: 25 / @base;
    color: white;
    background: #aaaaaa;
    width: 170 / @base;
    height: 50 / @base;
    line-height: 50 / @base;
    text-align: center;
    border-radius: 20px;
    margin: 15 / @base 0;
  }
  .user_activeball {
    font-size: 25 / @base;
    color: white;
    background: #c1bdcb;
    width: 170 / @base;
    height: 50 / @base;
    line-height: 50 / @base;
    text-align: center;
    border-radius: 20px;
    margin: 15 / @base 0;
  }
}
</style>