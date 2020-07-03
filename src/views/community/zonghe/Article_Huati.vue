<template>
  <div class="huati">
    <div class="item">
      <!-- <div class="topnav">
        <img src="../../../assets/images/icon3.png" alt />
        <span class="remen">热门话题</span>
        <span class="more fr" @click="$router.push('/huafen')">更多></span>
      </div> -->
      <ul>
<van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
        <li class="clearfix" v-for="(item,index) in list" :key="index" @click="tohuati(item.Type,item.ArticleId)">
          <div class="pic fl">
            <img :src="item.ArticleImg" alt />
          </div>
          <div class="des">
            <div class="title">
              <span>#</span>
              {{item.ArticleTitle}}
              
            </div>
            <!-- <p>{{item.Bewrite}}</p> -->
            <span class="talk">{{item.ClickCount}}参与讨论</span>
          </div>
        </li>
      </van-list>
      </ul>

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
       page:0,
       list: []
    };
  },
  mounted() {

     this.keyword = window.sessionStorage.getItem("keyword") || this.$route.query.name;
    console.log('keyword'+this.keyword)
    // this.gethuati();
  },
  methods: {
      tohuati(type,id){
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (type != "VideoArticle") {
        console.log("不去视频");
        console.log("走详情" + id);
        if (isAndroid) {
          console.log("我是要去安卓");
          // window.android.goToHome()
          let url = this.$domain.url+"articleshua?id=" + id;
          console.log(url);
          window.android.openNewPage(url);
          // this.$router.push({
          //   path: "/Articleshua",
          //   query: {
          //     id: id
          //   }
          // });
        } else {
          console.log("我是要去ios");
          let url = this.$domain.url+"articleshua?id=" + id;
          console.log(url);
          this.$bridge.callhandler("openNewPage", url, data => {
            // 处理返回数据
          });
          this.$router.push({
            path: "/Articleshua",
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
   onLoad() {
      // 异步更新数据

      this.page += 1;
      this.gethuati();
    },
    gethuati() {
      request
        .post(this.$api + "/mobile/GetTopicArticleInfoList", {
          Keyword:this.keyword,
          Page:this.page,
          Rows: 4,
          Sort: "Id",
          Order: "asc"
        })
        .then(res => {
          this.loading = false;
          if (res.Data.List.length) {
            var arr = res.Data.List;
            for (let i = 0; i < arr.length; i++) {
              this.list.push(arr[i]);
            }
            } else {
            this.finished = true;
            }
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped lang='less'>
@base:75rem;

.huati {
  margin-top: 200/@base;
  padding: 0 40 / @base 20 / @base;
}
.item {
  padding-top: 20 / @base;

  .topnav {
    img {
      display: inline-block;
      width: 37 / @base;
      height: 45 / @base;
      vertical-align: middle;
    }
    .remen {
      color: #333;
      font-size: 32 / @base;
      font-weight: 700;
      vertical-align: middle;
    }
    .more {
      font-size: 24 / @base;
      color: #707070;
      margin-top: 24 / @base;
    }
  }
  ul {
    // padding: 35 / @base 0 48 / @base 48 / @base;
    li {
      margin-top: 30 / @base;
      &:first-child {
        margin-top: 0 / @base;
      }
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
          color: #b295db;
          font-size: 18 / @base;
        }
      }
    }
  }
}
</style>