<template>
  <div>
    <header>
      <i @click="goback()" class="iconfont icon-zuojiantou"></i>
      <div class="head">发布</div>
    </header>
    <div class="bu"></div>
    <van-tabs sticky :offset-top="50" v-model="active" color="#BA99EB" swipeable line-width="50%">
      <van-tab title="帖子">
        <div class="tuijian">
          <div v-show="!this.data.length" class="shamei">
            <img src="../../../assets/images/community_kong.png" alt />
            <p>你还没有发布过啊~</p>
          </div>

          <div class="container-water-fall">
            <!-- <div @click="loadmore">加载更多</div> -->

            <waterfall :col="col" :data="data">
              <template>
                <div class="lii" v-for="(item,index) in data" :key="index">
                  <div class="pic">
                    <img
                      @click="del_tiezi(item.ArticleId,index)"
                      class="img_del"
                      src="../../../assets/images/my_fabu_del.png"
                      alt
                    />
                    <img
                      @click="edit(item.ArticleId,'wen')"
                      v-show="item.Type === 'CommonArticle'"
                      class="img_edit"
                      src="../../../assets/images/my_fabu_edit.png"
                      alt
                    />
                    <img
                      class="img"
                      v-if="item.ArticleImg"
                      @click="toarticle(item.Type,item.ArticleId,item.UserId)"
                      :lazy-src="item.ArticleImg"
                      alt
                    />
                    <img
                      class="img"
                      v-else
                      @click="toarticle(item.Type,item.ArticleId,item.UserId)"
                      src="../../../assets/images/community_listbg.jpg"
                      alt
                    />
                  </div>
                  <div class="bottom">
                    <p
                      @click="toarticle(item.Type,item.ArticleId,item.UserId)"
                    >{{item.ArticleTitle}}</p>
                    <div class="avtart">
                      <div class="divv">
                        <img
                          class="avimg"
                          @click="lookother(item.UserId)"
                          v-if="item.UserAvatar"
                          :src="item.UserAvatar"
                          alt
                        />
                        <img
                          class="avimg"
                          @click="lookother(item.UserId)"
                          v-else
                          src="../../../assets/images/community_listbg.jpg"
                          alt
                        />
                        <span @click="lookother(item.UserId)">{{item.UserName|communityname}}</span>
                      </div>
                      <div
                        @click="zanone(item.ArticleId,index)"
                        class="zan"
                        v-if="item.IsLiked===0"
                      >
                        <img src="../../../assets/images/community_dianzan.png" alt />
                        <!-- <img v-else src="../../assets/images/community_yizan.png" alt /> -->
                        <span>
                          <!-- 100.5w -->
                          <!-- <i class="iconfont icon-thumbup"></i> -->
                          {{item.LikedCount}}
                        </span>
                      </div>
                      <div @click="nozanone(item.ArticleId,index)" class="zan" v-else>
                        <img src="../../../assets/images/community_yizan.png" alt />
                        <!-- <img v-else src="../../assets/images/community_yizan.png" alt /> -->
                        <span>
                          <!-- 100.5w -->
                          <!-- <i class="iconfont icon-thumbup"></i> -->
                          {{item.LikedCount}}
                        </span>
                      </div>
                    </div>
                    <div v-show="item.AttentionFlag" class="isyi">
                      <img src="../../../assets/images/community_yiguanzhu.png" alt />
                      <div>已关注</div>
                    </div>
                  </div>
                </div>
              </template>
            </waterfall>
          </div>
        </div>
      </van-tab>
      <van-tab title="话题">
        <div class="huati">
          <!-- <div v-show="!this.list.length" class="shamei">
            <img src="../../../assets/images/community_kong.png" alt />
            <p>你还没有关注的人呦~</p>
          </div>-->
          <div class="item">
            <!-- <div class="topnav">
              <img src="../../../assets/images/icon3.png" alt />
              <span class="remen">热门话题</span>
              <span class="more fr" @click="to_more()">更多></span>
            </div>-->
            <ul>
              <van-list
                v-model="huati_loading"
                :finished="huati_finished"
                finished-text="没有更多了"
                @load="hua_onLoad"
              >
                <li class="clearfix" v-for="(item,index) in list" :key="index">
                  <i
                    style=" position:absolute;bottom: 0;right: 0;font-size:15px;"
                    @click="del_huati(item.ArticleId,index)"
                    class="iconfont icon-iconfontshanchu3"
                  ></i>
                  <i @click="edit(item.ArticleId,'hua')" class="iconfont icon-bianji"  style=" position:absolute;bottom: 0;right: 20px;font-size:15px;"></i>
                  <div v-if="item.ArticleImg" class="pic fl">
                    <img :src="item.ArticleImg" @click="tohuati(item.ArticleId)" alt />
                  </div>
                  <div v-else class="pic fl">
                    <img
                      @click="tohuati(item.ArticleId)"
                      src="../../../assets/images/huati-huati.jpg"
                      alt
                    />
                  </div>
                  <div class="des" @click="tohuati(item.ArticleId)">
                    <div class="title">
                      <span>#</span>
                      {{item.ArticleTitle}}
                    </div>
                    <p>{{item.Description|articleTitle}}</p>
                    <!-- <p style="margin-top:6px">等哈技术大会卡仕达卡仕达卡实打实大苏啊实实打啊实打实的把上面的爸妈说算v大苏打实打实打沙发沙发法沙发沙发阿三仕达是</p> -->
                    <span class="talk">{{item.ClickCount}}人参与讨论</span>
                  </div>
                </li>
              </van-list>
            </ul>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import request from "@/utils/request";
