import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
	openId: "oQrFc1hRYF_CEetyWksplGS8rKC8",
	connSeqNo: "Flymo201608300000000001",
	partnerCode: "P000002",
	token: "mkytrewsghjlngrkloinhgtresmklijy",
	iccid: "89234185686475549864",
	mealsData: [],
	routerData: {},
	tabFlag: '',
	finalMeal: {},
	perPrice: 0,
	finalPrice: 0,
	finalNum: 0
}
export default new Vuex.Store({
	state
});