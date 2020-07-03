<template>
  <div class="zhanghao">
    <div class="header">
      <Return>账号与安全</Return>
    </div>
    <div class="line"></div>
    <div class="list">
      <div
        class="avatar"
        tag="div"
        @click="tiao(item.src)"
        v-for="(item, index) in list"
        :key="index"
        :class="[index===0? 'border': '', index===2 ? 'padding': '']"
      >
        <div class="name">
          <p>{{item.name}}</p>
          <p class="mobile" v-show="index===0">{{ account | phoneFilter }}</p>
        </div>
        <div class="edit">
          <a href="javascript:">
            <!-- <span v-show="index <= 1">绑定</span> -->
            <span class="iconfont icon-youjiantou"></span>
          </a>
        </div>
      </div>
    </div>
    <!-- <button @click="paizhao">拍照</button> -->
  </div>
</template>

<script>
/*eslint-disable*/
import Return from "../../components/FixedHeader";
import item from "../../components/item";
import { Toast } from 'vant';
export default {
  components: {
    Return,
    item
  },
  data() {
    return {
      account:'',
      list: [{ name: "手机号" ,src:'/set_mobile'}, { name: "微信号",src:'a' }, { name: "修改密码",src:'/reset' },{name:"注销账号",src:'/need_zhuxiao'}],
      checked: [],
      picked: ""
    };
  },
  filters: {
    phoneFilter(phone) {
      if(!phone||!phone.length){
        return''
      }
      return phone.substring(0, 3) + "****" + phone.substring(8, 11);
    }
  },
  methods: {
  tiao(src){
     if(src === 'a'){
       Toast('敬请期待')
     }else{
       this.$router.push(src)
     }
  },
    // async paizhao() {
    //   // 本地    https://openapi.mtlab.meitu.com/v1/skinanlysis?api_key=rF5GIhp5ReLKgLV91CKj5BO1q2FTLMmc&api_secret=5wGaQX_jsau6lcWGuENJHXn8zpWH8coY
    //   let res = await this.axios.post(
    //     "https://openapi.mtlab.meitu.com/v1/facedetect?api_key=7Zc_dKM_iz52jryeykk_xtLFuAdKgrmu&api_secret=2mHOrhyu7wDeG1NM9yv_rrFRlvG2R5vD",

    //     {
    //       parameter: {
    //         nFront: 1
    //       },
    //       extra: {},
    //       media_info_list: [
    //         {
    //           media_data:
    //             "https://oss.mtlab.meitu.com/public/itc2_gumd4GoGYxjW9Ncq5rzVlVzmnnT/demo/skin/1.jpg",
    //           media_profiles: {
    //             media_data_type: "url"
    //           }
    //         }
    //       ]
    //     }
    //   );
    //   alert(res);
    // }
  },
  mounted() {
    this.account=window.localStorage.getItem('mobile')
    console.log(this.account)
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
.header {
  background-color: #fff;
}
.zhanghao {
  background-color: #eee;
  width: 100%;
  height: 100%;
}
.commoncss (@left, @right) {
  .name {
    color: #333;
    font-size: 30 / @base;
  }
  .edit {
    position: absolute;
    right: @right;
    top: 50%;
    transform: translateY(-50%);
    a {
      display: block;
      color: #b4b4b4;
      font-size: 30 / @base;
      .aa {
        vertical-align: middle;
      }
      .icon-youjiantou {
        margin-left: 15 / @base;
        vertical-align: middle;
        font-size: 36 / @base;
        font-weight: 600;
      }
    }
  }
}

.list {
  .avatar {
    background-color: #fff;
    position: relative;
    padding: 25 / @base 40 / @base;

    .commoncss(155 / @base, 40 / @base);
    .mobile {
      font-size: 18 / @base;
      color: #818181;
    }
  }
}
.line {
  width: 100%;
  height: 15 / @base;
  background-color: #eee;
}
.border {
  border-bottom: 1 / @base solid #ccc;
}
.padding {
  margin-top: 15 / @base;
}
</style>