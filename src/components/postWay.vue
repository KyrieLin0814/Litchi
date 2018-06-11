<template>
	<div class="body-container">
		<div class="common-title">
			<i></i>
			<span>选择荔枝卡收货方式</span>
		</div>

		<div class="choose-way car-list">
			<ul>
				<li @click="chooseWay(1)">
					<cube-checkbox v-model="checkedObj.type1" :option="option" :hollow-style="true" shape="circle" />
					<div class="post-txt"><span>普通快递</span>（免费）</div>
					<p><span>{{norPost.toFixed(2)}}</span>元</p>
				</li>
				<li @click="chooseWay(2)">
					<cube-checkbox v-model="checkedObj.type2" :option="option" :hollow-style="true" shape="circle" />
					<div class="post-txt"><span>顺风快递</span>（更快送达）</div>
					<p><span>{{SFPost.toFixed(2)}}</span>元</p>
				</li>
				<li @click="chooseWay(3)">
					<cube-checkbox v-model="checkedObj.type3" :option="option" :hollow-style="true" shape="circle" />
					<div class="have">已有卡片，直接充值到我的旅游卡</div>
				</li>
			</ul>
		</div>
		<div class="more-info" @click="setAddress">
			<p>收货地址</p>
			<div>{{ addressGet ? addressGet : '编辑' }}</div>
		</div>
		<div class="more-info" @click="haveCard">
			<p>已有旅游卡信息</p>
			<div>{{ iccid ? iccid : '编辑' }}</div>
		</div>

		<div class="buy-box clearfix">
			<p>合计： <span>{{ finalPrice.toFixed(2) }}</span> 元</p>
			<span class="slide" :class="{'active': slideFlage}" @click="slideFunc"></span>
			<a @click="payFunc">支付</a>
			<router-link to="/payPage">返回</router-link>
		</div>

		<transition name="fade" mode="out-in">
			<div class="cost-box" :class="{'active': slideFlage}">
				<p>费用详情</p>
				<div class="flexBox">
					<div>套餐费 ({{ mealCost }})</div>
					<div class="flex-1"></div>
					<div class="price"><span>{{ mealPrice.toFixed(2) }}</span>元</div>
				</div>
				<div class="flexBox" v-if="expressType == 2">
					<div>快递费 </div>
					<div class="flex-1"></div>
					<div class="price"><span>{{ SFPost.toFixed(2) }}</span>元</div>
				</div>
			</div>
		</transition>

		<cube-popup type="my-popup" :mask="false" ref="myPopup">{{ popupTxt }}</cube-popup>
	</div>
</template>

