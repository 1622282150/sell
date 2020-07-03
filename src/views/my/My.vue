<template>
  <div>
    <div class="containerr">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <header>
          <div class="avatar">
            <img
              @click="newpage('setting')"
              class="shezhi"
              src="../../assets/images/my_shezhi.png"
              alt
            />
            <div class="aa">
              <!-- <input  type="file" accept="image/*" capture="camera" @change="handlerUpload($event)" /> -->
              <img
                class="imgg"
                @click="newpage('edit')"
                v-if="userinfo.UserPhoto"
                :src="userinfo.UserPhoto"
                alt
              />
              <img
                class="imgg"
                @click="newpage('edit')"
                v-else
                src="../../assets/images/userphoto.png"
                alt
              />
              <img
                class="img2"
                v-show="userinfo.PlusVShow === '美妆达人认证'"
                src="../../assets/images/美妆达人V拷贝.png"
                alt
              />
              <img
                class="img2"
                v-show="userinfo.PlusVShow === '优质内容作者认证'"
                src="../../assets/images/创作者V拷贝.png"
                alt
              />
              <img
                class="img2"
                v-show="userinfo.PlusVShow === '美妆专家认证'"
                src="../../assets/images/专家认证V.png"
                alt
              />
            </div>

            <div class="des">
              <div class="name">
                <span>{{userinfo.Username|usernameLength}}</span>
                <img
                @click="toother('task_center')"
                  v-show="userinfo.PointsLevel===1"
                  src="../../assets/images/vip_vv1.png"
                  alt
                  class="level"
                />
                <img
                @click="toother('task_center')"
                  v-show="userinfo.PointsLevel===2"
                  src="../../assets/images/vip_vv2.png"
                  alt
                  class="level"
                />
                <img
                @click="toother('task_center')"
                  v-show="userinfo.PointsLevel===3"
                  src="../../assets/images/vip_vv3.png"
                  alt
                  class="level"
                />
                <img
                @click="toother('task_center')"
                  v-show="userinfo.PointsLevel===4"
                  src="../../assets/images/vip_vv4.png"
                  alt
                  class="level"
                />
                <img
                @click="toother('task_center')"
                  v-show="userinfo.PointsLevel===5"
                  src="../../assets/images/vip_vv5.png"
                  alt
                  class="level"
                />
                <img
                @click="toother('task_center')"
                  v-show="userinfo.PointsLevel===6"
                  src="../../assets/images/vip_vv6.png"
                  alt
                  class="level"
                />
                <img
                @click="toother('task_center')"
                  v-show="userinfo.PointsLevel===7"
                  src="../../assets/images/vip_vv7.png"
                  alt
                  class="level"
                />
                
              </div>
              <p>魅号:{{userinfo.UserAccount}}</p>
              <div class="edit clearfix">
                <div class="left fl">{{userinfo.PersonalitySignature}}</div>
                <div class="right fr">
                  <span @click="newpage('edit')">编辑资料</span>
                  <!-- <span>编辑资料</span> -->
                </div>
              </div>
            </div>
          </div>

          <nav>
            <ul>
              <!-- <li v-for="(item, index) in 5" :key="index">
            <p>1</p>
            <p>收藏</p>
              </li>-->
              <li @click="newpage('my_fabu')">
                <p>{{userinfo.MyArticleCount}}</p>
                <p>发布</p>
              </li>
              <li @click="newpage('my_shou')">
                <p>{{userinfo.FavoriteCount}}</p>
                <p>收藏</p>
              </li>
              <li @click="newpage('collect')">
                <p>{{userinfo.ForMyLikedCount}}</p>
                <p>获赞</p>
              </li>
              <li @click="newpage('my_guan')">
                <p>{{userinfo.AttentionCount}}</p>
                <p>关注</p>
              </li>
              <li @click="newpage('my_fans')">
                <p>{{userinfo.FansCount}}</p>
                <p>粉丝</p>
              </li>
            </ul>
          </nav>
          <div class="super">
            <div class="member">
              <span class="zhuanshu">魅卡专属</span>
              <span class="num">当前魅力值 :&nbsp; {{userinfo.Points}}</span>
            </div>
            <div class="duihuan">
              <span>魅力值免费换 &nbsp;享6大特权</span>
            </div>

            <div class="btn" @click="newpage('mei_card')">点击查看</div>
          </div>
        </header>
        <div class="topic" @click="newpage('skintest')">
          <p class="my_p">我的测肤记录</p>
          <img src="../../assets/images/recode_banner.png" alt />
          <div class="rili">
            <p>{{recodeNum}}</p>
          </div>
        </div>
        <div class="dingdan">
          <div class="top clearfix">
            <span class="fl">我的订单</span>
            <span class="all fr" @click="toorder(-1)">查看全部订单</span>
          </div>
          <ul>
            <li @click="toorder(index)" v-for="(item, index) in orderList" :key="index">
              <!-- <div class="num" v-if="true">0</div> -->
              <img :src="item.src" alt />
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
        <div class="footnav">
          <ul>
            <li v-for="(item,index) in iconList" :key="index" @click="toother(item.url)">
              <img :src="item.src" alt />
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
        <!-- 橱窗部分 -->
        <div class="hui" v-show="ischuchuang"></div>
        <div class="window" v-show="ischuchuang">
          <h3>商品橱窗</h3>
          <ul>
            <li @click="tochanpin(item.CommodityId)" v-for="(item,index) in chuchuang" :key="index">
              <div class="pic">
                <img :src="item.BannerImg" alt />
              </div>
              <div class="des">
                <p>{{item.Name}}</p>
              </div>
              <div class="price">¥{{item.Price}}</div>
            </li>
          </ul>
        </div>
      </van-pull-refresh>
    </div>
    <!-- 弹出层分享 -->
    <van-action-sheet v-model="showfen">
      <div class="towechat">
        <div class="towechat_title">分享到</div>
        <div class="towechat_box">
          <div @click="towechat" class="towechat_item">
            <img src="../../assets/images/fenxiang_wechat.png" alt />
            <p>微信</p>
          </div>
          <div @click="tofriend" class="towechat_item">
            <img src="../../assets/images/fenxiang_pengyouquan.png" alt />
            <p>朋友圈</p>
          </div>
        </div>
      </div>
    </van-action-sheet>
    <grade></grade>
  </div>
