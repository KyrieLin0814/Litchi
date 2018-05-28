import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/store'

import index from '@/components/index'
import detail from '@/components/detail'

Vue.use(Router)

//export default new Router({
const router = new Router({
	routes: [{
			path: '/',
			name: 'index',
			component: index
		},
		{
			path: '/detail',
			name: 'detail',
			component: detail,
			props:true
		}
	]
})

router.beforeEach((to, from, next) => {
	next();
	//	if(localStorage.getItem("tokenStorage")) {
	//		store.state.token = localStorage.getItem("tokenStorage")
	//		store.state.role = localStorage.getItem("role")
	//		store.state.userId = localStorage.getItem("userId")
	//
	//		if(from.path == '/' && to.path == '/login') {
	//			return false
	//		} else {
	//			next();
	//		}
	//	} else {
	//		if(to.path == '/login' || to.path == '/registerNew' || to.path == '/registerStaff') { //如果是登录页面路径，就直接next()
	//			next();
	//		} else { //不然就跳转到登录
	//			next('/login');
	//		}
	//	}

});

export default router