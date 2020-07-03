<template>
  <div>
    <header>
      <Return>修改</Return>
      <div class="fabu" @click="fabu">修改</div>
    </header>
    <!-- <div class="fenlei">
      <img src="../../assets/images/fabu_quanzi.png" alt />
      <span class="quanzi">圈子</span>
      <div
        class="biao"
        v-for="(item,index) in list"
        :key="index"
        @click="xuanze(index)"
        :class="activeindex===index?'biaoactive':''"
      >{{item.title}}</div>
    </div>-->
    <div>
      <div class="box">
        <div class="title">
          标题:
          <input type="text" placeholder="请输入你的内容(50字符以内)" v-model="title" />
        </div>
        <van-cell-group>
          <van-field
            ref="certy"
            v-model="message"
            type="textarea"
            placeholder="请描述一下具体内容(2000字以内)~"
            rows="3"
            autosize
          />
        </van-cell-group>
        <div class="shangchuan">
          <van-uploader v-model="fileList" :after-read="afterRead"  multiple :max-count="1" />
          <!-- <img @click="showtwo = true" src="../../assets/images/fabu_tianjia.png" alt /> -->
        </div>
      </div>
    </div>
    <!-- <div v-else>
      <div class="box">
        <div class="title">
          标题:
          <input type="text" placeholder="请输入你的内容(20字符以内)" v-model="title" />
        </div>
        <van-cell-group>
          <van-field
            v-model="message"
            type="textarea"
            placeholder="请描述一下具体内容(1000字以内)~"
            rows="3"
            autosize
          
          />
        </van-cell-group>
        <div class="shangchuan">
          <img @click="showtwo = true" src="../../assets/images/fabu_tianjia.png" alt />
        </div>

        <div class="huafen" @click="show=true">
          <span>话题分类</span>
        </div>
      </div>
      <div @click="sel_huafen()" class="bottom" style="position:relative">
        <img src="../../assets/images/fabu_weizhi.png" alt />
        <span>
          话题分类
          <span v-if="hua">({{hua}})</span>
        </span>
        <i class="iconfont icon-youjiantou" style="position:absolute;right:0;"></i>
      </div>
    </div>-->

    <!-- 分类的弹出层 -->
    <van-overlay :show="show" @click="show = false"></van-overlay>
    <div v-show="this.show==true" class="kuang">
      <div class="kuangtitle">请选择一个话题类型</div>
      <div class="main">
        <div
          class="ball"
          v-for="(item,index) in listxuan"
          :key="index"
          @click="huati(index)"
          :class="activeball===index?'activeball':''"
        >{{item.Name |huafenLength}}</div>
      </div>
    </div>

    <!-- 照片的弹出层 -->
    <van-overlay :show="showtwo" @click="showtwo = false"></van-overlay>
    <div v-show="this.showtwo==true" class="kuang2">
      <div class="main2">
        <img src="../../assets/images/fabu_zuyi.png" alt />
        <span>相册</span>
      </div>
      <div class="main2">
        <img src="../../assets/images/fabu_zuer.png" alt />
        <span>拍照</span>
      </div>
      <div class="main2">
        <img src="../../assets/images/fabu_zusan.png" alt />
        <span>视频</span>
      </div>
    </div>

    <!-- 选择好友的弹出层 -->
    <van-popup v-model="showhaoyou" position="top" :style="{ height: '100%' }">
      <!-- 头部 -->
      <van-nav-bar
        title="选择联系人"
        left-text="返回"
        right-text="完成"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />

      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell
            v-for="(item,index) in listinfo"
            :key="index"
            :title="item.name"
            clickable
            @click="sel(index,item)"
          >
            <van-radio slot="right-icon" :name="item.id" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>
  </div>
