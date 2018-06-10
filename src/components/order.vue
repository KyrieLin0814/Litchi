<template>
	<div class="body-container">
		<div class="common-title">
			<i></i>
			<span>支付</span>
		</div>
		<div class="detail">商品详情</div>
		<div class="detail">SIM卡 ICCID：{{ ICCID }}</div>
		<div class="img-content clearfix">
			<div class="img" :style="{backgroundImage: 'url(' + img + ')', backgroundSize: '100% auto', backgroundPosition:'center'}">
				<p>{{ areaTxt }}</p>
			</div>
			<div class="text">
				<span>{{ detailTxt }}</span>
			</div>
		</div>

		<div class="buy-box clearfix">
			<p>需支付： <span>{{ price.toFixed(2) }}</span> 元</p>
			<a @click="pay">支付</a>
			<router-link to="/postWay">返回</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'order',
		data() {
			return {
				ICCID: this.$store.state.iccid,
				img: this.$store.state.finalMeal.obj.pictureDetails,
				areaTxt: this.$store.state.routerData.countryName,
				detailTxt: this.$store.state.finalMeal.obj.packageName,
				price: this.$store.state.finalPrice
			}
		},
		methods: {
			pay() {
				//wx pay
				var that = this
				var url = "http://wx.lizhisim.com/weixin/weixinpay?orderId=" + that.$store.state.orderId + "&openId=:" + that.$store.state.openId + "&amount=" + that.price.toString()
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
						},function(res) {
							alert(res.err_msg)　　　　　　　
							if(res.err_msg == "get_brand_wcpay_request:ok") {// 表示已经支付,res.err_msg将在用户支付成功后返回 ok。 
								that.$router.push("/paySuccess")　　　　　　　
							}else{
								that.$router.push("/payError")　　　
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
				//this.paySuccess()
			},
			paySuccess() {
				//支付结果通知
				var that = this
				that.$http.post("/travelSimGW/busiService", {
					data: {
						connSeqNo: that.$store.state.connSeqNo,
						partnerCode: that.$store.state.partnerCode,
						token: that.$store.state.token,
						tradeData: {
							orderId: that.$store.state.orderId,
							payAmount: that.price.toString(),
							payRst: "1", //0成功  1 失败
							payType: "0", //微信支付
						},
						tradeTime: new Date(),
						tradeType: "F010",
					}
				}).then((res) => {
					console.log(res)
				})
			}
		}
	}
</script>

<style scoped>
	.common-title i {
		background: url(../assets/common/shoppingcar.png)no-repeat center;
		background-size: 16px 16px;
	}
	
	.detail {
		height: 24px;
		padding-left: 32px;
		line-height: 24px;
		font-size: .7rem;
		border-bottom: 20px solid #E4E4E4;
	}
	
	.img-content {
		border-bottom: 1px solid #E4E4E4;
	}
	
	.img-content>div {
		float: left;
		overflow: hidden;
		height: 90px;
	}
	
	.img-content>div.img {
		width: 40%;
	}
	
	.img-content>div.img p {
		text-align: center;
		color: #fff;
		font-size: 1.2rem;
		line-height: 100px;
	}
	
	.img-content>div.text {
		width: 60%;
	}
	
	.img-content>div.text {
		text-align: center;
		line-height: 100px;
		font-size: 0;
		vertical-align: middle;
	}
	
	.img-content>div.text span {
		display: inline-block;
		line-height: 18px;
		font-size: 0.7rem;
		text-align: left;
	}
	
	.buy-box {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 40px;
		padding: 12px 1.2rem 0;
		background-color: #FFFFFF;
		z-index: 999;
	}
	
	.buy-box p {
		float: left;
		color: #3E3A39;
		font-size: 0.7rem;
	}
	
	.buy-box p span {
		color: #F39800;
		font-size: 1.1rem;
	}
	
	.buy-box a {
		float: right;
		margin-left: 10px;
		padding: 8px 18px;
		font-size: 0.7rem;
		height: 16px;
		line-height: 16px;
		color: #fff;
		background-color: #F39800;
		border-radius: 3px;
	}
</style>