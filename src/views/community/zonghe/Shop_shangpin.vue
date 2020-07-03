<template>
  <div>
    <!-- <div class="dianpu_box">
      <div class="dianpu" v-for="(item,index) in list" :key="index">
        <img :src="item.img" alt />
        <div class="dianpu_right">
         
          <div class="dianpu_right_name">{{item.name}}</div>
          <div class="dianpu_right_rate">
             <span>{{item.value}}分</span>
            <van-rate v-model="item.value" allow-half void-icon="star" color="#B694E8" void-color="#eee" readonly/>
          </div>
          <div class="dianpu_right_flag">{{item.flag}}</div>
        </div>
      </div>
    </div>-->
    <div class="list">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ul>
          <li
            v-for="(item, index) in shangpinlist"
            :key="index"
            @click="tochanpin(item.CommodityId)"
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
                  500
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
import { Toast, Swipe, SwipeItem ,Rate} from 'vant'
import request from '@/utils/request'
export default {
  data() {
    return {
      keyword: "",
      page: 0,
      loading: false,
      finished: false,
      shangpinlist: []
    };
  },
  mounted(){
this.keyword = window.sessionStorage.getItem("keyword") || this.$route.query.name;
  },
  methods: {
    onLoad() {
      // 异步更新数据

      this.page += 1;
      this.GetCommodityInfoList();
    },
    tochanpin (id) {
            this.$router.push({
                path: '/product_detail',
                query: {
                    id: id
                }
            })
        },
    GetCommodityInfoList() {
      request
        .post(this.$api + "/mobile/GetCommodityInfoList", {
          keyword:this.keyword,
          CategoryId: 0,
          Page: this.page,
          Rows: 8,
          Order: "asc",
          Sort: "id"
          // Type:'CommodityTypeType'
        })
        .then(res => {
          // this.shangpinlist = res.Data.List
          // console.log(this.shangpinlist)
          this.loading = false;
          if (res.Data.List.length) {
            var arr = res.Data.List;
            for (let i = 0; i < arr.length; i++) {
              this.shangpinlist.push(arr[i]);
            }
            console.log(this.shangpinlist);
          } else {
            this.finished = true;
          }
          // console.log(res.Data.List.length)
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
// .van-rate{
//   margin-top: 0/ @base;
// }
.list {
    background-color: #fff;
    padding: 200/@base 20/@base 20/@base 20/@base;
    

    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      li {
        width: 48%;
        border-radius: 13 / @base;
        overflow: hidden;
        background-color: #fff;
        margin-top: 20 / @base;
        display: block;
        box-shadow: 0px  0px  5px  1px #C4C3C6;
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
              color: rgb(60, 60, 60);
              font-size: 30 / @base;
            }
            .des {
              color: rgb(148,148,148);
              font-size: 24 / @base;
              margin: 12 / @base 0;
            }
            .price {
              .qian {
                font-size: 34 / @base;
                & .ren {
                  font-size: 21 / @base;
                  margin-right: 5 / @base;
                }
              }
              .num {
                margin-top: 5 / @base;
                color:#8e44ab;
                font-size: 12px;
              }
            }
            .baoyou{
              margin-top: 18/@base;
              width:70/@base;
              height: 30/@base;
              line-height: 25/@base;
              text-align: center;;
              font-size:12px;
              color: rgb(140,7,215);
              border: 1px solid rgb(140,7,215);
               border-radius:8px;
            }
          }
        
      }
    }
  }
</style>