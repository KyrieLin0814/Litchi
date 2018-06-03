<template>
	<div class="body-container">
		<div class="fullpage-container">
			<div class="fullpage-wp" v-fullpage="opts">
				<div class="page-1 page">
					<div class="banner" :style="{backgroundImage: 'url(' + obj.img + ')', backgroundSize: '100% auto', backgroundPosition:'center'}">
						<p>{{obj.area}}</p>
					</div>
					<div class="common-title">
						<i></i>
						<span>选择套餐</span>
					</div>
					<div class="car-content">
						<div class="car-tab flexBox">
							<div class="flex-1" @click="tabFunc('choose')" :class="{'active': (tabFlag=='choose')}"><span>自选天数包</span></div>
							<div class="flex-1" @click="tabFunc('five')" :class="{'active': (tabFlag=='five')}"><span>5天包</span></div>
							<div class="flex-1" @click="tabFunc('seven')" :class="{'active': (tabFlag=='seven')}"><span>7天包</span></div>
						</div>
						<div class="car-list" :style="{height: contentHeight + 'px'}">
							<ul class="list-1" :class="{'active': (tabFlag=='choose')}">
								<li @click="chooseFunc('id1')" :class="{'active': (chooseFlag=='id1')}">
									<cube-checkbox v-model="checkedObj.checkedid1" :option="option" :hollow-style="true" shape="circle" />
									<p>
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
									</div>
								</li>

								<li @click="chooseFunc('id2')" :class="{'active': (chooseFlag=='id2')}">
									<cube-checkbox v-model="checkedObj.checkedid2" :option="option" :hollow-style="true" shape="circle" />
									<p>
										无限流量含300MB高速4G流量</br>
										+赠送30分钟语音通话
									</p>
								</li>
								<li @click="chooseFunc('id3')" :class="{'active': (chooseFlag=='id3')}">
									<cube-checkbox v-model="checkedObj.checkedid3" :option="option" :hollow-style="true" shape="circle" />
									<p>
										无限流量含500MB高速4G流量</br>
										+赠送30分钟语音通话
									</p>
								</li>
								<li @click="chooseFunc('id4')" :class="{'active': (chooseFlag=='id4')}">
									<cube-checkbox v-model="checkedObj.checkedid4" :option="option" :hollow-style="true" shape="circle" />
									<p>
										港澳通用 无限流量</br>
										+含300MB高速4G流量
									</p>
								</li>
							</ul>

							<ul class="list-2" :class="{'active': (tabFlag=='five')}">
								<li>
									<p>
										<span class="title">流量详情</span>
										<span class="txt">当地3G/4G网络，不限流量，超出300MB/天，限速128kbps</span>
									</p>
								</li>
								<li>
									<p>
										<span class="title">热点分享</span>
										<span class="txt">支持</span>
									</p>
								</li>
								<li>
									<p>
										<span class="title">APN</span>
										<span class="txt">3Gnet</span>
									</p>
								</li>
								<li>
									<p>
										<span class="title">流量详情</span>
										<span class="txt">当地3G/4G网络，不限流量，超出300MB/天，限速128kbps</span>
									</p>
								</li>
							</ul>
							<ul class="list-2" :class="{'active': (tabFlag=='seven')}">
								<li>
									<p>
										<span class="title">流量详情</span>
										<span class="txt">当地3G/4G网络，不限流量，超出300MB/天，限速128kbps</span>
									</p>
								</li>
								<li>
									<p>
										<span class="title">热点分享</span>
										<span class="txt">支持</span>
									</p>
								</li>
								<li>
									<p>
										<span class="title">APN</span>
										<span class="txt">3Gnet</span>
									</p>
								</li>
							</ul>

						</div>
						<div class="scroll-btn">
							<div>
								<i></i><span>上拉展开产品详情</span>
							</div>

							<div class="num-box" v-if="tabFlag=='choose'">
								<p>天数</p>
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
							<div class="detail-list ">
								<ul>
									<li>
										<p><span>推荐理由</span></p>
										<ul>
											<li>超低价格</li>
											<li>卡槽通用，适合多种手机型号卡槽通用，适合多种手机型号</li>
											<li>卡槽通用，适合多种手机型号</li>
											<li>卡槽通用，适合多种手机型号</li>
										</ul>
									</li>
									<li>
										<p><span>推荐理由</span></p>
										<ul>
											<li>超低价格</li>
											<li>卡槽通用，适合多种手机型号</li>
											<li>卡槽通用，适合多种手机型号</li>
											<li>卡槽通用，适合多种手机型号</li>
										</ul>
									</li>
									<li>
										<p><span>推荐理由</span></p>
										<ul>
											<li>超低价格</li>
											<li>卡槽通用，适合多种手机型号</li>
											<li>卡槽通用，适合多种手机型号</li>
											<li>卡槽通用，适合多种手机型号</li>
										</ul>
									</li>
									<li>
										<p><span>推荐理由</span></p>
										<ul>
											<li>超低价格</li>
											<li>卡槽通用，适合多种手机型号</li>
											<li>卡槽通用，适合多种手机型号</li>
											<li>卡槽通用，适合多种手机型号</li>
											<li>超低价格</li>
											<li>超低价格</li>
											<li>卡槽通用，适合多种手机型号</li>
											<li>卡槽通用，适合多种手机型号</li>
											<li>卡槽通用，适合多种手机型号</li>
											<li>超低价格</li>
											<li>超低价格</li>
											<li>卡槽通用，适合多种手机型号</li>
											<li>卡槽通用，适合多种手机型号</li>
											<li>卡槽通用，适合多种手机型号</li>
											<li>超低价格</li>
											<li>超低价格</li>
											<li>卡槽通用，适合多种手机型号</li>
											<li>卡槽通用，适合多种手机型号</li>
											<li>卡槽通用，适合多种手机型号</li>
											<li>超低价格</li>
											<li>超低价格</li>
											<li>卡槽通用，适合多种手机型号</li>
											<li>卡槽通用，适合多种手机型号</li>
											<li>卡槽通用，适合多种手机型号</li>
											<li>超低价格</li>
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
			<p>总价： <span>{{ price }}</span> 元</p>
			<a @click="addCar">加入购物车</a>
		</div>
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
					der: 0.05,
					afterChange: function(data) {},
				},
				obj: {},
				contentHeight: 0,
				tabFlag: this.$store.state.tabFlag,
				option: {
					label: '',
					value: ''
				},
				checkedObj: {
					checkedid1: true
				},
				price: 9.9,
				finalNum: 1,
				chooseFlag: 'id1',
				scrollDown: true,
				scrollUp: true,
				dataArr: [{
						name: '自选天数包',
						list: [{
								id: 1,
								title: '100M 4G高速流量+流量用完自动关闭网络+新用户含套餐卡仅9.9元/张',
								price: 9.9,
								oldPrice: 15
							},
							{
								id: 2,
								title: '无限流量含300MB高速4G流量+赠送30分钟语音通话',
								price: 9.9
							},
							{
								id: 3,
								title: '无限流量含500MB高速4G流量+赠送30分钟语音通话',
								price: 9.9
							}
						]
					},
					{
						name: '5天包',
						list: [{
								title: '流量详情',
								txt: '当3g、4g网络时候，不限流量'
							},
							{
								title: '热点分享',
								txt: '支持'
							},
							{
								title: 'APN',
								txt: '3Gnet'
							}
						]
					},
					{
						name: '7天包',
						list: [{
								title: '流量详情777',
								txt: '当3g、4g网络时候，不限流量'
							},
							{
								title: '热点分享777',
								txt: '支持'
							},
							{
								title: 'APN777',
								txt: '3Gnet'
							}
						]
					},
				]
			}
		},
		props: {},
		created() {
			this.obj = this.$store.state.routerData
			//console.log(this.obj)
		},
		mounted() {
			var that = this
			that.contentHeight = document.documentElement.clientHeight - 254

			var startX, startY, moveEndX, moveEndY, X, Y;

			var overscroll = function(el) {
				el.addEventListener('touchstart', function(e) {
					startY = e.touches[0].pageY;
					startX = e.touches[0].pageX;
//					var top = el.scrollTop,
//						totalScroll = el.scrollHeight,
//						currentScroll = top + el.offsetHeight;
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
					//					if(Math.abs(Y) > Math.abs(X) && Y < 0) {
					//						console.log("向上");
					//					}
					//if(el.offsetHeight < el.scrollHeight)
					//evt._isScroller = true;
				});
			}
			overscroll(document.querySelector('.list-scroll'));

		},
		methods: {
			tabFunc(str) {
				this.tabFlag = str
				this.$store.state.tabFlag = str
			},
			chooseFunc(id) {
				this.chooseFlag = id
				this.checkedObj = {}
				this.checkedObj['checked' + id] = true
			},
			addFunc() {
				this.finalNum++
			},
			delFunc() {
				if(this.finalNum > 1) {
					this.finalNum--
				}
			},
			addCar() {
				this.$router.push("/order")
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
		background-color: #C9CACA;
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
		font-size: 0.7rem;
		padding: 2px 2.5rem 0 0.5rem;
		background-color: #F39800;
		color: #fff;
	}
	
	.detail-list ul ul {
		padding: 5px 0 8px 1.2rem;
	}
	
	.detail-list ul ul li {
		position: relative;
		font-size: 0.6rem;
		color: #3E3A39;
		line-height: 18px;
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