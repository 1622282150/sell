<template>
  <div class="contain">
    <!-- 搜索 -->
    <Search></Search>
    <div class="nav">
      <ul>
        <li>
          <a href="#">
            <div class="say">
              <p>今天也是好心情</p>
            </div>
            <img src="../assets/images/aaaa.jpg" alt class="pp" />
            <div class="say2">
              <p>今天也是好心情</p>
            </div>
            <div class="piv">
              <div class="left">
                <img src="../assets/images/711.jpg" alt />
                <span>小可爱</span>
              </div>
              <div class="right">
                <img src="../assets/images/article_shou.png" alt class="s" />
                <span>200</span>
              </div>
            </div>
          </a>
        </li>
        <li>
          <a href="#">
            <div class="say">
              <p>今天也是好心情</p>
            </div>
            <img src="../assets/images/aaaa.jpg" alt class="pp" />
            <div class="say2">
              <p>今天也是好心天天也是好心情</p>
            </div>
            <div class="piv">
              <div class="left">
                <img src="../assets/images/711.jpg" alt />
                <span>小可爱</span>
              </div>
              <div class="right">
                <img src="../assets/images/article_shou.png" alt class="s" />
                <span>200</span>
              </div>
            </div>
          </a>
        </li>
        <li>
          <a href="#">
            <div class="say">
              <p>今天也是好心情</p>
            </div>
            <img src="../assets/images/aaaa.jpg" alt class="pp" />
            <div class="say2">
              <p>今天也是好心情</p>
            </div>
            <div class="piv">
              <div class="left">
                <img src="../assets/images/711.jpg" alt />
                <span>小可爱</span>
              </div>
              <div class="right">
                <img src="../assets/images/article_shou.png" alt class="s" />
                <span>200</span>
              </div>
            </div>
          </a>
        </li>
        <li>
          <a href="#">
            <div class="say">
              <p>今天也是好心情</p>
            </div>
            <img src="../assets/images/aaaa.jpg" alt class="pp" />
            <div class="say2">
              <p>今天也是好心天天也是好心情</p>
            </div>
            <div class="piv">
              <div class="left">
                <img src="../assets/images/711.jpg" alt />
                <span>小可爱</span>
              </div>
              <div class="right">
                <img src="../assets/images/article_shou.png" alt class="s" />
                <span>200</span>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <!-- 底部 -->
    <Tabbar></Tabbar>
  </div>
</template>
<script>
/*eslint-disable*/
import Tabbar from "../components/Tabbar";
import Search from "../components/Search";
export default {
  data() {
    return {};
  },
  components: {
    Tabbar,
    Search
  },
  async mounted(){ await this.fun2() },
  methods: {
    fun1() {
      let a = 3333;
      console.log(a,"aa");
      return a;
    },
    async fun2() {
      let a = await this.fun1();
      let b = 2;
      console.log(a,"bb");
    }
  }
};
</script>
<style lang="less" scoped>
@desgin: 750;
@base: 75rem;
.contain {
  width: 100%;
  margin: 0 auto;
  background-color: #fff;
  height: 2000px;
  padding-top: 88 / @base;
}

.nav {
  width: 100%;
  margin-top: 40 / @base;
  padding: 0 40 / @base;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: center;
    li {
      width: 325 / @base;
      height: 500 / @base;
      border-radius: 10 / @base;
      border: 1 / @base solid #ccc;
      margin-bottom: 20 / @base;
      &:nth-child(odd) {
        margin-top: -50 / @base;
        height: 450 / @base;
        &:first-child {
          margin-top: 0 / @base;
          height: 450 / @base;
        }
      }
      .say {
        font-size: 30 / @base;

        color: #3c3c3c;
        background-color: #f3eeff;
        height: 70 / @base;
        line-height: 70 / @base;
        padding-left: 20 / @base;
      }
      .say2 {
        font-size: 30 / @base;

        margin-top: 23 / @base;
        margin-bottom: 20 / @base;
        color: #3c3c3c;
        padding-left: 20 / @base;
      }
      .pp {
        height: 230 / @base;
      }
      .piv {
        padding: 0 20 / @base;
        .left {
          font-size: 20 / @base;
          float: left;
          img {
            width: 50 / @base;
            height: 50 / @base;
            border-radius: 50%;
            background-color: pink;
            display: inline-block;
            vertical-align: middle;
            margin-right: 5 / @base;
          }
        }
      }
    }
  }
}

.right {
  font-size: 10 / @base;
  float: right;
  .s {
    width: 36 / @base;
    height: 34 / @base;
    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
  }
  span {
    display: inline-block;
    vertical-align: middle;
    margin-right: 5 / @base;
    font-size: 20 / @base;
    margin-left: 10 / @base;
  }
}
</style>


