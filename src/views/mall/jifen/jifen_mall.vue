<template>
  <div>
    <div class="header">
      积分商城
      <img @click="back" class="img1" src="../../../assets/images/newfan.png" alt />
      <span @click="$router.push('/jifen_record')">兑换记录</span>
    </div>
    <div class="jicheng"></div>
    <!-- title -->
    <div class="title">
      <p class="title_right_top">
        <img src="../../../assets/images/jifen_ji.png" alt />当前积分
      </p>
      <p class="title_right_bottom">{{userinfo.CurrentPoints}}</p>
      <img class="title_touxiang" :src="userinfo.Avatar" alt />
      <div class="title_middle">
        <p class="name">
          {{userinfo.UserName | communityname}}
          <img
            v-if="userinfo.PointLevel === 1"
            src="../../../assets/images/vip_vv1.png"
            alt
          />
          <img v-else-if="userinfo.PointLevel === 2" src="../../../assets/images/vip_vv2.png" alt />
          <img v-else-if="userinfo.PointLevel === 3" src="../../../assets/images/vip_vv3.png" alt />
          <img v-else-if="userinfo.PointLevel === 4" src="../../../assets/images/vip_vv4.png" alt />
          <img v-else-if="userinfo.PointLevel === 5" src="../../../assets/images/vip_vv5.png" alt />
          <img v-else-if="userinfo.PointLevel === 6" src="../../../assets/images/vip_vv6.png" alt />
          <img v-else src="../../../assets/images/vip_vv7.png" alt />
        </p>
        <p class="zhuan" @click="$router.push('/task_center')">赚取积分 ></p>
      </div>
    </div>
    <div v-if="show">
      <div class="huodong">
        <div class="huodong_left">
          限时秒杀
          <Clock v-if="start" :startTime="start" :endTime="end"></Clock>
        </div>
        <!-- <div class="huodong_right">查看全部</div> -->
      </div>
      <!-- 限时秒杀 -->
      <div class="xianshi_box">
        <div
          class="xianshi_item"
          @click="todetail(item.Id)"
          v-for="(item,index) in xianshilist"
          :key="index"
        >
          <div class="tupian">
            <img :src="item.BannerImg" alt />
          </div>
          <div class="xianshi_name">
            <p>
              <span>M{{item.MinLevel}}专享</span>
            </p>
            <div>{{item.Name}}</div>
          </div>
          <div class="xianshi_price">
            <div>
              <img src="../../../assets/images/jifen_ji.png" alt />
              {{item.Points}}
            </div>
            <span>{{item.BuyCount}}人已兑</span>
          </div>
        </div>
      </div>
    </div>
    <img
      v-show="imglist != null"
      @click="zhuan"
      class="banner"
      src="../../../assets/images/jifen_mall_banner.png"
      alt
    />
    <div class="huodong">
      <div class="huodong_left">精选商品</div>
    </div>
    <div class="box">
      <div
        class="box_item"
        @click="todetail(item.CommodityId)"
        v-for="(item,index) in product"
        :key="index"
      >
        <div class="box_title">
          <img :src="item.BannerImg" alt />
        </div>
        <div class="box_price">
          <p>
            <span>M{{item.MinLevel}}专享</span>
          </p>
          <div>
            <img src="../../../assets/images/jifen_ji.png" alt />
            <span v-html="item.Points"></span>
          </div>
        </div>
        <p class="box_name">{{item.Name}}</p>
        <div class="box_bottom">
          <span>{{item.BuyCount}}人已兑</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Clock from "./clock";
