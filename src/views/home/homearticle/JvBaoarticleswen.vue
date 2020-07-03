<template>
    <div >
      <header>
       <Return style="font-size:19px">举报评论</Return>
      </header> 
      <div class="kong"></div>
      <div class="marntop">
        <van-radio-group v-model="radio">
          <van-cell-group>
           <van-cell title="广告内容" clickable @click="radio = '1'">
             <van-radio checked-color="#FF2744" slot="right-icon" name="1" />
           </van-cell>
          <van-cell title="搬运抄袭" clickable @click="radio = '2'">
             <van-radio checked-color="#FF2744" slot="right-icon" name="2" />
          </van-cell>
          <van-cell title="不友善内容" clickable @click="radio = '3'">
             <van-radio checked-color="#FF2744" slot="right-icon" name="3" />
          </van-cell>
          <van-cell title="其他" clickable @click="radio = '4'">
             <van-radio checked-color="#FF2744" slot="right-icon" name="4" />
          </van-cell>
       </van-cell-group>
        </van-radio-group>
      </div>
      <div class="kong"></div>
      <van-cell title="添加图片证据(最多4张)"  icon="photo-o" is-link />
      <div class="zhaopian">
        <van-uploader v-model="fileList" :after-read="after_fale"  :max-count="4" multiple />
      </div>
      <div class="bottom" ref="certy" @click="tijiao">
       提交反馈  <i class="iconfont icon-xiangyoujiantou"></i>
      </div>
    </div>
</template>
<script>
import {Button , RadioGroup, Radio ,Cell,CellGroup,Uploader} from 'vant';
import Return from '@/components/Return.vue'
import request from "@/utils/request";
export default {
  components:{
   Return
  },
    data(){
      return{
        id:'',
        title:'',
        radio:'',
        fileList: [],
        endlist:[]
      }
    },
    watch:{
      radio(){
        if(this.radio === '0'){
          this.title='广告内容'
        }else if(this.radio === '1'){
          this.title='搬运抄袭'
        }
        else if(this.radio === '2'){
          this.title='不友善内容'
        }else{
          this.title='其他'
        }
      }
    },
    mounted(){
       this.id=this.$route.query.id
    },
    methods:{
     tijiao(){
       console.log(this.title)
        request.post(this.$api + "/mobile/UserTipAdd", {
          MainId:this.id,
          TitleType:this.title,
          Type:'ArticleComment',
          Content:this.message,
          Img1:this.endlist[0] || '',
          Img2:this.endlist[1] || '',
          Img3:this.endlist[2] || '',
          Img4:this.endlist[3] || '',
        })
        .then(res => {
          if(res.IsSuccess){
           this.$router.back()
          }else{
            Toast(res.Message)
          }
        })
        .catch(err => {});
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

    }
}
</script>
<style lang="less" scoped>
@base: 75rem;
.kong{
  width: 100%;
  height: 30/@base;
  background:#F4F8FB;
}
.zhaopian{
  width: 100%;
  height: 250/@base;
  padding: 40/@base;
  // background: blue;
  border-top: 1px solid #e6e6e6;
}
.bottom{
  width: 100%;
  height:90/@base;
  line-height: 90/@base;
  background: #FF2744;
  position: fixed;
  text-align: center;
  font-size: 30/@base;
  color: white;
  bottom: 0;
  
}
.bottom:hover{
    background:red;
  }
</style>