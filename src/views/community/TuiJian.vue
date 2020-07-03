<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="container-water-fall">
        <!-- <div @click="loadmore">加载更多</div> -->

        <waterfall :col="col" :data="data" @loadmore="loadmore">
          <template>
            <div class="lii" v-for="(item,index) in data" :key="index">
              <div class="pic">
                <img
                  v-show="item.Type == 'VideoArticle'"
                  class="img_video"
                  src="../../assets/images/community_video.png"
                  alt
                />
                <van-image
                  class="img"
                  @click="toarticle(item.Type,item.ArticleId)"
                  :src="item.ArticleImg"
                  alt
                >
                  <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                    <!-- <img src="../../assets/images/community_listbg.jpg" alt=""> -->
                  </template>
                </van-image>
                <!-- <img
                  class="img2"
                  @click="toarticle(item.Type,item.ArticleId)"
                  src="../../assets/images/community_listbg.jpg"
                  alt
                />-->
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
          </template>
        </waterfall>
        <!-- 在加载中AA -->
        <div v-show="loading" style="text-align:center">
          <van-loading size="24px">加载中...</van-loading>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import load from "../../views/common/loading.vue";
import { Dialog, Toast, PullRefresh, Image ,Loading} from "vant";
import request from "@/utils/request";
import { setTimeout } from "timers";
/*eslint-disable*/
export default {
  data() {
    return {
      // errorImg:'this.src="' + require('../../assets/images/community_listbg.jpg') + '"',//('../../assets/images/community_listbg.jpg')//'this.src="' + require('../../assets/img/timg.jpg') + '"'
      keyword: "",
      scrollTop: 0,
      // page: Math.floor(Math.random()*10+1),
      page: 1,
      loading: true,
      finished: false,
      col: 2,
      data: [],
      isLoading: false
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
    this.gettuijian();
  },
  mounted() {
    console.log(new Date().getTime())
    this.keyword = this.$route.query.name;
    // let win=window.localStorage.getItem('token')
    // Dialog({ message:'本地存的'+win });
  },
  // activated() {
  //   console.log(this.$route.from);
  //   console.log("weizhi" + this.scrollTop);
  //   window.scrollTo(0, this.scrollTop); //每次进入页面时滚轮位置在上次的位置
  //   //this.scrollTop = 0;
  //   window.addEventListener("scroll", this.handleScroll); //每次进入开启滚轮监听
  // },
  // deactivated() {
  //   //离开该页面时调用的方法
  //   console.log("离开");
  //   window.removeEventListener("scroll", this.handleScroll); //每次离开页面时去除这个监听
  // },
  methods: {
    test(params) {
      // Dialog.alert({
      //   message: params
      // }).then(() => {
      //   // on close
      // });
      window.localStorage.setItem("token", params);
      this.gettuijian2();
    },
    // xiala刷新
    onRefresh() {
      setTimeout(() => {
        // this.page = Math.floor(Math.random()*10+1);
        this.page = 1;
        this.data = [];
        this.gettuijian2();
        // this.$toast("刷新成功");
        this.isLoading = false;
      }, 500);
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
    // 上拉加载
    loadmore() {
      console.log("我被出发了");
      this.loading = true;
      this.page += 1;
      setTimeout(() => {
        this.gettuijian();
      }, 100);
    },
    gettuijian() {
      request
        .post(this.$api + "/mobile/RecommendArticleList", {
          tempUid :new Date().getTime(),
          // keyword: this.keyword || "",
          Page: this.page,
          Rows: 8
        })
        .then(res => {
          if (res.Data.List.length) {
            var arr = res.Data.List;
            for (let i = 0; i < arr.length; i++) {
              this.data.push(arr[i]);
            }
            this.loading = false;
          } else {
            this.loading = false;
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
    gettuijian2() {
      request
        .post(this.$api + "/mobile/RecommendArticleList", {
          // keyword: this.keyword || "",
          tempUid :new Date().getTime(),
          Page: this.page,
          Rows: 8
        })
        .then(res => {
          if (res.Data.List.length) {
            this.data = res.Data.List;
            this.loading = false;
          } else {
            this.loading = false;
          }
        })
        .catch(err => {});
    },
    //滚轮监听的方法
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.scrollTop = scrollTop;
      // console.log("我现在在" + this.scrollTop);
    }
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
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
      .img2 {
        width: 100%;
        height: 100 / @base;
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
</style>