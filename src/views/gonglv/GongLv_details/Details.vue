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



    <!-- 顶部返回分享容器 -->
    <div id="top_f" class="top_fixed">
      <div id="top_l" class="top_left">
        <i @click="back" id="top_li" class="iconfont icon-zuojiantou"></i>
      </div>
      <div id="top_r" class="top_right" @click="showfen = true">
        <i id="top_ri" class="iconfont icon-fenxiang2"></i>
      </div>
    </div>
    <!-- 图片或者视频容器 -->
    <div class="top_show">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img :src="xiangmulist.BannerImg" alt />
        </van-swipe-item>
      </van-swipe>
      <div class="bot">1/1</div>
    </div>
    <!-- 头部标题 -->
    <div class="detail_title">
      <div class="detail_price">
        <span class="detail_price_bi">¥</span>
        <span class="detail_price_qian">{{xiangmulist.Price}}</span>
      </div>
      <!-- <div class="detail_del">
        价格:
        <span>¥1500</span>
      </div>-->
      <div v-if="isjindu" class="jindu">
        <span class="jindutiao">
          <van-progress :show-pivot="false" :percentage="50" color="#AB77FD" />
        </span>
        <span class="jinduzi">已抢50%(限量1500套)</span>
      </div>

      <!-- <div class="time">
        <span class="sell">倒计时</span>
        <span>
          <van-count-down :time="time" />
        </span>
      </div>-->
      <div class="detail_name">{{xiangmulist.Name}}</div>
    </div>
    <div class="kongxi"></div>
    <div class="detail_card" @click="active_baozhang=true">
      <div class="detail_cardleft">须知</div>
      <div class="detail_cardmiddle">假一赔四·上门退取·极速退款·七天无理由退换</div>
      <i class="iconfont icon-youjiantou"></i>
    </div>
    <div class="kongxi"></div>
    <div @click="toshop()" class="detail_card">
      <!-- <div class="detail_cardleft">选择</div> -->
      <div
        style="font-size:0.38rem ;color:black"
        class="detail_cardmiddle"
      >{{xiangmulist.SellerName}}</div>
      <!-- <div class="detail_cardright">全部尺码</div> -->
      <i class="iconfont icon-youjiantou"></i>
    </div>
    <div class="kongxi"></div>
    <!-- <div class="detail_card" @click="active_youhui=true">
      <div class="detail_cardleft">优惠</div>
      <div class="detail_cardmiddle">促销,店铺优惠券</div>
      <i class="iconfont icon-youjiantou"></i>
    </div>
    <div class="kongxi"></div>
    <div class="detail_card">
      <div class="detail_cardleft">评价</div>
      <div class="detail_cardmiddle">200条评价</div>
      <i class="iconfont icon-youjiantou"></i>
    </div>-->
    <!-- <div class="kongxi"></div> -->
    <!-- 商家信息 -->
    <!-- <div class="head-store">
      <img src="../../../assets/images/brand_logo1.png" alt />
      <div class="head-store-right">
        <div class="head-store-rightname">哎喽喂</div>
        <div class="head-store-rightrenqi">
          <i class="iconfont icon-hot"></i>人气值:15万
        </div>
        <div class="head-store-rightfans">粉丝数:3000 | 100%好评</div>
      </div>
      <div class="jinru">进入店铺</div>
    </div>
    <div class="kongxi"></div>-->
    <!-- 宝贝详情 -->
    <van-divider :style="{ color: '#393939', borderColor: '#393939', padding: '0 110px' }">宝贝详情</van-divider>

    <!-- 下方图片 -->
    <!-- <img
      style="width:100%;background-size:100% 100%"
      src="../../../assets/images/store_haibao.png"
      alt
    />-->
    <div class="description" v-html="this.xiangmulist.Description"></div>

    <!-- 保障弹出层 -->
    <van-popup v-model="active_baozhang" position="bottom" :style="{ height: '70%' }">
      <div class="baozhang_box">
        <div class="baozhang_p">购买须知</div>
        <div class="baozhang_boxbox">
          <div class="baozhang_box_title">有效期</div>
          <div class="baozhang_box_content">
            <span>.</span>请你提前一小时预约
          </div>
          <div class="baozhang_box_title">预约信息</div>
          <div class="baozhang_box_content">
            <span>.</span>请你提前一小时预约
          </div>
          <div class="baozhang_box_title">规则提醒</div>
          <div class="baozhang_box_content">
            <span>.</span>需你当日一次性体验完
          </div>
          <div class="baozhang_box_title">商家服务</div>
          <div class="baozhang_box_content">
            <span>.</span>提供免费wifi
          </div>
          <div class="baozhang_box_content">
            <span>.</span>提供免费停车位
          </div>
          <div class="baozhang_box_title">商家服务</div>
          <div class="baozhang_box_content">
            <span>.</span>提供免费wifi
          </div>
          <div class="baozhang_box_content">
            <span>.</span>提供免费停车位
          </div>
          <div class="baozhang_box_title">商家服务</div>
          <div class="baozhang_box_content">
            <span>.</span>提供免费wifi
          </div>
          <div class="baozhang_box_content">
            <span>.</span>提供免费停车位
          </div>
        </div>
        <div class="baozhang_box_bottom" @click="active_baozhang=false">已了解</div>
      </div>
    </van-popup>

    <!-- 优惠弹出层 -->
    <van-popup v-model="active_youhui" position="bottom" :style="{ height: '70%' }">
      <div class="youhui_box">
        <div class="youuhi_box_title">优惠</div>
        <div class="youhui_box_lable">优惠券</div>
        <div class="coupon">
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
      </div>
    </van-popup>

    <!-- 商品弹出层 -->
    <van-popup v-model="active_buy" round position="bottom" :style="{height:'500px' }"></van-popup>

    <!-- 底部 -->
    <div class="shopping">
      <div class="bg clearfix">
        <div class="left">
          <div class="collect">
            <img
              @click="shoucang"
              v-if="!xiangmulist.FavoriteFlag"
              src="../../../assets/images/article_nolike.png"
              alt
            />
            <img @click="del_shoucang" v-else src="../../../assets/images/article_islike.png" alt />
            <span>收藏</span>
          </div>
          <div @click="toshop()" class="goods">
            <i></i>
            <span>店铺</span>
          </div>
          <div @click="kefu" class="kefu">
            <i></i>
            <span>客服</span>
          </div>
        </div>
        <div class="right">
          <div @click="jiaru" class="cart">
            <span>加入购物车</span>
          </div>
          <div @click="mai" class="shop">
            <span>立即购买</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import { Progress, Toast, Swipe, SwipeItem, Stepper } from "vant";
