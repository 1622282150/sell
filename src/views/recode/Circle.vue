<template>
  <div class="circle">
    <div class="inleft">
      <div class="left" :style="{'transform': rotateDeg.left}"></div>
    </div>
    <div class="inright">
      <div class="right" :style="{'transform': rotateDeg.right}"></div>
    </div>
    <div class="inner">
      <span class="score">{{score}}</span>
    </div>
  </div>
</template>

<script>
const ALL_DEG = 180;
const POINT = 3.6;

export default {
  props: {
    score: {
      type: Number,
      default: 20
    }
  },
  computed: {
    rotateDeg() {
      if (this.score * POINT < ALL_DEG) {
        return {
          right: `rotate(${this.score * POINT}deg)`,
          left: "rotate(0deg)"
        };
      } else {
        return {
          right: "rotate(180deg)",
          left: `rotate(${this.score * POINT - ALL_DEG}deg)`
        };
      }
    }
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
.pos {
  position: absolute;
  top: 0;
  width: 103 / @base;
  height: 206 / @base;
}

.circle {
  width: 206 / @base;
  height: 206 / @base;
  border-radius: 50%;
  background-color: #b695e9;
  overflow: hidden;
  position: relative;
  .left,
  .right {
    .pos();
    background-color: gainsboro;
  }
  .left {
    left: 0;
    transform-origin: right center;
  }
  .right {
    right: 0;
    transform-origin: 0 center;
  }
  .inleft,
  .inright {
    .pos();
    overflow: hidden;
  }
  .inleft {
    left: 0;
  }
  .inright {
    right: 0;
  }
  .inner {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200 / @base;
    height: 200 / @base;
    line-height: 202 / @base;
    text-align: center;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    font-weight: 300;
  }
}
.score {
  font-size: 90 / @base;
}
</style>