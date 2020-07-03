<template>
  <div>
    <header>
      <Return>Ta的关注</Return>
    </header>
    <div class="bu"></div>
    <!-- tab卡 -->
    <van-tabs sticky :offset-top="51" v-model="active" color="#BA99EB" swipeable line-width="50%">
      <van-tab title="用户">
        <div class="user_list" v-for="(item,index) in user_list" :key="index">
          <img @click="otherself(item.ByUserId)" :src="item.UserAvator" alt />
          <div @click="otherself(item.ByUserId)" class="user_list_middle">
            <div class="user_list_middle_name">{{item.UserName | renMenLength}}</div>
            <div class="user_list_middle_des">{{item.PersonalitySignature| renMenLength}}</div>
          </div>
          <div v-if="item.Type===1" class="user_ball">已关注</div>
          <div v-else class="user_activeball">互相关注</div>
        </div>
      </van-tab>
      <van-tab title="店铺">
        <!-- 店铺列表 -->
        <div class="shop_list" @click="todianpu(item.SellerId,item.SellerType)" v-for="(item,index) in shop_list" :key="index">
          <img :src="item.BrandImg" alt />
          <div class="shop_list_middle">
            <div class="shop_list_middle_name">{{item.SellerName | renMenLength}}</div>
            <div class="shop_list_middle_count"></div>
          </div>
          <div v-if="item.Type===1" class="shop_ball">已关注</div>
          <div v-else class="shop_activeball">互相关注</div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import request from '@/utils/request'
import { Tab, Tabs } from "vant";
import Return from "../../../components/Return";
export default {
  components: {
    Return
  },
  data() {
    return {
      userid:'',
      active:0,
      user_list: [],
      shop_list: [ ]
    };
  },
  created(){
    this.userid=this.$route.query.userid
  },
  mounted(){
    this.getuserlist()
    this.getshoplist()
  },
  methods:{
   todianpu(id, type) {
      if (type === "ShopProject") {
        this.$router.push({
          path: "/shop",
          query: {
            id: id
          }
        });
      } else {
        this.$router.push({
          path: "/store_page",
          query: {
            id: id
          }
        });
      }
    },
    otherself(id) {
      this.$router.push({
        path: "/otherself",
        query: {
          id: id
        }
      });
    },
    getuserlist(){
       request.post(this.$api+'/mobile/GetOtherAttentionPageList',{
         UserId:this.userid
       }).then(res=>{
          this.user_list=res.Data.List
       }).catch(err=>{

       })
     },
     getshoplist(){
       request.post(this.$api+'/mobile/GetOtherAttentionSellerPageList',{
         UserId:this.userid
       }).then(res=>{
          this.shop_list=res.Data.List
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
  height: 102 / @base;
}

// 列表
.user_list {
  width: 100%;
  height: 100 / @base;
  //  background:red;
  padding: 10 / @base 40 / @base;
  display: flex;
  img {
     margin-top: 10/@base;
    width: 60 / @base;
    height: 60 / @base;
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
// 店铺列表
.shop_list {
  width: 100%;
  height: 150 / @base;
  // background: red;
  padding: 25 / @base 40 / @base;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  img {
    width: 170 / @base;
    height: 100 / @base;
    border-radius: 5px;
  }
  .shop_list_middle {
    padding-left: 20 / @base;
    width: 50%;
    height: 100 / @base;
    //    background: blue;
    .shop_list_middle_name {
      width: 100%;
      height: 50 / @base;
      font-size: 35 / @base;
    }
    .shop_list_middle_count {
      width: 100%;
      height: 50 / @base;
      font-size: 30 / @base;
      color: #c1bdcb;
    }
  }
  .shop_ball {
    font-size: 25 / @base;
    color: white;
    background: #aaaaaa;
    width: 170 / @base;
    height: 60 / @base;
    line-height: 60 / @base;
    text-align: center;
    border-radius: 20px;
    margin: 20/ @base 0;
  }
  .shop_activeball {
    font-size: 25 / @base;
    color: white;
    background: #c1bdcb;
    width: 170 / @base;
    height:60 / @base;
    line-height:60/ @base;
    text-align: center;
    border-radius: 20px;
    margin: 20 / @base 0;
  }
}
</style>