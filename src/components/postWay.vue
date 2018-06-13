<template>
	<div class="body-container">

		<div class="more-info flexBox" @click="haveCard">
			<p>旅游卡信息：</p>
			<div class="flex-1">{{ iccid ? iccid : '编辑' }}</div>
		</div>

		<div class="buy-box clearfix">
			<p>合计： <span>{{ finalPrice.toFixed(2) }}</span> 元</p>
			<span class="slide" :class="{'active': slideFlage}" @click="slideFunc"></span>
			<a @click="payFunc">下单</a>
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
				slideFlage: true,
				finalPrice: 0.00,
				finalNum: 0,
				day: 1,
				page: 1,
				mealCost: "",
				mealPrice: 0,
				iccid: '',
				popupTxt: '',
				alert: null
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

			that.iccid = that.$store.state.iccid
		},
		mounted() {
			var that = this
			//返回路由
			that.$store.state.routerBack.haveCard = "postWay"

			//初次进入页面  alert提示信息
			if(that.$store.state.alertCard) {
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
					console.log(res.data.data)
					var Num = res.data.data.tradeData.length
					if(Num) {
						if(Num > 1) {
							that.popupTxt = "检测到您有多张旅游卡，请绑定一张您需要充值的旅游卡"
							const component = that.$refs['myPopup']
							component.show()
							setTimeout(() => {
								component.hide()
							}, 1500)
						} else {
							that.iccid = res.data.data.tradeData[res.data.data.tradeData.length-1].iccid
							that.$store.state.iccid = res.data.data.tradeData[res.data.data.tradeData.length-1].iccid

							that.popupTxt = "检测到您已有一张旅游卡，请确认旅游卡ICCID"
							const component = that.$refs['myPopup']
							component.show()
							setTimeout(() => {
								component.hide()
							}, 1500)
						}
						//有卡，不再提示
						that.$store.state.alertCard = false
					} else {
						that.popupTxt = "请购买旅游卡后，再来选购荔枝卡套餐"
						const component = that.$refs['myPopup']
						component.show()
						setTimeout(() => {
							component.hide()
						}, 1500)
					}
				})
			}

			that.alert = that.$createDialog({
				type: 'confirm',
				content: '请您务必确认旅游卡ICCID后，再进行下单操作',
				confirmBtn: {
					text: '确认',
					active: false,
					disabled: false,
					href: 'javascript:;'
				},
				cancelBtn: {
					text: '取消',
					active: false,
					disabled: false,
					href: 'javascript:;'
				},
				onConfirm: () => {
					that.orderFunc()
				},
				onCancel: () => {}
			})
		},
		methods: {
			slideFunc() {
				if(this.slideFlage) {
					this.slideFlage = false
				} else {
					this.slideFlage = true
				}
			},
			haveCard() {
				this.$router.push("/haveCard")
			},
			payFunc() {
				var that = this

				if(that.iccid == "") {
					that.popupTxt = "您还未填写旅游卡ICCID，无法下单"
					const component = that.$refs['myPopup']
					component.show()
					setTimeout(() => {
						component.hide()
					}, 1000)
					return false
				}

				that.alert.show()
			},
			orderFunc() {
				var that = this
				const toast = that.$createToast({
					type: 'loading',
					time: 0,
					txt: 'Loading'
				})
				toast.show()
				//绑定接口
				that.$http.post("http://wx.lizhisim.com/weixin/userBound", {
					data: {
						connSeqNo: that.$store.state.connSeqNo,
						partnerCode: that.$store.state.partnerCode,
						token: that.$store.state.token,
						tradeData: {
							iccid: that.$store.state.iccid,
							openid: that.$store.state.openId,
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
							if(res.data.data.tradeRstCode == "1000") {
								toast.hide()
								//记录订单号
								that.$store.state.orderId = res.data.data.tradeData.orderId
								that.popupTxt = res.data.data.tradeRstMessage
								const component = that.$refs['myPopup']
								component.show()
								setTimeout(() => {
									component.hide()
									that.$router.push("/order")
								}, 1000)
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
			}
		}
	}
</script>

<style scoped>
	.common-title i {
		background: url(../assets/common/sendWay.png)no-repeat center;
		background-size: 16px 16px;
	}
	
	.more-info {
		padding: 20px 1.2rem;
		font-size: 0.8rem;
		line-height: 24px;
		text-align: right;
		border-bottom: 1px solid #D4D5D5;
	}
	
	.more-info p {
		color: #3E3A39;
	}
	
	.more-info div {
		padding-right: 1rem;
		color: #9FA0A0;
		background: url(../assets/common/more.png)no-repeat center right;
		background-size: 6px 10px;
	}
</style>