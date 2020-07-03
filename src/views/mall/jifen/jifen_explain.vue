<template>
  <div>
    <div class="header">
      等级说明
      <img @click="$router.back()" class="img1" src="../../../assets/images/newfan.png" alt />
    </div>
    <div class="jicheng"></div>
    <div class="title">
      <img class="title_touxiang" :src="list.Avatar" alt />
      <div class="title_middle">
        <p class="name">
          {{list.UserName | communityname}}
          <img
            v-if="list.PointLevel === 1"
            src="../../../assets/images/vip_vv1.png"
            alt
          />
          <img v-else-if="list.PointLevel === 2" src="../../../assets/images/vip_vv2.png" alt />
          <img v-else-if="list.PointLevel === 3" src="../../../assets/images/vip_vv3.png" alt />
          <img v-else-if="list.PointLevel === 4" src="../../../assets/images/vip_vv4.png" alt />
          <img v-else-if="list.PointLevel === 5" src="../../../assets/images/vip_vv5.png" alt />
          <img v-else-if="list.PointLevel === 6" src="../../../assets/images/vip_vv6.png" alt />
          <img v-else src="../../../assets/images/vip_vv7.png" alt />
        </p>
        <p
          class="zhuan"
        >距离M{{list.PointLevel + 1}}{{next_name}}还差{{list.NextLevelRequiredPoints - list.CurrentPoints}}积分,加油呀</p>
      </div>
    </div>
    <step v-if="list.PointLevel" :level="list.PointLevel"></step>
  </div>
</template>

<script>
import step from './step'
import { Toast } from "vant";
import request from "@/utils/request";
export default {
    components:{
      step
    },
  data() {
    return {
      next_name: "",
      list: []
    };
  },
  mounted() {
    this.getlist();
  },
  methods: {
    getlist() {
      request
        .post(this.$api + "/mobile/GetUserPointsCenterInfo", {})
        .then(res => {
          if (res.IsSuccess) {
            this.list = res.Data;
            if (this.list.PointLevel == 1) {
              this.next_name = "精致女孩";
            } else if (this.list.PointLevel == 2) {
              this.next_name = "出水芙蓉";
            } else if (this.list.PointLevel == 3) {
              this.next_name = "花容月貌";
            } else if (this.list.PointLevel == 4) {
              this.next_name = "千娇百媚";
            } else if (this.list.PointLevel == 5) {
              this.next_name = "国色天香";
            } else if (this.list.PointLevel == 6) {
              this.next_name = "人间尤物";
            }
          } else {
            Toast(res.Message);
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
    // font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0px;
    // color: #9d80f3;
    color: #252525;
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
.title {
  position: relative;
  display: flex;
  width: 100%;
  height: 68 / @base;
    border-bottom: 1px solid #e6e6e6;
  padding-left: 14 / @base;
  .mingxi {
    position: absolute;
    right: 14 / @base;
    top: 15 / @base;
    width: 47 / @base;
    height: 20 / @base;
    border: 1px solid #ba89f8;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ba89f8;
    font-size: 12px;
    border-radius: 20px;
  }
  .title_touxiang {
    width: 51 / @base;
    height: 51 / @base;
    border-radius: 50%;
    background-size: 100% 100%;
  }
  .title_middle {
    padding-left: 11 / @base;
    .name {
      margin-top: 2 / @base;
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: bold;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #3e3e3e;
      img {
        height: 17 / @base;
        width: auto;
        background-size: 100% 100%;
        margin-left: 5 / @base;
      }
    }
    .zhuan {
      margin-top: 10 / @base;
      font-size: 12px;
      // font-weight: bold;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ba88f8;
      font-weight: bold;
    }
  }
}
</style>