<template>
	<view class="page">
		<u-navbar :is-back="isBack" :title="title" >
			<view slot="right" v-if="type == 1 && typePage == 1" class="masterColor u-padding-right-40" @click="to">跳过</view>
			<view slot="right" v-if="type == 2 && typePage == 2" class="masterColor u-padding-right-40" @click="to">跳过</view>
		</u-navbar>
		<view class="contents" v-if="type == 1">
			<icon class="iconfont iconchenggong" style="color: #07cc10;font-size: 140rpx;"></icon>
			<!-- <image class="titleImage" src="../../../static/pic09.png"></image> -->
			<view class="title" v-if="typePage == 1">实名认证  审核通过</view>
			<view class="title" v-else-if="typePage == 2">企业认证  审核通过</view>
			<!-- 认证失败 -->
			<view style="width: 552rpx;margin: 0 auto;" v-if="typePage == 1" class="inText threeColor">恭喜您，已经实名认证完成，您可以去正常使用其它功能！</view>
			<view style="width: 552rpx;margin: 0 auto;" v-else-if="typePage == 2" class="inText threeColor">恭喜您，企业信息认证完成，您可以去正常使用其它功能！</view>
			<!-- 恭喜您，企业信息认证完成，您可以去正常使用其它功能！ -->
		</view>
		<view class="contents" v-else-if="type == 2">
			<icon class="iconfont iconshibai" style="color: #fc441c;font-size: 140rpx;"></icon>
			<view class="title">认证失败</view>
			<view style="width: 552rpx;margin: 0 auto;" v-if="typePage == 1" class="inText threeColor">请重新拍摄并上传。请注意确保身份证信息清晰，边框完整。</view>
			<view style="width: 552rpx;margin: 0 auto;" v-else-if="typePage == 2" class="inText threeColor">请重新拍摄并上传。请注意确保营业执照信息清晰，边框完整。</view>
		</view>
		<button class="u-margin-bottom-20 btnTypeTwo" v-if="type == 1 && typePage == 1" @click="to1">前往企业认证页面</button>
		<button class="u-margin-bottom-20 btnTypeTwo" v-else-if="type == 1 && typePage == 2" @click="to">进行发货</button>
		<button class="u-margin-bottom-20 btnTypeTwo" v-else-if="type == 2" @click="to2">重新认证</button>
	</view>
</template>

<script>
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	export default {
		data() {
			return {
				//成功
				type:0,
				//1代表的是身份证,2是营业执照
				typePage:0,
				title:"",
				isBack:false
			}
		},
		onLoad(option) {
			if(option.type){
				this.type = option.type
			}
			if(option.typePage){
				this.typePage = option.typePage
				if(option.typePage == 1){
					this.title = "货主实名认证"
				}else if(option.typePage == 2){
					this.title = "企业信息认证"
				}
				
				if(option.typePage == 1 && option.type ==2){
					this.isBack = true
				}else if(option.typePage == 2 && option.type ==2){
					this.isBack = true
				}
			}
			
		},
		methods: {
			to(){
				//去配货大厅
				//
				uni.reLaunch({
					url:"/pages/goods/sendGoods/sendGoods"
				})
			},
			to1(){
				//去企业认证
				uni.redirectTo({
					url:"/pages/attest/attestFirm/attestFirm"
				})
			},
			to2(){
				//去重新身份认证
				if(this.typePage == 1){
					uni.redirectTo({
						url:"/pages/attest/attest/attest"
					})
				}else if(this.typePage == 2){
					uni.redirectTo({
						url:"/pages/attest/attestFirm/attestFirm"
					})
				}
			}
		}
	}	
</script>

<style scoped lang="less">
	
	.btnTypeTwo{
		width: 690rpx;
		height: 80rpx;
		background-color: #3399FF;
		border: 2rpx solid #0080FF;
		color: #fff;
		line-height: 80rpx;
		font-size: 32rpx;
		position: absolute;
		bottom: 50rpx;
		left: 30rpx;
	}
	.btnTypeTwo.active{
		background-color: #CCCCCC;
		border: 2rpx solid #BFBFBF;
		color: #333333;
	}
	.contents{
		
		text-align: center;
		padding-top: 200upx;
		.titleImage{
			width: 160rpx;
			height: 160rpx;
		}
		.title{
			font-size: 32rpx;
			line-height: 42rpx;
			color: #333;
			font-weight: bold;
			margin: 40rpx 0 22rpx;
		}
	}
	
</style>
<style scoped>
	@import '../../../components/font/iconfont.css';
	
</style>
