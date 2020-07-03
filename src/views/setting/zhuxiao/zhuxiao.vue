<template>
  <div>
    <header>
      <i @click="$router.back()" class="iconfont icon-zuojiantou"></i>
      <div class="head">注销申请</div>
    </header>
    <div class="bu"></div>
    <div class="box">
      <div class="title">选择注销原因</div>
      <van-radio-group @change="change" v-model="radio">
        <van-radio name="1" checked-color="#b695e9" icon-size="15px">有多个账号</van-radio>
        <van-radio name="2" checked-color="#b695e9" icon-size="15px">不想用魅千金了</van-radio>
        <van-radio name="3" checked-color="#b695e9" icon-size="15px">其他原因</van-radio>
      </van-radio-group>
      <van-field
        v-show="show"
        v-model="message"
        rows="3"
        autosize
        type="textarea"
        placeholder="请输入原因"
      />
      <van-uploader :after-read="afterRead" v-model="fileList" multiple :max-count="1" />
      <div class="btn" @click="zhuxiao">注销申请</div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import { RadioGroup, Radio, Toast, Field, Uploader } from "vant";
export default {
  data() {
    return {
      mobile: "",
      sign: "",
      fileList: [],
      radio: "1",
      message: "",
      name: "",
      show: false
    };
  },
  mounted() {
    this.mobile = this.$route.query.mobile;
    this.sign = this.$route.query.sign;
  },
  watch: {
    name(newVal, oldVal) {
      if (this.name == "3") {
        this.show = true;
      } else {
        this.show = false;
      }
    }
  },
  methods: {
    change(name) {
      console.log(name);
      this.name = name;
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    zhuxiao() {
      request
        .post(this.$api + "/appauth/DelAccount", {
          MobileNo: this.mobile,
          Sign: this.sign
        })
        .then(res => {
          if (res.IsSuccess) {
            Toast(res.Message);
            window.localStorage.removeItem("token");
            var u = navigator.userAgent;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
            if (isAndroid) {
              console.log("我是要去安卓");
              window.android.logOut();
            } else if (isiOS) {
              console.log("我是要去ios");
              window.location.href = "mqjapp://logout";
            } else {
              console.log("我不是安卓也不是ios,我在哪");
            }
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
@base: 75rem;
header {
  width: 100%;
  position: relative;
  // z-index: 10;
  i {
    position: fixed;
    left: 30 / @base;
    top: 30 / @base;
    font-size: 50 / @base;
    color: black;
    z-index: 11;
  }
  .head {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100 / @base;
    background: white;
    font-size: 35 / @base;
    text-align: center;
    line-height: 100 / @base;
    border-bottom: 1px solid #e6e6e6;
  }
}
.bu {
  width: 100%;
  height: 100 / @base;
}
.box {
  font-size: 15px;
  padding: 40 / @base;
  .title {
    font-size: 15px;
  }
  /deep/.van-radio {
    margin: 15px 0;
  }
}
.btn {
  width: 200 / @base;
  height: 60 / @base;
  font-size: 28 / @base;
  color: #ffffff;
  background: #b695e9;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40 / @base auto;
}
</style>