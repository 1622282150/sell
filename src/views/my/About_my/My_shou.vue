<template>
  <div>
    <header>
      <i @click="goback()" class="iconfont icon-zuojiantou"></i>
      <div class="head">收藏</div>
    </header>
    <div class="bu"></div>
    <div class="nianxing">
      <div class="tab">
        <div
          class="tab_item"
          @click="sel_tab(index)"
          :class="active_index===index?'active':''"
          v-for="(item,index) in  titlelist"
          :key="index"
        >{{item}}</div>
      </div>
      <!-- <tab bar-active-color='#B99AEB' active-color='#5C5C5C' :scroll-threshold="5">
      <tab-item @on-item-click="handler"  v-for="(n,index) in  titlelist" :key="index" :selected="index===0">{{ n }}</tab-item>
      </tab>-->
    </div>
    <!-- 内容部分 -->
    <!-- 收藏文章部分 -->
    <div class="main" v-if="active_index === 0">
      <van-list v-model="loading1" :finished="finished1" finished-text="没有更多了" @load="onLoad1">
        <div
          @click="todetail(item.ArticleId,'/articlesdetail')"
          v-for="(item,index) in jingimg"
          :key="index"
        >
          <div class="item">
            <div class="img"><img  :src="item.ArticleImage" alt /></div>
            <div class="mei">
              <p class="top">{{item.Title}}</p>
              <p class="bottom" v-show="item.Description">{{item.Description}}</p>
            </div>
            <div class="face">
              <div class="pic clearfix">
                <div class="left fl">
                  <img v-if="item.UserAvatar" :src="item.UserAvatar" alt />
                  <img v-else src="../../../assets/images/article_touxiang.jpg" alt />
                  <span v-if="item.UserName">{{item.UserName}}</span>
                  <span v-else>小糊涂</span>
                </div>
                <div class="right fr">
                  <img src="../../../assets/images/article_shou.png" alt class="good" />
                  {{item.LikedCount}}
                  <img
                    src="../../../assets/images/article_xiaoxi.png"
                    class="mess"
                    alt
                  /> {{item.Rcount}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <!-- 帖子 -->
    <div class="tuijian" v-else-if="active_index === 1">
      <div class="container-water-fall">
        <!-- <div @click="loadmore">加载更多</div> -->

        <waterfall :col="2" :data="data" @loadmore="loadmore">
          <template>
            <div class="lii" v-for="(item,index) in data" :key="index">
              <div class="pic">
                <img
                  v-show="item.Type == 'VideoArticle'"
                  class="img_video"
                  src="../../../assets/images/community_video.png"
                  alt
                />
                <img
                  class="img"
                  v-if="item.ArticleImage"
                  @click="todetail(item.ArticleId,'/articlestie')"
                  :lazy-src="item.ArticleImage"
                  alt
                />
                <img
                  class="img"
                  v-else
                  @click="todetail(item.ArticleId,'/articlestie')"
                  src="../../../assets/images/community_listbg.jpg"
                  alt
                />
              </div>
              <div class="bottom">
                <p @click="todetail(item.ArticleId,'/articlestie')">{{item.Title}}</p>
                <div class="avtart">
                  <div class="divv">
                    <img
                      class="avimg"
                      @click="otherself(item.UserId)"
                      v-if="item.UserAvatar"
                      :src="item.UserAvatar"
                      alt
                    />
                    <img
                      class="avimg"
                      @click="otherself(item.UserId)"
                      v-else
                      src="../../../assets/images/community_listbg.jpg"
                      alt
                    />
                    <span @click="otherself(item.UserId)">{{item.UserName|communityname}}</span>
                  </div>
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
        <!-- 在加载中AA -->
      </div>
    </div>
    <!-- 收藏话题部分 -->
    <div class="huati" v-else-if="active_index === 2">
      <div class="item">
        <!-- <div class="topnav">
              <img src="../../../assets/images/icon3.png" alt />
              <span class="remen">热门话题</span>
              <span class="more fr" @click="to_more()">更多></span>
        </div>-->
        <ul>
          <van-list v-model="loading3" :finished="finished3" finished-text="没有更多了" @load="onLoad3">
            <li
              @click="todetail(item.ArticleId,'/articleshua')"
              class="clearfix"
              v-for="(item,index) in hualist"
              :key="index"
            >
              <div v-if="item.ArticleImage" class="pic fl">
                <img :src="item.ArticleImage" alt />
              </div>
              <div v-else class="pic fl">
                <img src="../../../assets/images/huati-huati.jpg" alt />
              </div>
              <div class="des">
                <div class="title">
                  <span>#</span>
                  {{item.Title}}
                </div>
                <p>{{item.Description|articleTitle}}</p>
                <span class="talk">{{item.Rcount}}人参与讨论</span>
              </div>
            </li>
          </van-list>
        </ul>
      </div>
    </div>
    <!-- 444 -->
    <div class="list" v-else-if="active_index === 3">
      <van-list v-model="loading4" :finished="finished4" finished-text="没有更多了" @load="onLoad4">
        <ul>
          <li
            @click="todetail(item.CommodityId,'/product_detail')"
            v-for="(item, index) in shangpinlist"
            :key="index"
          >
            <img v-if="item.BannerImg" :src="item.BannerImg" alt />
            <img v-else src="../../../assets/images/list.jpg" alt />
            <div class="bottom">
              <!-- <p>盛大收购大红色的乖哈岁的干啥</p> -->
              <p>{{item.Name }}</p>
              <!-- <p>的撒韩国的</p> -->
              <!-- <div class="des">{{item.Description|renMenLength}}</div> -->
              <div class="price clearfix">
                <span class="qian fl">
                  <span class="ren">¥</span>
                  {{item.Price}}
                </span>
                <span class="num fr">
                  <i class="iconfont icon-hot"></i>
                 {{item.Popularity}}
                </span>
              </div>
              <!-- <div class="baoyou">包邮</div> -->
            </div>
          </li>
        </ul>
      </van-list>
    </div>
    <!-- 555 -->
    <div class="list" v-else-if="active_index === 4">
      <van-list v-model="loading5" :finished="finished5" finished-text="没有更多了" @load="onLoad5">
        <ul>
          <li
            @click="todetail(item.CommodityId,'/details')"
            v-for="(item, index) in xiangmulist"
            :key="index"
          >
            <img v-if="item.BannerImg" :src="item.BannerImg" alt />
            <img v-else src="../../../assets/images/list.jpg" alt />
            <div class="bottom">
              <!-- <p>盛大收购大红色的乖哈岁的干啥</p> -->
              <p>{{item.Name }}</p>
              <!-- <p>的撒韩国的</p> -->
              <!-- <div class="des">{{item.Description|renMenLength}}</div> -->
              <div class="price clearfix">
                <span class="qian fl">
                  <span class="ren">¥</span>
                  {{item.Price}}
                </span>
                <span class="num fr">
                  <!-- <i class="iconfont icon-hot"></i> -->
                  {{item.BuyerCount}}付款
                </span>
              </div>
              <!-- <div class="baoyou">包邮</div> -->
            </div>
          </li>
        </ul>
      </van-list>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
// import { Tab, Tabs } from "vant";
import Return from "../../../components/Return";
export default {
  components: {
    Return
  },
  data() {
    return {
      data: [], //帖子
      active_index: 0,
      titlelist: ["文章", "帖子", "话题", "好货", "项目"],
      page1: 1,
      loading1: false,
      finished1: false,
      page2: 1,
      loading2: false,
      finished2: false,
      page3: 1,
      loading3: false,
      finished3: false,
      page4: 1,
      loading4: false,
      finished4: false,
      jingimg: [],
      tuijianlist: [],
      hualist: [],
      shangpinlist: [],
      page5: 1,
      loading5: false,
      finished5: false,
      xiangmulist:[]
    };
  },
  created() {
    this.getjing();
    this.gettuijian();
    this.gethuati();
    this.GetCommodityInfoList();
    this.GetxiangmuList()
  },
  methods: {
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
        let url = this.$domain.url+"my_shou";
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
    sel_tab(index) {
      this.active_index = index;
    },
    handler(index) {
      console.log(index);
    },
    // 公用方法  去别人的主页
    otherself(id) {
      this.$router.push({
        path: "/otherself",
        query: {
          id: id
        }
      });
    },
    //上拉加载
    onLoad1() {
      // 异步更新数据

      this.page1 += 1;
      this.getjing();
    },
    onLoad2() {
      // 异步更新数据

      this.page2 += 1;
      this.gettuijian();
    },
    onLoad3() {
      this.page3 += 1;
      this.gethuati();
    },

    onLoad4() {
      // 异步更新数据

      this.page4 += 1;
      this.GetCommodityInfoList();
    },
     onLoad5() {
      // 异步更新数据

      this.page5 += 1;
      this.GetxiangmuList();
    },
    loadmore() {
      console.log("我被出发了");
      
      this.page2 += 1;
      setTimeout(() => {
        this.gettuijian();
      }, 100);
    },
    gettuijian() {
      request
        .post(this.$api + "/mobile/MyFavoriteArticleList", {
          Page: this.page2,
          Rows: 6,
          Sort: "Id",
          Order: "asc"
        })
        .then(res => {
          // this.tuijianlist = res.Data.List;
          if (res.Data.ListData.length) {
            var arr = res.Data.ListData;
            for (let i = 0; i < arr.length; i++) {
              this.data.push(arr[i]);
            }
          } else {
          }
        })
        .catch(err => {});
    },
    gethuati() {
      request
        .post(this.$api + "/mobile/MyFavoriteTopicList", {
          Page: this.page3,
          Rows: 10,
          Sort: "Id",
          Order: "asc"
        })
        .then(res => {
          // this.list = res.Data.List;
          this.loading3 = false;
          if (res.Data.ListData.length) {
            var arr = res.Data.ListData;
            for (let i = 0; i < arr.length; i++) {
              this.hualist.push(arr[i]);
              console.log(this.hualist)
            }
          } else {
            this.finished3 = true;
          }
        })
        .catch(err => {});
    },
    getjing() {
     request
        .post(this.$api + "/mobile/MyFavoriteIndexArticleList", {
          Page: this.page1,
          Rows: 6,
          Sort: "Id",
          Order: "asc"
        })
        .then(res => {
          // this.jingimg=res.data.Data.List
          this.loading1 = false;
          if (res.Data.ListData.length) {
            var arr = res.Data.ListData;
            for (let i = 0; i < arr.length; i++) {
              this.jingimg.push(arr[i]);
            }
          } else {
            this.finished1 = true;
          }
        })
        .catch(err => {});
    },
    GetCommodityInfoList() {
      request
        .post(this.$api + "/mobile/MyFavoriteProductList", {
          Page: this.page4,
          Rows: 8,
          Order: "asc",
          Sort: "id"
          // Type:'CommodityTypeType'
        })
        .then(res => {
          // this.shangpinlist = res.Data.List
          // console.log(this.shangpinlist)
          this.loading4 = false;
          if (res.Data.ListData.length) {
            var arr = res.Data.ListData;
            for (let i = 0; i < arr.length; i++) {
              this.shangpinlist.push(arr[i]);
            }
            console.log(this.shangpinlist);
          } else {
            this.finished4 = true;
          }
          // console.log(res.Data.List.length)
        })
        .catch(err => {});
    },
    GetxiangmuList() {
      request
        .post(this.$api + "/mobile/MyFavoriteProjectList", {
          Page: this.page5,
          Rows: 8,
          Order: "asc",
          Sort: "id"
          // Type:'CommodityTypeType'
        })
        .then(res => {
          // this.shangpinlist = res.Data.List
          // console.log(this.shangpinlist)
          this.loading5 = false;
          if (res.Data.ListData.length) {
            var arr = res.Data.ListData;
            for (let i = 0; i < arr.length; i++) {
              this.xiangmulist.push(arr[i]);
            }
            console.log(this.shangpinlist);
          } else {
            this.finished5 = true;
          }
          // console.log(res.Data.List.length)
        })
        .catch(err => {});
    },
    // 去详情
    todetail(id, name) {
      this.$router.push({
        path: name,
        query: {
          id: id
        }
      });
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
.nianxing {
  width: 100%;
  position: sticky;
  z-index: 200;
   background: #fff;
  top: 50px;
  .tab {
    background: #fff;
    z-index: 200;
    display: flex;
    width: 100%;
    height: 90 / @base;
    border-bottom: 1px solid #e6e6e6;
    // background: red;
    .tab_item {
      width: 20%;
      height: 90 / @base;
      line-height: 90 / @base;
      text-align: center;
      font-size: 32 / @base;
      color: #333333;
    }
    .active {
      border-bottom: 5 / @base solid #b999eb;
    }
  }
}
// 收藏文章部分
.main {
  width: 100%;
  padding: 20 / @base 40 / @base;
  margin-bottom: 125 / @base;
  .head {
    padding-bottom: 28 / @base;
    border-bottom: 1px solid #ccc;
    margin-bottom: 36 / @base;
    font-size: 0;
    .jingx {
      font-size: 36 / @base;
      color: #434343;
    }
    .more {
      margin-top: 5 / @base;
      font-size: 24 / @base;
      color: #717171;
    }
  }
  .item {
    margin-bottom: 40 / @base;
    .img {
      position: relative;
      width: 100%;
      height: 279 / @base;
      border-radius: 20 / @base;
      overflow: hidden;
      img{
        position: absolute;
        top: 0;
        left: 0;
        background-size: 100% 100%;
        width: 100%;
        height: auto;
      }
    }
    .face {
      .left {
        font-size: 24 / @base;
        color: #4f4f4f;
        img {
          width: 60 / @base;
          height: 60 / @base;
          border-radius: 50%;
          display: inline-block;
          vertical-align: middle;
        }
      }
      .right {
        font-size: 24 / @base;
        color: #4f4f4f;
        img {
          width: 38 / @base;
          height: 38 / @base;
          display: inline-block;
          vertical-align: middle;
          margin-left: 20 / @base;
          &.mess {
            width: 32 / @base;
            height: 37 / @base;
          }
          &.good {
            width: 38 / @base;
            height: 35 / @base;
          }
        }
      }
    }
    .mei {
      .top {
        font-size: 36 / @base;
        color: #4f4f4f;
        line-height: 70 / @base;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; //行数
        -webkit-box-orient: vertical;
      }
      .bottom {
        font-size: 24 / @base;
        color: #929292;
        margin-bottom: 10 / @base;
      }
    }
  }
}

// 收藏帖子部
.tuijian {
  width: 100%;
  background-color: #fff;
  
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
}

//3
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
      padding: 35 / @base 0 48 / @base 0 / @base;
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
//4
.list {
  background-color: #fff;
  padding: 0 20 / @base;

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      width: 345 / @base;
      border-radius: 13 / @base;
      overflow: hidden;
      background-color: #fff;
      margin-top: 20 / @base;
      display: block;
      box-shadow: 0px 0px 5px 1px #c4c3c6;
      img {
        height: 350 / @base;
      }
      .bottom {
        padding: 18 / @base;
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          // color: rgb(60, 60, 60);
          font-size: 30 / @base;
        }
        .des {
          color: rgb(148, 148, 148);
          font-size: 24 / @base;
          margin: 12 / @base 0;
        }
        .price {
          color:red;
          .qian {
            font-size: 34 / @base;
            & .ren {
              font-size: 21 / @base;
              margin-right: 5 / @base;
            }
          }
          .num {
            margin-top: 5 / @base;
            color: #8e44ab;
            font-size: 12px;
          }
        }
        .baoyou {
          margin-top: 18 / @base;
          width: 70 / @base;
          height: 35 / @base;
          line-height:35 / @base;
          text-align: center;
          font-size: 12px;
          color: rgb(140, 7, 215);
          border: 1px solid rgb(140, 7, 215);
          border-radius: 8px;
        }
      }
    }
  }
}
</style>