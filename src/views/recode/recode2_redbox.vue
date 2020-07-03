<template>
  <div>
    <div  class="box" v-if="title != ''">
      <div   ref="box" :class="isshow?'':'expansion'" class="box_item" v-html="title"></div>
      <p v-if="!isshow" @click="zhankai" class="zhankai">
        展开
        <i class="iconfont icon-xiangxia2"></i>
      </p>
      <p v-else @click="shouqi" class="zhankai">
        收起
        <i class="iconfont icon-xiangshang2"></i>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title'],
  data() {
    return {
      isshow: false,
      fon:
        "可选用弗兰克你克你手机德哈卡还是电动机卡可选用弗兰克你手机德哈卡还是电动机卡可选用弗兰克你手机德哈卡还是电动机卡可选用弗兰克你手机德哈卡还是电动机卡可选用弗兰手机德哈卡还是电动机卡可选用弗兰克你手机德哈卡还是电动机卡萨可选用弗兰克你手机德哈卡还是电动机卡萨可选用弗兰克你手机德哈卡还是电动机卡萨可选用弗兰克你手机德哈卡还是电动机卡萨可选用弗兰克你手机德哈卡还是电动机卡萨可选用弗兰克你手机德哈卡还是电动机卡萨萨山东矿机爱仕达卡还是打卡时刻哈德克哈萨克打开"
    };
  },
  created(){
    
  },
  methods: {
    zhankai() {
      this.isshow = true;
      // this.$refs.box.style.backgroundSize='100% 100%'
   
    },
    shouqi() {
      this.isshow = false;
      // this.$refs.box.style.height='120px'
     
    }
  }
};
</script>
<style scoped lang='less'>
 .expansion{
    width: 93%;
    // height:98px!important;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp:3; //行数
    -webkit-box-orient: vertical;
  }
.box {
  position: relative;
  color: white;
  width: 93%;
  height: auto;
  padding: 12px 12px 30px 12px;
   background: url('../../assets/images/red.png') repeat-y;
   background-size: 120%;
   background-position: center center;
  // background: #e271a0;
  border-radius: 8px;
  font-size: 12px;
  margin: 20px auto 0 auto;
  transition:height 2s;
  .box_item{
    width: 100%;
    // height:60px;
    line-height: 20px;
  }
  .zhankai {
    position: absolute;
    right: 12px;
    bottom: 5px;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    color: #fefefe;
    i {
      font-size: 6px;
      margin-left: 6px;
    }
  }
}
</style>