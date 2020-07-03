<template>
  <div>
    <header>
      <i @click="goback()" class="iconfont icon-zuojiantou"></i>
      <div class="head">举报</div>
    </header>
    <div class="bu"></div>
    <div class="title">
      举报理由
      <span>{{title}}</span>
    </div>
    <div class="des">举报描述(选填)</div>
    <textarea
      v-model="message"
      placeholder="提供更多信息有助于举报快速处理"
      class="text"
      name
      id
      cols="30"
      rows="10"
    ></textarea>
    <div class="xuantian">
      图片证据(选填)
      <span>最多4张</span>
    </div>
    <div class="img_box">
      <van-uploader :after-read="after_fale" v-model="fileList" multiple :max-count="4" />
    </div>
    <div class="bottom" @click="tijiao">提交</div>
    <p style="text-align:center;font-size:14px;color:#a6a6a6;margin-top:9px">您的举报将在24小时内被处理,处理结果将第一时</p>
    <p style="text-align:center;font-size:14px;color:#a6a6a6;margin-top:5px">间再通知消息中反馈,感谢你的配合</p>
  </div>
</template>

<script>
import request from "@/utils/request";
import { Uploader, Toast } from "vant";
export default {
  data() {
    return {
      canshu:'',
      id: "",
      title: "",
      message: "",
      fileList: [],
      endlist: []
    };
  },

  created() {
  
    // js 截取浏览器参数方法
   
 
  },
  mounted() {
    var name=window.location.href
    this.parseUrl(name)
    
  },
  methods: {
    goback() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        // on close
        console.log("我是要去安卓");
        // let url='http://test1.merrychange.net/#/articlestie?id='+this.articleid
        window.android.closePage();
        this.$router.back();
      }else{
        this.$router.back()
      }
    },
    parseUrl(url){
      var parse = url.substring(url.indexOf("?") + 1),
        params = parse.split("&"),
        len = params.length,
        item = [],
        param = {};

    for (var i = 0; i < len; i++) {
        item = params[i].split("=");
        param[item[0]] = item[1];
    }
     console.log(param)
     this.id=param.id
     this.canshu=param.title
      var t=param.title
      if(t === 'guanggao'){
       this.title='广告内容'
     }else if(t === 'chaoxi'){
       this.title='搬运抄袭'
     }else if(t === 'buyoushan'){
       this.title='不友善内容'
     }else if(t === 'zaoyao'){
       this.title='造谣'
     }else if(t === 'xujia'){
       this.title='虚假互动数据'
     }else if(t === 'seqing'){
       this.title='色情低俗'
     }else if(t === 'weifa'){
       this.title='违法违规'
     }else{
       this.title='其他'
     }
    return param;

    
    },
    after_fale(file) {
      console.log(file.file);
      let fil = file.file;
      let formData = new FormData();
      // // let fileName = `${+new Date()}.${fileType}`;
      var fileName = fil.name;
      formData.append("FileType", "ImageUser");
      formData.append("FileName", fileName);
      formData.append("file", fil);
      let config = {
        headers: { "Content-Type": "multipart/form-data;" }
      };
      request
        .post(this.$api + "/AppFile/UploadAttachment", formData, config)
        .then(res => {
          if (res.IsSuccess) {
            console.log(res.Data.Url);
            this.endlist.push(res.Data.Url)
            console.log(this.endlist)

          } else {
            Toast(res.Message);
          }
        })
        .catch(err => {});
    },
    tijiao(){
       request
        .post(this.$api + "/mobile/UserTipAdd", {
          MainId:this.id,
          TitleType:this.canshu,
          Type:'Article',
          Content:this.message,
          Img1:this.endlist[0] || '',
          Img2:this.endlist[1] || '',
          Img3:this.endlist[2] || '',
          Img4:this.endlist[3] || '',
        })
        .then(res => {
          if(res.IsSuccess){
           this.goback()
          }else{
            Toast(res.Message)
          }
        })
        .catch(err => {});
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
.title {
  margin-top: 31 / @base;
  font-size: 30 / @base;
  color: #666666;
  margin-left: 40 / @base;
  span {
    margin-left: 20 / @base;
    color: #333333;
  }
}
.des {
  margin-top: 62 / @base;
  margin-left: 40 / @base;
  margin-bottom: 22 / @base;
  font-size: 30 / @base;
  color: #666666;
}
.text {
  width: 670 / @base;
  height: 300 / @base;
  display: block;
  font-size: 30 / @base;
  color: #aaaaaa;
  padding: 15 / @base 0;
  margin: 0 auto;
  // background:#e6e6e6;
  background: #eeeeee;
}
.xuantian {
  margin-top: 62 / @base;
  margin-bottom: 39 / @base;
  width: 100%;
  height: 27 / @base;
  padding: 0 47 / @base 0 40 / @base;
  font-size: 30 / @base;
  color: #666666;
  span {
    color: #aaaaaa;
    float: right;
  }
}
.img_box {
  margin-top: 34 / @base;
  width: 100%;
  padding-left: 40 / @base;
  width: 100%;
  height: 160 / @base;
  // background: red;
}
.bottom {
  width: 500 / @base;
  height: 80 / @base;
  text-align: center;
  line-height: 80 / @base;
  background: #b695e9;
  color: #fff;
  font-size: 30 / @base;
  margin: 180/ @base auto 0 auto;
  border-radius: 20px;
}
</style>