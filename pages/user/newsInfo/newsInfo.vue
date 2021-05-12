<template>
	<view class="page">
		<!-- <u-navbar back-text="" back-icon-color="#333" title-color="#ffffff" :title="" :background="{ background: '#0080FF' }" :border-bottom="false">
			
		</u-navbar> -->
		<u-navbar title="" :isBack="false" title-color="#F8F8F8" back-icon-color="#333" :background="{ background: '#0080FF' }">
			<!-- 发货平台 -->
			<view class="slot-wrap center u-flex u-row-between widthB u-padding-left-30 u-padding-right-30">
				<!--  class="u-margin-right-80" -->
				
				<icon class="iconfont iconfanhui" style="font-size: 30rpx;color: #333 ;" @click="tui"></icon>
				<!-- <image src="../../../static/pic17.png" style="width: 20rpx;" mode="widthFix"></image> -->
				<view class="title fffColor">{{title}}</view>
				<!-- 快速发货 -->
				<view class="title fffColor"></view>
			</view>
			<!-- <view slot="right" class="slotRight u-padding-right-40" @click="to1">快速重发</view> -->
		</u-navbar>
		<view class="contOuter" v-if="info != ''">
			<view class="cont">
				<view class="conts">
					<view class="info">{{info}}</view>
					<view class="time">
						{{createTime}}
					</view>
				</view>
			</view>
		</view>
		<view class="img" v-else>
			<icon class="iconfont iconzanwutongzhi"></icon>
			<view class="text">
				暂无通知内容
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
				title:"运单通知",
				type:"",
				info:"",
				createTime:"",
				id:""
			}
		},
		onLoad(option) {
			if(option.type){
				this.type = option.type
				if(this.type == 1){
					this.title = "运单通知"
				}else if(this.type == 2){
					this.title = "账户通知"
				}else if(this.type == 3){
					this.title = "系统通知"
				}
			}
			if(option.id){
				this.id = option.id
			}
		},
		onShow(){
			ajax.get(config.message_url + "/" + this.id,{
				id:this.id
			}).then(res => {
				console.log(res)
				if(res.code == 0){
					this.info = res.data.content
					this.createTime = this.timers(res.data.createTime)
					console.log(this.createTime)
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
		}
		,
		methods: {
			tui(){
				uni.reLaunch({
					url: "/pages/user/news/news"
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
				return y + '-' + MM + '-' + d + ' ' + h + ":" + m + ":" + s
			},
		}
	}	
</script>

<style scoped lang="less">
	
	.contOuter{
		padding: 20rpx 30rpx;
		position: relative;
		.time{
			position: absolute;
			bottom: -30rpx;
			right: 30rpx;
			font-size: 20rpx;
			color: #999;
		}
		.conts{
			padding-bottom: 20rpx;
		}
	}
	.img{
		text-align: center;
		width: 100%;
		height: calc(100vh - 30rpx);
		padding-top: 352rpx;
		icon{
			font-size: 200rpx;
			color: #EEEEEE;
			margin-bottom: 38rpx;
		}
		.text{
			font-size: 40rpx;
			color: #EEEEEE;
			line-height: 54rpx;
		}
	}
	
</style>

<style scoped>
	@import '../../../components/font/iconfont.css';
	
</style>
