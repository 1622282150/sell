<template>
  <div>
    <header>
      <i @click="$router.back()" class="iconfont icon-zuojiantou"></i>
      <div class="head">发表评价</div>
      <span style="z-index:16" @click="add">发布</span>
    </header>
    <div v-if="list.length" class="main">
      <div class="box" v-for="(item,index) in list" :key="index">
        <div class="title">
          <img :src="item.Img" alt />
          <div class="title_right">
            <p class="p1">{{item.ProductName}}</p>
            <p class="p2">{{item.SCText}}</p>
          </div>
        </div>
        <div class="des">
          <p class="p1">描述相符</p>
          <van-rate
            :gutter="20"
            :size="25"
            color="#b695e9"
            v-model="item.CommodityScore"
            @change="onChange(item,index)"
          />
          <p class="p2" v-if="item.CommodityScore == 1">差</p>
          <p class="p2" v-else-if="item.CommodityScore == 2 || item.CommodityScore == 3">好</p>
          <p class="p2" v-else>非常好</p>
        </div>
        <van-field
          v-model="item.Content"
          rows="4"
          autosize
          type="textarea"
          placeholder="从多个角度评价,可以帮助更多想买的人"
        />
        <div class="open">
          <div class="open_left">
            <div @click="sel(index)" :class="item.AnonymousFlag?'active':''" class="quan"></div>
            <span>公开</span>
          </div>
          <p>公开头像昵称,大家可以看到我的主页</p>
        </div>
      </div>
      <!-- 底部评价 -->
      <div class="bottom">
        <p class="title">{{list.SellerName}}</p>
        <div class="des">
          <p class="p1">物流服务</p>
          <van-rate :gutter="20" :size="25" color="#b695e9" v-model="value2" @change="onChange2" />
          <p class="p2">{{fuwu}}</p>
        </div>
        <div class="des">
          <p class="p1">服务态度</p>
          <van-rate :gutter="20" :size="25" color="#b695e9" v-model="value3" @change="onChange3" />
          <p class="p2">{{taidu}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import { Rate, Toast, Field, RadioGroup, Radio } from "vant";
export default {
  data() {
    return {
      orderid: "",
      active_index: -1,
      value2: 0,
      value3: 0,
      radio: "1",
      fuwu: "",
      taidu: "",
      list: []
    };
  },
  watch: {
    value(newVal, oldVal) {
      if (this.value == 0) {
        this.desp = "";
      } else if (this.value == 1) {
        this.desp = "差";
      } else if (this.value == 2) {
        this.desp = "好";
      } else if (this.value == 3) {
        this.desp = "好";
      } else if (this.value == 4) {
        this.desp = "非常好";
      } else if (this.value == 5) {
        this.desp = "非常好";
      }
    },
    value2(newVal, oldVal) {
      if (this.value == 0) {
        this.fuwu = "";
      } else if (this.value2 == 1) {
        this.fuwu = "差";
      } else if (this.value2 == 2) {
        this.fuwu = "好";
      } else if (this.value2 == 3) {
        this.fuwu = "好";
      } else if (this.value2 == 4) {
        this.fuwu = "非常好";
      } else if (this.value2 == 5) {
        this.fuwu = "非常好";
      }
    },
    value3(newVal, oldVal) {
      if (this.value3 == 0) {
        this.taidu = "";
      } else if (this.value3 == 1) {
        this.taidu = "差";
      } else if (this.value3 == 2) {
        this.taidu = "好";
      } else if (this.value3 == 3) {
        this.taidu = "好";
      } else if (this.value3 == 4) {
        this.taidu = "非常好";
      } else if (this.value3 == 5) {
        this.taidu = "非常好";
      }
    }
  },
  
  mounted() {
    this.orderid = this.$route.query.id;
    this.get_detail();
  },
  methods: {
    onChange(item, index) {
      // this.list[index].CommodityScore = item.CommodityScore;
      console.log('item',item,'index',index)
    },
    onChange2(value2) {
      //   Toast("当前值：" + value2);
      this.value2 = value2;
    },
    onChange3(value3) {
      //   Toast("当前值：" + value3);
      this.value3 = value3;
    },
    sel(index) {
      this.list.forEach(i => {
        if (i == this.list[index]) {
          i.AnonymousFlag= !i.AnonymousFlag;
        }
      });
    },
    // 发表评论add
    add() {
      request
        .post(this.$api + "/mobile/UserAddCommodityComment", {
          OrderNo: this.orderid,
          List:this.list,
          LogisticsScore: this.value2,
          ServiceScore: this.value3
        })
        .then(res => {
          if (res.IsSuccess) {
            this.$router.push("/pingjia_over");
          } else {
            Toast(res.Message);
          }
        })
        .catch(err => {});
    },
    get_detail() {
      request
        .post(this.$api + "/mobile/GetOrderInfoDetail", {
          orderId: this.orderid
        })
        .then(res => {
          if (res.IsSuccess) {
            var a = res.Data.ListData;
            a.forEach(item => {
              (item.Content = ""),
                (item.CommodityScore = 5),
                (item.AnonymousFlag = false);
              item.CommodityId = item.ProductId;
            });
            this.list=a
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
@base: 75rem;
header {
  width: 100%;
  position: relative;
  // background:#B694E8;
  // z-index: 10;
  span {
    font-size: 26 / @base;
    position: fixed;
    right: 30 / @base;
    top: 32 / @base;
    // font-weight: bold;
  }
  i {
    position: fixed;
    left: 30 / @base;
    top: 25 / @base;
    font-size: 50 / @base;
    color: black;
    z-index: 11;
  }
  .head {
    z-index: 10;
    position: fixed;
    top: 0;
    width: 100%;
    height: 100 / @base;
    background: #f4f4f4;
    font-size: 35 / @base;
    text-align: center;
    line-height: 100 / @base;
    // border-bottom: 1px solid #e6e6e6;
  }
}
.bu {
  width: 100%;
  height: 100 / @base;
}
/deep/.van-cell {
  padding: 30px 0px;
}
.main {
  overflow-y: scroll;
  background: #f0f0f0;
  width: 100%;
  position: fixed;
  top: 100 / @base;
  bottom: 0;
  .box {
    width: calc(~"100% - 20px");
    border-radius: 15 / @base;
    background: white;
    padding: 15 / @base;
    margin: 15 / @base auto;
    .title {
      display: flex;
      img {
        min-width: 120 / @base;
        max-width: 120 / @base;
        height: 120 / @base;
        border-radius: 5 / @base;
      }
      .title_right {
        padding: 15 / @base;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .p1 {
          color: #565656;
          font-size: 30 / @base;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1; //行数
          -webkit-box-orient: vertical;
        }
        .p2 {
          color: #a0a0a0;
          font-size: 26 / @base;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1; //行数
          -webkit-box-orient: vertical;
        }
      }
    }

    .des {
      margin-top: 20 / @base;
      width: 100%;
      display: flex;
      align-items: center;
      .p1 {
        font-size: 30 / @base;
        color: #565656;
        margin-right: 30 / @base;
      }
      .p2 {
        color: #a0a0a0;
        font-size: 26 / @base;
        margin-left: 30 / @base;
      }
    }
    .open {
      margin-bottom: 10 / @base;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .open_left {
        display: flex;
        align-items: center;
        .quan {
          width: 30 / @base;
          height: 30 / @base;
          border: 1px solid #e6e6e6;
          border-radius: 50%;
        }
        .active {
          width: 30 / @base;
          height: 30 / @base;
          background: url("../../../assets/images/code_dui.png") no-repeat;
          background-size: 100% 100%;
        }
        span {
          margin-left: 10 / @base;
          font-size: 26 / @base;
          color: #a9a9a9;
        }
      }
      p {
        font-size: 26 / @base;
        color: #666666;
      }
    }
  }
  .bottom {
    width: calc(~"100% - 20px");
    border-radius: 15 / @base;
    background: white;
    padding: 20 / @base 15 / @base;
    margin: 15 / @base auto;
    .title {
      font-size: 30 / @base;
      color: #565656;
      margin-bottom: 40 / @base;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1; //行数
      -webkit-box-orient: vertical;
    }
    .des {
      margin-top: 20 / @base;
      width: 100%;
      display: flex;
      align-items: center;
      .p1 {
        font-size: 30 / @base;
        color: #565656;
        margin-right: 30 / @base;
      }
      .p2 {
        color: #a0a0a0;
        font-size: 26 / @base;
        margin-left: 30 / @base;
      }
    }
  }
}
</style>