<template>
  <div class="hello">
    <div class="flex a-i seach">
      <input type="text" placeholder="请输入员工姓名/工号" v-model="seachStr">
      <van-button plain type="primary" size="small" @click="initList">搜索</van-button>
    </div>
    <div class="fix" @click.stop="addNew()"><van-icon name="plus" color="#0079f3" size="2.5em"/></div>
    <div class="list" v-for="(item,index) in list" :key="index">
      <van-swipe-cell :right-width="120">
        <div class=" flex content a-i">
          <div>
            <img :src="item.images" alt="">
          </div>
          <div>
            <p>{{item.name}}</p>
            <span>职位:暂无</span>
          </div>
            <span>工号:{{item.number}}</span>

        </div>
        <div slot="right">
          <van-button type="info" @click="updata(item)" style="margin-top: 0.1rem">修改</van-button>
          <van-button type="danger" @click="deleteI(item,index)">删除</van-button>
        </div>
      </van-swipe-cell>
    </div>
<!--    <van-loading type="spinner" />-->
    <div style="font-size: 0.36rem;text-align: center;margin-top: 1rem" v-if="list.length<1">
      暂无数据
    </div>
  </div>
</template>

<script>
  import { Dialog } from 'vant';
  import { Toast } from 'vant';
  export default {
    name: 'index',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        seachStr:'',
        list:[
          // {id:1,name:'张三',position:'boss',jobNum:'123456789',img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557483468109&di=ed54200d7ef3d747556259e2a5956eb2&imgtype=0&src=http%3A%2F%2Fimg.qqzhi.com%2Fuploads%2F2018-12-07%2F060424897.jpg'},
          // {id:2,name:'李四',position:'CTO',jobNum:'123456789',img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557483468108&di=2d452ac4ca157107a8ce46bd03d37ed2&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20181223%2F20%2F1545567692-CidzhWawGl.jpg'},
          // {id:3,name:'王五',position:'SEO',jobNum:'123456789',img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557483468108&di=f52b0e06298fb4e369568c1ce4444e09&imgtype=0&src=http%3A%2F%2Ftx.haiqq.com%2Fuploads%2Fallimg%2Fc161128%2F14P2G05000340-3JR6.jpg'},
          // {id:4,name:'赵六',position:'主任',jobNum:'123456789',img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557483468108&di=684e5d3fe798c1f76d2c0c1213feebc5&imgtype=0&src=http%3A%2F%2Ftouxiang.vipyl.com%2Fattached%2Fimage%2F20131019%2F20131019154838043804.jpg'},
          // {id:5,name:'张三丰',position:'员工',jobNum:'123456789',img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557483468108&di=b59816c09472969a78a031f0c246457b&imgtype=0&src=http%3A%2F%2Fimg.xinxic.com%2Fimg%2Fabec871cbeac880b.jpg'},
          // {id:6,name:'奋斗鸭',position:'员工',jobNum:'123456789',img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557483468108&di=b59816c09472969a78a031f0c246457b&imgtype=0&src=http%3A%2F%2Fimg.xinxic.com%2Fimg%2Fabec871cbeac880b.jpg'},
          // {id:7,name:'奋斗鸭',position:'员工',jobNum:'123456789',img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557483468108&di=b59816c09472969a78a031f0c246457b&imgtype=0&src=http%3A%2F%2Fimg.xinxic.com%2Fimg%2Fabec871cbeac880b.jpg'},
          // {id:8,name:'奋斗鸭',position:'员工',jobNum:'123456789',img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557483468108&di=b59816c09472969a78a031f0c246457b&imgtype=0&src=http%3A%2F%2Fimg.xinxic.com%2Fimg%2Fabec871cbeac880b.jpg'},
          // {id:9,name:'奋斗鸭',position:'员工',jobNum:'123456789',img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557483468108&di=b59816c09472969a78a031f0c246457b&imgtype=0&src=http%3A%2F%2Fimg.xinxic.com%2Fimg%2Fabec871cbeac880b.jpg'},
        ]
      }
    },
    mounted(){
      this.initList()
    },
    methods:{
      updata(item){
          // Toast('修改啊啊啊')
        this.$router.push(`/modify?id=${item.id}`)
      },
      deleteI(item,index){
        let _self=this
        Dialog.confirm({
          title: '提示',
          message: `确定要删除${item.name}的信息么？`,
        }).then(() => {
         _self.deleteOne(item,index)
        }).catch(() => {
          // on cancel
        });;
      },
      addNew(){//新增员工
          this.$router.push('/addEmployee')
      },
      initList(){
        Toast.loading({
          mask: true,
          message: '加载中...',
          duration:0
        });
        let _self=this
        let data={
          query:this.seachStr
        }
        this.$http.post('/user/search',data).then(res=>{
          // console.log(res)
          if(res.data.code===0){
            _self.list=res.data.data
          }else{
            Toast(res.data.message)
          }
          Toast.clear()
        }).catch(err=>{
          console.log(err)
          Toast.clear()
        })
      },
      deleteOne(item,index){
        let _self=this
        let data={
          id:item.id
        }
        this.$http.post('/user/delete',data).then(res=>{
          if(res.data.code===0){
            Toast({ duration:1500,message:'删除成功'})
            _self.list.splice(index,1)
          }else  Toast(res.data.message)
        }).catch(err=>{
          console.log(err)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .hello{
    min-height: 100%;
    .seach{
      font-size: 0.28rem;
      padding:0.4rem;
      border-radius: 0.1rem;
      color: #333;
      justify-content: space-between;
      input{
        border: 1px solid #666666;
        line-height: 0.4rem;
        padding: 0.1rem;
        width: 70%;
        border-radius: 0.1rem;
        font-size: 0.18rem;
        text-indent: 1em;
        /*border-right: none;*/
      }
      div{
        padding: 0.1rem 0.2rem;
        line-height: 0.4rem;
        background-color: #409EFF;
        color: #ffffff;
      }
    }
    .fix{
      position: fixed;
      bottom: 1rem;
      right: 0.5rem;
      background-color: rgba(10, 130, 242, 0.4);
      border-radius: 50%;
      text-align: center;
      width: 0.8rem;
      height: 0.8rem;
      z-index: 99;
    }
  }
  h4 {
    text-align: center;
    font-size: 0.48rem;
    line-height: 2rem;
  }

  .bheader {
    font-size: 0.32rem;
    line-height: 0.6rem;
    font-weight: 600;
    margin-bottom: .2rem;
    span:nth-child(2), span:nth-child(3) {
      flex: 1;
    }

    span:first-child {
      width: 20%;
    }

  }
  .list{
    margin-bottom: 0.15rem;
    background-color: #ffffff;
    padding: 0.2rem;

  }
  .content{
    font-size: 0.28rem;
    span:nth-child(3){
      flex: 1;
    }
    div:nth-child(2){
      width: 30%;
      p{
        font-weight: 600;
        margin-bottom: 0.15rem;
      }
      span{
        font-size: 0.24rem;
        color: #999999;
      }
    }
    div:first-child{
      margin-right: 0.3rem;
      img{
        display: block;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
      }
    }
    .van-button--normal{
      margin-top: 0.1rem;
    }

  }
</style>
