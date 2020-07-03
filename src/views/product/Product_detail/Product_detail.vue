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
      <van-swipe
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        :initial-swipe="activeIndex"
        class="my-swipe"
        stop-propagation="false"
        @change="onChange2"
      >
        <van-swipe-item
          @click="datu(item,index)"
          v-for="(item,index) in chanpinlist.Imgs"
          :key="index"
        >
          <img :src="item" alt />
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">{{ activeIndex + 1 }}/{{sum}}</div>
        </template>
      </van-swipe>
    </div>
    <!-- 头部标题 -->
    <div class="detail_title">
      <div class="detail_price">
        <span class="detail_price_bi">¥</span>
        <span class="detail_price_qian">{{chanpinlist.Price}}</span>
      </div>
      <div class="detail_del">
        原价:
        <span>¥{{chanpinlist.OriginalPrice}}</span>
      </div>
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
      <div class="detail_name">{{chanpinlist.Name}}</div>
    </div>
    <div class="kongxi"></div>
    <div class="detail_card" @click="active_baozhang=true">
      <div class="detail_cardleft">保障</div>
      <div class="detail_cardmiddle">假一赔四·极速退款·七天无理由退换</div>
      <i class="iconfont icon-youjiantou"></i>
    </div>
    <div class="kongxi"></div>
    <div v-show="notype === false" class="detail_card" @click="active_buy=true">
      <div class="detail_cardleft">选择</div>
      <div class="detail_cardmiddle">{{qingfenlei | titleLength}}</div>
      <div class="detail_cardright">全部尺码</div>
      <i class="iconfont icon-youjiantou"></i>
    </div>
    <div v-show="notype === false" class="kongxi"></div>
    <!-- <div class="detail_card" @click="active_youhui=true">
      <div class="detail_cardleft">优惠</div>
      <div class="detail_cardmiddle">促销,店铺优惠券</div>
      <i class="iconfont icon-youjiantou"></i>
    </div>
    
    
    -->
    <!-- <div class="kongxi"></div> -->
    <div class="detail_card" @click="toping(id)">
      <div class="detail_cardleft">评价</div>
      <div class="detail_cardmiddle">{{chanpinlist.CommentCount}}条评价</div>
      <i class="iconfont icon-youjiantou"></i>
    </div>
    <div class="kongxi"></div>
    <!-- 商家信息 -->
    <div class="head-store">
      <img :src="chanpinlist.SellerImg" alt />
      <div class="head-store-right">
        <div class="head-store-rightname">{{chanpinlist.SellerName}}</div>
        <div class="head-store-rightrenqi">
          <i class="iconfont icon-hot"></i>
          人气值:{{chanpinlist.SellerPopularity}}
        </div>
        <div
          class="head-store-rightfans"
        >粉丝数:{{chanpinlist.FavoriteCount}} | {{chanpinlist.CommentRate}}%好评</div>
      </div>
      <div class="jinru" @click="todianpu()">
        进入
        <span v-if="chanpinlist.FType === 1">橱窗</span>
        <span v-else>店铺</span>
      </div>
    </div>
    <div class="kongxi"></div>
    <!-- 宝贝详情 -->
    <van-divider :style="{ color: '#393939', borderColor: '#393939', padding: '0 110px' }">宝贝详情</van-divider>

    <!-- 下方图片 -->
    <div class="description" v-html="chanpinlist.Description"></div>
    <!-- 最下方 -->
    <div class="explain">
      <div class="explain_top">价格说明</div>
      <div class="explain_item">
        <div class="line"></div>
        <div class="explain_item_title">划线价格</div>
        <div class="explain_item_content">指商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等,并非原价,仅供参考.</div>
      </div>
      <div class="explain_item">
        <div class="line"></div>
        <div class="explain_item_title">未划线价格</div>
        <div
          class="explain_item_content"
        >指商品的实时标价,不因表述的差异改变性质.具体成交价格根据商品参加活动,或会员使用优惠券、积分等发生变化,最终以订单结算页价格为准</div>
      </div>
      <div class="explain_item">
        <div class="line"></div>
        <div
          class="explain_item_content"
        >商家详情页(含主图)以图片或文字形式标注的一口价、促销价、优惠价等价格可能是在使用优惠券、满减或特定优惠活动和时段等情形下的价格,具体请以结算页面的标价、优惠条件或活动规则为准.</div>
      </div>
      <div class="explain_item">
        <div class="line"></div>
        <div class="explain_item_content">此说明仅当出现价格比较时有效,具体请参见《魅千金价格发布规范》.若商家单独对划线价格进行说明的,以商家的表述为准</div>
      </div>
    </div>

    <!-- 保障弹出层 -->
    <van-popup v-model="active_baozhang" position="bottom" :style="{ height: '70%' }">
      <div class="baozhang_box">
        <div class="baozhang_box_title">
          <i class="iconfont icon-duihaocheckmark17"></i>7天无理由
        </div>
        <div class="baozhang_box_content">满足7天无理由退换货的前提下,包邮商品需要买家承担退货邮费,费包邮商品需要买家承担发货和退货邮费</div>
        <div class="baozhang_box_title">
          <i class="iconfont icon-duihaocheckmark17"></i>假一赔四
        </div>
        <div class="baozhang_box_content">正品保障,假一赔四</div>
        <div class="baozhang_box_bottom" @click="active_baozhang=false">完成</div>
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
    <van-popup v-model="active_buy" round position="bottom" :style="{ height:'500px' }">
      <div class="shangpin">
        <div class="shangpin_top">
          <img :src="type_itemimg" alt />
          <div class="shangpin_topright">
            <div class="shangpin_price">
              <span>¥</span>
              {{chanpinlist.Price}}
            </div>
            <div v-show="notype === false" class="shangpin_name">{{qingfenlei}}</div>
          </div>
        </div>
        <div class="shangpin_middlebox">
          <div v-if="notype === false">
            <div
              class="shangpin_middle"
              v-for="(item,index) in this.shangpin_type.TypeList"
              :key="index"
            >
              <div class="shangpin_middletitle">{{shangpin_type.TypeInfo[item].Name}}:</div>
              <div class="shangpin_middletype">
                <button
                  v-for="(one,index) in shangpin_type.InfoList[item]"
                  :key="index"
                  @click="select(one.Name,item)"
                  :disabled="one.DisFlag"
                  :class="one.Class === 'select'?'select':(one.DisFlag === 'disabled'?'disabled':'')"
                  class="type_box"
                >
                  <img v-if="one.Img" :src="one.Img" alt />
                  <div>{{one.Name}}</div>
                </button>
              </div>
            </div>
          </div>
          <div class="shangpin_num">
            <p>购买数量</p>
            <div>
              <van-stepper integer v-model="value" input-width="20px" button-size="25px" />
            </div>
          </div>
        </div>

        <div class="shangpin_bottom1" @click="jiaru">加入购物车</div>
        <div class="shangpin_bottom2" @click="mai">立即购买</div>
      </div>
    </van-popup>

    <!-- 底部 -->
    <div class="shopping">
      <div class="bg">
        <div class="left">
          <div class="collect">
            <img
              @click="shoucang"
              v-if="!chanpinlist.FavoriteFlag"
              src="../../../assets/images/article_nolike.png"
              alt
            />
            <img @click="del_shoucang" v-else src="../../../assets/images/article_islike.png" alt />
            <span>收藏</span>
          </div>
          <div @click="todianpu()" class="goods">
            <i></i>
            <span>店铺</span>
          </div>
          <div @click="kefu" class="kefu">
            <i></i>
            <span>客服</span>
          </div>
        </div>
        <div class="right">
          <div @click="onBuyCar()" class="cart">
            <span>加入购物车</span>
          </div>
          <div @click="onBuyClicked()" class="shop">
            <span>立即购买</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import {
  Progress,
  Toast,
  Stepper,
  Dialog,
  Swipe,
  SwipeItem,
  ImagePreview
} from "vant";
import videojs from "video.js";
import "videojs-contrib-hls";
export default {
  data() {
    return {
      clickFlag: false,
      activeIndex: 0, //轮播图图片位置
      sum: 0, //所有图片的和
      current: "",
      notype: false, //当分类只有一种,且一种的type为2
      obj: {},
      showfen: false,
      value: "", //步进器
      active_index: -1,
      qingfenlei: "请选择颜色分类尺码:",
      type_itemimg: "",
      shangpin_type: {},
      id: "",
      scid: "",
      chanpinlist: {},
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
    this.GetCommodityDetail(); //获取商品详情
    this.getparams(); //获取规格信息
    window.addEventListener("scroll", this.handleFun);
  },
  updated() {
    //  $(".description")
    //     .find("img")
    //     .css("width", "100%!important");
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleFun);
  },
  methods: {
    onTouchStart(e) {
      // this.clickIndex = 0; // 为了兼容安卓部分情况而加，如果不需要可忽略
      this.clickFlag = false;
    },
    // 用于判断滑动还是点击
    onTouchMove(e) {
      this.clickFlag = true;
    },
    onTouchEnd() {
      if (this.clickFlag) {
        // 滑动
        // console.log('滑动');
      } else {
        // 点击
        console.log("点击");
        //  this.toproduct(name,id)
      }
    },
    datu(img, index) {
      if (this.clickFlag) {
      } else {
        var arr = [];
        arr.push(img);
        // Toast(img)
        ImagePreview({
          showIndex: false,
          images: arr,
          loop: false,
          startPosition: index,
          onClose() {
            // do something
            arr = [];
          }
        });
      }
    },
    onChange2(index) {
      this.activeIndex = index;
    },
    toping(id) {
      //去评价列表
      this.$router.push({
        path: "/product_evaluate",
        query: {
          id: id
        }
      });
    },
    towechat() {
      var dizhi = this.$domain.url + "product_detail?id=" + this.id;
      var name = this.chanpinlist.Name;
      var description = "物美价廉,您值得拥有";
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        // console.log("我是要去安卓");
        // var data={
        //  address:window.location.href,
        //  name:name,
        //  description:description,
        //  type:'wechat'
        // }
        // console.log(dizhi);
        window.android.shareToWechat(dizhi, name, description, "wechat");
        // window.android.shareToWechat(data)
      } else if (isiOS) {
        // console.log("我是要去ios");
        var params = {
          address: dizhi,
          name: name,
          description: description,
          type: "wechat"
        };

        // console.log(params);
        // window.webkit.messageHandlers.shareToWechat.postMessage(window.location.href,name,description,'微信');
        this.$bridge.callhandler("shareToWechat", params, data => {});
      } else {
        console.log("我不是安卓也不是ios,我在哪");
      }
      this.showfen = false;
    },
    tofriend() {
      var dizhi = this.$domain.url + "product_detail?id=" + this.id;
      var name = this.chanpinlist.Name;
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
    iostest() {
      this.$bridge.registerhandler("iostest", (data, responseCallback) => {
        Dialog.alert({
          title: "ios已调用",
          message: data
        }).then(() => {
          // on close
        });
        responseCallback(data);
      });
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
    back() {
      console.log("我是子组件返回");
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        // console.log("我是要去安卓");
        window.android.closePage();
        this.$router.back();
      } else {
        // let url =
        //   "http://test1.merrychange.net/#/product_detail?id=" + this.id;
        // console.log(url);
        // this.$bridge.callhandler("closePage", url, data => {
        //   // 处理返回数据
        // });
        this.$router.back();
      }
    },
    // 立即购买
    mai() {
      request
        .post(this.$api + "/mobile/CheckLoginStatus", {})
        .then(res => {
          if (res.Data.OnlineFlag) {
            // 说明登录
            //登录后判断是否只有一种参数情况
            console.log("已经登录");
            if (this.notype) {
              console.log("只有一种情况");
              var obj = this.chanpinlist;
              window.localStorage.setItem("type", 0);
              obj.Count = this.value;
              obj.SCId = this.shangpin_type.DataList[0].SCID;
              this.$router.push({
                path: "/confirm_order",
                query: {
                  list: JSON.stringify(obj)
                }
              });
            } else {
              var flag = this.ischeck();
              console.log(flag);
              if (flag) {
                var obj = this.chanpinlist;
                window.localStorage.setItem("type", 0);
                obj.Count = this.value;
                obj.SCId = this.getScid();
                console.log(obj);
                this.$router.push({
                  path: "/confirm_order",
                  query: {
                    list: JSON.stringify(obj)
                  }
                });
              } else {
                Toast("请选择商品属性");
              }
            }
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
    // 加入购物车
    jiaru() {
      if (this.notype) {
        console.log("我是一种情况的处理");
        console.log(this.shangpin_type);
        var scid = this.shangpin_type.DataList[0].SCID;
        request
          .post(this.$api + "/mobile/ShoppingCartCreate", {
            ProductId: this.id,
            ProductName: this.chanpinlist.Name,
            ProductType: this.chanpinlist.Type,
            Count: this.value,
            SCId: scid
          })
          .then(res => {
            if (!res.IsSuccess) {
              Toast(res.Message);
            } else {
              Toast("加入购物车成功");
              this.active_buy = false;
            }
          })
          .catch(err => {});
      } else {
        // 多种情况
        var flag = this.ischeck();
        if (flag) {
          var scid = this.getScid();
          request
            .post(this.$api + "/mobile/ShoppingCartCreate", {
              ProductId: this.id,
              ProductName: this.chanpinlist.Name,
              ProductType: this.chanpinlist.Type,
              Count: this.value,
              SCId: this.getScid()
            })
            .then(res => {
              if (!res.IsSuccess) {
                Toast(res.Message);
              } else {
                Toast("加入购物车成功");
                this.active_buy = false;
              }
            })
            .catch(err => {});
        } else {
          Toast("请选择商品属性");
        }
      }
    },
    // 收藏
    shoucang() {
      request
        .post(this.$api + "/mobile/FavoriteAdd", {
          MainId: this.id,
          Type: "Product"
        })
        .then(res => {
          if (res.IsSuccess) {
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
          Type: "Product"
        })
        .then(res => {
          if (res.IsSuccess) {
            this.GetCommodityDetail();
          } else {
            Toast(res.Message);
          }
        })
        .catch(err => {});
    },
    // 选择分类
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
    todianpu() {
      request
        .post(this.$api + "/mobile/CheckLoginStatus", {})
        .then(res => {
          if (res.Data.OnlineFlag) {
            // 说明登录
            console.log(this.chanpinlist);
            if (this.chanpinlist.FType == 1) {
              this.$router.push({
                path: "/otherself",
                query: {
                  id: this.chanpinlist.UserId,
                  ftp: 3
                }
              });
            } else {
              this.$router.push({
                path: "/store_page",
                query: {
                  id: this.chanpinlist.SellerId
                }
              });
            }
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
    qidai() {
      Toast("敬请期待~");
    },
    GetCommodityDetail() {
      request
        .post(this.$api + "/mobile/GetCommodityDetail", {
          Id: this.id,
          Type: "CommodityTypeType"
        })
        .then(res => {
          this.chanpinlist = res.Data;
          this.sum = res.Data.Imgs.length;
          this.type_itemimg = this.chanpinlist.BannerImg;
          console.log(this.chanpinlist.Imgs);
        })
        .catch(err => {});
    },
    // 商品规格相关
    // 获取商品规格,添加属性
    getparams() {
      request
        .post(this.$api + "/mobile/GetCommoditySellInfo", {
          id: this.id
        })
        .then(res => {
          if (res.IsSuccess) {
            // 判断是不是只有一种类型 且类型为2
            console.log(res.Data.TypeList.length);
            for (let a = 0; a < res.Data.TypeList.length; a++) {
              if (res.Data.TypeList.length == 1) {
                // console.log("我是只有一种情况的");
                this.shangpin_type = res.Data;
                var name = res.Data.TypeList[a];
                var obj = new Object();
                for (let i = 0; i < this.shangpin_type.TypeList.length; i++) {
                  obj[this.shangpin_type.TypeList[i]] = "";
                  var arr = this.shangpin_type.InfoList[
                    this.shangpin_type.TypeList[i]
                  ];
                }
                var obj2 = {};
                obj2.Select = obj;
                this.shangpin_type = { ...this.shangpin_type, ...obj2 };
                // console.log(this.shangpin_type);
                if (res.Data.TypeInfo[name].Type == 2) {
                  this.notype = true;
                }
              } else {
                console.log("我是多种情况");
                this.shangpin_type = res.Data;
                var obj = new Object();
                for (let i = 0; i < this.shangpin_type.TypeList.length; i++) {
                  obj[this.shangpin_type.TypeList[i]] = "";
                  var arr = this.shangpin_type.InfoList[
                    this.shangpin_type.TypeList[i]
                  ];
                }
                var obj2 = {};
                obj2.Select = obj;
                this.shangpin_type = { ...this.shangpin_type, ...obj2 };
                // console.log(this.shangpin_type);
              }
            }
          } else {
            Toast(res.Message);
          }
        })
        .catch(err => {});
    },
    exitF(list, arr) {
      var filterLenght = 0;
      for (const key in arr) {
        // console.log(key)
        if (arr.hasOwnProperty(key)) {
          // console.log('属性存在++')
          filterLenght++;
        }
      }

      if (filterLenght == 0) {
        return true;
      }
      for (let index = 0; index < list.length; index++) {
        const element = list[index];
        var count = 0;

        for (const key in arr) {
          if (arr.hasOwnProperty(key)) {
            const pro = arr[key];
            if (element[key] == pro && element.StockCount > 0) {
              // console.log("xxx", element[key]);
              // &&element[key].StockCount>0
              count++;
            }
            if (count >= filterLenght) {
              return true;
            }
          }
        }
      }
      return false;
    },
    updateSelectList() {
      this.shangpin_type.TypeList.forEach(v => {
        // console.log(v);
        for (
          let index = 0;
          index < this.shangpin_type.InfoList[v].length;
          index++
        ) {
          const elx = this.shangpin_type.InfoList[v][index];
          var hasV = {};
          for (const key in this.shangpin_type.Select) {
            if (this.shangpin_type.Select.hasOwnProperty(key)) {
              const element = this.shangpin_type.Select[key];
              if (!element) {
              } else {
                hasV[key] = element;
              }
            }
          }

          hasV[v] = elx.Name;
          var flag = this.exitF(this.shangpin_type.DataList, hasV);
          // console.log(elx, flag);
          if (flag) {
            elx.DisFlag = null;
          } else {
            elx.DisFlag = "disabled";
            elx.Class = "disabled";
          }
        }
      });
    },
    ischeck() {
      console.log("check对象", this.shangpin_type.InfoList); //对象
      var ischeck = [];
      for (let q = 0; q < this.shangpin_type.TypeList.length; q++) {
        var typelist = this.shangpin_type.InfoList[
          this.shangpin_type.TypeList[q]
        ];
        for (let e = 0; e < typelist.length; e++) {
          if (typelist[e].Class == "select") {
            ischeck.push(typelist[e].Name);
          }
        }
      }
      // console.log("选的参数", ischeck);
      // 此处把价格传过去
      if (ischeck.length == this.shangpin_type.TypeList.length) {
        console.log("我先在才显示");
        console.log("现在价钱", this.getPrice());
        this.chanpinlist.Price = this.getPrice();
        // 此处传
      } else {
        console.log("还没选完");
      }
      this.qingfenlei = ischeck.toString();
      if (ischeck.length < this.shangpin_type.TypeList.length) {
        return false;
      } else {
        return true;
      }
    },
    // 选中参数
    select(v, type) {
      // this.qingfenlei='已选'
      // console.log("点击了"); //灰色
      // 此处循环判断是否要点击显示对应的图片
      for (let m = 0; m < this.shangpin_type.InfoList[type].length; m++) {
        if (
          this.shangpin_type.TypeInfo[type].Type == 1 &&
          this.shangpin_type.InfoList[type][m].Name == v
        ) {
          // console.log(this.shangpin_type.InfoList[type][m].Img); //选中的img
          if (this.shangpin_type.InfoList[type][m].Img != "") {
            this.type_itemimg = this.shangpin_type.InfoList[type][m].Img;
          } else {
            this.type_itemimg = this.chanpinlist.BannerImg;
          }
        }
      }
      var activeList = this.shangpin_type.InfoList[type];
      for (let i = 0; i < activeList.length; i++) {
        var element = activeList[i];
        // console.log(element);
        if (element.Name == v) {
          if (element.Class == "select") {
            this.shangpin_type.Select[type] = "";
            this.$set(element, "Class", "");
          } else {
            this.shangpin_type.Select[type] = element.Name;
            this.$set(element, "Class", "select");
          }
        } else {
          this.$set(element, "Class", "");
        }
      }
      this.updateSelectList();
      this.ischeck();
      this.getScid(); //取出scid方法
      // console.log(scid_item)
    },
    getScid() {
      var num = this.shangpin_type.TypeList.length;
      var i = 0;
      for (let a = 0; a < this.shangpin_type.DataList.length; a++) {
        const item = this.shangpin_type.DataList[a];
        for (let j = 0; j < this.shangpin_type.TypeList.length; j++) {
          const element = this.shangpin_type.TypeList[j];
          if (this.shangpin_type.Select[element] == item[element]) {
            i++;
          }
        }
        if (i >= num) {
          return item.SCID;
        } else {
          i = 0;
        }
      }
    },
    getPrice() {
      var num = this.shangpin_type.TypeList.length;
      var i = 0;
      for (let a = 0; a < this.shangpin_type.DataList.length; a++) {
        const item = this.shangpin_type.DataList[a];
        for (let j = 0; j < this.shangpin_type.TypeList.length; j++) {
          const element = this.shangpin_type.TypeList[j];
          if (this.shangpin_type.Select[element] == item[element]) {
            i++;
          }
        }
        if (i >= num) {
          return item.Price;
        } else {
          i = 0;
        }
      }
    },
    onBuyClicked() {
      this.updateSelectList();
      this.active_buy = true; //弹窗出现
      this.qingfenlei = "";
    },
    onBuyCar() {
      this.updateSelectList();
      this.active_buy = true;
    },
    onAddCartClicked() {
      Toast("添加购物单车");
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
      if (this.offsetTop != 0) {
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
.description {
  width: 100%;
  padding-bottom: 80 / @base;
}
.explain {
  width: 100%;
  padding: 0 30 / @base 130 / @base 30 / @base;

  .explain_top {
    font-size: 28 / @base;
    color: #666666;
    font-weight: bold;
    margin-bottom: 27 / @base;
  }
  .explain_item {
    position: relative;
    padding-left: 14 / @base;
    .line {
      position: absolute;
      left: 0;
      top: 8 / @base;
      width: 4 / @base;
      height: 15 / @base;
      background: #63147b;
      border-radius: 1px;
    }
    .explain_item_title {
      font-size: 22 / @base;
      font-weight: bold;
      color: #313131;
    }
    .explain_item_content {
      font-size: 22 / @base;
      color: #999999;
      margin-top: 19 / @base;
      margin-bottom: 30 / @base;
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
      width: 80 / @base;
      height: 80 / @base;
      line-height: 80 / @base;
      font-size: 25px;
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
  height: 680 / @base;
  overflow: hidden;
  /deep/.van-swipe {
    width: 100%;
    height: 680 / @base;
  }
  /deep/ .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }
  img {
    width: 100%;
    // height: 680 / @base;
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
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      font-size: 30 / @base;
    }
    .head-store-rightrenqi {
      border: 1px solid white;
      opacity: 0.8;
      width: 160 / @base;
      height: 40 / @base;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1; //行数
      -webkit-box-orient: vertical;
      line-height: 40 / @base;
      background: #b694e8;
      margin-top: 5 / @base;
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

// 底部
.shopping {
  width: 100%;
  position: fixed;
  bottom: 0;
  .bg {
    width: 100%;
    display: flex;
    .left {
      // float: left;
      display: flex;
      color: #a4a4a4;
      width: 50%;
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
      // float: left;
      width: 50%;
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
  padding-top: 40 / @base;
  position: relative;
  width: 100%;
  height: 100%;

  .baozhang_box_title {
    padding: 0 40 / @base;
    width: 100%;
    height: 90 / @base;
    line-height: 90 / @base;
    font-size: 35 / @base;
    i {
      color: #b694e8;
      margin-right: 10 / @base;
    }
  }
  .baozhang_box_content {
    padding: 0 80 / @base;
    width: 100%;
    height: 120 / @base;
    line-height: 60 / @base;
    font-size: 25 / @base;
    color: #6a6a6a;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; //行数
    -webkit-box-orient: vertical;
  }
  .baozhang_box_bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 90 / @base;
    line-height: 90 / @base;
    color: white;
    text-align: center;
    background: #b694e8;
    font-size: 32 / @base;
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
      min-width: 200 / @base;
      max-width: 200 / @base;
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
        // height: 52 / @base;
        line-height: 32 / @base;
        font-stretch: normal;
        font-weight: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; //行数
        -webkit-box-orient: vertical;
      }
    }
  }
  .shangpin_middlebox {
    overflow: scroll;
    width: 690 / @base;
    // height: 400 / @base; //347
    .shangpin_middle {
      border-bottom: 1px solid #d2d2d2;
      width: 690 / @base;
      // height: 347 / @base;
      // background:red;
      margin-top: 30 / @base;
      padding-left: 20 / @base;
      padding-bottom: 20 / @base;
      .shangpin_middletitle {
        font-size: 28 / @base;
        line-height: 38 / @base;
        color: #333333;
        font-weight: normal;
        margin-bottom: 15 / @base;
      }
      .shangpin_middletype {
        width: 100%;
        // height: 250 / @base;
        display: flex;
        flex-wrap: wrap;
        .select {
          color: #9a5dfd !important;
          border: 1px solid #9a5dfd !important;
          background: #f2eaff !important;
        }
        .disabled {
          color: #999 !important;
          background: #eeeeee !important;
        }
        .type_box {
          margin-right: 15 / @base;
          margin-bottom: 15 / @base;

          border: 1px solid #fff;
          display: flex;
          height: 70 / @base;
          // background: #eeeeee;
          // color: #9a5dfd !important;
          // border: 1px solid #9a5dfd !important;
          // background: #f2eaff !important;
          background: #eeeeee;
          border-radius: 10 / @base;
          img {
            width: 51 / @base;
            height: 51 / @base;
            margin: 10 / @base;
            background-size: 100% 100%;
          }
          div {
            padding-right: 10 / @base;
            padding-left: 10 / @base;

            min-width: 50 / @base;
            // min-width: 300/@base;
            height: 70 / @base;
            font-size: 24 / @base;
            font-weight: normal;
            line-height: 70 / @base;
            text-align: center;
            //  height: 51/@base;
          }
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
}
</style>