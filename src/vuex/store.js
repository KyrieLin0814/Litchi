import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
	routerData:{},
	listenerDom:null,
	tabFlag:'choose'
}
export default new Vuex.Store({
	state
});