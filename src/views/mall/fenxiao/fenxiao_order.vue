<template>
  <div>
    <div class="header">
      分销订单
      <img @click="$router.back()" class="img1" src="../../../assets/images/newfan.png" alt />
      <!-- <i class="iconfont icon-rili"></i> -->
    </div>
    <div class="jicheng"></div>
    <div class="title">
      <div class="title_item" @click="sel(index)" v-for="(item,index) in title" :key="index">
        <div class="name" :class="activeindex === index?'name_active':''">{{item}}</div>
        <div class="line" :class="activeindex === index?'line_active':''"></div>
      </div>
    </div>
    <div class="box">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="box_item" v-for="(item,index) in list" :key="index">
          <div class="item_top">
            <p class="p1">
              买家:{{item.BuyerName}}
              <span>{{item.CreateDate}}</span>
            </p>
            <p class="p2" style="color: #50e210;" v-if="item.Status === 1">已分成</p>
            <p class="p2" style="color: #ec1f1f;" v-else-if="item.Status === 0">待分成</p>
            <p class="p2" style="color: #666666;" v-else>取消分成</p>
          </div>
          <div class="main_box">
            <img :src="item.Img" alt />
            <div class="main">
              <p class="p1">{{item.Title}}</p>
              <p class="p2">x{{item.Count}}</p>
              <div class="more">
                <div class="left">¥{{item.Price}}</div>
                <div class="right">
                  <div class="right1">收益:¥{{item.IncomePrice}}</div>
                  <div class="right2">积分:{{item.IncomePoints}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom">订单号:{{item.Id}}</div>
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
      activeindex: 0,
      title: ["全部", "待分成", "已分成", "取消分成"],
      page: 1,
      list: [],
      loading: false,
      finished: false,
      status: ""
    };
  },
  mounted() {
    this.get_tixian();
  },
  methods: {
    onLoad() {
      // 异步更新数据
      this.page += 1;
      this.get_tixian();
    },
    sel(index) {
      this.activeindex = index;
       if (this.activeindex == 0) {
        this.status = "";
        this.page = 1;
        this.finished = false;
        this.loading = false;
        this.list = [];
        this.get_tixian();
      } else if (this.activeindex == 1) {
        this.status = 0;
        this.page = 1;
        this.finished = false;
        this.loading = false;
        this.list = [];
        this.get_tixian();
      } else if (this.activeindex == 2) {
        this.status = 1;
        this.page = 1;
        this.finished = false;
        this.loading = false;
        this.list = [];
        this.get_tixian();
      } else if (this.activeindex == 3) {
        this.status = -2;
        this.page = 1;
        this.finished = false;
        this.loading = false;
        this.list = [];
        this.get_tixian();
      }
    },
    get_tixian() {
      request
        .post(this.$api + "/mobile/GetDistributionOrderList", {
          Page: this.page,
          Rows: 10,
          Status: this.status,
          Date: ""
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
  .img1 {
    position: absolute;
    top: 19 / @base;
    left: 13 / @base;
    width: auto;
    height: 21 / @base;
    background-size: 100% 100%;
  }
  i {
    position: absolute;
    top: 17 / @base;
    right: 16 / @base;
    font-size: 22px;
  }
}
.jicheng {
  width: 100%;
  height: 56 / @base;
  margin-bottom: 2px;
}
.title {
  display: flex;
  width: 100%;
  background: #ffffff;
  padding-right: 15 / @base;
  .title_item {
    width: 25%;
    height: 29 / @base;
    .name {
      text-align: center;
      font-size: 15px;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #666666;
    }
    .name_active {
      font-weight: bold;
      color: #3e3e3e !important;
    }
    .line {
      margin: 3 / @base auto 0 auto;
      width: 14 / @base;
      height: 4 / @base;
      border-radius: 2px;
      background: white;
    }
    .line_active {
      background: #ca5df4;
    }
  }
}
.box {
  position: fixed;
  top: 88 / @base;
  bottom: 0;
  width: 100%;
  background: #f5f5f5;
  overflow: scroll;
  .box_item {
    padding: 0 12 / @base;
    margin: 12 / @base;
    background-color: #ffffff;
    box-shadow: 0px 2px 10px 0px rgba(160, 160, 160, 0.35);
    border-radius: 10px;
    .item_top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 40 / @base;
      .p1 {
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #3e3e3e;
        span {
          margin-left: 10 / @base;
        }
      }
      .p2 {
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
      }
    }
    .main_box {
      border-top: 1px solid #e6e6e6;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      width: 100%;
      padding: 15 / @base 0;
      img {
        min-width: 80 / @base;
        max-width: 80 / @base;
        height: 80 / @base;
        border-radius: 8px;
      }
      .main {
        width: 100%;
        margin-left: 9 / @base;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .p1 {
          font-size: 14px;
          font-weight: bold;
          font-stretch: normal;
          line-height: 18 / @base;
          letter-spacing: 0px;
          color: #666666;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2; //行数
          -webkit-box-orient: vertical;
        }
        .p2 {
          font-size: 14px;
          font-weight: bold;
          font-stretch: normal;
          line-height: 18 / @base;
          letter-spacing: 0px;
          color: #999999;
        }
        .more {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .left {
            font-size: 16px;
            font-weight: bold;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #9c49fc;
          }
          .right {
            display: flex;
            .right1 {
              text-align: center;
              min-width: 65 / @base;
              padding: 4 / @base 0;
              font-size: 12px;
              font-weight: bold;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #fefefe;
              background-color: #fd292a;
              border-radius: 4px;
            }
            .right2 {
              margin-left: 4 / @base;
              text-align: center;
              min-width: 65 / @base;
              padding: 4 / @base 0;
              font-size: 12px;
              font-weight: bold;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #895620;
              background-color: #fce314;
              border-radius: 4px;
            }
          }
        }
      }
    }
    .bottom {
      display: flex;
      align-items: center;
      width: 100%;
      height: 37 / @base;
      font-size: 13px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #3e3e3e;
    }
  }
}
</style>