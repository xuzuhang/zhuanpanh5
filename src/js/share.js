import req from './request'
// import wx from 'weixin-js-sdk'
export default function share(that,id){

    var  url = window.location.protocol+"//"+window.location.host+that.$route.path+window.location.search
    console.log(url)
    url = encodeURIComponent(url)
    req('jsapi_ticket?url='+url,"get","",(res)=>{
              		var res = res.data
                    wx.config({
                            debug: false, //开启debug模式，测试的时候会有alert提示
                            appId: res.appid, //公众平台中-开发者中心-appid
                            timestamp: res.timestamp, //时间戳
                            nonceStr: res.noncestr, //随机字符串,不长于32位
                            signature: res.signature, //这里的signature是后台使用SHA1签名算法得出，不是MD5，与下面的wx.chooseWXPay中的paySign不同，下面的paySign是后台使用MD5加密得出
                        jsApiList: ['updateAppMessageShareData','updateTimelineShareData','onMenuShareAppMessage','onMenuShareTimeline','showMenuItems',
                                        'hideMenuItems']
                        })
                    wx.ready(()=> {
                     wx.checkJsApi({
                            jsApiList: [
                                // 所有要调用的 API 都要加到这个列表中
                                'updateAppMessageShareData',
                                'updateTimelineShareData',
                                'onMenuShareAppMessage',
                                'onMenuShareTimeline',
                                'showMenuItems',
                                  'hideMenuItems'
                            ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                            success: (res)=> {
                               shareTimeline(that,id)
                               shareFriend(that,id)
                                // 以键值对的形式返回，可用的api值true，不可用为false
                                // 如：{"checkResult":{"chooseimg":true},"errMsg":"checkJsApi:ok"}
                            }
                        });
                });
                
     },that,(statuss)=>{})



}

 function shareFriend(that,id) {
    var  url = 'https://lottery2.dkdcm.cn/?referrerId='+id

 wx.updateAppMessageShareData({ 
    title: "幸运大转盘 iphoneX等你拿", // 分享标题
    desc: "黄金，ipad，苹果笔记本，iphoneX，现金红包...好礼拿到手软", // 分享描述
    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl:'https://lottery-1255515741.file.myqcloud.com/lotteries/1/bg/share.png',// 分享图标
    fail(err){
//    console.log(err)
//    
//    alert(JSON.stringify(err))
    }
    }, function(res) { 
    //这里是回调函数 
    // alert("成功")
    });


 
}

//分享到朋友圈
function shareTimeline(that,id) {
  var  url = 'https://lottery2.dkdcm.cn/?referrerId='+id
   wx.updateTimelineShareData({ 
    title:  "幸运大转盘 iphoneX等你拿", // 分享标题
    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: 'https://lottery-1255515741.file.myqcloud.com/lotteries/1/bg/share.png', // 分享图标
   
    }, 
    function(res) { 
  
    },function(res){
      
      
    }); 



}
