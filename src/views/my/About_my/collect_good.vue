<template>
  <div>
    <header>
      <i @click="goback()" class="iconfont icon-zuojiantou"></i>
      <div class="head">收藏好货</div>
    </header>
    <div class="bu"></div>
    <div class="list">
      <van-list v-model="loading4" :finished="finished4" finished-text="没有更多了" @load="onLoad4">
        <ul>
          <li
            @click="todetail(item.CommodityId,'/product_detail')"
            v-for="(item, index) in shangpinlist"
            :key="index"
          >
            <img v-if="item.BannerImg" :src="item.BannerImg" alt />
            <img v-else src="../../../assets/images/list.jpg" alt />
            <div class="bottom">
              <!-- <p>盛大收购大红色的乖哈岁的干啥</p> -->
              <p>{{item.Name }}</p>
              <!-- <p>的撒韩国的</p> -->
              <!-- <div class="des">{{item.Description|renMenLength}}</div> -->
              <div class="price clearfix">
                <span class="qian fl">
                  <span class="ren">¥</span>
                  {{item.Price}}
                </span>
                <span class="num fr">
                  <i class="iconfont icon-hot"></i>
                  {{item.Popularity}}
                </span>
              </div>
              <div class="baoyou">包邮</div>
            </div>
          </li>
        </ul>
      </van-list>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  data() {
    return {
      page4: 1,
      loading4: false,
      finished4: false,
      shangpinlist:[],
    };
  },
  created(){
    this.GetCommodityInfoList();
  },
  mounted(){

  },
  methods: {
    goback() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        // on close
        console.log("我是要去安卓");
        // let url='http://test1.merrychange.net/#/articlestie?id='+this.articleid
        window.android.closePage();
        this.$router.back();
      } else if (isiOS) {
        console.log("我是要去ios");
        let url = this.$domain.url+"collect_good";
        console.log(url);
        this.$bridge.callhandler("closePage", url, data => {
          // 处理返回数据
        });
        this.$router.back();
        //  window.location.href='mqjapp://home'
      } else {
        console.log("我不是安卓也不是ios,我在哪");
        this.$router.back();
      }
    },
   todetail(id, name) {
      this.$router.push({
        path: name,
        query: {
          id: id
        }
      });
    },
    onLoad4() {
      // 异步更新数据

      this.page4 += 1;
      this.GetCommodityInfoList();
    },
    GetCommodityInfoList() {
      request
        .post(this.$api + "/mobile/MyFavoriteProductList", {
          Page: this.page4,
          Rows: 8,
          Order: "asc",
          Sort: "id"
          // Type:'CommodityTypeType'
        })
        .then(res => {
          // this.shangpinlist = res.Data.List
          // console.log(this.shangpinlist)
          this.loading4 = false;
          if (res.Data.ListData.length) {
            var arr = res.Data.ListData;
            for (let i = 0; i < arr.length; i++) {
              this.shangpinlist.push(arr[i]);
            }
            console.log(this.shangpinlist);
          } else {
            this.finished4 = true;
          }
          // console.log(res.Data.List.length)
        })
        .catch(err => {});
    },
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
//4
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
    height: 50px;
    background: white;
    font-size: 35 / @base;
    text-align: center;
    line-height: 100 / @base;
    border-bottom: 1px solid #e6e6e6;
    z-index: 10;
  }
}
.bu {
  width: 100%;
  height: 50px;
}
.list {
  background-color: #fff;
  padding: 0 20 / @base;

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      width: 345 / @base;
      border-radius: 13 / @base;
      overflow: hidden;
      background-color: #fff;
      margin-top: 20 / @base;
      display: block;
      box-shadow: 0px 0px 5px 1px #c4c3c6;
      img {
        height: 350 / @base;
      }
      .bottom {
        padding: 18 / @base;
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          // color: rgb(60, 60, 60);
          font-size: 30 / @base;
        }
        .des {
          color: rgb(148, 148, 148);
          font-size: 24 / @base;
          margin: 12 / @base 0;
        }
        .price {
          color:red;
          .qian {
            font-size: 34 / @base;
            & .ren {
              font-size: 21 / @base;
              margin-right: 5 / @base;
            }
          }
          .num {
            margin-top: 5 / @base;
            color: #8e44ab;
            font-size: 12px;
          }
        }
        .baoyou {
          margin-top: 18 / @base;
          width: 70 / @base;
          height: 30 / @base;
          line-height: 25 / @base;
          text-align: center;
          font-size: 12px;
          color: rgb(140, 7, 215);
          border: 1px solid rgb(140, 7, 215);
          border-radius: 8px;
        }
      }
    }
  }
}
</style>