<template>
	<view class="brief">
		<u-navbar back-icon-color="#333" title="司机简介" title-color="#F8F8F8" :background="{ background: '#0080FF' }" :border-bottom="false"></u-navbar>

		<view class="briefCont">
			<view class="briefCont-top">
				<view class="briefCont-top-left">
					<view class="briefCont-top-left-top">
						<view class="briefCont-top-left-top-text">{{obj.idCardName}}</view>
						<!-- 韩工说未认证的不需要显示 -->
						<view class="briefCont-top-left-top-tit" v-if="obj.userCertificationStatus == '1'">实名认证</view>
						<view class="briefCont-top-left-top-tit" v-if="obj.carCertificationStatus == '1'">运输认证</view>
					</view>
					<view class="briefCont-top-left-bot">{{obj.createTime}}注册</view>
				</view>
				<view class="briefCont-top-rig">
					<icon class="iconfont userImg icontouxiang1" style="font-size: 60rpx;" v-if="obj.headPortrait == '' || obj.headPortrait == null"></icon>
					<image style="width: 68rpx; height: 68rpx;" v-else :src="obj.headPortrait" mode="scaleToFill"></image>
				</view>
			</view>
			<!--  v-if="plateNumberName !='' && obj.carConductorName != '' && obj.vehicleType != '' && obj.approvedLoad != ''" -->
			<view class="briefCont-bot" v-if="plateNumberName !='' || obj.carConductorName != '' || obj.vehicleType != '' || obj.approvedLoad != ''">
				<view class="briefCont-bot-left">{{plateNumberName}}</view>
				<view class="briefCont-bot-rig">
					<text v-if="obj.carConductor">{{obj.carConductor}}米 </text>
					<text v-if="obj.vehicleType">{{obj.vehicleType}}</text>
					<text v-if="obj.approvedLoad">/{{obj.approvedLoad}} 吨</text>
				</view>
			</view>
		</view>
		<view class="view">
			<view class="cont" style="font-size: 28rpx;">
				信誉
				<view class="u-margin-top-22 u-padding-bottom-22 u-flex u-row-between nineColor u-border-bottom" style="font-size: 24rpx;">
					<view>
						交易数 <text class="threeColor u-margin-left-20">{{obj.tradingVolume}}</text>
					</view>
					<view>
						好评率 <text class="threeColor u-margin-left-20">{{obj.highPraiseRate}}%</text>
					</view>
					<view>
						差评数 <text class="threeColor u-margin-left-20">{{obj.negativeComment}}</text>
					</view>
					<view></view>
				</view>
				<view class="u-flex u-row-start u-padding-left-20 u-padding-right-20" style="flex-wrap:wrap;">
					<!--  -->
					<view class="blockView u-flex u-row-center" v-if="item.count != null && item.count != 0" v-for="(item,index) in obj.evaluationTypeList"
					 :key="index" data-id="item.evaluationTypeId">
						<view class="u-line-1" style="max-width: 110rpx;">{{item.name}} {{item.count}}</view> 
					</view>
				</view>
				<view class="u-flex u-font-md nineColor widthB u-row-center u-margin-top-20" @click="go">
					查看更多...
				</view>
			</view>
		</view>
		<button class="btn submitBtnBlue" v-if="this.type == 1" @click="getRateList()">指定承运</button>
		<button class="btn submitBtnDDD" v-else-if="this.type == 3" disabled="true">司机未支付,无法指定</button>
		<view></view>
	</view>
</template>

