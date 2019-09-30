// 获取wxjssdk数据
import { wxConfig } from './index'
export function  wxJssdkData(that) {
  // const that = this;
  wxConfig().then(res => {
    if (!res.code) {
      config(res,that);
    } else {
      Toast(res.err_msg || res.errMsg || 'error');
    }
  });
  function config(res,that) {
    const sign = res.data;
    that.$wechat.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: sign.appId, // 必填，公众号的唯一标识
      timestamp: sign.timestamp, // 必填，生成签名的时间戳
      nonceStr: sign.nonceStr, // 必填，生成签名的随机串
      signature: sign.signature, // 必填，签名
      jsApiList: [
        'checkJsApi',
        'updateAppMessageShareData',
        'updateTimelineShareData',
        // 'onMenuShareTimeline',
        // 'onMenuShareAppMessage',
        // 'onMenuShareQQ',
        // 'onMenuShareWeibo',
        // 'hideMenuItems',
        // 'showMenuItems',
        // 'hideAllNonBaseMenuItem',
        // 'showAllNonBaseMenuItem',
        // 'chooseImage',
        // 'previewImage',
        // 'uploadImage',
        // 'downloadImage',
        'scanQRCode',
        'chooseWXPay',
      ] // 必填，需要使用的JS接口列表
    });
    that.$wechat.ready(()=>{
      that.$wechat.updateAppMessageShareData({//自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
        title: '不论你在哪里——来与北京阅兵同框', // 分享标题
        desc: '为祖国70周年庆生', // 分享描述
        link: 'http://guoqing.deeplor.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'http://deeplor.oss-cn-hangzhou.aliyuncs.com/guoqing/share.jpg', // 分享图标
        success: function () {
          // 设置成功
        }
      })
      that.$wechat.updateTimelineShareData({//自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
        title: '不论你在哪里——来与北京阅兵同框', // 分享标题
        link: 'http://guoqing.deeplor.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'http://deeplor.oss-cn-hangzhou.aliyuncs.com/guoqing/share.jpg', // 分享图标
        success: function () {
          // 设置成功
        }
      })
    })
  }
}
