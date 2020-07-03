<template>
  <div>
    <!-- 文章页active-1 -->
    <van-list
      v-model="articleloading"
      :finished="articlefinished"
      finished-text="没有更多了"
      @load="articleonLoad"
    >
      <div class="article">
        <div class="article_list" v-for="(i,index) in articleinfo" :key="index">
          <div class="article_title" @click="toarticle(i.Type,i.ArticleId)">{{i.ArticleTitle|articleTitle}}</div>
          <!-- <div class="article_title">水光张面膜这些附着少时诵诗书所所少时用一生根本不会告诉你的看完再打</div> -->
          <div class="article_content" @click="toarticle(i.Type,i.ArticleId)">{{i.ArticleTitle|articleTitle}}</div>
          <img class="article_img" :src="i.ArticleImg" alt />
          <div class="article_author">
            <img @click="lookother(i.UserId)" :src="i.UserAvatar" alt />
            <span>{{i.UserName}}</span>
          </div>
          <div class="article_dianping">
            <img
              @click="zanone(i.ArticleId,index)"
              v-if="i.IsLiked==0"
              class="article_dianping_leftimg"
              src="../../../assets/images/article_shou.png"
              alt
            />
            <img @click="nozanone(i.ArticleId,index)" v-else class="article_dianping_leftimg" src="../../../assets/images/手2.png" alt />
            <span class="article_dianping_leftspan">{{i.LikedCount}}</span>
            <img
              class="article_dianping_rightimg"
              src="../../../assets/images/article_xiaoxi.png"
              alt
            />
            <span class="article_dianping_rightspan">{{i.Rcount}}</span>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import request from "@/utils/request";
import { Search, Tab, Tabs } from "vant";
export default {
  data() {
    return {
      keyword: "",
      articleloading: false,
      articlefinished: false,
      articlepage: 1,
      articleinfo: [] // 文章数组
    };
  },
  methods: {
     zanone(id, index) {
      this.articleinfo[index].IsLiked = 1;
      this.articleinfo[index].LikedCount += 1;
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
      this.articleinfo[index].IsLiked = 0;
      this.articleinfo[index].LikedCount -= 1;
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
     toarticle(type, id) {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (type != "VideoArticle") {
        console.log("不去视频");
        console.log("走详情" + id);
        if (isAndroid) {
           this.$router.push({
            path: "/articlesdetail",
            query: {
              id: id
            }
          });
        } else {
          this.$router.push({
            path: "/articlesdetail",
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
  //上拉加载文章
    articleonLoad() {
      // 异步更新数据

      this.articlepage += 1;
      this.getarticle();
    },
    //获取文章列表
    getarticle() {
      request
        .post(this.$api + "/mobile/GetArticleInfoList", {
          Keyword: this.keyword,
          Page: this.articlepage,
          Rows: 6
        })
        .then(res => {
          this.articleloading = false;
          if (res.Data.List.length) {
            var arr = res.Data.List;
            for (let i = 0; i < arr.length; i++) {
              this.articleinfo.push(arr[i]);
            }
          } else {
            this.articlefinished = true;
          }
        })
        .catch(err => {});
    }
  },
  mounted() {
    this.keyword = window.sessionStorage.getItem("keyword") || this.$route.query.name;
    console.log('文keyword' +this.keyword)
    this.getarticle();
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
// 文章页面active-1
.article {
  margin-top: 200 / @base;
  width: 100%;
  padding: 0 40 / @base;
  .article_list {
    position: relative;
    width: 100%;
    height: 300 / @base;
    padding: 30 / @base 0;
    border-bottom: 1px solid #e6e6e6;
    // display: flex;
    .article_title {
      font-size: 30 / @base;
      width: 80%;
      min-height: 40 / @base;
    }
    .article_content {
      margin-top: 15 / @base;
      font-size: 15 / @base;
      width: 80%;
      height: 80 / @base;
      color: #a1a1a1;
    }
    .article_img {
      position: absolute;
      right: 0;
      top: 40 / @base;
      display: inline-block;
      width: 120 / @base;
      height: 120 / @base;
      border-radius: 10px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .article_author {
      width: 60%;
      height: 60 / @base;
      line-height: 60 / @base;
      display: flex;
      position: absolute;
      left: 0;
      bottom: 30 / @base;
      // border-radius: 50%;
      img {
        display: inline-block;
        width: 60 / @base;
        height: 60 / @base;
        border-radius: 50%;
      }
      span {
        margin-left: 20 / @base;
        font-size: 14 / @base;
      }
    }
    .article_dianping {
      width: 38%;
      height: 60 / @base;
      line-height: 60 / @base;
      display: flex;
      position: absolute;
      right: 0;
      bottom: 30 / @base;
      .article_dianping_leftimg {
        display: inline-block;
        width: 50 / @base;
        height: 50 / @base;
      }
      .article_dianping_leftspan {
        font-size: 20 / @base;
        margin-left: 5 / @base;
        color: #c1c1c1;
      }
      .article_dianping_rightimg {
        display: inline-block;
        width: 50 / @base;
        height: 50 / @base;
        margin-left: 30 / @base;
      }
      .article_dianping_rightspan {
        font-size: 20 / @base;
        margin-left: 5 / @base;
        color: #c1c1c1;
      }
    }
  }
}
</style>