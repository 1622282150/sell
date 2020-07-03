<template>
  <div>
    <header>
      <i @click="goback()" class="iconfont icon-zuojiantou"></i>
      <div class="head">关注店铺</div>
    </header>
    <div class="bu"></div>
    <van-list v-model="loading1" :finished="finished1" finished-text="没有更多了" @load="onLoad1">
    <div class="shop_list" v-for="(item,index) in shop_list" :key="index">
      <img @click="todianpu(item.SellerId,item.SellerType)" v-if="item.BrandImg" :src="item.BrandImg" alt />
      <img @click="todianpu(item.SellerId,item.SellerType)" v-else src="../../../assets/images/shoplist_banner.jpg" alt />
      <div @click="todianpu(item.SellerId,item.SellerType)" class="shop_list_middle">
        <div class="shop_list_middle_name">{{item.UserName}}</div>
        <div class="shop_list_middle_count">{{item.CommodityCount}}个商品  {{item.SellerFansCount}}个粉丝</div>
      </div>
      <!-- <div v-if="item.islike==0" class="shop_ball">关注</div> -->
      <div class="shop_activeball" @click="del_shop(item.SellerId,index)">已关注</div>
    </div>
    </van-list>
    <!-- <van-tabs sticky :offset-top="50" v-model="active" color="#BA99EB" swipeable line-width="50%">
      <van-tab title="用户">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class="user_list" v-for="(item,index) in user_list" :key="index">
            <img
              @click="otherself(item.LinkUserId)"
              v-if="!item.UserAvator"
              src="../../../assets/images/vip_vip8.png"
              alt
            />
            <img @click="otherself(item.LinkUserId)" v-else :src="item.UserAvator" alt />
            <div class="user_list_middle">
              <div class="user_list_middle_name">{{item.UserName | renMenLength}}</div>
              <div
                v-if="item.PersonalitySignature "
                class="user_list_middle_des"
              >{{item.PersonalitySignature| renMenLength}}</div>
              <div v-else class="user_list_middle_des">他还没有个性签名呦~</div>
            </div>

            <i
              @click="guanzhu(item.LinkUserId,index)"
              v-show="item.Type==1"
              style="position:absolute;top:0.3rem;right:.6rem;color:#B1B1B1;font-size:23px;"
              class="iconfont icon-yonghuqueren"
            ></i>
            <i
              @click="guanzhu(item.LinkUserId,index)"
              v-show="item.Type==2"
              style="position:absolute;top:0.3rem;right:.6rem;color:#B1B1B1;font-size:23px;font-weight:550"
              class="iconfont icon-iconfonthuxiangguanzhu"
            ></i>
          </div>
        </van-list>
      </van-tab>
      <van-tab title="店铺">
        
        
      </van-tab>
    </van-tabs>-->
  </div>
</template>

