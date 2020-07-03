<template>
  <div>
 <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
   <div class="xiangmu_ul">
        <div class="xiangmu_li" @click="todetail(item.CommodityId)" v-for="(item,index) in list" :key="index">
          <img :src="item.BannerImg" alt />
          <div class="xiangmu_bottom">
            <div class="xiangmu_title">{{item.Name}}</div>
            <!-- <div class="xiangmu_flag">{{item.flag}}</div> -->
            <div class="xiangmu_price"><span class="xiangmu_price_daola">¥</span><span class="xiangmu_price_money">{{item.Price}}</span></div>
            <div class="xiangmu_shop">{{item.SellerName|usernameLength}}<span>详情 ></span></div>
          </div>
        </div>
      </div>
 </van-list>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  data() {
    return {
       keyword: "",
       loading: false,
       finished: false,
       page: 1,
      list: [ ]
    };
  },
  mounted(){
    this.keyword = window.sessionStorage.getItem("keyword") || this.$route.query.name;
    this.get_SellerPageList()
  },
  methods:{
     todetail (id) {
            this.$router.push({
                path: '/details',
                query: {
                    id: id
                }
            })
        },
    onLoad(){
            this.page+=1
            this. get_SellerPageList ()
          },
            get_SellerPageList () {
            request.post(this.$api + '/mobile/GetCommodityProjectInfoList', {
                keyword:this.keyword,
                Page: this.page,
                Rows: 9,
                Order: "asc",
               Sort: "id"
                // Type:'ShopProject'
            }).then(res => {
                // this.SellerPageList = res.Data.List
                // console.log(this.SellerPageList)
                this.loading=false;
                if(res.Data.List.length){
                  var arr=res.Data.List
                  for(let i=0;i<arr.length;i++){
                    this.list.push(arr[i])
                  }
                }else{
                  this.finished=true
                }
                console.log(this.list)
            }).catch(err => {

            })
        },
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
.xiangmu_ul {
    margin-top: 180 / @base;
    padding-bottom:100 / @base;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 0 3%;
    justify-content: space-between;
    // background: #EEEEEE;
    .xiangmu_li {
      box-shadow: 0px  0px  5px  1px #C4C3C6;
      margin-top: 25 / @base;
      width: 49%;
    //   height: 460 / @base;
      background: #FFFFFF;
      border-radius: 5px;
      img {
        width: 100%;
        height: 280 / @base;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
      .xiangmu_bottom {
        width: 100%;
        padding: 15 / @base;

        .xiangmu_title {
          overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; //行数
    -webkit-box-orient: vertical;
          width: 100%;
          // height: 80/ @base;
          font-size: 28 / @base;
        }
        .xiangmu_flag {
          width: 100%;
          min-height: 30 / @base;
          font-size: 14 / @base;
          color: #C0C0C0;
        }
        .xiangmu_price{
            width: 100%;
            height: 55/@base;
            .xiangmu_price_daola{
                font-size: 25/@base;
                color: red;
            }
            .xiangmu_price_money{
                margin-left: 5/@base;
                 font-size: 40/@base;
                color: red;
            }
        }
        .xiangmu_shop{
           width: 100%;
           height: 55/@base;
           line-height: 55/@base;
           font-size: 20/@base;
           color: #C0C0C0;
           span{
               color: black;
               margin-left: 20/@base;
           }
        }
      }
    }
  }

</style>