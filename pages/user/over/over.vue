<template>
	<view class="page">
		<u-navbar title="" :isBack="false" title-color="#F8F8F8" back-icon-color="#333" :background="{ background: '#0080FF' }">
			<!-- 发货平台 -->
			<view class="slot-wrap center u-flex u-row-between widthB u-padding-left-30 u-padding-right-30">
				<!--  class="u-margin-right-80" -->
				<image src="../../../static/pic17.png" style="width: 20rpx;" @click="tui" mode="widthFix"></image>
				<view class="title fffColor u-padding-left-50">余额</view>
				<!-- 快速发货 -->
				<view class="title fffColor" @click="bill">账单明细</view>
			</view>
			<!-- <view slot="right" class="slotRight u-padding-right-40" @click="to1">快速重发</view> -->
		</u-navbar>
		<!-- <u-navbar back-text="" custom-back="fan"  title="余额" title-color="#ffffff" back-icon-color="#333" :background="{ background: '#0080FF' }" :borderBottom="false">
			<view slot="right" class="fffColor u-padding-right-40" @click="bill">
				账单明细
			</view>
		</u-navbar> -->
		<view class="conts">
			<view class="cont">
				<view class="first">总金额(元)</view>
				<view class="secon">{{money}}</view>
				<view class="bm u-flex">
					<view class="view" @click="go1">
						<view class="one inText threeColor">提现</view>
						<view class="two u-font-ss nineColor">转出到第三方</view>
					</view>
					<!-- class="view two" -->
					<view class="view two" @click="go2">
						<view class="one inText threeColor">充值</view>
						<view class="two u-font-ss nineColor">快速到账</view>
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
				money:""
			}
		},
		onLoad(option) {
			
		},
		onShow(){
			ajax.get(config.user_url,{
			}).then(res => {
				console.log("货主个人信息")
				console.log(res)
				if(res.code == 0){
					this.money = res.data.availableBalance
					this.money = this.money.toFixed(2)
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
		methods: {
			tui(){
				uni.navigateTo({
					url: "/pages/user/my/my"
				})
			},
			fan(){
				console.log("我草")
			},
			go1(){
				uni.navigateTo({
					url: "/pages/user/draw/draw"
				})
			},
			go2(){
				uni.navigateTo({
					url: "/pages/user/charge/charge"
				})
			},
			bill(){
				
				uni.navigateTo({
					url: "/pages/user/bill/bill"
				})
			}
		}
	}	
</script>

<style scoped lang="less">
	
	.conts{
		padding: 50rpx 30rpx 0;
		.cont{
			text-align: center;
			.bm{
				border-top: 2rpx solid #f5f5f5;
				text-align: center;
				.view{
					
					padding: 20rpx 0;
					text-align: center;
					width: 100%;
					// width: 50%;

					.one{
					}
					.two{
						
					}
				}
				.view.two{
					border-left: 2rpx solid #f5f5f5;
				}
			}
			.first{
				padding-top: 80rpx;
				font-size: 28rpx;
				color: #999999;
				line-height: 39rpx;
				margin-bottom: 42rpx;
			}
			.secon{
				font-size: 60rpx;
				line-height: 80rpx;
				color: #333;
				padding-bottom: 84rpx;
			}
		}
	}
	
</style>
<style scoped>
	@import '../../../components/font/iconfont.css';
	
</style>
