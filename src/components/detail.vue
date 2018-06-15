<template>
	<div class="body-container">
		<div class="fullpage-container">
			<div class="fullpage-wp" v-fullpage="opts">
				<div class="page-1 page">
					<div class="banner" :style="{backgroundImage: 'url(' + obj.pictureDetails + ')', backgroundSize: '100% auto', backgroundPosition:'center'}">
						<p class="text-1">{{obj.packageDesc}}</p>
					</div>
					<div class="common-title">
						<i></i>
						<span>{{$t('message.chooseMeal')}}</span>
					</div>
					<div class="car-content">
						<div class="car-tab flexBox">
							<div class="flex-1" @click="tabFunc(selfMeal[0])" :class="{'active': (tabFlag=='choose')}" v-if="selfMeal.length"><span>{{selfMeal[0].title}}</span></div>
							<div class="flex-1" @click="tabFunc(i)" :class="{'active': (tabFlag==i.obj.packageCode)}" v-for="i in mealsList"><span>{{i.title}}</span></div>
						</div>
						<div class="car-list" :style="{height: contentHeight + 'px'}">

							<!--选项卡切换  暂不开启-->
							<ul class="list-1" :class="{'active': (tabFlag=='choose')}" v-if="selfMeal.length">
								<li @click="chooseFunc('id1')" :class="{'active': (chooseFlag=='id1')}">
									<cube-checkbox v-model="checkedObj.checkedid1" :option="option" :hollow-style="true" shape="circle" />
									<p class="title">{{selfMeal[0].obj.packageName}}</p>
									<p class="title">{{selfMeal[0].obj.packageDesc}}</p>
									<!--<p>
										100M 4G高速流量</br>
										+流量用完自动关闭网络</br>
										+新用户含套餐卡仅9.9元/张
										<span class="sale">限时免费</span>
									</p>
									<div class="price-box">
										<div class="now">
											2.9<span>元/天</span>
										</div>
										<div class="old">
											<span>15元</span>
										</div>
									</div>-->
								</li>
							</ul>

							<!--套餐包-->
							<ul class="list-2" :class="{'active': (tabFlag==i.obj.packageCode)}" v-for="i in mealsList">
								<li>
									<p>
										<span class="title">{{i.obj.packageName}}</span>
										<!--<span class="txt">当地3G/4G网络，不限流量，超出300MB/天，限速128kbps</span>-->
									</p>
								</li>
								<li>
									<p>
										<span class="title">{{i.obj.packageDesc}}</span>
									</p>
								</li>
							</ul>

						</div>
						<div class="scroll-btn">
							<div>
								<i></i><span>{{$t('message.pullup')}}</span>
							</div>

							<div class="num-box">
								<p>{{$t('message.days')}}</p>
								<div>
									<a class="del" @click="delFunc">-</a>
									<a class="number">{{ finalNum }}</a>
									<a class="add" @click="addFunc">+</a>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="page-2 page">
					<div class="list-scroll-content">
						<div class="list-scroll">
							<div class="detail-list">
								<ul>
									<li>
										<p><span>{{$t('message.detailsMeal')}}</span></p>

										<!--自选包-->
										<ul v-if="selfMeal.length" :class="{'active': (tabFlag=='choose')}">
											<li v-if="selfMeal[0].obj.packageTextDesc">{{selfMeal[0].obj.packageTextDesc}}</li>
											<li v-if="selfMeal[0].obj.packageImgDesc">
												<img :src="selfMeal[0].obj.packageImgDesc">
											</li>
										</ul>

										<!--套餐包-->
										<ul v-for="i in mealsList" :class="{'active': (tabFlag==i.obj.packageCode)}">
											<li v-if="i.obj.packageTextDesc">{{i.obj.packageTextDesc}}</li>
											<li v-if="i.obj.packageImgDesc">
												<img :src="i.obj.packageImgDesc">
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="buy-box clearfix">
			<p>{{$t('message.total')}}: <span>{{ price.toFixed(2) }}</span> {{$t('message.yuan')}}</p>
			<a @click="addCar">{{$t('message.addCart')}}</a>
			<router-link to="/">{{$t('message.back')}}</router-link>
		</div>

		<cube-popup type="my-popup" :mask="false" ref="myPopup">{{popupTxt}}</cube-popup>
	</div>
