import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import My from '@/components/my'
import myTeam from '@/components/myteam'
import Commission from '@/components/commission'
import Withdrawals from '@/components/withdrawals'
import Rule from '@/components/rule'
import Certificate from '@/components/certificate'
import CouponsDetails from '@/components/couponsDetails'
import Tasklist from '@/components/tasklist'
import HairPoster from '@/components/hairPoster'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        title: "活动"
        },
      meta: { keepAlive: false }
    },
    {
      path: '/my',
      name: 'My',
      component: My,
      meta: {
        title: "我的"
        },
      meta: { keepAlive: false }
    },
    {
      path: '/myteam',
      name: 'myTeam',
      component: myTeam,
      meta: {
        title: "我的团队"
        },
        meta: { keepAlive: false }
    },
    {
      path: '/commission',
      name: 'Commission',
      component: Commission,
      meta: {
        title: "佣金明细"
        },
        meta: { keepAlive: false }
    },
    {
      path: '/withdrawals',
      name: 'Withdrawals',
      component: Withdrawals,
      meta: {
        title: "提现记录"
        },
        meta: { keepAlive: false }
    },
    {
      path: '/rule',
      name: 'Rule',
      component:Rule,
      meta: {
        title: "我要赚钱"
        },
        meta: { keepAlive: false }
    },
    {
      path: '/certificate',
      name: 'Certificate',
      component:Certificate,
      meta: {
        title: "我的礼券"
        },
        meta: { keepAlive: false }
    },
    {
      path: '/couponsDetails',
      name: 'CouponsDetails',
      component:CouponsDetails,
      meta: {
        title: "礼券详情"
        },
        meta: { keepAlive: false }
    },
    {
      path: '/tasklist',
      name: 'Tasklist',
      component:Tasklist,
      meta: {
        title: "任务列表"
        },
        meta: { keepAlive: false }
    },
    {
      path: '/hairPoster',
      name: 'HairPoster',
      component:HairPoster,
      meta: {
        title: "发圈海报"
        },
        meta: { keepAlive: false }
    },
  ]
})