<script>
import { Tab, Toast, Tabs, Dialog } from "vant";
import Return from "../../../components/Return";
import request from "@/utils/request";
export default {
  data() {
    return {
      loading: false,
      finished: false,
      page: 1,
      loading1: false,
      finished1: false,
      page1: 1,
      active: 0,
      user_list: [],
      shop_list: []
    };
  },
  mounted() {
    this.get_dianlist();
  },
  methods: {
    goback() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        // on close
        console.log("我是要去安卓");
        // let url='http://test1.merrychange.net/#/articlestie?id='+this.articleid
        window.android.closePage();
        this.$router.back();
      } else if (isiOS) {
        console.log("我是要去ios");
        let url = this.$domain.url+"attention_shop";
        console.log(url);
        this.$bridge.callhandler("closePage", url, data => {
          // 处理返回数据
        });
        this.$router.back();
        //  window.location.href='mqjapp://home'
      } else {
        console.log("我不是安卓也不是ios,我在哪");
        this.$router.back();
      }
    },

    onLoad1() {
      this.page1 += 1;
      this.get_dianlist();
    },
    todianpu(id, type) {
      if (type === "ShopProject") {
        this.$router.push({
          path: "/shop",
          query: {
            id: id
          }
        });
      } else {
        this.$router.push({
          path: "/store_page",
          query: {
            id: id
          }
        });
      }
    },
    //q取消关注电批
    del_shop(id, index) {
      Dialog.confirm({
        message: "确认取消关注?"
      })
        .then(() => {
          request
            .post(this.$api + "/mobile/AttentionSellerDelete", {
              ByUserId: id
            })
            .then(res => {
              this.shop_list.splice(index, 1);
              Toast("取消关注成功");
            })
            .catch(err => {});
        })
        .catch(() => {
          // on cancel
        });
    },
    get_dianlist() {
      request
        .post(this.$api + "/mobile/GetMyAttentionSellerPageList", {
          Page: this.page1,
          Rows: 9,
          Order: "asc",
          Sort: "Id"
        })
        .then(res => {
          // this.shop_list = res.Data.List;
            this.loading1 = false;
            if (res.Data.List.length) {
              var arr = res.Data.List;
              for (let i = 0; i < arr.length; i++) {
                this.shop_list.push(arr[i]);
              }
              console.log(this.shop_list)
            } else {
              this.finished1 = true;
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
  // z-index: 10;
  i {
    position: fixed;
    left: 30 / @base;
    top: 30 / @base;
    font-size: 50 / @base;
    color: black;
    z-index: 11;
  }
  .head {
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    background: white;
    font-size: 35 / @base;
    text-align: center;
    line-height: 100 / @base;
    border-bottom: 1px solid #e6e6e6;
    z-index: 10;
  }
}
.bu {
  width: 100%;
  height: 50px;
}

// 列表
.user_list {
  width: 100%;
  height: 100 / @base;
  //  background:red;
  padding: 10 / @base 40 / @base;
  display: flex;
  position: relative;
  img {
    // margin-top: 10/@base;
    width: 70 / @base;
    height: 70 / @base;
    border-radius: 50%;
  }
  .user_list_middle {
    padding-left: 20 / @base;
    width: 60%;
    height: 80 / @base;
    //  background: blue;
    .user_list_middle_name {
      width: 100%;
      height: 40 / @base;
      font-size: 30 / @base;
    }
    .user_list_middle_des {
      width: 100%;
      height: 40 / @base;
      font-size: 28 / @base;
      color: #b1b1b1;
    }
  }
  .user_ball {
    font-size: 25 / @base;
    color: white;
    background: #b896ea;
    width: 170 / @base;
    height: 50 / @base;
    line-height: 50 / @base;
    text-align: center;
    border-radius: 20px;
    margin: 15 / @base 0;
  }
  .user_activeball {
    font-size: 25 / @base;
    color: white;
    background: #c1bdcb;
    width: 170 / @base;
    height: 50 / @base;
    line-height: 50 / @base;
    text-align: center;
    border-radius: 20px;
    margin: 15 / @base 0;
  }
}
// 店铺列表
.shop_list {
  width: 100%;
  height: 150 / @base;
  // background: red;
  padding: 25 / @base 40 / @base;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  img {
    width: 170 / @base;
    height: 100 / @base;
    border-radius: 5px;
  }
  .shop_list_middle {
    padding-left: 20 / @base;
    width: 50%;
    height: 100 / @base;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; //行数
    -webkit-box-orient: vertical;

    //    background: blue;
    .shop_list_middle_name {
      width: 100%;
      height: 50 / @base;
      font-size: 35 / @base;
      overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; //行数
    -webkit-box-orient: vertical;
    }
    .shop_list_middle_count {
      width: 100%;
      height: 50 / @base;
      font-size: 30 / @base;
      color: #c1bdcb;
    }
  }
  .shop_ball {
    font-size: 25 / @base;
    color: white;
    background: #b896ea;
    width: 170 / @base;
    height: 60 / @base;
    line-height: 60 / @base;
    text-align: center;
    border-radius: 20px;
    margin: 20 / @base 0;
  }
  .shop_activeball {
    font-size: 25 / @base;
    color: white;
    background: #c1bdcb;
    width: 170 / @base;
    height: 60 / @base;
    line-height: 60 / @base;
    text-align: center;
    border-radius: 20px;
    margin: 20 / @base 0;
  }
}
</style>