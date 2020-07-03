<template>
  <div>
    <div class="header">
      输入邀请码
      <img @click="back" class="img1" src="../../assets/images/newfan.png" alt />
    </div>
    <div v-if="!havecode" class="box">
      <div class="box_item">
        <p class="title">填写邀请码</p>
        <input v-model="code" type="text" placeholder="填写邀请码" />
        <div class="btn" @click="add">确定</div>
        <div class="line"></div>
        <p class="p1">
          *
          <span>温馨提示</span>*
        </p>
        <p class="p2">
          填写邀请码后即可获得
          <span>商城购物95折优惠特权</span>(不包含个人橱窗商品)
        </p>
      </div>
    </div>
    <div v-else class="box2">
      <img src="../../assets/images/code_dui.png" alt />
      <p class="have">您已绑定邀请码</p>
      <p class="p1">
        *
        <span>温馨提示</span>*
      </p>
      <p class="p2">
        填写邀请码后即可获得
        <span>商城购物95折优惠特权</span>(不包含个人橱窗商品)
      </p>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import { Toast } from "vant";
export default {
  data() {
    return {
      code: "",
      havecode: false //是否有
    };
  },
  mounted() {
    this.getcode();
  },
  methods: {
    back() {
      console.log("我是子组件返回");
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        // on close
        console.log("我是要去安卓");
        // let url='http://test1.merrychange.net/#/articlestie?id='+this.articleid
        window.android.closePage();
        this.$router.back();
      } else {
        this.$router.back(-1);
      }
    },
    getcode() {
      request
        .post(this.$api + "/mobile/CheckBindInviteCode", {})
        .then(res => {
          if (res.IsSuccess) {
            this.havecode = res.Data.Flag;
          } else {
            Toast(res.Message);
          }
        })
        .catch(err => {});
    },
    add() {
      request
        .post(this.$api + "/mobile/CompleteInvite", {
          InviteCode: this.code
        })
        .then(res => {
          if (res.IsSuccess) {
            console.log("邀请成功");
            this.havecode=true
          } else {
            Toast(res.Message);
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped lang='less'>
@base: 37.5rem;
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 56 / @base;
  font-size: 18px;
  color: #252525;
  letter-spacing: 0 / @base;
  z-index: 11;
  background: white;
  .img1 {
    position: absolute;
    top: 19 / @base;
    left: 13 / @base;
    width: auto;
    height: 21 / @base;
    background-size: 100% 100%;
  }
  i {
    position: absolute;
    top: 17 / @base;
    right: 16 / @base;
    font-size: 22px;
  }
}
.box {
  width: 100%;
  position: fixed;
  top: 56 / @base;
  bottom: 0;
  background: url("../../assets/images/setting_code_b.png") no-repeat;
  background-size: 100% 100%;
  .box_item {
    width: 351 / @base;
    background: #ffffff;
    border-radius: 10px;
    margin: 62 / @base auto auto auto;
    padding-top: 55 / @base;
    padding-bottom: 50 / @base;
    text-align: center;
    .title {
      font-size: 18px;
      font-weight: bold;
      font-stretch: normal;
      letter-spacing: 1px;
      color: #3c3c3c;
      margin-bottom: 28 / @base;
    }
    input {
      width: 299 / @base;
      height: 41 / @base;
      background-color: #dcdcdc;
      border-radius: 20px;
      opacity: 0.8;
      font-size: 14px;
      font-weight: bold;
      font-stretch: normal;
      letter-spacing: 3 / @base;
      color: #989898;
      text-align: center;
    }
    .btn {
      width: 120 / @base;
      height: 35 / @base;
      margin: 22 / @base auto 48 / @base auto;
      background-image: linear-gradient(90deg, #9441ff 0%, #ea9edf 100%);
      border-radius: 17 / @base;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: bold;
      font-stretch: normal;
      letter-spacing: 3px;
      color: #ffffff;
    }
    .line {
      width: 100%;
      height: 1px;
      border: dashed 1px #d2d2d2;
    }
    .p1 {
      margin-top: 35 / @base;
      font-size: 14px;
      font-weight: bold;
      font-stretch: normal;
      letter-spacing: 1px;
      color: #7301ff;

      span {
        color: #262626;
      }
    }
    .p2 {
      padding: 0 35 / @base;
      font-size: 14px;
      font-weight: bold;
      letter-spacing: 1px;
      color: #838383;
      span {
        color: #cd7ffc;
      }
    }
  }
}
.box2 {
  text-align: center;
  padding-top: 138 / @base;
  img {
    width: 71 / @base;
    height: 71 / @base;
    background-size: 100% 100%;
    margin: 0 auto;
  }
  .have {
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #3c3c3c;
    margin-top: 21 / @base;
  }
  .p1 {
    margin-top: 143 / @base;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #7301ff;

    span {
      color: #262626;
    }
  }
  .p2 {
    padding: 0 35 / @base;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
    color: #838383;
    span {
      color: #cd7ffc;
    }
  }
}
</style>