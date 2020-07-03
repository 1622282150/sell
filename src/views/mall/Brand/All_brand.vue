<template>
  <div>
    <FixedHeader>全部品牌</FixedHeader>
    <!-- 索引栏 -->
    <div class="top_title">
      <div class="top_title_left" :class="first_index===true?'top_title_left_active':''" @click="sel_all" >全部</div>
      <div class="top_title_right">
        <scroller lock-y :scrollbar-x="false">
          <div class="box1">
            <div
              class="box1-item"
              v-for="(i,index) in indexlist"
              :key="index"
              :class="active_index===index?'box1_active':''"
              @click="sel_index(index)"
            >{{i}}</div>
          </div>
        </scroller>
      </div>
    </div>

    <!-- 内容 -->
     <div class="tuijian_box">
       <div v-for="(item,index) in imglist" :key="index" class="tuijian_box_item">
          <img  :src="item.img" alt />
       </div>
     
    </div>
  </div>
</template>

<script>
import FixedHeader from "@/components/FixedHeader.vue";
export default {
  components: {
    FixedHeader
  },
  data() {
    return {
      first_index:true,
      active_index:-1,
      indexlist: ['A','B', 'C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',],
      imglist: [
        { img: require("../../../assets/images/brand_logo1.png") },
        { img: require("../../../assets/images/brand_logo2.png") },
        { img: require("../../../assets/images/brand_logo3.png") },
        { img: require("../../../assets/images/brand_logo4.png") },
        { img: require("../../../assets/images/brand_logo5.png") },
        { img: require("../../../assets/images/brand_logo6.png") },
        { img: require("../../../assets/images/brand_logo7.png") },
         { img: require("../../../assets/images/brand_logo5.png") },
        { img: require("../../../assets/images/brand_logo6.png") },
        { img: require("../../../assets/images/brand_logo7.png") },
      ],
   };
  },
  methods:{
    sel_all(){
       this.active_index=-1
       this.first_index=true
    },
    sel_index(index){
      this.first_index=false
      this.active_index=index

    }
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
.top_title {
  display: flex;
  width: 100%;
  height: 90 / @base;
  border-bottom: 1px solid #e6e6e6;
  padding: 20 / @base 0 20 / @base 40 / @base;
  .top_title_left_active{
    color: white !important;
    background: #B693EB;
  }
  .top_title_left {
    width: 15%;
    height: 50 / @base;
    line-height: 50 / @base;
    border: 1px solid #decef6;
    color: #decef6;
    border-radius: 20px;
    font-size: 28 / @base;
    text-align: center;
  }
  .top_title_right {
    width: 84%;
    height: 50 / @base;
    line-height: 50 / @base;
      .box1 {
      width:1400/@base;
      height:50/@base;
      position: relative;
      padding-left:16/@base;
  
    }
    .box1-item {
      font-size: 25/@base;
      // background-color: #9E9E9E;
      width:40/@base;
      height:40/@base;
      border-radius: 6px;
      line-height: 40/@base;
      margin: 5/@base;
      // background-color: #ccc;
      display:inline-block;
      // margin-left: 15px;
      float: left;
      text-align:center;
    }
    .box1_active{
      background-color:#B693EB;
      color: white;
    }
  }
}
// 内容
.tuijian_box{
    width: 100%;
    padding:  40/@base;
    margin-bottom: 20/@base;
    display: flex;
    flex-flow: wrap;
    .tuijian_box_item{
      width: 25%;
      height: 180/@base;
      margin-bottom: 30/@base;
      // background:red;
      img{
        width: 80%;
        height: 180/@base;
        margin: 0 auto;
        
      }
    }
   
}

</style>