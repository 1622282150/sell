import axios from 'axios'
import Vue from 'vue'
import router from '../router';
import { Dialog, Overlay } from "vant";
// 创建axios实例
const service = axios.create({
   // api 的 base_url
  baseURL: process.env.BASE_API,
  timeout: 10000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(
  config => {
     
      config.headers['ASPXAUTH'] = window.localStorage.getItem('token') // 让每个请求携带自定义token 请根据实际情况自行修改
    
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response拦截器
// response 拦截器
service.interceptors.response.use(
  response => {
    //这里面可以设置自定义的返回错误
    if(response.data.Type === 401){
      //token已过期的状态码
      window.localStorage.removeItem('token')
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
     if(isAndroid){
      console.log('我是要去安卓')
      window.android.logOut()
      
     }else if(isiOS){
       console.log('我是要去ios')
       window.location.href='mqjapp://logout'
      //  Dialog.alert({
      //       message: "接口报：401请登录就会看到我"
      //     }).then(() => {
      //       // on close

            
      //     });
      
     }else{
       console.log('我不是安卓也不是ios,我在哪')
     }

    }else{
      return response.data
    }
  },
  error => {
    //服务器报出来的所有的错误，都会被前端接收到这个位置，这个位置会打印这些错误信息，方便进行调试....
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)


export default service