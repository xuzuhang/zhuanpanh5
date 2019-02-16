<template>
  <div class="wrapper">
      <div class="header">
          <div class="tab">
              <div class="tab-item  tab-item1" @click="tab(1)" :class="indexs==1?'on':''">直属粉丝({{len1}})</div>
              <div class="tab-item tab-item2" @click="tab(2)" :class="indexs==2?'on':''">推荐粉丝({{len2}})</div>
          </div>
      </div>
    <div class="ranking">
        <div class="rank-item">
            <img src="../assets/img/gold1.png" alt="">
            <p v-if="recommendarrays[0]">{{recommendarrays[0].nickName}}</p>
            <div v-if="recommendarrays[0]">{{recommendarrays[0].contribution}}元</div>
        </div>
        <div class="rank-item">
            <img src="../assets/img/gold2.png" alt="">
            <p  v-if="recommendarrays[1]">{{recommendarrays[1].nickName}}</p>
            <div  v-if="recommendarrays[1]">{{recommendarrays[0].contribution}}元</div>
        </div>
        <div class="rank-item">
            <img src="../assets/img/gold3.png" alt="">
            <p  v-if="recommendarrays[2]">{{recommendarrays[2].nickName}}</p>
            <div  v-if="recommendarrays[2]">{{recommendarrays[0].contribution}}元</div>
        </div>
    </div>
    <div class="center">
        <div class="t-header">
            <div class="num">序号</div>
            <div class="names">昵称</div>
            <div class="money">佣金</div>
        </div>
        <ul>
            <li v-for="(item,index) in arrays" :key="index" :style="{background:index%2==0?'#eee':'#fff'}">
                <div class="num">{{item.id}}</div>
                <div class="names">
                    <img :src="item.avatarUrl" alt="">
                    <span>{{item.nickName}}</span>
                </div>
                <div class="money">{{item.contribution}}</div>
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
        indexs:1,
        arrays:[],
        len1:0,
        len2:0,
        recommendarrays:[]
    }
  },
   created(){
            Lreq("/users",'get',"",(res,statuss)=>{
              window.localStorage.setItem("userId",res.data.data.id)
              share(this,res.data.data.id)
          },this,(statuss)=>{})
           Lreq("sellers/teams/1",'get',"",(res,statuss)=>{
              this.arrays = res.data.data
              console.log(this.arrays)
              this.len1 = res.data.data.length
          },this,(statuss)=>{})
          Lreq("sellers/teams/2",'get',"",(res,statuss)=>{
             this.len2 = res.data.data.length
          },this,(statuss)=>{})
          Lreq("sellers/contributors?count=3",'get',"",(res,statuss)=>{
             this.recommendarrays = res.data.data
          },this,(statuss)=>{})
  },
  methods:{
      tab(e){
          this.indexs=e
           Lreq("sellers/teams/"+this.indexs,'get',"",(res,statuss)=>{
              this.arrays = res.data.data
          },this,(statuss)=>{})
      }
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
    width: 354px;
    height: 34px;
    line-height: 34px;
    position: relative;
    border: 0.5px solid #e7e7e7;
    margin: 9.5px auto;
}
.tab .tab-item{
    position: absolute;
    width: 178px;
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
    right:0;
}
.tab .tab-item.on{
    background:linear-gradient(to right,#ff383d,#ff383d,#ff1450);
    color: #fff;
    z-index: 10;
}
.ranking{
    height: 118.5px;
    display: flex;
    justify-content: space-around;
}
.ranking .rank-item{
    width: 83px;
    text-align: center;
}
.ranking .rank-item img{
    display: block;
    margin: 18px auto 0;
    width: 56.5px;
    height: 42.5px;
}
.ranking .rank-item p{
    margin: 2px 0 0;
    color: #ff973b;
    font-size: 12px;
    height: 30px;
    line-height: 30px;
}
.ranking .rank-item div{
    width: 78px;
    height: 18px;
    line-height: 18px;
    background: #ff973b;
    color: #fff;
    margin: 0 auto;
    border-radius:9px; 
}
.t-header{
    height: 44px;
    line-height: 44px;
    color: #666;
    display: flex;
    font-size: 15px;
}
.num{
    width: 138.5px;
    text-align: center;
    margin-right: 10px;
}
.t-header .names{
    text-indent: 3em;
    width: 170.5px;
}
ul li{
    height: 40px;
    line-height: 40px;
    display: flex;
}
ul li .names{
     width: 170.5px;
}
ul li .names img{
    width: 30px;
    height: 30px;
    border:2px solid #f3c5b6;
    border-radius:50%;  
    vertical-align: middle;
    margin-right: 10px;
    margin-bottom: 2px;
}
.nonmals{
    width: 280px;
    height: 325px;
    display: block;
   margin: 0 auto;
}
</style>