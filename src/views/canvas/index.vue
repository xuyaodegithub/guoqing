<template>
  <section class="canvas">
    <img :src="bg" alt="">
    <div>
      <div class="title">
        <img :src="fonts" alt="">
      </div>
      <div class="sm">
        <p>与北京阅兵同框</p>
        <p>目前已有 <span>{{activeMsg.totalUse}}</span> 人参与活动</p>
      </div>
      <div class="img">
        <!--      <van-icon name="arrow-left" />-->
        <!--      <van-icon name="arrow" />-->
        <img :src="threeList[tidx]" alt="">
        <van-uploader :after-read="afterRead" ref="upload">
          <div class="con">
            <img :src="imgmsg" alt="">
            <img :src="oneList[oidx]" alt="" class="oneBg">
          </div>
          <span class="aginUp" v-if="afterUp">重新上传（横拍更佳）</span>
        </van-uploader>
      </div>
      <div class="flex a-i btns" :class="{'mt' : !afterUp}">
        <van-button round @click="saves">{{afterUp ? '保存图片' : '上传图片'}}</van-button>
        <van-button round @click="changeot()">换一换</van-button>
        <van-image-preview
          close-on-popstate
          v-model="show"
          :images="images"
        >
          <template  v-slot:index>按住图片3秒保存图片<van-icon name="down" /></template>
        </van-image-preview>
      </div>
    </div>
    <div class="APIs"><a href="http://www.picup.ai">www.picup.ai 提供智能抠图换背景技术API ，点击查看更多应用</a></div>
  </section>
</template>

