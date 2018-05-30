import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/store'

import index from '@/components/index'
import detail from '@/components/detail'
import order from '@/components/order'
import payPage from '@/components/payPage'
import postWay from '@/components/postWay'
import adress from '@/components/adress'
import haveCard from '@/components/haveCard'

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
			props: true
		},
		{
			path: '/order',
			name: 'order',
			component: order,
			props: true
		},
		{
			path: '/payPage',
			name: 'payPage',
			component: payPage,
			props: true
		},
		{
			path: '/postWay',
			name: 'postWay',
			component: postWay,
			props: true
		},
		{
			path: '/adress',
			name: 'adress',
			component: adress,
			props: true
		},
		{
			path: '/haveCard',
			name: 'haveCard',
			component: haveCard,
			props: true
		}
	]
})

router.beforeEach((to, from, next) => {
	
	if(from.path=="/detail"){
		window.removeEventListener("scroll",store.state.listenerDom, false);
	}
	
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