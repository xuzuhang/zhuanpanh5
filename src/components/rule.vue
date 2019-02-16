<template>
  <div class="wrapper">

            <img v-if="sellerType<2" @click="pay" class="btn1" src='https://lottery-1255515741.cos.ap-shanghai.myqcloud.com/lotteries/1/bg/ruleBtn.png'></img>
        

  </div>
</template>

<script>
import Lreq from '../js/lreq'
import Vue from 'vue'
import share from '../js/share'
import { Toast } from 'vant';
Vue.use(Toast);
export default {
  name: 'mtTeam',
  data () {
    return {
        sellerType:1,
        referrerId:""
    }
  },
  created(){
      this.referrerId =  window.localStorage.getItem("referrerId")
    Lreq("/sellers",'get',"",(res,statuss)=>{  //获取自己信息是不是会员   
                    this.sellerType = res.data.data.sellerType
        },this,(statuss)=>{})
        Lreq("/users",'get',"",(res,statuss)=>{
              window.localStorage.setItem("userId",res.data.data.id)
              share(this,res.data.data.id)
          },this,(statuss)=>{})
  },





  methods:{
     pay(){
      
       Lreq("sellers/orders?lotteryId="+this.$store.state.ids+"&referrerId="+this.referrerId,'post',"",(res,statuss)=>{  //获取自己信息是不是会员   
                   var res = res.data.data
	               WeixinJSBridge.invoke(
                      'getBrandWCPayRequest', {
                        "appId":res.appId,     //公众号名称，由商户传入     
                        "timeStamp":res.timeStamp,         //时间戳，自1970年以来的秒数     
                        "nonceStr":res.nonceStr, //随机串     
                        "package":res.package,     
                        "signType":res.signType,         //微信签名方式：     
                        "paySign":res.paySign //微信签名 
                      },
                      (res)=>{
                      if(res.err_msg == "get_brand_wcpay_request:ok" ){
                        this.sellerType=2
                        Toast.success('系统正在为您分配会员')
                      } 
                  });
        },this,(statuss)=>{})
     }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper{
    background-image: url(https://lottery-1255515741.file.myqcloud.com/lotteries/1/bg/activity.jpg);
    background-repeat:no-repeat;
    background-size:100% 100%;
    width: 100%;
    height: 1030.5px;  
    overflow: hidden;
}
img{
    width: 317px;
    height: 52px;
    display: block;
}
.btn1{
    margin: 425px auto 0;
}

</style>