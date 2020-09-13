// 插件模块

import axios from 'axios'

const MyHttpServer = {}


MyHttpServer.install = Vue => {

	axios.defaults.baseURL = 'http://www.ysqorz.top:8888/api/private/v1/'
	// axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'

	axios.interceptors.request.use(function (config) {
		// 在请求发起之前 设置头部
		// 需要授权的 API ,必须在请求头中使用 Authorization 字段提供 token 令牌
		if (config.url !== 'login') {
			const AUTH_TOKEN = localStorage.getItem('token')
			config.headers['Authorization'] = AUTH_TOKEN
		}

		return config
	}, function (error) {
		return Promise.reject(error)
	})

	axios.interceptors.response.use(function (response) {
		return response
	}, function (error) {
		return Promise.reject(error)
	})



  //  添加实例方法
  Vue.prototype.$http = axios
}


export default MyHttpServer