<script>
    import { uploadImgApi,activePeople,getMattingInfo } from '@/fetch'
    import { setFiled,getFiled } from '@/utils/auth'
    import { base64ToArrayBuffer,getStringFromCharCode,getOrientation } from '@/utils/rotateCanvas'
    import { wxJssdkData } from '@/fetch/wxJssdk.js'
    import bg from '@/assets/image/bg.jpg'
    import fonts from '@/assets/image/fonts.png'
    import o1 from '@/assets/image/o1.png'
    import o2 from '@/assets/image/o2.png'
    import o3 from '@/assets/image/o3.png'
    import o4 from '@/assets/image/o4.png'
    import o5 from '@/assets/image/o5.png'
    import o6 from '@/assets/image/o6.png'
    import o7 from '@/assets/image/o7.png'
    import o8 from '@/assets/image/o8.png'
    import o9 from '@/assets/image/o9.png'
    import o10 from '@/assets/image/o10.png'
    import o11 from '@/assets/image/o11.png'
    import o12 from '@/assets/image/o12.png'
    import o13 from '@/assets/image/o13.png'
    import o14 from '@/assets/image/o14.png'
    import t1 from '@/assets/image/t1.jpg'
    import t2 from '@/assets/image/t2.jpg'
    import t3 from '@/assets/image/t3.jpg'
    import t4 from '@/assets/image/t4.jpg'
    import t5 from '@/assets/image/t5.jpg'
    import t6 from '@/assets/image/t6.jpg'
    import t7 from '@/assets/image/t7.jpg'
    import t8 from '@/assets/image/t8.jpg'
    import t9 from '@/assets/image/t9.jpg'
    import t10 from '@/assets/image/t10.jpg'
    import t11 from '@/assets/image/t11.jpg'
    import t12 from '@/assets/image/t12.jpg'
    import t13 from '@/assets/image/t13.jpg'
    import t14 from '@/assets/image/t14.jpg'
    import t15 from '@/assets/image/t15.jpg'
    import t16 from '@/assets/image/t16.jpg'
    import t17 from '@/assets/image/t17.jpg'
    import t18 from '@/assets/image/t18.jpg'
    import t19 from '@/assets/image/t19.jpg'
    import t20 from '@/assets/image/t20.jpg'
    import tt from '@/assets/image/tip.png'
    import {Toast,ImagePreview,Icon } from 'vant';
    import ewm from '@/assets/image/ewm.png'
    import imsSetInfo from '@/utils/imgsInfo'
    import { EXIF } from 'exif-js'
    export default {
        name: "index",
        data(){
            return {
                ewm,
                index:0,
                bg,
                fonts,
                imgmsg:tt,
                oneList:[o1,o2,o3,o4,o5,o6,o7,o8,o9,o10,o11,o12,o13,o14],
                threeList:[t1,t2,t3,t4,t5,t6,t7,t8,t9,t10,t11,t12,t13,t14,t15,t16,t17,t18,t19,t20],
                oidx:Math.floor(Math.random()*14),
                tidx:Math.floor(Math.random()*20),
                afterUp:false,
                secBg:'',
                threeBg:'',
                activeMsg:{},
                show:false,
                images:[],
                fileId:'',
                timer:null,
                imgInfo:''
            }
        },
        created(){
            wxJssdkData(this)
        },
        mounted(){
            this.initStatus()
            this.initImg()
        },
        components:{
            [ImagePreview.name]:ImagePreview,
            [Icon.name]:Icon,
        },
        methods:{
            initStatus(){
                activePeople({id:1}).then(res=>{
                    if(!res.code){
                        this.activeMsg=res.data
                        if(res.data.showBusy)  Toast({duration: 0, message: '系统繁忙，请稍后再试',mask:true,forbidClick:true})
                    }
                })
            },
            afterRead(file, detail){
                // this.imgmsg=file.content
                Toast.loading({mask: true, message: '上传中...',duration:0});
               let param = new FormData(),_self=this;
               console.log(file, file.file, file.name);
               param.append('file', file.file, file.name);
               const imgs=document.createElement('img');
                imgs.src=file.content;
                imgs.onload=()=>{
                    EXIF.getData(imgs, function() {
                        _self.imgInfo = EXIF.getTag(this, "Orientation") ? EXIF.getTag(this, "Orientation") : 1;
                    });
                    this.canvasImg(file.content,file.file.name)
                }

                // uploadImgApi(param).then(res=>{
                //     if(!res.code){
                //         this.fileId = res.data.fileId;
                //         setFiled(res.data.fileId);
                //         if(res.data.status!=='success'){
                //             this.pollingImg()
                //             return
                //         }
                //       this.drawInfo(res.data.bgRemovedPreview)
                //     }else  {
                //         Toast({duration: 1500, message: res.msg})
                //         Toast.clear()
                //     }
                //
                // }).catch(err=>{
                //     Toast.clear()
                //     Toast({duration: 1500, message: err.data})
                // })
            },
            drawInfo(url){
                let img=url,oimg=this.threeList[this.tidx],can=document.createElement('canvas');
                let oImg=new Image()
                oImg.crossOrigin = '';
                oImg.onload=()=>{
                    this.threeBg=oImg
                    can.width=oImg.width;
                    can.height=oImg.height;
                    const cantext=can.getContext('2d');
                    let bgImg=new Image()
                    bgImg.crossOrigin = '';
                    bgImg.onload=()=>{
                        this.secBg=bgImg;
                        // const h=imsSetInfo[this.tidx].w*bgImg.height/bgImg.width;
                        const h=this.secBg.width <= this.secBg.height ? (this.threeBg.width*3/5)*this.secBg.height/this.secBg.width : this.threeBg.width*this.secBg.height/this.secBg.width;
                        const x=this.secBg.width <= this.secBg.height ? this.threeBg.width/5 : 0;
                        const w=this.secBg.width <= this.secBg.height ? this.threeBg.width*3/5 : this.threeBg.width;
                        // cantext.drawImage(bgImg,imsSetInfo[this.tidx].x,this.threeBg.height-h,imsSetInfo[this.tidx].w,h);
                        cantext.drawImage(bgImg,x,this.threeBg.height-h,w,h);
                        this.imgmsg=can.toDataURL("image/png");
                        this.afterUp=true;
                        Toast.clear()
                    }
                    bgImg.src=img
                }
                oImg.src=oimg
            },
            changeot(){
                this.oidx=Math.floor(Math.random()*this.oneList.length);
                this.tidx=Math.floor(Math.random()*this.threeList.length);
                let oimg=new Image(),can=document.createElement('canvas');
                oimg.crossOrigin = '';
                oimg.onload=()=>{
                    this.threeBg=oimg
                    // can.width=oimg.width;
                    // can.height=oimg.height;
                    // const cantext=can.getContext('2d');
                    // // const h=imsSetInfo[this.tidx].w*this.secBg.height/this.secBg.width;
                    // const h=this.secBg.width <= this.secBg.height ? (this.threeBg.width*3/5)*this.secBg.height/this.secBg.width : this.threeBg.width*this.secBg.height/this.secBg.width;
                    // const x=this.secBg.width <= this.secBg.height ? this.threeBg.width/5 : 0;
                    // const w=this.secBg.width <= this.secBg.height ? this.threeBg.width*3/5 : this.threeBg.width;
                    // cantext.drawImage(this.secBg,x,this.threeBg.height-h,w,h);
                    // this.imgmsg=can.toDataURL("image/png");
                }
                oimg.src=this.threeList[this.tidx]
            },
            saves(){
                if(!this.afterUp)document.getElementsByClassName('van-uploader__input')[0].click()
                else{
                    Toast.loading({mask: true, message: '图片生成中...',duration:0});
                    let oImgs=new Image(),canvas=document.createElement('canvas');
                    oImgs.crossOrigin = '';
                    oImgs.onload=()=>{
                        canvas.width=this.threeBg.width;
                        canvas.height=this.threeBg.height;
                        // console.log(canvas.width,canvas.height)
                       // const cantext=canvas.getContext('2d'),h=imsSetInfo[this.tidx].w*this.secBg.height/this.secBg.width;
                       const cantext=canvas.getContext('2d');
                        const h=this.secBg.width <= this.secBg.height ? (this.threeBg.width*3/5)*this.secBg.height/this.secBg.width : this.threeBg.width*this.secBg.height/this.secBg.width;
                        const x=this.secBg.width <= this.secBg.height ? this.threeBg.width/5 : 0;
                        const w=this.secBg.width <= this.secBg.height ? this.threeBg.width*3/5 : this.threeBg.width;
                        cantext.drawImage(this.threeBg,0,0);
                        cantext.drawImage(this.secBg,x,this.threeBg.height-h,w,h);
                        cantext.drawImage(oImgs,0,0);
                        let oEwm=new Image();
                        oEwm.crossOrigin = '';
                        oEwm.onload=()=>{
                            cantext.drawImage(oEwm,930,510,130,130);
                            const imgurl=canvas.toDataURL("image/png")
                            this.images=[
                                imgurl
                            ]
                            this.show=true
                            Toast.clear()
                        }
                        oEwm.src=ewm

                    }
                    oImgs.src=this.oneList[this.oidx]
                }
            },
            pollingImg() {//轮询
                this.timer = setInterval(() => {
                    // this.getImgData()
                    getMattingInfo({fileId: this.fileId}).then(res => {
                        if (!res.code) {
                            if(res.data.status==='success'){
                                clearInterval(this.timer)
                                this.drawInfo(res.data.bgRemovedPreview)
                            }else Toast({message:`当前人数过多,正在排队等待!当前位置${res.data.queueNumber}`,duration:0,forbidClick:true})
                        } else {
                            clearInterval(this.timer)
                            Toast(res.msg)
                        }
                    })
                }, 3000)
            },
            initImg(){
                this.fileId=getFiled()
                if(!this.fileId)return;
                else {
                    Toast.loading({duration: 0, message: '加载中',mask:true,forbidClick:true})
                    this.pollingImg()
                }
            },
            //压缩
            canvasImg(url,name){
              let canva=document.createElement('canvas'),oImg=new Image();
                oImg.crossOrigin = '';
                oImg.onload=()=>{
                    oImg.width <= oImg.height ? canva.height=720 : canva.width=1080;
                    oImg.width <= oImg.height ? canva.width=720*oImg.width/oImg.height : canva.height=1080*oImg.height/oImg.width;
                    console.log(canva.width,canva.height)
                    const cantext=canva.getContext('2d')
                    cantext.drawImage(oImg,0,0,canva.width,canva.height)
                    canva.toBlob((blob)=>{
                        console.log(blob)
                        let param = new FormData();
                        param.append('file', blob, '111.jpg');
                        param.set('orientation',this.imgInfo);
                        uploadImgApi(param).then(res=>{
                            if(!res.code){
                                this.fileId = res.data.fileId;
                                setFiled(res.data.fileId);
                                if(res.data.status!=='success'){
                                    this.pollingImg()
                                    return
                                }
                              this.drawInfo(res.data.bgRemovedPreview)
                            }else  {
                                Toast({duration: 1500, message: res.msg})
                            }

                        }).catch(err=>{
                            Toast.clear()
                            Toast({duration: 1500, message: err})
                        })
                    },'image/jpeg')
                }
                oImg.src=url
            },
        }
    }
