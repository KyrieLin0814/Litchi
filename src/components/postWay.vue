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
					<p><span>{{norPost}}</span>元</p>
				</li>
				<li @click="chooseWay(2)">
					<cube-checkbox v-model="checkedObj.type2" :option="option" :hollow-style="true" shape="circle" />
					<div class="post-txt"><span>顺风快递</span>（更快送达）</div>
					<p><span>{{SFPost}}</span>元</p>
				</li>
				<li @click="chooseWay(3)">
					<cube-checkbox v-model="checkedObj.type3" :option="option" :hollow-style="true" shape="circle" />
					<div class="have">已有卡片，直接充值到我的旅游卡</div>
				</li>
			</ul>
		</div>
		<div class="more-info" @click="setAddress">
			<p>收货地址</p>
			<div>{{ addressTxt ? addressTxt : '编辑' }}</div>
		</div>
		<div class="more-info" @click="haveCard">
			<p>已有旅游卡信息</p>
			<div>{{ cardID ? cardID : '编辑' }}</div>
		</div>

		<div class="buy-box clearfix">
			<p>合计： <span>{{ totalPrice }}</span> 元</p>
			<span class="slide" :class="{'active': slideFlage}" @click="slideFunc"></span>
			<a @click="payFunc">支付</a>
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
		name: 'name',
		data() {
			return {
				option: {
					label: '',
					value: ''
				},
				checkedObj: {
					type1: true
				},
				norPost: 0,
				SFPost: 15,
				slideFlage: true,
				totalPrice: 9.9,
				mealCost: '2.9元 x 1天 x 1张',
				mealPrice: 2.9,
				cardCost: '17元 x 1天 x 1张',
				cardPrice: 17,
			}
		},
		props: {
			addressTxt: {
				type: String,
				default: ''
			},
			cardID: {
				type: String,
				default: ''
			}
		},
		created() {

		},
		mounted() {},
		methods: {
			slideFunc() {
				if(this.slideFlage) {
					this.slideFlage = false
				} else {
					this.slideFlage = true
				}
			},
			payFunc() {
				this.payResult()
			},
			chooseWay(id) {
				this.checkedObj = {}
				this.checkedObj['type' + id] = true
			},
			setAddress() {
				if(!this.checkedObj.type3) {
					//this.$router.push("/adress")
				}
				this.$router.push("/adress")
			},
			haveCard() {
				if(this.checkedObj.type3) {
					//this.$router.push("/haveCard")
				}
				this.$router.push("/haveCard")
			},
			payResult() {
				var that = this
				that.$http.post("/travelSimGW/busiService", {
					data: {
						connSeqNo: that.$store.state.connSeqNo,
						partnerCode: that.$store.state.partnerCode,
						token: that.$store.state.token,
						tradeTime: new Date(),
						tradeType: "F010",
						tradeData: {
							orderId: "123456",
							payType: "0",
							payRst: "0",
							payAmount: "20"
						}
					}
				}).then((res) => {

				})
				that.$router.push("/order")
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