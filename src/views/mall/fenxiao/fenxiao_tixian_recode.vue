<template>
  <div>
    <div class="header">
      提现明细
      <img @click="$router.back()" class="img1" src="../../../assets/images/newfan.png" alt />
      <i @click="show = true" class="iconfont icon-rili"></i>
    </div>
    <div class="jicheng"></div>
    <div class="title">
      <div class="title_item" @click="sel(index)" v-for="(item,index) in title" :key="index">
        <div class="name" :class="activeindex === index?'name_active':''">{{item}}</div>
        <div class="line" :class="activeindex === index?'line_active':''"></div>
      </div>
    </div>
    <!-- 提现明细 -->
    <div class="box">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="box_item" v-for="(item,index) in list" :key="index">
          <div class="top">
            <p class="p1">{{item.CreateDate}}</p>
            <p class="p2" v-if="item.Status === 0" style="color: #fd292a;">待审核</p>
            <p class="p2" v-else-if="item.Status === 1" style="color: #fd292a;">待打款</p>
            <p class="p2" v-else-if="item.Status === 2" style="color: #50e210;">已打款</p>
            <p class="p2" v-else style="color: #666666;">无效</p>
          </div>
          <div class="bottom">
            <p class="p3">申请提现<span v-show="item.ReplyMessage">(</span>{{item.ReplyMessage}}<span v-show="item.ReplyMessage">)</span></p>
            <p class="p4">¥{{item.Money}}</p>
          </div>
        </div>
      </van-list>
    </div>
    <!-- 弹出层 -->
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        title="选择年月"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @confirm='confirm'
        @cancel='cancel'
      />
    </van-popup>
  </div>
</template>

<script>
import { DatetimePicker, Popup } from "vant";
import request from "@/utils/request";
export default {
  data() {
    return {
      show: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      activeindex: 0,
      title: ["全部", "待审核", "待打款", "已打款", "无效"],
      page: 1,
      status: "", //状态
      list: [],
      finished: false,
      loading: false,
      date: "" //时间
    };
  },
  mounted() {
    this.get_tixian();
  },
  methods: {
      confirm(value){
        var y=value.getFullYear()
        var m=value.getMonth() + 1
        m=m<10?('0'+m):m
        this.date=y+'-'+m
        this.page = 1;
        this.finished = false;
        this.loading = false;
        this.list = [];
        this.get_tixian();
        this.show=false
      },
      cancel(){
          this.show=false
      },
    formatter(type, val) {
      if (type === "year") {
        return `${val}`;
      } else if (type === "month") {
        return `${val}`;
      }
      return val;
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
        this.status = 2;
        this.page = 1;
        this.finished = false;
        this.loading = false;
        this.list = [];
        this.get_tixian();
      } else if (this.activeindex == 4) {
        this.status = -2;
        this.page = 1;
        this.finished = false;
        this.loading = false;
        this.list = [];
        this.get_tixian();
      }
    },
    onLoad() {
      // 异步更新数据

      this.page += 1;
      this.get_tixian();
    },
    get_tixian() {
      request
        .post(this.$api + "/mobile/GetUserWithdrawalList", {
          Page: this.page,
          Rows: 10,
          Status: this.status,
          Date: this.date
        })
        .then(res => {
          this.loading = false;
          if (res.Data.List.length) {
            var arr = res.Data.List;
            for (let i = 0; i < arr.length; i++) {
              this.list.push(arr[i]);
            }
            // this.showlist.concat(res.data.Data.list)
            // console.log(this.showlist)
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
  .title_item {
    width: 20%;
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
    margin: 10 / @base;
    background-color: #ffffff;
    box-shadow: 2px 3px 10px 0px rgba(67, 28, 27, 0.11);
    border-radius: 10px;
    padding: 0 14 / @base;
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 26 / @base;
      border-bottom: 1px solid #e6e6e6;
      .p1 {
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 1px;
        color: #3e3e3e;
      }
      .p2 {
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 1px;
      }
    }
    .bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 43 / @base;
      .p3 {
        font-size: 14px;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 1px;
        color: #3e3e3e;
      }
      .p4 {
        font-size: 14px;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 1px;
        color: #9c49fc;
      }
    }
  }
}
</style>