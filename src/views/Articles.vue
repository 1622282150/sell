<template>
  <div class="contain">
    <!-- 头部 -->

    <Head color="#383838" :show="true"></Head>

    <!-- banner -->
    <div class="banner">
      <!-- <img src="../assets/images/article_banner.jpg" alt /> -->
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
              <img src="../assets/images/article_touxiang.jpg" alt />
              <span class="lefttop">{{articleinfo.ArticleAuthor}}</span>
              <span class="leftmiddle">{{articleinfo.ArticleCreateDate| dateFormat}}</span>
              <span class="leftbottom">
                <i class="iconfont icon-yanjing"></i>&nbsp;300
              </span>
            </div>
            <div class="right">
              <span>关注</span>
            </div>
          </div>
          <!-- <p>关注微信公众号小糊涂 , &nbsp;一起来美白</p> -->
          <div class="des">
            <p v-html="articleinfo.ArticleContent"></p>
          </div>
        </div>
      </div>

      <div class="icon">
        <div class="left">
          <img src="../assets/images/article_aixin.png" alt />
        </div>
        <div class="right">
          <img src="../assets/images/article_shou.png" alt /> 200
          <img src="../assets/images/article_xiaoxi.png" alt /> 200
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import request from "@/utils/request";
/*eslint-disable*/
import Head from "../components/Header.vue";
export default {
  data() {
    return {
      articleid: "",
      articleinfo: []
    };
  },
  components: {
    Head
  },
  mounted() {
    this.articleid = this.$route.query.id;
    this.getdetail();
  },
  methods: {
    getdetail() {
      request
        .post(this.$api + "/mobile/GetArticleDetail?id=" + this.articleid)
        .then(res => {
          this.articleinfo = res.Data;
        })
        .catch(err => {});
    }
  }
};
</script>
<style lang="less" scoped>
@desgin: 750;
@base: 75rem;
.contain {
  width: 100%;
  // height: 1200/ @base;
}

.banner {
  img {
    height: 500 / @base;
  }
}

.comment {
  .bd {
    padding: 0 40 / @base;
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
        margin-top: 60 / @base;
        p {
          margin-top: 0;
          color: #333;
          font-size: 28 / @base;
          line-height: 45 / @base;
        }
        .img {
          margin: 60 / @base 0;

          img {
            margin: 0 auto;
            width: 448 / @base;
            height: 216 / @base;
          }
        }
      }
      .pic {
        position: relative;

        .left {
          position: relative;
          img {
            width: 60 / @base;
            height: 60 / @base;
            border-radius: 50%;
          }
          .lefttop {
            position: absolute;
            left: 80 / @base;
            top: -6 / @base;
            font-size: 20 / @base;
            color: black;
          }
          .leftmiddle {
            position: absolute;
            left: 80 / @base;
            top: 32 / @base;
            font-size: 5px;
            color: #a1a1a1;
          }
          .leftbottom {
            position: absolute;
            left: 80 / @base;
            top: 70 / @base;
            font-size: 5px;
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
      }
    }
  }

  .icon {
    position: relative;
    margin-top: 20 / @base;
    border-top: 1 / @base solid #e6e6e6;
    padding: 40 / @base 40 / @base 0;
    color: #a1a1a1;
    img {
      width: 42 / @base;
      height: 39 / @base;
      vertical-align: middle;
    }
    .right {
      line-height: 42 / @base;
      position: absolute;
      right: 40 / @base;
      top: 40 / @base;
      img {
        display: inline-block;
        margin-left: 30 / @base;
        margin-top: -15 / @base;
      }
    }
  }
}
</style>


