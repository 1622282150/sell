<template>
  <div>
    <!-- 弹出层分享 -->
    <van-action-sheet v-model="showfen">
      <div class="towechat">
        <div class="towechat_title">分享到</div>
        <div class="towechat_box">
          <div @click="towechat" class="towechat_item">
            <img src="../../../assets/images/fenxiang_wechat.png" alt />
            <p>微信</p>
          </div>
          <div @click="tofriend" class="towechat_item">
            <img src="../../../assets/images/fenxiang_pengyouquan.png" alt />
            <p>朋友圈</p>
          </div>
        </div>
      </div>
    </van-action-sheet>
    <!-- 头部 -->
    <div class="head-top">
      <!-- guanzhu -->
      <div class="guanzhu" v-if="SellerDetail.AttentionSellerFlag==0" @click="guan_shop">关注</div>
      <div v-else class="yiguanzhu" @click="del_shop">已关注</div>
      <div class="head-search">
        <i
          @click="$router.back()"
          style="color:white;position:fixed;top:4%;left:3%;"
          class="iconfont icon-zuojiantou"
        ></i>
        <input type="text" placeholder />
        <i style="position:fixed;top:4%;left:15%;color:#696968" class="iconfont icon-sousuo"></i>
        <i
          @click="showfen = true"
          style="color:white;position:fixed;top:4%;right:3%;"
          class="iconfont icon-fenxiang2"
        ></i>
      </div>
      <!-- 顶部中间的商铺信息 -->
      <div class="head-store">
        <img :src="SellerDetail.BrandImg" alt />
        <div class="head-store-right">
          <div class="head-store-rightname">{{SellerDetail.Name}}</div>
          <div class="head-store-rightrenqi">
            <i class="iconfont icon-hot"></i>
            人气值:{{SellerDetail.SellerPopularity}}
          </div>
          <div
            class="head-store-rightfans"
          >粉丝数:{{SellerDetail.AttentionCount}} | {{SellerDetail.CommentRate}}%好评</div>
        </div>
      </div>
      <div class="head-tab">
        <div
          class="head-tab-item"
          v-for="(item,index) in  title_list"
          :key="index"
          @click="sel_title(index)"
        >
          <div :class="active_title===index?'line':''"></div>
          {{item}}
        </div>
      </div>
    </div>

    <!-- 中间部分第一首页 -->
    <!-- <img :src="SellerDetail.HomePicture"
      alt
    />-->
    <div v-if="active_title==0" class="shouye_middle" v-html="SellerDetail.HomePicture"></div>
    <!-- 中间部分第二商品 -->
    <div v-else-if="active_title===1||active_title===2||active_title===3" class="shop_middle">
      <!-- 选择综合人气价格分类 -->
      <div class="fen">
        <div class="fen_item" ref="zonghe" @click="zonghe">综合</div>
        <div class="fen_item" ref="renqi" @click="renqi">人气</div>
        <div class="fen_item" @click="jiage" style="position:relative">
          价格
          <!-- 两个黑 -->
          <i
            v-show="isa===false"
            style="position:absolute;right:10%;top:-5%;color:#A0A0A0;"
            class="iconfont icon-xiangshang2"
          ></i>
          <i
            v-show="isa===false"
            style="position:absolute;right:10%;top:20%;color:#A0A0A0;"
            class="iconfont icon-xiangxia2"
          ></i>
          <!-- 上紫下黑 -->
          <i
            v-show="issheng===true && isa===true"
            style="position:absolute;right:10%;top:-5%;color:#B899EA"
            class="iconfont icon-xiangshang2"
          ></i>
          <i
            v-show="issheng===true && isa===true"
            style="position:absolute;right:10%;top:20%;color:#A0A0A0;"
            class="iconfont icon-xiangxia2"
          ></i>
          <!-- 上黑下紫 -->

          <i
            v-show="issheng===false && isa===true"
            style="position:absolute;right:10%;top:-5%;color:#A0A0A0;"
            class="iconfont icon-xiangshang2"
          ></i>
          <i
            v-show="issheng===false && isa===true"
            style="position:absolute;right:10%;top:20%;color:#B899EA"
            class="iconfont icon-xiangxia2"
          ></i>
        </div>
        <i @click="isvertical" v-if="vertical" class="iconfont icon-liebiao"></i>
        <i style="font-size:0.45rem" @click="isvertical" v-else class="iconfont icon-liebiao1"></i>
      </div>
      <!-- 商品页内容竖排 -->
      <div :class="vertical?'product':'product_flex'">
        <van-list v-model="loading" :finished="finished" finished-text @load="onLoad">
          <div
            class="inner"
            @click="todetail(item.CommodityId)"
            v-for="(item, index) in shangpin_list"
            :key="index"
          >
            <div class="left">
              <img :src="item.BannerImg" alt />
            </div>
            <div class="right">
              <div class="wenzi">{{item.Name}}</div>
              <div class="clean">{{item.Brief}}</div>
              <div class="price">
                <!-- <span class="after"></span> -->
                <span class="icon">¥</span>
                <span class="num">{{item.Price}}</span>
              </div>
              <div class="oldprice">
                <span>原价</span>
                <span class="del">¥{{item.OriginalPrice}}</span>
                <!-- <span>6折</span> -->
              </div>
              <div class="post">
                <span>包邮</span>
              </div>
            </div>
          </div>
        </van-list>
      </div>
    </div>

    <!-- 中间部分第三活动 -->
    <!-- 中间第五部分 -优惠券 -->
    <div v-else class="coupon">
      <div class="coupon_item" v-for="(item,index) in coupon_list" :key="index">
        <div class="coupon_left">
          <span style="font-size:0.55rem">¥</span>
          <span style="font-weight:600;font-size:0.7rem">{{item.price}}</span>
        </div>
        <div class="coupon_right">
          <div class="coupon_right_name">店铺优惠券</div>
          <div class="coupon_right_desc">满500减{{item.price}}</div>
          <div class="coupon_right_time">{{item.firsttime}} 一 {{item.overtime}}</div>
          <div class="coupon_right_ball">立即领取</div>
        </div>
      </div>
    </div>
    <!-- 尾部部分 -->
    <div class="store_bottom">
      <div @click="category" class="store_bottom_item">
        <i class="iconfont icon-shangpinshoudai"></i> 商品分类
      </div>
      <div @click="kefu" class="store_bottom_item">
        <i class="iconfont icon-kefu"></i> 联系客服
      </div>
    </div>

    <!-- 商品分类弹窗 -->
    <van-popup v-model="show_category" position="bottom" :style="{ height: '80%'}">
      <div class="fenlei">
        <div class="fenlei_bu"></div>
        <div class="fenlei_box" v-for="(item,index) in allclass" :key="index">
          <div class="fenlei_box_title">
            {{item.Name}}
            <i class="iconfont icon-youjiantou"></i>
          </div>
          <div
            class="fenlei_box_item"
            @click="box_item(i.Id)"
            v-for="(i,index) in item.children"
            :key="index"
          >{{i.Name}}</div>
        </div>
        <div class="fenlei_bu"></div>
        <div class="fenlei_bu"></div>
        <div class="fenlei_bu"></div>
        <div class="fenlei_bu"></div>
        <div class="fenlei_bu"></div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import request from "@/utils/request";
