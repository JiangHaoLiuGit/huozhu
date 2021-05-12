<template>
	<view class="page">
		<u-navbar title="账户注销" :background="{ background: '#fff' }" :borderBottom="false">
			<!-- <view slot="right" class="u-padding-right-40">我草</view> -->
		</u-navbar>
		<view class="u-padding-left-30 u-padding-right-30 u-padding-top-20 u-padding-bottom-28 fffBackground u-margin-top-24">
			<view class="block borderRadius u-flex">
				<!-- <icon class="iconfont iconsanjiao1 u-margin-left-34" style="font-size: 46rpx; color: #3399FF;"></icon> -->
				<image class="blockImg active u-margin-left-34" style="width: 44rpx;height: 44rpx;" src="../../../static/pic06.png"></image>
				<view class="blockText u-margin-left-30">
					您即将注销 <text class="masterColor u-padding-left-10 u-padding-right-10 fontWeight">{{phone}}</text> 的司机端账户
				</view>
			</view>
			<view class="sixColor smallText u-margin-bottom-12 u-margin-top-20">- 将同步注销该账户所绑定的货灵鸟货主账户。</view>
			<view class="sixColor smallText">- 请确保所有的交易已完结且无纠纷。注销后，您账户内的优惠券红包 积分 卡券及其他虚拟资产将视为您自动放弃。</view>
		</view>
		<view class="u-padding-left-30 u-padding-right-30 u-padding-top-20 u-padding-bottom-28 fffBackground u-margin-top-24">
			<view class="block borderRadius u-flex">
				
				<!-- <icon class="iconfont icongantanhao u-margin-left-34" style="font-size: 46rpx; color: #3399FF;"></icon> -->
				<image class="blockImg active u-margin-left-34" src="../../../static/pic07.png"></image>
				<view class="blockText u-margin-left-30">
					注销后，以下信息将被清空且无法找回
				</view>
			</view>
			<view class="step clearfix">
				<view class="sixColor smallText">1、身份信息 </view>
				<view class="sixColor smallText">2、账户信息 </view>
				<view class="sixColor smallText">3、交易记录</view>
				<view class="sixColor smallText">4、会员及权益信息</view>
				<view class="sixColor smallText">5、虚拟资产信息</view>
			</view>
		</view>
		<view class="call u-flex u-row-between u-padding-left-30 u-padding-right-30 fffBackground u-margin-top-24 u-margin-bottom-24">
			<text class="threeColor inText">如有疑问，请拨打客服电话。</text>
			
			<!-- <icon class="iconfont icontonghua" style="font-size: 46rpx; color: #3399FF;" @click="call"></icon> -->
			<image src="../../../static/pic08.png" style="width: 58rpx;height: 58rpx;" @click="call"></image>
		</view>
		<view class="points u-flex">
			<view :class="boxBlean == true?'box active':'box'" @click="boxBlean = !boxBlean">
				<view></view>
			</view>
			<view class="textView" @click="boxBlean = !boxBlean">我已阅读并同意<text class="masterColor" @click="to">《货灵鸟货主端平台账户注销须知》</text></view>
		</view>
		<button class="u-margin-bottom-20 u-margin-top-30" :class="boxBlean == false?'btnTypeTwo active':'btnTypeTwo'" :disabled="boxBlean == false" @click="to2">下一步</button>
		<u-popup v-model="show" borderRadius="20" mode="center" :closeable="true" :maskCloseAble="false">
			<view class="showErr">
				<view class="point">
					<text class="title">温馨提示</text>
					<text class="err">{{showErr}}</text>
				</view>
				<button class="btnShu masterColor" @click="btnShu">确认注销</button>
				<button class="btnShu" @click="show = false">暂不注销</button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:"",
				boxBlean:false,
				show:false,
				showErr:"",
				truePhone:"",
			}
		},
		onLoad(option) {
			if(option.phone){
				let phone = option.phone
				this.truePhone = option.phone
				option.phone = phone.slice(0,3) + "****" + phone.slice(7,11)
				this.phone = option.phone
				
			}
		},
		methods: {
			call(){
				let phone = this.$store.state.phoneNumber
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
			},
			btnShu(){
				console.log("注销")
				this.show = false
				uni.navigateTo({
					url:"/pages/user/logoutPhone/logoutPhone?phone=" + this.phone+"&truePhone="+this.truePhone
				})
			},
			to(){
				uni.navigateTo({
					url: "/pages/user/pact/cancellationNotice/cancellationNotice",
				});

			},
			to2(){
				this.show = true
				this.showErr = "请确认账户注销，一旦确认无法恢复"
			}
		}
	}	
</script>

<style scoped lang="less">
	
	.showErr{
		
		.point{
			.err{
				width: 520rpx;
				margin: 0 auto;
			}
		}
		.btnShu{
			color: #333333;
			width: 50%;
			float: left;
			border: none;
			border-top: 2rpx solid #DDDDDD;
			border-radius: 0;
		}
		.btnShu.masterColor{
			color: #3399FF;
			border-right: 2rpx solid #dddddd;
		}
		.btnShu:after{
			content: none;
		}
		.btnTypeTwo{
			width: 560rpx;
			height: 80rpx;
			background-color: #3399FF;
			border: 2rpx solid #0080FF;
			color: #fff;
			line-height: 80rpx;
			font-size: 32rpx;
		}
		.btnTypeTwo.active{
			background-color: #FFFFFF;
			border: 2rpx solid #DDDDDD;
			color: #333;
		}
	}
	.points{
		padding: 0 30upx;
		.textView{
			padding-left: 14rpx;
			color: #999999;
			font-size: 24rpx;
			line-height: 32rpx;
		}
		.box{
			width: 36rpx;
			height: 36rpx;
			border: 2rpx solid #999;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			view{
				width: 20rpx;
				height: 20rpx;
				background-color: #f8f8f8;
				border-radius: 50%;
			}
		}
		.box.active{
			border-color: #3399FF;
			view{
				background-color: #3399FF;
			}
		}
	}
	.btnTypeTwo{
		width: 690rpx;
		height: 80rpx;
		background-color: #3399FF;
		border: 2rpx solid #0080FF;
		color: #fff;
		line-height: 80rpx;
		font-size: 32rpx;
		position: absolute;
		bottom: 100rpx;
		left: 30rpx;
	}
	.btnTypeTwo.active{
		background-color: #CCCCCC;
		border: 2rpx solid #BFBFBF;
		color: #333333;
	}
	.block{
		width: 100%;
		height: 72rpx;
		background: rgba(21, 128, 252, 0.2);
		.blockImg{
			width: 44rpx;
			height: 44rpx;
		}
		.blockImg.active{
			height: 52rpx;
		}
		.blockText{
			font-size: 28rpx;
			color: #333;
			
		}
	}
	.step{
		
		view{
			float: left;
			width: 230rpx;
			padding-top: 30rpx;
		}
	}
	.call{
		height: 80upx;
	}
	
</style>
<style scoped>
	@import '../../../components/font1/iconfont.css';
	
</style>
