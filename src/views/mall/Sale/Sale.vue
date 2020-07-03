<template>
  <div>
<!-- 头部 -->
    <div class="head-top">
      <div class="head-search">
        <i style="color:white;position:fixed;top:2%;left:3%;" class="iconfont icon-zuojiantou"></i>
        <input type="text" placeholder="大家都在搜~" />
        <i style="position:fixed;top:2%;left:15%;color:#696968" class="iconfont icon-sousuo"></i>
      </div>
    </div>
    <div class="buwei"></div>
    <!-- 中间标题 -->
    <van-sticky @scroll="scroll" :offset-top="60">
      <div ref="main_head" class="sale_title">
        <div class="sale_title_item" :class="active_title===index?'title_active':''" v-for="(item,index) in title_list" :key='index' @click="sel_title(index)">
          <div :class="index===0?'line':(index===1?'line':(index===2?'line':''))"></div>
          <i v-show="active_title===index" class="iconfont icon-xiangshang2"></i>
          {{item}}</div>
      
      </div>
    </van-sticky>
    <!-- 内容 -->
    <div ref="product" class="box" :class="isFixed?'navSticky':''">
      <div class="box_list">
        <div class="box_list_item" v-for="(item,index) in 10" :key='index'>
          <img src="../../../assets/images/product_meirong.jpg" alt="">
          <div class="box_list_item_right">
            <div class="box_list_item_rightname">收缩毛孔专用清透控油面膜收缩毛孔收可好看</div>
             <div class="box_list_item_rightflag">保湿清透</div>
              <div class="box_list_item_rightprice">活动价:<span style="margin-left:0.06rem;color:#B897EB">¥</span><span style="color:#B897EB;margin-left:0.10rem;font-size:0.5rem">16</span></div>
              <div class="box_list_item_rightdiscount"><div>折扣</div>3.8折</div>
             <div class="box_list_item_rightball" @click="toqiang">马上抢</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Sticky } from "vant";
export default {
  data() {
    return {
      active_title:0,
      isFixed:true,
      title_list:['精选','今日上新','限量抢购','限时秒杀']
    };
  },
  mounted() {},

  methods: {
    toqiang(){
       console.log('yes')
    },
    scroll(a) {
      if (a.scrollTop >= 90) {
        this.isFixed=false
      } else {
        this.isFixed=true
      }
    },
    sel_title(index){
      this.active_title=index
    }
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
// 头部固定部分
.head-top {
  position: fixed;
  top: 0;
  width: 100%;
  height: 350 / @base;
  z-index: -1;
  background: url(../../../assets/images/sale.png) no-repeat;
  background-size: 100% 100%;
  .head-search {
    width: 100%;
    height: 60px;
    // position: fixed;
    // left: 0;
    // top: 0;
    input {
      opacity: 0.5;
      position: fixed;
      top: 2%;
      left: 13%;
      width: 80%;
      padding: 15 / @base 0 15 / @base 80 / @base;
      text-align: left;
      font-size: 30 / @base;
      border-radius: 20px;
      height: 60 / @base;
    }
    i {
      font-size: 55 / @base;
    }
  }
}
.buwei{
  margin-top: 290/@base;
  width: 100%;
  height:10/@base;
}
// 标题
.sale_title {
  display: flex;
  width: 100%;
  height: 120 / @base;
  background: white;
  z-index: 11;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  .title_active{
    color: #B694EA;
  }
  .sale_title_item{
    position: relative;
    width: 25%;
    height: 100%;
    line-height: 120/@base;
    text-align: center;
    font-size: 33/@base;
    i{
      display: inline-block;
      width: 35/@base;
      height: 35/@base;
      text-align: center;
      line-height: 35/@base;
      position: absolute;
      bottom:0;
      left: 40%;
    }
    .line{
      position: absolute;
      right: 0;
      top: 40/@base;
      width: 1px;
      height:40/@base;
      background: black;
    }
    
  }
}
// 内容部分
.box {
  width: 100%;
  height: calc(100vh - 64px);
  overflow-y: scroll;
  z-index: 11;
  .box_list {
    pointer-events: auto;
    // background: #00ccff;
    .box_list_item{
      display: flex;
      width: 100%;
      height: 280/@base;
      background: white;
      border-bottom: 1px solid #e6e6e6;
      padding: 20/@base 40/@base;
      img{
        width:240/@base;
        height:240/@base;
        border-radius: 10/@base;


      }
      .box_list_item_right{
        position: relative;
        width:70%;
        height:240/@base;
        // background: blue;
        padding-left: 20/@base;
        .box_list_item_rightname{
          font-size: 32/@base;
        }
        .box_list_item_rightflag{
          margin-top: 10/@base;
          font-size: 20/@base;
          color: #989898;
        }
        .box_list_item_rightprice{
          margin-top: 30/@base;
          font-size: 25/@base;
        }
        .box_list_item_rightdiscount{
          position: relative;
          font-size:19/@base;
          width: 140/@base;
          height: 40/@base;
          line-height: 40/@base;
          border: 1px solid #B897EB;
          color: #B897EB;
          border-radius: 20/@base;
          padding-left: 70/@base;
          div{
            position: absolute;
             left: -1px;;
            top: 0;
            width: 60/@base;
            height: 38/@base;
            text-align: center;
            line-height: 40/@base;
            background: #B694EA;
            color: white;
            border-radius: 20/@base;
          }
        }
        .box_list_item_rightball{
          position: absolute;
          right: 0;
          bottom: 0;
          width: 160/@base;
          height: 50/@base;
          line-height: 50/@base;
          border-radius: 20px;
          background:#B897EB;
          font-size: 23/@base;
          color: white;
          text-align: center;
        }
      }

    }
  }
}
.navSticky {
  pointer-events: none;
}
</style>