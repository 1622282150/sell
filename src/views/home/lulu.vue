<template>
  <div class="tuijian">
    <div class="ull">
<vue-waterfall-easy width='220' gap='10' maxCols='2' srcKey='ArticleImg' :imgsArr="imgsArr" @scrollReachBottom="gettuijian">

</vue-waterfall-easy>
    </div>

    
    <!-- <van-list v-model="loading" :finished="finished" finished-text @load="onLoad">
      <div class="ull" v-masonry gutter='10' item-selector='.lii'>
        <div
        v-masonry-tile
          class="lii"
          v-for="(item, index) in tuijianlist"
          :key="index"
          @click="toarticle(item.ArticleId)"
        >
          <div v-if="item.ArticleImg" class="pic">
            <img :src="item.ArticleImg" alt />
          </div>
          <div v-else class="pic">
            <img src="../../assets/images/community_listbg.jpg" alt />
          </div>
          <div class="bottom">
            <p>{{item.ArticleTitle|titleLength}}</p>
            <div class="avtart">
              <img src="../../assets/images/community_listbg.jpg" alt />
              <span>{{item.ArticleAuthor}}</span>
              <div class="zan">
                <i class="iconfont icon-dianzan"></i>
                <span>{{item.ClickCount}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-list> -->

  </div>
</template>

<script>
import vueWaterfallEasy from 'vue-waterfall-easy'
import request from "@/utils/request";
/*eslint-disable*/
export default {
  components:{
   vueWaterfallEasy
  },
  data() {
    return {
      // page: 0,
      // loading: false,
      // finished: false,
      // tuijianlist: []
      imgsArr:[],
      group:0
    };
  },
  created() {
    this.gettuijian();
  },
  methods: {
    // 上拉加载
    onLoad() {
      // 异步更新数据

      this.page += 1;
      this.gettuijian();
    },
    gettuijian() {
      request
        .post(this.$api + "/mobile/GetArticleInfoList", {
          Page: this.group,
          Rows: 6
        })
        .then(res => {
          // this.loading = false;
          // if (res.Data.List.length) {
          //   var arr = res.Data.List;
          //   for (let i = 0; i < arr.length; i++) {
          //     this.tuijianlist.push(arr[i]);
          //   }
          // } else {
          //   this.finished = true;
          // }
          this.imgsArr=this.imgsArr.concat(res.Data.List)
          this.group++
        })
        .catch(err => {});
    },
    toarticle(id) {
      this.$router.push({
        path: "/ArticlesTie",
        query: {
          id: id
        }
      });
    }
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
.tuijian {
  margin-bottom: 75 / @base;
  width: 100%;
  height: 100%;
  padding: 20 / @base;
  overflow: scroll;
  background-color: #f5f5f5;

  .ull {
    width: 100%;
    // display: flex;
    // flex-flow: row wrap;
    // justify-content: space-between;
    // align-items: flex-start;
   
    border: 1px solid red;
    .lii {
     
      width: 48%;
      margin-bottom: 20 / @base;
      background-color: #fff;
      border-radius: 12 / @base;
      box-shadow: 2 / @base 2 / @base 12 / @base rgba(0, 0, 0, 0.2);

    border: 1px solid red;
      // &:nth-child(even) {
      //   float: right;
      // }
      .pic {
        img {
          width: 100%;
          max-height: 500 / @base;
          background-size: 100% 100%;
        }
      }
      .bottom {
    border: 1px solid red;
        padding: 15 / @base 15 / @base;
        p {
          margin-bottom: 25 / @base;
          font-size: 28 / @base;
          color: #333;
        }
        .avtart {
          position: relative;
          img {
            display: inline-block;
            width: 40 / @base;
            height: 40 / @base;
            margin-right: 5 / @base;
            border-radius: 50%;
            vertical-align: middle;
          }
          span {
            color: #717171;
            font-size: 20 / @base;
            vertical-align: middle;
          }
          .zan {
            position: absolute;
            right: 0;
            top: 0;
            display: inline-block;
            width: 120 / @base;
            height: 60 / @base;
            text-align: right;

            i {
              font-size: 24 / @base;
            }
            span {
              font-size: 20 / @base;
              color: #717171;
            }
          }
        }
      }
    }
  }
}
</style>