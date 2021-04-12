import Vue from 'vue'
import Router from 'vue-router'


import Login from '@/views/login/Login'
import Home from '@/views/home/Home'

import Users from '@/views/home/users/Users'
import Rights from '@/views/home/rights/Rights'
import Role from '@/views/home/rights/Role'
import GoodsList from '@/views/home/goods/GoodsList'
import GoodsAdd from '@/views/home/goods/GoodsAdd'
import Params from '@/views/home/goods/Params'
import Categories from '@/views/home/goods/Categories'
import Orders from '@/views/home/orders/Orders'
import Reports from '@/views/home/reports/Reports'
import Screen from '@/views/home/screen/Screen'


Vue.use(Router)

 const router = new Router({
  routes: [
		{
		  path: '/login',
		  name: 'login',
		  component: Login,
		},
		{
			path: '/',
			name: 'home',
			component: Home,
			redirect: '/users',
			children: [
				{name: 'users', path: '/users', component: Users},
				{name: 'rights', path: '/rights', component: Rights},
				{name: 'role', path: '/role', component: Role},
				{name: 'goodsList', path: '/goodsList', component: GoodsList},
				{name: 'params', path: '/params', component: Params},
				{name: 'categories', path: '/categories', component: Categories},
				{name: 'goodsadd', path: '/goods/goodsadd', component: GoodsAdd},
				{name: 'orders', path: 'orders', component: Orders},
				{name: 'reports', path: '/reports', component: Reports},
				// {name: 'screen', path: '/screen', component: Screen},
			]
		},
		{
			name: 'screen', 
			path: '/screen', 
			component: Screen
		},

  ],
  mode: 'history'
})
// 导航守卫
router.beforeEach((to, from, next) => {
  // 如果要去的是登录 -> next()
  if(to.path === '/login') {
    next()
  }else {
    // 如果要去的不是登录,判断token - 如果token没有 -> login
    const token = localStorage.getItem('token')
    if(!token) {
      router.push({name: 'login'})
      return
    }
    // - 如果有 -> next()
    next()
  }

})
export default router
