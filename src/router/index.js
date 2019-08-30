import Vue from 'vue'
import Router from 'vue-router'
// 
Vue.use(Router)

import UserContent from '@/components/user/userAdmin/UserContent'
import UserLeft from '@/components/user/userAdmin/UserLeft'
//
import Index from '@/components/index/Index'

import Main from '@/components/index/index/Main'
import Service from '@/components/index/index/Service'
//
import MyPay from '@/components/user/userAdmin/userMenu/MyPay'
import BankCard from '@/components/user/userAdmin/userMenu/BankCard'
import EdTransform from '@/components/user/userAdmin/userMenu/EdTransform'
import GameRecords from '@/components/user/userAdmin/userMenu/GameRecords'
import MoneyDealings from '@/components/user/userAdmin/userMenu/MoneyDealings'
import ReturnHome from '@/components/user/userAdmin/userMenu/ReturnHome'
import SubordAdmin from '@/components/user/userAdmin/userMenu/SubordAdmin'
import TeamOverview from '@/components/user/userAdmin/userMenu/TeamOverview'
import WebNotice from '@/components/user/userAdmin/userMenu/WebNotice'
import Mydiscount from '@/components/user/userAdmin/userMenu/Mydiscount'
// 
import Cashsweep from '@/components/user/userAdmin/userMenu/Cashsweep'
import Cashwithdrawal from '@/components/user/userAdmin/userMenu/Cashwithdrawal'
import Recharge from '@/components/user/userAdmin/userMenu/Recharge'

//会员中心
import SelfUser from '@/components/user/userAdmin/userMenu/selfUser/SelfUser'
//下级会员注册
import SubordMems from '@/components/user/userAdmin/userMenu/subordMembs/SubordMems'
export default new Router({
  routes: [
    {
      path: '/main',
      name: "main",
      components: {
        indexView: Main
      }
    },
 
    {
      path: '/service',
      name: "service",
      components: {
        indexView: Service
      }
    },
    {
      path: '/userContent',
      name: 'userContent',
      components: {
        abc: UserContent
      },
      // redirect:"/myPay",
      children: [
        {
          path: "/myPay",
          name: "myPay",
          components: {
            abc: MyPay
          },
        },
        {
          path: "/bankCard",
          name: "bankCard",
          components: {
            abc: BankCard
          },

        },
        {
          path: "/edTransform",
          name: "edTransform",
          components: {
            abc: EdTransform
          }
        },
        {
          path: "/gameRecords",
          name: "gameRecords",
          components: {
            abc: GameRecords
          },

        },
        {
          path: "/moneyDealings",
          name: "moneyDealings",
          components: {
            abc: MoneyDealings
          },

        },
        {
          path: "/returnHome",
          name: "returnHome",
          components: {
            abc: ReturnHome
          },

        },
        {
          path: "/subordAdmin",
          name: "subordAdmin",
          components: {
            abc: SubordAdmin
          },

        },
        {
          path: "/teamOverview",
          name: "teamOverview",
          components: {
            abc: TeamOverview
          },

        },
        {
          path: "/webNotice",
          name: "webNotice",
          components: {
            abc: WebNotice
          },

        },
        {
          path: "/mydiscount",
          name: "mydiscount",
          components: {
            abc: Mydiscount
          },

        },
        {
          path: "/recharge",
          name: "recharge",
          components: {
            abc: Recharge
          },   

        },
        {
          path: "/cashwithdrawal",
          name: "cashwithdrawal",
          components: {
            abc: Cashwithdrawal
          },

        },
        {
          path: "/cashsweep",
          name: "cashsweep",
          components: {
            abc: Cashsweep
          },

        },
        {
          path: "/selfUser",
          name: "selfUser",
          components: {
            abc: SelfUser
          },

        },
        {
          path: "/subordMems",
          name: "subordMems",
          components: {
            abc: SubordMems
          }
        },
      ],
      redirect:"/myPay"
    },
    {
      path: "/userLeft",
      name: "userLeft",
      component: UserLeft
    }
  ],

})
