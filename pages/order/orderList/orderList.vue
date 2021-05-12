<template>
	<view class="page">
		<u-navbar title="" :isBack="false" :background="{ background: '#0080FF' }">
			<view class="slot-wrap center" @click="toSearch">
				<u-search placeholder="搜索我的订单" :show-action="false" v-model="keyword" @search="search"></u-search>
			</view>
		</u-navbar>
		<view class="tab u-flex u-row-between" :style="[{'top':statusBarH+ 'rpx'}]">
			<view class="conts" :class="orderIndex == -1?'active':''" @click="tab(-1)">
				全部
			</view>
			<!-- <view class="conts" :class="orderIndex == 0?'active':''" @click="tab(0)">
				待确认
			</view> -->
			<view class="conts" :class="orderIndex == 3?'active':''" @click="tab(3)">
				运输中
			</view>
			<view class="conts" :class="orderIndex == 4?'active':''" @click="tab(4)">
				待支付
			</view>
			<view class="conts" :class="orderIndex == 5?'active':''" @click="tab(5)">
				待评价
			</view>
			<view class="conts" :class="orderIndex == 6?'active':''" @click="tab(6)">
				已完成
			</view>
			<view class="conts" :class="orderIndex == 7?'active':''" @click="tab(7)">
				已取消
			</view>
		</view>
		<view class="suggestBottom">
			<view class="contentList">
				<mescroll-body height="80%" ref="mescrollRef" @init="mescrollInit" :up="upOption" @down="downCallback" @up="upCallback">
					<view class="list por" v-for="(item,index) in order" :key="index" @click="to(item,item.faceCargoState,item)" v-if="item.faceCargoState == 5 || item.faceCargoState == 3 || item.faceCargoState == 4 || item.faceCargoState == 6 || item.faceCargoState == 7">
						<!-- faceState -->
						<icon class="iconfont iconquxiaozhong to poa" v-if="item.cargoState == 4" style="color:#fc441c;font-size: 100rpx;top: 40rpx;right: 23rpx;"></icon>
						<!-- <image src="../../../static/pic61.png" style="width: 100rpx;" class="" mode="widthFix"></image> -->
						<view class="tp">
							<view class="status status1" v-if="item.faceCargoState == 1">
								待确认
							</view>
							<view class="status status2" v-else-if="item.faceCargoState == 3">
								运输中
							</view>
							<view class="status status3" v-else-if="item.faceCargoState == 4">
								待支付
							</view>
							<view class="status status4" v-else-if="item.faceCargoState == 5">
								待评价
							</view>
							<view class="status status5" v-else-if="item.faceCargoState == 6">
								已完成
							</view>
							<view class="status status5" v-else-if="item.faceCargoState == 7">
								已取消
							</view>
							<!-- <view class="status status3" v-else-if="item.faceCargoState == 5">
								退款中
							</view> -->
							<view class="site">
								<view class="start u-line-1" style="max-width: 220rpx;">
									<!-- item.freightCarg-o -->
									{{item.addressList[0].cityName}} {{item.addressList[0].regionName}}
								</view>
								<icon class="iconfont icondao to" style="font-size: 30rpx;"></icon>
								<view class="end u-line-1" style="max-width: 220rpx;">
									{{item.addressList[item.addressList.length-1].cityName}} {{item.addressList[item.addressList.length-1].regionName}}
								</view>
							</view>
						</view>
						<view class="ct">
							<view class="type">
								<text>{{item.goodsTypeName}}/{{item.weight}}吨</text>

								<text>{{item.cargorCarModeName}}</text>
								<text v-if="item.cargorCarConductorName == '' || item.cargorCarConductorName == null">{{item.occupyConductor}}</text>
								<text v-else>{{item.cargorCarConductorName}}</text>
							</view>
							<view class="money">
								<text class="money">
									￥{{item.freight}}/趟 {{item.vehicleTypeName}}
								</text>

								<text class="tim">
									<text>{{item.updateTime}}</text>
								</text>
							</view>
						</view>
					</view>
				</mescroll-body>
			</view>
			<!-- <text class="orderBlean" v-if="orderBlean">亲,没有更多了</text> -->
		</view>

		<u-tabbar v-model="current" :before-switch="beforeSwitch" height="140" inactive-color="#333333" icon-size="40"
		 active-color="#0080FF" :list="list"></u-tabbar>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		data() {
			return {
				upOption: {
					empty: {
						tip: '~ 暂无订单 ~', // 提示
					},
					textNoMore: '-- 已加载全部 --'
				},
				statusBarH: this.statusBar * 2,
				order: [],
				pageIndex: 1,
				pageSize: 20,
				//选择状态-1是全部
				orderIndex: -1,
				//判断状态.1是正常.2是搜索
				type: 1,
				//到底的监听 true就是到底了
				orderBlean: false,
				//搜索的内容
				keyword: "",
				//底部tab的内容
				list: [{
						iconPath: "../../../static/tabBar01.png",
						selectedIconPath: "../../../static/tabBar02.png",
						text: '发货',
						customIcon: false
					},
					{
						iconPath: "../../../static/tabBar03.png",
						selectedIconPath: "../../../static/tabBar04.png",
						text: '消息',
						customIcon: false
					},
					{
						iconPath: "../../../static/tabBar05.png",
						selectedIconPath: "../../../static/tabBar06.png",
						text: '订单',
						customIcon: false
					},
					{
						iconPath: "../../../static/tabBar07.png",
						selectedIconPath: "../../../static/tabBar08.png",
						text: '我的',
						isDot: false,
						customIcon: false
					},
				],
				current: 2,
				canReset:false
				//后端状态
			}
		},
		onLoad(option) {
			if (option.type) {
				this.orderIndex = option.type
			}
		},
		onShow() {
			this.type = 1
			this.keyword = ''
			// this.orderBlean = false
			// this.order = []
			// this.pageIndex = 1
			// this.pageList()
			this.canReset && this.downCallback()
			this.canReset && this.mescroll.scrollTo(0,0)
			this.canReset = true
		},
		methods: {
			/*上拉加载的回调: */
			upCallback(page) {
				//
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				// if(this.pageIndex == 1){
				// 	this.mescroll.endSuccess(1,true)
				// 	return
				// }
				let data = {
					pageIndex: pageNum,
					pageSize: pageSize,
					faceState: this.orderIndex
				}
				if (this.type == 2) {
					data = {
						pageIndex: pageNum,
						pageSize: pageSize,
						param: this.keyword,
						faceState: this.orderIndex
					}
				}
				ajax.get(config.getTime_url, {}).then(res1 => {
					ajax.get(config.orderList_url, data)
						.then(res => {
							console.log("pageList")
							console.log(res)
							if (res.code == 0) {
								if (res.data.list != null && res.data.list != []) {
									// if (res.data.list.length > 0) {
										for (let i = 0; i < res.data.list.length; i++) {
											if (res.code == 0) {
												var dateTime = new Date(res.data.list[i].updateTime);
												var year = dateTime.getFullYear();
												var month = dateTime.getMonth() + 1;
												var day = dateTime.getDate();
												var hour = dateTime.getHours();
												var minute = dateTime.getMinutes();
												var second = dateTime.getSeconds();
												var now = new Date();
												// var now_new = Date.parse(now.toDateString()); //typescript转换写法
												var milliseconds = 0;
												var timeSpanStr;
												milliseconds = Number(res1.data) - res.data.list[i].updateTime;
												if (milliseconds <= 1000 * 60 * 1) {
													timeSpanStr = '刚刚';
												} else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
													timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
												} else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
													timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
												} else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
													timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
												} else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
													timeSpanStr = year + '-' + month + '-' + day;
													// + ' ' + hour + ':' + minute
												} else {
													timeSpanStr = year + '-' + month + '-' + day;
													// + ' ' + hour + ':' + minute
												}
												res.data.list[i].updateTime = timeSpanStr
											}

											// res.data.list[i].updateTime = this.timers(res.data.list[i].updateTime)
											if (res.data.list[i].cargorCarModeName.indexOf(",") != -1) {
												var str = res.data.list[i].cargorCarModeName.split(",")
												var strNew = ''
												for (let i = 0; i < str.length; i++) {
													if (i == 0) {
														strNew = str[i] + strNew
													} else {
														strNew = strNew + '/' + str[i]
													}
												}
												res.data.list[i].cargorCarModeName = strNew
											}
											if (res.data.list[i].cargorCarConductorName != null) {
												if (res.data.list[i].cargorCarConductorName.indexOf(",") != -1) {
													var str = res.data.list[i].cargorCarConductorName.split(",")
													var strNew = ''
													for (let i = 0; i < str.length; i++) {
														strNew = strNew + str[i] + '米'
													}
													res.data.list[i].cargorCarConductorName = strNew
												} else if (res.data.list[i].cargorCarConductorName != "") {
													res.data.list[i].cargorCarConductorName = res.data.list[i].cargorCarConductorName +
														"米"
												}
											}

											// item.cargorCarModeName
											// item.cargorCarConductorName
										}
										let curPageData = res.data.list;
										let curPageLen = res.data.list.length;
										let hasNext = res.data.hasNextPage;
										if (page.num == 1) this.order = []; //如果是第一页需手动置空列表
										this.order = this.order.concat(curPageData); //追加新数据
										this.mescroll.endSuccess(curPageLen, hasNext);
									// } else {
									// 	this.mescroll.endErr();
									// }
								} else {
									this.mescroll.endErr();
								}
							}else {
								uni.showToast({
									title: "网络错误,请重试",
									icon: 'none',
									duration: 2000
								})
							}
						}).catch(err => {
							// this.mescroll.endErr();
							//ajax.js反馈的reject结果
							console.log(err)
						})
				}).catch(err => {
					// this.mescroll.endErr();
					//ajax.js反馈的reject结果
					console.log(err)
				})

			},

			timers(timespan) {

				var dateTime = new Date(timespan);

				var year = dateTime.getFullYear();
				var month = dateTime.getMonth() + 1;
				var day = dateTime.getDate();
				var hour = dateTime.getHours();
				var minute = dateTime.getMinutes();
				var second = dateTime.getSeconds();
				var now = new Date();
				var now_new = Date.parse(now.toDateString()); //typescript转换写法

				var milliseconds = 0;
				var timeSpanStr;

				milliseconds = now_new - timespan;

				if (milliseconds <= 1000 * 60 * 1) {
					timeSpanStr = '刚刚';
				} else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
					timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
				} else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
					timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
				} else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
					timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
				} else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
					timeSpanStr = month + '-' + day;
					// + ' ' + hour + ':' + minute
				} else {
					timeSpanStr = year + '-' + month + '-' + day;
					// + ' ' + hour + ':' + minute
				}
				return timeSpanStr;
			},
			to(id, status, item) {
				console.log("货源id:" + id)
				console.log(status)
				uni.navigateTo({
					url: "/pages/order/orderInfo/orderInfo?orderId=" + id.id + "&status=" + status
				})
			},
			toSearch(){
				uni.navigateTo({
					url: "/pages/order/orderSearch/orderSearch"
				})
			},
			tab(e) {
				if (e != this.orderIndex) {
					this.orderIndex = e
					console.log(this.orderIndex)
					if (this.orderBlean) {
						this.orderBlean = false
					}
					this.order = []
					this.pageIndex = 1
					//还原状态
					// if (this.type == 2) {
					// 	this.type = 1
					// }
					// this.pageList()
					this.mescroll.resetUpScroll()
				}
			},
			search(e) {
				console.log(e)
				//改变状态
				if (this.type == 1) {
					this.type = 2
				}
				
				// if (this.orderBlean) {
				// 	this.orderBlean = false
				// }
				// this.order = []
				// this.pageIndex = 1
				// this.pageList()
				this.mescroll.resetUpScroll()
			},
			pageList() {

				if (this.orderBlean == false) {

					let data = {
						pageIndex: this.pageIndex,
						pageSize: this.pageSize,
						faceState: this.orderIndex
					}
					if (this.type == 2) {
						data = {
							pageIndex: this.pageIndex,
							pageSize: this.pageSize,
							param: this.keyword,
							faceState: this.orderIndex
						}
					}
					ajax.get(config.getTime_url, {}).then(res1 => {
						ajax.get(config.orderList_url, data)
							.then(res => {
								console.log("pageList")
								console.log(res)
								if (res.code == 0) {
									if (res.data.list != null) {
										if (res.data.list.length > 0) {
											for (let i = 0; i < res.data.list.length; i++) {
												if (res.code == 0) {
													var dateTime = new Date(res.data.list[i].updateTime);
													var year = dateTime.getFullYear();
													var month = dateTime.getMonth() + 1;
													var day = dateTime.getDate();
													var hour = dateTime.getHours();
													var minute = dateTime.getMinutes();
													var second = dateTime.getSeconds();
													var now = new Date();
													// var now_new = Date.parse(now.toDateString()); //typescript转换写法
													var milliseconds = 0;
													var timeSpanStr;
													milliseconds = Number(res1.data) - res.data.list[i].updateTime;
													if (milliseconds <= 1000 * 60 * 1) {
														timeSpanStr = '刚刚';
													} else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
														timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
													} else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
														timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
													} else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
														timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
													} else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
														timeSpanStr = month + '-' + day;
														// + ' ' + hour + ':' + minute
													} else {
														timeSpanStr = year + '-' + month + '-' + day;
														// + ' ' + hour + ':' + minute
													}
													res.data.list[i].updateTime = timeSpanStr
												}
												console.log()
												if(res.data.list[i].cargorCarModeName != null){
													if (res.data.list[i].cargorCarModeName.indexOf(",") != -1) {
														var str = res.data.list[i].cargorCarModeName.split(",")
														var strNew = ''
														for (let i = 0; i < str.length; i++) {
															if (i == 0) {
																strNew = str[i] + strNew
															} else {
																strNew = strNew + '/' + str[i]
															}
														}
														res.data.list[i].cargorCarModeName = strNew
													}
												}
												if (res.data.list[i].cargorCarConductorName != null) {
													if (res.data.list[i].cargorCarConductorName.indexOf(",") != -1) {
														var str = res.data.list[i].cargorCarConductorName.split(",")
														var strNew = ''
														for (let i = 0; i < str.length; i++) {
															strNew = strNew + str[i] + '米'
														}
														res.data.list[i].cargorCarConductorName = strNew
													} else if (res.data.list[i].cargorCarConductorName != "") {
														res.data.list[i].cargorCarConductorName = res.data.list[i].cargorCarConductorName +
															"米"
													}
												}

												// item.cargorCarModeName
												// item.cargorCarConductorName
											}
											if (this.pageIndex == 1) this.order = []
											this.order = this.order.concat(res.data.list)
											this.pageIndex++
										} else {
											this.orderBlean = true
										}
									} else {
										this.orderBlean = true
									}
								}else {
									uni.showToast({
										title: "网络错误,请重试",
										icon: 'none',
										duration: 2000
									})
								}

							}).catch(err => {
								//ajax.js反馈的reject结果
								console.log(err)
							})
					}).catch(err => {
						//ajax.js反馈的reject结果
						console.log(err)
					})
				}

			},


			beforeSwitch(index) {
				let routes = getCurrentPages();
				let curRoute = routes[routes.length - 1].route;
				if (index == 0 && curRoute != 'pages/goods/sendGoods/sendGoods') {
					uni.reLaunch({
						url: "/pages/goods/sendGoods/sendGoods"
					})
				} else if (index == 1 && curRoute != 'pages/user/news/news') {
					uni.reLaunch({
						url: "/pages/user/news/news"
					})
				} else if (index == 2 && curRoute != 'pages/order/orderList/orderList') {
					uni.reLaunch({
						url: "/pages/order/orderList/orderList"
					})
				} else if (index == 3 && curRoute != 'pages/user/my/my') {
					uni.reLaunch({
						url: "/pages/user/my/my"
					})
				}
			},
		}
	}
