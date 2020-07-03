<template>
  <div class="container">
    <!-- 头部返回栏 -->
    <Return class="fix">分类</Return>

    <nav class="clearfix">
      <div class="left fl" ref="leftScroll">
        <ul>
          <li
            v-for="(item, index) in 15"
            :key="index"
            :class="index === activeId ? 'active':''"
            @click="addActive(index)"
          >
            <span>护肤</span>
          </li>
        </ul>
      </div>

      <div class="right fr" ref="rightScroll">
        <div class="product">
          <div class="item" v-for="(item, index) in 3" :key="index">
            <h3>运动鞋</h3>
            <ul class="clearfix">
              <li v-for="(item, index) in 5" :key="index" class="fl">
                <a href>
                  <img src="../../assets/images/category-1.png" alt />
                  <span>运动鞋</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
/*eslint-disable*/
import BScroll from "better-scroll"
import Return from "../../components/Return.vue";

export default {
  data() {
    return {
      activeId: 0
      // active: "active"
    };
  },
  components: {
    Return
  },
  methods: {
    addActive(index) {
      this.activeId = index;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.lScroll = new BScroll(this.$refs.leftScroll, {
        swipeBounceTime: 1000,
        click: true
      });
      this.rScroll = new BScroll(this.$refs.rightScroll, {
        swipeBounceTime: 1000
      });
    });
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
.container {
  width: 100%;
  height: 100%;
}
.container {
  padding-top: 100 / @base;
}
.fix {
  position: fixed;
  top: 0;
  left: 0;
}
nav {
  width: 100%;
  height: 100%;
  border-top: 1 / @base solid #bfbfbf;
  .left {
    height: 100%;
    background-color: #fff;
    width: 200 / @base;
    font-size: 30 / @base;
    margin-top: 1 / @base;
    overflow: hidden;

    ul {
      background-color: #eee;
      li {
        text-align: center;
        padding: 0 20 / @base;
        span {
          display: block;
          padding: 35 / @base 0;
          // border-bottom: 1 / @base solid #bfbfbf;
        }
      }
    }
  }
  .right {
    // width: 550 / @base;

    height: 100%;
    overflow: hidden;
    .product {
      padding-top: 55 / @base;
      .item {
        padding-left: 25 / @base;
        h3 {
          padding-left: 22 / @base;
          font-size: 28 / @base;
          color: #333;
        }
        ul {
          margin-top: 60 / @base;
          li {
            width: 33.3%;
            margin-bottom: 50 / @base;
            a {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 28 / @base;
              color: #333;
              img {
                width: 102 / @base;
                height: 50 / @base;
                margin: 0 auto;
                margin-bottom: 50 / @base;
              }
            }
          }
        }
      }
    }
  }
}

.active {
  background-color: #fff;
  border-left: 5 / @base solid #cfbbf8;
  color: #cfbbf8;
}
</style>