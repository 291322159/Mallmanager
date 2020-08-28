import Vue from 'vue'
import Router from 'vue-router'


import Login from '@/views/login/Login'
import Home from '@/views/home/Home'

import Users from '@/views/home/users/Users.vue'


Vue.use(Router)

export default new Router({
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
			children: [
				{name: 'users', path: '/users', component: Users}
			]
		}
  ],
  mode: 'history'
})
