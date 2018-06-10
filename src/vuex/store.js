import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
	openId: "oQrFc1hRYF_CEetyWksplGS8rKC8", //微信用户在商城的唯一标识 
	connSeqNo: "Flymo201608300000000001", //双方交互流水号，按照合作伙伴作为客户端时的流水号生成规则进行生成  
	partnerCode: "P000002", //旅游卡业务接入网关提供给合作伙伴的编码
	token: "mkytrewsghjlngrkloinhgtresmklijy", //由旅游卡业务接入网关提供给合作伙伴的认证 Token 
	iccid: "89234185686475549864", //旅游卡ICCID ,当无卡用户购买时首次为空
	mealsData: [],
	routerData: {},
	tabFlag: '',
	agreeFlag: false,
	finalMeal: {},
	perPrice: 0,
	finalNum: 0,
	finalPrice: 0,
	address: {
		name: '',
		phone: '',
		province: '',
		city: '',
		area: '',
		addressTxt: '',
		defaultIndex: [0, 0, 0],
		provinceVal: '',
		cityVal: '',
	},
	cardID: '',
	expressType: 1,
	orderId:"11111",
	routerBack:{}
}
export default new Vuex.Store({
	state
});