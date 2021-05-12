<template>
	<view class="orderRate">
		<u-navbar back-text="" title-color="#ffffff" title="订单评价" :background="{ background: '#0080FF' }" :border-bottom="false"></u-navbar>
		<view class="rateContent">
			<view class="rateContent-top">
				<view class="rateContent-top-text">总体评价</view>
				<u-rate inactive-icon="star-fill" min-count="1" inactive-color="#E6E6E6" active-color="#FEC24D" size="32" :count="starCount"
				 @change="rateContChange" v-model="starValue"></u-rate>
				<view class="rateContent-top-text" style="margin-left: 30rpx;">{{ starValue == 1 || starValue == 2 ? '差评' : starValue == 3 ? '中评' : starValue == 4 || starValue == 5 ? '好评' : '' }}</view>
			</view>
			<view class="rateContent-bot">
				<view class="rateContent-top-text" style="width: 116rpx;"></view>
				<view class="scoreContent-bot-con">
					<view @click="rateChange(item)" v-for="(item, index) in rateList" :key="index" class="type" :class="{ checkType: checkedList.indexOf(item) != -1 }">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<view class="rateButton">
			<button class="rateBtn" @click="orderRate(starValue)">提交</button>
		</view>
	</view>
</template>

<script>
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	export default {
		data() {
			return {
				// 星级数量
				starCount: 5,
				// 默认选中星级
				starValue: 5,
				// 评价列表
				rateList: [],
				// 选中的评价
				checkedList: [],
				orderId: ""
			}
		},
		mounted() {
			this.getRateList(5);
		},
		onLoad(option) {
			this.orderId = option.id
		},
		methods: {
			// 确认评价
			orderRate(score) {
				let rateId = [];
				let rateIds = '';
				this.checkedList.forEach(item => {
					rateId.push(item.id);
				})
				rateIds = rateId.join(',');
				
				this.evaluate(score, rateIds);
			},

			// 订单评价
			evaluate(score, ids) {
				uni.showLoading({
					title: "评价中,请稍后...",
					mask: true
				})
				ajax.put(config.rate_url + `/${this.orderId}/evaluate`, {
					score: score,
					evaluate: ids,
					evaluationType: "1"
				}).then(res => {
					// console.log(res)
					if (res.code == 0) {
						uni.hideLoading()
						uni.showToast({
							title: "评价成功",
							icon: "none",
							duration: 2000
						})
						setTimeout(() => {
							// uni.navigateTo({
							// 	url:"/pages/order/orderList/orderList"
							// })
							uni.navigateBack()
						}, 2000)
					} else {
						uni.showToast({
							title: "评价失败，请重新评价",
							icon: "none",
							duration: 2000
						})
					}
				}).catch(err => {
					uni.showToast({
						title: "评价失败，请重新评价",
						icon: "none",
						duration: 2000
					})
					console.log("订单评价数据返回失败 error is :" + err);
				})
			},

			// 评价内容
			rateChange(obj) {
				// 保存items
				if (this.checkedList.indexOf(obj) === -1) {
					// 不存在,则添加
					this.checkedList.push(obj);
				} else {
					// 存在,则删除
					this.checkedList.splice(this.checkedList.indexOf(obj), 1);
				}
			},

			// 评价内容根据星级变动
			rateContChange(val) {
				this.rateList = [];
				this.checkedList = [];
				this.getRateList(val);
			},

			// 获取评价列表
			getRateList($score) {
				ajax.get(config.rateType_url, {
					type: 1,
					score: $score,
				}).then(res => {
					if (res.code == 0) {
						console.log(res)
						this.rateList = res.data;
					}else {
						uni.showToast({
							title: "网络错误,请重试",
							icon: 'none',
							duration: 2000
						})
					}
				}).catch(err => {
					console.log("获取评价列表数据返回失败 error is :" + err);
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.orderRate {
		width: 100%;
		height: 100vh;
		position: relative;

		.rateContent {
			width: 92%;
			margin: 20rpx auto 0 auto;
			min-height: 304rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 2rpx 8rpx #C8C8C8;
			border-radius: 8rpx;
			display: flex;
			flex-direction: column;
			align-items: flex-end;

			.rateContent-bot {
				width: 96%;
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
				margin-bottom: 30rpx;

				.rateContent-top-text {
					margin: 15rpx 30rpx 0 0;
					font-size: 28rpx;
					color: #666666;
				}

				.scoreContent-bot-con {
					width: 75%;
					margin-top: 10rpx;
					display: flex;
					justify-content: flex-start;
					flex-wrap: wrap;
					align-items: center;

					.type {
						width: 140rpx;
						margin-top: 20rpx;
						height: 48rpx;
						line-height: 48rpx;
						background: #eeeeee;
						border-radius: 8rpx;
						border: 2px solid #DDDDDD;
						font-size: 20rpx;
						display: flex;
						color: #666666;
						justify-content: center;
						align-items: center;
						margin-right: 34rpx;
					}

					.type:nth-of-type(3n) {
						margin-right: 0;
					}

					.checkType {
						color: #3399FF;
						border: 2px solid #328CF8;
					}
				}
			}

			.rateContent-top {
				width: 96%;
				height: 80rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				border-bottom: 2rpx solid #eeeeee;

				.rateContent-top-text {
					margin-right: 30rpx;
					font-size: 28rpx;
					color: #666666;
				}
			}
		}

		.rateButton {
			width: 100%;
			height: 80rpx;
			position: absolute;
			bottom: 50rpx;

			.rateBtn {
				width: 92%;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				background: #3399FF;
				border: 2rpx solid #0080FF;
				box-shadow: 0rpx 6rpx 12rpx rgba(0, 0, 0, 0.16);
				font-size: 32rpx;
				color: #F8F8F8;
				margin: 0 auto;
			}
		}
	}
</style>
