<template>
	<div class="body-container">
		<div class="banner">
			<img src="../assets/common/banner.png" />
		</div>
		<div class="help-title">
			<p>帮助中心</p>
			<input type="text" placeholder="您遇到了什么问题？" v-model="helpTxt">
		</div>
		<ul class="help-list clearfix">
			<li class="icon-1">
				<router-link to="/helpPage">
					<span>账户管理</span>
				</router-link>
			</li>
			<li class="icon-2">
				<router-link to="/helpPage">
					<span>基础操作</span>
				</router-link>
			</li>
			<li class="icon-3">
				<router-link to="/helpPage">
					<span>产品展示</span>
				</router-link>
			</li>
			<li class="icon-4">
				<router-link to="/helpPage">
					<span>资费说明</span>
				</router-link>
			</li>
			<li class="icon-5">
				<router-link to="/helpPage">
					<span>商务合作</span>
				</router-link>
			</li>
			<li class="icon-6">
				<router-link to="/helpPage">
					<span>支付安全</span>
				</router-link>
			</li>
		</ul>

		<div class="common-trouble">
			<ul>
				<li>
					<p><span>常见问题</span></p>
					<ul>
						<li>1.荔枝卡怎么激活？</li>
						<li>2.荔枝卡能在什么地区使用？</li>
					</ul>
				</li>
			</ul>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'help',
		data() {
			return {
				helpTxt: ''
			}
		},
		components: {},
		created() {

		},
		mounted() {},
		methods: {

		}
	}
</script>

<style scoped>
	.banner {
		position: relative;
	}
	
	.banner img {
		width: 100%;
	}
	
	.help-title {
		text-align: center;
	}
	
	.help-title p {
		font-size: 0.8rem;
		color: #F39800;
		line-height: 30px;
	}
	
	.help-title input {
		display: inline-block;
		font-size: 0.7rem;
		width: 72%;
		padding: 0 10px 0 36px;
		border: 1px solid #F39800;
		line-height: 26px;
		height: 26px;
		border-radius: 15px;
		outline: none;
		color: #3E3A39;
		background: url(../assets/common/search.png)no-repeat;
		background-size:16px 17px;
		background-position: 10px center;
	}
	
	.help-list {
		padding: 36px 0.8rem;
	}
	
	.help-list li {
		width: 33.333%;
		float: left;
		text-align: center;
	}
	
	.help-list li a {
		display: block;
		padding-top: 40px;
		padding-bottom: 24px;
	}
	
	.help-list li.icon-1 a {
		background: url(../assets/common/icon1.png) no-repeat center 8px;
		background-size: 32px 23px;
	}
	
	.help-list li.icon-2 a {
		background: url(../assets/common/icon2.png) no-repeat center 6px;
		background-size: 21px 28px;
	}
	
	.help-list li.icon-3 a {
		background: url(../assets/common/icon3.png) no-repeat center 8px;
		background-size: 32px 23px;
	}
	
	.help-list li.icon-4 a {
		background: url(../assets/common/icon4.png) no-repeat center 5px;
		background-size: 30px 30px;
	}
	
	.help-list li.icon-5 a {
		background: url(../assets/common/icon5.png) no-repeat center 9px;
		background-size: 33px 19px;
	}
	
	.help-list li.icon-6 a {
		background: url(../assets/common/icon6.png) no-repeat center 4px;
		background-size: 21px 32px;
	}
	
	.help-list li a span {
		display: block;
		font-size: 0.7rem;
		color: #F39800;
	}
	
	.common-trouble {
		padding: 0 1.2rem;
	}
	
	.common-trouble>ul p {
		font-size: 0;
		border-bottom: 1px solid #F39800;
	}
	
	.common-trouble ul p span {
		font-size: 0.7rem;
		padding: 2px 2.5rem 0 0.5rem;
		background-color: #F39800;
		color: #fff;
	}
	
	.common-trouble ul ul {
		padding: 5px 0 8px 0;
	}
	
	.common-trouble ul ul li {
		position: relative;
		font-size: 0.6rem;
		padding: 0 5px;
		border-bottom: 1.5px solid #E4E4E4;
		color: #9FA0A0;
		line-height: 30px;
	}
	
	.common-trouble ul ul li:last-child {
		border: none;
	}
</style>