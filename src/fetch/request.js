import axios from 'axios';
import { Toast } from 'vant'
// import qs from 'qs'
// axios.defaults.timeout=10000;//设置请求时间，超过时间报超时错位
// axios.defaults.headers={'X-Custom-Header': 'foobar'}//全局设置请求头
// instance.defaults.headers['Content-Type']='application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded;charset=UTF-8';//全局设置请求头//表示跨域请求时是否需要使用凭证默认false
// axios.defaults.baseURL='http://test-admin-h5.olquan.cn'//设置域名
// axios.defaults.withCredentials=true//表示跨域请求时是否需要使用凭证,默认false，一般请求携带cookie是设置为true
// })
const instance  =axios.create({
  // timeout:10000,
  baseURL:process.env.API_HOST,
  // headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
});//自定义axios对象
instance.interceptors.request.use(function (config) {//为自定义axios设置请求拦截器
  // 在发送请求之前做些什么config是axios请求实例 里面包含axios各种配置项和相关属性信息
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
});
instance.interceptors.response.use(function (response) {//为自定义axios设置响应拦截器
  // 对响应数据做点什么
  const res=response.data
  if(res.code===0){
    return res
  } else{
    Toast({
      message:response.data.msg
    })
    return res
    // return Promise.reject(response.data)
  }
}, function (err) {
  // 对请求错误做些什么
  if (!navigator.onLine) {
    Toast({//网络异常，请查看你的网络状态
      type:'warning',
      message:'网络异常，请查看你的网络状态'
    })
    return 'networkdisconnect';
  }
  return Promise.reject(err.response);
});
// instance.interceptors.request.eject(beforask);//移除请求拦截器方法
// instance.interceptors.response.eject(afterask);//移除响应拦截器方法

const post = (url,data)=>{//post请求
  return instance({
    method:'post',
    url:url,
    dataType:'JSON',
    data:data
  })
}
const paramspost = (url,data)=>{//post请求  params参数
  return instance({
    method:'post',
    url:url,
    dataType:'JSON',
    params:data
  })
}
const get=(url,data)=> {//get请求
  return instance({
    method:'get',
    url:url,
    dataType:'JSON',
    params:data
  })
}
const upPost=(url,data)=> {//图片上传请求
  return instance({
    method:'post',
    url:url,
    dataType:'JSON',
    data:data,
    headers:{'Content-Type': 'multipart/form-data'}
  })
}



export default {
  post,
  get,
  upPost,
  paramspost
}
