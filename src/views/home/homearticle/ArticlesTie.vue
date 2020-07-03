<template>
  <div>
    
    <div class="contain">
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
            <div class="towechat_item" @click="jv_guan()">
              <img src="../../../assets/images/fenxiang_jvbao.png" alt />
              <p>举报</p>
            </div>
          </div>
        </div>
      </van-action-sheet>
      <!-- 头部 -->
      <van-action-sheet v-model="showjv_item">
        <div class="jvnei">
          <div class="jvnei_title">举报内容</div>
          <div
            class="jvnei_item"
            @click="tojvnei(item.href)"
            v-for="(item,index) in jvnei"
            :key="index"
          >
            <span>{{item.text}}</span>
            <i class="iconfont icon-youjiantou"></i>
          </div>
        </div>
      </van-action-sheet>
      <header class="head">
        <i @click="goback()" class="iconfont icon-zuojiantou jiantou"></i>
        <i @click="showfen=true" class="iconfont icon-fenxiang2"></i>
      </header>
      <div class="main">
        <!-- banner -->
        <div v-if="showbanner" class="banner2">
          <img :src="articleinfo.ArticleImg" alt />
        </div>
        <div v-else class="banner">
          <!-- <img :src="articleinfo.ArticleImg" alt /> -->
          <!-- Lubotu -->
          <van-swipe indicator-color="#B695E9">
            <van-swipe-item v-for="(item,index) in AttachList" :key="index">
              <img :src="'http://test1.merrychange.net/'+item.Url" alt />
            </van-swipe-item>
          </van-swipe>
        </div>
        <!-- comment -->

        <div class="comment">
          <div class="bd">
            <div class="top">
              <h2>{{articleinfo.ArticleTitle}}</h2>
            </div>

            <div class="face">
              <div class="pic">
                <div class="left">
                  <img
                    @click="otherself"
                    v-if="articleinfo.UserAvatar"
                    :src="articleinfo.UserAvatar"
                    alt
                  />
                  <img
                    @click="otherself"
                    v-else
                    src="../../../assets/images/article_touxiang.jpg"
                    alt
                  />
                  <!-- <span class="lefttop">{{articleinfo.ArticleAuthor}}</span> -->
                  <span class="lefttop">{{articleinfo.UserName|usernameLength}}</span>
                  <span class="leftmiddle">{{articleinfo.ArticleCreateDate| dateFormat}}</span>
                  <span class="leftbottom">
                    <i class="iconfont icon-yanjing"></i>
                    {{articleinfo.ClickCount}}
                  </span>
                </div>
                <div v-show="isguan==0" @click="guanzhu" class="right">
                  <span>关注</span>
                </div>
                <div v-show="isguan==1" @click="del_guanzhu" class="right1">
                  <span>已关注</span>
                </div>
              </div>
              <!-- <p>关注微信公众号小糊涂 , &nbsp;一起来美白</p> -->
              <div class="des">
                <!-- <p v-html="articleinfo.ArticleContent"></p> -->
                <div v-html="articleinfo.ArticleContent"></div>
              </div>
            </div>
          </div>

          <!-- <div class="icon">
        <div class="left">
          <img src="../../../assets/images/article_aixin.png" alt />
        </div>
        <div class="right">
          <img src="../../../assets/article_shou.png" alt />{{articleinfo.ClickCount}}
          <img src="../../../assets/images/article_xiaoxi.png" alt /> 200
        </div>
          </div>-->
        </div>

        <!-- 评论模块 -->
        <div class="quanping" id="jump">
          <h3>全部{{allnum}}条评论</h3>
          <div class="firstping" v-for="(item,index) in pinglunlist" :key="index">
            <div class="title">
              <img v-if="item.UserAvatar" class="touimg" :src="item.UserAvatar" alt />
              <img v-else class="touimg" src="../../../assets/images/article_touxiang.jpg" alt />
              <span class="firstauther">{{item.UserName|usernameLength}}</span>
              <span class="firsttime">{{item.CreateDate}}</span>
              <!-- <i class="iconfont icon-aixin" @click="zanone(item.Id)"></i> -->
              <img
                v-if="item.IsLiked"
                class="oneimg"
                src="../../../assets/images/article_islike.png"
                @click="nozanone(item.Id,index)"
                alt
              />
              <img
                v-else
                class="oneimg"
                src="../../../assets/images/article_nolike.png"
                @click="zanone(item.Id,index)"
                alt
              />
              <span class="firstzan">{{item.LikedNum}}</span>
            </div>
            <p
              class="firstmain"
              @click="dianping(item.Id,item.UserName,item.MainUserId,item.Content,index)"
            >{{item.Content | titleLength}}</p>
            <div v-show="item.IsMy" class="firstshan">
              <span @click="shanping(item.Id)">
                <i class="iconfont icon-iconfontshanchu3"></i>删除
              </span>
            </div>
            <!-- 第二个评论 -->
            <div
              v-show="item.List"
              class="secondping"
              v-for="(i,indextwo) in item.List.slice(0,1)"
              :key="indextwo"
            >
              <div class="title">
                <img v-if="i.UserAvatar" class="touimg" :src="i.UserAvatar" alt />
                <img v-else class="touimg" src="../../../assets/images/article_touxiang.jpg" alt />
                <span class="secondauther">{{i.UserName|usernameLength}}</span>
                <span class="secondtime">{{i.CreateDate}}</span>
                <img
                  v-if="i.IsLiked"
                  class="oneimg"
                  src="../../../assets/images/article_islike.png"
                  @click="nozanson(i.Id,index)"
                  alt
                />
                <img
                  v-else
                  class="oneimg"
                  src="../../../assets/images/article_nolike.png"
                  @click="zanson(i.Id,index)"
                  alt
                />
                <span class="secondzan">{{i.LikedNum}}</span>
              </div>
              <p class="secondmain">{{i.Content}}</p>
              <div v-show="i.IsMy" class="firstshan">
                <span @click="shanping(i.Id)">
                  <i class="iconfont icon-iconfontshanchu3"></i>删除
                </span>
              </div>
              <p
                v-if="item.List.length > 1"
                class="qiyu"
                @click="zhankai(item)"
                ref="qqq"
                style="display:block;"
              >展开全部{{item.List.length}}条回复</p>
            </div>
          </div>
        </div>
      </div>
      <div style="width:100%;height:50px"></div>
      <!-- <div v-show="articleinfo.Rcount==0" style="width:100%;height:30px;"></div> -->
      <!-- 展开回复举报蒙层模块 -->
      <van-overlay style="z-index:11 !important" :show="showjvbao" @click="showjvbao = false"></van-overlay>
      <div style="z-index:12" v-show="showjvbao" class="jvbaokuangone">
        <div class="jvbaoball">{{jvbaotitle | titleLength}}</div>
        <div
          class="jvbaoball"
          @click="xuanhuifu"
          style="color:#82A9D3;border-top:1px solid #e6e6e6"
        >回复</div>
        <div class="jvbaoball" @click="pingjv" style="color:#E14A65;border-top:1px solid #e6e6e6">举报</div>
      </div>
      <div v-show="showjvbao" style="z-index:12" class="jvbaokuangtwo" @click="showjvbao=false">取消</div>

      <!-- 展开剩余回复蒙层模块 -->
      <van-popup
        v-model="showgengduo"
        :closeable="true"
        position="bottom"
        :style="{ height: '75%' }"
      >
        <div class="gengtop">
          <div class="gengtitle">
            <img v-if="showgenglist.UserAvatar" :src="showgenglist.UserAvatar" alt />
            <img v-else src="../../../assets/images/article_touxiang.jpg" alt />

            <span class="gengfirst">{{showgenglist.UserName|usernameLength}}</span>
            <span class="gengtwo">{{showgenglist.CreateDate}}</span>
            <!-- <i class="iconfont icon-close" @click="showgengduo=false"></i> -->
          </div>
          <p>{{showgenglist.Content}}</p>
        </div>
        <div class="gengmiddle">
          <div class="middleping" v-for="(item,index) in showgenglist.List" :key="index">
            <div class="middletitle">
              <img v-if="item.UserAvatar" class="middletitle_tou" :src="item.UserAvatar" alt />
              <img
                v-else
                class="middletitle_tou"
                src="../../../assets/images/article_touxiang.jpg"
                alt
              />
              <span class="middleauther">{{item.UserName|usernameLength}}</span>
              <span class="middletime">{{item.CreateDate}}</span>
              <img
                v-if="item.IsLiked"
                class="oneimg"
                src="../../../assets/images/article_islike.png"
                @click="nozantwo(item.Id,index)"
                alt
              />
              <img
                v-else
                class="oneimg"
                src="../../../assets/images/article_nolike.png"
                @click="zantwo(item.Id,index)"
                alt
              />
              <span class="middlezan">{{item.LikedNum}}</span>
            </div>
            <p class="middlemain">{{item.Content}}</p>
            <div v-show="item.IsMy" class="firstshan">
              <span @click="shanping2(item.Id)">
                <i class="iconfont icon-iconfontshanchu3"></i>删除
              </span>
            </div>
          </div>
        </div>
        <div class="gengbottom">
          <van-field
            style="background:#eeeeee;border-radius:20px;"
            size="large"
            v-model="messagegeng"
            type="textarea"
            placeholder="  说点什么.."
            rows="1"
            :autosize="{ maxHeight: 100}"
          />
          <span @click="onsubmit" class="fasong">发送</span>
        </div>
      </van-popup>

      <!-- 底部模块 -->
      <div v-if="showb" class="bottom">
        <van-field
          :autofocus="true"
          ref="certy"
          id="cer"
          v-model="message"
          v-on:input="inputFunc"
          type="textarea"
          rows="1"
          :autosize="{ maxHeight: 100}"
        />

        <span v-show="ismain" @click="pinglunmain" class="fasong">发送</span>
        <span v-show="!ismain" @click="pinglunother" class="fasong">发送</span>
      </div>
      <div v-else class="bottom0">
        <div class="bottom_bi" @click="chulai">
          <i class="iconfont icon-wenjuicon"></i>
          <span>我来说两句...</span>
        </div>
        <img
          v-if="articleinfo.IsLiked===1"
          @click="nozanmain"
          class="bottomone"
          src="../../../assets/images/article_islike.png"
          alt
        />
        <img
          v-else
          id="bbtn"
          @click="zanmain"
          class="bottomone"
          src="../../../assets/images/article_nolike2.png"
          alt
        />
        <span
          :class="articleinfo.IsLiked==1?'activefont':''"
          class="onehou"
        >{{articleinfo.LikedCount}}</span>
        <img
          v-if="!articleinfo.FavoriteFlag"
          ref="zan1"
          style="color:'#e6e6e6'"
          class="bottomtwo"
          src="../../../assets/images/weishoucang2.png"
          alt
          @click="toshoucang"
        />
        <img
          v-else
          ref="zan1"
          style="color:'#e6e6e6'"
          class="bottomtwo"
          src="../../../assets/images/yishoucang.png"
          alt
          @click="del_shoucang"
        />
        <span
          class="twohou"
          :class="articleinfo.FavoriteFlag?'activefont':''"
        >{{articleinfo.FavoriteCount}}</span>
        <img
          class="bottomthree"
          src="../../../assets/images/article_xiaoxi2.png"
          alt
          @click="tiaoa"
        />
        <span class="threehou">{{allnum}}</span>
      </div>

      <!-- 输入@选择好友的弹出层 -->
      <van-popup v-model="showhaoyou" position="top" :style="{height:'100%'}">
        <div class="haoyou_header">
          <span>关闭</span>
          @我的关注
        </div>
        <van-index-bar>
          <van-index-anchor index="A" />

          <van-index-anchor index="B" />
        </van-index-bar>
      </van-popup>
      <van-overlay style="z-index:11" :show="showzhe" @click="zhezhao" />
    </div>
    
  </div>
