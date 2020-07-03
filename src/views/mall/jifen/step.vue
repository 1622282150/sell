<template>
  <div>
    <van-steps active-color="#f0b4ff" direction="vertical" :active="active">
      <van-step v-for="(item,index) in info" :key="index">
        <div class="box">
             <img
            v-if="item.lv=== 1"
            src="../../../assets/images/vip_vv1.png"
            alt
          />
          <img v-else-if="item.lv === 2" src="../../../assets/images/vip_vv2.png" alt />
          <img v-else-if="item.lv === 3" src="../../../assets/images/vip_vv3.png" alt />
          <img v-else-if="item.lv === 4" src="../../../assets/images/vip_vv4.png" alt />
          <img v-else-if="item.lv === 5" src="../../../assets/images/vip_vv5.png" alt />
          <img v-else-if="item.lv === 6" src="../../../assets/images/vip_vv6.png" alt />
          <img v-else src="../../../assets/images/vip_vv7.png" alt />
            <p>积分值: <span :class="{'span_active':index<=active,'span_bold':index === active}">{{item.des}}</span></p>
        </div>
      </van-step>
    </van-steps>
  </div>
</template>

<script>
import request from '@/utils/request'
import { Step, Steps } from "vant";
export default {
  props: {
    level: Number
  },
  data() {
    return {
      active: 0,
      info: [
        {
          lv: 1,
          des: "0~300",
          img: require("../../../assets/images/vip_vv1.png")
        },
        {
          lv: 2,
          des: "300~1000",
          img: require("../../../assets/images/vip_vv2.png")
        },
        {
          lv: 3,
          des: "1000~2000",
          img: require("../../../assets/images/vip_vv3.png")
        },
        {
          lv: 4,
          des: "2000~5000",
          img: require("../../../assets/images/vip_vv4.png")
        },
        {
          lv: 5,
          des: "5000~10000",
          img: require("../../../assets/images/vip_vv5.png")
        },
        {
          lv: 6,
          des: "10000~20000",
          img: require("../../../assets/images/vip_vv6.png")
        },
        {
          lv: 7,
          des: "20000~",
          img: require("../../../assets/images/vip_vv7.png")
        }
      ]
    };
  },
  mounted() {
    this.active = this.level-1;
    console.log(this.active)
    this.get()
  },
  methods:{
    get(){
      request.post(this.$api+'/mobile/GetPointsLeverInfoList',{
      
      }).then(res=>{
        this.info=res.Data.List
      }).catch(err=>{

      })
    }
  },
};
</script>
<style scoped lang='less'>
@base: 37.5rem;
//外框
/deep/.van-step--vertical:not(:last-child)::after{
  border:none;
}
/deep/.van-steps--vertical {
  padding: 20 / @base 0 20/@base 82 / @base;
}
/deep/.van-step--vertical {
  padding: 5 / @base 10px 5 / @base 0;
}
//灰色小球所属
/deep/.van-step__circle-container {
  width: 10 / @base;
  height: 10 / @base;
  top:50%;//31
  left: -37 / @base;
  background: #e6e6e6;
  border-radius: 50%;
}
/deep/.van-step__circle {
  background: #e6e6e6;
  // display: none;
  width: 10 / @base;
  height: 10 / @base;
}
/deep/.van-step--finish .van-step__circle {
  background: #f0b4ff;
}
//大球
/deep/.van-icon-checked {
  position: relative;
  left: -3 / @base;
  width: 16 / @base;
  height: 16 / @base;
  background: #f0b4ff;
  z-index: 111;
  border-radius: 50%;
}
//线条
/deep/.van-step--vertical:first-child::before{
    width: 0/@base;;
    height: 50%;
    background: #f0b4ff;
    left:-38/ @base;
    top: 10/@base;
}
/deep/.van-step__line {
  width: 2 / @base;
  top: 50%;
  left: -38 / @base;
}
/deep/.van-step--finish .van-step__line {
  background: #f0b4ff;
}


.box {
  // position: relative;
  padding: 7/@base 0 7/@base 15/@base;
  width: 253 / @base;
  height: 62 / @base;
  background-color: #ffffff;
  box-shadow: 2px 3px 12px 1px rgba(187, 187, 187, 0.46);
  border-radius: 10px;
  img{
    height: 18/@base;
    width: auto;
    background-size: 100% 100%;
  }
  p{
      margin-top: 9/@base;
      color: #3e3e3e;
    //   span{
    //       color: #3e3e3e;
    //   }
      .span_active{
          color: #9441ff !important;
      }
      .span_bold{
          font-weight: bold;
      }
  }
}
</style>
