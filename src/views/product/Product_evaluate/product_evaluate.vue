<template>
  <div>
    <!-- 头部 -->
    <div class="head-search">
      <i
        @click="$router.back()"
        style="color:#424242;position:fixed;top:2.3%;left:3%;"
        class="iconfont icon-zuojiantou"
      ></i>
      <input type="text" placeholder="大家都在搜~" />
      <i style="position:fixed;top:2.3%;left:15%;color:#696968" class="iconfont icon-sousuo"></i>
      <!-- <i style="color:#424242;position:fixed;top:2.3%;right:3%;" class="iconfont icon-fenxiang"></i> -->
    </div>
    <div class="bu"></div>
    <!-- 顶部选择评价分类 -->
    <div class="top">
      <div
        class="top_ball"
        v-for="(item,index) in top_list"
        :key="index"
        @click="sel_top(index)"
        :class="top_active===index?'active_ball':''"
      >
        {{item}}
        <span v-show="index === 1">{{num_list.GoodCount}}</span>
        <span v-show="index === 2">{{num_list.MidCount}}</span>
        <span v-show="index ===3">{{num_list.BadCount}}</span>
      </div>
    </div>
    <!-- 下部评价 -->
    <div class="content">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div @click="todetail(item.Id)" class="content_box" v-for="(item,index) in content" :key="index">
          <div class="content_box_title">
            <img :src="item.Avatar" alt />
            <div class="content_box_title_right">
              <div class="content_box_title_righttop">{{item.UserName}}</div>
              <div class="content_box_title_rightbottom">
                <span>评分</span>
                <van-rate
                  v-model="item.CommodityScore"
                  :size="8"
                  allow-half
                  void-icon="star"
                  color="#B694E8"
                  void-color="#eee"
                  readonly
                />
              </div>
              <div class="content_box_title_time">{{item.CreateDate}}</div>
            </div>
          </div>
          <div class="content_box_content" v-html="item.Content"></div>
          <div class="content_box_bottom">
            <img src="../../../assets/images/article_nolike.png" alt />
            <span>{{item.LikedCount}}</span>
            <i class="iconfont icon-xiaoxi1"></i>
            <span>{{item.ReplyCount}}</span>
            <i
              @click="more(item.Id)"
              style="position:absolute;right:0"
              class="iconfont icon-gengduo"
            ></i>
          </div>
        </div>
      </van-list>
    </div>

    <!-- 弹出层 -->
    <van-action-sheet
      v-model="show"
      @select="onSelect"
      :actions="actions"
      cancel-text="取消"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import request from "@/utils/request";