</template>

<script>
import { Dialog, Swipe, SwipeItem, Skeleton } from "vant";
import request from "@/utils/request";
/*eslint-disable*/
import {
  Field,
  Cell,
  CellGroup,
  Toast,
  Popup,
  IndexBar,
  IndexAnchor
} from "vant";
export default {
  data() {
    return {
      jvnei: [], //获取举报内容
      showjv_item: false,
      ismain: true, //是否是评论文章
      showzhe: false, //评论显示遮罩层
      isguan: "", //关注了
      showbanner: false, //展示轮播图或者banner
      AttachList: [], //轮播图
      showfen: false, //分享弹框
      showgenglist: [],
      showgengduo: false,
      showjvbao: false,
      jvbaotitle: "",
      page: 1,
      inputCodefocus: false,
      holder: "",
      ArticleAuthor: "",
      message: "",
      messagegeng: "",
      showb: false,
      que: false,
      allnum: "",
      articleid: "",
      mainuserid: 0,
      parentid: 0,
      articleinfo: [],
      pinglunlist: [],
      islikemain: false,
      gengid: "",
      gengmainuserid: "",
      gengparentid: "",
      //  选择好友部分
      showhaoyou: false
    };
  },
  created() {
    this.get_jvnei();
    this.articleid = this.$route.query.id;
    this.getdetail();
  },
  mounted() {
    window.test = this.test;
    this.gettoken();
    this.mainping();
  },
  updated() {
    $(".comment .bd .face .des")
      .find("a")
      .css("color", "#B695E9");
    $(".comment .bd .face .des")
      .find("img")
      .css("margin", "auto");
  },
  methods: {
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
    jv_guan() {
      this.showfen = false;
      this.showjv_item = true;
    },
    get_jvnei() {
      request
        .post(this.$api + "/mobile/EnumType", {
          modal: "",
          type: "UserTipTitleType"
        })
        .then(res => {
          this.jvnei = res.Data;
        })
        .catch(err => {});
    },
    tojvnei(item) {
      this.showjv_item = false;
      this.$router.push({
        path: "/jvbaoarticle",
        query: {
          id: this.articleid,
          title: item
        }
      });
      console.log(this.articleid, item);
    },
    pingjv() {
      this.showjvbao = false;
      this.$router.push({
        path: "/jvbaoarticleswen",
        query: {
          id: this.articleid
        }
      });
    },
    //跳转到评论
    tiaoa() {
      document.querySelector("#jump").scrollIntoView(true);
    },
    // 获取token
    gettoken() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      console.log("ios" + isiOS);
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
        this.$bridge.callhandler("getToken", "", data => {
          // 处理返回数据
          let token = JSON.stringify(data);
          // Dialog.alert({
          //   message: "ios返回来的token:" + token
          // }).then(() => {
          //   // on close

          // });
          window.localStorage.setItem("token", JSON.parse(token));
        });
      } else {
        console.log("我不是安卓也不是ios,我在哪");
      }
    },
    // 返回方法
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
        let url =
          this.$domain.url+"articlestie?id=" + this.articleid;
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
    // 点头像
    otherself() {
      this.$router.push({
        path: "/otherself",
        query: { id: this.articleinfo.UserId }
      });
    },
    // 分享方法
    towechat() {
      // 先掉分享接口
      request.post(this.$api + '/mobile/ArticleShare',{
        Id:this.articleid
      }).then(res=>{

      }).catch(err=>{

      });
      var dizhi =
        this.$domain.url+"articlesdetail?id=" + this.articleid;
      var name = this.articleinfo.UserName + "发表了一篇文章,快来看看吧";
      var description = this.articleinfo.ArticleTitle;
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
      // 先掉分享接口
      request.post(this.$api + '/mobile/ArticleShare',{
        Id:this.articleid
      }).then(res=>{

      }).catch(err=>{

      });
      var dizhi =
        this.$domain.url+"articlesdetail?id=" + this.articleid;
      var name = this.articleinfo.UserName + "发表了一篇文章,快来看看吧";
      var description = this.articleinfo.ArticleTitle;
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
    // g关注方法
    guanzhu() {
      request
        .post(this.$api + "/mobile/AttentionAdd", {
          ByUserId: this.articleinfo.UserId
        })
        .then(res => {
          if (res.IsSuccess) {
            Toast("关注成功");
            this.getdetail();
          } else {
            Toast(res.Message);
          }
        })
        .catch(err => {});
    },
    // 取消关注
    del_guanzhu() {
      request
        .post(this.$api + "/mobile/AttentionDelete", {
          ByUserId: this.articleinfo.UserId
        })
        .then(res => {
          if (res.IsSuccess) {
            Toast("取消关注");
            this.getdetail();
          } else {
            Toast(res.Message);
          }
        })
        .catch(err => {});
    },
    //  点赞
    // 点文章赞
    zanmain() {
      request
        .post(this.$api + "/mobile/LikedAdd", {
          MainId: this.articleid,
          Type: 2,
          MainUserId: this.articleinfo.UserId
        })
        .then(res => {
          if (res.IsSuccess === true) {
            // this.getdetail();
            this.articleinfo.IsLiked = 1; //文章详情点赞动态时
            this.articleinfo.LikedCount += 1;
          } else {
            Toast(res.Message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    nozanmain() {
      request
        .post(this.$api + "/mobile/LikedDelete", {
          MainId: this.articleid,
          Type: 2,
          MainUserId: this.articleinfo.UserId
        })
        .then(res => {
          if (res.IsSuccess === true) {
            this.articleinfo.IsLiked = 0; //文章详情点赞动态时
            this.articleinfo.LikedCount -= 1;
            if(this.articleinfo.LikedCount<0){
              this.articleinfo.LikedCount=0
            }
          } else {
            Toast(res.Message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //评论赞
    zanone(id, index) {
      this.pinglunlist[index].IsLiked = true;
      this.pinglunlist[index].LikedNum += 1;
      request
        .post(this.$api + "/mobile/LikedAdd", {
          MainId: id,
          Type: 1,
          MainUserId: this.pinglunlist[index].UserId
        })
        .then(res => {
          // this.mainping();
        })
        .catch(err => {
          console.log(err);
        });
    },
    //评论取消赞
    nozanone(id, index) {
      this.pinglunlist[index].IsLiked = false;
      this.pinglunlist[index].LikedNum -= 1;
      request
        .post(this.$api + "mobile/LikedDelete", {
          MainId: id,
          Type: 1,
          MainUserId: this.pinglunlist[index].UserId
        })
        .then(res => {})
        .catch(err => {
          console.log(err);
        });
    },
    // 赞儿子
    zanson(id, index) {
      this.pinglunlist[index].List[0].IsLiked = true;
      this.pinglunlist[index].List[0].LikedNum += 1;
      request
        .post(this.$api + "/mobile/LikedAdd", {
          MainId: id,
          Type: 1,
          MainUserId: this.pinglunlist[index].List[0].UserId
        })
        .then(res => {
          // this.mainping();
        })
        .catch(err => {
          console.log(err);
        });
    },
    nozanson(id, index) {
      this.pinglunlist[index].List[0].IsLiked = false;
      this.pinglunlist[index].List[0].LikedNum -= 1;
      request
        .post(this.$api + "mobile/LikedDelete", {
          MainId: id,
          Type: 1,
          MainUserId: this.pinglunlist[index].List[0].UserId
        })
        .then(res => {})
        .catch(err => {
          console.log(err);
        });
    },
    // 点击蒙版更多的点赞
    zantwo(id, index) {
      this.showgenglist.List[index].IsLiked = true;
      this.showgenglist.List[index].LikedNum += 1;
      console.log("id" + id, "index" + index);
      request
        .post(this.$api + "/mobile/LikedAdd", {
          MainId: id,
          Type: 1,
          MainUserId: this.showgenglist.List[index].UserId
        })
        .then(res => {})
        .catch(err => {
          console.log(err);
        });
    },
    nozantwo(id, index) {
      this.showgenglist.List[index].IsLiked = false;
      this.showgenglist.List[index].LikedNum -= 1;
      console.log("id" + id, "index" + index);
      request
        .post(this.$api + "mobile/LikedDelete", {
          MainId: id,
          Type: 1,
          MainUserId: this.showgenglist.List[index].UserId
        })
        .then(res => {})
        .catch(err => {
          console.log(err);
        });
    },
    toshoucang() {
      request
        .post(this.$api + "/mobile/FavoriteAdd", {
          MainId: this.articleid,
          Type: "Article",
          MainUserId: this.articleinfo.UserId
        })
        .then(res => {
          if (res.IsSuccess) {
            // Toast("收藏成功");
            // this.getdetail();
            this.articleinfo.FavoriteFlag = true;
            this.articleinfo.FavoriteCount += 1;
          } else {
            // Toast(res.Message);
          }
        })
        .catch(err => {});
    },
    del_shoucang() {
      request
        .post(this.$api + "/mobile/FavoriteDelete", {
          MainId: this.articleid,
          Type: "Article",
          MainUserId: this.articleinfo.UserId
        })
        .then(res => {
          if (res.IsSuccess) {
            // Toast("取消收藏");
            this.articleinfo.FavoriteFlag = false;
            this.articleinfo.FavoriteCount -= 1;
          } else {
            // Toast(res.Message);
          }
        })
        .catch(err => {});
    },
    // 评论一级
    pingyi() {
      this.holder = "@" + this.articleinfo.ArticleAuthor;
    },
    // 删除评论
    shanping(id) {
      Dialog.confirm({
        message: "确认删除此条评论?"
      })
        .then(() => {
          // on confirm
          request
            .post(this.$api + "/mobile/ArticleCommentDelete", {
              Id: id
            })
            .then(res => {
              if (res.IsSuccess) {
                Toast("删除成功");
                this.mainping();
              } else {
                Toast(res.Message);
              }
            })
            .catch(err => {});
        })
        .catch(() => {
          // on cancel
        });
    },
    shanping2(id, index) {
      Dialog.confirm({
        message: "确认删除此条评论?"
      })
        .then(() => {
          //  console.log(index)
          //  console.log(this.showgenglist.List[index])
          // on confirm
          request
            .post(this.$api + "/mobile/ArticleCommentDelete", {
              Id: id
            })
            .then(res => {
              if (res.IsSuccess) {
                this.showgenglist.List.splice(index, 1);
                Toast("删除成功");
                this.mainping();
              } else {
                Toast(res.Message);
              }
            })
            .catch(err => {});
        })
        .catch(() => {
          // on cancel
        });
    },
    //评论二级
    dianping(id, name, mainuserid, content, index) {
      // console.log(id)
      // console.log(name)
      // console.log(mainuserid)
      // this.articleinfo.ArticleAuthor = name;
      this.parentid = id;
      this.mainuserid = mainuserid;
      this.jvbaotitle = content;
      this.showjvbao = true;
      this.holder = "@" + this.articleinfo.ArticleAuthor;
    },
    // 弹出框选回复
    xuanhuifu() {
      this.showjvbao = false;
      this.showb = true;
      this.ismain = false;
      this.showzhe = true;
      setTimeout(() => {
        document.getElementById("cer").focus();
      }, 20);
    },
    // 显示评论框方法
    chulai() {
      this.holder = "@" + this.articleinfo.ArticleAuthor;
      this.showzhe = true;
      this.showb = true;
       setTimeout(() => {
        document.getElementById("cer").focus();
      }, 20);
    },
    zhezhao() {
      this.showb = false;
      this.showzhe = false;
    },
    //mainid:文章的id   mainuserid:发表文章的人  parentsid:当前评论的id
    getdetail() {
      request
        .post(this.$api + "/mobile/GetArticleDetail?id=" + this.articleid)
        .then(res => {
          this.isguan = res.Data.AttentionFlag;
          this.articleinfo = res.Data;
          this.AttachList = res.Data.AttachList;

          console.log(this.AttachList);
          if (!this.AttachList.length) {
            this.showbanner = true;
          } else {
            this.showbanner = false;
          }
          // this.ArticleAuthor = res.Data.ArticleAuthor;
          // this.rcount=res.Data.Rcount
        })
        .catch(err => {});
    },
    // 展开全部
    zhankai(item) {
      this.showgengduo = true;
      this.gengmainid = item.MainId;
      this.gengmainuserid = item.MainUserId;
      this.gengparentid = item.Id;
      this.showgenglist = item;

      console.log(item);
    },
    //展开框提交
    onsubmit() {
      console.log(this.messagegeng);
      if (!this.messagegeng.length) {
        Toast("至少评论一个字");
      } else {
        request
          .post(this.$api + "/mobile/ArticleCommentAdd", {
            page: this.page,
            MainUserId: this.gengmainuserid,
            MainId: this.gengmainid,
            ParentId: this.gengparentid,
            Type: "Common",
            Content: this.messagegeng
          })
          .then(res => {
            if (res.IsSuccess) {
              Toast("评论成功");
              this.mainping();
              this.showgengduo = false;
              this.messagegeng = "";
            } else {
              Toast(res.Message);
            }
          })
          .catch(er => {});
      }
    },
    // 获取主题评论
    mainping() {
      request
        .post(this.$api + "/mobile/GetArticleCommentList", {
          Sort: "Id",
          Order: "desc",
          MainId: this.articleid
        })
        .then(res => {
          this.pinglunlist = res.Data.List;
          this.allnum = res.Data.TotalCount;
        })
        .catch(err => {});
    },
    addmain() {
      request
        .post(this.$api + "/mobile/ArticleCommentAdd", {
          page: this.page,
          MainUserId: 0,
          MainId: this.articleinfo.ArticleId,
          ParentId: 0,
          Type: "Common",
          Content: this.message
        })
        .then(res => {
          if (res.IsSuccess) {
            this.message = "";
            this.showb = false;
            this.showzhe = false;
            // this.holder = "@";
            this.mainping();
          } else {
            Toast(res.Message);
          }
        })
        .catch(er => {});
    },
    add() {
      request
        .post(this.$api + "/mobile/ArticleCommentAdd", {
          page: this.page,
          MainUserId: this.mainuserid,
          MainId: this.articleid,
          ParentId: this.parentid,
          Type: "Common",
          Content: this.message
        })
        .then(res => {
          if (res.IsSuccess) {
            this.message = "";
            this.ismain = true;
            this.showb = false;
            this.showzhe = false;
            // this.holder = "@";
            this.mainping();
          } else {
            Toast(res.Message);
          }
        })
        .catch(er => {});
    },
    // 提交评价按钮
    pinglunmain() {
      if (!this.message.length) {
        Toast("至少评论一个字");
      } else {
        this.addmain();
      }
    },
    pinglunother() {
      if (!this.message.length) {
        Toast("至少评论一个字");
      } else {
        console.log("对了");
        this.add();
      }
    },
    //选择好友部分
    // 监听
    inputFunc() {
      console.log(this.message);
      if (this.message.charAt(this.message.length - 1) == "@") {
        this.showhaoyou = true;
      } else {
      }
    },
    onClickLeft() {
      this.showhaoyou = false;
    }
  }
};
</script>
<style lang="less" scoped>
.van-field__control {
  padding-left: 20px !important;
  width: 200px;
  height: 30px;
}
@desgin: 750;
@base: 75rem;
// 弹窗 举报内容
.jvnei {
  width: 100%;
  height: 900 / @base;
  background: #fff;
  .jvnei_title {
    width: 100%;
    height: 105 / @base;
    line-height: 105 / @base;
    text-align: center;
    font-size: 30 / @base;
    color: #333333;
    border-bottom: 1px solid #e6e6e6;
  }
  .jvnei_item {
    padding: 0 40 / @base;
    width: 100%;
    height: 90 / @base;
    line-height: 90 / @base;
    border-bottom: 1px solid #e6e6e6;
    span {
      float: left;
      font-size: 28 / @base;
      color: #333333;
    }
    i {
      float: right;
      color: #bbbbbb;
    }
  }
}
// 分享到微信
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
.activefont {
  color: #b694e8 !important;
}
.kuangkuang {
  width: 80%;
  height: 50 / @base;
}
.van-cell {
  padding: 0 !important;
}
.head {
  background: #ffffff;
  width: 100%;
  height: 50px;
  position: absolute;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  padding: 20 / @base 40 / @base;
  i {
    font-size: 60 / @base;
    line-height: 60 / @base;
  }
}
.bu {
  width: 100%;
  height: 100 / @base;
}
.contain {
  width: 100%;
  height: 100%;
  // background: red;
}
.main {
  width: 100%;
  position: absolute;
  top: 50px;
  bottom: 50px;
  /* 使之可以滚动 */
  overflow-y: scroll;
  /* 增加该属性，可以增加弹性，是滑动更加顺畅 */
  -webkit-overflow-scrolling: touch;
}
.banner {
  width: 100%;
  // height: 370px;
  img {
    width: 100%;
    // height: 370px;
    background-size: 100% 100%;
  }
}
.banner2 {
  width: 100%;
  img {
    width: 100%;
    max-height: 500px;
    background-size: 100% 100%;
  }
}
.comment {
  .bd {
    padding: 0 40 / @base 30 / @base 40 / @base;
    border-bottom: 1px solid #e6e6e6;
    font-size: 24 / @base;
    .top {
      padding-top: 20 / @base;
      h3 {
        font-size: 36 / @base;
        color: #4f4f4f;
        font-weight: 300;
        line-height: 70 / @base;
      }
      p {
        color: #a1a1a1;
        font-size: 26 / @base;
        margin-bottom: 10 / @base;
      }
      .time {
        color: #a1a1a1;
        margin-top: 10 / @base;
        padding-bottom: 33 / @base;
        border-bottom: 1 / @base solid #e6e6e6;
        color: 20 / @base;
        .read {
          margin-left: 36 / @base;
        }
      }
    }
    .face {
      padding-top: 36 / @base;
      p {
        margin-top: 20 / @base;
        font-size: 20 / @base;
        color: #a1a1a1;
        letter-spacing: 2 / @base;
      }
      .des {
        width: 100%;
        margin-top: 60 / @base;
        font-size: 26 / @base;
        // p {
        //   margin-top: 0;
        //   color: #333;
        //   font-size: 28 / @base;
        //   line-height: 45 / @base;
        // }
        // .img {
        //   margin: 60 / @base 0;

        //   img {
        //     margin: 0 auto;
        //     width: 448 / @base;
        //     height: 216 / @base;
        //   }
        // }
      }
      .pic {
        position: relative;

        .left {
          position: relative;
          img {
            width: 80 / @base;
            height: 80 / @base;
            border-radius: 50%;
          }
          .lefttop {
            position: absolute;
            left: 100 / @base;
            top: 0 / @base;
            font-size: 30 / @base;
            color: black;
          }
          .leftmiddle {
            position: absolute;
            left: 100 / @base;
            top: 40 / @base;
            font-size: 20 / @base;
            color: #a1a1a1;
          }
          .leftbottom {
            position: absolute;
            left: 100 / @base;
            top: 80 / @base;
            font-size: 26 / @base;
            color: #b695e9;
          }
        }
        .right {
          position: absolute;
          right: 0;
          top: 0;
          width: 174 / @base;
          height: 52 / @base;
          // border: 1px solid #8700c6;
          border-radius: 30 / @base;
          text-align: center;
          line-height: 52 / @base;
          color: white;
          background: #b695e9;
        }
        .right1 {
          position: absolute;
          right: 0;
          top: 0;
          width: 174 / @base;
          height: 52 / @base;
          background: #d2d2d2;
          // border: 1px solid #8700c6;
          border-radius: 30 / @base;
          text-align: center;
          line-height: 52 / @base;
          color: #ffffff;
        }
      }
    }
  }
}

// 剩余回复蒙层模块
.gengtop {
  padding: 10 / @base 40 / @base 20 / @base 40 / @base;
  width: 100%;
  height: 20%;
  border-bottom: 4px solid #eeeeee;
  p {
    color: #a1a1a1;
    font-size: 26 / @base;
    margin-top: 20 / @base;
  }
  .gengtitle {
    position: relative;
    width: 100%;
    height: 80 / @base;
    display: flex;
    img {
      width: 80 / @base;
      height: 80 / @base;
      border-radius: 50%;
    }

    .gengfirst {
      position: absolute;
      left: 90 / @base;
      font-size: 30 / @base;
    }
    .gengtwo {
      position: absolute;
      left: 90 / @base;
      top: 45 / @base;
      font-size: 20 / @base;
      color: #b7b7b7;
    }
    i {
      font-size: 40 / @base;
      position: absolute;
      right: 0 / @base;
      top: 12 / @base;
      width: 30 / @base;
      height: 30 / @base;
      color: #b7b7b7;
    }
  }
}
.gengmiddle {
  width: 100%;
  height: 68%;
  padding: 40 / @base 40 / @base 0 / @base 40 / @base;
  //  border-bottom: 1px solid #e6e6e6;
  overflow: auto;
  .middleping {
    margin-bottom: 20 / @base;
  }
  .middletitle {
    position: relative;
    width: 100%;
    height: 80 / @base;
    display: flex;
    .middletitle_tou {
      width: 80 / @base;
      height: 80 / @base;
      border-radius: 50%;
    }

    .oneimg {
      position: absolute;
      right: 40 / @base;
      top: 12 / @base;
      width: 40 / @base;
      height: 40 / @base;
    }
    .middleauther {
      position: absolute;
      left: 90 / @base;
      font-size: 30 / @base;
    }
    .middletime {
      position: absolute;
      left: 90 / @base;
      top: 45 / @base;
      font-size: 20 / @base;
      color: #b7b7b7;
    }
    i {
      font-size: 40 / @base;
      position: absolute;
      right: 45 / @base;
      top: 12 / @base;
      width: 30 / @base;
      height: 30 / @base;
      color: #b7b7b7;
    }
    .middlezan {
      font-size: 32 / @base;
      position: absolute;
      right: 0;
      top: 12 / @base;
      color: #b7b7b7;
    }
  }
  .middlemain {
    padding-left: 90 / @base;
    font-size: 30 / @base;
  }
  .firstshan {
    font-size: 28 / @base;
    text-align: right;
    color: #b7b7b7;
  }
}
.gengbottom {
  position: fixed;
  bottom: 0;
  padding: 20 / @base 40 / @base;
  width: 100%;
  min-height: 100 / @base;
  background: #ffffff;
  display: flex;
  border-top: 1px solid #e6e6e6;
}
// 评论模块
.quanping {
  padding: 40 / @base 40 / @base 100 / @base 40 / @base;
  width: 100%;
  h3 {
    font-size: 36 / @base;
  }
  .firstping {
    width: 100%;
    padding: 40 / @base 0;
    border-bottom: 1px solid #e6e6e6;
    .title {
      position: relative;
      width: 100%;
      height: 80 / @base;
      display: flex;
      .touimg {
        width: 80 / @base;
        height: 80 / @base;
        border-radius: 50%;
      }
      .oneimg {
        position: absolute;
        right: 40 / @base;
        top: 12 / @base;
        width: 40 / @base;
        height: 40 / @base;
      }
      .firstauther {
        position: absolute;
        left: 90 / @base;
        font-size: 30 / @base;
      }
      .firsttime {
        position: absolute;
        left: 90 / @base;
        top: 45 / @base;
        font-size: 20 / @base;
        color: #b7b7b7;
      }
      i {
        font-size: 40 / @base;
        position: absolute;
        right: 45 / @base;
        top: 12 / @base;
        width: 30 / @base;
        height: 30 / @base;
        color: #b7b7b7;
      }
      .firstzan {
        font-size: 32 / @base;
        position: absolute;
        right: 0;
        top: 12 / @base;
        color: #b7b7b7;
      }
    }
    .firstmain {
      padding-left: 90 / @base;
      font-size: 30 / @base;
    }
    .firstshan {
      font-size: 28 / @base;
      text-align: right;
      color: #b7b7b7;
    }
  }

  //  第二次评论
  .secondping {
    width: 100%;
    padding: 15 / @base 0 0 80 / @base;

    .qiyu {
      font-size: 25 / @base;
      padding-left: 90 / @base;
      margin-top: 30 / @base;
      color: #b694e8;
    }
    .title {
      position: relative;
      width: 100%;
      height: 80 / @base;
      display: flex;
      .touimg {
        width: 80 / @base;
        height: 80 / @base;
        border-radius: 50%;
      }
      .oneimg {
        position: absolute;
        right: 40 / @base;
        top: 12 / @base;
        width: 40 / @base;
        height: 40 / @base;
      }
      .secondauther {
        position: absolute;
        left: 90 / @base;
        font-size: 30 / @base;
      }
      .secondtime {
        position: absolute;
        left: 90 / @base;
        top: 45 / @base;
        font-size: 20 / @base;
        color: #b7b7b7;
      }
      i {
        font-size: 40 / @base;
        position: absolute;
        right: 45 / @base;
        top: 12 / @base;
        width: 30 / @base;
        height: 30 / @base;
        color: #b7b7b7;
      }
      .secondzan {
        font-size: 32 / @base;
        position: absolute;
        right: 0;
        top: 12 / @base;
        color: #b7b7b7;
      }
    }
    .secondmain {
      padding-left: 90 / @base;
      font-size: 30 / @base;
    }
    .firstshan {
      font-size: 28 / @base;
      text-align: right;
      color: #b7b7b7;
    }
  }
}
.fasong {
  z-index: 13;
  display: block;
  width: 100 / @base;
  height: 50 / @base;
  margin: auto 0 auto 30 / @base;
  line-height: 50 / @base;
  border-radius: 5px;
  font-size: 20 / @base;
  text-align: center;
  background: #b694e8;
  color: white;
}

//回复举报蒙层模块
.jvbaokuangone {
  width: 96%;
  height: 300 / @base;
  background: #ffffff;
  position: fixed;
  bottom: 11%;
  left: 2%;
  z-index: 1;
  border-radius: 5px;
  .jvbaoball {
    width: 100%;
    height: 100 / @base;
    line-height: 100 / @base;
    text-align: center;
    font-size: 35 / @base;
  }
}
.jvbaokuangtwo {
  width: 96%;
  height: 100 / @base;
  line-height: 100 / @base;
  background: #ffffff;
  font-size: 35 / @base;
  color: #3183c7;
  position: fixed;
  z-index: 1;
  bottom: 2%;
  left: 2%;
  border-radius: 5px;
  text-align: center;
}
// 底部模块
// 底部模块
.bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  min-height: 50px;
  padding: 15 / @base 40 / @base;
  background: #ffffff;
  display: flex;

  border-top: 1px solid #e6e6e6;
  z-index: 13 !important;
  .bottom_bi {
    position: relative;
    width: 45%;
    height: 70 / @base;
    line-height: 70 / @base;
    font-size: 30 / @base;
    color: #b7b7b7;
    border-radius: 30px;
    border: 1px solid #e6e6e6;
    text-align: center;
    i {
      font-size: 40 / @base;
      color: black;
      position: absolute;
      left: 15 / @base;
    }
  }
  .bottomone {
    height: 50 / @base;
    width: 50 / @base;
    margin-top: 10 / @base;
    margin-left: 50 / @base;
  }
  .bottomtwo {
    height: 50 / @base;
    width: 50 / @base;
    margin-top: 10 / @base;
    margin-left: 30 / @base;
  }
  .bottomthree {
    margin-left: 30 / @base;
    height: 50 / @base;
    width: 50 / @base;
    margin-top: 10 / @base;
  }
  .onehou {
    font-size: 30 / @base;
    color: black;
    line-height: 70 / @base;
    margin-left: 10 / @base;
  }
  .twohou {
    font-size: 30 / @base;
    color: black;
    line-height: 70 / @base;
    margin-left: 10 / @base;
  }
  .threehou {
    font-size: 30 / @base;
    color: black;
    line-height: 70 / @base;
    margin-left: 10 / @base;
  }
}
.bottom0 {
  position: fixed;
  bottom: 0;
  width: 100%;
  min-height: 50px;
  padding: 15 / @base 40 / @base;
  background: #ffffff;
  display: flex;
  // z-index: 6;
  border-top: 1px solid #e6e6e6;
  .bottom_bi {
    position: relative;
    width: 45%;
    height: 70 / @base;
    line-height: 70 / @base;
    font-size: 30 / @base;
    color: #b7b7b7;
    border-radius: 30px;
    border: 1px solid #e6e6e6;
    text-align: center;
    i {
      font-size: 40 / @base;
      color: black;
      position: absolute;
      left: 15 / @base;
    }
  }
  .bottomone {
    height: 50 / @base;
    width: 50 / @base;
    margin-top: 10 / @base;
    margin-left: 50 / @base;
  }
  .bottomtwo {
    height: 50 / @base;
    width: 50 / @base;
    margin-top: 10 / @base;
    margin-left: 30 / @base;
  }
  .bottomthree {
    margin-left: 30 / @base;
    height: 50 / @base;
    width: 50 / @base;
    margin-top: 10 / @base;
  }
  .onehou {
    font-size: 30 / @base;
    color: black;
    line-height: 70 / @base;
    margin-left: 10 / @base;
  }
  .twohou {
    font-size: 30 / @base;
    color: black;
    line-height: 70 / @base;
    margin-left: 10 / @base;
  }
  .threehou {
    font-size: 30 / @base;
    color: black;
    line-height: 70 / @base;
    margin-left: 10 / @base;
  }
}

//@好友部分
.haoyou_header {
  background: #ffffff;
  position: fixed;
  top: 0;
  width: 100%;
  height: 120 / @base;
  line-height: 120 / @base;
  text-align: center;
  // background: red;
  font-size: 35 / @base;
  position: relative;

  span {
    position: absolute;
    top: 0 / @base;
    left: 40 / @base;
    font-size: 33 / @base;
  }
}
</style>


