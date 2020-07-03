<template>
  <div>
    <div class="list" v-show="list.length">
      <div
        v-for="(item,index) in list"
        :key="index"
        class="item"
        :class="{'first-item':index==0,'last-item':index==list.length-1}"
      >
        <div class="name">步骤{{index + 1}}</div>
        <div class="art" v-html="item"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  }
};
</script>
<style scoped lang='less'>
@base: 37.5rem;
.list {
  box-sizing: border-box;
  padding: 30/@base 50/@base 44/@base 22/@base;
}
.item {
  word-break: break-all;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* 上下间距 */
  margin: 58/@base 0;
  position: relative;
}
.item:before {
  content: "";
  width: 1px;
  /* 动态计算线条的高度 */
  /* item的一半50% - 左侧class='name'高度的一半 + margin值*/
  /* height: calc(50% + 10px); */
  height: 50%;
  background: #e6e6e6; //999999
  position: absolute;
  left: 27/@base;
  top: -29/@base;
  z-index: -1;
}
.item:after {
  content: "";
  width: 1px;
  /* height: calc(50% + 10px); */
  height: 51%;
  background: #e6e6e6; //999999
  position: absolute;
  left: 27/@base;
  bottom: -29/@base;
  z-index: -1;
}
.item.first-item {
  margin-top: 0px;
}
.item.last-item {
  margin-bottom: 10/@base;
}
.item.first-item:before {
  content: "";
  height: 0;
}
.item.last-item:after {
  content: "";
  height: 0;
}

.item .name {
  width: 52/@base;
  height: 52/@base;
  line-height: 52/@base;
  text-align: center;
  border-radius: 50%;
  box-shadow: -2px 4px 9px 0px 
		rgba(156, 148, 147, 0.34);
  font-size: 14px;
  font-weight: bold;
  color: #666666;
  z-index: 3;
}
.item .art {
  width: calc(100% - 80px);
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 24px;
  letter-spacing: 0px;
  color: #535353;
}
</style>