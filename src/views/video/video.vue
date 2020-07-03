<template>
  <div ref="paging" style="background:black">
    <header class="head">
      <i class="iconfont icon-zuojiantou jiantou"></i>
      <i class="iconfont icon-fenxiang2"></i>
    </header>
    <div id="J_prismPlayer" class="box"></div>

    <!--  -->
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  data() {
    return {
      fullheight: document.documentElement.clientHeight,
      url:'',
    };
  },
  created(){
   
  },
  mounted:function(){
    this.geturl()
    console.log(this.url)
    this.$refs.paging.style.height = this.fullheight + "px";
    let player = new Aliplayer(
      {
        id: "J_prismPlayer",
        source:'http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4',
        width: "100%",
        height: "height:calc(100% - 50px)",
        autoplay: true,
        //  vid : '1e067a2831b641db90d570b6480fbc40',
        //     playauth : 'ddd',
        //     cover: 'http://liveroom-img.oss-cn-qingdao.aliyuncs.com/logo.png',            
        //     //播放方式三：仅MPS用户使用
        //     vid : '1e067a2831b641db90d570b6480fbc40',
        //     accId: 'dd',
        //     accSecret: 'dd',
        //     stsToken: 'dd',
        //     domainRegion: 'dd',
        //     authInfo: 'dd',
        //     //播放方式四：使用STS方式播放
        //     vid : '1e067a2831b641db90d570b6480fbc40',
        //     accessKeyId: 'dd',
        //     securityToken: 'dd',
        //     accessKeySecret: 'dd',
        //     region:'cn-shanghai',//eu-central-1,ap-southeast-1
        // skinLayout: [
        //   { name: "bigPlayButton", align: "blabs", x: 30, y: 50 },
        //   {
        //     name: "H5Loading",
        //     align: "cc"
        //   },
        //   {
        //     name: "controlBar",
        //     align: "blabs",
        //     x: 0,
        //     y: 0,
        //     children: [
        //       { name: "progress", align: "tlabs", x: 0, y: 0 }, //隐藏进度条
        //       { name: "playButton", align: "tl", x: 15, y: 13 },
        //       { name: "timeDisplay", align: "tl", x: 10, y: 6 },
        //       { name: "fullScreenButton", align: "tr", x: 20, y: 12.5 },
        //       { name: "volume", align: "tr", x: 20, y: 12.5 }
        //     ]
        //   }
        // ]
      },
      function(player) {
         console.log("The player is created");
        // player.play();
      }
    );
  },
  methods:{
    geturl(){
      request.post(this.$api+'/mobile/GetArticleDetail?id=1477',{
      
      }).then(res=>{
      this.url=res.Data.Attachment
      console.log(this.url)
      }).catch(err=>{

      })
    }
  }
};
</script>
<style scoped lang='less'>
@base: 75rem;
.head {
  background: none;
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  padding: 20 / @base 40 / @base;
  i {
    color: #fff;
    font-size: 60 / @base;
    line-height: 60 / @base;
  }
}

.box {
  width: 100%;
  height: calc(~"100% - 50px");
  /deep/ .prism-controlbar-bg {
    display: none;
  }
  /deep/ .prism-play-btn {
    display: none;
  }
  /deep/ .prism-time-display {
    display: none;
  }
  /deep/ .prism-fullscreen-btn {
    display: none;
  }
  /deep/ .prism-volume {
    display: none;
  }
  /deep/ .prism-controlbar {
    height: 6px;
  }
  /deep/ .prism-progress {
    background: black;
    height: 1px;
  }
  /deep/ .prism-progress-hover {
    height: 1px;
  }
  /deep/ .prism-progress-loaded {
    background: black;
  }
  /deep/ .prism-progress-played {
    background: #fff;
  }
}
</style>