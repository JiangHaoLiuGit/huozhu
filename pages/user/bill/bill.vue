<template>
	<view class="page">
		<u-navbar title="账单明细" back-icon-color="#333" :background="{ background: '#fff' }" :borderBottom="false">
			<!-- <view slot="right" class="u-padding-right-40">我草</view> -->
			<view slot="right" class="u-padding-right-40" @click="call">
				联系客服
			</view>
		</u-navbar>
		<view class="top u-flex u-row-between" :style="{top: `${barheight}px`}">
			<view class="view" :class="type == -1?'active':''" @click="tab(-1)">全部</view>
			<view class="view" :class="type == 1?'active':''" @click="tab(1)">收入</view>
			<view class="view" :class="type == 2?'active':''" @click="tab(2)">支出</view>
		</view>
		<view class="pin" :style="{marginTop: `${height}px`}">
			<view class="bottom">
				<view class="cont" v-for="(item,index) in order" :key="index" @click="go(item.id)">
					<view class="conts" v-if="item.transactionType == 1 || item.transactionType == 8 || item.transactionType == 6 || item.transactionType == 7">
						<view class="u-flex u-row-between widthB" v-if="item.transactionType == 6 || item.transactionType == 7">
							<view class="first u-flex">
								<view class="qiu red"></view>
								<view class="text red inText">支出</view>
							</view>
							<view class="second smallText threeColor u-flex">
								<view class="family fontWeight" style="position: relative;bottom: 4rpx;">-</view>
								<view class="family fontWeight" style="line-height: 20rpx;">￥</view>
								<view>{{item.balance}}</view>
							</view>
						</view>
						<view class="u-flex u-row-between widthB" v-if="item.transactionType == 1 || item.transactionType == 8">
							<view class="first u-flex">
								<view class="qiu blue"></view>
								<view class="text blue inText">收入</view>
							</view>
							<view class="second smallText threeColor u-flex">
								<view class="family fontWeight" style="position: relative;bottom: 4rpx;">+</view>
								<view class="family fontWeight" style="line-height: 20rpx;">￥</view>
								<view>{{item.balance}}</view>
							</view>
						</view>
						<!-- 1:充值,2:定金支付,3:定金退款,4:技术服务费,5:提现 -->
						<view class="u-flex u-margin-top-12 u-row-between widthB">
							<view class="tim nineColor u-font-ss">
								{{item.createTime}}
							</view>
							<view class="text smallText">
								{{ item.title }}
							</view>
						</view>
					</view>
				</view>
				<!-- <text class="orderBlean u-flex u-row-center u-margin-bottom-20" v-if="orderBlean">亲,没有更多了</text> -->
				<view>
					<view class="orderBlean" style="text-align: center;" v-if="orderSize">
						<image src="../../../static/huoyuan.png" style="width: 400rpx;" mode="aspectFit"></image>
						<text class="nineColor" style="display: block;">~暂无流水~</text>
					</view>
					<view class="orderBlean" style="text-align: center;" v-if="orderBlean">
						<text class="nineColor" style="display: block;">~暂无流水~</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	export default {
		data() {
			return {
				barheight: this.statusBar,
				height: null,
				
				type: -1,
				order: [],
				pageIndex: 1,
				pageSize: 10,
				orderBlean: false,
				orderSize:false
			}
		},
		onLoad(option) {

		},
		onReady() {
			this.getHeight();
		},
		onShow() {
			this.order = []
			this.pageIndex = 1
			this.orderBlean = false
			this.pageList();
		},
		onReachBottom() {
			console.log('页面到底了')
			this.pageList();
		},
		methods: {
			// 动态获取高度
			getHeight() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.top').boundingClientRect(data => {
					this.height = data.height;
					console.log(data.height);
				}).exec();
			},
			
			call() {
				let phone = this.$store.state.phoneNumber
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
			},

			go(id) {
				uni.navigateTo({
					url: "/pages/user/billInfo/billInfo?id=" + id
				})
			},
			timers(tim) {
				let date = new Date(tim);
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m;
				let s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s;
				return y + '.' + MM + '.' + d + ' ' + h + ":" + m + ":" + s
			},
			tab(e) {
				if (this.type != e) {
					this.type = e
					this.pageIndex = 1
					this.order = []
					this.orderBlean = false
					this.orderSize = false
					this.pageList()
				}

			},
			pageList() {
				if (this.orderBlean == false) {
					ajax.get(config.walletTransaction_url, {
						revenueType: this.type,
						pageIndex: this.pageIndex,
						pageSize: this.pageSize,
						type: 1
					}).then(res => {
						console.log("账单明细列表")
						console.log(res)
						
						if (res.code == 0) {
							if (res.data.list.length > 0) {
								let list = res.data.list
								for (let i = 0; i < list.length; i++) {
									list[i].createTime = this.timers(list[i].createTime)
								}
								this.order = this.order.concat(list)
								this.pageIndex++
							} else {
								this.orderBlean = true
								if(this.pageIndex == 1){
									this.orderSize = true
									this.orderBlean = false
								}
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
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.blue {
		color: #3399FF;
	}

	.red {
		color: #FC441C;
	}

	.qiu {
		width: 12rpx;
		height: 12rpx;
		border-radius: 8rpx;
		margin-right: 26rpx;
	}

	.qiu.red {
		background-color: #FC441C;
	}

	.qiu.blue {
		background-color: #3399FF;
	}

	.cont {
		box-shadow: none;

		.conts {
			min-height: none;
			padding: 28rpx 0 30rpx;
		}
	}

	.inText {
		font-size: 32rpx;
	}

	.u-font-ss {
		font-size: 24rpx;
	}

	.smallText {
		font-size: 28rpx;
	}
	
	.top {
		width: 100%;
		padding:20rpx 70rpx 20rpx;
		background-color: #f8f8f8;
		z-index: 999;
		position: fixed; 
		top: 88rpx; 
		left: 0;
		.view {
			height: 74rpx;
			line-height: 70rpx;
			color: #666;
			font-size: 32rpx;
			border-bottom: 4rpx solid #f8f8f8;
		}
	
		.view.active {
			color: #3399FF;
			border-color: #3399FF;
		}
	}

	.pin {

		.bottom {
			padding: 0 20rpx;

			.cont {
				margin-bottom: 20rpx;

				.conts {
					padding: 28rpx 24rpx 30rpx 24rpx;
					margin: 0;
				}

				.user {
					width: 100%;
					padding: 0 54rpx 20rpx 0;

					.one {
						image {
							width: 74rpx;
							height: 74rpx;
							border-radius: 8rpx;
						}

						icon {}

						.two {
							padding-left: 20rpx;

							.twoTop {
								font-size: 24rpx;
							}

							.twoBottom {
								padding-top: 10rpx;
								font-size: 20rpx;
								color: #999;

								icon {
									font-size: 20rpx;
									color: #999;
									margin: 0 10rpx;
								}
							}
						}
					}

					.three {
						height: 74rpx;
						color: #999999;
						font-size: 20rpx;
						padding-top: 4rpx;
					}
				}
			}
		}
	}
</style>
