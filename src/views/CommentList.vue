<template>
  <div class="contain">
    <!-- 头部 -->
    <!-- <div class="header">
      <a href="#" class="left"></a>
      <div class="hot">
        <p>评论列表</p>
      </div>
    </div>-->
    <Head color="#383838">评论列表</Head>
    <div class="comment">
      <div class="top">
        <img src="../assets/images/shoplist_title.jpg" alt />
        <div class="pro">
          <p>每晚6"30千更 | 孔冯春马池补补水喷雾9.9元,</p>
          <p>每晚6"30千更 | 孔冯春马</p>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="hotc">
        <h3>热门评论</h3>
        <div class="item">
          <div class="pic">
            <div class="face">
              <img src="../assets/images/shoplist_title.jpg" alt />
              <div class="name">
                <p class="mao">福利猫</p>
                <p class="time">12-24 18:35</p>
              </div>
              <div class="zan">
                <span>141</span>
                <img src="../assets/images/article_shou.png" alt />
              </div>
            </div>
          </div>
          <div class="com">付电话费电话费决定恢复健康的恢复的健康恢复防护等级发动机东方红郡</div>
          <div class="reply">
            <div class="re">
              <a href="#">
                <span class="replyname">茶茶</span>
                <span class="rel">回复</span>
                <span class="ownname">福利猫:</span>
                付电话费电话费决定恢复健康的恢复的健康恢复防护等级发动机东方红郡
                <div class="more">
                  <a href="#">全部49条评论 ></a>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="pic">
            <div class="face">
              <img src="../assets/images/shoplist_title.jpg" alt />
              <div class="name">
                <p class="mao">福利猫</p>
                <p class="time">12-24 18:35</p>
              </div>
              <div class="zan">
                <span>141</span>
                <img src="../assets/images/article_shou.png" alt />
              </div>
            </div>
          </div>
          <div class="com">付电话费电话费决定恢复健康的恢复的健康恢复防护等级发动机东方红郡</div>
          <div class="reply">
            <div class="re">
              <a href="#">
                <span class="replyname">茶茶</span>
                <span class="rel">回复</span>
                <span class="ownname">福利猫:</span>
                付电话费电话费决定恢复健康的恢复的健康恢复防护等级发动机东方红郡
                <div class="more">
                  <a href="#">全部49条评论 ></a>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="publish">
      <input type="text" placeholder="点此输入内容" />
      <button>评论</button>
    </div>
    <!-- banner -->
  </div>
</template>
<script>
/*eslint-disable*/
import Head from "../components/Header.vue";
export default {
  components: {
    Head
  }
};
</script>
<style lang="less" scoped>
@desgin: 750;
@base: 108rem;
.contain {
  width: 100%;
  height: 10000;
}

.header {
  border-bottom: 1 / @base solid #d8d8d8;
}

.comment {
  padding: 50 / @base 45 / @base;
  .top {
    padding: 30 / @base;
    background-color: #ebf0f3;
    position: relative;
    img {
      width: 105 / @base;
      height: 105 / @base;
    }
    .pro {
      position: absolute;
      left: 165 / @base;
      top: 30 / @base;
      p {
        line-height: 54 / @base;
        color: #323232;
        font-size: 32 / @base;
      }
    }
  }
}
.main {
  .hotc {
    h3 {
      color: #323232;
      font-size: 40 / @base;
      font-weight: 500;
      padding: 30 / @base 45 / @base;
    }
    .item {
      border-top: 1 / @base solid #d8d8d8;
      padding: 30 / @base 45 / @base;

      .pic {
        .face {
          position: relative;
          img {
            width: 104 / @base;
            height: 104 / @base;
            border-radius: 50%;
          }
          .name {
            position: absolute;
            left: 140 / @base;
            top: 0;
            .mao {
              font-size: 33 / @base;
              color: #6fc3c3;
              margin-bottom: 10 / @base;
            }
            .time {
              font-size: 30 / @base;
              color: #b4b4b4;
            }
          }
          .zan {
            position: absolute;
            right: 0;
            top: 0;
            color: #6fc3c3;

            img {
              width: 42 / @base;
              height: 39 / @base;
              display: inline-block;
              vertical-align: bottom;
            }
          }
        }
      }
      .com {
        font-size: 38 / @base;
        color: #323232;
        margin-top: 43 / @base;
        line-height: 60 / @base;
      }
      .reply {
        margin-top: 50 / @base;
        .re {
          a {
            display: block;
            font-size: 30 / @base;
            color: #b4b4b4;
            line-height: 50 / @base;

            .replyname {
              color: #6fc3c3;
            }
            .rel {
              color: #323232;
            }
            .ownname {
              color: #b4b4b4;
            }
            .more {
              margin-top: 10 / @base;
            }
          }
        }
      }
    }
  }
}

.publish {
  padding: 30 / @base 45 / @base;
  color: #999;
  font-size: 24 / @base;

  button {
    color: #6fc3c3;
    font-size: 33 / @base;
    background-color: #fff;
    border: none;
  }
  input {
    color: #999;

    width: 870 / @base;
    height: 87 / @base;
    background-color: #f2f2f2;
    border-radius: 50 / @base;
    padding-left: 55 / @base;
    margin-right: 35 / @base;
  }
}
</style>


