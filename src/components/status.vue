<template>
	<div class="body-container">
		<div class="order-detail flexBox">
			<div class="flex-1">
				<p class="txt">{{cardTxt}}</p>
				<p class="time">{{time}}</p>
			</div>
			<div class="price"><span>{{ price }}</span> 元</div>
		</div>

		<!--有卡-->
		<div class="card-num have-card flexBox" v-if="status == 0">
			<p class="flex-1">卡号后8位：{{cardID}}</p>
			<a class="status">未使用</a>
		</div>
		<div class="btns" v-if="status == 0">
			<router-link to="/haveCard">关联我的旅游卡</router-link>
			<div></div>
			<router-link class="done" to="/rules">查看境外上网设置办法</router-link>
		</div>

		<!--无卡-->
		<div class="card-num no-card flexBox" v-if="status == 1">
			<p class="flex-1">卡号后8位：{{cardID}}</p>
			<router-link class="status" to="/haveCard">未使用</router-link>
		</div>
		<div class="status-list" v-if="status == 1">
			<ul>
				<li class="clearfix">
					<span>当前状态</span>
					<p>支付成功，等待发货</p>
				</li>
				<li class="clearfix">
					<span>购买时间</span>
					<p>{{time}}</p>
				</li>
				<li class="clearfix">
					<span>订单号</span>
					<p>{{orderId}}</p>
				</li>
				<li class="clearfix">
					<span>取卡方式</span>
					<p>{{postWay}}</p>
				</li>
				<li class="clearfix">
					<span>快递单号</span>
					<p>{{postId}}</p>
				</li>
			</ul>
		</div>

		<div class="btns" v-if="status == 1">
			<router-link to="/">返回</router-link>
			<div></div>
			<router-link class="done" to="/quit">立即退订</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'status',
		data() {
			return {
				status: 1, //0 关联卡    1 快递
				orderId: '10000560275003096',
				cardID: '12345678',
				cardTxt: '香港单天定额流量卡x1张',
				time: '2018.05.05 18:21:56',
				price: 19.90,
				postWay: '顺风快递',
				postId: '7956456445556125'
			}
		},
		components: {},
		created() {
			var that = this
			that.$http.post("/travelSimGW/busiService", {
				data: {
					connSeqNo: that.$store.state.connSeqNo,
					partnerCode: that.$store.state.partnerCode,
					token: that.$store.state.token,
					tradeTime: new Date(),
					tradeType: "F011",
					tradeData:{
						iccid:that.$store.state.iccid
					}
				}
			}).then((res) => {

			})
		},
		mounted() {},
		methods: {

		}
	}
</script>

<style scoped>
	.order-detail {
		padding: 0.8rem 1.2rem 0;
		border-bottom: 1px solid #E4E4E4
	}
	
	.order-detail div .txt {
		font-size: 0.7rem;
		color: #3E3A39;
		line-height: 14px;
	}
	
	.order-detail div .time {
		font-size: 0.7rem;
		line-height: 30px;
		color: #9FA0A0;
	}
	
	.order-detail .price {
		font-size: 0.8rem;
		line-height: 30px;
	}
	
	.order-detail .price span {
		color: #F39800
	}
	
	.card-num {
		padding: 0 1.2rem;
		font-size: 0.7rem;
		color: #3E3A39;
		line-height: 40px;
	}
	
	.card-num a {
		color: #9FA0A0;
	}
	
	.no-card a {
		padding-right: 0.7rem;
		background: url(../assets/common/more.png)no-repeat center right;
		background-size: 6px 10px;
	}
	
	.btns {
		position: absolute;
		bottom: 15px;
		left: 0;
		right: 0;
		text-align: center;
	}
	
	.status-list {
		border-top: 1px solid #E4E4E4;
		padding: 10px 1.2rem;
	}
	
	.status-list ul li {
		font-size: 0.7rem;
		color: #9FA0A0;
		line-height: 30px;
	}
	
	.status-list ul li span {
		display: block;
		float: left;
	}
	
	.status-list ul li p {
		float: right;
	}
</style>