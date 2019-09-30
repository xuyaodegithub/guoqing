import Vue from 'vue'
import Router from 'vue-router'
import  { getToken } from "../utils/auth";
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

 const router = new Router({
  routes: [
    {
      path: '/',
      name: '员工信息查询',
      component: () => import(/* webpackChunkName: "index" */'@/views/index/index')
    },{
      path: '/modify',
      name: '员工信息修改',
      component: () => import(/* webpackChunkName: "modify" */'@/views/modify/index')
    },{
      path: '/addEmployee',
      name: '新增员工信息',
      component: () => import(/* webpackChunkName: "addEmployee" */'@/views/addEmployee/index')
    },{
      path: '/login',
      name: '登录',
      component: () => import(/* webpackChunkName: "addEmployee" */'@/views/login/index')
    },{
      path: '/Digital',
      name: '数字键盘',
      component: () => import(/* webpackChunkName: "addEmployee" */'@/views/DigitalKeyboard/index')
    },{
      path: '/national',
      name: '与北京阅兵同框',
      component: () => import(/* webpackChunkName: "national" */'@/views/canvas/index')
    },
  ],
   scrollBehavior (to, from, savedPosition) {//路由切换时滚轮位置//scrollBehavior 方法接收 to 和 from 路由对象。第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
     // return 期望滚动到哪个的位置
     if (savedPosition) {
       return savedPosition
     }else{
       // return { x: 0, y:0 }
     }
   }
})
// const whiteList = ['/login'] // 不重定向白名单
const whiteList = ['/national'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  // document.title=to.name
  document.title='与北京阅兵同框';
  // if(getToken()){
  //   // console.log(typeof  JSON.parse(getToken()),'yyyyyyyyyyyyyyyyyyyyyy')
  //   if(to.path==='/login'){
  //     next({path:'/',replace:true})
  //   }else{
  //     next()
  //   }
  // }else{
  //   // console.log(to.path)
  //   if(whiteList.indexOf(to.path)!==-1){
  //     next()
  //   }else{
  //     console.log(to.path)
  //     next({path:`/login?redUrl=${to.path}`,replace:true})
  //   }
  // }
  if(whiteList.indexOf(to.path)!==-1)next();
  else next({path:'/national',replace:true})

})
export default  router
