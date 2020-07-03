<template>
  <div class="contain">
    <!-- 头部 -->
    <!-- <div class="header">
      <a href="#" class="left"></a>
      <div class="hot">
        <p>热门项目</p>
      </div>
      <a href="#" class="right"></a>
    </div>-->
    <Head :show="true" color="#383838">热门项目</Head>

    <!-- banner -->

    <div class="banner">
      <img src="../assets/images/p.jpg" alt />
    </div>

    <!-- list -->
    <!-- list -->
    <div class="list">
      <ul class="clearfix">
        <li class=".left">
          <a href="#">
            <img src="../assets/images/d.jpg" alt />
            <div class="main">
              <p>除皱美白项目</p>
              <div class="choose">美白 | 除皱 | 美肌</div>
              <div class="price">
                ¥
                <span class="money">1280</span>
                <span class="much">45人付款</span>
                <span class="city">杭州</span>
              </div>
              <div class="detail">
                <span>杭州静博士美容美体</span>
                <span class="de">详情 ></span>
              </div>
            </div>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="../assets/images/d.jpg" alt />
            <div class="main">
              <p>除皱美白项目</p>
              <div class="choose">美白 | 除皱 | 美肌</div>
              <div class="price">
                ¥
                <span class="money">1280</span>
                <span class="much">45人付款</span>
                <span class="city">杭州</span>
              </div>
              <div class="detail">
                <span>杭州静博士美容美体</span>
                <span class="de">详情 ></span>
              </div>
            </div>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="../assets/images/d.jpg" alt />
            <div class="main">
              <p>除皱美白项目</p>
              <div class="choose">美白 | 除皱 | 美肌</div>
              <div class="price">
                ¥
                <span class="money">1280</span>
                <span class="much">45人付款</span>
                <span class="city">杭州</span>
              </div>
              <div class="detail">
                <span>杭州静博士美容美体</span>
                <span class="de">详情 ></span>
              </div>
            </div>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="../assets/images/d.jpg" alt />
            <div class="main">
              <p>除皱美白项目</p>
              <div class="choose">美白 | 除皱 | 美肌</div>
              <div class="price">
                ¥
                <span class="money">1280</span>
                <span class="much">45人付款</span>
                <span class="city">杭州</span>
              </div>
              <div class="detail">
                <span>杭州静博士美容美体</span>
                <span class="de">详情 ></span>
              </div>
            </div>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="../assets/images/d.jpg" alt />
            <div class="main">
              <p>除皱美白项目</p>
              <div class="choose">美白 | 除皱 | 美肌</div>
              <div class="price">
                ¥
                <span class="money">1280</span>
                <span class="much">45人付款</span>
                <span class="city">杭州</span>
              </div>
              <div class="detail">
                <span>杭州静博士美容美体</span>
                <span class="de">详情 ></span>
              </div>
            </div>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="../assets/images/d.jpg" alt />
            <div class="main">
              <p>除皱美白项目</p>
              <div class="choose">美白 | 除皱 | 美肌</div>
              <div class="price">
                ¥
                <span class="money">1280</span>
                <span class="much">45人付款</span>
                <span class="city">杭州</span>
              </div>
              <div class="detail">
                <span>杭州静博士美容美体</span>
                <span class="de">详情 ></span>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
/*eslint-disable*/
import Head from "../components/Header";
export default {
  components: {
    Head
  }
};
</script>
<style lang="less" scoped>
@desgin: 750;
@base: 75rem;
.contain {
  width: 100%;
  height: 10000px;
}

.banner {
  img {
    height: 310 / @base;
  }
}

.list {
  padding: 0 20 / @base;
  padding-top: 20 / @base;
  ul {
    li {
      float: left;
      width: 345 / @base;
      border: 1 / @base solid #ccc;
      border-radius: 20 / @base;
      padding-bottom: 18 / @base;
      margin-bottom: 20 / @base;

      &:nth-child(even) {
        float: right;
        img {
          height: 377 / @base;
        }
      }
      a {
        img {
          height: 285 / @base;
          border-radius: 20 / @base 20 / @base 0 0;
        }
        .main {
          padding-left: 18 / @base;
          padding-right: 22 / @base;
          p {
            font-size: 26 / @base;
            color: #202020;
            margin-top: 10 / @base;
          }
          .choose {
            margin-top: 10 / @base;
            font-size: 20 / @base;
            color: #999;
          }
          .price {
            margin-top: 10 / @base;
            font-size: 26 / @base;
            color: #e40000;

            .money {
              font-size: 36 / @base;
            }
            .much {
              font-size: 20 / @base;
              color: #999;
              margin-right: 42 / @base;
              margin-left: 5 / @base;
            }
            .city {
              font-size: 20 / @base;
              color: #999;
            }
          }
          .detail {
            margin-top: 10 / @base;
            font-size: 20 / @base;
            color: #999;
            .de {
              color: #202020;
              margin-left: 10 / @base;
            }
          }
        }
      }
    }
  }
}
</style>


