<template>
  <div class="contain">
    <Head>
      <span>我的足迹</span>
    </Head>
  </div>
</template>
<script>
/*eslint-disable*/
import Head from "../components/Header.vue";

export default {
  data() {
    return {
      active: 0
    };
  },
  components: {
    Head
  }
};
</script>
<style lang="less" scoped>
@desgin: 1080;
@base: 108rem;
.header {
  border-bottom: 1px solid #ccc;
}
</style>


