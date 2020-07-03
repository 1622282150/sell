<template>
  <div class="guanzhu">
    
      <div class="container-water-fall">
        <!-- <div @click="loadmore">加载更多</div> -->

        <waterfall :col="col" :data="tiezilist" @loadmore="loadmore">
          <template>
            <div class="lii" v-for="(item, index) in tiezilist" :key="index">
              <div class="pic" @click="toarticle(item.Type,item.ArticleId)">
                <img :src="item.ArticleImg" alt />
              </div>
              <div class="bottom">
                <p @click="toarticle(item.Type,item.ArticleId)">{{item.ArticleTitle}}</p>
                <div class="avtart">
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
                  <div @click="zanone(item.ArticleId,index)" class="zan" v-if="item.IsLiked===0">
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
</template>

<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      keyword: "",
      loading: false,
      finished: false,
      page: 1,
      tiezilist: [],
      loading: true,
      finished: false,
      col: 2,
     
    };
  },
  computed: {
    itemWidth() {
      return 133 * 0.5 * (document.documentElement.clientWidth / 375);
    },
    gutterWidth() {
      return 10 * 0.5 * (document.documentElement.clientWidth / 375);
    }
  },
  created() {
   
  },
  mounted() {
    this.keyword = window.sessionStorage.getItem("keyword") || this.$route.query.name;
    console.log('贴keyword' +this.keyword)
     this.gettuijian();
  },
  methods: {
    // 点赞
    zanone(id, index) {
      this.tiezilist[index].IsLiked = 1;
      this.tiezilist[index].LikedCount += 1;
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
      this.tiezilist[index].IsLiked = 0;
      this.tiezilist[index].LikedCount -= 1;
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
        //  this.$router.push({
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
          console.log("我是要去安卓");
          // window.android.goToHome()
          let url = this.$domain.url+"articlestie?id=" + id;
          console.log(url);
          window.android.openNewPage(url);
          // this.$router.push({
          //   path: "/ArticlesTie",
          //   query: {
          //     id: id
          //   }
          // });
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
    //上拉加载文章
    loadmore() {
      // 异步更新数据

       console.log("我被出发了");
      this.loading = true;
      this.page += 1;
      setTimeout(() => {
        this.gettuijian();
      },100);
    },
    gettuijian() {
      request
        .post(this.$api + "/mobile/GetArticleInfoList", {
          keyword: this.keyword,
          Page: this.page,
          Rows: 10
        })
        .then(res => {
         
          if (res.Data.List.length) {
            var arr = res.Data.List;
            for (let i = 0; i < arr.length; i++) {
              this.tiezilist.push(arr[i]);
            }
          } else {
            
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
.guanzhu {
  margin-top: 200 / @base;
  // margin-bottom: 75 / @base;
  width: 100%;
  height: 100%;
  // padding: 20 / @base;
  overflow: scroll;
  // background-color: #f5f5f5;
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

      // &:nth-child(even) {
      //   float: right;
      // }
      .pic {
        img {
          width: 100%;
          // height: 300 / @base;
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
          width: 100%;
          height: 60 / @base;
          // border: 1px solid red;
          position: relative;
          .avimg {
            position: absolute;
            left: 0;
            top: 10 / @base;
            width: 40 / @base;
            height: 40 / @base;
            border-radius: 50%;
          }
          span {
            position: absolute;
            left: 50 / @base;
            top: 0 / @base;
            height: 60 / @base;
            line-height: 60 / @base;
            // text-align: right;
            color: #717171;
            font-size: 18 / @base;
            // vertical-align: middle;
          }
          .zan {
            position: absolute;
            right: 0;
            top: 0;
            display: flex;
            width: 120 / @base;
            height: 60 / @base;
            // text-align: right;
            span {
              font-size: 20 / @base;
              position: absolute;
              left: 45 / @base;
              top: 0;
            }
            img {
              // z-index: 11;
              position: absolute;
              left: 10 / @base;
              top: 0 / @base;
              margin-top: 10 / @base;
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
</style>