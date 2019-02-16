import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


export default new Vuex.Store({
    state:{
      ids:3,
      referrerId:"",
      // loding:true
    },
    mutations:{
      changereferrerId:(state,ids) => { //改变推荐人id
        state.referrerId = ids
      },
      changeId:(state,id)=>{
        state.ids = id
      }
    }
  })