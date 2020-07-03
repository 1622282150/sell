<template>
  <div>
    <header>
      <i @click="goback()" class="iconfont icon-zuojiantou"></i>
      <div class="head">我的收货地址</div>
      <span style="z-index:16" @click="$router.push('/add_address')">添加新地址</span>
    </header>
    <div class="bu"></div>
    <!-- 地址 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <div class="box" v-for="(item,index) in address_info" :key="index">
      <div class="box_left">
        <img v-if="item.TagType == '家'" src="../../../assets/images/address_home.png" alt />
        <img v-else-if="item.TagType == '公司'" src="../../../assets/images/address_company.png" alt />
        <img v-else-if="item.TagType == '学校'" src="../../../assets/images/address_school.png" alt />
        <div v-else>{{item.Name | addressName}}</div>
      </div>
      <div class="box_middle" @click="chuancan(item)">
        <div class="box_middle_top">
          {{item.Name}}
          <span>{{item.Mobile}}</span>
        </div>
        <div
          class="box_middle_bottom"
        >
        <span v-show="item.IsDefault">默认</span>
        {{item.Province}}  {{item.City}} {{item.Area}} {{item.StreetRoad}} {{item.DetailedAddress}}
        </div>
      </div>
      <!-- <p class="p1">编辑</p>
      <p class="p2" @click="del_address()">删除</p>-->
      <div class="bian_box">
        <div>
          <p @click="edit(item.Id)" class="p1">编辑</p>
        </div>
      </div>
      <div class="line"></div>
    </div>
    </van-list>
  </div>
</template>

<script>
import request from "@/utils/request";
import { Dialog } from "vant";
export default {
  data() {
    return {
      type:'',
      page:1,
      loading:false,
      finished:false,
      address_info: []
    };
  },
  mounted() {
    this.type=this.$route.query.type
    this.get_address();
  },
  methods: {
    // 携带参数去订单
    chuancan(item){
       if(this.type != 3){
 
       }else{
         this.$router.push({
           path:'/confirm_order',
           query:{
             item:JSON.stringify(item)
           }
         })
       }
    },
    goback() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        // on close
        console.log("我是要去安卓");
        
        window.android.closePage();
       
      }else{
        this.$router.back(-1)
      }
    
    },
    // 去编辑
    edit(id){
      this.$router.push({
        path:'/add_address',
        query:{
          id:id
        }
      })
    },
    // 删除地址
    del_address() {
      Dialog.confirm({
        message: "确定要删除该地址吗"
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
     onLoad() {
      this.page += 1;
      this.get_address()
    },
    // 获取地址列表接口
    get_address() {
      request
        .post(this.$api + "/mobile/GetMyReceivingAddressPageList", {
          Page:this.page,
          Rows:8
        })
        .then(res => {
          // this.address_info=res.Data.List
        this.loading = false;
        if (res.Data.List.length) {
          var arr = res.Data.List
          for (let i = 0; i < arr.length; i++) {
            this.address_info.push(arr[i])
          }
        } else {
          this.finished = true
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
    font-size:26 / @base;
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
.box {
  position: relative;
  display: flex;
  width: 100%;
  padding: 30 / @base;
  // .p1 {
  //   position: absolute;
  //   top:50 / @base;
  //   right: 30 / @base;
  //   font-size: 28 / @base;
  //   color: #b3b4b6;
  // }
  // .p2 {
  //   position: absolute;
  //   top: 120 / @base;
  //   right: 30 / @base;
  //   font-size: 28 / @base;
  //   color: #b3b4b6;
  // }
  .bian_box {
    width: 100 / @base;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      width: 70 / @base;
      height: 70 / @base;
      font-size: 22/@base;
      border-left: 1px solid  #b4b5b7;
      color: #b4b5b7;
      
      .p1{
        width: 100%;
        height: 100%;
        line-height: 70/@base;
        text-align: right;
      }
    }
  }

  // background:red;
  .box_left {
    width: 100 / @base;
    // height: 140 / @base;
    // padding: 35 / @base 15 / @base;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 70 / @base;
      height: 70 / @base;
      border-radius: 50%;
      margin: auto 15 / @base;
    }
    div {
      width: 70 / @base;
      height: 70 / @base;
      line-height: 70 / @base;
      text-align: center;
      border-radius: 50%;
      background: #b3b4b6;
      font-size: 26 / @base;
      color: #fff;
      margin: auto 15 / @base;
    }
  }
  .box_middle {
    padding: 0 15 / @base;
    width: 75%;
    // height: 140 / @base;
    .box_middle_top {
      font-size: 30 / @base;
      span {
        color: #b3b4b6;
        font-size: 28 / @base;
        margin-left: 12/ @base;
      }
    }
    .box_middle_bottom {
      margin-top: 3/ @base;
      width: 100%;
      // line-height: 35 / @base;
      font-size: 25 / @base;
      span{
        color: #e48758;
        background: #fff2ec;
        font-size: 20/@base;
        padding: 2/@base 10/@base;

      }
    }
  }
}
</style>