</template>

<script>
	export default {
		name: 'detail',
		data() {
			return {
				opts: {
					start: 0,
					dir: 'v',
					duration: 500,
					der: 0.05
				},
				obj: {},
				selfMeal: [],
				mealsList: [],
				judgeData: {},
				contentHeight: 0,
				tabFlag: this.$store.state.tabFlag,
				option: {
					label: '',
					value: ''
				},
				checkedObj: {
					checkedid1: true
				},
				price: 0.00,
				finalNum: 1,
				chooseFlag: 'id1',
				scrollDown: true,
				scrollUp: true,
				popupTxt: ''
			}
		},
		watch: {
			finalNum(a, b) {
				this.price = Number(this.judgeData.obj.price ? this.judgeData.obj.price : this.judgeData.obj.strategy_desc) * Number(this.finalNum)
			}
		},
		created() {
			var that = this
			that.obj = that.$store.state.routerData
			that.$http.post("http://wx.lizhisim.com/weixin/detailsPackages", {
				data: {
					connSeqNo: that.$store.state.connSeqNo,
					partnerCode: that.$store.state.partnerCode,
					token: that.$store.state.token,
					tradeData: {
						mcc: that.$store.state.routerData.mcc
					},
					tradeTime: new Date(),
					tradeType: "F014"
				}
			}).then((res) => {
				console.log(res)
				var result = res.data.data
				for(var i = 0; i < result.tradeData.length; i++) {
					if(result.tradeData[i].maxDays == result.tradeData[i].minDays) {
						that.mealsList.push({
							title: result.tradeData[i].maxDays + "天包",
							name: result.tradeData[i].packageName,
							obj: JSON.parse(JSON.stringify(result.tradeData[i]))
						})
					} else {
						that.selfMeal.push({
							title: "自选天数包",
							name: result.tradeData[i].packageName,
							obj: JSON.parse(JSON.stringify(result.tradeData[i]))
						})
					}
				}

				that.mealsList.sort(that.compare('maxDays'))

				if(that.selfMeal.length) {
					that.tabFunc(that.selfMeal[0])
				} else {
					that.tabFunc(that.mealsList[0])
				}
				//console.log(that.mealsList)
				//console.log(that.selfMeal)
			})
		},
		mounted() {
			var that = this
			that.contentHeight = document.documentElement.clientHeight - 254

			var startX, startY, moveEndX, moveEndY, X, Y;

			var overscroll = function(el) {
				el.addEventListener('touchstart', function(e) {
					startY = e.touches[0].pageY;
					startX = e.touches[0].pageX;
					//var top = el.scrollTop,
					//totalScroll = el.scrollHeight,
					//currentScroll = top + el.offsetHeight;
					//if(top === 0) {
					//	el.scrollTop = 1;
					//} else if(currentScroll === totalScroll) {
					//	el.scrollTop = top - 1;
					//}
				});
				el.addEventListener('touchmove', function(evt) {
					moveEndX = evt.changedTouches[0].pageX;
					moveEndY = evt.changedTouches[0].pageY;
					Y = moveEndY - startY;
					X = moveEndX - startX;

					if(Math.abs(Y) > Math.abs(X) && Y > 0 && (document.querySelector('.list-scroll').scrollTop < 15)) {
						//console.log("向下");
						evt.preventDefault();
					}
					//if(Math.abs(Y) > Math.abs(X) && Y < 0) {
					//console.log("向上");
					//}
					//if(el.offsetHeight < el.scrollHeight)
					//evt._isScroller = true;
				});
			}
			overscroll(document.querySelector('.list-scroll'));

		},
		methods: {
			tabFunc(i) {
				if(i.obj.maxDays == i.obj.minDays) {
					this.tabFlag = i.obj.packageCode
					this.$store.state.tabFlag = i.obj.packageCode
				} else {
					this.tabFlag = "choose"
					this.$store.state.tabFlag = "choose"
				}
				this.finalNum = 1
				this.judgeData = i
				this.price = Number(this.judgeData.obj.price ? this.judgeData.obj.price : this.judgeData.obj.strategy_desc)
				this.finalPrice = this.finalNum * this.price
			},
			chooseFunc(id) {
				this.chooseFlag = id
				this.checkedObj = {}
				this.checkedObj['checked' + id] = true
			},
			addFunc() {
				console.log(this.$store.state.openId)
				var that = this
				if(that.judgeData.obj.maxDays == that.judgeData.obj.minDays) {
					that.finalNum++
				} else {
					if(that.judgeData.obj.maxDays == "-1") {
						that.finalNum++
					} else {
						if(that.finalNum < Number(that.judgeData.obj.maxDays)) {
							that.finalNum++
						} else {
							that.popupTxt = "超出最大数量"
							const component = this.$refs['myPopup']
							component.show()
							setTimeout(() => {
								component.hide()
							}, 1000)
						}
					}
				}
			},
			delFunc() {
				var that = this
				if(that.finalNum > 1) {
					that.finalNum--
				} else {
					that.popupTxt = "不能再少了"
					const component = this.$refs['myPopup']
					component.show()
					setTimeout(() => {
						component.hide()
					}, 1000)
				}
			},
			addCar() {
				var that = this
				that.$store.state.finalMeal = that.judgeData
				that.$store.state.perPrice = Number(this.judgeData.obj.price ? this.judgeData.obj.price : this.judgeData.obj.strategy_desc)
				that.$store.state.finalNum = that.finalNum
				that.$store.state.finalPrice = that.finalPrice
				that.$router.push("/payPage")
			},
			compare(property) {
				return function(a, b) {
					var value1 = Number(a.obj[property]);
					var value2 = Number(b.obj[property]);
					console.log(a)
					return value1 - value2;
				}
			}
		}
	}
