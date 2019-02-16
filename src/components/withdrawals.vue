<template>
  <div class="wrapper">

    <div class="center">
        <div class="t-header">
            <div class="num">序号</div>
            <div class="money">金额</div>
            <div class="balance">余额</div>
            <div class="time">时间</div>
        </div>
        <ul>
            <li v-for="(item,index) in arrays" :key="index" :style="{background:index%2==0?'#eee':'#fff'}">
                <div class="num">{{item.serialNumber}}</div>
                <div class="money">{{item.amount}}</div>
                <div class="balance">{{item.balance}}</div>
                <div class="time">{{item.createTime}}</div>
            </li>
        </ul>
        <img class="nonmals" v-if="!arrays.length" src="../assets/img/none.jpg" alt="">
    </div>

  </div>
</template>

<script>
import Lreq from '../js/lreq'
import share from '../js/share'
export default {
  name: 'mtTeam',
  data () {
    return {
        arrays:[]
    }
  },
  created(){
       Lreq("sellers/balances?start=0&length=1000",'get',"",(res,statuss)=>{
            var res = res.data.data
            console.log(res)
            // this.array = res
            res.forEach(val => {
                val.createTime = this.day(val.createTime)
            });
            this.arrays = res
        },this,(statuss)=>{})
         Lreq("/users",'get',"",(res,statuss)=>{
              window.localStorage.setItem("userId",res.data.data.id)
              share(this,res.data.data.id)
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

.t-header{
    height: 44px;
    line-height: 44px;
    color: #666;
    display: flex;
    font-size: 15px;
    text-align: center;
}
.num{
    width: 50px;
}
.money{
    width: 73px;
}
.balance{
    width: 84px;
}
.time{
    width: 148px;
}
ul li{
    height: 34px;
    line-height: 34px;
    display: flex;
    text-align: center;
}
.nonmals{
    width: 280px;
    height: 325px;
    display: block;
   margin: 0 auto;
}

</style>