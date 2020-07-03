<template>
  <div>
    <div class="header">
      <i
        @click="back()"
        style="position:absolute;left:20px;"
        class="iconfont icon-zuojiantou"
      ></i>
      <span>达人推荐</span>
    </div>
    <div class="bu"></div>
    <!-- banner -->
    <img
      v-if="name === '面部修容'"
      class="banner"
      src="../../assets/images/showcase_daren_mian.png"
      alt
    />
    <img
      v-else-if="name === '眉妆'"
      class="banner"
      src="../../assets/images/showcase_daren_mei.png"
      alt
    />
    <img
      v-else-if="name === '眼妆'"
      class="banner"
      src="../../assets/images/showcase_daren_yan.png"
      alt
    />
    <img
      v-else-if="name === '鼻妆'"
      class="banner"
      src="../../assets/images/showcase_daren_bi.png"
      alt
    />
    <img
      v-else-if="name === '唇妆'"
      class="banner"
      src="../../assets/images/showcase_daren_chun.png"
      alt
    />
    <img v-else class="banner" src="../../assets/images/showcase_daren_di.png" alt />

    <!-- 内容 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadmore">
      <div class="ull">
        <div class="lii" v-for="(item,index) in data" :key="index">
          <div class="pic">
            <img
              v-show="item.Type == 'VideoArticle'"
              class="img_video"
              src="../../assets/images/community_video.png"
              alt
            />
            <img
              class="img"
              v-if="item.ArticleImg"
              @click="toarticle(item.Type,item.ArticleId)"
              :src="item.ArticleImg"
              alt
            />
            <img
              class="img"
              v-else
              @click="toarticle(item.Type,item.ArticleId)"
              src="../../assets/images/community_listbg.jpg"
              alt
            />
          </div>
          <div class="bottom">
            <p @click="toarticle(item.Type,item.ArticleId)">{{item.ArticleTitle}}</p>
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
                  src="../../assets/images/community_listbg.jpg"
                  alt
                />
                <span @click="lookother(item.UserId)">{{item.UserName|communityname}}</span>
              </div>
              <div @click="zanone(item.ArticleId,index)" class="zan" v-if="item.IsLiked===0">
                <img src="../../assets/images/community_dianzan.png" alt />
                <!-- <img v-else src="../../assets/images/community_yizan.png" alt /> -->
                <span>
                  <!-- 100.5w -->
                  <!-- <i class="iconfont icon-thumbup"></i> -->
                  {{item.LikedCount}}
                </span>
              </div>
              <div @click="nozanone(item.ArticleId,index)" class="zan" v-else>
                <img src="../../assets/images/community_yizan.png" alt />
                <!-- <img v-else src="../../assets/images/community_yizan.png" alt /> -->
                <span>
                  <!-- 100.5w -->
                  <!-- <i class="iconfont icon-thumbup"></i> -->
                  {{item.LikedCount}}
                </span>
              </div>
            </div>
            <div v-show="item.AttentionFlag" class="isyi">
              <img src="../../assets/images/community_yiguanzhu.png" alt />
              <div>已关注</div>
            </div>
          </div>
        </div>
      </div>
    </van-list>
    <!-- 底部按钮 -->
    <div class="btn" @click="getmore">查看其他更多精彩内容</div>
  </div>
</template>