</script>

<style scoped lang="less">
	.tab {
		z-index: 200;
		position: fixed;
		// top: 88rpx;
		// top:148rpx;
		left: 0;
		width: 100%;
		height: 100rpx;
		background-color: #f8f8f8;
		padding: 0 30rpx;
		padding-top: 20rpx;
		border-bottom: 2rpx solid #DDDDDD;

		.conts {
			height: 80rpx;
			border-bottom: 2rpx solid #DDDDDD;
			line-height: 86rpx;
			font-size: 26rpx;
			color: #666666;
		}

		.conts.active {
			border-color: #3399FF;
			color: #3399FF;
		}
	}

	.slot-wrap.center {
		width: 100%;
		padding: 0 30rpx;
	}

	.btn {
		margin-bottom: 50rpx;

	}

	.orderBlean {
		color: #666;
		position: relative;
		bottom: 20rpx;
	}

	.page {
		.slotRight {
			color: #f8f8f8;
			font-size: 24rpx;
		}

		.suggestBottom {
			padding-top: 90rpx;

			min-height: calc(100vh - 446rpx);
			text-align: center;
			margin-top: 20rpx;

			.wanting {
				.images {
					width: 142rpx;
					height: 134rpx;
					margin-top: 220rpx;
					margin-bottom: 42rpx;
				}

				view.text {
					width: 280rpx;
					margin: 0 auto;
					text-align: center;
				}
			}

			//.page .suggestBottom 
			.contentList {
				width: 100%;
				padding: 0 30rpx 40rpx 30rpx;

				.list {
					background-color: #fff;
					border-radius: 8rpx;
					box-shadow: 0px 2px 8px #C8C8C8;
					margin-bottom: 20rpx;
					display: grid;
					
					.tp {
						padding: 0 20rpx 26rpx;

						border-bottom: 2rpx solid #EEEEEE;
						display: flex;
						justify-content: start;
						margin-top: 26rpx;
						.status {
							width: 80rpx;
							height: 36rpx;
							text-align: center;
							font-size: 20rpx;
							line-height: 34rpx;
							border-radius: 8rpx;
							color: #F8F8F8;
							margin-top: 4rpx;
						}

						.status.status1 {
							background-color: #FC441C;
						}

						.status.status2 {
							background-color: #07CC10;
						}

						.status.status3 {
							background-color: #FFCC52;
						}

						.status.status4 {
							background-color: #5252FF;
						}

						.status.status5 {
							background-color: #999999;
						}

						.site {
							padding-left: 20rpx;
							display: flex;
							justify-content: start;
							height: 46rpx;
							text {
								max-width: 115rpx;
								display: inline-block;
							}
							.start {
								color: #3399FF;
								font-size: 32rpx;
								line-height: 48rpx;

								text {
									display: inline-block;
								}

								text:first-child {
									padding-right: 10rpx;
								}
							}

							.to {
								// width: 40rpx;
								// height: 28rpx;
								margin: 10rpx 30rpx 0;
							}

							.end {
								color: #F96F2B;
								font-size: 32rpx;
								line-height: 48rpx;

								text {
									display: inline-block;
								}

								text:first-child {
									padding-right: 10rpx;
								}
							}
						}
					}

					.ct {
						padding: 16rpx 20rpx 1rpx 20rpx;

						.type {
							font-size: 24rpx;
							line-height: 38rpx;
							color: #666;
							display: flex;
							justify-contnt: start;

							text {
								display: inline-block;
								margin-right: 20rpx;
							}
						}

						view.money {
							padding-right: 24rpx;
							display: flex;
							justify-content: space-between;
							margin: 22rpx 0;

							text.money {
								color: #333;
								font-size: 28rpx;
								line-height: 38rpx;
							}

							text.tim {
								color: #999999;
								font-size: 24rpx;
								line-height: 42rpx;
							}
						}
					}
				}
			}

		}
	}
</style>
<style scoped>
	@import '../../../components/font/iconfont.css';
	
</style>
