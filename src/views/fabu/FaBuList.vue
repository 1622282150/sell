<template>
  <div>
    <header>
      <Return>我的发布</Return>
   </header>
    <div>
       <div v-for="(item,index) in list" :key="index">
           <span>{{item.ArticleTitle}}</span>
           <span style="color:red" @click="bianji(item)">编辑</span>
           <span @click="del(item.ArticleId)" style="color:red">删除</span>
       </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant';
import request from '@/utils/request'
import Return from "../../components/Return";
export default {
     components: {
    Return
  },
     data(){
         return{
          list:[]
         }
     },methods:{
        // 获取文章列表
        getlist(){
            request.post(this.$api+'/mobile/GetArticleInfoList',{
               Page:1
            }).then(res=>{
               console.log(res)
               this.list=res.Data.List
            }).catch(err=>{

            })
        },
        // 删除文章
       del(id){
        //    console.log(id)
        request.post(this.$api+'/mobile/ArticleDelete?id='+id,{
          
        }).then(res=>{
            if(res.IsSuccess==true){
              Toast('删除成功')
               this.getlist()
            }else{
              Toast(res.Message)
            }
        }).catch(err=>{

        })
       },
       //编辑文章
       bianji(item){
        //   console.log(item)
          this.$router.push({
              path:'/bianji',
              query:{
                  item:item
              }
          })

       }
     },
     mounted(){
          this.getlist()
     }
}
</script>
<style lang="less" scoped>

</style>