</template>
<script>
import {
  Cell,
  CellGroup,
  Overlay,
  RadioGroup,
  Radio,
  Toast,
  Field,
  Uploader
} from "vant";
import request from "@/utils/request";
import Return from "../../components/Return";
export default {
  components: {
    Return
  },

  data() {
    return {
      type: "", //传过来的类型    wen表示文章  hua表示话题
      id: "",
      fileList: [{ url: "" }],
      filedetail:'',//重新上传的图片
      hua: "",
      radio: "",
      name: "",

      listinfo: [
        { name: "小李", id: 11 },
        { name: "张三", id: 22 },
        { name: "刘金", id: 33 },
        { name: "汪洋", id: 44 },
        { name: "沙雕", id: 55 }
      ],
      num: 0,
      list: [{ title: "帖子" }, { title: "话题" }],
      listxuan: [
        { title: "美妆" },
        { title: "护肤" },
        { title: "整形" },
        { title: "星座" }
      ],
      activeindex: 0,
      activeball: 0,
      title: "",
      message: "",
      show: false,
      showtwo: false,
      showhaoyou: false,
      list_wen: [], //文章详情
      list_hua: [] //话题详情
    };
  },
  created() {},
  mounted() {
    this.id = this.$route.query.id;
    this.type = this.$route.query.type;
    if (this.type == "wen") {
      this.getdetail_wen();
    }else if(this.type == 'hua'){
      this.getdetail_hua()
    }
  },
  //  watch:{
  //    message(Newval,Oldval){
  //       console.log(message)
  //    }
  //  },
  
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
       if (file.type === "video/mp4") {
        Toast("不支持视频类型");
      } else {
        let formData = new FormData();
        formData.append("file", file.file);
        formData.append("fileType",'ImageArticle');
        let config = {
          headers: { "Content-Type": "multipart/form-data;" }
        };
        request
          .post(this.$api + "/appmfile/tolead", formData, config)
          .then(res => {
            if (res.IsSuccess) {
              // this.userlist.UserPhoto = res.Data;
              // this.reallist=this.reallist.concat(res.Data.List[0].Url)
              this.filedetail=res.Data.List[0].Url
            } else {
              Toast(res.Message);
            }
          })
          .catch(err => {});
      }
    },
    // 监听
    inputFunc() {
      if (this.message.charAt(this.message.length - 1) == "@") {
        this.showhaoyou = true;
      } else {
      }
    },
    // 获取文章详情
    getdetail_wen() {
      request
        .post(this.$api + "/mobile/GetArticleDetail?id=" + this.id)
        .then(res => {
          this.list_wen = res.Data;
          this.fileList[0].url = res.Data.ArticleImg;
          this.title = res.Data.ArticleTitle;
          this.message = res.Data.ArticleContent;
          console.log(this.fileList);
        })
        .catch(err => {});
    },
    // 获取话题详情
     getdetail_hua() {
      request
        .post(this.$api + "/mobile/GetTopicArticleDetail?id=" + this.id)
        .then(res => {
          this.list_hua= res.Data
           this.fileList[0].url = res.Data.ArticleImg;
          this.title = res.Data.ArticleTitle;
          this.message = res.Data.ArticleContent;
        })
        .catch(err => {});
    },
    //好友弹窗所有方法
    onClickLeft() {
      this.showhaoyou = false;
    },
    onClickRight() {
      // window.sessionStorage.setItem('aite',this.radio)
      // window.sessionStorage.setItem('aitename',this.name)
      console.log("我是之前" + this.message);
      console.log(typeof this.message);
      this.message = this.message.substring(0, this.message.length - 1);
      console.log("我是之后" + this.message);
      let a = document.createElement("a");
      a.href = "http://www.baidu.com";
      a.innerHTML = "@" + this.name;
      this.message = this.message + a.innerHTML;
      console.log("最终" + this.message);
      this.showhaoyou = false;
    },
    sel(index, item) {
      this.radio = item.id;
      this.name = this.listinfo[index].name;
    },
    //  发布文章
    fabu() {
      if (this.title.length < 2 || this.message == "") {
        Toast("标题大于两个字,内容不为空");
      } else {
       
          //  修改
          console.log(this.fileList)
          request
            .post(this.$api + "/mobile/ArticleEdit", {
              Id:this.id,
              Name: this.title,
              Content: this.message,
              Img:this.fileList[0].url || this.filedetail,
              Type: this.list_wen.Type || this.list_hua.Type
            })
            .then(res => {
              // console.log(res);
              if (res.IsSuccess) {
                Toast("修改成功");
                this.$router.back()
              } else {
                Toast(res.Message);
              }
            })
            .catch(err => {});
        
      }
    },
    // 发布话题
    fahua() {
      if (this.title.length < 2 || this.message == "") {
        Toast("标题大于两个字");
      } else {
        request
          .post(this.$api + "/mobile/ArticleAdd", {
            Name: this.title,
            Content: this.message,
            Type: "Topic"
          })
          .then(res => {
            console.log(res);
            if (res.IsSuccess == false) {
              Toast(res.Message);
            } else {
              Toast("发布成功");
            }
          })
          .catch(err => {});
      }
    },
    // 选择话题获取话题分类
    sel_huafen() {
      // 掉获取话题接口
      request
        .post(this.$api + "/mobile/GetArticleChannelInfoList", {
          ParentId: 0,
          ParentCode: ""
        })
        .then(res => {
          if (res.IsSuccess) {
            this.listxuan = res.Data.List;
            this.show = true;
          } else {
          }
        })
        .catch(err => {});
    },
    //选择贴字或者话题
    xuanze(index) {
      this.activeindex = index;
      // console.log( this.activeindex)
    },
    //选择分类
    huati(index) {
      this.hua = this.listxuan[index].Name;
      // console.log(this.listxuan[index].Name)
      this.activeball = index;
      this.show = false;
    }
  }
};
</script>
<style lang='less' scoped>
/deep/.van-uploader__upload {
  background: #f5f5f5;
}
.van-field {
  background: #f5f5f5;
  padding: 10px 0 !important;
}
@base: 75rem;
header {
  background-color: #ffffff;
  position: relative;
  border-bottom: 1px solid #e6e6e6;
}
.fenlei {
  padding: 0 40 / @base;
  // background-color: blue;
  height: 80 / @base;
  line-height: 80 / @base;
  display: flex;
  img {
    margin-top: 25 / @base;

    width: 30 / @base;
    height: 30 / @base;
  }
  .quanzi {
    margin-left: 20 / @base;
    font-size: 30 / @base;
    margin-right: 10 / @base;
  }
}
.biao {
  width: 170 / @base;
  height: 50 / @base;
  line-height: 50 / @base;
  font-size: 30 / @base;
  text-align: center;
  color: #898787;
  background: #dcdcdc;
  text-align: center;
  border-radius: 20px;
  margin-top: 15 / @base;
  margin-left: 25 / @base;
}
.biaoactive {
  color: white;
  background: #b695e9;
}
.fabu {
  width: 120 / @base;
  height: 50 / @base;
  color: white;
  border-radius: 20px;
  line-height: 50 / @base;
  background: #b695e9;
  position: absolute;
  right: 30 / @base;
  top: 25 / @base;
  text-align: center;
  font-size: 28 / @base;
}
.box {
  padding: 0 40 / @base;
  background: #f5f5f5;
}
.title {
  // margin-top: 30 / @base;
  height: 80 / @base;
  line-height: 80 / @base;
  padding: 16 0 / @base;
  font-size: 25 / @base;
  border-bottom: 1px solid #e6e6e6;
  span {
    font-size: 30 / @base;
  }
  input {
    background: #f5f5f5;
    width: 450 / @base;
  }
}
.huafen {
  margin-top: 100 / @base;
  height: 80 / @base;
  border-bottom: 1px solid #e6e6e6;
}
.kuang {
  z-index: 2;
  position: fixed;
  top: 260 / @base;
  left: 5%;
  width: 90%;
  height: 700 / @base;
  background: white;
  border-radius: 10px;
  .kuangtitle {
    width: 100%;
    height: 150 / @base;
    text-align: center;
    line-height: 150 / @base;
    font-size: 38 / @base;
  }
  .main {
    width: 85%;
    height: 400 / @base;
    margin: 0 auto;
    overflow-y: scroll;

    .ball {
      display: inline-block;
      width: 27%;
      height: 60 / @base;
      line-height: 60 / @base;
      border-radius: 20px;
      text-align: center;
      font-size: 30 / @base;
      background: #e5e5e5;
      margin-left: 30 / @base;
      margin-bottom: 15 / @base;
    }
    .activeball {
      color: white;
      background: #b695e9;
    }
  }
}
.kuang2 {
  z-index: 2;
  position: fixed;
  top: 35%;
  left: 5%;
  width: 90%;
  height: 24%;
  background: white;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  .main2 {
    width: 30%;
    height: 100%;
    text-align: center;
    img {
      // display: block;
      width: 120 / @base;
      height: 120 / @base;
      background-size: 100% 100%;
      margin: 60 / @base auto 10 / @base auto;
    }
    span {
      font-size: 35 / @base;
    }
  }
}
.shangchuan {
  width: 100%;
  // height: 160 / @base;
  background: #f5f5f5;
  img {
    width: 140 / @base;
    height: 140 / @base;
  }
}
.bottom {
  border-bottom: 1px solid #e6e6e6;
  width: 90%;
  margin: 0 auto;
  // background-color: blue;
  height: 80 / @base;
  line-height: 80 / @base;
  display: flex;
  img {
    margin-top: 25 / @base;

    width: 30 / @base;
    height: 30 / @base;
  }
  span {
    margin-left: 20 / @base;
    font-size: 30 / @base;
    margin-right: 10 / @base;
  }
}
</style>