<template>
  <div class="contain">
    <!-- 头部 -->

    <div class="header">
      <h3>企业合作</h3>
    </div>

    <div class="banner">
      <div class="icon"></div>
    </div>

    <div class="login">
      <form action>
        <div>
          <input type="text" placeholder="联系人" v-model="linkman" />
        </div>
        <div>
          <input type="text" placeholder="公司地址" v-model="address" />
        </div>
        <div>
          <input type="text" placeholder="手机号" v-model="number" />
        </div>
        <div>
          <input type="text" placeholder="公司名称" v-model="name" />
        </div>
        <div class="tips">
          <span v-show="tips" v-html="text"></span>
        </div>
        <div class="btn">
          <button @click="comfirm">下一步</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
/*eslint-disable*/
export default {
  data() {
    return {
      linkman: "",
      address: "",
      number: "",
      name: "",
      tips: false,
      text: ""
    };
  },
  methods: {
    comfirm() {
      if (!this.linkman || !this.address || !this.number || !this.name) {
        this.tips = true;
        this.text = "每行必填";
        return;
      } else if (
        !/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
          this.number
        )
      ) {
        this.tips = true;
        this.text = "手机号格式错误";
        return;
      }
      this.tips = false;
      this.linkman = "";
      this.address = "";
      this.number = "";
      this.name = "";
      this.$router.push('/check')
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
  background: url(../assets/images/backg.png);
}
.header {
  padding-top: 50 / @base;
  h3 {
    font-size: 40 / @base;
    color: #fff;
    text-align: center;
    font-weight: 300;
  }
}
.banner {
  padding-top: 135 / @base;
  padding-bottom: 145 / @base;
  .icon {
    width: 155 / @base;
    height: 155 / @base;
    border-radius: 50%;
    background: url(../assets/images/background.png);
    background-size: 100%;
    margin: 0 auto;
  }
}

.login {
  padding: 0 90 / @base;
  position: relative;
  div {
    border-bottom: 1 / @base solid #fff;
    input {
      padding-left: 10 / @base;
      font-size: 30 / @base;
      width: 550 / @base;
      height: 90 / @base;
      background-color: transparent;
    }
    ::-webkit-input-placeholder {
      color: rgba(255, 255, 255, 0.3);
      text-align: center;
    }
  }
  .btn {
    border: none;
    position: absolute;
    top: 490 / @base;
    button {
      width: 500 / @base;
      height: 70 / @base;
      font-size: 30 / @base;
      color: #fff;
      line-height: 70 / @base;
      text-align: center;
      margin: 0 auto;
      background: #8600c5;
      border: none;
      border-radius: 50 / @base;
    }
  }

  .tips {
    margin-top: 15 / @base;
    border: none;
    text-align: center;
    span {
      color: red;
      font-size: 24/@base;
    }
  }
}
</style>