<script>
	export default {
		name: 'name',
		data() {
			return {
				option: {
					label: '',
					value: ''
				},
				popupTxt: '',
				checkedObj: {
					expressType: 1,
					type1: true
				},
				slideFlage: true,
				expressType: 0,
				norPost: 0,
				SFPost: 15,
				finalPrice: 0.00,
				finalNum: 0,
				day: 1,
				page: 1,
				mealCost: "",
				mealPrice: 0,
				address: {},
				addressGet: '',
				iccid: ''
			}
		},
		created() {
			var that = this
			that.judgeData = that.$store.state.finalMeal
			that.perPrice = that.$store.state.perPrice
			that.finalPrice = that.$store.state.finalPrice
			that.finalNum = that.$store.state.finalNum
			if(that.judgeData.obj.maxDays == that.judgeData.obj.minDays) {
				that.day = Number(that.judgeData.obj.maxDays) * Number(that.finalNum)
			} else {
				that.day = that.finalNum
			}

			that.mealCost = that.perPrice + "元 x " + that.day + "天 x " + that.page + "张"
			that.mealPrice = that.perPrice * that.finalNum

			that.address = that.$store.state.address
			that.iccid = that.$store.state.iccid
			that.addressGet = that.address.province + that.address.city + that.address.area + that.address.addressTxt
			
			//查询iccid
			that.$http.post("http://wx.lizhisim.com/weixin/getIccId", {
				data: {
					connSeqNo: that.$store.state.connSeqNo,
					partnerCode: that.$store.state.partnerCode,
					token: that.$store.state.token,
					tradeData: {
						openid: that.$store.state.openId
					},
					tradeTime: new Date(),
					tradeType: "F012",
				}
			}).then((res) => {
				console.log(res.data.data.tradeData[1].iccid)
				that.iccid = res.data.data.tradeData[1].iccid
				that.$store.state.iccid = res.data.data.tradeData[1].iccid
			})
		},
		mounted(){
			var that = this
			//返回路由
			that.$store.state.routerBack.haveCard = "postWay"
			
			//默认选中
			if(that.$store.state.wayFlag){
				that.checkedObj = {}
				that.checkedObj['type' + that.$store.state.wayFlag] = true
			}
		},
		methods: {
			slideFunc() {
				if(this.slideFlage) {
					this.slideFlage = false
				} else {
					this.slideFlage = true
				}
			},
			chooseWay(id) {
				this.checkedObj = {}
				this.checkedObj['type' + id] = true
				this.$store.state.expressType = id
				this.expressType = id
				this.$store.state.wayFlag = id
				
				if(id == 2) {
					this.finalPrice = this.mealPrice + this.SFPost
					this.$store.state.finalPrice = this.finalPrice
				} else {
					this.finalPrice = this.mealPrice
					this.$store.state.finalPrice = this.finalPrice
				}
			},
			setAddress() {
				if(!this.checkedObj.type3) {
					this.$router.push("/adress")
				} else {
					this.popupTxt = "若选择快递方式，请填写快递信息"
					const component = this.$refs['myPopup']
					component.show()
					setTimeout(() => {
						component.hide()
					}, 1000)
				}
			},
			haveCard() {
				if(this.checkedObj.type3) {
					this.$router.push("/haveCard")
				}else{
					this.popupTxt = "若选择您已有旅游卡，请填写旅游卡信息"
					const component = this.$refs['myPopup']
					component.show()
					setTimeout(() => {
						component.hide()
					}, 1000)
				}
			},
			payFunc() {
				var that = this
				const toast = that.$createToast({
					type: 'loading',
					time: 0,
					txt: 'Loading'
				})
				toast.show()
				var expressPrice = 0
				if(that.expressType == 1) {
					expressPrice = that.norPost
				} else {
					expressPrice = that.SFPost
				}
				//绑定接口
				that.$http.post("http://wx.lizhisim.com/weixin/userBound", {
					data: {
						connSeqNo: that.$store.state.connSeqNo,
						partnerCode: that.$store.state.partnerCode,
						token: that.$store.state.token,
						tradeData: {
							expressPrice: expressPrice.toString(),
							expressType: that.$store.state.expressType.toString(),
							iccid: that.$store.state.iccid,
							openid: that.$store.state.openId,
							receiveAddress: encodeURI(encodeURI(that.addressGet)),
							receivePhoneNumber: that.$store.state.address.phone,
							receiveUserName: encodeURI(encodeURI(that.$store.state.address.name)),
						},
						tradeTime: new Date(),
						tradeType: "F013",
					}
				}).then((res) => {
					console.log(res)
					if(res.data.data.tradeRstCode == "1000") {
						//订单接口
						that.$http.post("/travelSimGW/busiService", {
							data: {
								connSeqNo: that.$store.state.connSeqNo,
								partnerCode: that.$store.state.partnerCode,
								token: that.$store.state.token,
								tradeData: {
									iccid: that.$store.state.iccid,
									orderList: {
										channelOrderID: '',
										orderPeriod: that.finalNum.toString(),
										packageCode: that.$store.state.finalMeal.obj.packageCode,
									}
								},
								tradeTime: new Date(),
								tradeType: "F002",
							}
						}).then((res) => {
							toast.hide()
							console.log(res)
							//that.$store.state.orderId = res.data.data.tradeData.orderId

							that.$router.push("/order")
						})
					} else {
						toast.hide()
						that.popupTxt = res.data.data.tradeRstMessage
						const component = that.$refs['myPopup']
						component.show()
						setTimeout(() => {
							component.hide()
						}, 1000)
					}
				})

				//this.payResult()
			},
			payResult() {
				var that = this

			}
		}
	}
</script>

<style scoped>
	.common-title i {
		background: url(../assets/common/sendWay.png)no-repeat center;
		background-size: 16px 16px;
	}
	
	.choose-way ul li {
		position: relative;
		padding: 14px 1.2rem;
		border-bottom: 1px solid #D4D5D5;
		font-size: 0;
	}
	
	.choose-way ul li .cube-checkbox {
		display: inline-block;
		position: inherit;
		margin-top: -1px;
	}
	
	.choose-way ul li div,
	.choose-way ul li p {
		display: inline-block;
		font-size: 0.7rem;
		line-height: 16px;
		height: 16px;
		vertical-align: middle;
	}
	
	.choose-way ul li span {
		display: inline-block;
		color: #F39800;
		line-height: 16px;
		height: 16px;
	}
	
	.post-txt {
		color: #C9CACA;
		vertical-align: middle;
		margin-left: 5px;
	}
	
	.choose-way ul li p {
		float: right;
	}
	
	.choose-way ul li p span {
		padding-right: 5px;
	}
	
	.have {
		color: #3E3A39;
		margin-left: 5px;
	}
	
	.more-info {
		padding: 10px 1.2rem;
		font-size: 0.7rem;
		text-align: right;
		border-bottom: 1px solid #D4D5D5;
	}
	
	.more-info p {
		color: #3E3A39;
	}
	
	.more-info div {
		padding-right: 1rem;
		color: #9FA0A0;
		margin-top: 10px;
		background: url(../assets/common/more.png)no-repeat center right;
		background-size: 6px 10px;
	}
</style>