<template>
	<view class="page">
		<u-navbar back-text="" title="充值" title-color="#ffffff" back-icon-color="#333" :background="{ background: '#0080FF' }"
		 :borderBottom="false">
			<view slot="right" class="fffColor u-padding-right-40" @click="call">
				联系客服
			</view>
		</u-navbar>
		<view class="box">
			<view class="cont">
				<view class="conts te" @click="payShow = true">
					<view class="contslf">
						选择收款账户
					</view>
					<view class="contsct">
						<view class="u-flex u-row-right" v-if="type == 1">
							<icon class="iconfont iconweixin2" style="font-size: 40rpx;color: #1677ff;"></icon>
							<view class="" style="width: 120rpx;">支付宝</view>

						</view>
						<view class="u-flex u-row-right" v-else-if="type == 2">
							<icon class="iconfont iconweixin1" style="font-size: 40rpx;color: #19BE6B;"></icon>
							<view class="" style="width: 120rpx;">微信</view>
						</view>
						<view class="u-flex u-row-right" v-else-if="type == 4">
							<icon class="iconfont iconlingqianzhifu" style="font-size: 40rpx;color: #333;"></icon>
							<view class="" style="width: 130rpx;">钱包支付</view>
						</view>
					</view>
					<view class="contsrt">
						<icon class="iconfont iconfanhui-you nineColor" style="font-size: 14rpx;"></icon>
					</view>
				</view>
			</view>

			<view class="cont u-margin-top-20 u-margin-buttom-20">
				<view class="conts u-padding-top-20">
					<view class="widthB">
						<view class="inText threeColor">充值金额</view>
						<view class="money u-flex u-margin-bottom-20" style="border-bottom: 2rpx solid #F5F5F5;" @click="moneyShow = true">
							<view class="three fontWeight" style="font-size: 50rpx;">￥</view>
							<input type="text" disabled maxlength="10" v-model="tiMoney" placeholder="请输入充值金额" style="font-size: 30rpx;" class="u-padding-left-40">
							<u-keyboard :mask="false" mode="number" @change="goodsHfChange" @backspace="goodsHfDelete" v-model="moneyShow"></u-keyboard>
						</view>
					</view>
				</view>
			</view>
			<button class="submitBtnBlue btn u-margin-bottom-50" :class="tiMoney == ''?'submitBtnDDD':'submitBtnBlue'" :disabled="tiMoney == ''"
			 @click="tixian">充值</button>
		</view>
		<view class="warp" v-show="payShow" @tap="dian">
			<view class="rect u-padding-bottom-80" @tap.stop>
				<view class="top u-padding-left-50 u-padding-top-20 u-padding-bottom-22 u-padding-right-50 u-flex u-row-between">
					<image src="../../../static/pic17.png" style="width: 20rpx;" mode="widthFix" @click="payShow = false"></image>
					<text class="u-font-xl fontWeight threeColor">请选择您的支付方式</text>
					<view></view>
				</view>
				<s class="twoS"></s>
				<view style="height: 80rpx;" class="u-flex u-row-center" data-index="zhifubao" @click="payMoney">
					<!-- iconweixin1 -->
					<icon class="iconfont first iconweixin2" style="font-size: 40rpx;color: #1677ff;"></icon>
					<view class="u-margin-left-32" style="width: 150rpx;color:#000;text-align:left;">支付宝</view>
				</view>
				<!-- <s class="oneS" style="background: #f4f4f4;"></s>
				<view style="height: 80rpx;" class="u-flex u-row-center" data-index="weixin" @click="payMoney">
					<icon class="iconfont first iconweixin1" style="font-size: 40rpx;color: #3abf11;"></icon>
					<view class="u-margin-left-32" style="width: 150rpx;color:#000;text-align:left;">微信</view>
				</view> -->

				<!-- <s class="oneS" style="background: #f4f4f4;"></s>
				<view style="height: 80rpx;" class="u-flex u-row-center" data-index="qianbao" @click="payMoney">
					<icon class="iconfont first iconlingqianzhifu" style="font-size: 40rpx;color: #333;"></icon>
					<view class="u-margin-left-32" style="width: 150rpx;color:#000;text-align:left;">钱包支付</view>
				</view> -->
			</view>
		</view>
		<u-popup v-model="show" borderRadius="20" mode="center" :closeable="true" :maskCloseAble="false">
			<view class="showErr">
				<view class="point">
					<text class="title">温馨提示</text>
					<text class="err">{{showErr}}</text>
				</view>
				<button class="btnShu" @click="btnShu">{{btnText}}</button>
			</view>
		</u-popup>
		<u-popup v-model="show1" borderRadius="20" mode="center" :closeable="true" :maskCloseAble="false">
			<view class="showErr">
				<view class="point">
					<text class="title" style="padding-top: 50rpx;font-size: 32rpx;">{{showErr1}}</text>
					<text class="err threeColor u-padding-top-56" style="font-size: 60rpx;line-height: 80rpx;color: #333;font-weight: bold;">￥{{tiMoney}}</text>
				</view>
				<button class="btnShu" @click="btnShu1">{{btnText1}}</button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	export default {
		data() {
			return {
				show1: false,
				showErr1: "",
				money: "11.00",
				type: 1,
				payShow: false,
				userHao: "",
				tiMoney: "",
				moneyShow:false,
				show: false,
				showErr: "",
				btnText: "确定",
				btnText1: "确定",
				tis: "",
				tradeNO: "",
				moneys: ""
			}
		},
		onLoad(option) {
			if (option.money) {
				this.money = option.money
			}
		},
		onShow() {
			
		},
		methods: {
			//数字框
			goodsHfChange(val){
				 if(this.tiMoney.length <= 10){
					 if(val == '.'){
						 if(this.tiMoney.indexOf(".") != -1){
							 this.tiMoney = parseFloat(this.tiMoney)
							 this.tiMoney += ""
							 return
						 }
					 }
					 this.tiMoney += val
				 }
			},
			goodsHfDelete(){
				this.tiMoney += ""
				if(this.tiMoney){
					this.tiMoney = this.tiMoney.substr(0,this.tiMoney.length - 1)
				}
			},
			call() {
				let phone = this.$store.state.phoneNumber
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
			},
			btnShu() {
				this.show = false
				console.log(this.showErr)
				if (this.showErr == "充值成功,请查收") {
					uni.redirectTo({
						url: "/pages/user/over/over"
					})
				}

			},
			dian() {
				this.payShow = false
			},
			btnShu1() {
				this.show1 = false
				let moneyType = ''
				if (this.type == 1) {
					moneyType = "ALY_PAY"
				} else if (this.type == 2) {
					moneyType = "WEIXIN_PAY"
				} else if (this.type == 3) {
					moneyType = "UNION_PAY"
				} else if (this.type == 4) {
					moneyType = "PURSE_PAY"
				}
				//this.tis金额 this.userHao账号 去提现
				console.log(this.tis)
				console.log(this.userHao)
				// recharge_url
				//支付宝支付

				ajax.post(config.recharge_url, {
					//1是充值
					transactionType: "1",
					balance: this.tis,
					paymentType: this.type,
					paymentMethod: moneyType
				}).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.tradeNO = res.data.tradeNO
						let _this = this
						uni.requestPayment({
							provider: 'alipay',
							orderInfo: this.tradeNO,
							success: function(res) {
								_this.show = true
								_this.showErr = "充值成功,请查收"
								_this.this.tis = ''
								_this.type = "1"
								_this.show1 = false
							},
							fail: function(err) {
								console.log('fail:' + JSON.stringify(err));
							}
						});
					}else{
						uni.showToast({
							title:"网络错误,请重试",
							icon:'none',
							duration:2000
						})
					}
				}).catch(err => {
					//ajax.js反馈的reject结果
					console.log(err)
				})


			},
			ti() {
				this.tiMoney = this.money
			},
			payMoney(e) {
				let index = e.currentTarget.dataset.index
				console.log(index)
				if (index == "weixin") {
					this.type = 2
				} else if (index == "zhifubao") {
					this.type = 1
				}
				this.payShow = false
			},
			tixian() {
				this.moneys = this.tis
				this.tis = Number(this.tiMoney)
				this.tis = this.tis.toFixed(2)
				console.log(this.tis)
				if (this.tis == "0.00") {
					this.show = true
					this.showErr = "充值金额不能是0"
				} else {
					this.showErr1 = "充值到余额"
					this.show1 = true
				}

			}
		}
	}
</script>

<style scoped lang="less">
	.btn {
		position: absolute;
		bottom: 60rpx;
		left: 30rpx;
	}

	.warp {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100%;
		background-color: rgba(0, 0, 0, .3);
		z-index: 2000;

		.box {
			width: 100%;
			height: 100vh;
			position: relative;
		}

		.rect {
			position: absolute;
			left: 0;
			bottom: 0;
			color: #fff;
			height: auto;
			margin: 0;
			background-color: #fff;
		}
	}

	.box {
		padding: 50rpx 30rpx 0;

		.cont {
			box-shadow: none;

			.conts.te {
				text-align: center;

				.contslf {
					width: 180rpx;
					font-size: 28rpx;
					color: #333;
					line-height: 38rpx;
					padding-top: 6rpx;
				}

				.contsct {
					width: calc(100% - 180rpx - 54rpx);
				}

				.contsrt {
					width: 54rpx;

					// bottom:12rpx;
					icon {}
				}
			}
		}
	}
</style>
<style scoped>
	@import '../../../components/font/iconfont.css';
</style>
