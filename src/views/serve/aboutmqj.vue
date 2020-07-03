<template>
  <div>
    <header>
      <i @click="goback()" class="iconfont icon-zuojiantou"></i>
      <div class="head">关于魅千金</div>
    </header>
    <div class="bu"></div>
    <div style="padding:0 20px">
     <p><font face="微软雅黑"><span style="font-size: 14px;">﻿</span><span style="text-indent: 21pt; font-size: 14px;">《魅千金美肤美妆》是由杭州讯英生物科技发展有限公司开发的一款手机相机扫脸测试肌肤状态的美妆美肤</span><span lang="EN-US" style="text-indent: 21pt; font-size: 14px;">app</span><span style="text-indent: 21pt; font-size: 14px;">，适合年轻女性用户日常使用，使用起来简单方便，随时随地掌握皮肤状态，测试肤质报告也更全面展现给用户的肤质测试肤龄、毛孔、瑕疵等全方位的报告解析，还会根据针对皮肤问题进行大数据分析，匹配出最适合有效的解决方案，让变美丽更省力。</span><br></font></p><span style="font-size: 14px;">

</span><p class="MsoNormal"><font face="微软雅黑"><span lang="EN-US" style="font-size: 14px;">&nbsp;&nbsp;&nbsp;&nbsp;
</span><span style="font-size: 14px;">魅千金功能有：</span></font></p><span style="font-size: 14px;">

</span><p class="MsoNormal"><font face="微软雅黑"><span style="font-size: 14px;">「</span><span lang="EN-US" style="font-size: 14px;">AI</span><span style="font-size: 14px;">智能测肤」只需</span><span lang="EN-US" style="font-size: 14px;">3</span><span style="font-size: 14px;">秒就能精准检测出肤质、肤龄、肤色、黑头、黑眼圈、痘痘、皱纹等皮肤状况，随时随地掌握皮肤状态。</span></font></p><span style="font-size: 14px;">

</span><p class="MsoNormal" style="line-height:11.0pt"><font face="微软雅黑"><span style="font-size: 14px;">「肤质报告及问题解决方案」从问题原因进行深度分析，来科学推荐日常护理方法、护肤品、医美项目、注意事项、相关魅友经验，帮助快速有效解决问题。</span><b><span lang="EN-US"></span></b></font></p><span style="font-size: 14px;">

</span><p class="MsoNormal"><font face="微软雅黑"><span style="font-size: 14px;">「魅力购商城」专属女性用品商城，护肤、服饰、内衣、家居等品类齐全，</span><span lang="EN-US" style="font-size: 14px;">100%</span><span style="font-size: 14px;">正品保障，还有限时秒杀、限量折扣等优惠多多，既省时又省心。</span></font></p><span style="font-size: 14px;">

</span><p class="MsoNormal"><font face="微软雅黑"><span style="font-size: 14px;">「附近美容店」这里汇集了全国各地美容店，平台与魅友共同监管，确保口碑真实、价格合理、功效保障。</span></font></p><span style="font-size: 14px;">

</span><p class="MsoNormal"><font face="微软雅黑"><span style="font-size: 14px;">「社区交流」这里有来全国不同地区、职业、年龄的护肤达人及千万魅友共同探讨，一起分享交流心得，让变美丽更简单。</span></font></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goback() {
      console.log("我是子组件返回");
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        // on close
        console.log("我是要去安卓");
        // let url='http://test1.merrychange.net/#/articlestie?id='+this.articleid
        window.android.closePage();
        this.$router.back();
      } else {
        this.$router.back(-1);
      }
    }
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
header {
  width: 100%;
  position: relative;
  // z-index: 10;
  i {
    position: fixed;
    left: 30 / @base;
    top: 30 / @base;
    font-size: 50 / @base;
    color: black;
    z-index: 11;
  }
  .head {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100 / @base;
    background: white;
    font-size: 35 / @base;
    text-align: center;
    line-height: 100 / @base;
    border-bottom: 1px solid #e6e6e6;
  }
}
.bu {
  width: 100%;
  height: 100 / @base;
}
.box {
  width: 100%;
  padding: 0 25 / @base;
  .box_title {
    padding: 30 / @base 0;
    font-weight: 600;
    font-size: 36 / @base;
  }
  .box_item {
    font-size: 25 / @base;
  }
}
</style>