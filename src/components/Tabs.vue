<template>
  <div class="tab">
    <div class="tab_item">
      <ul ref="ul">
        <li @click="onActive(index)" v-for="(item, index) in list" :key="index">
          <a
            :style="{  color: currentId == index ? activeColor : color}"
            ref="nav"
            href="javascript:void(0)"
          >{{item}}</a>
        </li>
      </ul>
      <div
        ref="content"
        class="line"
        :style="{marginLeft: marginLeft + 'px',transform: `translateX(${dis}px)`, width: width + 'px', backgroundColor:backgroundColor}"
      ></div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  props: {
    color: {
      type: String,
      default: "#333"
    },
    backgroundColor: {
      type: String,
      default: ""
    },

    list: {
      type: Array,
      default() {
        return ["订单", "订分的人单", "订单", "订单", "订"];
      }
    },
    activeColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      dongtai:1,
      currentId: '',
      dis: "",
      width: "",
      marginLeft: ""
    };
  },
  mounted() {
    this.onActive();
  },
  methods: {
    onActive(index = this.dongtai) {
      this.currentId = index;

      this.$emit("id", this.currentId);

      this.width = this.$refs.nav[index].getBoundingClientRect().width;
      this.marginLeft =
        this.$refs.nav[0].getBoundingClientRect().left -
        this.$refs.ul.getBoundingClientRect().left;

      this.dis =
        this.$refs.nav[index].getBoundingClientRect().left -
        this.$refs.nav[0].getBoundingClientRect().left;
    }
  }
};
</script>
<style lang="less" scoped>
@base: 75rem;

.line {
  height: 5 / @base;
  background-color: #000;
  transition: all 0.5s;
}

.tab {
  .tab_item {
    position: relative;
  }
  ul {
    display: flex;
    justify-content: space-between;
    li {
      
      // width: 50%;
      text-align: center;
      padding: 20 / @base 12 / @base;
      font-size: 32 / @base;
    }
  }
}
</style>