import { Popup, Toast } from "vant";
import { Progress } from "vant";
export default {
  data() {
    return {
      isa: false, //价格黑色化
      issheng: false,
      order: "", //asc升      desc降
      sort: "hv", //排序字段  Sort=hv 综合， Sort=Popularity 人气  ，Sort=Price 价格
      page: 1,
      loading: false,
      finished: false,
      ClassifyId: "", //类目id
      showfen: false,
      id: "",
      allclass: [], //商品类目
      show_category: false, //商品分类
      vertical: true, //商品是否竖排
      active_title: 1,
      title_list: ["首页", "商品", "活动", "上新", "优惠券"],
      shangpin_list: [],
      coupon_list: [], //优惠券列表
      SellerDetail: []
    };
  },
  mounted() {
    console.log(this.$route.query.id);
    this.id = this.$route.query.id;
    this.GetSellerDetail();
    this.GetCommodityInfoListById();
    this.GetSellerCommodityClassify();
  },
  methods: {
    towechat() {
      var dizhi = this.$domain.url + "store_page?id=" + this.id;
      var name = this.SellerDetail.Name;
      var description = "一家物美价廉的店铺";
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        console.log("我是要去安卓");
        // var data={
        //  address:window.location.href,
        //  name:name,
        //  description:description,
        //  type:'wechat'
        // }
        console.log(dizhi);
        window.android.shareToWechat(dizhi, name, description, "wechat");
        // window.android.shareToWechat(data)
      } else if (isiOS) {
        console.log("我是要去ios");
        var params = {
          address: dizhi,
          name: name,
          description: description,
          type: "wechat"
        };

        console.log(params);
        // window.webkit.messageHandlers.shareToWechat.postMessage(window.location.href,name,description,'微信');
        this.$bridge.callhandler("shareToWechat", params, data => {});
      } else {
        console.log("我不是安卓也不是ios,我在哪");
      }
      this.showfen = false;
    },
    tofriend() {
      var dizhi = this.$domain.url + "store_page?id=" + this.id;
      var name = this.SellerDetail.Name;
      var description = "一家物美价廉的店铺";
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        console.log("我是要去安卓");
        // window.android.shareToWechat(window.location.href,name,description,'朋友圈')
        //  var data={
        //  address:window.location.href,
        //  name:name,
        //  description:description,
        //  type:'FriendCircle'
        // }
        console.log(dizhi);
        window.android.shareToWechat(dizhi, name, description, "FriendCircle");
        // window.android.shareToWechat(data)
      } else if (isiOS) {
        console.log("我是要去ios");
        //  window.webkit.messageHandlers.shareToWechat.postMessage(window.location.href,name,description,'朋友圈');
        var params = {
          address: dizhi,
          name: name,
          description: description,
          type: "FriendCircle"
        };
        console.log(params);
        // window.webkit.messageHandlers.shareToWechat.postMessage(window.location.href,name,description,'微信');
        this.$bridge.callhandler("shareToWechat", params, data => {
          // 处理返回数据
        });
      } else {
        console.log("我不是安卓也不是ios,我在哪");
      }
      this.showfen = false;
    },
    test(params) {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        console.log("我是安卓");
        window.localStorage.setItem("token", params);
      } else {
        let token = JSON.stringify(params);
        window.localStorage.setItem("token", JSON.parse(token));
      }
    },
    kefu() {
      window.location.href = "https://tb.53kf.com/code/app/10134076/1";
    },
    // 获取店铺详情
    GetSellerDetail() {
      request
        .post(this.$api + "/mobile/GetSellerDetail", {
          id: this.id
        })
        .then(res => {
          this.SellerDetail = res.Data;
        })
        .catch(err => []);
    },
    box_item(id) {
      console.log("item", id);
      this.ClassifyId = id;
      this.GetCommodityInfoListById();
      this.show_category = false;
    },
    onLoad() {
      this.page += 1;
      this.GetCommodityInfoListById();
    },
    // 价格升降序
    jiage () {
      // console.log('触发了')
      this.isa = true;
      this.issheng = !this.issheng
      if (this.issheng) {
        //升asc
        console.log('升')
        this.order='asc'
        this.sort='Price'
        this.page=1
        this.loading=false
        this.finished=false
        this.shangpin_list=[]
        this.GetCommodityInfoListById()
      } else {
        //降desc
        console.log('降')
        this.order='desc'
        this.sort='Price'
        this.page=1
        this.loading=false
        this.finished=false
        this.shangpin_list=[]
        this.GetCommodityInfoListById()
      }
    },
    // 获取店铺内商品列表
    GetCommodityInfoListById() {
      request
        .post(this.$api + "/mobile/GetCommodityInfoListById", {
          ClassifyId: this.ClassifyId || "",
          SellerId: this.id,
          Sort: this.sort,
          Order: this.order,
          Page: this.page,
          Rows: 6
        })
        .then(res => {
          // this.shangpin_list = res.Data.List;
          if (res.IsSuccess) {
            this.loading = false;
            if (res.Data.List.length) {
              var arr = res.Data.List;
              for (let i = 0; i < arr.length; i++) {
                this.shangpin_list.push(arr[i]);
              }
            } else {
              this.finished = true;
            }
          } else {
          }
        })
        .catch(err => {});
    },
    // 获取商店类目
    GetSellerCommodityClassify() {
      request
        .post(this.$api + "/mobile/GetSellerCommodityClassify", {
          Id: this.id
        })
        .then(res => {
          this.allclass = res.Data;
        })
        .catch(err => {});
    },
    // 去商品详情
    todetail(id) {
      this.$router.push({
        path: "/product_detail",
        query: {
          id: id
        }
      });
    },
    // 关注店铺
    guan_shop() {
      request
        .post(this.$api + "/mobile/AttentionSellerAdd", {
          ByUserId: this.SellerDetail.Id
        })
        .then(res => {
          if (res.IsSuccess) {
            this.GetSellerDetail();
          } else {
            Toast(res.Message);
          }
          // this.SellerDetail= res.Data;
        })
        .catch(err => []);
    },
    //删除关注店铺
    del_shop() {
      request
        .post(this.$api + "/mobile/AttentionSellerDelete", {
          ByUserId: this.SellerDetail.Id
        })
        .then(res => {
          if (res.IsSuccess) {
            this.GetSellerDetail();
          } else {
            Toast(res.Message);
          }
          // this.SellerDetail= res.Data;
        })
        .catch(err => []);
    },
    getContainer() {
      return document.querySelector(".head-top");
    },
    // 商品分类按钮
    category() {
      this.show_category = !this.show_category;
    },
    // 选择综合人气
    zonghe() {
      this.$refs.zonghe.style.background = "#b694e8";
      this.$refs.zonghe.style.color = "white";
      this.$refs.renqi.style.color = "black";
      this.$refs.renqi.style.background = "white";
      (this.sort = "hv"), (this.page = 1);
      this.loading = false;
      this.finished = false;
      this.shangpin_list = [];
      this.GetCommodityInfoListById();
    },
    renqi() {
      this.$refs.zonghe.style.background = "white";
      this.$refs.zonghe.style.color = "black";
      this.$refs.renqi.style.background = "#b694e8";
      this.$refs.renqi.style.color = "white";
      (this.sort = "Popularity"), (this.page = 1);
      this.loading = false;
      this.finished = false;
      this.shangpin_list = [];
      this.GetCommodityInfoListById();
    },
    sel_title(index) {
      this.active_title = index;
    },
    // 横竖排
    isvertical() {
      this.vertical = !this.vertical;
    }
  }
};
</script>
<style scoped lang='less'>
.van-progress {
  background: white;
  border: 1px solid #b897eb;
}
@base: 75rem;
.towechat {
  width: 100%;
  height: 400 / @base;
  background: #ffffff;
  border-radius: 20 / @base 20 / @base 0 0;
  .towechat_title {
    margin: 60 / @base auto;
    font-size: 30 / @base;
    text-align: center;
    color: #333333;
  }
  .towechat_box {
    width: 464 / @base;
    height: 140 / @base;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    .towechat_item {
      img {
        width: 95 / @base;
        height: 95 / @base;
        background-size: 100% 100%;
      }
      p {
        text-align: center;
        width: 100%;
        font-size: 24 / @base;
        color: #333333;
        margin-top: 16 / @base;
      }
    }
  }
}
// 头部固定部分
.head-top {
  position: fixed;
  top: 0;
  width: 100%;
  height: 370 / @base;
  z-index: 100;
  background: url(../../../assets/images/store_beijing.png) no-repeat;
  background-size: 100% 100%;
  .guanzhu {
    position: fixed;
    top: 150 / @base;
    right: 40 / @base;
    font-size: 25 / @base;
    color: white;
    z-index: 1;
    width: 160 / @base;
    height: 60 / @base;
    line-height: 60 / @base;
    background: #b694e8;
    border-radius: 20px;
    text-align: center;
  }
  .yiguanzhu {
    z-index: 1;
    position: fixed;
    top: 150 / @base;
    right: 40 / @base;
    font-size: 25 / @base;
    color: white;
    width: 160 / @base;
    height: 60 / @base;
    line-height: 60 / @base;
    background: #c3c0c9;
    border-radius: 20px;
    text-align: center;
  }
  .head-search {
    position: fixed;
    top: 0;
    width: 100%;
    height: 120 / @base;
    input {
      opacity: 0.6;
      position: fixed;
      top: 4%;
      left: 13%;
      width: 75%;
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
  .head-store {
    position: fixed;
    top: 120 / @base;
    width: 100%;
    height: 140 / @base;
    display: flex;
    //   background: red;
    padding: 20 / @base 40 / @base 0 40 / @base;
    color: white;
    img {
      width: 120 / @base;
      height: 120 / @base;
      background-size: 100% 100%;
      border-radius: 10 / @base;
    }
    .head-store-right {
      width: 55%;
      height: 120 / @base;
      //   background: blue;
      padding-left: 15 / @base;
      .head-store-rightname {
        font-size: 35 / @base;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; //行数
        -webkit-box-orient: vertical;
      }
      .head-store-rightrenqi {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; //行数
        -webkit-box-orient: vertical;
        border: 1px solid white;
        opacity: 0.8;
        width: 160 / @base;
        height: 40 / @base;
        line-height: 40 / @base;
        background: #b694e8;
        font-size: 20 / @base;
        i {
          font-size: 20 / @base;
        }
      }
      .head-store-rightfans {
        font-size: 20 / @base;
      }
    }
  }
  //   tab选项
  .head-tab {
    position: fixed;
    top: 270 / @base;
    width: 100%;
    height: 100 / @base;
    display: flex;
    // background: red;
    .head-tab-item {
      position: relative;
      width: 20%;
      height: 100 / @base;
      line-height: 100 / @base;
      font-size: 30 / @base;
      color: white;
      text-align: center;
      .line {
        position: absolute;
        bottom: 3px;
        left: 20%;
        width: 60%;
        height: 3px;
        background: white;
        border-radius: 2 / @base;
      }
    }
  }
}

// 固定尾部
.store_bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 90 / @base;
  font-size: 30 / @base;
  background: white;
  z-index: 3000;
  display: flex;
  .store_bottom_item {
    width: 50%;
    height: 90 / @base;
    line-height: 90 / @base;
    text-align: center;
    i {
      font-size: 35 / @base;
      line-height: 30 / @base;
      text-align: center;
      margin-left: 15 / @base;
    }
  }
}
// 首页中间
.shouye_middle {
  position: fixed;
  top: 370 / @base;
  bottom: 90 / @base;
  width: 100%;
  overflow: scroll;
}
// 商品shop中间
.shop_middle {
  margin-top: 460 / @base;
  width: 100%;
  //商品横排
  .shangpin_ul {
    padding: 0 20 / @base 100 / @base 20 / @base;
    // background: #e0e0e0;

    // margin-top: 450 / @base;
    // padding-bottom:100 / @base;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    // padding-bottom: 80 / @base;
    z-index: -1;
    justify-content: space-between;
    .shangpin_li {
      box-shadow: 0px 0px 5px 1px #c4c3c6;
      margin-top: 25 / @base;
      width: 49%;
      height: 460 / @base;
      background: #ffffff;
      border-radius: 5px;
      img {
        width: 100%;
        height: 280 / @base;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
      .shangpin_bottom {
        width: 100%;
        padding: 15 / @base;

        .shangpin_title {
          width: 100%;
          min-height: 40 / @base;
          font-size: 28 / @base;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2; //行数
          -webkit-box-orient: vertical;
        }
        .shangpin_flag {
          width: 100%;
          min-height: 30 / @base;
          font-size: 14 / @base;
          color: #c0c0c0;
        }
        .shangpin_price {
          display: flex;
          width: 100%;
          height: 40 / @base;
          .shangpin_price_daola {
            padding-top: 5 / @base;
            font-size: 25 / @base;
            color: #a46abd;
          }
          .shangpin_price_money {
            margin-left: 5 / @base;
            font-size: 30 / @base;
            color: #a46abd;
          }
        }
        .shangpin_shop {
          width: 100%;
          height: 55 / @base;
          line-height: 55 / @base;
          font-size: 20 / @base;
          color: #c0c0c0;
          span {
            color: black;
            margin-left: 20 / @base;
          }
        }
      }
    }
  }
}

// 活动中间
.activity_middle {
  margin-top: 460 / @base;
  width: 100%;
  .shangpin_ul {
    padding: 0 20 / @base 100 / @base 20 / @base;
    // background: #e0e0e0;
    // margin-top: 450 / @base;
    // padding-bottom:100 / @base;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    // padding-bottom: 80 / @base;
    z-index: -1;
    justify-content: space-between;
    .shangpin_li {
      box-shadow: 0px 0px 5px 1px #c4c3c6;
      margin-top: 25 / @base;
      width: 49%;
      height: 460 / @base;
      background: #ffffff;
      border-radius: 5px;
      img {
        width: 100%;
        height: 280 / @base;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
      .shangpin_bottom {
        width: 100%;
        padding: 15 / @base;

        .shangpin_title {
          width: 100%;
          min-height: 40 / @base;
          font-size: 28 / @base;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2; //行数
          -webkit-box-orient: vertical;
        }
        .shangpin_flag {
          width: 100%;
          min-height: 30 / @base;
          font-size: 14 / @base;
          color: #c0c0c0;
        }
        .shangpin_price {
          display: flex;
          width: 100%;
          height: 40 / @base;
          .shangpin_price_daola {
            padding-top: 5 / @base;
            font-size: 25 / @base;
            color: #a46abd;
          }
          .shangpin_price_money {
            margin-left: 5 / @base;
            font-size: 30 / @base;
            color: #a46abd;
          }
        }
        .shangpin_shop {
          width: 100%;
          height: 55 / @base;
          line-height: 55 / @base;
          font-size: 20 / @base;
          color: #c0c0c0;
          span {
            color: black;
            margin-left: 20 / @base;
          }
        }
      }
    }
  }
}

//优惠券中间
.coupon {
  margin-top: 370 / @base;
  width: 100%;
  min-height: 1300 / @base;
  background: #eeeeee;
  padding: 40 / @base 40 / @base 70 / @base 40 / @base;
  .coupon_item {
    position: relative;
    display: flex;
    margin-bottom: 25 / @base;
    width: 100%;
    height: 180 / @base;
    background: url("../../../assets/images/store_page_quan.png") no-repeat;
    background-size: 100% 100%;
    .coupon_right_ball {
      position: absolute;
      right: 20 / @base;
      top: 35%;
      font-size: 20 / @base;
      width: 160 / @base;
      height: 55 / @base;
      line-height: 55 / @base;
      text-align: center;
      color: white;
      background: linear-gradient(to right, #a768f5, #7e32ea);
      border-radius: 20px;
    }
    .coupon_left {
      width: 27.5%;
      height: 180 / @base;
      line-height: 180 / @base;
      color: #ea662d;
      text-align: center;
    }
    .coupon_right {
      padding-left: 40 / @base;
      padding-top: 15 / @base;
      width: 70%;
      height: 180 / @base;
      line-height: 180 / @base;
      .coupon_right_name {
        width: 100%;
        font-weight: 600;
        height: 60 / @base;
        line-height: 60 / @base;
        font-size: 35 / @base;
      }
      .coupon_right_desc {
        margin-top: 5 / @base;
        font-size: 22 / @base;
        width: 160 / @base;
        height: 40 / @base;
        line-height: 40 / @base;
        text-align: center;
        border: 1px solid #facb86;
        border-radius: 20px;
      }
      .coupon_right_time {
        width: 100%;
        height: 50 / @base;
        line-height: 50 / @base;
        font-size: 20 / @base;
        color: #757575;
        margin-top: 5 / @base;
      }
    }
  }
}
//公用部分---分类
.fen {
  z-index: 2;
  position: fixed;
  top: 370 / @base;
  background: white;
  width: 100%;
  height: 90 / @base;
  border-bottom: 1px solid #e6e6e6;
  padding: 15 / @base 40 / @base;
  display: flex;
  font-size: 28 / @base;
  i {
    margin-left: 110 / @base;
    font-size: 40 / @base;
    color: black;
    line-height: 60 / @base;
  }
  .fen_item {
    width: 150 / @base;
    height: 60 / @base;
    line-height: 60 / @base;
    // background: red;
    text-align: center;
    border-radius: 20px;
    margin-right: 15 / @base;
    i{
      font-size:24/@base;;
    }
  }
  .fen_item_active {
    color: white;
    background: #b694e8;
  }
}

// 一行俩
.product_flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 25 / @base 40 / @base;
  /deep/ .van-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  /deep/.inner {
    margin-bottom: 20 / @base;
    width: 47%;
    height: auto;
    background: white;
    border-radius: 10 / @base;
    // padding: 25 / @base 40 / @base;
    // border-bottom: 1 / @base solid #bfbfbf;
    box-shadow: 0px 0px 5px 1px #c4c3c6;
    .left {
      // margin-right: 20/@base;
      border-radius: 10 / @base;
      overflow: hidden;
      img {
        width: 100%;
        background-size: 100% 100%;
      }
    }
    .right {
      padding: 10 / @base;
      // width: 410 / @base;
      position: relative;
      .wenzi {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; //行数
        -webkit-box-orient: vertical;
        font-size: 30 / @base;
        color: #333;
      }
      .discount {
        position: relative;
        font-size: 19 / @base;
        width: 140 / @base;
        height: 40 / @base;
        line-height: 40 / @base;
        border: 1px solid #b897eb;
        color: #b897eb;
        border-radius: 20 / @base;
        padding-left: 60 / @base;
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
      // jindu
      .jindu {
        display: flex;
        font-size: 20 / @base;
        color: #757575;
        .jindutiao {
          padding-top: 15 / @base;
          margin-right: 10 / @base;
          width: 40%;
        }
      }
      .clean {
        font-size: 24 / @base;
        color: #757575;
      }
      .price {
        position: relative;
        span {
          color: #b694ea;
          display: inline-block;
          &.after {
            left: 0;
            top: 10 / @base;
            position: absolute;
            width: 68 / @base;
            height: 28 / @base;
            margin-right: 15 / @base;
            background: url(../../../assets/images/product_discount.png) center
              no-repeat;
            background-size: 100%;
            vertical-align: middle;
          }
          &.icon {
            font-size: 30 / @base;
            font-weight: 700;
            margin-right: 5 / @base;
          }
          &.num {
            font-size: 36 / @base;
            font-weight: 700;
          }
        }
      }
      .oldprice {
        // margin-top: 2 / @base;
        font-size: 18 / @base;
        color: #636363;
        .del {
          text-decoration: line-through;
        }
      }
      .post {
        margin-top: 8 / @base;
        width: 62 / @base;
        height: 26 / @base;
        border-radius: 5 / @base;
        border: 1 / @base solid #8b06b8;
        font-size: 18 / @base;
        height: 30 / @base;
        text-align: center;
        color: #8b06b8;
      }
    }
  }
}
//一行一个
.product {
  padding-bottom: 80 / @base;
  z-index: -1;
  .inner {
    display: flex;
    background: white;
    padding: 25 / @base 40 / @base;
    border-bottom: 1 / @base solid #bfbfbf;

    .left {
      margin-right: 20 / @base;
      border-radius: 10 / @base;
      overflow: hidden;
      img {
        height: 230 / @base;
        width: 230 / @base;
      }
    }
    .right {
      width: 410 / @base;
      position: relative;
      .wenzi {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; //行数
        -webkit-box-orient: vertical;
        font-size: 30 / @base;
        color: #333;
      }
      .discount {
        position: relative;
        font-size: 19 / @base;
        width: 140 / @base;
        height: 40 / @base;
        line-height: 40 / @base;
        border: 1px solid #b897eb;
        color: #b897eb;
        border-radius: 20 / @base;
        padding-left: 60 / @base;
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
      // jindu
      .jindu {
        display: flex;
        font-size: 20 / @base;
        color: #757575;
        .jindutiao {
          padding-top: 15 / @base;
          margin-right: 10 / @base;
          width: 40%;
        }
      }
      .clean {
        font-size: 24 / @base;
        color: #757575;
      }
      .price {
        position: relative;
        span {
          color: #b694ea;
          display: inline-block;
          &.after {
            left: 0;
            top: 10 / @base;
            position: absolute;
            width: 68 / @base;
            height: 28 / @base;
            margin-right: 15 / @base;
            background: url(../../../assets/images/product_discount.png) center
              no-repeat;
            background-size: 100%;
            vertical-align: middle;
          }
          &.icon {
            font-size: 30 / @base;
            font-weight: 700;
            margin-right: 5 / @base;
          }
          &.num {
            font-size: 36 / @base;
            font-weight: 700;
          }
        }
      }
      .oldprice {
        // margin-top: 2 / @base;
        font-size: 18 / @base;
        color: #636363;
        .del {
          text-decoration: line-through;
        }
      }
      .post {
        margin-top: 8 / @base;
        width: 62 / @base;
        height: 26 / @base;
        border-radius: 5 / @base;
        border: 1 / @base solid #8b06b8;
        font-size: 18 / @base;
        height: 30 / @base;
        text-align: center;
        color: #8b06b8;
      }
    }
  }
}

// t弹窗分类
.fenlei {
  width: 100%;
  min-height: 100%;
  background: #eeeeee;
  .fenlei_bu {
    width: 100%;
    height: 20 / @base;
  }
  .fenlei_box {
    width: 90%;
    // miheight: 350 / @base;
    margin: 0 auto 15 / @base auto;
    background: white;
    border-radius: 10 / @base;
    padding: 0 15 / @base;
    .fenlei_box_title {
      position: relative;
      font-size: 30 / @base;
      width: 100%;
      height: 90 / @base;
      line-height: 90 / @base;
      i {
        font-size: 40 / @base;
        position: absolute;
        right: 0;
        color: #d0d0d0;
      }
    }
    .fenlei_box_item {
      overflow: hidden;
      display: inline-block;
      width: 47%;
      height: 60 / @base;
      line-height: 60 / @base;
      padding-left: 15 / @base;
      background: #dcdcdc;
      font-size: 26 / @base;
      margin-bottom: 10 / @base;
      margin-right: 3%;
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
}
</style>