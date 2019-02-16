<template>
  <div class="wrap">


        <div  class='phone' v-if="!phones">
        <div class='phone__header'>
                <img src='https://lottery-1255515741.file.myqcloud.com/lotteries/1/bg/myimg01.png'></img>
                <div class='titles'>道可道智慧传承</div>
        </div>
        <div class='phone__center'>
            <div class='phone__input'>
                <div class='phonenums'>
                    <img src='https://lottery-1255515741.file.myqcloud.com/lotteries/1/bg/myimg03.png'></img>
                    <input pattern="\d*" v-model="mobile" @blur="mobileinput" placeholder='输入手机号' ></input>
                </div>
                
                <div class='yanzhengma'>
                    <div class='yan__01'>
                        <img src='https://lottery-1255515741.file.myqcloud.com/lotteries/1/bg/myimg02.png'></img>
                        <input pattern="\d*"  v-model="code" class='phoneyan'  placeholder='输入验证码'></input>
                    </div>
                    
                    <div class='yan__02' @click='sendcode'>获取短信</div>
                </div>
                <div class="phone__bot">
                    <van-button size="large" @click="signIn">绑定手机并登录</van-button>
                    <!-- <button bindtap='signIn'>绑定手机并登录</button> -->
                </div>
            </div>
        </div>
    </div>



      <div class="my" v-else>
          <div class="header">
                <div class="header-top">
                    <img class="headPortrait" :src="userInfo.avatarUrl">
                    <div class="uaerName">
                        <span>{{userInfo.nickName}}</span>
                        <img v-if="userId.sellerType<2" @click="torule"  src="../assets/my/vip.png" alt="">
                        <img v-else src="../assets/my/svip.png" alt="">
                    </div>
                </div>
                <div class="header-mid">
                    <div class="header-mid-mian">

                        <div class="hmm-item">
                            <div class="hmm-top">
                                <img src="../assets/my/item1.png" alt="">
                                <span>红包</span>
                            </div>
                            <div class="hmm-mid" style="color:#ff6633;">{{redenvelopes}}</div>
                            <div class="hmm-bot" @click="putmoney" style="background:#ff9566;border:1.5px solid #ff9566;color:#fff;">提现</div>
                        </div>

                        <div class="hmm-item" style="border-left:1px dotted #cccccc; border-right:1px dotted #cccccc; ">
                            <div class="hmm-top">
                                <img src="../assets/my/item2.png" alt="">
                                <span>收益</span>
                            </div>
                            <div class="hmm-mid" style="color:#cc66ff;">{{Profit}}</div>
                            <!-- <div class="hmm-bot">转余额</div> -->
                        </div>

                        <div class="hmm-item" >
                            <div class="hmm-top">
                                <img src="../assets/my/item3.png" alt="">
                                <span>余额</span>
                            </div>
                            <div class="hmm-mid" style="color:#ff9900;">{{balance}}</div>
                            <div class="hmm-bot" @click="cashwithdrawal" style="background:#ff9566;border:1.5px solid #ff9566;color:#fff;">提现</div>
                        </div>

                    </div>
                </div>
            

                <ul class="header-bot">
                    <li @click="agent('tomyteam')">
                        <img src="../assets/my/li1.png">
                        <p>我的团队</p>
                    </li>
                    <li @click="agent('tocertificate')">
                        <img src="../assets/my/li2.png">
                        <p>我的礼券</p>
                    </li>
                    <li @click="agent('tocommission')">
                        <img src="../assets/my/li3.png">
                        <p>雇佣明细</p>
                    </li>
                    <li @click="agent('towithdrawals')">
                        <img src="../assets/my/li4.png">
                        <p>提现记录</p>
                    </li>
                </ul>

            
            </div>

            <div class="center">
                <ul class="ctitle">
                    <li @click="agent('tohairPoster')">
                        <img src="../assets/my/ctit4.png" alt="">
                        <p>分享海报</p>
                    </li>
                    <li @click="agent('totasklist')">
                        <img src="../assets/my/ctit5.png" alt="">
                        <p>任务列表</p>
                    </li>
                    <li @click="contactCustomer">
                        <img src="../assets/my/ctit3.png" alt="">
                        <p>联系客服</p>
                    </li>
                
                </ul>
                <img @click="torule" class="banners" src="../assets/my/banners.jpg" alt="">
            </div>
      </div>
      
      
    <div class="publicNumber" v-if="isshow"> <!-- 关注公众号 -->
            <div class="publicMain">
                <img class="close" @click="hidepublicNumber" src='../assets/img/btn_close_01.png' ></img>
                <img class="main" :src="publicNumber.qrCodeUrl"/>
            </div>
    </div>
    


    <van-tabbar v-model="active">
        <van-tabbar-item @click.native="toindex" icon="home">活动</van-tabbar-item>
        <van-tabbar-item  icon="contact">我的</van-tabbar-item>
    </van-tabbar>
     <div class="loindBg" v-if="loding" style="height:300px;width:300px;background:rgba(0,0,0,0.5);color:#fff;text-align: center;line-height:50px;" :style="{top:allHight}">
        <van-loading size='200px'  class="loinding"/>
        加载中
        <!-- <van-loading size='200px' type="spinner" /> -->
    </div>


  </div>