import { ActionSheet, Rate, Toast } from "vant";
export default {
  data() {
    return {
      actions: [{ name: "举报" }],
      show: false,
      id: "",
      top_active: 0,
      page: 1, //页数
      loading: false,
      finished: false,
      CommentLevel: "", //不填不筛选； 0：好评； 1：中评；  2：差评
      top_list: ["全部", "好评", "中评", "差评"],
      content: [], //列表内容,
      jvbao_id: "",
      num_list: []
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.GetCommodityCommentList();
    this.getnum();
  },
  methods: {
    todetail(id){
     console.log(id)
     this.$router.push({
       path:'/evaluate_detail',
       query:{
         id:id
       }
     })
    },
    onLoad() {
      // 异步更新数据
      this.page += 1;
      this.GetCommodityCommentList();
    },
    more(id) {
      this.jvbao_id = id;
      this.show = true;
    },
    onCancel() {
      this.show = false;
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起

      request
        .post(this.$api + "/mobile/CommodityCommentTipOff", {
          Id: this.jvbao_id //评论编号
        })
        .then(res => {
          if (res.IsSuccess) {
            Toast("举报成功");
            this.show = false;
          } else {
            Toast(res.Message);
          }
        })
        .catch(err => {});
    },
    // 获取好评差评数量
    getnum() {
      request
        .post(this.$api + "/mobile/GetCommodityCommentTypeCount", {
          CommodityId: this.id
        })
        .then(res => {
          this.num_list = res.Data;
        })
        .catch(err => {});
    },
    // 获取所有评论
    GetCommodityCommentList() {
      request
        .post(this.$api + "/mobile/GetCommodityCommentList", {
          Page: this.page,
          Rows: 10,
          CommodityId: this.id,
          Type: "", //不填不筛选，0：无图评论，1：有图评论,
          CommentLevel: this.CommentLevel //不填不筛选； 0：好评； 1：中评；  2：差评
        })
        .then(res => {
          this.loading = false;
          if (res.Data.List.length) {
            var arr = res.Data.List;
            for (let i = 0; i < arr.length; i++) {
              this.content.push(arr[i]);
            }
            // this.showlist.concat(res.data.Data.list)
            // console.log(this.showlist)
          } else {
            this.finished = true;
          }
        })
        .catch(err => {});
    },
    // 顶部选择评价分类
    sel_top(index) {
      this.top_active = index;
      if(index == 0){
        console.log('全部')
        this.CommentLevel=''
        this.page=1
        this.loading=false
        this.finished=false
        this.content=[]
        this.GetCommodityCommentList()
      }else if(index == 1){
        console.log('好评')
        this.CommentLevel=0
        this.page=1
        this.loading=false
        this.finished=false
        this.content=[]
        this.GetCommodityCommentList()
      }else if(index ==2){
        console.log('中评')
         this.CommentLevel=1
        this.page=1
        this.loading=false
        this.finished=false
        this.content=[]
        this.GetCommodityCommentList()
      }else if(index == 3){
        this.CommentLevel=2
        this.page=1
        this.loading=false
        this.finished=false
        this.content=[]
        this.GetCommodityCommentList()
      }
    }
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
.van-rate {
  margin-top: 5 / @base;
  width: 60%;
  height: 30 / @base;
}
.head-search {
  z-index: 2;
  position: fixed;
  top: 0;
  width: 100%;
  height: 120 / @base;
  background: #eeeeee;
  input {
    //   opacity: 0.6;
    position: fixed;
    top: 2.3%;
    left: 13%;
    width: 75%;
    padding: 15 / @base 0 15 / @base 80 / @base;
    text-align: left;
    font-size: 30 / @base;
    border-radius: 20px;
    height: 60 / @base;
  }
  i {
    font-size: 55 / @base;
  }
}
.bu {
  width: 100%;
  height: 120 / @base;
}
// 顶部分类别
.top {
  width: 100%;
  height: 120 / @base;
  padding: 15 / @base 40 / @base;
  .top_ball {
    padding-left: 20 / @base;
    padding-right: 20 / @base;
    float: left;
    min-width: 100 / @base;
    height: 50 / @base;
    line-height: 50 / @base;
    border: 1px solid #d8d8d8;
    color: #848484;
    font-size: 28 / @base;
    text-align: center;
    border-radius: 20px;
    margin-left: 25 / @base;
  }
  .active_ball {
    color: #b484fc !important;
    background: #f7f0ff !important;
    border: 1px solid #b484fc !important;
  }
}
// 下部评价
.content {
  width: 100%;
  padding: 20 / @base 40 / @base;
  .content_box {
    width: 100%;
    margin-bottom: 30 / @base;
    .content_box_title {
      position: relative;
      display: flex;
      width: 100%;
      height: 80 / @base;
      .content_box_title_time {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 22 / @base;
        color: #a4a4a4;
      }

      img {
        width: 60 / @base;
        height: 60 / @base;
        border-radius: 50%;
        margin-top: 10 / @base;
      }
      .content_box_title_right {
        padding-left: 15 / @base;
        width: 60%;
        height: 80 / @base;
        .content_box_title_righttop {
          width: 100%;
          height: 40 / @base;
          line-height: 40 / @base;
          font-size: 30 / @base;
        }
        .content_box_title_rightbottom {
          display: flex;
          width: 100%;
          height: 40 / @base;
          line-height: 40 / @base;
          font-size: 22 / @base;
          color: #a4a4a4;
          span {
            margin-right: 10 / @base;
          }
        }
      }
    }
    .content_box_content {
      margin-top: 10 / @base;
      font-size: 30 / @base;
      padding-left: 75 / @base;
    }
    .content_box_bottom {
      position: relative;
      display: flex;
      width: 100%;
      height: 40 / @base;
      margin-top: 30 / @base;
      font-size: 30 / @base;
      padding-left: 75 / @base;
      img {
        width: 30 / @base;
        height: 30 / @base;
        margin-top: 5 / @base;
        margin-right: 8 / @base;
      }
      i {
        font-size: 35 / @base;
        color: #a4a4a4;
        margin-left: 60 / @base;
        margin-right: 8 / @base;
      }
      span {
        display: block;
        width: 40 / @base;
        height: 40 / @base;
        line-height: 40 / @base;
        color: #a4a4a4;
        font-size: 20 / @base;
      }
    }
  }
}
</style>