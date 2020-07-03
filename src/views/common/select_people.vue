<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar
      title="选择联系人"
      left-text="返回"
      right-text="完成"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <van-radio-group v-model="radio">
        <van-cell-group>
        <van-cell v-for="(item,index) in list" :key="index" :title="item.name" clickable @click="xuanze(index,item)">
          <van-radio slot="right-icon" :name="item.id" />
        </van-cell>
       
      </van-cell-group>
    </van-radio-group>
  </div>
</template>
<script>
import { RadioGroup, Radio, Cell, CellGroup, Toast } from "vant";
export default {
  data() {
    return {
      radio:'',
      name:'',
      list: [
          
        { name: "小李", id: 11 },
        { name: "张三", id: 22 },
        { name: "刘金", id: 33 },
        { name: "汪洋", id: 44 },
        { name: "沙雕", id: 55 }
      ]
    };
  },
  methods: {
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("选择完成");
      window.sessionStorage.setItem('aite',this.radio)
      window.sessionStorage.setItem('aitename',this.name)
      this.$router.push('/fabu')
    },
    xuanze(index,item) {
     this.radio = item.id
     this.name=this.list[index].name
    
    }
  }
};
</script>
<style lang="less" scoped>
</style>