<script>
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	export default {
		data() {
			return {
				//司机id
				id: "",
				//货源id
				orderId: "",
				//订单id
				freightOrderId: "",
				obj: {},
				type: 1,
				//车牌号
				plateNumberName: ""
			}
		},
		onLoad(option) {
			//type 为2仅浏览司机信息
			this.type = option.type
			if (option.type == "2") {

			} else if (option.type == "1") {
				this.orderId = option.order
				this.freightOrderId = option.freightOrderId
			}
			this.id = option.id;

		},
		mounted() {
			ajax.get(config.cargoOwner_url, {
				userCode: this.id,
				type:2
			}).then(res => {
				
				console.log(res)
				if (res.code == 0) {
					this.obj = res.data
					this.obj.createTime = this.timers(this.obj.createTime)
					this.plateNumberName = this.obj.plateNumberName
					if (this.obj.plateNumberName != '' && this.obj.plateNumberName != null) {
						this.plateNumberName = this.plateNumberName.slice(0, 3) + "****" + this.plateNumberName.slice(6, 7)
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
				return y + '年' + MM + '月' + d + '日';
			},
			getRateList() {
				uni.showLoading({
					title: "正在指定承运",
					mask: true
				})

				ajax.put(config.ship_url + "/" + this.orderId + '/cargo-owner-confirm', {
					driverPhone: this.id
				}).then(res => {
					console.log(res)
					if (res.code == 0) {
						uni.hideLoading()

						uni.showToast({
							title: "指定承运成功",
							icon: "none",
							duration: 2000
						})
						setTimeout(() => {
							uni.navigateTo({
								url: "/pages/order/orderList/orderList"
							})
						}, 2000)
					} else if(res.code == -7044){
						uni.showToast({
							title: "接单司机已经取消订单",
							icon: "none",
							duration: 2000
						})
						setTimeout(() => {
							uni.navigateBack()
						}, 2000)
					}else {
						uni.showToast({
							title: "指定承运失败，请重试",
							icon: "none",
							duration: 2000
						})
					}
				}).catch(err => {
					//ajax.js反馈的reject结果
					console.log(err)
				})

			},
			go() {
				uni.navigateTo({
					url: "/pages/goods/driverAssess/driverAssess?phone=" + this.id
				})
				//pages/goods/driverAssess/driverAssess
			}
		}
	}
</script>

<style scoped lang="scss">
	.view {
		padding: 0 30rpx;

		.cont {
			margin-top: 30px;
			padding: 20rpx;
		}
	}

	.blockView {
		width: 176rpx;
		height: 48rpx;
		border-radius: 8rpx;
		background-color: #EEEEEE;
		border: 2rpx solid #ddd;
		margin-right: 20rpx;
		text-align: center;
		line-height: 45rpx;
		margin-top: 20rpx;
		color: #666666;
		font-size: 20rpx;

	}

	.blockView:nth-of-type(3n) {
		margin-right: 0;
	}

	.submitBtnBlue,
	.submitBtnDDD {
		position: absolute;
		bottom: 60rpx;
		left: 30rpx;
	}

	.brief {
		width: 100%;
		height: 100vh;

		.briefCont {
			margin: 20rpx auto auto auto;
			width: 92%;
			height: auto;
			background: #FFFFFF;
			box-shadow: 0rpx 2rpx 8rpx #C8C8C8;
			border-radius: 8rpx;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-end;

			.briefCont-top {
				width: 95%;
				height: 130rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.briefCont-top-left {
					height: 100%;
					padding: 10rpx 0;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items: flex-start;

					.briefCont-top-left-top {
						display: flex;
						justify-content: flex-start;
						align-items: center;

						.briefCont-top-left-top-text {
							font-size: 32rpx;
							color: #333333;
						}

						.briefCont-top-left-top-tit {
							width: 120rpx;
							height: 36rpx;
							padding: 0 10rpx;
							text-align: center;
							line-height: 36rpx;
							background: #07CC10;
							border-radius: 8rpx;
							font-size: 20rpx;
							color: #F8F8F8;
							margin-left: 20rpx;
						}

						.briefCont-top-left-top-tit.active {
							color: #fff;
							background: #ccc;
						}
					}

					.briefCont-top-left-bot {
						font-size: 24rpx;
						color: #999999;
					}
				}

				.briefCont-top-rig {
					margin-right: 36rpx;
					height: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}

			.briefCont-bot {
				width: 95%;
				height: 80rpx;
				display: flex;
				border-top: 2rpx solid #eeeeee;
				justify-content: space-between;
				align-items: center;

				.briefCont-bot-left {
					font-size: 28rpx;
					font-weight: 400;
					color: #333333;
				}

				.briefCont-bot-rig {
					margin-right: 36rpx;
					font-size: 24rpx;
					color: #333333;
				}
			}
		}
	}
</style>
<style scoped>
	@import '../../../components/font/iconfont.css';
</style>
