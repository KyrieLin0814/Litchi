import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
	openId: "", //微信用户在商城的唯一标识 
	connSeqNo: "Flymo201608300000000001", //双方交互流水号，按照合作伙伴作为客户端时的流水号生成规则进行生成  
	partnerCode: "P000002", //旅游卡业务接入网关提供给合作伙伴的编码
	token: "yv8JXeTTfqyedLcU2LAqHUTKtYA4G1kz", //由旅游卡业务接入网关提供给合作伙伴的认证 Token 
	iccid: "", //旅游卡ICCID ,当无卡用户购买时首次为空
	mealsData: [],
	routerData: {},
	langType:'cn',
	tabFlag: '',
	wayFlag:'',
	firstFlag:true,
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
		cityVal: ''
	},
	expressType: 1,
	orderId:"",
	routerBack:{}
}
export default new Vuex.Store({
	state
});