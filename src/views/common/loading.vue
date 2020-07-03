<template>
  <div>
      <div style="color:red" v-if="this.show">正在加载中</div>
  </div>
</template>

<script>
export default {
    props: ["show"],
  data() {
    return {

    };
  }
};
</script>
<style scoped lang='less'>
</style>