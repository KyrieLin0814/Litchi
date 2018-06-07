<template>
	<div class="body-container">
		<div class="common-title">
			<i></i>
			<span>确认订单</span>
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
			<p>需支付： <span>{{ price }}</span> 元</p>
			<a @click="pay">支付</a>
			<router-link to="/detail">返回</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'order',
		data() {
			return {
				ICCID: '166332523211',
				img: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1527415413&di=55737d7218d13d20479b651b73e41719&src=http://img.taopic.com/uploads/allimg/140628/235110-14062PJ11541.jpg",
				areaTxt: '新加坡',
				detailTxt: '新加坡五日固定套餐,新加坡五日固定套餐',
				price: 9.9
			}
		},
		components: {},
		created() {

		},
		mounted() {},
		methods: {
			pay() {
				this.$router.push('/postWay')
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
	}
	
	.img-content>div.text span {
		padding: 5px 15px 0;
		display: inline-block;
		line-height: 18px;
		font-size: 0.6rem;
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