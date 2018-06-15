<template>
	<div class="body-container">

		<div class="more-info flexBox" @click="haveCard">
			<p>旅游卡信息：</p>
			<div class="flex-1">{{ iccid ? iccid : '编辑' }}</div>
		</div>

		<div class="buy-box clearfix">
			<p>合计： <span>{{ finalPrice.toFixed(2) }}</span> 元</p>
			<span class="slide" :class="{'active': slideFlage}" @click="slideFunc"></span>
			<a @click="payFunc">支付</a>
			<router-link to="/order">返回</router-link>
		</div>

		<transition name="fade" mode="out-in">
			<div class="cost-box" :class="{'active': slideFlage}">
				<p>费用详情</p>
				<ul>
					<li v-for="i in shopCarData">
						<div class="flexBox">
							<div>套餐费 ({{ i.text }})</div>
							<div class="flex-1"></div>
							<div class="price"><span>{{ i.finalPrice.toFixed(2) }}</span>元</div>
						</div>
					</li>
				</ul>

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
				shopCarData: [],
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

			that.shopCarData = JSON.parse(JSON.stringify(that.$store.state.shopCar))
			//console.log(that.shopCarData)
			that.shopCarData.map(function(val, idx) {
				var day;
				if(val.meal.obj.maxDays == val.meal.obj.minDays) {
					day = Number(val.meal.obj.maxDays) * val.finalNum
				} else {
					day = val.finalNum
				}

				val.text = val.perPrice + "元 x " + day + "天 x " + "1张"
			})

			//console.log(that.shopCarData)

			that.iccid = that.$store.state.iccid
			that.finalPrice = that.$store.state.totalPrice
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
							that.iccid = res.data.data.tradeData[res.data.data.tradeData.length - 1].iccid
							that.$store.state.iccid = res.data.data.tradeData[res.data.data.tradeData.length - 1].iccid

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
				content: '请您务必确认旅游卡ICCID后，再进行支付',
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
							iccid: that.$store.state.iccid.toString(),
							openid: that.$store.state.openId,
						},
						tradeTime: new Date(),
						tradeType: "F013",
					}
				}).then((res) => {
					console.log(res)
					if(res.data.data.tradeRstCode == "1000") {
						//整理订单请求参数
						var orderList = []
						that.shopCarData.map(function(val, idx) {
							orderList[idx] = {
								channelOrderID: (new Date().getTime() + Math.floor(Math.random()*9999)).toString(),
								orderPeriod: val.finalNum.toString(),
								packageCode: val.meal.obj.packageCode
							}
						})
						//console.log(orderList)

						//订单接口
						that.$http.post("http://wx.lizhisim.com/SimGW/travelSimGW/busiService", {
							data: {
								connSeqNo: that.$store.state.connSeqNo,
								partnerCode: that.$store.state.partnerCode,
								token: that.$store.state.token,
								tradeData: {
									//iccid: that.$store.state.iccid.toString(),
									iccid: "89234185686475549864",
									orderList: orderList
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
									//调微信支付
									that.wxPay()
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
						}).catch((err) => {

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
			},
			wxPay() {
				//wx pay
				var that = this
				var params = encodeURI(encodeURI(document.location.href))
				var url = "http://wx.lizhisim.com/weixin/weixinpay?orderId=" + that.$store.state.orderId + "&openId=:" + that.$store.state.openId + "&amount=" + that.finalPrice.toString() + "&reqUrl=" + params
				that.$http.get(url).then((res) => {
					var appIdVal = res.data.appId;　　　　　　
					var timeStampVal = res.data.timeStamp;
					var nonceStrVal = res.data.nonceStr;　　　　　　
					var packageVal = res.data.package;　　　　　　
					var signTypeVal = res.data.signType;　　　　　　
					var paySignVal = res.data.paySign;　　
					onBridgeReady();　　　　　　
					function onBridgeReady() {　　　　　　　　
						WeixinJSBridge.invoke('getBrandWCPayRequest', {　　　　　　　　　　
							appId: appIdVal, //公众号名称，由商户传入 
							　　　　　　　　timeStamp: timeStampVal, //时间戳，自1970年以来的秒数 
							　　　　　　　　nonceStr: nonceStrVal, //随机串 
							　　　　　　　　package: packageVal, //订单详情扩展字符串
							　　　　　　　　signType: signTypeVal, //微信签名方式： 
							　　　　　　　　paySign: paySignVal //微信签名 
						}, function(res) {
							if(res.err_msg == "get_brand_wcpay_request:ok") { // 表示已经支付,res.err_msg将在用户支付成功后返回 ok。 
								that.payResult()　　　　
							} else {

							}　　　　
						});　　　　
					}　
					if(typeof WeixinJSBridge == "undefined") {　　　　　　　　
						if(document.addEventListener) {　　　　　　　　　　
							document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);　　　　　　　　
						} else if(document.attachEvent) {　　　　　　　　　　
							document.attachEvent('WeixinJSBridgeReady', onBridgeReady);　　　　　　　　　　
							document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);　　　　　　　　
						}　　　　
					} else {　　　　　　
						onBridgeReady();　　　　
					}
				})
			},
			payResult() {
				//支付结果通知
				var that = this
				that.$http.post("/travelSimGW/busiService", {
					data: {
						connSeqNo: that.$store.state.connSeqNo,
						partnerCode: that.$store.state.partnerCode,
						token: that.$store.state.token,
						tradeData: {
							orderId: that.$store.state.orderId,
							payAmount: that.finalPrice.toString(),
							payRst: "1", //0成功  1 失败
							payType: "0", //微信支付
						},
						tradeTime: new Date(),
						tradeType: "F010",
					}
				}).then((res) => {
					console.log(res)
					if(res.data.data.tradeRstCode == "1000") {
						that.$router.push("/paySuccess")
					} else {
						that.$router.push("/payError")
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