import { Tab, Tabs, Dialog, Toast } from "vant";
import Return from "../../../components/Return";
export default {
  components: {
    Return
  },
  data() {
    return {
      col: 2,
      data: [],
      active: 0,
      page: 1,
      loading: false,
      finished: false,
      data: [],
      huati_loading: false,
      huati_finished: false,
      list: [],
      hua_page: 1
    };
  },
  mounted() {
    this.gettuijian();
    this.gethuati();
  },
  beforeRouteLeave(to,from,next){
    console.log('去',to.path,'from',from)
     if(to.path == '/fabu'){
       from.meta.keepAlive =true
     }else{
        from.meta.keepAlive =false
     }
     next()
  },
  methods: {
    // 去编辑
    edit(id, type) {
      this.$router.push({
        path: "/fabu",
        query: {
          id: id,
          type: type
        }
      });
    },
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
        let url = this.$domain.url + "my_fabu";
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
    // 点赞
    zanone(id, index) {
      this.data[index].IsLiked = 1;
      this.data[index].LikedCount += 1;
      request
        .post(this.$api + "/mobile/LikedAdd", {
          MainId: id,
          Type: 2
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
      this.data[index].IsLiked = 0;
      this.data[index].LikedCount -= 1;
      request
        .post(this.$api + "/mobile/LikedDelete", {
          MainId: id,
          Type: 2
        })
        .then(res => {})
        .catch(err => {
          console.log(err);
        });
    },
    // 看别人的
    lookother(id) {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        console.log("我是要去安卓");
        // window.android.goToHome()
        var url = this.$domain.url + "otherself?id=" + id;
        console.log(url);
        window.android.openNewPage(url);
        //   this.$router.push({
        //   path: "/otherself",
        //   query: {
        //     id: id
        //   }
        // });
      } else if (isiOS) {
        console.log("我是要去ios");
        let url = this.$domain.url + "otherself?id=" + id;
        console.log(url);
        this.$bridge.callhandler("openNewPage", url, data => {
          // 处理返回数据
        });
        this.$router.push({
          path: "/otherself",
          query: {
            id: id
          }
        });
        //  window.location.href
        //  window.location.href='mqjapp://home'
      } else {
        console.log("我不是安卓也不是ios,我在哪");
      }
    },
    // s删除发布的帖子
    del_tiezi(id, index) {
      // console.log(id,index)
      Dialog.confirm({
        message: "确认删除此条?"
      })
        .then(() => {
          // on confirm
          console.log("确认");
          request
            // mobile/GetArticleInfoList      mobile/GetMyArticleList
            .post(this.$api + "/mobile/ArticleDelete", {
              id: id
            })
            .then(res => {
              if (res.Message) {
                Toast("删除成功");
                this.data.splice(index, 1);
              } else {
                Toast(res.Message);
              }
            })
            .catch(err => {});
        })
        .catch(() => {
          // on cancel
          console.log("取消");
        });
    },
    // s删除发布的话题
    del_huati(id, index) {
      // console.log(id,index)
      Dialog.confirm({
        message: "确认删除此条?"
      })
        .then(() => {
          // on confirm
          console.log("确认");
          request
            // mobile/GetArticleInfoList      mobile/GetMyArticleList
            .post(this.$api + "/mobile/ArticleDelete", {
              id: id
            })
            .then(res => {
              if (res.Message) {
                Toast("删除成功");
                this.list.splice(index, 1);
              } else {
                Toast(res.Message);
              }
            })
            .catch(err => {});
        })
        .catch(() => {
          // on cancel
          console.log("取消");
        });
    },
    onLoad() {
      // 异步更新数据

      this.page += 1;
      this.gettuijian();
    },
    gettuijian() {
      request
        // mobile/GetArticleInfoList      mobile/GetMyArticleList
        .post(this.$api + "/mobile/GetMyArticleList", {
          Page: 1,
          Rows: 20
        })
        .then(res => {
          this.data = res.Data.List;
          console.log(this.data);
          // this.loading = false;
          // console.log(res.Data.List.length);
          // if (res.Data.List.length) {
          //   var arr = res.Data.List;
          //   for (let i = 0; i < arr.length; i++) {
          //     this.tuijianlist.push(arr[i]);
          //   }
          //   // this.showlist.concat(res.data.Data.list)
          //   // console.log(this.showlist)
          // } else {
          //   this.finished = true;
          // }
        })
        .catch(err => {});
    },
    // //帖子详情
    toarticle(type, id, userid) {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (type != "VideoArticle") {
        this.$router.push({
          path: "/ArticlesTie",
          query: {
            id: id
          }
        });
      } else {
        console.log("去视频");
        console.log("走视频" + id);
        if (isAndroid) {
          console.log("我是要去安卓" + id);
          // window.android.goToHome()
          window.android.goVideo(id, userid);
        } else if (isiOS) {
          let videourl = "mqjapp://goVideo:" + id + "&" + userid;
          console.log("我是要去ios" + videourl);
          window.location.href = videourl;
        } else {
          console.log("我在浏览器");
        }
      }
    },
    // 进入话题详情
    tohuati(id) {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        console.log("我是要去安卓");
        // window.android.goToHome()
        var url = this.$domain.url + "articleshua?id=" + id;
        console.log(url);
        window.android.openNewPage(url);
        // this.$router.push({
        //   path: "/articleshua",
        //   query: {
        //     id: id
        //   }
        // });
      } else if (isiOS) {
        console.log("我是要去ios");
        let url = this.$domain.url + "articleshua?id=" + id;
        console.log(url);
        this.$bridge.callhandler("openNewPage", url, data => {
          // 处理返回数据
        });
        this.$router.push({
          path: "/articleshua",
          query: {
            id: id
          }
        });
        //  window.location.href
        //  window.location.href='mqjapp://home'
      } else {
        console.log("我不是安卓也不是ios,我在哪");
        // this.$router.push({path:'/articleshua',query:{
        //           id:id
        // }})
      }
    },
    //onload
    hua_onLoad() {
      this.hua_page += 1;
      this.gethuati();
    },
    gethuati() {
      request
        //
        .post(this.$api + "/mobile/GetMyTopicArticleList", {
          Page: this.hua_page,
          Rows: 10,
          Sort: "Id",
          Order: "asc"
        })
        .then(res => {
          // this.list = res.Data.List;
          this.huati_loading = false;
          if (res.Data.List.length) {
            var arr = res.Data.List;
            for (let i = 0; i < arr.length; i++) {
              this.list.push(arr[i]);
            }
          } else {
            this.huati_finished = true;
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

// ssss
.tuijian {
  // margin-bottom: 75 / @base;
  width: 100%;
  // height: 100%;
  padding: 20 / @base;
  // overflow: scroll;
  // background-color: #f5f5f5;
  .shamei {
    width: 100%;
    img {
      width: 70%;
      height: 400 / @base;
      margin: 50 / @base auto;
    }
    p {
      font-size: 35 / @base;
      color: #717171;
      text-align: center;
    }
  }
  .container-water-fall {
    // padding: 20/@base;
    box-sizing: border-box;
    // margin-bottom: 75 / @base;
    width: 100%;
    // height: 100%;
    box-sizing: border-box;
    // padding: 10 / @base 10 / @base 0 / @base 10 / @base;
    // overflow: scroll;
    // background-color: red;

    .lii {
      width: 98%;
      margin-top: 10 / @base;
      background-color: #fff;
      border-radius: 12 / @base;
      // border: 2px solid #f0f0f0;
      box-shadow: 0px 0px 5px 1px #c4c3c6;
      // border-radius: 12px 12px 12px 12px;
      // box-shadow: 2 / @base 2 / @base 12 / @base rgba(0, 0, 0, 0.2);
      // border: 1px solid red;
      // &:nth-child(even) {
      //   float: right;
      // }
      .pic {
        position: relative;
        .img {
          width: 100%;
          height: auto;
          // max-hei/ght: 500 / @base;
          background-size: 100% 100%;
        }
        .img_del {
          position: absolute;
          right: 15 / @base;
          top: 15 / @base;
          z-index: 1;
          width: 40 / @base;
          height: 40 / @base;
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .img_edit {
          position: absolute;
          right: 65 / @base;
          top: 15 / @base;
          z-index: 1;
          width: 40 / @base;
          height: 40 / @base;
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
      }
      .bottom {
        // border: 1px solid red;
        padding: 15 / @base 15 / @base;
        p {
          margin-bottom: 25 / @base;
          font-size: 28 / @base;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .avtart {
          display: flex;
          justify-content: space-between;
          width: 100%;
          height: 60 / @base;
          // border: 1px solid red;
          // position: relative;
          .divv {
            width: 70%;
            display: flex;
            align-items: center;
            .avimg {
              width: 40 / @base;
              height: 40 / @base;
              border-radius: 50%;
            }
            span {
              height: 60 / @base;
              line-height: 60 / @base;
              // text-align: right;
              color: #717171;
              font-size: 18 / @base;
              margin-left: 10 / @base;
              // vertical-align: middle;
            }
          }

          .zan {
            display: flex;
            min-width: 60 / @base;
            height: 60 / @base;
            // text-align: right;
            span {
              font-size: 20 / @base;
              line-height: 60 / @base;
              color: #a6a6a6;
              margin-left: 8 / @base;
            }
            img {
              // z-index: 11;

              margin-top: 14 / @base;
              width: 32 / @base;
              height: 32 / @base;
              background-size: 100% 100%;
            }
          }
        }
        .isyi {
          width: 100%;
          height: 20 / @base;
          display: flex;
          // background: red;
          img {
            width: 20 / @base;
            height: 20 / @base;
          }
          div {
            width: 70%;
            height: 20 / @base;
            line-height: 20 / @base;
            font-size: 20 / @base;
            color: #717171;
            margin-left: 10 / @base;
          }
        }
      }
    }
  }
}
.huati {
  padding: 0 40 / @base 20 / @base;
  .shamei {
    width: 100%;
    img {
      width: 70%;
      height: 400 / @base;
      margin: 50 / @base auto;
    }
    p {
      font-size: 35 / @base;
      color: #717171;
      text-align: center;
    }
  }
  .item {
    padding-top: 20 / @base;

    .topnav {
      img {
        display: inline-block;
        width: 37 / @base;
        height: 45 / @base;
        vertical-align: sub;
      }
      .remen {
        position: relative;
        top: -3px;
        color: #333;
        font-size: 32 / @base;
        font-weight: 700;
        vertical-align: sub;
      }
      .more {
        font-size: 24 / @base;
        color: #707070;
        margin-top: 24 / @base;
      }
    }
    ul {
      padding: 35 / @base 0 48 / @base 0 / @base;
      li {
        position: relative;
        margin-top: 30 / @base;
        &:first-child {
          margin-top: 0 / @base;
        }
        //  i{
        //     position:absolute;
        //     bottom: 0;
        //     right: 0/@base;
        //     font-size: 30/@base;
        //   }
        .pic {
          img {
            width: 138 / @base;
            height: 135 / @base;
          }
        }
        .des {
          margin-left: 160 / @base;
          font-size: 0;
          .title {
            font-size: 30 / @base;
            span {
              color: #b295db;
            }
          }
          p {
            font-size: 18 / @base;
            color: #333;
          }
          .talk {
            display: block;
            margin-top: 8px;
            color: #b295db;
            font-size: 18 / @base;
          }
        }
      }
    }
  }
}
</style>