<script>
import { Dialog, Toast, PullRefresh } from "vant";
import request from "@/utils/request";
export default {
  data() {
    return {
      name: "",
      key: "",
      page: 1,
      loading: false,
      finished: false,
      data: []
    };
  },
  created() {
    this.name = this.$route.query.name;
    this.key = this.name;
  },
  mounted() {
    this.gettuijian();
  },
  methods: {
    back(){
       console.log('我是子组件返回')
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        // on close
        console.log("我是要去安卓");
        // let url='http://test1.merrychange.net/#/articlestie?id='+this.articleid
        window.android.closePage();
        this.$router.back();
      }else{
        this.$router.back(-1)
      }
    },
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
        var url = this.$domain.url+"otherself?id=" + id;
        console.log(url);
        window.android.openNewPage(url);
        // this.$router.push({
        //   path: "/otherself",
        //   query: {
        //     id: id
        //   }
        // });
      } else if (isiOS) {
        console.log("我是要去ios");
        let url = this.$domain.url+"otherself?id=" + id;
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
      } else {
        console.log("我不是安卓也不是ios,我在哪");
      }
    },
    // 上拉加载
    loadmore() {
      console.log("我被出发了");
      this.loading = true;
      this.page += 1;
      setTimeout(() => {
        this.gettuijian();
      }, 400);
    },
    gettuijian() {
      request
        .post(this.$api + "/mobile/GetArticleInfoList", {
          keyword: this.key,
          Page: this.page,
          Rows: 8
        })
        .then(res => {
          this.loading = false;
          if (res.Data.List.length) {
            var arr = res.Data.List;
            for (let i = 0; i < arr.length; i++) {
              this.data.push(arr[i]);
            }
          } else {
            this.finished = true;
          }
        })
        .catch(err => {});
    },
    toarticle(type, id) {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (type != "VideoArticle") {
        console.log("不去视频");
        console.log("走详情" + id);
        if (isAndroid) {
          console.log("我是要去安卓");
          // window.android.goToHome()
          let url = this.$domain.url+"articlestie?id=" + id;
          console.log(url);
          window.android.openNewPage(url);
        } else {
          console.log("我是要去ios");
          let url = this.$domain.url+"articlestie?id=" + id;
          console.log(url);
          this.$bridge.callhandler("openNewPage", url, data => {
            // 处理返回数据
          });
          this.$router.push({
            path: "/ArticlesTie",
            query: {
              id: id
            }
          });
        }
      } else {
        console.log("去视频");
        console.log("走视频" + id);
        if (isAndroid) {
          console.log("我是要去安卓" + id);
          // window.android.goToHome()
          window.android.goVideo(id);
        } else if (isiOS) {
          let videourl = "mqjapp://goVideo:" + id;
          console.log("我是要去ios" + videourl);
          window.location.href = videourl;
        } else {
          console.log("我在浏览器");
        }
      }
    },
    getmore() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      // 跳社区
      if (isAndroid) {
       window.android.Tocommunity()
        this.$router.push("/community");
      } else {
        this.$bridge.callhandler("Tocommunity", url, data => {
          // 处理返回数据
        });
        this.$router.push("/community");
      }
    }
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
.header {
  position: relative;
  width: 100%;
  height: 120 / @base;
  line-height: 120 / @base;
  text-align: center;
  font-size: 35 / @base;
  //   border-bottom: 1 / @base solid #ccc;
  position: fixed;
  top: 0;
  background: #fff;
  z-index: 11;
  i {
    font-size: 25px;
  }
}
.bu {
  width: 100%;
  height: 120 / @base;
}
.banner {
  width: 100%;
  height: 295 / @base;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.ull {
  width: 100%;
  padding: 32 / @base 20 / @base 20 / @base 20 / @base;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .lii {
    width: 345 / @base;
    height: 520 / @base;
    background-color: #fff;
    border-radius: 12 / @base;
    // border: 2px solid #f0f0f0;
    box-shadow: 0px 0px 5px 1px #c4c3c6;
    margin-bottom: 20 / @base;
    // border-radius: 12px 12px 12px 12px;
    // box-shadow: 2 / @base 2 / @base 12 / @base rgba(0, 0, 0, 0.2);
    // border: 1px solid red;
    // &:nth-child(even) {
    //   float: right;
    // }
    .pic {
      position: relative;
      width: 100%;
      height: 300 / @base;
      overflow: hidden;
      .img {
        width: 100%;
        height: auto;
        // max-hei/ght: 500 / @base;
        background-size: 100% 100%;
      }
      .img_video {
        position: absolute;
        right: 15 / @base;
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
            margin-left: 8/@base;
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
.btn {
  width: 600 / @base;
  height: 80 / @base;
  line-height: 80 / @base;
  text-align: center;
  border-radius: 40 / @base;
  background-image: linear-gradient(-45deg, #b18ce4 0%, #c39bff 100%);
  color: #fff;
  font-size: 30 / @base;
  margin: 80 / @base auto;
}
</style>