</script>

<style scoped>
	.banner {
		height: 110px;
	}
	
	.banner p {
		font-size: 24px;
		color: #fff;
		text-align: center;
		line-height: 110px;
		width:80%;
		margin:0 auto;
	}
	
	.common-title i {
		background: url(../assets/common/shoppingcar.png)no-repeat center;
		background-size: 16px 16px;
	}
	
	.car-tab {
		padding-top: 5px;
	}
	
	.car-tab>div {
		border-bottom: 5px solid #C9CACA;
	}
	
	.car-tab>div.active {
		border-bottom: 5px solid #F39800;
	}
	
	.car-tab>div.active span {
		color: #3E3A39;
	}
	
	.car-tab>div span {
		display: block;
		font-size: 0.7rem;
		line-height: 20px;
		height: 20px;
		text-align: center;
		color: #9FA0A0;
		border-right: 1px solid #3E3A39;
		margin-bottom: 2px;
	}
	
	.car-tab>div:last-child span {
		border-right: none
	}
	
	.car-list {
		position: relative;
		overflow-y: scroll;
	}
	
	.car-list>ul {
		display: none;
	}
	
	.car-list>ul.active {
		display: block
	}
	
	.car-list li {
		position: relative;
		padding: 10px 1.2rem;
		border-bottom: 1px solid #D4D5D5;
	}
	
	.car-list .cube-checkbox {
		position: absolute;
		top: 14px;
	}
	
	.car-list li p {
		position: relative;
		display: inline-block;
		padding-left: 1.5rem;
		font-size: 0.7rem;
		line-height: 20px;
		color: #9FA0A0;
	}
	
	.list-1 li.active p {
		color: #F39800;
	}
	
	
	.sale {
		position: absolute;
		top: 0;
		right: -0.8rem;
		display: block;
		font-size: 0.5rem;
		line-height: 15px;
		padding: 1px 5px 0;
		background-color: #F39800;
		color: #fff;
		vertical-align: middle;
	}
	.list-2 span.title {
		position: relative;
		display: block;
		font-size: 0.7rem;
		color: #F39800;
		line-height: 12px!important;
	}
	
	.list-2 span.title:before {
		content: '';
		display: block;
		position: absolute;
		top: 2px;
		left: -15px;
		width: 8px;
		height: 8px;
		border-radius: 4px;
		background-color: #F39800;
	}
	
	.list-2 span.txt {
		font-size: 0.5rem;
		color: #3E3A39;
		line-height: 12px!important;
	}
	
	.price-box {
		position: absolute;
		height: 40px;
		top: 50%;
		margin-top: -20px;
		right: 1.2rem;
	}
	
	.price-box .now {
		font-size: 0.8rem;
		color: #F39800;
		vertical-align: middle;
	}
	
	.price-box .now span {
		margin-left: 1px;
	}
	
	.price-box .old span:before {
		position: absolute;
		display: block;
		content: '';
		width: 100%;
		padding: 0 3px;
		top: 7px;
		left: -3px;
		border-bottom: 1px solid #F39800
	}
	
	.price-box .old {
		font-size: 0;
		margin-top: 3px;
		text-align: right;
	}
	
	.price-box .now span,
	.price-box .old span {
		position: relative;
		display: inline-block;
		font-size: 0.6rem;
		color: #C9CACA;
		line-height: 16px;
		height: 16px;
	}
	
	.buy-box {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 40px;
		border-top: 1px solid #D4D5D5;
		padding: 12px 1rem 0;
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
		margin-top: -4px;
		padding: 10px 10px;
		font-size: 0.7rem;
		height: 16px;
		line-height: 16px;
		color: #fff;
		background-color: #F39800;
		border-radius: 3px;
	}
	
	.scroll-btn {
		position: relative;
		height: 34px;
		border-top: 1px solid #D4D5D5;
		border-bottom: 1px solid #D4D5D5;
		margin-bottom: -1px;
		text-align: center;
		font-size: 0;
		line-height: 34px;
	}
	
	.scroll-btn span {
		font-size: 0.7rem;
		height: 20px;
		color: #3E3A39;
		vertical-align: middle;
	}
	
	.scroll-btn i {
		display: inline-block;
		width: 24px;
		height: 20px;
		vertical-align: middle;
		background: url(../assets/common/up.png) no-repeat center 5px;
		background-size: 13px 8px;
	}
	
	.num-box {
		position: absolute;
		left: 0;
		right: 0;
		top: -36px;
		padding: 0 1.2rem;
		height: 34px;
		border-top: 1px solid #D4D5D5;
		background: #fff;
		font-size: 0;
	}
	
	.num-box p {
		float: left;
		font-size: 0.7rem;
		color: #3E3A39;
		line-height: 34px;
	}
	
	.num-box>div {
		float: right;
	}
	
	.num-box>div>a {
		display: inline-block;
		vertical-align: middle;
		font-size: 0.7rem;
		border: 1px solid #D4D5D5;
		line-height: 18px;
		height: 18px;
	}
	
	.num-box>div>a.number {
		padding: 2px 12px;
		border-left: none;
		border-right: none;
	}
	
	.num-box>div>a.add,
	.num-box>div>a.del {
		padding: 2px 6px;
		font-size: 0.8rem;
	}
	
	.num-box>div>a.del {
		padding: 2px 7px;
	}
	
	.list-scroll-content {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
	}
	
	.list-scroll {
		height: 100%;
		overflow-y: scroll;
	}
	
	.detail-list {
		padding: 15px 1.2rem 60px;
	}
	
	.detail-list>ul {
		padding-top: 5px;
	}
	
	.detail-list ul p {
		font-size: 0;
		border-bottom: 1px solid #F39800;
	}
	
	.detail-list ul p span {
		display: inline-block;
		font-size: 0.7rem;
		padding: 2px 0.5rem 0 0.5rem;
		min-width:85px;
		background-color: #F39800;
		color: #fff;
	}
	
	.detail-list ul ul {
		display: none;
		padding: 5px 0 8px 1.2rem;
	}
	
	.detail-list ul ul.active {
		display: block
	}
	
	.detail-list ul ul img {
		width: 100%;
	}
	
	.detail-list ul ul li {
		position: relative;
		font-size: 0.6rem;
		color: #3E3A39;
		line-height: 16px;
		margin-top: 10px;
	}
	
	.detail-list ul ul li:before {
		content: "";
		position: absolute;
		width: 8px;
		height: 8px;
		background-color: #F39800;
		border-radius: 4px;
		top: 4px;
		left: -15px;
	}
</style>