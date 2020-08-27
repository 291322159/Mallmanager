import Vue from 'vue'
import Router from 'vue-router'


import Login from '@/views/login/Login'
import Home from '@/views/home/Home'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
		{
		  path: '/login',
		  name: 'login',
		  component: Login,
		},
		{
			path: '/home',
			name: 'home',
			component: Home
		}
  ],
  mode: 'history'
})