import videojs from "video.js";
import "videojs-contrib-hls";
export default {
  data() {
    return {
       showfen:false,
      value: "", //步进器
      active_index: -1,
      qingfenlei: "请选择颜色分类尺码",
      shangpin_type: [
        {
          img:
            "http://test1.merrychange.net/Content/Upload/Image/Image/20191114110118753.png",
          name: "洁净保湿三件套精)"
        },
        {
          img:
            "http://test1.merrychange.net/Content/Upload/Image/Image/20191114110118753.png",
          name: "洁净保湿(爽肤水+乳液+洗洁精)"
        },
        {
          img:
            "http://test1.merrychange.net/Content/Upload/Image/Image/20191114110118753.png",
          name: "洁净保湿三件套(爽肤水+乳液+洗洁精)"
        }
      ],
      id: "",
      xiangmulist: [],
      offsetTop: 0, //到顶部的距离
      coupon_list: [
        { price: 50, firsttime: "2019/5/6", overtime: "2019/6/6" },
        { price: 50, firsttime: "2019/5/6", overtime: "2019/6/6" },
        { price: 50, firsttime: "2019/5/6", overtime: "2019/6/6" },
        { price: 50, firsttime: "2019/5/6", overtime: "2019/6/6" }
      ], //优惠券
      time: 10 * 60 * 60 * 1000,
      isjindu: false,
      isdao: true,
      active_baozhang: false,
      active_youhui: false,
      active_buy: false
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    this.id = this.$route.query.id;

    console.log("商品id" + this.id);
    this.GetCommodityDetail();
    window.addEventListener("scroll", this.handleFun);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleFun);
  },
  methods: {
    towechat() {
      var dizhi = this.$domain.url+"details?id="+this.id;
      var name = this.xiangmulist.Name;
      var description = "物美价廉,您值得拥有";
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
        this.$bridge.callhandler("shareToWechat", params, data => {
          
        });
      } else {
        console.log("我不是安卓也不是ios,我在哪");
      }
      this.showfen = false;
    },
    tofriend() {
     var dizhi = this.$domain.url+"details?id="+this.id;
      var name = this.xiangmulist.Name;
      var description = "物美价廉,您值得拥有";
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
    // jia加入购物车
    jiaru() {
      request
        .post(this.$api + "/mobile/ShoppingCartCreate", {
          ProductId: this.id,
          ProductName: this.xiangmulist.Name,
          ProductType: this.xiangmulist.Type
        })
        .then(res => {
          if (res.Data == 0 || res.Data == -1) {
            Toast(res.Message);
          } else {
            Toast("加入购物车成功");
          }
        })
        .catch(err => {});
    },
    // 立即购买
    mai() {
      request
        .post(this.$api + "/mobile/CheckLoginStatus", {})
        .then(res => {
          if (res.Data.OnlineFlag) {
            // 说明登录
            this.$router.push({
              path: "/submit_order",
              query: {
                id: this.id
              }
            });
          } else {
            // 说明未登录  判断安卓和ios同事去登陆
            var u = navigator.userAgent;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
            if (isAndroid) {
              console.log("我是要去安卓");
              window.android.logOut();
            } else if (isiOS) {
              console.log("我是要去ios");
              window.location.href = "mqjapp://logout";
            }
          }
        })
        .catch(err => {});
    },
    // 收藏
    shoucang() {
      request
        .post(this.$api + "/mobile/FavoriteAdd", {
          MainId: this.id,
          Type: "Project"
        })
        .then(res => {
          if (res.IsSuccess) {
            Toast("收藏成功");
            this.GetCommodityDetail();
          } else {
            Toast(res.Message);
          }
        })
        .catch(err => {});
    },
    del_shoucang() {
      request
        .post(this.$api + "/mobile/FavoriteDelete", {
          MainId: this.id,
          Type: "Project"
        })
        .then(res => {
          if (res.IsSuccess) {
            Toast("取消收藏成功");
            this.GetCommodityDetail();
          } else {
            Toast(res.Message);
          }
        })
        .catch(err => {});
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
    // qu去商家
    toshop() {
      request
        .post(this.$api + "/mobile/CheckLoginStatus", {})
        .then(res => {
          if (res.Data.OnlineFlag) {
            // 说明登录
            this.$router.push({
              path: "/shop",
              query: {
                id: this.xiangmulist.SellerId
              }
            });
          } else {
            // 说明未登录  判断安卓和ios同事去登陆
            var u = navigator.userAgent;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
            if (isAndroid) {
              console.log("我是要去安卓");
              window.android.logOut();
            } else if (isiOS) {
              console.log("我是要去ios");
              window.location.href = "mqjapp://logout";
            }
          }
        })
        .catch(err => {});
    },
    sel_type(item, index) {
      console.log(index);
      if (this.active_index === index) {
        this.active_index = "";
        this.qingfenlei = "请选择颜色分类尺码";
      } else {
        this.qingfenlei = item.name;
        this.active_index = index;
      }
    },
    qidai() {
      Toast("敬请期待~");
    },
    onBuyClicked() {
      Toast("立即购买");
    },
    onAddCartClicked() {
      Toast("添加购物单车");
    },
    // 获取项目详情

    GetCommodityDetail() {
      request
        .post(this.$api + "/mobile/GetCommodityProjectDetail", {
          Id: this.id
        })
        .then(res => {
          this.xiangmulist = res.Data;
        })
        .catch(err => {});
    },
    // 滚动监听
    // 滚动监听
    handleFun() {
      var top_fixed = document.querySelector("#top_f");
      var top_left = document.querySelector("#top_l");
      var top_right = document.querySelector("#top_r");
      var top_li = document.querySelector("#top_li");
      var top_ri = document.querySelector("#top_ri");
      this.offsetTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (this.offsetTop > 36) {
        top_fixed.style.background = "#FFFFFF";
        top_left.style.background = "#FFFFFF";
        top_li.style.color = "#040307";
        top_right.style.background = "#FFFFFF";
        top_ri.style.color = "#040307";
      } else {
        top_fixed.style.background = "none";
        top_left.style.background = "rgba(102, 103, 98, 0.5)";
        top_li.style.color = "#ffffff";
        top_right.style.background = "rgba(102, 103, 98, 0.5)";
        top_ri.style.color = "#ffffff";
      }
    }
  }
};
</script>
<style scoped lang='less'>
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
.van-popup--bottom {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.van-count-down {
  height: 40 / @base;
  margin-left: 15 / @base;
  font-size: 8px;
  line-height: 40 / @base;
  color: #b31e1e;
}
.van-progress {
  background: #ffffff !important;
  border: 1px solid #b694e8;
  margin-top: 15 / @base;
}
.kongxi {
  width: 100%;
  height: 15 / @base;
  background: #eeeeee;
}
// 顶部返回分享容器
.top_fixed {
  position: fixed;
  top: 0;
  width: 100%;
  height: 120 / @base;
  // background: blue;
  z-index: 1;
  .top_left {
    position: fixed;
    top: 20 / @base;
    left: 40 / @base;
    width: 80 / @base;
    height: 80 / @base;
    line-height: 80 / @base;
    background: rgba(102, 103, 98, 0.5);
    text-align: center;
    border-radius: 50%;
    
    z-index: 2;
    i {
      font-size: 25px;
      width: 80 / @base;
      height: 80 / @base;
      line-height: 80 / @base;
      color: white;
    }
  }
  .top_right {
    position: fixed;
    top: 20 / @base;
    right: 40 / @base;
    width: 80 / @base;
    height: 80 / @base;
    line-height: 80 / @base;
   
    background: rgba(102, 103, 98, 0.5);
    text-align: center;
    z-index: 2;
    border-radius: 50%;
    i {
      font-size: 25px;
      width: 80 / @base;
      height: 80 / @base;
      line-height: 80 / @base;
      color: white;
    }
  }
}
// 视频图片容器
.top_show {
  width: 100%;
  height: 650 / @base;
  position: relative;
  .bot {
    position: absolute;
    bottom: 30 / @base;
    right: 60 / @base;
    width: 120 / @base;
    height: 50 / @base;
    line-height: 50 / @base;
    font-size: 28 / @base;
    text-align: center;
    color: #fff;
    background: #a4a4a4;
    border-radius: 20px;
    opacity: 0.5;
  }
  img {
    width: 100%;
    height: 650 / @base;
    background-size: 100% 100%;
  }
}
// 头部
.detail_title {
  width: 100%;
  // height: 280 / @base;
  padding: 20 / @base 40 / @base 30 / @base 40 / @base;
  background: white;
  .time {
    margin-top: 10 / @base;
    display: flex;
    width: 220 / @base;
    height: 40 / @base;
    // line-height: 28 / @base;
    font-size: 18 / @base;
    color: #b31e1e;
    border-radius: 20 / @base;
    border: 1px solid #b31e1e;
    span {
      display: inline-block;
      &.sell {
        margin-left: -1px;
        width: 90 / @base;
        height: 40 / @base;
        line-height: 40 / @base;
        background-color: #b31e1e;
        color: #fff;
        border-radius: 25 / @base;
        text-align: center;
        font-size: 15 / @base;
      }
    }
  }
  .detail_price {
    color: #b694e8;
    .detail_price_bi {
      font-size: 32 / @base;
    }
    .detail_price_qian {
      font-size: 40 / @base;
      font-weight: 600;
      margin-left: 5 / @base;
    }
  }
  .detail_del {
    font-size: 28 / @base;
    color: #a9a9a9;
    span {
      text-decoration: line-through;
    }
  }
  .jindu {
    width: 100%;
    height: 30 / @base;
    line-height: 30 / @base;
    .jindutiao {
      display: inline-block;
      width: 200 / @base;
      height: 30 / @base;
    }
    .jinduzi {
      font-size: 23 / @base;
      color: #a9a9a9;
    }
  }
  .detail_name {
    font-size: 32 / @base;
    margin-top: 15 / @base;
    font-weight: 550;
  }
}
// 中间部分卡片
.detail_card {
  position: relative;
  display: flex;
  width: 100%;
  height: 100 / @base;
  // background:red;
  padding: 0 40 / @base;
  .detail_cardleft {
    width: 16%;
    height: 100 / @base;
    line-height: 100 / @base;
    font-size: 29 / @base;
  }
  .detail_cardmiddle {
    width: 80%;
    height: 100 / @base;
    line-height: 100 / @base;
    font-size: 24 / @base;
    color: #666762;
  }
  .detail_cardright {
    position: absolute;
    right: 80 / @base;
    font-size: 24 / @base;
    height: 100 / @base;
    line-height: 100 / @base;
    color: #666762;
  }
  i {
    position: absolute;
    right: 40 / @base;
    top: 0;
    display: inline-block;
    width: 5%;
    height: 100 / @base;
    line-height: 100 / @base;
  }
}

// 商家信息
.head-store {
  position: relative;
  width: 100%;
  height: 180 / @base;
  display: flex;
  //   background: red;
  padding: 20 / @base 40 / @base 0 40 / @base;
  .jinru {
    position: absolute;
    right: 40 / @base;
    top: 30 / @base;
    font-size: 28 / @base;
    color: white;
    background: #b694e8;
    width: 160 / @base;
    height: 55 / @base;
    line-height: 55 / @base;
    text-align: center;
    border-radius: 20px;
  }
  img {
    width: 120 / @base;
    height: 120 / @base;
    background-size: 100% 100%;
    border-radius: 10 / @base;
  }
  .head-store-right {
    width: 60%;
    height: 120 / @base;
    //   background: blue;
    padding-left: 15 / @base;
    .head-store-rightname {
      font-size: 35 / @base;
    }
    .head-store-rightrenqi {
      border: 1px solid white;
      opacity: 0.8;
      width: 160 / @base;
      height: 40 / @base;
      line-height: 40 / @base;
      background: #b694e8;
      font-size: 20 / @base;
      color: white;
      i {
        font-size: 20 / @base;
      }
    }
    .head-store-rightfans {
      margin-top: 15 / @base;
      font-size: 20 / @base;
    }
  }
}

// 底部内容
.description {
  width: 100%;
  padding-bottom: 80 / @base;
}
// 底部
.shopping {
  width: 100%;
  position: fixed;
  bottom: 0;
  .bg {
    width: 100%;
    display: flex;
    .left {
      width: 50%;
      // float: left;
      display: flex;
      color: #a4a4a4;

      height: 90 / @base;
      line-height: 90 / @base;
      background-color: #fff;

      div {
        width: 33.3%;
        text-align: center;
        span {
          display: block;
          width: 100%;
          line-height: 30 / @base;
        }
        &.collect {
          img {
            display: block;
            width: 30 / @base;
            height: 30 / @base;
            margin: 16 / @base auto 8 / @base;
            // background: url("../../../assets/images/article_aixin.png") center
            //   no-repeat;
            background-size: contain;
          }
        }
        &.goods {
          i {
            display: block;
            width: 30 / @base;
            height: 30 / @base;
            margin: 16 / @base auto 8 / @base;
            background: url("../../../assets/images/shop.png") center no-repeat;
            background-size: contain;
          }
        }
        &.kefu {
          i {
            display: block;
            width: 30 / @base;
            height: 30 / @base;
            margin: 16 / @base auto 8 / @base;
            background: url("../../../assets/images/kufu.png") center no-repeat;
            background-size: contain;
          }
        }
      }
    }
    span {
      font-size: 24 / @base;
    }

    .right {
      width: 50%;
      // float: left;
      display: flex;
      div {
        width: 200 / @base;
        height: 90 / @base;
        line-height: 90 / @base;
        text-align: center;
        font-size: 30 / @base;
        color: #fff;
      }
      & .cart {
        background-color: #a0a0a0;
        margin-right: -3 / @base;
      }
      & .shop {
        background-color: #b695e9;
      }
    }
  }
}

// 保障弹出层
.baozhang_box {
  padding-top: 30 / @base;
  position: relative;
  width: 100%;
  height: 100%;
  .baozhang_p {
    font-size: 30 / @base;
    font-weight: bold;
    color: #333333;
    text-align: center;
    margin-bottom: 56 / @base;
    // margin-top: 30/@base;
  }
  .baozhang_boxbox {
    padding: 0 43 / @base;
    width: 664 / @base;
    height: 700 / @base;
    overflow: scroll;
    .baozhang_box_title {
      font-size: 28 / @base;
      font-weight: bold;
      margin-top: 30 / @base;
    }
    .baozhang_box_content {
      font-size: 26 / @base;
      // color: #666762;
      // margin-top: 10/@base;
      // margin-bottom: 7/@base;
      span {
        font-size: 18px;
        position: relative;
        top: -3px;
      }
    }
  }

  .baozhang_box_bottom {
    position: absolute;
    bottom: 20 / @base;
    left: 183 / @base;
    width: 400 / @base;
    height: 70 / @base;
    line-height: 70 / @base;
    color: white;
    text-align: center;
    background: #b694e8;
    font-size: 32 / @base;
    border-radius: 20px;
  }
}
// 优惠弹出层
.youhui_box {
  width: 100%;
  height: 100%;
  .youuhi_box_title {
    width: 100%;
    height: 90 / @base;
    line-height: 90 / @base;
    text-align: center;
    font-size: 35 / @base;
  }
  .youhui_box_lable {
    width: 100%;
    height: 60 / @base;
    line-height: 60 / @base;
    font-size: 30 / @base;
    padding-left: 40 / @base;
  }
  //优惠券中间
  .coupon {
    width: 100%;
    min-height: 1300 / @base;
    padding: 40 / @base 40 / @base 70 / @base 40 / @base;
    .coupon_item {
      position: relative;
      display: flex;
      margin-bottom: 25 / @base;
      width: 100%;
      height: 180 / @base;
      background: url("../../../assets/images/product_youhuiquan.png") no-repeat;
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
        width: 30%;
        height: 180 / @base;
        line-height: 180 / @base;
        color: white;
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
          color: white;
          background: #caa8ff;
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
}
// 立即购买
.shangpin {
  position: relative;
  padding: 52 / @base 40 / @base;
  height: 500px;
  .shangpin_bottom1 {
    position: absolute;
    bottom: 30 / @base;
    left: 41 / @base;
    width: 320 / @base;
    height: 70 / @base;
    background: #ffae00;
    border-radius: 30 / @base;
    font-size: 24 / @base;
    color: #ffffff;
    line-height: 70 / @base;
    text-align: center;
  }
  .shangpin_bottom2 {
    position: absolute;
    bottom: 30 / @base;
    right: 41 / @base;
    width: 320 / @base;
    height: 70 / @base;
    background: #cba8ff;
    border-radius: 30 / @base;
    font-size: 24 / @base;
    color: #ffffff;
    line-height: 70 / @base;
    text-align: center;
  }
  .shangpin_top {
    display: flex;
    width: 100%;
    height: 200 / @base;
    // background:red;
    img {
      display: block;
      width: 200 / @base;
      height: 200 / @base;
      background-size: 100% 100%;
    }
    .shangpin_topright {
      width: 80%;
      height: 200 / @base;
      padding: 26 / @base;
      .shangpin_price {
        font-size: 48 / @base;
        color: #b694e8;
        font-weight: normal;
        letter-spacing: -1px;
        span {
          font-size: 32 / @base;
          margin-right: 15 / @base;
        }
      }
      .shangpin_name {
        font-size: 20 / @base;
        color: #333333;
        line-height: 32 / @base;
        width: 437 / @base;
        height: 52 / @base;
        line-height: 32 / @base;
        font-stretch: normal;
        font-weight: normal;
      }
    }
  }
  .shangpin_middle {
    border-bottom: 1px solid #d2d2d2;
    width: 690 / @base;
    height: 347 / @base;
    // background:red;
    margin-top: 62 / @base;
    padding-left: 20 / @base;
    .shangpin_middletitle {
      font-size: 28 / @base;
      line-height: 38 / @base;
      color: #333333;
      font-weight: normal;
      margin-bottom: 30 / @base;
    }
    .shangpin_middletype {
      // width: 100%;
      height: 250 / @base;
      .type_box {
        border: 1px solid #fff;
        display: flex;
        margin: 10 / @base 0;
        height: 70 / @base;
        background: #eeeeee;
        border-radius: 10 / @base;
        img {
          width: 51 / @base;
          height: 51 / @base;
          margin: 10 / @base;
          background-size: 100% 100%;
        }
        div {
          min-width: 400 / @base;
          height: 70 / @base;
          font-size: 24 / @base;
          font-weight: normal;
          line-height: 70 / @base;
          //  height: 51/@base;
        }
      }
      .type_box_active {
        color: #9a5dfd !important;
        border: 1px solid #9a5dfd !important;
        background: #f2eaff !important;
      }
    }
  }
  .shangpin_num {
    width: 668 / @base;
    height: 47 / @base;
    margin-top: 37 / @base;
    p {
      float: left;
      font-size: 28 / @base;
      font-weight: normal;
      color: #333333;
      font-weight: normal;
    }
    div {
      float: right;
    }
  }
}
</style>