</template>     
<script>
import grade from '@/components/GradePopup'
import { Dialog, Toast } from "vant";
import Tabbar from "../../components/Tabbar";
import request from "@/utils/request";
export default {
  data() {
    return {
      ischuchuang: "",
      chuchuang: [],
      showfen: false,
      isLoading: false,
      recodeNum: "",
      // aspxauth: "",
      userinfo: {},
      orderList: [
        {
          name: "待付款",
          src: require("../../assets/images/my_daifukuan.png")
        },
        { name: "待发货", src: require("../../assets/images/my_yifukuan.png") },
        { name: "待收货", src: require("../../assets/images/my_yifahuo.png") },
        { name: "待使用", src: require("../../assets/images/daishiyong.png") },
        {
          name: "待评价",
          src: require("../../assets/images/my_daipingjia.png")
        },
        { name: "退款", src: require("../../assets/images/my_tuikuan.png") }
      ],
      iconList: [
        {
          name: "购物车",
          src: require("../../assets/images/my_gouwuche.png"),
          url: "shopping_car"
        },
        {
          name: "卡券",
          src: require("../../assets/images/my_ka.png"),
          url: "a"
        },
        {
          name: "收藏好货",
          src: require("../../assets/images/my_shoucang.png"),
          url: "collect_good"
        },
        {
          name: "关注店铺",
          src: require("../../assets/images/my_guanzhu.png"),
          url: "attention_shop"
        },
        {
          name: "钱包",
          src: require("../../assets/images/my_qianbao.png"),
          url: "a"
        },
        {
          name: "通知",
          src: require("../../assets/images/my_tongzhi.png"),
          url: "inform"
        },
        // { name: "足迹", src: require("../../assets/images/my_zuji.png") },
        {
          name: "分享好友",
          src: require("../../assets/images/my_fenxiang.png"),
          url: "l"
        },
        // { name: "会员", src: require("../../assets/images/my_huiyuan.png") },
        {
          name: "保障",
          src: require("../../assets/images/my_baozhang.png"),
          url: "a"
        },
        {
          name: "任务中心",
          src: require("../../assets/images/my_renwuzhongxin.png"),
          url:"task_center"
        },
        {
          name: "设置",
          src: require("../../assets/images/my_shezhi.png"),
          url: "setting"
        },
        {
          name: "分销中心",
          src: require("../../assets/images/my_fenxiao.png"),
          url: "fenxiao_center"
        }
      ]
    };
  },
  components: {
    Tabbar,
    grade
  },
  // created() {
  //   var u = navigator.userAgent;
  //   var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  //   var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
  //   if (isiOS) {
  //     console.log("我是要去ios");
  //     this.$bridge.callhandler("getToken","", response => {
  //       // 处理返回数据
  //       let token = JSON.stringify(response);
  //       window.localStorage.setItem("token", JSON.parse(token));
  //     });
  //   } else {
  //     console.log("我不是ios");
  //   }
  //   setTimeout(() => {
  //      this.getuserinfo();
  //      this.GetUserSkinReportShortList();
  //   },100);
  // },
  created() {
    this.gettoken()
  },

  mounted() {
    window.test = this.test;
     this.getuserinfo();
     this.GetUserSkinReportShortList();
    // new Promise(function(resolve, reject) {
    //   var u = navigator.userAgent;
    //   var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    //   var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
    //   if (isiOS) {
    //     console.log("我是要去ios");
    //     this.$bridge.callhandler("getToken", "", response => {
    //       // 处理返回数据
    //       let token = JSON.stringify(response);
    //       window.localStorage.setItem("token", JSON.parse(token));
    //       resolve();
          
    //     });
    //   } else {
    //     resolve();
    //     console.log("我不是ios");
    //   }
    // })
    //   .then(() => {
    //     this.$nextTick(()=>{
    //       this.getuserinfo();
    //       this.GetUserSkinReportShortList();
    //     })
        
    //   })
    //   .catch(() => {
    //     this.getuserinfo();
    //     this.GetUserSkinReportShortList();
    //   });
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.getuserinfo();
        this.GetUserSkinReportShortList();
        this.isLoading = false;
      }, 500);
    },

    // // 获取token
     gettoken() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        console.log("我是安卓");
        let result = window.android.getToken("");
        // Dialog.alert({
        //   message: "安卓返回来的token:" + result
        // }).then(() => {
        //   // on close
        // });
        window.localStorage.setItem("token", result);
      } else if (isiOS) {
        console.log("我是要去ios");
        this.$bridge.callhandler("getToken", "", response => {
          // 处理返回数据
          let token = JSON.stringify(response);
          window.localStorage.setItem("token", JSON.parse(token));
          // Dialog.alert({
          //   message: "ios返回来的token:" + JSON.parse(token)+'本地存的token:'+window.localStorage.getItem('token')
          // }).then(() => {
          //   // on close

          // });
        });
      } else {
        console.log("我不是安卓也不是ios,我在哪");
      }
    },
    test(params) {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        console.log("我是安卓");
        window.localStorage.setItem("token", params);
        this.getuserinfo();
        this.GetUserSkinReportShortList();
      } else {
        let token = JSON.stringify(params);
        window.localStorage.setItem("token", JSON.parse(token));
        this.getuserinfo();
        this.GetUserSkinReportShortList();
      }
    },
    towechat() {
      var dizhi = "http://html.kjmrmqj.com/";
      var name = "分享一个能让你变美的APP,叫[魅千金]";
      var description = "随时随地掌握皮肤,妆容状态,还有改善建议,让变美丽更省力";
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
          // 处理返回数据
          //   Dialog.alert({
          //   message: "ios收到通知后才会触发的" + JSON.stringify(data)
          // }).then(() => {
          //   // on close
          // });
        });
      } else {
        console.log("我不是安卓也不是ios,我在哪");
      }
      this.showfen = false;
    },
    tofriend() {
      var dizhi = "http://html.kjmrmqj.com/";
      var name = "分享一个能让你变美的APP,叫[魅千金]";
      var description = "随时随地掌握皮肤,妆容状态,还有改善建议,让变美丽更省力";
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
    // 去设置
    newpage(link) {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        console.log("我是要去安卓");
        let url = this.$domain.url+link;
        console.log(url);
        window.android.openNewPage(url);
        // this.$router.push({ path: "/" + link })/;
      } else if (isiOS) {
        console.log("我是要去ios");
        let url =this.$domain.url+ link;
        console.log(url);
        this.$bridge.callhandler("openNewPage", url, data => {
          // 处理返回数据
        });
        this.$router.push({ path: "/" + link });
        //  window.location.href
        //  window.location.href='mqjapp://home'
      } else {
        console.log("我不是安卓也不是ios,我在哪");
      }
    },
    // 去订单
    toorder(index) {
      console.log(index);
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        console.log("我是要去安卓");
        let url = this.$domain.url+"order?index=" + index;
        console.log(url);
        window.android.openNewPage(url);
        //  this.$router.push({
        //   path: "/order",
        //   query: {
        //     index: index
        //   }
        // });
      } else if (isiOS) {
        console.log("我是要去ios");
        let url = this.$domain.url+"order?index=" + index;
        console.log(url);
        this.$bridge.callhandler("openNewPage", url, data => {
          // 处理返回数据
        });
        this.$router.push({
          path: "/order",
          query: {
            index: index
          }
        });
        //  window.location.href
        //  window.location.href='mqjapp://home'
      } else {
        console.log("我不是安卓也不是ios,我在哪");
      }
    },
    // 获取复制记录数量
    GetUserSkinReportShortList() {
      request
        .post(this.$api + "/mobile/GetUserSkinReportShortList", {
          Page: 1,
          Rows: 2,
          Order: "desc",
          Sort: "CreateDate"
        })
        .then(res => {
          this.recodeNum = res.Data.TotalCount;
        })
        .catch(err => {});
    },
    // // 去编辑
    // edit(){
    //    var u = navigator.userAgent;
    //   var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    //   var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
    //   if (isAndroid) {
    //     console.log("我是要去安卓");
    //     // window.android.goToHome()
    //     let url = "http://test1.merrychange.net/#/edit";
    //     console.log(url);
    //     window.android.openNewPage(url);
    //   } else if (isiOS) {
    //     console.log("我是要去ios");
    //     let url = "http://test1.merrychange.net/#/edit"
    //     console.log(url);
    //     this.$bridge.callhandler("openNewPage", url, data => {
    //       // 处理返回数据
    //     });
    //     this.$router.push(
    //        "/edit"
    //     );
    //     //  window.location.href
    //     //  window.location.href='mqjapp://home'
    //   } else {
    //     console.log("我不是安卓也不是ios,我在哪");
    //   }
    // },
    // 商品详情
    tochanpin(id) {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        var url = this.$domain.url+"product_detail?id=" + id;
        console.log(url);
        window.android.openNewPage(url);
        //  this.$router.push({
        //   path:"/product_detail",
        //   query:{
        //     id:id
        //   }
        // });
      } else {
        var url = this.$domain.url+"product_detail?id=" + id;
        this.$bridge.callhandler("openNewPage", url, data => {
          // 处理返回数据
        });
        this.$router.push({
          path: "/product_detail",
          query: {
            id: id
          }
        });
      }
    },

    guanzhu() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        console.log("我是要去安卓");
        // window.android.goToHome()
        var url = this.$domain.url+"my_guan";
        console.log(url);
        window.android.openNewPage(url);
        // this.$router.push("/my_guan");
      } else if (isiOS) {
        console.log("我是要去ios");
        let url = this.$domain.url+"my_guan";
        console.log(url);
        this.$bridge.callhandler("openNewPage", url, data => {
          // 处理返回数据
        });
        this.$router.push("/my_guan");
        //  window.location.href
        //  window.location.href='mqjapp://home'
      } else {
        console.log("我不是安卓也不是ios,我在哪");
      }
    },
    // 去别处
    toother(link) {
      if (link == "a") {
        Toast("敬请期待");
      } else if (link == "l") {
        this.showfen = true;
      } else {
        console.log(link);
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
        if (isAndroid) {
          console.log("我是要去安卓");
          // window.android.goToHome()
          var url = this.$domain.url+ link;
          console.log(url);
          window.android.openNewPage(url);
          // this.$router.push("/" + link);
        } else if (isiOS) {
          console.log("我是要去ios");
          let url = this.$domain.url+ link;
          console.log(url);
          this.$bridge.callhandler("openNewPage", url, data => {
            // 处理返回数据
          });
          this.$router.push("/" + link);
          //  window.location.href
          //  window.location.href='mqjapp://home'
        } else {
          console.log("我不是安卓也不是ios,我在哪");
        }
      }
    },
    // 头像上传放法
    handlerUpload(event) {
      console.log("我在执行上传头像");
      let file = event.target.files[0];
      console.log(file);
      if (file === undefined) {
        Toast("未选择图片");
      } else {
        console.log("选择了");
        let formData = new FormData();
        // let fileName = `${+new Date()}.${fileType}`;
        // let fileName = file.name;
        // formData.append("FileType", "ImageUser");
        // formData.append("FileName", fileName);
        formData.append("file", file);
        let config = {
          headers: { "Content-Type": "multipart/form-data;" }
        };
        request
          .post(this.$api + "/mobile/UploadUserAvatarImg", formData, config)
          .then(res => {
            if (res.IsSuccess) {
              console.log(res.Data);
              setTimeout(() => {
                this.getuserinfo();
              }, 100);
              // this.userinfo.UserPhoto= = "http://test1.merrychange.net" + res.Data.Url;
              // let name = res.Data.Url;
              // var obj = name.lastIndexOf("/");
              // var str = name.substr(obj + 1);
              // console.log(str);
              // request
              //   .post(this.$api + "/mobile/SetUserPhoto", {
              //     PhotoUrl: str
              //   })
              //   .then(res => {
              //     if (res.IsSuccess) {
              //       Toast("设置成功");
              //     }
              //   })
              //   .catch(err => {});
            } else {
              Toast(res.Message);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },

    // 获取个人信息
    getuserinfo() {
      request
        .post(this.$api + "/mobile/GetUserInfo")
        .then(res => {
          window.localStorage.setItem("ShopWindowFlag", res.Data.UserId);
          this.userinfo = res.Data;
          this.ischuchuang = res.Data.ShopWindowFlag;
          console.log(this.ischuchuang);
          // console.log(this.userinfo.length)
          window.localStorage.setItem("account", res.Data.UserAccount);
          this.getShopWindowFlag();
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取橱窗内容
    getShopWindowFlag() {
      request
        .post(this.$api + "/mobile/GetUserShopWindowCommodityInfoList", {
          UserId: window.localStorage.getItem("ShopWindowFlag")
        })
        .then(res => {
          this.chuchuang = res.Data.List;
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
.hui {
  width: 100%;
  height: 15 / @base;
  background: #eeeeee;
}
.containerr {
  width: 100%;
  padding-bottom: 120 / @base;
  // height: 100%;
}
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
header {
  width: 100%;
  height: 400 / @base;
  padding-top: 50 / @base;
  background: url(../../assets/images/vip_bg4.png) center no-repeat;
  background-size: 100% 100%;
  color: #333;
  font-size: 0;
  position: relative;
  .shezhi {
    width: 40 / @base;
    position: absolute;
    top: -30 / @base;
    right: 30 / @base;
  }
  .avatar {
    position: relative;
    padding: 0 40 / @base;

    .aa {
      position: relative;
      display: inline-block;
      width: 100 / @base;
      height: 100 / @base;
      vertical-align: top;

      .imgg {
        width: 100 / @base;
        height: 100 / @base;
        border-radius: 50%;
      }
      .img2 {
        position: absolute;
        right: 0;
        bottom: 0;
        background-size: 100% 100%;
        width: 30 / @base;
        height: 30 / @base;
      }
      input {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 100 / @base;
        height: 100 / @base;
        border-radius: 50%;
        z-index: 100;
      }
    }
    .des {
      width: 545 / @base;
      display: inline-block;
      margin-left: 25 / @base;
      p {
        margin: 2 / @base 0;
        font-size: 20 / @base;
        color: #838383;
      }
      .edit {
        font-size: 24 / @base;
        vertical-align: middle;
        .left {
          width: 370 / @base;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 35 / @base;
        }
        .right {
          position: absolute;
          bottom: 0;
          right: 30 / @base;
          color: #767676;
          width: 117 / @base;
          height: 37 / @base;
          line-height: 35 / @base;
          text-align: center;
          border: 1 / @base solid #767676;
          border-radius: 10 / @base;
        }
      }
      .name {
        span {
          font-size: 32 / @base;
          font-weight: 600;
          vertical-align: middle;
        }
        .level {
          margin-left: 5 / @base;
          width: auto;
          height: 30 / @base;
          display: inline-block;
          vertical-align: middle;
          background-size: 100% 100%;
        }
      }
    }
  }

  nav {
    width: 100%;
    height: 80 / @base;
    font-size: 24 / @base;
    margin-top: 40 / @base;
    ul {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: scroll;
      height: 80 / @base;
      justify-content: space-around;
      li {
        width: 25%;
        height: 80 / @base;
        line-height: 40 / @base;
        text-align: center;
      }
    }
  }
  .super {
    position: absolute;
    bottom: 0;
    left: 40 / @base;

    width: 89%;
    height: 90 / @base;
    padding-left: 30 / @base;
    background: url(../../assets/images/bg6.png) center no-repeat;
    background-size: contain;
    font-size: 24 / @base;
    color: #fff;
    .member {
      position: relative;
      color: #fff;
      height: 50 / @base;
      // line-height: 50 / @base;
      font-size: 0;
      padding-top: 10 / @base;
      .zhuanshu {
        font-size: 30 / @base;
        font-weight: 700;
      }
      .num {
        position: absolute;
        bottom: 0;
        display: inline-block;
        -webkit-transform: scale(0.8);
        margin-left: 70 / @base;
        font-size: 18 / @base;
      }
    }
    .duihuan {
      font-size: 22 / @base;
      font-style: italic;
      color: #ebbef9;
    }
    .btn {
      position: absolute;
      right: 20 / @base;
      top: 50%;
      transform: translateY(-50%);
      width: 211 / @base;
      height: 43 / @base;
      color: #8900c2;
      font-size: 24 / @base;
      font-weight: bold;
      line-height: 43 / @base;
      text-align: center;
      border-radius: 20px;
      background: #ebbaff;
    }
  }
}

.topic {
  position: relative;
  margin-top: 25 / @base;
  padding: 0 39 / @base;
  .my_p {
    position: absolute;
    top: 30 / @base;
    left: 70 / @base;
    font-weight: normal;
    font-size: 37 / @base;
    color: #ffffff;
  }
  img {
    width: 100%;
    height: 120 / @base;
    background-size: 100% 100%;
  }
  .rili {
    z-index: 1;
    position: absolute;
    right: 104 / @base;
    top: 10 / @base;
    background: url(../../assets/images/recode_rili.png) no-repeat;
    background-size: 100% 100%;
    width: 106 / @base;
    height: 101 / @base;
    p {
      font-weight: blod;
      margin-top: 48 / @base;
      font-size: 28 / @base;
      color: #2b5eff;
      text-align: center;
      span {
        font-size: 12 / @base;
      }
    }
  }
  // display: flex;
  // justify-content: space-evenly;
  // .left,
  // .right {
  //   width: 315 / @base;
  //   height: 120 / @base;
  //   padding-left: 30 / @base;
  //   border-radius: 15 / @base 15 / @base 0 0;
  //   color: #333;
  //   font-size: 30 / @base;
  //   font-weight: 700;
  //   line-height: 120 / @base;
  //   text-align: left;
  // }
  // .left {
  //   background: url(../../assets/images/huati.png) center no-repeat;
  //   background-size: 100% 100%;
  // }
  // .right {
  //   background: url(../../assets/images/bg7.png) center no-repeat;
  //   background-size: 100% 100%;
  // }
}

.dingdan {
  padding: 15 / @base 0;
  margin-top: 20 / @base;
  background-color: #eee;
  .top {
    padding: 25 / @base 40 / @base;
    background-color: #fff;
    span {
      font-size: 30 / @base;
      color: #333;
    }
    & .all {
      font-size: 24 / @base;
      color: #727272;
    }
  }
  ul {
    position: relative;
    // width: 100%;
    height: 160 / @base;
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    background-color: #fff;
    padding-bottom: 40 / @base;

    li {
      flex-shrink: 0;
      // float: left;
      position: relative;
      width: 20%;
      height: 120 / @base;
      text-align: center;
      font-size: 24 / @base;
      color: #333;
      .num {
        position: absolute;
        top: -4 / @base;
        left: 86 / @base;
        width: 27 / @base;
        height: 27 / @base;
        text-align: center;
        line-height: 27 / @base;
        background-color: #e60012;
        border-radius: 50%;
        font-size: 16 / @base;
        color: #fff;
      }
      img {
        width: 70 / @base;
        height: 70 / @base;
        margin: 0 auto;
        border-radius: 50%;
        margin-bottom: 15 / @base;
      }
    }
  }
}

.footnav {
  padding-bottom: 55 / @base;
  ul {
    display: flex;
    flex-wrap: wrap;
    // margin-bottom: 15/@base;
    li {
      width: 25%;
      margin-top: 50 / @base;
      text-align: center;
      img {
        width: 40 / @base;
        height: 40 / @base;
        margin: 0 auto;
        // margin-bottom: 15 / @base;
      }
      span {
        font-size: 24 / @base;
      }
    }
  }
}

.line {
  height: 15 / @base;
  background-color: #eee;
}

.window {
  h3 {
    margin-top: 40 / @base;
    padding-left: 5.5%;
    font-size: 36 / @base;
    color: #333;
    font-weight: 600;
  }
  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 26%;
      margin-left: 5.5%;
      margin-top: 30 / @base;
      .pic {
        img {
          width: 200 / @base;
          height: 200 / @base;
          border-radius: 20 / @base;
        }
      }
      .des {
        p {
          margin-top: 15 / @base;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          font-size: 24 / @base;
          color: #333;
          line-height: 40 / @base;
        }
      }
      .price {
        // height: 23 / @base;
        font-size: 30 / @base;
        color: #b695e9;
        font-weight: normal;
        font-stretch: normal;
        line-height: 37 / @base;
        letter-spacing: 0px;
        color: #b695e9;
      }
    }
  }
}
</style>