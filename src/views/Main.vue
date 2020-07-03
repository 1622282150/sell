<template>
  <div class="main">
    <router-view></router-view>
    <div class="footer">
      <ul>
        <li v-for="(item, index) in icon" :key="index" @click="tab(index, item.url)">
          <router-link :to="item.url">
            <img
              :class="index === 2 ? 'middle' : ''"
              :src="currIndex == index ? item.active : item.normal"
              alt
            />
            <p :class="currIndex == index ? 'active':''">{{item.name}}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  data() {
    return {
      active:window.sessionStorage.getItem('currIndex') || '',
      currIndex: window.sessionStorage.getItem('currIndex') || '',
      icon: [
         {
          normal: require("../assets/images/tabindex_one.png"),
          active: require("../assets/images/tabindex-oneactive.png"),
          name: "首页",
          url: "/"
        },
        {
          normal: require("../assets/images/tabindex_two.png"),
          active: require("../assets/images/tabindex-twoactive.png"),
          name: "社区",
          url: "/community"
        },
        {
          normal: require("../assets/images/tabindex_three.png"),
          active: require("../assets/images/tabindex_three.png"),
          name: "",
          url: "/fabu"
        },
        {
          normal: require("../assets/images/tabindex_four.png"),
          active: require("../assets/images/tabindex-threeactive.png"),
          name: "消息",
          url: "/message"
        },
        {
          normal: require("../assets/images/tabindex_five.png"),
          active: require("../assets/images/tabindex-fouractive.png"),
          name: "我的",
          url: "/my"
        }
      ]
    };
  },
  mounted(){
//  console.log(this.currIndex)
  },

  methods: {
      tab(index, url) {
      console.log(index);
      this.currIndex = index;
      window.sessionStorage.setItem('currIndex',this.currIndex)
      // this.$router.push(url);
    }
  }
};
</script>

<style scoped lang='less'>
@desgin: 750;
@base: 75rem;
.main {
  width: 100%;
  height: 100%;
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100 / @base;
  z-index: 999;
  background-color: #fff;
  border-top: 1 / @base solid #eee;

  li {
    float: left;
    width: 20%;
    a {
      display: block;
      padding-top: 10 / @base;
    }
    img {
      width: 50 / @base;
      height: 50 / @base;
      margin: 0 auto;
      &.middle {
        margin-top: 10 / @base;
        width: 60 / @base;
        height: 60 / @base;
      }
    }
    p {
      text-align: center;
      font-size: 22 / @base;
      color: #333;
    }
  }
}
.sn_footer p.active {
  color: #000;
}
</style>
