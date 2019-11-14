import Vue from 'vue'
import Router from 'vue-router'
import hello from '@/views/products/hello'

// import user from '@/views/products/user'
import Default from '../components/user/default.vue'
// 默认页面
import userlist from '../components/user/userlist.vue'
// 角色列表
import Role from '../components/user/Role.vue'
// 权限列表
import Permission from '../components/user/Permission.vue'
// 商品列表
import commodities from '../components/user/commodities.vue'
// 分类参数
import parameter from '../components/user/parameter.vue'
// 商品分类
import classification from '../components/user/classification.vue'
// 订单列表
import Orderlist from '../components/user/Orderlist.vue'
// 数据报表
import Datareport from '../components/user/Datareport.vue'

import commodities1 from '../components/user/commodities1.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   component: hello,
    //   directives: {
    //     Default
    //   }
    // },
    {
      path: '/',
      component: hello,
      directives: {
        Default
      },
      children: [
        // {
        //   path: 'user',
        //   component: user,
        // },
        {
          path: '',
          component: Default
        },
        {
          path: 'users',
          component: userlist
        },
        {
          path: 'roles',
          component: Role
        },
        {
          path: 'rights',
          component: Permission
        },
        {
          path: 'goods',
          component: commodities,
        },
        {
          path: 'params',
          component: parameter
        },
        {
          path: 'categories',
          component: classification
        },
        {
          path: 'orders',
          component: Orderlist
        },
        {
          path: 'reports',
          component: Datareport
        },
        {
          path: 'go',
          component: commodities1
        }

      ]
    }
  ]
})
