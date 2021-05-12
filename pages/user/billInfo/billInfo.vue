<template>
	<view class="page">
		<u-navbar title="账单详情" back-icon-color="#333" :background="{ background: '#fff' }" :borderBottom="false">
			<view slot="right" class="u-padding-right-40" @click="call">
				联系客服
			</view>
		</u-navbar>
		<view class="sum">
			<view class="blue number u-flex u-row-center" :style="obj.transactionType==1 || obj.transactionType==8 ? 'color:#3399FF' : 'color:#FC441C'">
				<view class="family fontWeight u-margin-right-8" style="position: relative;bottom: 4rpx;"  v-text="obj.transactionType==1 || obj.transactionType==8 ? '+' : '-'"></view>
				<view>{{obj.balance}}</view>
			</view>
			<view class="inText threeColor u-flex u-row-center" v-if="obj.state == 0">交易失败</view>
			<view class="inText threeColor u-flex u-row-center" v-else-if="obj.state == 1">交易成功</view>
			<view class="inText threeColor u-flex u-row-center" v-else-if="obj.state == 2">提现中</view>
		</view>

		<view class="box">
			<view class="cont">
				<view class="conts u-flex u-row-center">
					<view class="left">
						交易说明
					</view>
					<!--  v-if="obj.transactionType == 1" -->
					<view class="right">
						{{ obj.title }}
					</view>
				</view>
				<view class="conts u-flex u-row-center" v-if="obj.transactionType==7 || obj.transactionType==6">
					<view class="left">
						支付方式
					</view>
					<view class="right" v-if="obj.paymentType == 1">
						支付宝
					</view>
					<view class="right" v-else-if="obj.paymentType == 2">
						微信
					</view>
					<view class="right" v-else-if="obj.paymentType == 3">
						银联
					</view>
					<view class="right" v-else-if="obj.paymentType == 4">
						钱包
					</view>
					<view class="right" v-else-if="obj.paymentType == 5">
						原路退回
					</view>
				</view>
				<view class="conts u-flex u-row-center">
					<view class="left">
						交易时间
					</view>
					<view class="right">
						{{obj.createTime}}
					</view>
				</view>
				<view class="conts u-flex u-row-center" v-if="obj.transactionType == 1 || obj.transactionType == 5 || obj.transactionType == 6">
					<view class="left">
						订单编号
					</view>
					<view class="right">
						<!-- transactionNo 订单编号暂时作废 -->
						{{obj.shippingOrderNo}}
					</view>
				</view>
				<view class="conts u-flex u-row-center" v-else>
					<view class="left">
						运单编号
					</view>
					<view class="right">
						{{obj.shippingOrderNo}}
					</view>
				</view>
				
			</view>
			<!-- <view class="cont u-margin-top-20">
				<view class="conts u-flex u-row-center">
					<view class="left">
						备注
					</view>
					<view class="right" style="color: #999;">
						对此次交易进行备注
					</view>
				</view>
			</view> -->

		</view>
	</view>
</template>

<script>
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	export default {
		data() {
			return {
				id: "",
				obj: {}
			}
		},
		onLoad(option) {
			if (option.id) {
				this.id = option.id
			}
		},
		onShow() {
			ajax.get(config.walletTransaction_url + "/" + this.id, {
				id: this.id
			}).then(res => {
				console.log("账单明细")
				console.log(res)
				if (res.code == 0) {
					res.data.balance = Number(res.data.balance).toFixed(2)
					res.data.createTime = this.timers(res.data.createTime)
					this.obj = res.data

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
			call() {
				let phone = this.$store.state.phoneNumber
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
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
				return y + '-' + MM + '-' + d + ' ' + h + ":" + m + ":" + s
			},
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

	.sum {
		margin-top: 60rpx;

		.number {
			font-size: 60rpx;
		}
	}

	.cont {
		box-shadow: none;

		.conts {
			width: 100%;
			padding-top: 0;
			margin: 0;
			padding-left: 22rpx;
			padding-right: 22rpx;

			.left {
				color: #666;
				font-size: 28rpx;
				width: 22%;
			}

			.right {
				color: #333;
				font-size: 28rpx;
				width: 78%;
				text-align: right;
			}
		}
	}

	.box {
		margin: 70rpx 0 0 0;
		padding: 0 30rpx;
	}
</style>
