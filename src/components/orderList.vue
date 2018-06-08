<template>
	<div class="body-container">
		<ul class="list-content">
			<li v-for="i in result">
				<a  @click="routerFunc(i)">
					<div class="order-list flexBox">
						<div class="flex-1">
							<p class="txt">{{i.packageName}}</p>
							<p class="time" v-if="i.orderStartDate">{{i.orderStartDate}}</p>
						</div>
						<div class="price"><span>{{ price }}</span> 元</div>
					</div>

					<!--有卡-->
					<div class="card-num have-card flexBox">
						<p class="flex-1">卡号：{{ i.channelOrderID }}</p>
						<a class="status">{{i.statusTxt}}</a>
					</div>
				</a>
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
				time: "2018.6.8 12:12:11",
				price: "19.9",
				result: []
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
				that.result = res.data.data.tradeData
				that.result.map(function(val, idx){
					if(val.orderStatus == "0"){
						res.data.data.tradeData[idx].statusTxt = "未支付"
					}
					if(val.orderStatus == "1"){
						res.data.data.tradeData[idx].statusTxt = "未启用"
					}
					if(val.orderStatus == "2"){
						res.data.data.tradeData[idx].statusTxt = "已开始使用"
					}
					if(val.orderStatus == "3"){
						res.data.data.tradeData[idx].statusTxt = "已结束"
					}
					if(val.orderStatus == "4"){
						res.data.data.tradeData[idx].statusTxt = "已取消"
					}
				})
			})
		},
		mounted() {},
		methods: {
			routerFunc(i) {
				this.$router.push({
					name: "status",
					params: {
						obj: i
					}
				})
			},
			substring(str) {
				var str_after = str.substring(str.length - 7, str.length)
				return str_after
			}
		}
	}
</script>

<style scoped>
	.list-content li {
		border-bottom: 1px solid #eaeaea;
		margin-bottom: 5px;
		box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
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
		padding-right: 1rem;
		background: url(../assets/common/more.png)no-repeat right 8px;
		background-size: 8px 14px;
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
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 15px;
		text-align: center;
		background: #fff;
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