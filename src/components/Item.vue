<template>
  <div class="item" :style="yang">
    <slot :a="a"  name="a"></slot>
    <slot :a="a" :b="b" name='b'></slot>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  props: {
    label: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    }
  },
data () {
  return {
    a: 'qqq',
    b: 'sss'
  }
},
  computed: {
    yang() {
      return {
        display: this.label == this.$parent.currentId ? "block" : "none"
      };
    }
  }
};
</script>
<style scoped lang='less'>
</style>