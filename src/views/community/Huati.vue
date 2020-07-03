<template>
  <div class="huati">
    <div class="item">
      <div class="topnav">
        <img src="../../assets/images/icon3.png" alt />
        <span class="remen">热门话题</span>
        <span class="more fr" @click="to_more()">更多></span>
      </div>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <ul>
        <van-list
          v-model="huati_loading"
          :finished="huati_finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <li
            class="clearfix"
            v-for="(item,index) in list"
            :key="index"
            @click="tohuati(item.Type,item.ArticleId)"
          >
            <div v-if="item.ArticleImg" class="pic fl">
              <img :src="item.ArticleImg" alt />
            </div>
            <div v-else class="pic fl">
              <img src="../../assets/images/huati-huati.jpg" alt />
            </div>
            <div class="des">
              <div class="title">
                <span>#</span>
                {{item.ArticleTitle}}
              </div>
              <p>{{item.Description|articleTitle}}</p>
              <!-- <p style="margin-top:6px">等哈技术大会卡仕达卡仕达卡实打实大苏啊实实打啊实打实的把上面的爸妈说算v大苏打实打实打沙发沙发法沙发沙发阿三仕达是</p> -->
              <span class="talk">{{item.Rcount}}人参与讨论</span>
            </div>
          </li>
        </van-list>
      </ul>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { PullRefresh } from 'vant';
import request from "@/utils/request";
/*eslint-disable*/
export default {
  data() {
    return {
      huati_loading: false,
      huati_finished: false,
       isLoading: false,
      list: [],
      page: 1
    };
  },
  mounted() {
    console.log(this.page)
    this.gethuati();
  },
  methods: {
    // 刷新
  onRefresh() {
      setTimeout(() => {
        this.page=1
        this.list=[]
        this.gethuati()
        // this.$toast('刷新成功');
        this.isLoading = false;
      }, 500);
    },
    // 进入话题分类页面
    to_more() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        console.log("我是要去安卓");
        // window.android.goToHome()
        var url = this.$domain.url+"huafen";
        console.log(url);
        window.android.openNewPage(url);
        //  this.$router.push("/huafen");
      } else if (isiOS) {
        console.log("我是要去ios");
        let url = this.$domain.url+"huafen";
        console.log(url);
        this.$bridge.callhandler("openNewPage", url, data => {
          // 处理返回数据
        });
        this.$router.push("/huafen");
        //  window.location.href
        //  window.location.href='mqjapp://home'
      } else {
        console.log("我不是安卓也不是ios,我在哪");
      }
    },
    // 进入话题详情
    tohuati(type, id) {
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
    //onload
    onLoad() {
      this.page += 1;
      this.gethuati();
    },
    gethuati() {
      request
        .post(this.$api + "/mobile/GetTopicArticleInfoList", {
          Page: this.page,
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
.huati {
  padding: 0 40 / @base 20 / @base;
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
      padding: 35 / @base 0 48 / @base 48 / @base;
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