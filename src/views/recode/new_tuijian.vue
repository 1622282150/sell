<template>
  <div>
    <!-- 题目 -->
    <div class="tui_title">
      <div class="tui_title_left">达人推荐</div>
      <div class="tui_title_right">查看全部 ></div>
    </div>
    <div class="tuijian_box">
      <div class="tuijian_box_item" v-for="(item,index) in productlist" :key="index">
        <div class="tuijian_box_item_title">
          <img :src="item.BannerImg" alt />
          <div class="lable">
              <i class="iconfont icon-hot"></i>
              <span>{{item.FavoriteCount}}</span>
         </div>
        </div>
        <div class="tuijian_box_item_name">{{item.Name}}</div>
        <div class="tuijian_box_item_price">
          ¥{{item.Price}}
          <span v-show="item.PriceDes">/{{item.PriceDes}}</span>
        </div>
      </div>
    </div>
    <div class="more">别再滑了,我已经到底了</div>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  props: {
    keyvalue: {
      type: String,
      default: ""
    }
  },
  mounted() {
    console.log(this.keyvalue);
    this.GetCommodityInfoList();
  },
  data() {
    return {
      productlist: []
    };
  },
  methods: {
    GetCommodityInfoList() {
      request
        .post(this.$api + "/mobile/GetCommodityInfoList", {
          Page: 1,
          Rows: 8,
          CategroyGroup: this.keyvalue
        })
        .then(res => {
          this.productlist = res.Data.List;
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped lang='less'>
@base: 37.5rem;
.tui_title {
  padding: 0 15 / @base 0 17 / @base;
  width: 100%;
  margin-bottom: 29 / @base;
  height: 59 / @base;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .tui_title_left {
    vertical-align: bottom;
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #3e3e3e;
  }
  .tui_title_right {
    font-size: 12px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #999999;
  }
}
.tuijian_box {
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  padding-left: 13 / @base;
  padding-bottom: 5 / @base;
  .tuijian_box_item {
    padding-bottom: 17 / @base;
    margin-right: 13 / @base;
    box-shadow: 0px 2px 8px 0px #e6e6e6;
    border-radius: 10px;
    flex-shrink: 0;
    position: relative;
    width: 150 / @base;
    .tuijian_box_item_title {
      position: relative;
      width: 149 / @base;
      height: 150 / @base;
      background-color: #ffffff;
      border-radius: 10px 10px 0px 0px;
      overflow: hidden;
       .lable {
        border-radius: 6px 0px 0px 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 0;
        top: 0/ @base;
        min-width: 35/ @base;
        height: 18 / @base;
        background-color: #e4d4f7;
        color: #782ad9;
        i {
          font-size: 8 / @base;
          transform: scale(0.8);
          color: #782ad9;
        }
        span {
          font-size: 10px;
        }
      }
      img {
        position: absolute;
        left: 0;
        top: 0;
        width: 149 / @base;
        height: 150 / @base;
        border-radius: 10px 10px 0px 0px;
      }
    }
    .tuijian_box_item_name {
      font-size: 14px;
      font-weight: bold;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #3e3e3e;
      margin: 5 / @base 6 / @base 0 6 / @base;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1; //行数
      -webkit-box-orient: vertical;
    }
    .tuijian_box_item_price {
      margin: 12 / @base 6 / @base 0 6 / @base;
      font-size: 10px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #999999;
    }
  }
}
.more {
  font-size: 10px;
  font-weight: bold;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #999999;
  text-align: center;
  padding-top: 32 / @base;
  padding-bottom: 32 / @base;
}
</style>