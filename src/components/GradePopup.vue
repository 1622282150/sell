<template>
  <div>
    <!-- 公用弹窗.社区，消息.我的.查看测妆报告.查看测肤报告.商城.任务中心 -->
    <van-popup v-model="show_grade">
      <div class="grade_popup">
        <div class="grade_img"></div>
        <p class="p1">M{{info.Level}}</p>
        <p class="p2">{{info.Name}}</p>
        <div class="grade_main">
          <div class="main_top">
            <p>成功升级</p>
          </div>
          <div class="main_bottom">
            <p class="p3">伦家可是M{{info.Level}}.{{info.Name}}级别了呢~(*^▽^*)</p>
            <p class="p4">
              达到
              <span>M{{info.NextLevel}}.{{info.NextName}}</span>级别
            </p>
            <p class="p5">
              即可获得
              <span v-for="(item,index) in info.NextRightList" :key="index">{{item.Name}}</span>特权
            </p>
            <div class="bbtn" @click="show_grade = false">继续</div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Popup } from "vant";
import request from "@/utils/request";
export default {
  data() {
    return {
      show_grade: false,
      info:[],
    };
  },
  mounted() {
    this.GetUserPointsUpLevelTip();
  },
  methods: {
    GetUserPointsUpLevelTip() {
      request
        .post(this.$api + "/mobile/GetUserPointsUpLevelTip", {})
        .then(res => {
           if(res.IsSuccess){
             this.show_grade=res.Data.TipFlag
             if(res.Data.List.length>0){
               this.info=res.Data.List[res.Data.List.length - 1]
             }
           }
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
/deep/.van-popup {
  background: none;
}
.grade_popup {
  position: relative;
  width: 500 / @base;
  min-height: 684 / @base;
  .p1 {
    position: absolute;
    top: 106 / @base;
    width: 100%;
    text-align: center;
    font-size: 33px;
    color: #ffffff;
    z-index: 14;
  }
  .p2 {
    position: absolute;
    top: 190 / @base;
    width: 100%;
    text-align: center;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
    z-index: 14;
  }
  .grade_img {
    position: absolute;
    left: 88 / @base;
    top: 0;
    z-index: 13;
    height: 247 / @base;
    width: 323 / @base;
    background: url("../assets/images/grade_popup.png") no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
  }
  .grade_main {
    z-index: 12;
    position: absolute;
    top: 151 / @base;
    left: 0 / @base;
    width: 100%;
    height: 500 / @base;
    border-radius: 20 / @base;
    
    .main_top {
      position: relative;
      border-top-right-radius: 20 / @base;
      border-top-left-radius: 20 / @base;
      width: 100%;
      height: 224 / @base;
      background-image: linear-gradient(130deg, #cc72f1 0%, #e3b6f5 100%);
      p {
        position: absolute;
        bottom: 55 / @base;
        width: 100%;
        text-align: center;
        font-size: 42 / @base;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
    .main_bottom {
      background-color: #ffffff;
      padding-bottom: 30/@base;
      padding-top: 40/@base;
      border-bottom-left-radius: 20/@base;
      border-bottom-right-radius: 20/@base;
      .p3 {

        font-size: 24 / @base;
        text-align: center;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #2e2e2e;
      }
      .p4 {
        text-align: center;
        margin-top: 27 / @base;
        font-size: 20 / @base;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #5e5e5e;
        span {
          font-size: 20 / @base;
          font-weight: bold;
          letter-spacing: 0px;
          color: #711995;
        }
      }
      .p5 {
        margin-top: 5 / @base;
        text-align: center;
        font-size: 20 / @base;
        font-weight: normal;
        letter-spacing: 0px;
        color: #5e5e5e;
        span {
          color: #711995;
          font-style: italic;
        }
      }
      .bbtn {
        width: 400 / @base;
        height: 60 / @base;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #711995;
        border-radius: 30 / @base;
        font-size: 26 / @base;
        font-weight: normal;
        font-stretch: normal;
        margin: 40/@base auto auto auto;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
  }
}
</style>