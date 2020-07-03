<template>
  <div>
    <div class="header">
      <i
        @click="$router.back()"
        style="position:absolute;left:20px;"
        class="iconfont icon-zuojiantou"
      ></i>
      <span>用户举报</span>
    </div>
    <div class="jicheng"></div>
    <div class="jvnei_title">内容违规</div>
    <div class="jvnei_item" @click="tojvnei(item.href)" v-for="(item,index) in jvnei" :key="index" v-if="index < 6">
      <span>{{item.text}}</span>
      <i class="iconfont icon-youjiantou"></i>
    </div>

    <div class="jvnei_title">账号违规</div>
    <div class="jvnei_item" @click="tojvnei(item.href)" v-for="(item,index) in jvnei" v-if="index > 5" :key="index">
      <span>{{item.text}}</span>
      <i class="iconfont icon-youjiantou"></i>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import { Toast } from "vant";
export default {
  data() {
    return {
      id: "",
      jvnei:[]
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.get_type();
  },
  methods: {
    tojvnei(item) {
      this.$router.push({
        path: "/jvbao_user",
        query: {
          id: this.id,
          title: item
        }
      })
    },
    get_type() {
      request
        .post(this.$api + "/mobile/EnumType", {
          modal: "",
          type: "UserTipTitleTypeForUser"
        })
        .then(res => {
          this.jvnei = res.Data;
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
.header {
  position: relative;
  width: 100%;
  height: 120 / @base;
  line-height: 120 / @base;
  text-align: center;
  font-size: 35 / @base;
  border-bottom: 1 / @base solid #ccc;
  position: fixed;
  top: 0;
  background: white;
  z-index: 1;
  i {
    font-size: 25px;
  }
}
.jicheng {
  width: 100%;
  height: 120 / @base;
}

.jvnei_title {
  width: 100%;
  height: 105 / @base;
  line-height: 105 / @base;
  padding: 0 40 / @base;
  font-size: 24 / @base;
  color: #b896ea;
  border-bottom: 1px solid #e6e6e6;
}
.jvnei_item {
  padding: 0 40 / @base;
  width: 100%;
  height: 90 / @base;
  line-height: 90 / @base;
  border-bottom: 1px solid #e6e6e6;
  span {
    float: left;
    font-size: 28 / @base;
    color: #333333;
  }
  i {
    float: right;
    color: #bbbbbb;
  }
}
</style>