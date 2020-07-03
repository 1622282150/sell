<template>
  <div class="commnet1">
    <Return>评论和@</Return>
    <div class="main">
      <ul>
        <li v-for="(item, index) in 3" :key="index">
          <img src="../../assets/images/message_xiaoxi.png" alt />
          <div class="jieshao">
            <p>小可爱</p>
            <span>评论了你的作品</span>
            <p class="time">2019-8-17</p>
          </div>
          <div class="btn">
            <img src="../../assets/images/gonglv_99.jpg" alt />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import Return from "../../components/Return.vue";
export default {
  components: {
    Return
  }
};
</script>

<style scoped lang='less'>
@base: 75rem;
.commnet1 {
  width: 100%;
  height: 100%;
}
.main {
  ul {
    border-top: 1 / @base solid #bfbfbf;
    li {
      position: relative;
      padding: 20 / @base 40 / @base;
      img {
        display: inline-block;
        width: 80 / @base;
        height: 80 / @base;
        border-radius: 50%;
        vertical-align: top;
      }
      .jieshao {
        position: relative;
        display: inline-block;
        margin-left: 10 / @base;
        font-size: 0;
        p {
          font-size: 30 / @base;
          color: #333;
        }
        span {
          font-size: 24 / @base;
          color: #707070;
        }
        .time {
          margin-top: 5 / @base;
          font-size: 18 / @base;
          color: #a5a5a5;
        }
      }
      .btn {
        position: absolute;
        right: 40 / @base;
        top: 22 / @base;
        img {
          width: 100 / @base;
          height: 100 / @base;
          border-radius: 12 / @base;
        }
      }
    }
  }
}
</style>
