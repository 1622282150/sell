<template>
  <div>
    <header>
      <Return>编辑</Return>
      <div class="fabu"  @click="fabu">保存</div>
   </header>
        <div class="box">
        <div class="title">
          <span>标题:</span>
          <input type="text" placeholder="请输入你的标题内容" v-model="title"/>
          <van-cell-group>
            <van-field
              v-model="message"
              
              type="textarea"
              placeholder="请描述一下具体内容~"
              rows="4"
              autosize
            />
          </van-cell-group>
        </div>
      </div>
  </div>
</template>
<script>
import { Toast } from 'vant';
import { Field } from 'vant';
import request from '@/utils/request'
import Return from "../../components/Return";
export default {
  components: {
    Return
  },
  data() {
      return{
          title:'',
          message:'',
          item:{}
      }
  },
  methods: {
    //  编辑文章
    fabu(){
     
          request.post(this.$api+'/mobile/ArticleEdit',{
           Id:this.item.ArticleId,
          //  Id:207,
           Name:this.title,
           Content:this. message,
           Type:'CommonArticle'
          }).then(res=>{
            if(res.data.IsSuccess==false){
                Toast(res.data.Message)
            }else{
                Toast('发布成功')
            }
          }).catch(err=>{

          })
      
    }
  },
  created() {},
  mounted() {
    this.item=this.$route.query.item
    this.title=this.item.ArticleTitle
    this.message=this.item.ArticleContent
  }
};
</script>
<style lang='less' scoped>
@base: 75rem;
header {
  background-color: #ffffff;
  position: relative;
}
.fabu{
    width: 120/@base;
    height: 50/@base;
    color:white;
    border-radius: 20px;
    line-height:  50/@base;
    background: red;
    position: absolute;
    right: 20/@base;
    top: 20/@base;
    text-align: center;
    font-size: 36 / @base;
}
</style>