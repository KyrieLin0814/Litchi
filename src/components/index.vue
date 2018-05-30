<template>
	<div class="body-container">
		<div class="banner">
			<div class="language">
				<a class="CN active">中文</a>
				<a class="EN">English</a>
			</div>
			<img src="../assets/common/banner.png" />
		</div>
		<div class="content">
			<div class="item" v-for="(item,index) in result">
				<div class="title">
					<span class="area">{{item.area}}</span>
					<span class="num">已覆盖{{ item.num }}个地区</span>
					<div class="btn" v-if="item.canMore">
						<a v-if="item.more" class="more" @click="moreFunc(index)">更多</a>
						<a v-else class="less" @click="lessFunc(index)">收起</a>
					</div>
				</div>
				<ul class="card-list clearfix" v-if="item.more">
					<li v-for="i in item.items.slice(0,4)">
						<a @click="routerFunc(i)">
							<div class="img" :style="{backgroundImage: 'url(' + i.img + ')', backgroundSize: '100% 100%'}"></div>
							<div class="txt">
								<span>{{i.area}}</span>
								<a>低至{{i.price}}元/天</a>
							</div>
						</a>
					</li>
				</ul>

				<ul class="card-list clearfix" v-else>
					<li v-for="i in item.items">
						<a @click="routerFunc(i)">
							<div class="img" :style="{backgroundImage: 'url(' + i.img + ')', backgroundSize: '100% 100%'}"></div>
							<div class="txt">
								<span>{{i.area}}</span>
								<a>低至{{i.price}}元/天</a>
							</div>
						</a>
					</li>
				</ul>
			</div>
		</div>

		<div class="footer flexBox">
			<div class="flex-1 help">
				<router-link to="/"><span>帮助中心</span></router-link>
			</div>
			<div class="flex-1 order">
				<router-link to="/status">
					<span>我的订单</span></router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'index',
		data() {
			return {
				num: 10,
				result: [],
				res: [{
						area: '亚洲',
						num: '10',
						items: [{
								area: '印度尼西亚',
								price: 2.9,
								img: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1527415413&di=55737d7218d13d20479b651b73e41719&src=http://img.taopic.com/uploads/allimg/140628/235110-14062PJ11541.jpg"
							},
							{
								area: '新加坡',
								price: 2.9,
								img: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1527415413&di=55737d7218d13d20479b651b73e41719&src=http://img.taopic.com/uploads/allimg/140628/235110-14062PJ11541.jpg"
							},
							{
								area: '印尼+新加坡',
								price: 2.9,
								img: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1527415413&di=55737d7218d13d20479b651b73e41719&src=http://img.taopic.com/uploads/allimg/140628/235110-14062PJ11541.jpg"
							},
							{
								area: '印度尼西亚',
								price: 2.9,
								img: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1527415413&di=55737d7218d13d20479b651b73e41719&src=http://img.taopic.com/uploads/allimg/140628/235110-14062PJ11541.jpg"
							},
							{
								area: '印度尼西亚',
								price: 2.9,
								img: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1527415413&di=55737d7218d13d20479b651b73e41719&src=http://img.taopic.com/uploads/allimg/140628/235110-14062PJ11541.jpg"
							}
						]
					},
					{
						area: '欧洲',
						num: '2',
						items: [{
								area: '印度尼西亚',
								price: 2.9,
								img: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1527415413&di=55737d7218d13d20479b651b73e41719&src=http://img.taopic.com/uploads/allimg/140628/235110-14062PJ11541.jpg"
							},
							{
								area: '新加坡',
								price: 2.9,
								img: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1527415413&di=55737d7218d13d20479b651b73e41719&src=http://img.taopic.com/uploads/allimg/140628/235110-14062PJ11541.jpg"
							}
						]
					},
					{
						area: '非洲',
						num: '2',
						items: [{
								area: '印度尼西亚',
								price: 2.9,
								img: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1527415413&di=55737d7218d13d20479b651b73e41719&src=http://img.taopic.com/uploads/allimg/140628/235110-14062PJ11541.jpg"
							},
							{
								area: '新加坡',
								price: 2.9,
								img: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1527415413&di=55737d7218d13d20479b651b73e41719&src=http://img.taopic.com/uploads/allimg/140628/235110-14062PJ11541.jpg"
							},
							{
								area: '印度尼西亚',
								price: 2.9,
								img: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1527415413&di=55737d7218d13d20479b651b73e41719&src=http://img.taopic.com/uploads/allimg/140628/235110-14062PJ11541.jpg"
							},
							{
								area: '新加坡',
								price: 2.9,
								img: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1527415413&di=55737d7218d13d20479b651b73e41719&src=http://img.taopic.com/uploads/allimg/140628/235110-14062PJ11541.jpg"
							},
							{
								area: '印度尼西亚',
								price: 2.9,
								img: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1527415413&di=55737d7218d13d20479b651b73e41719&src=http://img.taopic.com/uploads/allimg/140628/235110-14062PJ11541.jpg"
							},
							{
								area: '新加坡',
								price: 2.9,
								img: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1527415413&di=55737d7218d13d20479b651b73e41719&src=http://img.taopic.com/uploads/allimg/140628/235110-14062PJ11541.jpg"
							}
						]
					}
				],
			}
		},
		components: {},
		created() {
			this.result = this.res
			this.result.map(function(val, idx) {
				if(val.items.length > 4) {
					val.canMore = true
					val.more = false
				} else {
					val.canMore = false
					val.more = true
				}
			})
		},
		mounted() {

		},
		methods: {
			moreFunc(idx) {
				this.result[idx].more = false
				this.$forceUpdate()
			},
			lessFunc(idx) {
				this.result[idx].more = true
				this.$forceUpdate()
			},
			routerFunc(obj) {
				this.$store.state.routerData = obj
				this.$router.push("/detail")
			}
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
	
	.language {
		position: absolute;
		top: 9px;
		right: 15px;
		font-size: 0;
		border-radius: 5px;
		border: 1px solid #F39800;
		overflow: hidden;
	}
	
	.language a {
		display: inline-block;
		padding: 0.15rem 0.12rem;
		font-size: 0.6rem;
		height: 12px;
		color: #F39800;
		background-color: #fff;
		line-height: 1;
	}
	
	.language a.active {
		color: #fff;
		background-color: #F39800;
	}
	
	.content {
		padding: 0 1.25rem 60px;
	}
	
	.title {
		height: 30px;
		font-size: 0;
		padding-top: 5px;
	}
	
	.area {
		font-size: 0.8rem;
		line-height: 30px;
		color: #F39800;
		margin-right: .45rem;
		vertical-align: middle;
		font-weight: bold;
	}
	
	.num {
		padding-top: 3px;
		font-size: 0.7rem;
		line-height: 25px;
		color: #9FA0A0;
		vertical-align: middle;
	}
	
	.title .btn {
		float: right;
	}
	
	.title a {
		font-size: 0.7rem;
		line-height: 30px;
		color: #9FA0A0;
		padding-right: 1.25rem;
		vertical-align: middle;
		color: #3E3A39;
	}
	
	.title a.more {
		background: url(../assets/common/down.png)no-repeat;
		background-size: 18px 10px;
		background-position: right 2px;
	}
	
	.title a.less {
		background: url(../assets/common/up.png)no-repeat;
		background-size: 18px 10px;
		background-position: right 0px;
	}
	
	.card-list {
		font-size: 0;
	}
	
	.card-list li {
		width: calc(50% - .3rem);
		float: left;
		margin-top: 12px;
	}
	
	.card-list li:nth-child(1),
	.card-list li:nth-child(2) {
		margin-top: 0;
	}
	
	.card-list li:nth-child(odd) {
		margin-right: .3rem;
	}
	
	.card-list li:nth-child(even) {
		margin-left: .3rem;
	}
	
	.card-list li .img {
		padding-bottom: 64%;
	}
	
	.txt {
		height: 20px;
		background-color: #F39800;
		color: #fff;
	}
	
	.txt span,
	.txt a {
		display: inline-block;
		height: 20px;
		line-height: 21px;
		vertical-align: middle;
	}
	
	.txt span {
		width: 55%;
		font-size: 0.6rem;
		text-indent: 0.5em;
	}
	
	.txt a {
		width: 45%;
		font-size: 0.5rem;
		color: #fff;
	}
	
	.footer {
		position: fixed;
		background-color: rgba(204, 204, 204, 0.9);
		bottom: 0;
		width: 100%;
	}
	
	.help>a {
		display: block;
	}
	
	.footer span {
		padding: 6px 0;
		display: block;
		color: #3E3A39;
		font-size: 0.8rem;
		text-align: center;
		line-height: 22px;
	}
	
	.help {
		border-bottom: 6px solid #F39800
	}
	
	.order {
		border-bottom: 6px solid #9FA0A0
	}
	
	.help>a {
		border-right: 1px solid #3E3A39;
	}
</style>