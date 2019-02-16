<template>
  <div class="outwrp">
    	<img class='rules' @click="showrulelayer" src='https://lottery-1255515741.file.myqcloud.com/templates/3/btn_rule_01.png'></img>
    	<img class='headMap' src='https://lottery-1255515741.file.myqcloud.com/templates/3/banner.jpg'></img>
    	
    	 <div class='zhuanwrp' >
		      <div class='zhuan'   style='background-image:url(https://lottery-1255515741.file.myqcloud.com/templates/3/pan_side.png);'></div>
			  	<div class='panBg' :style="{transform:rotate_angle,transition:rotate_transition}"  style='background-image:url(https://lottery-1255515741.file.myqcloud.com/templates/3/pan_bg.png)'>
			        	<template v-for="(item,index) in prizeArray" >
			        		<img  class='item' :src="item.photoUrl" :style="{transform:'rotateZ('+45*index+'deg)'}"></img>
			        	</template>
			    </div>
			    <img class='btn' @click="gos" :style="{transform: imgscale}"  src='https://lottery-1255515741.file.myqcloud.com/templates/3/btn_start_01.png'  ></img>
			    <div class='outerRing'>
			        <!--<div >
			            <img src='https://lottery-1255515741.file.myqcloud.com/templates/3/pan_light01.png'></img>
			        </div>-->
			        <div>
			            <img v-if="twinkle1" src='https://lottery-1255515741.file.myqcloud.com/templates/3/pan_light01.png'></img>
			            <img v-else src='https://lottery-1255515741.file.myqcloud.com/templates/3/pan_light02.png'></img>
			        </div>
			    </div>
			</div>
			
				<div class="opportunity" @click="ispay" style='background-image:url(https://lottery-1255515741.file.myqcloud.com/templates/6/09.png)' >
		              您有{{Tickets}}次机会
		    </div>
		    <div class='numpeo' >
		        此时正有 <span>{{total}}</span> 位在参与活动
		    </div>
		    
		    <div class='prize' style=background-image:url(https://lottery-1255515741.file.myqcloud.com/templates/3/box_txt_01.png);color:#fff;>
          <div class='put'>
                <div>获得红包：<span style='color:#ffcc66'>{{cashs.cash}}</span>元</div>
                <img @click="putmoney" src='https://lottery-1255515741.file.myqcloud.com/templates/3/btn_charge_01.png'></img>
          </div>
          <div class='gosee'>
                <div>获得礼券：<span style='color:#ffcc66;'>{{cashs.coupons}}</span>张</div>
                <img @click="agent('tocertificate')" src='https://lottery-1255515741.file.myqcloud.com/templates/3/btn_more_01.png'></img>
          </div>
    		</div>
    		
    		<div class='winUser' style='background-image:url(https://lottery-1255515741.file.myqcloud.com/templates/3/box_txt_02.png);color:#fff;'>

			  <vue-seamless-scroll :data="listData" class='winbox'  :class-option="classOption" >
			  	<div v-for="item in listData">{{item}}</div>
			  
			  </vue-seamless-scroll>

		    </div>
		    <div class='footer' style='color:#fff;'>
		          <div>活动解释权归[举办公司名称]所有</div>
		          <!--<div>Powered By BoffinLInk.com</div>-->
		    </div>
		    
		    <div class="publicNumber" v-if="isshow">
		    		<div class="publicMain">
		    			<img class="close" @click="hidepublicNumber" src='../assets/img/btn_close_01.png' ></img>
		    			<img class="main" :src="publicNumber.qrCodeUrl"/>
		    		</div>
		    </div>
		    
		    
		    <div class='ruleLayer' v-show="rulelayer">
				    	<div class='ruleLayer__main' style='background-image:url("https://lottery-1255515741.file.myqcloud.com/lotteries/1/bg/rule_bg.png");'>
				        <img @click="hiderulelayer" src='../assets/img/btn_close_01.png' ></img>
				        <div class='rulesActivity'>
				            <div class='tit'>活动规则</div>
				            <span>
				                  1. 本活动面向所有关注"道可道智慧传承"公众号的用户，100%中奖！
				
				                  2. 用户支付一定金额可获取1次抽奖机会，点击【抽奖】按钮开始抽奖。
				
				                  3.红包类奖品将可以在下方【您的奖品】进行领取，系统将以微信企业付款至零钱的方式支付到您的微信账户，请注意及时查收。
				
				                  4. 所有实物奖品需中奖者自行支付邮费。如您获得的奖品是实物兑换券，请根据礼券提示，前往线下商户进行核销使用！
				
				                  5. 填写收件信息时请务必仔细检查，确保姓名、电话地址无误，因中奖者本人填写失误造成的奖品遗失或奖品寄错所产生的一系列额外费用、损失，将由中奖者本人承担；
				       
				
				            </span>
				        </div>
		   		 </div>	
    	</div>
    	
    	<div class='layer redss' v-show="redlayer">
		    <div class='redLayer'>
		          <div class='twinkles'>
		              <img v-if="twinkles" src='../assets/img/twinkles1.png'></img>
		              <img v-else src='../assets/img/twinkles2.png'></img>
		          </div>
		          <div class='mian' style='background-image:url(https://lottery-1255515741.file.myqcloud.com/lotteries/1/bg/redPacket.png);'>
		                <div class='mian-top'>恭喜您，获得红包</div>
		                <div class='mian-mid'>{{award.amount}}元</div>
		                <!--<div class='mian-bot'> {{award.awardType===3?"邀请一位好友为您助力解封":""}}</div>-->
		                <!--<div class='mian-btn' wx:if="{{award.awardType===3}}" bindtap='topowerPage'>立即提现</div>-->
		                <div class='mian-btn' @click="pays">再来一次</div>
		                <img class='cancel' @click="hideredlayer" src='../assets/img/btn_close_01.png'  ></img>
		          </div>
		  </div>
    </div>


    	<div class='layer redss'  v-show="boxlayer">
		    <div class='redLayer'>
		          <div class='mian winbox' >
                    <img class="main-img" src="../assets/img/bgs123.png" alt="">
                    <div class='mian-mid'>{{boxwin.title}}</div>
		                <div class='mian-btn' @click="boxpays">再来一次</div>
		                <img class='cancel' @click="hideboxlayer" src='../assets/img/btn_close_01.png'  ></img>
		          </div>
		  </div>
    </div>
    	
    <van-tabbar v-model="active">
        <van-tabbar-item icon="home">活动</van-tabbar-item>
        <van-tabbar-item @click.native="tomy" icon="contact">我的</van-tabbar-item>
    </van-tabbar>	
    <div class="loindBg" v-if="loding" style="height:300px;width:300px;background:rgba(0,0,0,0.5);color:#fff;text-align: center;line-height:50px;" :style="{top:allHight}">
        <van-loading size='200px'  class="loinding"/>
        加载中
        <!-- <van-loading size='200px' type="spinner" /> -->
    </div>
    
    	
  </div>
</template>

<script>
import req from '../js/request'
import share from '../js/share'
import Token from '../js/tokens'
import Lreq from '../js/lreq'
import Vue from 'vue'
import { Toast } from 'vant';   //提示框
import { mapState ,mapMutations} from 'vuex'
Vue.use(Toast);
export default {
  name: 'HelloWorld',
  data () {
    return {
      loding:true,
      active:0,
      allHight:"",
 			listData:[],
      timesId:"",
      boxlayer:false,
			Tickets:0,//次数
    	total:1980, //有多少人在参与
    	imgscale:"translateX(-50%) scale(1)",
    	cashs:{
    		cash:0,
    		coupons:0
    	},//礼券钱
			gosLock:true,  //按中间的锁
			award:{}, //奖品列表
    	publicNumber:{
    		qrCodeUrl:"",
    		subscribed:true
      }, //公众号页面
      boxwin:{},
    	isshow:false, //公众号页面是否显示
    	twinkle1:false,  //转盘层效果
    	redlayer:false, //红包层
    	twinkles:true,  //红包层闪烁效果
    	rulelayer:false,//规则层
    	start_rotating_degree: 0, //初始旋转角度
    	rotate_angle_pointer:0,
      rotate_angle:0, //将要旋转的角度
      rotate_transition: "transform 3s ease-in-out", //初始化选中的过度属性控制
      rotate_transition_pointer: "transform 12s ease-in-out", //初始化指针过度属性控制
     	prizeArray:[]
    }
  },
  created(){
          this.inviter()
          this.allHight = window.screen.height+"px"
          console.log(this.allHight)
          Lreq("/users",'get',"",(res,statuss)=>{
              window.localStorage.setItem("userId",res.data.data.id)
              share(this,res.data.data.id)
          },this,(statuss)=>{})
		
		 			req("users/subscribed",'get',"",(res,statuss)=>{
                this.publicNumber = res.data.data
                
        	},this,(statuss)=>{})
				
        this.getList()
     

				Lreq("/orders/"+this.$store.state.ids+"/total",'get',"",(res,statuss)=>{
               this.total = res.data.data+1980
               
        },this,(statuss)=>{})
				
				this.getAprize()
				
				
				Lreq("/bonuses/"+this.$store.state.ids+"/newest",'get',"",(res,statuss)=>{
               this.listData = res.data.data.map((val)=>{
               	     return "恭喜"+ val.id +"获得" +val.title
               })
        },this,(statuss)=>{})
				
				
 				
  		 this.time2 =	setInterval(()=>{
  				this.twinkle1 = this.twinkle1?false:true
  		},1000)
  		 
  },
  destroyed(){
  	clearInterval(this.time1)
  	clearInterval(this.time2)
  },
  computed:{
  	classOption(){  //滚动动画
  			return {
          step: 0.5,
          limitMoveNum: 5,
          hoverStop: false, //是否开启鼠标悬停stop
       }

    },
      ...mapState({
    // 箭头函数可使代码更简练
        'referrerId':"referrerId"
        })
  },
  methods:{
    inviter(){
        let params = window.location.href.split('#')[0]
        params = params.split("?")[1]
        var obj = {}
        if(params){
          params = params.split("&")
          for(var i=0;i<params.length;i++){
            var arr1 = params[i].split("=")
            obj[arr1[0]] = arr1[1]
          }
        }
        window.localStorage.setItem("referrerId","")
        if(obj.referrerId){
            window.localStorage.setItem("referrerId",obj.referrerId)
        }
        if(obj.lotteryId){
           this.changeId(obj.lotteryId)
        }
         if(!window.localStorage.getItem("token")){
              Token(this)
          }

    },
    tomy(){  //去我的页面
      
        this.$router.replace({path: '/my'})

    },
  	getList(){  //得到奖品列表
  		Lreq("awards/"+this.$store.state.ids,'get',"",(res,statuss)=>{
                console.log(res)
                this.prizeArray = res.data.data.awards
                this.timesId = res.data.data.times
                Lreq("/orders/"+this.$store.state.ids+"/tickets?times=" + res.data.data.times,'get',"",(res,statuss)=>{
                					this.Tickets = res.data.data
											           
								},this,(statuss)=>{})
        },this,(statuss)=>{})
  	},
  	getAprize(){  //得到奖品列表
  		Lreq("/bonuses/"+this.$store.state.ids+"/stat",'get',"",(res,statuss)=>{
               this.cashs = res.data.data
        },this,(statuss)=>{})
  	},
  	hidepublicNumber(){
  		
  		req("users/subscribed",'get',"",(res,statuss)=>{
                this.publicNumber = res.data.data
                this.isshow = false
       },this,(statuss)=>{})
  	},
  	showrulelayer(){  //显示规则
  		this.rulelayer = true
  	},
  	hiderulelayer(){  //隐藏规则
  		this.rulelayer = false
  	},
  	showredlayer(res){  //红包层展示
  		this.award = res
  		this.redlayer = true
  		this.time1 =	setInterval(()=>{
  				this.twinkles = this.twinkles?false:true
  		},1000)
  	},
  	getvoucher(){ //点击礼券按钮
  		console.log(555)
  		if(this.gosLock){
  			console.log(555)
  			Toast('当前没有礼券哦');
  		}
  	},
  	hideredlayer(){  //红包层隐藏
  		clearInterval(this.time1)
      this.redlayer = false
    },
    showboxlayer(res){
        this.boxwin = res
  		this.boxlayer = true
    },
    hideboxlayer(){
      this.boxlayer = false
    },
  	ispay(){  //点击机会
  			if(this.gosLock){
  					if(this.Tickets){
			  			Toast('点击上面按钮抽奖哦');
			  		}else{
			  			this.gos()
			  		}
  			}
  	
    },
     tocertificate(){   //去礼券详情页
             this.$router.push({path: '/certificate'})
      },
      agent(fn){  //代理
          if(this.publicNumber.subscribed){
              this[fn]()
          }else{
              this.isshow = true
          }
      },
  	putmoney(){
  		if(this.cashs.cash == 0){
  			Toast('当前无提现余额');
  		}else if(this.cashs.cash <= 0.3){
  			Toast('少于0.3元不能提现哦');
  		}else{
        if(this.publicNumber.subscribed){
            Lreq("bonuses/"+this.$store.state.ids+"/pick",'post',"",(res,statuss)=>{
                console.log(res.data)
                window.location.href =	res.data.data				           
          },this,(statuss)=>{})
        }else{
          this.isshow = true
        }
      }
      
  		
    },
    boxpays(){
      Lreq("/orders/"+this.$store.state.ids+"?referrerId="+window.localStorage.getItem("referrerId")+"&times="+this.timesId,'post',"",(res,statuss)=>{
	  			Lreq("/orders/" + res.data.data.id + "/pay",'post',"",(res,statuss)=>{
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
                      		this.hideboxlayer()
                          setTimeout(() => {
                          		Lreq("/orders/"+this.$store.state.ids+"/tickets?times=" + this.timesId,'get',"",(res,statuss)=>{
											                	this.Tickets = res.data.data
											        },this,(statuss)=>{})
							              
							            }, 500)
                      } 
                  });
	        },this,(statuss)=>{})
                
                
                
      },this,(statuss)=>{})
    },
  	pays(){
  		Lreq("/orders/"+this.$store.state.ids+"?referrerId="+window.localStorage.getItem("referrerId")+"&times="+this.timesId,'post',"",(res,statuss)=>{
	  			Lreq("/orders/" + res.data.data.id + "/pay",'post',"",(res,statuss)=>{
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
                      		this.hideredlayer()
                          setTimeout(() => {
                          		Lreq("/orders/"+this.$store.state.ids+"/tickets?times=" + this.timesId,'get',"",(res,statuss)=>{
											                	this.Tickets = res.data.data
											        },this,(statuss)=>{})
							              
							            }, 500)
                      } 
                  });
	        },this,(statuss)=>{})
                
                
                
      },this,(statuss)=>{})
  	},
  	reset(){  // 重置转盘
  		this.rotate_transition= "", //初始化选中的过度属性控制
  		this.rotate_angle = "rotate(0deg)";
  		this.getList()
  		setTimeout(()=>{
  			this.rotate_transition= "transform 3s ease-in-out"
  		},500)
  	},
		gos(){  //点击抽奖按钮
							this.imgscale = "translateX(-50%) scale(.9)"
				      setTimeout(()=>{
				        this.imgscale = "translateX(-50%) scale(1)"
				      },500)
				 if(this.gosLock){
				 			this.gosLock = false
				 			
				 		
							Lreq("/draw/"+this.$store.state.ids+"?times=" + this.timesId,'get',"",(res,statuss)=>{
	                if(res.data.code == 601){
	                	this.gosLock = true
	                	this.pays()
	                }else if(res.data.code == 602){
	                	this.gosLock = true
	                	this.getList()
	                }else{
	                	var type = 0; // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
							      var during_time = 2; // 默认为1s
							      var result_index = res.data.data.slot - 1// 最终要旋转到哪一块，对应prize_list的下标
							      var result_angle = [0, -45, -90, -135, -180, -225, -270, -315]; //最终会旋转到下标的位置所需要的度数
							      var rand_circle = 6; // 附加多转几圈，6
							      this.click_flag = false; // 旋转结束前，不允许再次触发
							      if (type == 0) {
							        // 转动盘子
							        var rotate_angle =
							          this.start_rotating_degree +
							          rand_circle * 360 +
							          result_angle[result_index] -
							          this.start_rotating_degree % 360; // 这里为计算旋转的角度，考虑第一次旋转后的结果
							        this.start_rotating_degree = rotate_angle;
							        this.rotate_angle = "rotate(" + rotate_angle + "deg)";
							        setTimeout(()=> {
                        if(res.data.data.awardType <=3){
                          this.showredlayer(res.data.data)
                        }else{
                          this.showboxlayer(res.data.data)
                        }
                        
                        this.getAprize()
							          this.reset()
							          this.gosLock = true
							        }, during_time * 1000+1500);
	               }}
	        		},this,(statuss)=>{})
						
				 }
					
						 
						
	
						  		
        },
        ...mapMutations({
      changereferrerId:"changereferrerId",
      changeId:"changeId"
    })
			
	}
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loindBg{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 999;
  border-radius:10px; 
}
.loinding{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.outwrp{
	min-height:1090.5px;
  width: 100%;
  background-image:url(https://lottery-1255515741.file.myqcloud.com/templates/3/background.jpg);
  background-repeat:no-repeat;
  background-size:100% auto;  
  position: relative;
  padding-bottom:1.7333rem;
  
}
.rules{
  width: 2.9066rem;
  height: 0.76rem;
  position: absolute;
  top: 0.24rem;
}
.headMap{
  width: 100%;
  height: 3.44rem;
  margin-bottom: 0.4533rem;
}
.zhuanwrp{
  width: 100%;
  height: 10.3733rem;
  position: relative;
  margin: 0 auto;
}
.zhuan{
  width: 100%;
  height:10.3733rem;
  background-repeat:no-repeat;
  background-size:100% 100%;  
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 1;
  
}
.panBg{
  position: absolute;
  width: 9.2266rem;
  height: 9.2266rem;
  margin: 0 auto;
  transform-origin: 4.6133rem 4.6133rem;
  background-repeat:no-repeat;
  background-size:100% 100%;  
  top: .1333rem;
  left: .3866rem;
}
.panBg .item{
  width: 2.7733rem;
  height: 2.6rem;
  position: absolute;
  top: .6266rem;
  left: 3.2266rem;
  transform-origin:1.38rem 3.9866rem;
}

.zhuanwrp .btn{
  position: absolute;
  width: 2.96rem;
  height: 3.44rem;
  left: 50%;
  top: 2.8933rem;
  transition:  transform 500ms ease;
  z-index: 999;
}
.zhuanwrp .outerRing{
  position: absolute;
  top: .1733rem;
  left:50%;
  transform: translateX(-50%);
  z-index: 99;
  width: 9.2266rem;
  height:9.2266rem;
}
.zhuanwrp .outerRing img{
  width: 9.2266rem;
  height: 9.2266rem;
}
.opportunity{
  margin:0 auto .4rem;
  width: 8.32rem;
  height: 1.266rem;
  display: block;
  background-size:100% 100%; 
  background-repeat:no-repeat;
  text-align: center;
  line-height: 1rem;
  color: #fff;
}
.numpeo{
  text-align: center;
  margin: .28rem auto .6133rem;
  color: #fff;
  font-size: .44rem;
  background: #dc3843;
  height: .88rem;
  line-height: .88rem;
  border:.0533rem solid #f74c55;
  width: 8.1333rem; 
  border-radius:.16rem; 
}
.numpeo span{
  font-size: .4666rem;
  color: #ffff00;
}

.prize{
  width:8.3466rem;
  height: 3.9333rem;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin: 0 auto .6266rem;
  font-size: .2933rem;
  overflow: hidden;
}
.prize span{
  width: 2.6rem;
  display: inline-block;
  text-align: center;
  font-size: .3333rem;
}
.prize img{
  width: 2rem;
  height: .5733rem;
}
.prize>div{
  width: 7.0933rem;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
}
.prize div.put{
  margin: 1.5866rem auto .4266rem;
}
.prize button{
  width: 2rem;
  height: .5733rem;
  background-size:100% 100%;
  background-repeat:no-repeat;
  padding: none;
  background-color:transparent;   
  margin: 0;
}
.prize button::after{
  border: none;
}
.winUser{
   background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 8.3466rem;
  height: 6.24rem;
  margin: 0 auto .48rem;
  overflow: hidden;
}
.winbox{
  width: 7.6rem;
  height: 3.5733rem;
  font-size: .36rem;
  margin: 1.6rem auto;
  line-height: .6666rem;
  overflow: hidden;
}
.footer{
  line-height: .5866rem;
  font-size: .3066rem;
  text-align: center;
}


.ruleLayer{
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}
.ruleLayer__main{
  width: 331.5px;
  height: 535px;
  background-repeat: no-repeat;
  background-size:100% 100%;
  margin: 40px auto;
  position: relative;
  overflow: hidden;
}
.ruleLayer__main img{
  width: 40px;
  height: 40px;
  position: absolute;
  top: 10px;
  right: 10px;
}
.rulesActivity{
  margin-top: 79.5px;
  height: 278px;
}
.ruleLayer__main  .tit{
  font-size: 16.5px;
  color: #cc3333;
  font-weight: 600;
  text-align: center;
  margin-bottom: 14px;
}
.ruleLayer__main span{
  width: 289px;
  color: #333;
  font-size: 11px;
  margin-left: 21.25px;
  display: inline-block;
  white-space: pre-line;
}


.layer{
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  text-align: center;
}
.redss{
  z-index: 1000000;
}
.layer__main{
  width: 331.5px;
  height: 459px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin: 58px auto 0;
  overflow: hidden;
}
.layer__Lottery{
  margin: 132px auto 16.5px;
  width: 249px;
  height: 126.5px;
  background: black;
}
.Congratulations{
  font-size: 13.5px;
  color: #cc3333;
}
.tips{
  margin: 25px auto 15px;
  font-size: 13.5px;
  width: 80%;
}
.layer__main img{
  width: 266.5px;
  height: 31px;
}
.layer .cancel{
  width: 36px;
  height: 36px;
  margin-top: 16.5px;
}
.redLayer{
  position: relative;
  width: 100%;
}
.redLayer .mian{
  width: 372.5px;
  height: 481px;
  background-repeat:no-repeat;
  background-size:100% 100%;
  position: absolute;
  top: 47px;
  left: 50%;
  transform:translateX(-50%); 
}
.redLayer .twinkles{
  width: 100%;
  height: 385px;
  position: absolute;
  top: 74px;
}
.redLayer .twinkles img{
  width: 100%;
  height: 100%;
}
.redLayer .mian-top{
  margin: 180px 0 20px;
  color: #ec1503;
  font-size: 21px;
  font-weight: 600;
}
.redLayer .mian-mid{
  color: #fecb00;
  font-weight: 600;
  font-size: 29px;
}
.redLayer .mian-bot{
  margin: 29px 0 77.5px;
  font-size: 12.5px;
  height: 12.5px;
  color: #000;
}
.redLayer .mian-btn{
  width: 253px;
  height: 52px;
  margin: 120px auto 0;
  background: #ffcc01;
  border-radius:9px;
  line-height: 52px;
  color: #fefffb;
  font-size: 20px;
  font-weight: 600; 
}
.redLayer .cancel{
  margin-top: 50px;
}

.publicNumber{
	width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  text-align: center;
}
.publicMain{
	width: 356.5px;
	height: 300px;
	background-image: url(../assets/img/follow.png);
	background-repeat: no-repeat;
	background-size: 100% 100%;
	margin: 195px auto 0;
	position: relative;
}
.publicMain .close{
	width: 35px;
	height: 35px;
	position: absolute;
	top: -36px;
	right: 50px;
}
.publicMain .main{
	height: 102px;
	width: 102px;
	margin-top: 29px;
}
.redLayer .winbox{
  background-image:url(../assets/img/box_win.png);
  width: 331.5px;
  height: 492.5px;
  margin-top: 20px;
}
.redLayer .winbox .main-img{
  width: 80%;
  display: block;
  height: 100px;
  margin: 150px auto 0;
}
.redLayer .winbox .mian-btn{
  margin-top: 40px;
}
.redLayer .winbox .mian-mid{
  margin-top: 20px;
}
</style>
