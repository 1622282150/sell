<template>
  <div class="contain">
    <!-- 头部 -->
    <div class="header">
      <div class="hot">
        <p>上传企业审核资料</p>
      </div>
    </div>

    <div class="load">
      <div class="item">
        <van-uploader
          :before-read="beforeRead"
          v-model="fileList"
          multiple
          :max-count="1"
          capture
          :after-read="upload"
        />
        <p>请上传</p>
        <p>法人身份证正面</p>
      </div>
      <div class="item">
        <van-uploader v-model="fileList1" multiple :max-count="1" capture :after-read="upload" />
        <p>请上传</p>
        <p>法人身份证反面</p>
      </div>
      <div class="item">
        <van-uploader v-model="fileList2" multiple :max-count="1" capture :after-read="upload" />
        <p>请上传</p>
        <p>营业执照</p>
      </div>
      <div class="item">
        <van-uploader v-model="fileList3" multiple :max-count="1" capture :after-read="upload" />
        <p>请上传</p>
        <p>相关资料(选填)</p>
      </div>

      <div class="btn">
        <button @click="comfirm">点击提交</button>
      </div>
    </div>

    <!-- banner -->
  </div>
</template>
<script>
/*eslint-disable*/
export default {
  data() {
    return {
      fileList: [],
      fileList1: [],
      fileList2: [],
      fileList3: []
    };
  },
  methods: {
    upload(file) {
      console.log(file);
    },
    beforeRead(file) {
      console.log(file);
      if (!file.name) {
        return false;
      }
      return true;
    },
    comfirm() {
      if (
        this.fileList.length == 0 ||
        this.fileList1.length == 0 ||
        this.fileList2.length == 0
      ) {
        alert(43434);
        return;
      }
      alert("ok");
    }
  }
};
</script>
<style lang="less" scoped>
@desgin: 750;
@base: 75rem;
.contain {
  width: 100%;
  height: 10000 / @base;
}

.header {
  height: 88 / @base;
  width: 100%;
  background-color: #bd9feb;
  padding: 0 100 / @base;
  position: relative;
  .hot {
    p {
      text-align: center;
      font-size: 36 / @base;
      color: #fff;
      height: 88 / @base;
      line-height: 88 / @base;
    }
  }
}

.load {
  padding: 80 / @base;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .btn {
    border: none;
    position: absolute;
    top: 1035 / @base;
    left: 50%;
    transform: translateX(-50%);
    button {
      width: 500 / @base;
      height: 70 / @base;
      font-size: 30 / @base;
      color: #fff;
      line-height: 70 / @base;
      text-align: center;
      margin: 0 auto;
      background: #bd9feb;
      border: none;
      border-radius: 50 / @base;
    }
  }
  .item {
    text-align: center;
    font-size: 24 / @base;
    color: #3c3c33;
    position: relative;
    p {
      line-height: 50 / @base;
    }
  }
}
.load /deep/ .van-uploader__upload {
  border: 1 / @base solid #808080;
  width: 250 / @base;
  height: 250 / @base;
  border-radius: 10 / @base;
}
.load /deep/ .van-uploader__upload-icon {
  color: #bd9feb;
  font-size: 80 / @base;
}
.load /deep/ .van-uploader__preview-image {
  width: 250 / @base;
  height: 250 / @base;
  border-radius: 10 / @base;
  border: 1 / @base solid #808080;
  overflow: hidden;
}
</style>


