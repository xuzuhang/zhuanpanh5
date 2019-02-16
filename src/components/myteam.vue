<template>
  <div class="wrapper">
      <div class="header">
          <div class="tab">
              <div class="tab-item  tab-item1" @click="tab(1)" :class="indexs==1?'on':''">直属粉丝({{len1}})</div>
              <div class="tab-item tab-item2" @click="tab(2)" :class="indexs==2?'on':''">推荐粉丝({{len2}})</div>
          </div>
      </div>

    <div class="center">
        <div class="t-header">
            <div class="num">序号</div>
            <div class="names">昵称</div>
        </div>
        <ul>
            <li v-for="(item,index) in arrays" :key="index" :style="{background:index%2==0?'#eee':'#fff'}">
                <div class="num">{{index+1}}</div>
                <div class="names">
                    <img :src="item.avatarUrl" alt="">
                    <span>{{item.nickName}}</span>
                </div>
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
        len2:0
    }
  },
   created(){
        Lreq("/users",'get',"",(res,statuss)=>{
              window.localStorage.setItem("userId",res.data.data.id)
              share(this,res.data.data.id)
          },this,(statuss)=>{})
          Lreq("sellers/teams/1",'get',"",(res,statuss)=>{
              this.arrays = res.data.data
              this.len1 = res.data.data.length
          },this,(statuss)=>{})
          Lreq("sellers/teams/2",'get',"",(res,statuss)=>{
             this.len2 = res.data.data.length
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
}
.t-header .names{
    text-indent: 3em;
}
ul li{
    height: 40px;
    line-height: 40px;
    display: flex;
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