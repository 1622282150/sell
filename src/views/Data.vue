<template>
  <div class="contain">
    <Head>
      个人信息
      <span class="mima" @click="$router.push('/Reset')">修改密码</span>
    </Head>
    <div class="form">
      <div>
        <ul>
          <li class="first clearfix">
            头像
            <i class="iconfont icon-youjiantou fr"></i>
            <div class="fr img">
              <img src="../assets/images/p.jpg" alt />
            </div>
          </li>
          <li class="clearfix">
            姓名
            <i class="iconfont icon-youjiantou fr"></i>
            <span class="fr">县太爷</span>
          </li>
          <li class="clearfix">
            性别
            <i class="iconfont icon-youjiantou fr"></i>
            <span class="fr">女</span>
          </li>
          <li class="clearfix">
            生日
            <i class="iconfont icon-youjiantou fr"></i>
            <span class="fr">2019-08-09</span>
          </li>
          <li class="clearfix">
            爱好
            <i class="iconfont icon-youjiantou fr"></i>
            <span class="fr">此人很懒, 什么都没留下</span>
          </li>
          <li class="clearfix">
            个人介绍
            <i class="iconfont icon-youjiantou fr"></i>
            <span class="fr">此人很懒, 什么都没留下</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="submit">
      <button>提交</button>
    </div>
    <!-- banner -->
  </div>
</template>
<script>
/*eslint-disable*/
import "../fonts/iconfont.css";
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
  height: 10000px;
}

.header {
  border-bottom: 1px solid #ccc;
  .mima {
    position: absolute;
    right: 30 / @base;
  }
}

.form {
  font-size: 44 / @base;
  padding: 0 42 / @base 0 64 / @base;
  ul {
    li {
      height: 135 / @base;
      line-height: 135 / @base;
      border-bottom: 1 / @base solid #ccc;
      color: #333;

      i {
        font-size: 44 / @base;
        color: #888;
        margin-left: 30 / @base;
      }
      span {
        color: #9f9f9f;
      }
      .img {
        height: 220 / @base;
        line-height: 220 / @base;
        img {
          margin-top: 14 / @base;
          width: 180 / @base;
          height: 180 / @base;
          border-radius: 50%;
          vertical-align: middle;
        }
      }
    }
    & .first {
      height: 220 / @base;
      line-height: 220 / @base;
    }
  }
}

.submit {
  margin-top: 80 / @base;
  margin-top: 80 / @base;
  button {
    display: block;
    width: 900 / @base;
    height: 120 / @base;
    line-height: 120 / @base;
    text-align: center;
    background-color: #8f58a7;
    margin: 0 auto;
    font-size: 44 / @base;
    color: #fff;
  }
}
</style>


