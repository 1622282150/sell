<template>
  <div class="container">
    <div class="uploader">
      <span class="iconfont icon-shanchu"></span>
      <div class="loader">
        <van-uploader v-model="fileList" multiple :max-count="1" />
        <van-uploader v-model="fileList1" multiple :max-count="1" />
      </div>
    </div>

    <div class="topic">
      <div class="one">
        <p>加个标题会有更多赞哦~</p>
      </div>
      <div class="two">
        <p>一句话概括主题</p>
      </div>
      <div class="three">
        <p>说说此刻的心情...</p>
      </div>

      <div class="four clearfix">
        <div class="left fl">
          <span class="circle">
            <span class="iconfont icon-huati"></span>
          </span>
          <span>参与话题</span>
        </div>
        <div class="right fr">
          <div class="zan">
            <span class="iconfont icon-bulb icon"></span>
            <span>选择合适的话题会有更多赞哦</span>
          </div>
          <span class="iconfont icon-youjiantou"></span>
        </div>
      </div>

      <div class="five clearfix">
        <div class="left fl">
          <span class="iconfont icon-location location"></span>
          添加地点
        </div>
        <div class="right fr">
          <span class="iconfont icon-youjiantou"></span>
        </div>
      </div>
    </div>

    <div class="foot">
      <button>发布笔记</button>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  data() {
    return {
      fileList: [],
      fileList1: []
    };
  }
};
</script>
<style scoped lang='less'>
@base: 108rem;
.container {
  position: relative;
  width: 100%;
  padding: 0 48 / @base;
  padding-bottom: 100 / @base;
  background-color: #fff;
}
.uploader {
  padding-top: 100 / @base;
  span {
    font-size: 50 / @base;
    color: #969799;
    display: block;
    margin-bottom: 60 / @base;
  }
}
.loader {
  display: flex;
}

.uploader /deep/ .van-uploader {
  margin-right: 36 / @base;
}
.uploader /deep/ .van-uploader__upload {
  margin: 0;
  width: 270 / @base;
  height: 270 / @base;
}
.uploader /deep/ .van-uploader__preview-image {
  width: 270 / @base;
  height: 270 / @base;
}

.uploader /deep/ .van-uploader__upload-icon {
  font-size: 65 / @base;
}
.uploader /deep/ .van-image__error,
.van-image__img,
.van-image__loading {
  border-radius: 30 / @base;
}
.uploader /deep/ .van-uploader__preview {
  margin: 0;
}

.topic {
  font-size: 40 / @base;
  color: #999;
  padding-top: 65 / @base;
  letter-spacing: 2 / @base;
  .icon-youjiantou {
    font-weight: 700;
  }
  span {
    font-size: 40 / @base;
  }
  .one {
    padding-bottom: 38 / @base;
    border-bottom: 1 / @base solid #e6e6e6;
  }
  .two {
    padding: 68 / @base 0;
    border-bottom: 1 / @base solid #e6e6e6;
  }
  .three {
    padding: 34 / @base 0 262 / @base 0;
    border-bottom: 1 / @base solid #e6e6e6;
  }
  .four {
    padding: 54 / @base 0;
    border-bottom: 1 / @base solid #e6e6e6;
    span {
      font-size: 40 / @base;
      color: #999;
    }
    .left {
      padding-top: 8 / @base;
    }
    .circle {
      display: inline-block;
      width: 46 / @base;
      height: 46 / @base;
      line-height: 38 / @base;
      text-align: center;
      border-radius: 50%;
      background-color: #ccc;
      span {
        font-size: 28 / @base;
        color: #fff;
      }
    }
    .right {
      .zan {
        display: inline-block;
        height: 72 / @base;
        padding: 0 20 / @base;
        line-height: 64 / @base;
        letter-spacing: 0;
        border-radius: 50 / @base;
        background-color: #f5f5f5;
        span {
          color: #323232;
          font-size: 30 / @base;
        }
        .icon {
          margin-left: 10 / @base;
          color: yellow;
        }
      }
    }
  }
  .five {
    padding: 54 / @base 0;
    border-bottom: 1 / @base solid #e6e6e6;

    span {
      font-size: 40 / @base;
    }
    .location {
      font-size: 50 / @base;
    }
  }
}

.foot {
  margin: 0 auto;
  margin-top: 200 / @base;
  width: 665 / @base;
  height: 139 / @base;
  line-height: 139 / @base;
  text-align: center;
  color: #fff;
  button {
    width: 100%;
    height: 100%;
    border-radius: 100 / @base;
    border: none;
    font-size: 50 / @base;
    background-color: #b796e8;
  }
}
</style>