<template>
  <div class="wrapper" >
      <img :src="scan"  alt="">
    <van-button type="primary" size="large">长按保存图片</van-button>
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
        scan:"",
        size:340,
    }
  },
  created(){
        Lreq("/users",'get',"",(res,statuss)=>{
              window.localStorage.setItem("userId",res.data.data.id)
              share(this,res.data.data.id)
          },this,(statuss)=>{})
        Lreq("banners/"+this.$store.state.ids,'get',"",(res,statuss)=>{
              console.log(res)
              this.scan = res.data.data
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
        position: relative;
    }
    img{
        width: 100%;
        height: 571.5px;
        margin-bottom: 40px;
    }
    .qrious{
        position: absolute;
        top: 340px;
        left: 50%;
        transform: translateX(-50%);
    }
</style>