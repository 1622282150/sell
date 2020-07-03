<template>
  <div class="contain">
   <van-list v-model="fujin_loading" :finished="fujin_finished" finished-text="没有更多了" @load="fujin_onLoad">
        <div
          v-for="(item,index) in SellerPageList"
          :key="index"
         
          class="projectitem"
        >
          <div class="yiyuan"  @click="toSellerdetail(item.Id)">
            <div class="yiyuan_name">{{item.Name}}</div>
            <div class="yiyuan_rate">
              <van-rate
                allow-half
                v-model="item.ShopScore"
                readonly
                color="#b695e9"
                void-color="#eee"
              />
              <span style="margin-left:11px;padding-top:2px">{{item.ShopScore}}分</span>
              <span class="address">{{item.Address|titleLength}}</span>
            </div>
            <div class="yiyuan_renke">医疗执业认可</div>
          </div> 
          <div class="xiangmu" @click="todetail(i.CommodityId)" v-for="(i,index) in item.CommodityInfoList" :key="index">
            <img  class="top1" :src="i.BannerImg" alt />
            <div class="top2">
              <p>{{i.Name}}</p>
              <!-- <div class="rate"> -->
              <!-- <van-rate allow-half v-model="item.ShopScore" readonly color="#b695e9" void-color="#eee" /> -->
              <!-- <span class="num">{{item.ShopScore}} 分</span> -->
              <!-- <div class="address">{{item.Address}}</div> -->
              <!-- </div> -->
              <div class="jieshao">
                <span class="price">￥{{i.Price}}</span>
                <span class="dian_price">原价：￥{{i.OriginalPrice}}</span>
              </div>
            </div>
          </div>

         
        </div>
         </van-list>
  </div>
</template>

<script>
import { Toast, Swipe, SwipeItem ,Rate} from 'vant'
import request from '@/utils/request'
export default {
  data() {
    return {
      keyword: "",
       fujin_loading: false,
       fujin_finished: false,
       fujin_page:0,
       SellerPageList: [],//商家数组
      shangpinlist: []
    };
  },
  mounted(){
this.keyword = window.sessionStorage.getItem("keyword") || this.$route.query.name;
  },
  methods: {
   fujin_onLoad(){
            this.fujin_page+=1
            this. get_SellerPageList ()
          },
          get_SellerPageList () {
            request.post(this.$api + '/mobile/GetSellerProjectPageList', {
                 Name:this.keyword,
                Page: this.fujin_page,
                Rows: 9,
                // Type:'ShopProject'
            }).then(res => {
                // this.SellerPageList = res.Data.List
                // console.log(this.SellerPageList)
                this.fujin_loading=false;
                if(res.Data.List.length){
                  var arr=res.Data.List
                  for(let i=0;i<arr.length;i++){
                    this.SellerPageList.push(arr[i])
                  }
                }else{
                  this.fujin_finished=true
                }
            }).catch(err => {

            })
        },
           // 去商jia详情
        toSellerdetail (id) {
            this.$router.push({
                path: '/shop',
                query: {
                    id: id
                }
            })
        },
        todetail (id) {
            this.$router.push({
                path: '/details',
                query: {
                    id: id
                }
            })
        },
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
.contain{
  padding-top: 200/@base;
}
// .van-rate{
//   margin-top: 0/ @base;
.projectitem {
    
    border-bottom: 10/@base solid #EEEEEE;;
    padding: 40/ @base  40 / @base;
    // display: flex;;
    .yiyuan{
      .yiyuan_name{
        font-size: 32/@base;
      }
      .yiyuan_rate{
        width: 100%;
        height:60/@base;
        display: flex;
        position: relative;
        font-size: 24/@base;
        margin-top: 10/@base;
        color: rgb(181, 151, 232);
        .rate_rate{
          height:60/@base;
         
        }
        .address{
          position: absolute;;
          right: 0;
          font-size: 24/@base;
          color: rgb(182, 182, 182);
        }
      }
      .yiyuan_renke{
        text-align: center;
        font-size: 12/@base;
        margin-top: 40/@base;
        width: 150/@base;
        height: 30/@base;
        line-height: 30/@base;
        color: rgb(181, 151, 232);
        border: 1px solid rgb(181, 151, 232);
      }
    }
    .xiangmu{
      margin-top: 40/@base;
      display: flex;;
      .top1{
        width: 150/@base;
        height: 150/@base;
        background-size: 100% 100%;
        border-radius: 8px;
      }
      .top2 {
        padding-left: 36/@base;
        p {
          font-size: #424242;
          font-size: 28/ @base;
        }
        .rate {
          position: relative;
          margin-top: 20 / @base;
          margin-bottom: 27 / @base;
          font-size: 0;
          // vertical-align: top;
  
          .van-rate__icon {
            font-size: 24 / @base;
            //   vertical-align: baseline;
          }
          .num {
            position: absolute;
            left:260/ @base;
            bottom: 0/ @base;
            font-size: 24 / @base;
            color: #b695e9;
          }
          .address {
            position: absolute;
            right: 0;
            bottom: 0 / @base;
            font-size: 24 / @base;
            color: #878787;
            vertical-align: middle;
          }
        }
        .jieshao {
          margin-top: 32/@base;
          .price{
             font-size: 36/@base;
             color:#b695e9 ;
          }
          .dian_price{
            font-size: 20/@base;
            color: rgb(182, 182, 182);

          }

        }
      }
    }
    
    .bottom {
      position: relative;
      margin-top: 40 / @base;
      padding-bottom: 40 / @base;
      border-bottom: 1 / @base solid #ccc;
      .pic {
        img {
          display: inline-block;
          width: 150 / @base;
          height: 150 / @base;
          border-radius: 15 / @base;
        }
      }
      .right {
        position: absolute;
        left: 200 / @base;
        top: 0;

        font-size: 28 / @base;
        color: #333;
        .price {
          position: relative;
          margin-top: 25 / @base;
          .new {
            font-size: 36 / @base;
            color: #b695e9;
            vertical-align: baseline;
          }
          .old,
          .shuliang {
            font-size: 20 / @base;
            color: #999;
            &.shuliang {
              margin-left: 100 / @base;
            }
          }
        }
      }
    }
  }
</style>