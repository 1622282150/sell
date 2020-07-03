<template>
  <div>
    <div class="header">
      积分明细
      <img @click="back" class="img1" src="../../../assets/images/newfan.png" alt />
    </div>
    <div class="jicheng"></div>
    <div class="banner_box">
      <div class="banner_title">我的积分</div>
      <p>{{jifen}}</p>
    </div>
    <div class="h_title">积分明细</div>
    <!-- 列表 -->
    <div class="list">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="list_item" v-for="(item,index) in list" :key="index">
          <img :src="item.Img" alt />
          <div class="list_middle">
            <p class="list_middle_top">{{item.Title}}</p>
            <p class="list_middle_bottom">{{item.DateTime}}</p>
          </div>
          <div class="list_right">
            <!-- <span v-if="item.Direction">+</span>
            <span v-else>-</span>-->
            {{item.Points}}
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import { Toast } from 'vant';
export default {
  data() {
    return {
      jifen: "",
      page: 1,
      loading: false,
      finished: false,
      list: []
    };
  },
  mounted() {
    this.jifen = window.localStorage.getItem("jifen");
    this.getMore();
  },
  methods: {
    back() {
      this.$router.back();
    },
    // 上拉加载
    onLoad() {
      // 异步更新数据
      this.page += 1;
      this.getMore();
    },
    getMore() {
      request
        .post(this.$api + "/mobile/GetUserPointsLogList", {
          Page: this.page,
          Rows: 15
        })
        .then(res => {
          if (res.IsSuccess) {
            this.loading = false;
            if (res.Data.List.length) {
              var arr = res.Data.List;
              for (let i = 0; i < arr.length; i++) {
                this.list.push(arr[i]);
              }
            } else {
              this.finished = true;
            }
          }else{
            Toast(res.Message)
            console.log('你圆的')
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
.banner_box {
  position: relative;
  width: 100%;
  height: 146 / @base;
  background: url("../../../assets/images/jifen_mingxi_banner3.png") no-repeat;
  background-size: 100% 100%;
  background-position: center;
  padding-top: 32 / @base;
  padding-left: 30 / @base;
  .banner_title {
    font-size: 11px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
  }
  p {
    font-size: 30px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
    margin-top: 20 / @base;
  }
}
.h_title {
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #333333;
  margin: 25 / @base auto 14 / @base 15 / @base;
}
.list {
  width: 100%;
  padding-left: 9 / @base;
  .list_item {
    position: relative;
    display: flex;
    width: 100%;
    padding: 11 / @base 15 / @base 11 / @base 6 / @base;
    border-bottom: 1px solid #f1f1f1;
    img {
      width: 33 / @base;
      height: 33 / @base;
      border-radius: 50%;
      background-size: 100% 100%;
    }
    .list_middle {
      margin-left: 15 / @base;
      .list_middle_top {
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #3e3e3e;
      }
      .list_middle_bottom {
        font-size: 10px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #999999;
      }
    }
    .list_right {
      height: 100%;
      position: absolute;
      top: 0;
      right: 15 / @base;
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: bold;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #333333;
    }
  }
}
</style>