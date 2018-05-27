import axios from 'axios'
import Qs from 'qs'
import store from '@/vuex/store'
import router from '@/router/'

//axios配置全局参数
const baseURL = 'http://47.104.137.169:8080' // 配置请求路径的baseURL
//const baseURL = 'http://localhost:35320'

const Axios = axios.create({
	transformRequest: [function(data) {
		data = Qs.stringify(data);
		return data;
	}],
	baseURL: baseURL,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
})
// http request 拦截器
Axios.interceptors.request.use(
	config => {
		if(store.state.token) {
			config.headers.Authorization = store.state.token;
		}
		return config;
	},
	err => {
		return Promise.reject(err);
	});

// http response 拦截器
Axios.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		//  	console.log(error.response)
		//      if (error.response.status == 403) {
		//			store.state.token=''
		//			store.state.role = ''
		//			store.state.userId = ''
		//			localStorage.removeItem("tokenStorage")
		//			localStorage.removeItem("role")
		//			localStorage.removeItem("userId")
		//			router.replace({
		//              path: 'login'
		//          })
		//      }
		return response;
	});
export default Axios