<template>
	<div class="body-container">
		<div class="common-title">
			<i></i>
			<span>充值到已有旅游卡</span>
		</div>

		<a class="save" @click="scanQRCode">扫描卡片背面</a>

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
				cardID: this.$store.state.cardID
			}
		},
		components: {},
		created() {
			this.$http.get("http://wx.lizhisim.com/weixin/weixinsao").then((res) => {
				console.log(res.data)
				wx.config({
					debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。  
					appId: res.data.appId, // 必填，公众号的唯一标识  
					timestamp: res.data.timestamp, // 必填，生成签名的时间戳  
					nonceStr: res.data.nonceStr, // 必填，生成签名的随机串  
					signature: res.data.signature, // 必填，签名，见附录1  
					jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2  
				})

				wx.error(function(res) {
					alert("出错了：" + res.errMsg);
				});
			})
		},
		mounted() {},
		methods: {
			scanQRCode() {
				wx.scanQRCode({
					needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，  
					scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有  
					success: function(res) {
						var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果  
						// code 在这里面写上扫描二维码之后需要做的内容 
					}
				})
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