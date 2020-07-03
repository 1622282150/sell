<template>
  <div>
    <header style="border-bottom:1px solid #e6e6e6">
      <Return>{{title}}</Return>
    </header>
    <van-tabs
      v-model="active"
      title-inactive-color="black"
      color="#BA99EB"
      swipeable
      title-active-color="#BA99EB"
      line-width="50%"
    >
      <van-tab title="最新">
        <div class="hang" @click="todetail(item.ArticleId)" v-for="(item,index) in zuixinlist" :key="index">
          <div
            class="ball"
            :class="index==0?'activeone':(index==1?'activetwo':(index==2?'activethree':''))"
          >{{index+1}}</div>
          <div class="title">{{item.ArticleTitle}}</div>
          <i class="iconfont icon-xiaoxi1"></i>
          <span class="sum">200人讨论</span>
          <span class="time">{{item.ArticleCreateDate|dateFormat}}</span>
        </div>
      </van-tab>
      <van-tab title="最热">
        <div class="hang" @click="todetail(item.ArticleId)" v-for="(item,index) in zuixinlist" :key="index">
          <div
            class="ball"
            :class="index==0?'activefour':(index==1?'activefive':(index==2?'activesix':''))"
          >{{index+1}}</div>
          <div class="title">{{item.ArticleTitle}}</div>
          <i class="iconfont icon-xiaoxi1"></i>
          <span class="sum">200人讨论</span>
          <span class="time">{{item.ArticleCreateDate|dateFormat}}</span>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { Tab, Tabs } from "vant";
import request from "@/utils/request";
import Return from "../../components/Return";
export default {
  components: {
    Return
  },

  data() {
    return {
      id: "",
      active: 0,
      title: "",
      zuixinlist: [],
      showinfo: [
        { title: "美妆测评", people: 200, time: "2019/09/10" },
        { title: "口红测评", people: 200, time: "2019/09/10" },
        { title: "口红分享", people: 200, time: "2019/09/10" },
        { title: "美妆测评", people: 200, time: "2019/09/10" },
        { title: "美妆测评", people: 200, time: "2019/09/10" },
        { title: "美妆测评", people: 200, time: "2019/09/10" },
        { title: "美妆测评", people: 200, time: "2019/09/10" },
        { title: "美妆测评", people: 200, time: "2019/09/10" },
        { title: "美妆测评", people: 200, time: "2019/09/10" },
        { title: "美妆测评", people: 200, time: "2019/09/10" }
      ]
    };
  },
  mounted() {
    this.title = this.$route.query.title;
    this.id = this.$route.query.id;
    this.gethuati_zuixin();
  },
  methods: {
    gethuati_zuixin() {
      request
        .post(this.$api + "/mobile/GetTopicArticleInfoList", {
          Page: this.page,
          Rows: 10,
          Sort: "Id",
          Order: "desc",
          CategoryId: this.id
        })
        .then(res => {
          this.zuixinlist = res.Data.List;
          // this.huati_loading=false;
          // if(res.Data.List.length){
          //   var arr=res.Data.List
          //   for(let i=0;i<arr.length;i++){
          //     this.list.push(arr[i])
          //   }
          // }else{
          //   this.huati_finished=true
          // }
        })
        .catch(err => {});
    },
    todetail(id){
      this.$router.push({path:'/articleshua',
      query:{
        id:id
      }})
    }
  }
};
</script>
<style lang="less" scoped>
@base: 75rem;
.hang {
  position: relative;
  width: 100%;
  height: 110 / @base;
  border-bottom: 1px solid #e6e6e6;
  padding: 0 50 / @base;
  display: flex;
  i {
    position: absolute;
    bottom: 0;
    left: 115/ @base;
    // line-height: 90 / @base;
    color: #b795e9;
    font-size: 20 / @base;
    // margin-left: 20 / @base;
  }
  .sum {
    position: absolute;
    bottom: 0;
    left: 142/ @base;
    // margin-left: 10 / @base;
    // line-height: 90 / @base;
    font-size: 20 / @base;
    color: #c6c6c6;
  }
  .time {
    position: absolute;
    right: 30 / @base;
    line-height: 110 / @base;
    font-size: 20 / @base;
    color: #c6c6c6;
  }
  .ball {
    width: 45 / @base;
    height: 45 / @base;
    line-height: 45 / @base;
    font-size: 30 / @base;
    border-radius: 50%;
    background: #a0a0a0;
    text-align: center;
    color: white;
    margin-top: 32.5 / @base;
  }
  .title {
    width: 400 / @base;
    height: 90 / @base;
    line-height: 90 / @base;
    font-size: 30 / @base;
    margin-left: 20 / @base;
overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; //行数
    -webkit-box-orient: vertical;
  }
  .activeone {
    background: red;
  }
  .activetwo {
    background: #f39800;
  }
  .activethree {
    background: #8957a1;
  }
  .activefour {
    height: 55 / @base;
    line-height: 55 / @base;
    margin-top: 15 / @base;
    background: url("../../assets/images/tophot_red.png") no-repeat;
    background-size: 100% 100%;
  }
  .activefive {
    height: 55 / @base;
    line-height: 55 / @base;
    background: url("../../assets/images/tophot_oriange.png") no-repeat;
    background-size: 100% 100%;
  }
  .activesix {
    height: 55 / @base;
    line-height: 55 / @base;
    background: url("../../assets/images/tophot_peopel.png") no-repeat;
    background-size: 100% 100%;
  }
}
</style>