</script>

<style scoped lang="scss">
.canvas{
  min-height: 100%;
  background-size: cover;
  position: relative;
  & > img{
    position: absolute;
    width: 100%;
    height: 100%;
  }
  & > div{
    position: relative;
    z-index: 1;
  }
  .APIs{
    a{
      color: #f5f6ab;
    }
    font-size: .22rem;
    position: absolute;
    bottom: .28rem;
    left: 0;
    width: 100%;
    text-align: center;
    line-height: 1;
    z-index: 2;
  }
  .title{
      width: 5.36rem;
      margin:0 auto .4rem;
      padding-top: 1rem;
    img{
      display: block;
      width: 100%;
    }
  }
  .sm{
    color: #ffeda8;
    font-size: .32rem;
    line-height: .5rem;
    text-align: center;
    margin-bottom: .3rem;
    span{
      color: #f2dc68;
      font-weight: 600;
    }
  }
  .img{
    width: 5.35rem;
    position: relative;
    margin:0 auto;
    text-align: center;
    &>img,.oneBg{
      position: absolute;
      width: 100%;
      left:0;
      top: 0;
    }
    span.aginUp{
      display: inline-block;
      font-size: .26rem;
      line-height: .4rem;
      color: #fff;
      border-bottom: 1px solid #fff;
      margin-top: .23rem;
    }
    .con{
      border: 2px solid #fee8ae;
      img{
        display: block;
        width: 100%;
      }
    }
    .van-icon{
      position: absolute;
      top: 50%;
      width: .8rem;
      height: .8rem;
      text-align: center;
      line-height: .8rem;
      font-size: .4rem;
      margin-top: -.6rem;
      color: #fff;
      background-color: #f7d50b;
      border-radius: 50%;
      &:first-child{
        left: .11rem;
      }
      &:nth-child(2){
        right: .11rem;
      }
    }
  }
  .btns{
    justify-content: center;
    padding-top: .4rem;
    .van-button{
      background: linear-gradient(to right, #fae788,#f7dd4a);
      width: 2.6rem;
      margin: .1rem;
      color: #c7651f;
      font-size: .36rem;
      font-weight: 600;
      line-height: .9rem;
      height: .9rem;
      box-shadow: 0 .1rem .1rem #d08b1b;
    }
  }
  .mt{
    margin-top: .55rem;
  }
}
</style>
<style>
  .canvas .van-image-preview__index{
    font-size: .54rem;
    text-align: center;
  }
</style>
