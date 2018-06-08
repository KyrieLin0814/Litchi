<template>
	<div class="body-container">
		<ul class="list-content">
			<li @click="routerFunc()">
				<div class="order-list flexBox">
					<div class="flex-1">
						<p class="txt">{{cardTxt}}</p>
						<p class="time">{{time}}</p>
					</div>
					<div class="price"><span>{{ price }}</span> 元</div>
				</div>

				<!--有卡-->
				<div class="card-num have-card flexBox">
					<p class="flex-1">卡号后8位：{{cardID}}</p>
					<a class="status">未使用</a>
				</div>
			</li>
		</ul>

		<div class="btns">
			<router-link to="/haveCard">关联我的旅游卡</router-link>
			<div></div>
			<router-link class="done" to="/rules">查看境外上网设置办法</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'orderList',
		data() {
			return {
				result:[]
			}
		},
		created() {
			var that = this
			that.$http.post("/travelSimGW/busiService", {
				data: {
					connSeqNo: that.$store.state.connSeqNo,
					partnerCode: that.$store.state.partnerCode,
					token: that.$store.state.token,
					tradeData: {
						iccid: that.$store.state.iccid
					},
					tradeTime: new Date(),
					tradeType: "F011"
				}
			}).then((res) => {
				console.log(res)
			})
		},
		mounted() {},
		methods: {
			routerFunc(){
				this.$router.push("/status")
			}
		}
	}
</script>

<style scoped>
	.list-content li{
		border-bottom:1px solid #eaeaea;
		margin-bottom:5px;
		box-shadow: 0px 3px 10px  rgba(0,0,0,0.1);
	}
	.order-list {
		padding: 0.8rem 1.2rem 0;
		border-bottom: 1px solid #E4E4E4
	}
	
	.order-list div .txt {
		font-size: 0.7rem;
		color: #3E3A39;
		line-height: 14px;
	}
	
	.order-list div .time {
		font-size: 0.7rem;
		line-height: 30px;
		color: #9FA0A0;
	}
	
	.order-list .price {
		font-size: 0.8rem;
		line-height: 30px;
		padding-right:1rem;
		background:url(../assets/common/more.png)no-repeat right 8px;
		background-size:8px 14px;
	}
	
	.order-list .price span {
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