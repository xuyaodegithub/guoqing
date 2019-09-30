/**
 * Created by Yan on 2019-06-01
 **/
import https from './request'
/**
 * 上传图片
 **/
export const uploadImgApi=(data)=>{
  return https.upPost('/webMatting/matting2',data)
}
/**
 * 获取活动人数
 **/
export const activePeople=(data)=>{
  return https.get('/imageCompose/serverInfo',data)
}
/**
 * 获取排队中图片信息
 **/
export const getMattingInfo=(data)=>{
  return https.get('/webMatting/getMattingInfo',data)
}
/**
 * 页面授权初始化
 **/
export const wxConfig=(data)=>{
  return https.get('/weixinMp/getWxJsConfig',data)
}
