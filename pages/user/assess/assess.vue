<template>
	<view class="page">
		<u-navbar title="我的评价" title-color="#F8F8F8" back-icon-color="#333" :background="{ background: '#0080FF' }">
			<!-- <view slot="right" class="slotRight u-padding-right-40" @click="to1">快速重发</view> -->
		</u-navbar>
		<view class="user">
			<view class="userInfo u-flex u-padding-bottom-50">
				<view class="img">
					<icon class="iconfont userImg icontouxiang1" style="font-size: 100rpx;" v-if="userImg == ''"></icon>
					<image :src="userImg" v-else></image>
				</view>
				<view class="userName u-padding-left-48">
					<view class="name u-flex">
						<view class="threeColor">{{obj.idCardName}}</view>
						<view class="nineColor u-padding-left-10" v-show="obj.idCardName == ''">{{phones}}</view>
					</view>
					<view class="text smallText nineColor u-padding-top-18">
						好评率低于<text style="color: #3399FF;">90%</text>可能会影响成交
					</view>
				</view>
			</view>
			<view class="userSum u-padding-left-46 u-padding-right-94 u-flex u-row-between">
				<view class="sum1">
					<view class="num1 masterColor" style="font-size: 60rpx;">
						{{obj.highPraiseRate}}%
					</view>
					<view class="num1 masterColor u-margin-top-10 u-margin-bottom-10" style="font-size: 28rpx;">
						好评率
					</view>
					<view class="num1 inText sixColor">
						{{obj.oll}}条评价
					</view>
				</view>
				<view class="sum2 u-flex">
					<view class="block u-flex u-row-center">
						<view>
							好评
						</view>
						<view class="tiao">
							<view class="se" v-if="obj.highPraiseVolume != 0" :style="{'width':(obj.highPraiseVolume/obj.oll*100) + '%'}"></view>
							<view class="se" v-else style="width: 0;'"></view>
						</view>
						<view>
							{{obj.highPraiseVolume}}
						</view>
					</view>
					<view class="block u-flex u-row-center">
						<view>
							中评
						</view>
						<view class="tiao">
							<view class="se" v-if="obj.middleVolume != 0" :style="{'width':(obj.middleVolume/obj.oll*100) + '%'}"></view>
							<view class="se" v-else style="width: 0;'"></view>
						</view>
						<view>
							{{obj.middleVolume}}
						</view>
					</view>
					<view class="block u-flex u-row-center">
						<view>
							差评
						</view>
						<view class="tiao">
							<view class="se" v-if="obj.negativeComment != 0" :style="{'width':(obj.negativeComment/obj.oll*100) + '%'}"></view>
							<view class="se" v-else style="width: 0;'"></view>
						</view>
						<view>
							{{obj.negativeComment}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="pin">
			<view class="top u-flex u-row-between">
				<view class="view" :class="type == -1?'active':''" @click="tab(-1)">全部</view>
				<view class="view" :class="type == -2?'active':''" @click="tab(-2)">好评</view>
				<view class="view" :class="type == -3?'active':''" @click="tab(-3)">中评</view>
				<view class="view" :class="type == -4?'active':''" @click="tab(-4)">差评</view>
			</view>
			<view class="bottom">
				<view class="cont" v-for="(item,index) in order" :key="index">
					<view class="conts" style="justify-content: flex-start;">
						<view class="user u-flex u-row-between">
							<view class="one u-flex">
								<icon class="iconfont userImg icontouxiang1" style="font-size: 74rpx;" v-if="item.headPortrait == '' || item.headPortrait == null"></icon>
								<image :src="item.headPortrait" mode="scaleToFill" v-else></image>
								<view class="two">
									<view class="twoTop u-flex">
										<view class="u-padding-right-10">
											{{item.idCardName}}
										</view>
										
									</view>
									<view class="twoBottom u-flex">
										<u-rate active-color="#FFCC52" disabled="true" :count="5" v-model="item.score"></u-rate>
										<!-- <view>{{item.addressList[0].cityName}}{{item.addressList[0].regionName}}</view>
										<icon class="iconfont icondao"></icon>
										<view>{{item.addressList[item.addressList.length-1].cityName}}{{item.addressList[item.addressList.length-1].regionName}}</view> -->
									</view>
								</view>
							</view>
							<view class="three">
								{{item.createTime}}
							</view>
						</view>
						<view class="u-flex u-padding-bottom-20" v-for="(items, index) in item.evaluationTypeNames" :key="index" v-if="item.evaluationTypeNames.length != 0">
							<view class="blockView sixColor">
								{{items}}
							</view>
						</view>
					</view>
				</view>
				<view class="orderBlean" style="text-align: center;" v-if="orderSize">
					<image src="../../../static/huoyuan.png" style="width: 400rpx;" mode="aspectFit"></image>
					<text class="nineColor" style="display: block;">~暂无评价~</text>
				</view>
				<view class="orderBlean" style="text-align: center;" v-if="orderBlean">
					<text class="nineColor" style="display: block;">~暂无评价~</text>
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
				cargoName: [],
				userImg: "",
				type: "-1",
				score: "4",
				phone: "",
				obj: {},
				obj1: {},
				phones: "",
				pageIndex: 1,
				pageSize: 10,
				orderBlean: false,
				orderSize:false,
				order: [],
			}
		},
		onLoad(option) {

		},
		onReachBottom() {
			console.log('页面到底了')
			this.pageList();
		},
		onShow() {
			this.pageIndex = 1
			this.order = []
			this.orderBlean = false
			console.log(this.$store.state.userNo)
			let phone = this.$store.state.phone
			this.phone = phone
			this.phones = phone.slice(0, 3) + "*****" + phone.slice(7, 11)
			this.pageList()
			
			ajax.get(config.cargoOwner_url, {
				type: 1,
			}).then(res => {
				console.log("货主简介信息")
				console.log(res)
				if (res.code == 0) {
					this.obj = res.data
					this.obj.oll = this.obj.highPraiseVolume + this.obj.middleVolume + this.obj.negativeComment
					if (res.data.headPortrait != null && res.data.headPortrait != "" && res.data.headPortrait != undefined && res.data.headPortrait.slice(0, 6) != "/ajaxI") {
						this.userImg = res.data.headPortrait
					}
				}
			}).catch(err => {
				//ajax.js反馈的reject结果
				console.log(err)
			})
			
			
		},
		methods: {
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
				return y + '-' + MM + '-' + d
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
					ajax.get(config.pinList_url, {
						userCode: this.$store.state.userNo,
						type:1,
						state:this.type,
						pageIndex: this.pageIndex,
						pageSize: this.pageSize
					}).then(res => {
						console.log("货主评价列表信息")
						console.log(res)
						if (res.code == 0) {
							if (res.data.list.length > 0) {
								let list = res.data.list
								for (let i = 0; i < list.length; i++) {
									list[i].createTime = this.timers(list[i].createTime)
									if(list[i].evaluationTypeNames != null){
										//evaluationTypeNames
										list[i].evaluationTypeNames = list[i].evaluationTypeNames.split(",")
									}
									
								}

								this.order = this.order.concat(list)
								this.pageIndex++
								console.log("================")
								console.log(this.order)
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
	.blockView {
		padding: 0 10rpx;
		height: 48rpx;
		border-radius: 8rpx;
		background-color: #EEEEEE;
		border: 2rpx solid #ddd;
		margin-right: 20rpx;
		text-align: center;
		line-height: 45rpx;

	}

	.pin {
		.top {
			margin: 20rpx 0;
			padding: 0 112rpx;
			background-color: #fff;

			.view {
				height: 74rpx;
				line-height: 70rpx;
				color: #666;
				font-size: 24rpx;
				border-bottom: 2rpx solid #fff;
			}

			.view.active {
				color: #3399FF;
				border-color: #3399FF;
			}
		}

		.bottom {
			padding: 0 20rpx;

			.cont {
				margin-bottom: 20rpx;

				.conts {
					padding-top: 20rpx;
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

	.masterColor {
		color: #3399FF;
	}

	.user {
		background-color: #fff;
		padding: 50rpx 0 0 50rpx;

		.userSum {
			padding-bottom: 20rpx;

			.sum1 {
				text-align: center;
				width: 140rpx;
			}

			.sum2 {
				width: calc(100% - 150rpx);
				align-items: center;
				flex-wrap: wrap;
				height: 182rpx;
				padding-left: 94rpx;

				.block {
					height: 32rpx;

					view {
						font-size: 24rpx;
						color: #999;
					}

					view.tiao {
						margin: 0 20rpx;
						width: 200rpx;
						height: 20rpx;
						background-color: #eee;

						view.se {
							width: 0;
							background-color: #3399FF;
							height: 20rpx;
						}
					}
				}
			}
		}

		.userInfo {
			.userName {

				height: 100rpx;

				.name {
					font-size: 36rpx;
				}
			}

			.img {
				width: 100rpx;
				height: 100rpx;

				image {
					width: 100rpx;
					height: 100rpx;
					border-radius: 8rpx;
				}

				icon.userImg {
					font-size: 100rpx;
				}
			}
		}

	}
</style>
<style scoped>
	@import '../../../components/font/iconfont.css';
</style>
