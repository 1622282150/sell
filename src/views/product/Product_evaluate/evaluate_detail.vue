<template>
  <div class="contain" ref="paging">
    <div class="header">
      评价详情
      <img @click="$router.back()" class="img1" src="../../../assets/images/newfan.png" alt />
    </div>
    <div class="jicheng"></div>
    <!-- 评价详情 -->
    <div class="content_all">
      <div class="content">
        <div class="content_box">
          <div class="content_box_title">
            <img :src="info.Avatar" alt />
            <div class="content_box_title_right">
              <div class="content_box_title_righttop">{{info.UserName}}</div>
              <div class="content_box_title_rightbottom">
                <span>评分</span>
                <van-rate
                  v-model="info.CommodityScore"
                  :size="8"
                  allow-half
                  void-icon="star"
                  color="#B694E8"
                  void-color="#eee"
                  readonly
                />
              </div>
              <div class="content_box_title_time">{{info.CreateDate}}</div>
            </div>
          </div>
          <div class="content_box_content">{{info.Content}}</div>
          <div class="content_box_bottom">
            <span>{{info.SCText}}</span>
          </div>
          <!-- 主要图片 -->
          <img class="content_main_img" :src="info.CommodityImg" alt />
          <!-- 商品灰色区域 -->
          <div class="content_main">
            <img :src="info.CommodityImg" alt />
            <div class="content_main_right">
              <div class="content_main_right_top">{{info.CommodityTitle}}</div>
              <div class="content_main_right_bottom">￥ {{info.CommodityPrice}}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="fenge"></div>
      <!-- 最下部评论 -->
      <div class="quanping">
        <h3>全部评价（{{comment.length}}）</h3>
        <div class="firstping" v-for="(item,index) in comment" :key="index">
          <div class="title">
            <img class="touimg" :src="item.UserAvatar" alt />
            <span class="firstauther">{{item.ParentUserName}}</span>
            <span class="firsttime">{{item.CreateDate}}</span>
            <div class="trr">
              <img
              @click="nozanson(item.Id,index)"
                v-if="item.LikedFlag"
                class="oneimg"
                src="../../../assets/images/article_islike.png"
                alt
              />
              <img @click="zanson(item.Id,index)" v-else class="oneimg" src="../../../assets/images/article_nolike.png" alt />
              <span class="firstzan">{{item.LikedCount}}</span>
            </div>
          </div>
          <p class="firstmain">{{item.Content}}</p>
        </div>
      </div>
    </div>
    <!-- 尾部部分 -->
    <div v-show="showb" class="bottom">
      <van-field
        :autofocus="true"
        v-model="message"
        type="textarea"
        placeholder="输入你想说的"
        rows="1"
        :autosize="{ maxHeight: 100}"
      />
      <span class="fasong" @click="ping">发送</span>
    </div>
    <div class="store_bottom">
      <div class="store_bottom_item" @click="showb=true">
        <i class="iconfont icon-xiaoxi1"></i> 评论
      </div>
      <div class="store_bottom_item">
        <img
          @click="nozanmain"
          v-if="info.LikedFlag"
          class="oneimg"
          src="../../../assets/images/article_islike.png"
          alt
        />
        <img
          @click="zanmain"
          v-else
          class="oneimg"
          src="../../../assets/images/article_nolike.png"
          alt
        />
        {{info.LikedCount}}
      </div>
    </div>
    <van-overlay style="z-index:11" :show="showb" @click="showb=false" />
  </div>
</template>