import request from "@/utils/request";
import { CountDown } from "vant";
export default {
  components: {
    Clock
  },
  data() {
    return {
      imglist:[],//活动图片数组
      show: false, // 显示活动
      start: "",
      end: "",
      userinfo: [],
      xianshilist: [],
      product: []
    };
  },
  mounted() {
    this.getuserinfo();
    this.getxianshi();
    this.getproduct();
    this.getimg()
  },
  methods: {
    zhuan(){
     this.$router.push({
       path:'/jifen_turntable',
       query:{
         sign:this.imglist.Code
       }
     })
    },
    back() {
      console.log("我是子组件返回");
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        // on close
        console.log("我是要去安卓");
        // let url='http://test1.merrychange.net/#/articlestie?id='+this.articleid
        window.android.closePage();
        this.$router.back();
      } else {
        this.$router.back(-1);
      }
    },
    todetail(id) {
      // console.log(id)
      this.$router.push({
        path: "/jifen_detail",
        query: {
          id: id
        }
      });
    },
    // 用户信息
    getuserinfo() {
      request
        .post(this.$api + "/mobile/GetUserPointsInfo", {})
        .then(res => {
          this.userinfo = res.Data;
        })
        .catch(err => {});
    },
    // 限时活动
    getxianshi() {
      request
        .post(this.$api + "/mobile/GetPSActivityList", {
          Page: 1,
          Rows: 1
        })
        .then(res => {
          console.log(res.Data.length);
          if (res.Data.length == 0) {
            console.log("我是没有值得");
            this.xianshilist = [];
            this.show = false;
          } else {
            console.log("我是有值的");
            this.show = true;
            this.xianshilist = res.Data[0].List;
            this.start = res.Data[0].BeginDate;
            this.end = res.Data[0].EndDate;
          }
          console.log("show", this.show);
        })
        .catch(err => {});
    },
    // 精选商品
    getproduct() {
      request
        .post(this.$api + "/mobile/GetPointsShoppingCenterCommodityList", {
          Page: 1,
          Rows: 10
        })
        .then(res => {
          this.product = res.Data.List;
        })
        .catch(err => {});
    },
    getimg(){
      request.post(this.$api+'/mobile/GetTopLotteryActivity',{

      }).then(res=>{
        this.imglist=res.Data
      }).catch(err=>{

      })
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
.title {
  position: relative;
  display: flex;
  width: 100%;
  height: 68 / @base;
  border-bottom: 1px solid #e6e6e6;
  padding-left: 14 / @base;
  .title_right_top {
    position: absolute;
    top: 0;
    right: 12 / @base;
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #e1e1e1;
    img {
      width: 16 / @base;
      height: 16 / @base;
      border-radius: 50%;
      margin-right: 5 / @base;
    }
  }
  .title_right_bottom {
    position: absolute;
    bottom: 10 / @base;
    right: 12 / @base;
    font-size: 24px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #3e3e3e;
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
      font-size: 11px;
      // font-weight: bold;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #9d80f3;
    }
  }
}
.huodong {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-left: 14 / @base;
  padding-right: 12 / @base;
  width: 100%;
  height: 30 / @base;
  margin-bottom: 14 / @base;
  .huodong_left {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #333333;
  }
  .huodong_right {
    font-size: 11px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #999999;
  }
}
// 限时活动
.xianshi_box {
  position: relative;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  padding-left: 11 / @base;
  .xianshi_item {
    flex-shrink: 0;
    position: relative;
    margin-right: 8 / @base;
    width: 141 / @base;
    .tupian {
      position: relative;
      width: 141 / @base;
      height: 141 / @base;
      border-radius: 10px;
      overflow: hidden;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 141 / @base;
        height: 141 / @base;
        border-radius: 10px;
        background-size: 100% 100%;
      }
    }
    .xianshi_name {
      display: flex;
      align-items: center;
      margin-top: 9 / @base;
      p {
        margin-left: 2 / @base;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 13 / @base;
        width: auto;
        padding: 0 3 / @base;
        white-space: nowrap;
        background: #782ad9;
        opacity: 0.6;
        transform: skew(-15deg);
        span {
          font-size: 10px;
          font-weight: bold;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #fefefe;
          text-align: center;
          transform: scale(0.8) skew(15deg);
        }
      }
      div {
        margin-left: 6 / @base;
        font-size: 11px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #333333;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; //行数
        -webkit-box-orient: vertical;
      }
    }
    .xianshi_price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 7 / @base;
      div {
        display: flex;
        align-items: center;
        font-size: 11px;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #efbd32;
        img {
          width: 13 / @base;
          height: 13 / @base;
          background-size: 100% 100%;
          border-radius: 50%;
          margin-right: 7 / @base;
        }
      }
      span {
        font-size: 10px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #999999;
        transform: scale(0.8);
      }
    }
  }
}
.banner {
  width: 100%;
  height: auto;
  background-size: 100% 100%;
  margin-bottom: 20 / @base;
  margin-top: 15 / @base;
}
.box {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding-left: 3%;
  // padding-right: 3%;
  .box_item {
    margin-bottom: 18 / @base;
    padding-bottom: 6 / @base;
    width: 29%;
    margin-right: 10 / @base;
    box-shadow: 2px 3px 8px 1px rgba(187, 187, 187, 0.28);
    border-radius: 8px;
    .box_title {
      position: relative;
      width: 100%;
      height: 110 / @base;
      border-radius: 8px;
      overflow: hidden;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 110 / @base;
        border-radius: 8px;
      }
    }
    .box_name {
      margin-left: 5 / @base;
      margin-top: 9 / @base;
      font-size: 11px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #333333;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1; //行数
      -webkit-box-orient: vertical;
    }
    .box_price {
      padding: 0 5 / @base;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 9 / @base;
      font-size: 11px;
      font-weight: bold;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #efbd32;
      p {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 13 / @base;
        width: auto;
        padding: 0 3 / @base;
        white-space: nowrap;
        background: #782ad9;
        opacity: 0.6;
        transform: skew(-15deg);
        span {
          font-size: 10px;
          font-weight: bold;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #fefefe;
          text-align: center;
          transform: scale(0.8) skew(15deg);
        }
      }
      div {
        display: flex;
        align-items: center;
        img {
          width: 13 / @base;
          height: 13 / @base;
          background-size: 100% 100%;
          border-radius: 50%;
          margin-right: 0 / @base;
        }
        span {
          transform: scale(0.8);
        }
      }
    }
    .box_bottom {
      margin-left: 5 / @base;
      margin-top: 8 / @base;
      font-size: 10px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #999999;
      span {
        transform: scale(0.8);
      }
    }
  }
}
</style>