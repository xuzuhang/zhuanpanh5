<template>
  <div class="wrapper" :style="{minHeight:allHight}">
      <img class="header" src="../assets/my/list.jpg" alt="">
        <ul>
            <li v-for="(item,index) in arrays" :key="index">
                <img src="../assets/my/taskicon.png" alt="">
                <div class="Invitation" >
                    <div class="title" :class="item>size?'on':''">邀请{{item}}位好友</div>
                    <div>你将获得</div>
                </div>
                <div class="state" :class="item>size?'on':''">
                    {{item>size?'未完成':'已完成'}}
                </div>
            </li>

           
        </ul>
        

  </div>
</template>

<script>
import Lreq from '../js/lreq'
import share from '../js/share'
export default {
  name: 'mtTeam',
  data () {
    return {
        allHight:"",
        arrays:[5,10,15,20,25,30,35,40,45,50,55,60],
        size:0
    }
  },
  created(){
       Lreq("/users",'get',"",(res,statuss)=>{
              window.localStorage.setItem("userId",res.data.data.id)
              share(this,res.data.data.id)
        },this,(statuss)=>{})
       Lreq("sellers",'get',"",(res,statuss)=>{
             this.size = res.data.data.teamSize
        },this,(statuss)=>{})
    this.allHight = document.documentElement.clientHeight+"px"
  },
  methods:{
     
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper{
  background: #eeeeee;
}
.header{
    width: 100%;
    height: 154px;
    display: block;
    margin-bottom: 12px;
}
li{
    width: 350px;
    height: 67px;
    background: #fff;
    border: 1px solid #ccc;
    margin: 0 auto 8px;
    border-radius:11px; 
    display: flex;
}
li img{
    width: 51px;
    height: 45.5px;
    margin: 10.75px 11px 0 13px;
}
.Invitation{
    color: #ccc;
    font-size: 11.5px;
    width: 185.5px;
}
.Invitation .title{
    font-size: 18px;
    margin: 15px 0 9px;
    color: #666666;
}
.Invitation .title.on{
    color: #ff6666;
}
li .state{
    width: 66px;
    height: 27px;
    border-radius:27px;
    border: 1px solid #999;
    line-height: 27px; 
    text-align: center;
    color: #999999;
    font-size: 12px;
    margin-top: 20px;
}
li .state.on{
    border: 1px solid #ff6666;
    color: #ff6666;
}
</style>