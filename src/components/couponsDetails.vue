<template>
  <div class="wrapper" :style="{minHeight:allHight}">
      <div class="header">
          <div class="header-top">
              <span class="title">礼券核销码</span>
              <div class="time">获得时间： {{datas.createTime}}</div>
          </div>
          <div class="header-mid">
            {{datas.id}}
          </div>
          <qriously :value="scan" :size="size" class="qrious" :style="{width:sizes,height:sizes}"/> 
          <div class="header-fot">
              <!-- 提供商户：飞石咖啡 -->
          </div>
      </div>
      <div class="center">
          <div class="title">使用说明:</div>
          <div class="text">撒旦撒尽快核实拉开DHL撒客户的那两款撒谎撒开了多久了雷克萨大家离开洒家到了垃圾啊考虑凯撒决定了凯撒觉得</div>
      </div>
  </div>
</template>

<script>
import Lreq from '../js/lreq'
import Vue from 'vue'
import VueQriously from 'vue-qriously'
Vue.use(VueQriously)
import share from '../js/share'
export default {
  name: 'mtTeam',
  data () {
    return {
        allHight:"",
        datas:"",
        size:180,
        sizes:"180px",
        scan:"53151"
    }
  },
  created(){
        this.allHight = document.documentElement.clientHeight+"px"
        this.size = document.documentElement.clientWidth*0.42
        this.sizes = document.documentElement.clientWidth*0.42+"px"
        Lreq("/users",'get',"",(res,statuss)=>{
              window.localStorage.setItem("userId",res.data.data.id)
              share(this,res.data.data.id)
          },this,(statuss)=>{})
          Lreq("bonuses/"+this.$store.state.ids+"/coupons/"+this.$route.query.id,'get',"",(res,statuss)=>{
              var res = res.data.data
              res.createTime = this.day(res.createTime)
              this.datas = res
              this.scan = res.key
          },this,(statuss)=>{})
  },
  
  methods:{
     day(time){
        var date = new Date(time)
        var year = date.getFullYear() + '/' + this.addzero((date.getMonth() + 1)) + '/' + this.addzero(date.getDate()) + " " + this.addzero(date.getHours()) + ":" + this.addzero(date.getMinutes()) + ":" + this.addzero(date.getSeconds())
        return year
     },
     addzero(str) {
        if (str < 10) {
        return "0" + str
        } else {
        return str
        }
    },  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.wrapper{
  background: #eeeeee;
  overflow: hidden;
}
.header{
  width: 335px;
  height: 359.5px;
  background-image: url(../assets/coup/details.png);
  background-repeat:no-repeat;
  background-size:100% 100%;
  margin: 15px auto; 
  overflow: hidden;
}
.header-top{
  display: flex;
  width: 246px;
  margin: 25px auto 17px;
  justify-content: space-between;
  color: #fff;
}
.header-top .title{
  font-size: 15px;
}
.header-top .time{
  font-size: 10px;
  margin-top: 5px;
}
.header-mid{
  color: #fff1c9;
  display: flex;
  justify-content: space-between;
  width: 246px;
  margin:  0 auto 51px;
  font-size: 20px;
}
.canvan{
  width: 165px;
  height: 165px;
  margin: 0 auto 26px;
  background: #333;
}
.header-fot{
  text-align: center;
  font-size: 15px;
  color: #747372;
}
.center{
  width: 335px;
  height: 184.5px;
  background-image: url(../assets/coup/Instructions.png);
  background-repeat:no-repeat;
  background-size:100% 100%;
  margin: 0 auto;
  overflow: hidden;
}
.center .title{
  font-size: 16px;
  color: #fff;
  margin:11px auto 32px;
  width: 287px;
}
.center .text{
  margin:11px auto 0;
  width: 287px;
  line-height: 24px;
  color: #666;
  font-size: 12px;
}
.qrious{
  margin: 0 auto;
}
</style>