<template>
  <div class="helloAdd" :style="back">
    <div class="op">
      <van-cell-group>
        <van-field
          v-model="username"
          clearable
          label="姓名"
          placeholder="请输入员工姓名"
          size="large"
        />
        <van-field
          clearable
          label="工号"
          type="number"
          v-model="jobNum"
          placeholder="请输入员工工号"
          size="large"
        />
<!--        <van-field-->
<!--          v-model="position"-->
<!--          clearable-->
<!--          label="职位"-->
<!--          placeholder="请输入员工职位"-->
<!--          size="large"-->
<!--        />-->
      </van-cell-group>
      <div class="showImg" v-show="imgUrl">
        <img :src="imgUrl" alt=""  @click="proImg()" >
      </div>
      <div class="flex a-i imgUp">
        <span>上传照片</span>
        <van-uploader :after-read="onRead" accept="image/*"  name="file" size="large">
          <van-icon name="photograph"/>
        </van-uploader>
      </div>
    </div>
    <van-button type="info" block @click="upLoadItem()">提交</van-button>
    <div class="bigImg flex a-i" v-if="bigImgShow" @click.stop="bigImgShow=false">
      <img :src="imgUrl" alt="">
    </div>
  </div>
</template>

<script>
  import { Toast } from 'vant';
  export default {
    name: 'modify',
    data() {
      return {
        imgUrl:'',
        username: '',
        jobNum: '',
        position: '',
        id:'',
        bigImgShow:false,
        back: {
          backgroundImage: "url(" + require("@/assets/image/add.jpg") + ")",
          backgroundRepeat: "noRepeat",
          backgroundSize: "cover",
          backgroundPosition: 'center'
        },
      }
    },
    mounted(){
      this.initMess()
      this.setPosition()
    },
    methods: {
      onRead(file, detail) {
        console.log(file, detail)
        this.imgUrl=file.content
      },
      upLoadItem(){
        if(!this.username || !this.jobNum || !this.imgUrl){
          Toast({
            duration:1500,
            message: '信息未填写完整或图片未上传'
          })
          return
        }
        let _self=this
        let data={
          id:this.id,
          name:this.username,
          number:this.jobNum,
          images:this.imgUrl,
          faceData:''
        }
        this.$http.post('/user/update',data).then(res=>{
            if(res.data.code===0){
              Toast({ duration:1500,message:'修改成功'})
              _self.$router.push('/')
            }else Toast(res.data.message)
        }).catch(err=>{
          console.log(err)
        })
      },
      initMess(){
        let id=this.$route.query.id ? this.$route.query.id : ''
        this.id=id
            this.$http.get(`/user/getById?id=${id}`).then(res=>{
              if(res.data.code===0){
                this.username=res.data.data.name
                this.jobNum=res.data.data.number
                this.imgUrl=res.data.data.images
              }else Toast(res.data.message)
            }).catch(err=>{
                console.log(err)
            })

      },
      setPosition() {
        var windheight =window.innerHeight;
        var bottomx = document.getElementById('btn'); //底部导航
        window.onresize=function(){
          var docheight = window.innerHeight;
          if(docheight < windheight){
            bottomx.style.display='none'
          }else{
            bottomx.style.display='block'
          }
        }
      },
      proImg(){
        console.log(1)
        this.bigImgShow=true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
  .helloAdd {
    min-height: 100%;
    padding-top: 15%;
    .bigImg{
      z-index: 999;
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0,0,0,0.4);
      img {
        display: block;
        width: 100%;
        margin-top: -1rem;
      }
    }
    &>.van-button--block{
      position: fixed;
      bottom: 1rem;
      left: 50%;
      width: 95%;
      margin-left:-47.25%;
    }
    .van-field__control{
      color: #ffffff;
    }
    .van-cell-group,.van-cell{
      background-color: unset;
      color: #ffffff;
      input::-webkit-input-placeholder {
        color: #DDE4ED;
      }
    }
  }
  .showImg{
    padding-top: 0.5rem;
  }
  .showImg img{
    display: block;
    width: 2.2rem;
    height: 2.2rem;
    margin: 0 auto;
    border-radius:50%;
  }
  .imgUp {
    font-size: 0.36rem;
    line-height: 0.8rem;
    padding: 0.4rem 0.2rem;
    color: #ffffff;
    .van-icon {
      font-size: 1.2rem;
    }

    span {
      margin-right: 1.5rem;
    }
  }
</style>
