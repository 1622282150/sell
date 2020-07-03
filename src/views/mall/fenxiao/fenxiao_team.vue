<template>
  <div>
    <div class="header">
      我的团队({{list.length}}人)
      <img @click="$router.back()" class="img1" src="../../../assets/images/newfan.png" alt />
    </div>
    <div class="jicheng"></div>
    <div class="hui"></div>
    <div class="box">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="box_item" v-for="(item,index) in list" :key="index">
          <img :src="item.Img" alt />
          <div class="item_right">
            <p class="p1">{{item.InviteUserName}}</p>
            <p class="p2">{{item.InviteDate}}</p>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      page: 1,
      list: [],
      loading:false,
      finished:false,
    };
  },
  mounted() {
    this.getTeam();
  },
  methods: {
    onLoad(){
     this.page+=1;
     this.getTeam()
    },
    getTeam() {
      request
        .post(this.$api + "/mobile/GetMyInviteFriendList", {
          Page: this.page,
          Rows: 10
        })
        .then(res => {
         this.loading=false;
          if(res.Data.List.length){
            var arr=res.Data.List
                for(let i=0;i<arr.length;i++){
                  this.list.push(arr[i])
                }
          }else{
            this.finished=true
          }
        })
        .catch(err => {});
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
.hui {
  width: 100%;
  height: 8 / @base;
  background: #f5f5f5;
}
.box {
  width: 100%;
  padding: 20 / @base;
  .box_item {
    padding: 8 / @base 0;
    width: 100%;
    display: flex;
    align-items: center;
    img {
      width: 30 / @base;
      height: 30 / @base;
      margin-right: 11 / @base;
    }
    .item_right {
      .p1 {
        font-size: 15px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: -1px;
        color: #333333;
      }
      .p2 {
        font-size: 12px;
        font-weight: normal;
        letter-spacing: 0px;
        color: #636363;
      }
    }
  }
}
</style>