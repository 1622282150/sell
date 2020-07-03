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
    <van-sticky @scroll="scroll" :offset-top="55">
      <div ref="main_head" class="sale_title">
        <!-- <van-dropdown-menu active-color="#b695e9">
          <van-dropdown-item title="全城" ref="item">
            <div class="out">
              <div
                class="city"
                :class="{ active: id == index, padd: index == 0}"
                v-for="(item, index) in list"
                :key="index"
              >
                <div class="dist">{{item.distance}}</div>
                <span>{{item.name}}</span>
              </div>
            </div>
          </van-dropdown-item>
        </van-dropdown-menu>-->
        <div class="sale_title_first">
          <van-dropdown-menu active-color="#b695e9">
            <van-dropdown-item title="全城" ref="item">
              <div class="out">
                <div
                  class="city"
                  v-for="(item, index) in list"
                  :key="index"
                >
                  <div class="dist">{{item.distance}}</div>
                  <span>{{item.name}}</span>
                </div>
              </div>
            </van-dropdown-item>
          </van-dropdown-menu>
        </div>
        <div class="sale_title_second">人气</div>
        <div class="sale_title_third">
          <van-dropdown-menu active-color="#b695e9">
            <van-dropdown-item title="筛选" ref="item">
              <div class="shaixuan">
                <div class="shaixuan_title">类别</div>
                <div class="shaixuan_box">
                  <div class="shaixuan_box_item" v-for="(item,index) in type" :key="index">{{item}}</div>
                </div>
                 <div class="shaixuan_title">功效</div>
                <div class="shaixuan_box">
                  <div class="shaixuan_box_item" v-for="(item,index) in type" :key="index">{{item}}</div>
                </div>
                <div class="shaixuan_bottom">
                  <div class="shaixuan_bottom_left">重置</div>
                  <div class="shaixuan_bottom_right">确定</div>
                </div>
              </div>
            </van-dropdown-item>
          </van-dropdown-menu>
        </div>
      </div>
    </van-sticky>
    <!-- 内容 -->
    <div ref="product" class="box" :class="isFixed?'navSticky':''">
      <div class="box_list">
        <div class="box_list_item" v-for="(item,index) in 10" :key="index">
          <img src="../../../assets/images/product_meirong.jpg" alt />
          <div class="box_list_item_right">
            <div class="box_list_item_rightname">收缩毛孔专用清透控油面膜收缩毛孔收可好看</div>
            <div class="box_list_item_rightflag">保湿清透</div>
            <div class="box_list_item_rightprice">
              活动价:
              <span style="margin-left:0.06rem;color:#B897EB">¥</span>
              <span style="color:#B897EB;margin-left:0.10rem;font-size:0.5rem">16</span>
            </div>
            <div class="box_list_item_rightdiscount">
              <div>折扣</div>3.8折
            </div>
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
      active_title: 0,
      isFixed: true,
      title_list: ["精选", "今日上新", "限量抢购", "限时秒杀"],
      list: [
        { name: "附近 >", distance: "1km" },
        { name: "西湖区", distance: "2km" },
        { name: "江干区", distance: "3km" }
      ],
      type:['脸部','腿部','脸部','脸部','脸部','脸部','脸部','脸部','脸部'],
    };
  },
  mounted() {},

  methods: {
    toqiang() {
      console.log("yes");
    },
    scroll(a) {
      if (a.scrollTop >= 90) {
        this.isFixed = false;
      } else {
        this.isFixed = true;
      }
    },
    sel_title(index) {
      this.active_title = index;
    }
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
.van-dropdown-menu__item--disabled {
  color: black;
}
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
    z-index: 1111;
    width: 100%;
    height: 60px;
    position: fixed;
    left: 0;
    top: 0;
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
.buwei {
  margin-top: 290 / @base;
  width: 100%;
  height: 10 / @base;
}
// 标题
.sale_title {
  display: flex;
  width: 100%;
  height: 50px;
  background: white;
  z-index: 22;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  .sale_title_first {
    width: 33%;
    height: 50px;
  }
  .sale_title_second {
    width: 34%;
    height: 50px;
    line-height:50px;
    text-align: center;
    font-size:15px;
  }
  .sale_title_third {
    width: 33%;
    height:50px;
    .shaixuan{
       width: 100%;
       height: 620/@base;
       padding:0 40/@base;
       .shaixuan_title{
         width: 100%;
         height: 80/@base;
         line-height: 80/@base;
         font-size: 30/@base;
         color:#484848;
       }
       .shaixuan_box{
         width: 100%;
         padding-bottom: 40/@base;
         border-bottom: 1px solid #e6e6e6;
        //  height: 120/@base;
         
         .shaixuan_box_item{
           display: inline-block;
           width: 120/@base;
           height: 50/@base;
           line-height: 50/@base;
           border: 1px solid #A9A9A9;
           color: #A9A9A9;
           font-size: 20/@base;
           text-align: center;
           margin-right: 15/@base;
         &:nth-child(5n){
           margin-right: 0
         }
         }
         .shaixuan_bottom{
           
         }
       }
    }
  }
  //   新来的
  .out {
    margin-top: 15 / @base;
    .city {
      font-size: 28 / @base;
      padding: 0 90 / @base;
      padding-bottom: 20 / @base;
      position: relative;
      span {
        margin-right: 90 / @base;
      }
      .dist {
        position: absolute;
        top: 0;
        left: 315 / @base;
      }
    }
  }
}
// 内容部分
.box {
  width: 100%;
  height: calc(100vh - 64px);
  overflow-y: scroll;

  .box_list {
    pointer-events: auto;
    z-index: 111;
    // background: #00ccff;
    .box_list_item {
      z-index: 111;
      display: flex;
      width: 100%;
      height: 280 / @base;
      background: white;
      border-bottom: 1px solid #e6e6e6;
      padding: 20 / @base 40 / @base;
      img {
        width: 240 / @base;
        height: 240 / @base;
        border-radius: 10 / @base;
      }
      .box_list_item_right {
        position: relative;
        width: 70%;
        height: 240 / @base;
        // background: blue;
        padding-left: 20 / @base;
        .box_list_item_rightname {
          font-size: 32 / @base;
        }
        .box_list_item_rightflag {
          margin-top: 10 / @base;
          font-size: 20 / @base;
          color: #989898;
        }
        .box_list_item_rightprice {
          margin-top: 30 / @base;
          font-size: 25 / @base;
        }
        .box_list_item_rightdiscount {
          position: relative;
          font-size: 19 / @base;
          width: 140 / @base;
          height: 40 / @base;
          line-height: 40 / @base;
          border: 1px solid #b897eb;
          color: #b897eb;
          border-radius: 20 / @base;
          padding-left: 70 / @base;
          div {
            position: absolute;
            left: -1px;
            top: 0;
            width: 60 / @base;
            height: 38 / @base;
            text-align: center;
            line-height: 40 / @base;
            background: #b694ea;
            color: white;
            border-radius: 20 / @base;
          }
        }
        .box_list_item_rightball {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 160 / @base;
          height: 50 / @base;
          line-height: 50 / @base;
          border-radius: 20px;
          background: #b897eb;
          font-size: 23 / @base;
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