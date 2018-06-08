<template>
	<div class="body-container">
		<div class="common-title">
			<i></i>
			<span>充值到已有旅游卡</span>
		</div>

		<a class="save" @click="scanFunc">扫描卡片背面</a>

		<div class="content">
			<input type="text" v-model="cardID" placeholder="(输入文本框)">
			<span>或您手动输入旅游卡背面的ICCID编号</span>
		</div>

		<div class="buy-box clearfix">
			<a @click="confirm">确定</a>
			<a @click="cancel">取消</a>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'haveCard',
		data() {
			return {
				cardID: ''
			}
		},
		components: {},
		created() {
			this.cardID = this.$store.state.cardID
		},
		mounted() {},
		methods: {
			scanFunc() {

			},
			confirm() {
				this.$store.state.cardID = this.cardID
				this.$router.push({
					name: "postWay",
				})
			},
			cancel() {
				this.$router.push("/postWay")
			}
		}
	}
</script>

<style scoped>
	.save {
		display: block;
		text-align: center;
		font-size: 0.7rem;
		color: #fff;
		border-radius: 5px;
		width: 60%;
		margin: 60px auto 0;
		line-height: 32px;
		background-color: #F39800;
	}
	
	.content {
		margin-top: 40px;
		padding: 0 2.5rem;
	}
	
	.content input {
		display: block;
		width: calc(100% - 22px);
		font-size: 0.7rem;
		line-height: 28px;
		padding: 0 0.5rem;
		border: 1px solid #C9CACA;
		color: #3E3A39;
	}
	
	.content span {
		display: block;
		color: #C9CACA;
		font-size: 0.6rem;
		line-height: 24px;
	}
</style>