<template>
  <div>
    <div  class="tool" v-show='tools.length || colors.length'>
      <div class="tool_top">
        <p class="tool_left_title">工具</p>
        <div class="tool_tool">
          <div class="tool_tool_item" v-for="(item,index) in tools" :key="index">
            <img :src="item.Url" alt />
            <p>{{item.Name}}</p>
          </div>
        </div>
      </div>
      <div class="tool_bottom">
        <p class="tool_bottom_title">适用颜色</p>
        <div class="tool_bottom_right">
          <div class="tool_bottom_right_item" v-for="(item,index) in colors" :key="index">
            <!-- <div v-if="item.Url" :style="{'background':url(item.Url)}"></div> -->
            <img  v-if="item.Url" :src="item.Url" alt="">
            <div v-else :style="{'background':item.ColorCode}"></div>
            <p>{{item.Name}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tools: {
      type: Array,
      default: []
    },
    colors: {
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
.tool {
  width: calc(~"100% - 30px");
  background-color: #f4f4f4;
  border-radius: 10px;
  margin: 31 / @base auto 0 auto;
    padding: 15 / @base 0;
  .tool_top {
    display: flex;
    width: 100%;
    // height: 84 / @base;
    .tool_left_title {
      padding-left: 12 / @base;
      width: 83 / @base;
      height: 84 / @base;
      line-height: 84 / @base;
      font-size: 14px;
      font-weight: bold;
      font-stretch: normal;
      color: #474747;
    }
    .tool_tool {
      display: flex;
      .tool_tool_item {
        min-width: 40 / @base;
        margin-right: 10 / @base;
        text-align: center;
        img {
          margin: 10/@base auto 0 auto;
          width:auto;
          height: 59 / @base;
          background-size: 100% 100%;
        }
        p {
          margin-top: 7 / @base;
          font-size: 8px;
          font-weight: bold;
          color: #343434;
          text-align: center;
        }
      }
    }
  }
  .tool_bottom {
    display: flex;
    width: 100%;
    height: 60 / @base;
    .tool_bottom_title {
      padding-left: 12 / @base;
      width: 83 / @base;
      height: 60 / @base;
      line-height: 60 / @base;
      font-size: 14px;
      font-weight: bold;
      font-stretch: normal;
      color: #474747;
    }
    .tool_bottom_right {
      // width: 100%;
      display: flex;
      .tool_bottom_right_item {
        min-width: 40 / @base;
        margin-right: 10 / @base;
        div {
          width: 20 / @base;
          height: 20 / @base;
          border-radius: 50%;
          margin: 15/@base auto 0 auto;
        }
        img{
          width: 20 / @base;
          height: 20 / @base;
          border-radius: 50%;
          margin: 15/@base auto 0 auto;
        }
        p {
          margin-top: 8 / @base;
          text-align: center;
          letter-spacing: 0px;
          color: #343434;
          font-size: 10px;
          font-weight: bold;
          white-space:nowrap;    
        }
      }
    }
  }
}
</style>