</template>

<script>
import Lreq from '../js/lreq'
import req from '../js/request'
import share from '../js/share'
import Vue from 'vue'
import { Toast } from 'vant';   //提示框
import { mapState ,mapMutations} from 'vuex'
Vue.use(Toast);
export default {
  name: 'my',
  data () {
    return {
        loding:true,
        allHight:"",
        active:1,
        phones:true,  //是否有手机
        mobile:"",  //手机号
        code:""  ,   //验证码
        phonelock:false,  //判断手机号格式是否正确
        isshow:false,   //是否关注公众号
        publicNumber:{
    		qrCodeUrl:"",
    		subscribed:true
        }, //公众号页面
        userId:{}, //自己是不是会员等信息
        userInfo:{},
        redenvelopes:"",  //红包
        Profit:"",     //收益
        balance:""         //余额
    }
  },
  created(){  
      this.allHight = window.screen.height+"px"
        Lreq("/users",'get',"",(res,statuss)=>{  //获取自己信息 
              window.localStorage.setItem("userId",res.data.data.id)
              share(this,res.data.data.id)
              this.userInfo = res.data.data
            this.changereferrerId(res.data.data.id)
        },this,(statuss)=>{})
        Lreq("/users/phone/exists",'get',"",(res,statuss)=>{
                    this.phones = res.data.data
        },this,(statuss)=>{})
        Lreq("bonuses/"+this.$store.state.ids+"/stat",'get',"",(res,statuss)=>{  //获取红包 
   
                    this.redenvelopes = res.data.data.cash
        },this,(statuss)=>{})
        Lreq("/sellers",'get',"",(res,statuss)=>{  //获取自己信息是不是会员 
                    if(res.data.data){
                        this.userId = res.data.data
                    }else{
                        this.userId.sellerType = 1
                    }
        },this,(statuss)=>{})
        Lreq("sellers/bonus/total",'get',"",(res,statuss)=>{  //获取收益   
                    this.Profit = res.data.data
        },this,(statuss)=>{})
        Lreq("sellers/balance",'get',"",(res,statuss)=>{  //获取余额   
                    this.balance = res.data.data
        },this,(statuss)=>{})
        req("users/subscribed",'get',"",(res,statuss)=>{
            this.publicNumber = res.data.data
            
        },this,(statuss)=>{})
  },
   computed: {
      ...mapState({
    // 箭头函数可使代码更简练
        'referrerId':"referrerId"
        })
  },
  methods:{
      cashwithdrawal(){  //提现
            if(this.balance <= 0.3){
  			Toast('少于0.3元不能提现哦');
  		}else{
  			Lreq("sellers/withdraw",'post',{
            amount:this.balance,
            type:1
            },(res,statuss)=>{
                    var url =  encodeURIComponent("https://lottery2.dkdcm.cn?lotteryId=" + this.$store.state.ids)
                	window.location.href = res.data.data+"&rurl="+url				           
			},this,(statuss)=>{})
  		}
      },
      toindex(){  //去首页
            this.$router.replace({path: '/'})
      },
      contactCustomer(){
          Toast('该功能没有开通')
      },
      mobileinput(){
          var reg = /^[1][3,4,5,7,8][0-9]{9}$/  //必须为11位的手机数字结构
          console.log(this.mobile)
          if(reg.test(this.mobile)){
              this.phonelock = true
          }else{
              Toast('请输入正确手机号码')
              this.mobile = ""
              this.phonelock = false
          }
      },
      sendcode(){  //发送验证码
            if(this.phonelock){
                Lreq("/verifycode?mobile=" + this.mobile,'post',"",(res,statuss)=>{
                        if (res.data.code === 304) {
                            Toast('不要频繁操作哦')
                        } else {
                            Toast.success('验证码已发送')
                        } 
                },this,(statuss)=>{})
            }
      },
      signIn(){  //按确认按钮
   
            Lreq("/users/verifyphone?mobile=" + this.mobile + "&code=" + this.code,'post',"",(res,statuss)=>{
                         if(res.data.code === 0){
            
                                Toast.success('登陆成功')
                                this.phones = true
                                 Lreq("sellers/bonus/total",'get',"",(res,statuss)=>{  //获取收益   
                                            this.Profit = res.data.data
                                },this,(statuss)=>{})
                                Lreq("sellers/balance",'get',"",(res,statuss)=>{  //获取余额   
                                            this.balance = res.data.data
                                },this,(statuss)=>{})
                                Lreq("/sellers",'get',"",(res,statuss)=>{  //获取自己信息是不是会员   
                                            this.userId = res.data.data
                                },this,(statuss)=>{})
                        }else{
                            console.log(3)
                            Toast('手机验证码不匹配')
                        }
            },this,(statuss)=>{})
      },
        tomyteam(){  //去我的团队
            this.$router.push({path: '/myteam'})
      },
        tocommission(){  //去佣金明细
            this.$router.push({path: '/commission'})
      },
        towithdrawals(){  //去提现记录
            this.$router.push({path: '/withdrawals'})
      },
      tohairPoster(){  //去发圈海报页
            this.$router.push({path: '/hairPoster'})
      },
      torule(){    //去规则页
            this.$router.push({path: '/rule'})
      },
      totasklist(){    //去任务页
            this.$router.push({path: '/tasklist'})
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
  		if(this.redenvelopes == 0){
  			Toast('当前无提现余额');
  		}else if(this.redenvelopes <= 0.3){
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
      hidepublicNumber(){    //隐藏公众号
  		
  		req("users/subscribed",'get',"",(res,statuss)=>{
                this.publicNumber = res.data.data
                this.isshow = false
       },this,(statuss)=>{})
      },
      ...mapMutations({
      changereferrerId:"changereferrerId"
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
.header{
    width: 100%;
    height: 343.5px;
    background-image: url("../assets/my/headbg.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.header-top{
    height: 154px;
    position: relative;
}
.header-top .headPortrait{
    position: absolute;
    width: 90px;
    height: 90px;
    border: 5px solid #ffa19b;
    border-radius:50%; 
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    
}
.uaerName{
    position: absolute;
    color: #fff;
    font-size: 15px;
    text-align: center;
    width: 100%;
    top: 97.5px;
}
.uaerName span{
    display: inline-block;
    margin-bottom: 10px;
    width: 90px;
    text-align: right;
}
.uaerName img{
    width: 72.5px;
    height: 58.5px;
    vertical-align: bottom;
}
.header-mid-mian{
    height: 89px;
    width: 330.5px;
    background: #fff3f0;
    padding: 10px;
    border-radius: 10px;
    margin: 5px auto 7px;
    display: flex;
    justify-content: space-between;
}
.hmm-item{
    width: 33.33%;
    text-align: center;
}
.hmm-top{
    color: #d3ccca;
    font-size: 11px;
}
.hmm-top img{
    width: 18px;
    height: 18px;
    vertical-align: middle;
    margin-right: 3px;
}
.hmm-mid{
    font-size: 15px;
    margin: 15px 0 12px;
}
.hmm-bot{
    color: #ff9900;
    font-size: 12px;
    width: 62px;
    height: 22px;
    line-height: 22px;
    border: 1.5px solid #f26f1b;
    border-radius:6px;
    margin: 0 auto; 
}
.header-bot{
    width: 325px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
}
.header-bot li{
    width:62.5px;
    color: #fff;
    font-size: 11px;
}
.header-bot img{
    width: 50px;
    height: 50px;
    margin-bottom: 3px;
}
.center{
    margin-top: 15px;
    padding-bottom: 80px;
}
.center ul{
    color: #666666;
    font-size: 15px;
    text-align: center;
    width: 357px;
    margin: 0 auto 11px;
    display: flex;
    justify-content: space-between;
}
.center ul li{
    width: 112px;
    height: 100px;
    border: 1px solid #ededeb;
    border-radius:5px; 
}
.center ul li img{
    width: 55px;
    height: 55px;
    margin: 12px 0 10px;
}
.center .banners{
    width: 355px;
    height: 100px;
    display: block;
    margin:0 auto;
}



.phone{
  width: 100%;
  height: 100%;
}
.phone button{
  width: 90%;
  display: block;
  margin:25px auto 57px;
}
.phone__header img{
  width: 80px;
  height: 80px;
  display: block;
  margin: 48.5px auto 17px;
}
.phone__header .titles{
  color: #666;
  font-weight: bold;
  text-align: center;
}
.phone__center .Ctitle{
  text-align: center;
  font-size: 16.5px;
  color: #a9a9a9;
  position: absolute;
  width: 138.5px;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 99;
  background: #fafafa;
}
.phone__top{
  width: 354px;
  height: 26px;
  position: relative;
  margin: 0 auto;
}
.phone__top::after{
  position: absolute;
  content: "";
  display: block;
  width: 100%;
  height: .5px;
  background: #a9a9a9;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.phonenums{
  width: 359px;
  height: 37.5px;
  position: relative;
  margin: 22.5px auto 9px;
}
.phonenums input{
  width: 313px;
  height: 100%;
  border: 2px solid #cacaca;
  border-radius: 8px;
  position: absolute;
  top: 0;
  left: 0;
  padding-left: 46px;
  font-size: 13px;
}
.phonenums img{
  height: 22px;
  width: 22px;
  top: 8.5px;
  left: 12.5px;
  position: absolute;
  z-index: 150;
}
.yanzhengma{
  width: 359px;
  height: 37.5px;
  position: relative;
  margin:  20px auto 31px;
  display: flex;
  justify-content: space-between;
}
.yanzhengma img{
  height: 22px;
  width: 22px;
  top: 8.5px;
  left: 12.5px;
  position: absolute;
  z-index: 150;
}
.yan__01{
  position: relative;
  width: 231.5px;
  height: 37.5px;
}
.yan__01 input{
  width: 184.5px;
  height: 100%;
  border: 2px solid #cacaca;
  border-radius: 8px;
  position: absolute;
  top: 0;
  left: 0;
  padding-left: 46px;
  font-size: 13px;
}
.yan__02{
  width: 116px;
  height: 37.5px;
  line-height: 37.5px;
  color: #fff;
  font-size: 17px;
  background: #90c6fc;
  border-radius:7.5px;
  text-align: center; 
  margin-top: 5px;
}
.phone__bot button{
  background: #3399ff;
  color: #fff;
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
</style>