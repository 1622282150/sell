<template>
  <div>
    <div class="header">
      兑换记录
      <img @click="back" class="img1" src="../../../assets/images/newfan.png" alt />
    </div>
    <div class="jicheng"></div>
    <div class="box">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="box_item" v-for="(item,index) in list" :key="index">
          <div class="item_top">
            <img :src="item.Img" alt />
            <div class="item_top_right">
              <p class="p1">{{item.ProductName}}</p>
              <p class="p2">x{{item.Count}}</p>
            </div>
          </div>
          <div class="item_bottom">
            <div class="item_left">
              <img src="../../../assets/images/jifen_ji.png" alt />
              <span>{{item.Points}}</span>
            </div>
            <div class="item_right">{{item.CreateTime}}</div>
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
      loading: false,
      finished: false,
      list: []
    };
  },
  created() {
    this.get_rec();
  },
  methods: {
    back() {
      this.$router.back();
    },
    onLoad() {
      // 异步更新数据
      this.page += 1;
      this.get_rec();
    },
    get_rec() {
      request
        .post(this.$api + "/mobile/GetMyPointsOrderDetailList", {
          Page: this.page,
          Rows: 5
        })
        .then(res => {
        //   this.list = res.Data.List;
          this.loading = false;
          if (res.Data.List.length) {
            var arr = res.Data.List;
            for (let i = 0; i < arr.length; i++) {
              this.list.push(arr[i]);
            }
          } else {
            this.finished = true;
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
.box {
  width: 100%;
  position: fixed;
  bottom: 0;
  top: 56 / @base;
  background: #f5f5f5;
  overflow: scroll;
  .box_item {
    width: 350 / @base;
    margin: 18 / @base auto;
    box-shadow: 1px 2px 5px 0px #dddddd;
    border-radius: 10px;
    background: white;
    padding: 12 / @base 10 / @base;
    .item_top {
      display: flex;
      border-bottom: 1px solid #e6e6e6;
      padding-bottom: 15 / @base;
      img {
        width: 60 / @base;
        height: 60 / @base;
        background-size: 100% 100%;
      }
      .item_top_right {
        margin-left: 13 / @base;
        .p1 {
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          line-height: 36 / @base;
          color: #333333;
        }
        .p2 {
          font-size: 12px;
          font-weight: bold;
          font-stretch: normal;
          line-height: 24 / @base;
          letter-spacing: 0px;
          color: #666666;
        }
      }
    }
    .item_bottom {
      margin-top: 8/@base;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .item_left {
        display: flex;
        align-items: center;
        img {
          width: 18px;
          height: 18px;
        }
        span {
          margin-left: 8 / @base;
          font-size: 16px;
          font-weight: bold;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #efbd32;
        }
      }
      .item_right {
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #999999;
      }
    }
  }
}
</style>