<script>
import { Overlay, Toast } from "vant";
import request from "@/utils/request";
import Fixed from "@/components/FixedHeader.vue";
export default {
  components: {
    Fixed
  },
  data() {
    return {
      fullheight: document.documentElement.clientHeight,
      id: "",
      showb: false,
      message: "", // 输入框的内容
      ratevalue: 2,
      info: [], //详情信息
      comment: [] //评论列表
    };
  },
  mounted() {
    this.$refs.paging.style.height = this.fullheight + "px";
    this.id = this.$route.query.id;
    this.getdetail();
    this.getcomment();
  },
  methods: {
    // 赞或取消主体
    zanmain() {
      (this.info.LikedFlag = true), (this.info.LikedCount += 1);
      request
        .post(this.$api + "/mobile/CommodityCommentLike", {
          Id: this.id
        })
        .then(res => {})
        .catch(err => {});
    },
    nozanmain() {
      (this.info.LikedFlag = false), (this.info.LikedCount -= 1);
      if (this.info.LikedCount <= 0) {
        this.info.LikedCount == 0;
      }
      request
        .post(this.$api + "/mobile/CommodityCommentUnLike", {
          Id: this.id
        })
        .then(res => {})
        .catch(err => {});
    },
    // 列表的赞和取消赞
    zanson(id,index){
      this.comment[index].LikedFlag=true
      this.comment[index].LikedCount+=1
      request.post(this.$api+'/mobile/CommodityCommentReplyLike',{
        Id:id
      }).then(res=>{

      }).catch(err=>{

      })
    },
    nozanson(id,index){
       this.comment[index].LikedFlag=false
      this.comment[index].LikedCount-=1
      request.post(this.$api+'/mobile/CommodityCommentReplyUnLike',{
        Id:id
      }).then(res=>{

      }).catch(err=>{
        
      })
    },
    // 开始回复
    ping() {
      request
        .post(this.$api + "/mobile/UserAddCommodityCommentReply", {
          CommentId: this.id,
          Content: this.message
        })
        .then(res => {
          if (res.IsSuccess) {
            this.message = "";
            this.showb = false;
            this.getcomment();
          } else {
            Toast(res.Message);
          }
        })
        .catch((err = {}));
    },
    getdetail() {
      request
        .post(this.$api + "/mobile/GetCommoditCommentDetail", {
          Id: this.id
        })
        .then(res => {
          this.info = res.Data;
        })
        .catch(err => {});
    },
    // 获取所有评论
    getcomment() {
      request
        .post(this.$api + "/mobile/GetCommodityCommentReplyList", {
          Id: this.id
        })
        .then(res => {
          this.comment = res.Data.List;
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped lang='less'>
@case: 37.5rem;
@base: 75rem;
.contain {
  width: 100%;
  height: 100%;
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 56 / @case;
  font-size: 18px;
  color: #252525;
  letter-spacing: 0 / @case;
  z-index: 11;
  background: white;
  span {
    position: absolute;
    top: 21 / @case;
    right: 14 / @case;
    font-size: 12px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #9d80f3;
  }
  .img1 {
    position: absolute;
    top: 19 / @case;
    left: 13 / @case;
    width: auto;
    height: 21 / @case;
    background-size: 100% 100%;
  }
}
.jicheng {
  width: 100%;
  height: 56 / @case;
  margin-bottom: 2px;
}
.van-field__control {
  padding-left: 20px !important;
  width: 200px;
  height: 30px;
}
.van-rate {
  margin-top: 5 / @base;
  width: 60%;
  height: 30 / @base;
}
// 评价
.content_all {
  position: absolute;
  top: 56 / @case;
  bottom: 45 / @case;
  width: 100%;
  overflow-y: scroll;
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
        //   position: relative;
        //   display: flex;
        width: 100%;
        height: 40 / @base;
        margin-top: 10 / @base;
        font-size: 30 / @base;
        padding-left: 75 / @base;
        span {
          color: #a4a4a4;
          font-size: 20 / @base;
        }
      }
      .content_main_img {
        width: 100%;
        background-size: 100% 100%;
        margin-top: 30 / @base;
      }
      // 灰色部分
      .content_main {
        width: 100%;
        height: 200 / @base;
        background: #eeeeee;
        margin-top: 30 / @base;
        padding: 10 / @base;
        display: flex;
        img {
          border-radius: 10 / @base;
          width: 180 / @base;
          height: 180 / @base;
        }
        .content_main_right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 80%;
          height: 180 / @base;
          padding-left: 20 / @base;
          .content_main_right_top {
            width: 100%;
            // height: 120 / @base;
            font-size: 28 / @base;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2; //行数
            -webkit-box-orient: vertical;
          }
          .content_main_right_bottom {
            width: 100%;
            height: 60 / @base;
            line-height: 60 / @base;
            font-size: 28 / @base;
            color: #bb9be8;
          }
        }
      }
    }
  }
}

.fenge {
  width: 100%;
  height: 13 / @base;
  background: #eeeeee;
}

// 最下部
// 评论模块
.quanping {
  padding: 40 / @base 40 / @base 80 / @base 40 / @base;
  width: 100%;
  h3 {
    font-size: 36 / @base;
  }
  .firstping {
    width: 100%;
    padding: 40 / @base 0;
    border-bottom: 1px solid #e6e6e6;
    .title {
      position: relative;
      width: 100%;
      height: 80 / @base;
      display: flex;
      .touimg {
        width: 80 / @base;
        height: 80 / @base;
        border-radius: 50%;
      }

      .firstauther {
        position: absolute;
        left: 90 / @base;
        font-size: 30 / @base;
      }
      .firsttime {
        position: absolute;
        left: 90 / @base;
        top: 45 / @base;
        font-size: 20 / @base;
        color: #b7b7b7;
      }

      i {
        font-size: 40 / @base;
        position: absolute;
        right: 45 / @base;
        top: 12 / @base;
        width: 30 / @base;
        height: 30 / @base;
        color: #b7b7b7;
      }
      .trr {
        position: absolute;
          right: 0;
          top: 10 / @base;
          display: flex;
          align-items: center;
        .oneimg {
          // position: absolute;
          // right: 40 / @base;
          // top: 12 / @base;
          width: 35/ @base;
          height:35 / @base;
          margin-right: 2/@base;
        }
        .firstzan {
          font-size: 20 / @base;
          
          color: #b7b7b7;
        }
      }
    }
    .firstmain {
      padding-left: 90 / @base;
      font-size: 30 / @base;
    }
  }
}

// Weibu
// 固定尾部
.store_bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 90 / @base;
  font-size: 30 / @base;
  background: white;
  color: #b7b7b7;
  z-index: 2;
  display: flex;
  .store_bottom_item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 90 / @base;
    // line-height: 90 / @base;
    // text-align: center;
    i {
      font-size: 35 / @base;
      line-height: 30 / @base;
      text-align: center;

      margin-right: 2 / @base;
    }
    .oneimg {
      margin-right: 2 / @base;
      width: 35 / @base;
      height: 35 / @base;
      background-size: 100% 100%;
    }
  }
}
.bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  min-height: 100 / @base;
  padding: 15 / @base 40 / @base;
  background: #ffffff;
  display: flex;
  z-index: 333;
  border-top: 1px solid #e6e6e6;
  .fasong {
    display: block;
    width: 100 / @base;
    height: 50 / @base;
    margin: auto 0 auto 30 / @base;
    line-height: 50 / @base;
    border-radius: 5px;
    font-size: 20 / @base;
    text-align: center;
    background: #b694e8;
    color: white;
  }
}
</style>