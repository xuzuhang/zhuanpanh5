<template>
  <div class="wrapper">
      <div class="header">
          <div class="tab">
              <div class="tab-item  tab-item1" @click="tab(1)" :class="indexs==1?'on':''">未使用礼券</div>
              <div class="tab-item tab-item2" @click="tab(2)" :class="indexs==2?'on':''">已使用礼券</div>
              <div class="tab-item tab-item3" @click="tab(3)" :class="indexs==3?'on':''">已作废礼券</div>
          </div>
      </div>
    <div class="center">
        <ul class="Citem notUsed" v-if="indexs==1">
            <li v-for="(item,index) in showarray" :key="index" @click="todetails(item.id)" >
                <div class="title">{{item.title}}</div>
                <p class="num">礼券编号：{{item.id}}</p>
                <p>获得时间：{{item.createTime}}</p>
            </li>
        </ul>
        <ul class="Citem Used" v-else-if="indexs==2">
            <li v-for="(item,index) in showarray" :key="index"  >
                <div class="title">{{item.title}}</div>
                <p class="num">礼券编号：{{item.id}}</p>
                <p>获得时间：{{item.createTime}}</p>
            </li>
        </ul>
        <ul class="Citem Tovoid" v-else-if="indexs==3">
            <!-- <li>
                <div class="title">好点撒杜拉拉</div>
                <p class="num">礼券编号：1541202151515</p>
                <p>有效期至：2018/11/5 12：25：30</p>
            </li> -->
        </ul>
        <img class="nonmals" v-if="!showarray.length" src="../assets/img/none.jpg" alt="">
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
        indexs:1,
        showarray:[]
    }
  },
  created(){
        Lreq("/users",'get',"",(res,statuss)=>{
              window.localStorage.setItem("userId",res.data.data.id)
              share(this,res.data.data.id)
          },this,(statuss)=>{})
        Lreq("bonuses/"+this.$store.state.ids+"/coupons?status=1",'get',"",(res,statuss)=>{
            var res = res.data.data
            res.forEach(val => {
                val.createTime = this.day(val.createTime)
            });
            this.showarray = res
          },this,(statuss)=>{})
        
  },
  methods:{
     tab(e){
          this.indexs=e
          if(e==1){
              Lreq("bonuses/"+this.$store.state.ids+"/coupons?status=1",'get',"",(res,statuss)=>{
            var res = res.data.data
            res.forEach(val => {
                val.createTime = this.day(val.createTime)
            });
            this.showarray = res
          },this,(statuss)=>{})
          }else if(e==2){
              Lreq("bonuses/"+this.$store.state.ids+"/coupons?status=3",'get',"",(res,statuss)=>{
            var res = res.data.data
            res.forEach(val => {
                val.createTime = this.day(val.createTime)
            });
            this.showarray = res
          },this,(statuss)=>{})
          }else{
              this.showarray = []
          }
      },
      todetails(e){
          this.$router.push({path: '/couponsDetails?id='+e})
      },
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
.header{
    width: 100%;
    height: 54px;
    background: #f5f5f5;
    overflow: hidden;
}
.tab{
    width: 350px;
    height: 34px;
    line-height: 34px;
    position: relative;
    border: 0.5px solid #e7e7e7;
    margin: 9.5px auto;
}
.tab .tab-item{
    position: absolute;
    width: 118px;
    color: #333333;
    font-size: 15px;
    top: 0;
    text-align: center;
    background: #fff;
    border-radius:5px; 
    z-index: 0;
}
.tab .tab-item1{
    left:0;
}
.tab .tab-item2{
    left:116px;
}
.tab .tab-item3{
    right:0;
}
.tab .tab-item.on{
    background:linear-gradient(to right,#ff383d,#ff383d,#ff1450);
    color: #fff;
    z-index: 10;
}
.Citem li{
    width: 347px;
    height: 71px;
    background-repeat:no-repeat;
    background-size:100% 100%;
    margin: 12px auto 0;  
    overflow: hidden;
}
.notUsed li{
    background-image: url(../assets/coup/coup1.png);
}
.Used li{
    background-image: url(../assets/coup/coup2.png);
}
.Tovoid li{
    background-image: url(../assets/coup/coup3.png);
}
 li .title{
    margin: 12px 0 0 12px;
    font-size: 15px;
    color: #666;
}
 li p{
    font-size: 10px;
    color: #999;
    margin-left: 12.5px;
}
 li .num{
    margin: 10px 0 3px 12.5px;
}
.nonmals{
    width: 280px;
    height: 325px;
    display: block;
   margin: 0 auto;
}
</style>