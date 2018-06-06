<template>
	<div class="body-container">
		<div class="common-title">
			<i></i>
			<span>购买SIM卡</span>
		</div>

		<div class="num-box">
			<p>荔枝卡 x 1 境外套餐 x 1</p>
			<div>
				<a class="del" @click="delFunc">-</a>
				<a class="number">{{ num }}</a>
				<a class="add" @click="addFunc">+</a>
			</div>
		</div>
		<div class="agree pay-box">
			<cube-checkbox v-model="checked" shape="square">
				<p class="agreeTxt">同意<span>《用户授权协议》</span>和<span>《荔枝卡境外通信服务协议》</span></p>
			</cube-checkbox>
		</div>

		<div class="buy-box clearfix">
			<p>合计： <span>{{ totalPrice }}</span> 元</p>
			<span class="slide" :class="{'active': slideFlage}" @click="slideFunc"></span>
			<a @click="nextFunc">下一步</a>
		</div>

		<transition name="fade" mode="out-in">
			<div class="cost-box" :class="{'active': slideFlage}">
				<p>费用详情</p>
				<div class="flexBox">
					<div>套餐费 ({{ mealCost }})</div>
					<div class="flex-1"></div>
					<div class="price"><span>{{ mealPrice }}</span>元</div>
				</div>
				<div class="flexBox">
					<div>卡费 ({{ cardCost }})</div>
					<div class="flex-1"></div>
					<div class="price"><span>{{ cardPrice }}</span>元</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		name: 'payPage',
		data() {
			return {
				num: 1,
				perPrice: 9.9,
				totalPrice: 9.9,
				checked: false,
				slideFlage: true,
				mealCost: '2.9元 x 1天 x 1张',
				mealPrice: 2.9,
				cardCost: '17元 x 1天 x 1张',
				cardPrice: 17
			}
		},
		watch: {
			num: function() {
				this.totalPrice = (this.perPrice * this.num).toFixed(2)
			}
		},
		created() {

		},
		mounted() {},
		methods: {
			addFunc() {
				this.num++
			},
			delFunc() {
				if(this.num > 1) {
					this.num--
				}
			},
			slideFunc() {
				if(this.slideFlage) {
					this.slideFlage = false
				} else {
					this.slideFlage = true
				}
			},
			nextFunc() {
				var that = this
				that.$http.post("/travelSimGW/busiService", {
					data: {
						connSeqNo: that.$store.state.connSeqNo,
						partnerCode: that.$store.state.partnerCode,
						token: that.$store.state.token,
						tradeTime: new Date(),
						tradeType: "F002",
						tradeData: {
							iccid: that.$store.state.iccid,
							orderList:[
								{orderPeriod:"7"},
								{packageCode:"P0001"}
							]
						}
					}
				}).then((res) => {

				})
				this.$router.push("/postWay")
			}
		}
	}
</script>

<style scoped>
	.body-container {
		background: #f5f5f5;
	}
	
	.common-title i {
		background: url(../assets/common/shoppingcar.png)no-repeat center;
		background-size: 16px 16px;
	}
	
	.num-box {
		padding: 15px 1.2rem;
		height: 30px;
		border-top: 1px solid #D4D5D5;
		background: #fff;
		font-size: 0;
	}
	
	.num-box p {
		float: left;
		font-size: 0.7rem;
		color: #3E3A39;
		line-height: 30px;
	}
	
	.num-box>div {
		float: right;
	}
	
	.num-box>div>a {
		display: inline-block;
		vertical-align: middle;
		font-size: 0.7rem;
		border: 1px solid #D4D5D5;
		line-height: 24px;
		height: 24px;
	}
	
	.num-box>div>a.number {
		padding: 2px 16px;
		border-left: none;
		border-right: none;
	}
	
	.num-box>div>a.add,
	.num-box>div>a.del {
		padding: 2px 10px;
		font-size: 0.8rem;
	}
	
	.num-box>div>a.del {
		padding: 2px 12px;
	}
	
	.agree .agreeTxt {
		font-size: 0.6rem;
		color: #9FA0A0;
	}
	
	.agree .agreeTxt span {
		color: #F39800
	}
</style>