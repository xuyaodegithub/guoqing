<template>
  <div class="helloAddTwo" :style="back">
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
          v-model="number"
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
      <div class="showImg" v-if="imgUrl">
        <img :src="imgUrl" alt="" @click="proImg()">
      </div>
      <div class="flex a-i imgUp">
        <span>上传照片</span>
        <van-uploader :after-read="onRead" accept="image/*" name="file" size="large">
          <van-icon name="photograph"/>
        </van-uploader>
      </div>
    </div>
    <div @click="upLoadItem()" id="btn">提交</div>
    <div class="bigImg flex a-i" v-if="bigImgShow" @click.stop="bigImgShow=false">
      <img :src="imgUrl" alt="">
    </div>
  </div>
</template>

<script>
  import {Toast} from 'vant';

  export default {
    name: 'addEmployee',
    data() {
      return {
        imgUrl: '',
        username: '',
        number: '',
        position: '',
        bigImgShow: false,
        back: {
          backgroundImage: "url(" + require("@/assets/image/add.jpg") + ")",
          backgroundRepeat: "noRepeat",
          backgroundSize: "cover",
          backgroundPosition: 'center'
        },
      }
    },
    mounted() {
      this.setPosition()
      // this.setCarmer()
    },
    methods: {
      onRead(file, detail) {
        console.log(file, detail)
        // let  oneOrmore=Array.isArray(file)
        // if(oneOrmore) this.imgUrl = file[0].content
        // else  this.imgUrl = file.content
        this.imgUrl = file.content
      },
      upLoadItem() {
        if (!this.username || !this.number || !this.imgUrl) {
          Toast({
            duration: 1500,
            message: '信息未填写完整或图片未上传'
          })
          return
        }
        let data = {
          name: this.username,
          number: this.number,
          images: this.imgUrl,
          faceData: ''
        }
        this.$http.post('/user/add', data).then(res => {
          if (res.data.code === 0) {
            Toast({duration: 1500, message: '添加成功'})
            this.$router.push('/')
          } else {
            Toast(res.data.message)
          }
        }).catch(err => {
          // alert(err)
          console.log(err)
        })
      },
      setPosition() {
        var windheight = window.innerHeight;
        var bottomx = document.getElementById('btn'); //底部导航
        window.onresize = function () {
          var docheight = window.innerHeight;
          if (docheight < windheight) {
            bottomx.style.display = 'none'
          } else {
            bottomx.style.display = 'block'
          }
        }
      },
      proImg() {
        console.log(1)
        this.bigImgShow = true
      }
      // setCarmer() {//解决摄像机兼容问题
      //   let ua = navigator.userAgent.toLowerCase();//获取浏览器的userAgent,并转化为小写——注：userAgent是用户可以修改的
      //   var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);//判断是否是苹果手机，是则是true
      //   if (isIos) {
      //     $("input:file").removeAttr("capture");
      //   }
      // }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .helloAddTwo {
    min-height: 100%;
    padding-top: 15%;

    .bigImg {
      z-index: 999;
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.2);

      img {
        display: block;
        width: 100%;
        margin-top: -1rem;
      }
    }

    & > #btn {
      position: fixed;
      bottom: 1rem;
      left: 50%;
      width: 95%;
      margin-left: -47.25%;
      background-color: #409EFF;
      color: #ffffff;
      font-size: 0.42rem;
      line-height: 1rem;
      text-align: center;
    }

    .van-field__control {
      color: #ffffff;
    }

    .van-cell-group, .van-cell {
      background-color: unset;
      color: #ffffff;

      input::-webkit-input-placeholder {
        color: #DDE4ED;
      }
    }

    .showImg {
      padding-top: 0.5rem;
    }

    .showImg img {
      display: block;
      width: 2.2rem;
      height: 2.2rem;
      margin: 0 auto;
      border-radius: 50%;
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
  }


</style>
