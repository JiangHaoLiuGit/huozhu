<template>
	<view class="page">
		<u-navbar back-text="" :isBack="false" title="我的" title-color="#ffffff" back-icon-color="#333" :background="{ background: '#0080FF' }" :borderBottom="false">
			<view slot="right" class="u-padding-right-40" @click="goInfo">
				<icon class="iconfont iconshezhi"></icon>
			</view>
		</u-navbar>
		<!-- <u-navbar back-text="" :isBack="false" title="我的" title-color="#ffffff" :background="{ background: '#0080FF' }" :borderBottom="false">
			<view slot="right" class="u-padding-right-40" @click="goInfo">
				<icon class="iconfont iconshezhi"></icon>
			</view>
		</u-navbar> -->
		<view class="my">
			<view class="myImg u-flex por">
				<view class="image" @click="goInfo">
					<icon class="iconfont userImg icontouxiang1" v-if="userImg == ''"></icon>
					<image :src="userImg" v-else></image>
				</view>
				<view class="phone">
					<view class="call">
						<text v-if="obj.idCardName != null && obj.idCardName != ''">
							{{obj.idCardName}}
						</text>
						<text v-else>
							{{phoneList}}
						</text>
						
					</view>
					<view class="rest u-flex widthB">
						<!-- 韩工说未认证的不需要显示 -->
						<view class="add active u-flex" v-if="userCertificationStatus == 1">
							实名认证
						</view>
						<view class="add u-flex" v-else>
							实名认证
						</view>
						<view class="add active u-flex" v-if="enterpriseCertificationStatus == 1">
							企业认证
						</view>
						<view class="add u-flex" v-else>
							企业认证
						</view>
						<view class="mastColor smallText poa" v-if="enterpriseCertificationStatus == 0 || userCertificationStatus == 0" style="color: #007AFF;bottom: 6rpx;right: 14rpx;" @click="ren">
							立即认证>>
						</view>
					</view>
				</view>
			</view>
			<view class="cont u-flex u-row-between u-margin-top-50" @click="yu">
				<view class="title">
					我的余额
				</view>
				<view class="item u-flex">
					<view class="yuan u-flex">
						<view class="number">{{availableBalance}}</view> 元
					</view>
					<icon class="iconfont right iconfanhui-you"></icon>
				</view>
			</view>
			<view class="cont u-margin-top-20">
				<view class="u-flex u-row-between" @click="go" data-index="-1">
					<view class="title">
						我的订单
					</view>
					<view class="item u-flex">
						<view class="oll nineColor smallText">
							全部订单
						</view>
						<icon class="iconfont right iconfanhui-you"></icon>
					</view>
				</view>
				<view class="list u-flex u-row-between">
					<view class="li" @click="go" data-index="3">
						<icon class="iconfont iconyunshuzhong-wode" style="color: #07CC10;"></icon>
						<text>运输中</text>
					</view>
					<view class="li" @click="go" data-index="4">
						<icon class="iconfont icondaizhifu-wode" style="color: #FFCC52;"></icon>
						<text>待支付</text>
					</view>
					<view class="li" @click="go" data-index="5">
						<icon class="iconfont icondaipingjia-wode" style="color: #5252FF;"></icon>
						<text>待评价</text>
					</view>
					<view class="li" @click="go" data-index="6">
						<icon class="iconfont icondaiqueren-wode" style="color: #999999;"></icon>
						<text>已完成</text>
					</view>
					<view class="li" @click="go" data-index="7">
						<icon class="iconfont icondaiqueren-wode" style="color: #999999;"></icon>
						<text>已取消</text>
					</view>
				</view>
			</view>
			<view class="cont u-margin-top-20">
				<view class="u-flex u-row-between">
					<view class="title" style="font-size: 28rpx;">
						常用服务
					</view>
				</view>
				<view class="list u-flex" style="justify-content: space-between;">
					<view class="li" @click="assess">
						<icon class="iconfont iconwodepingjia" style="color: #3399FF;"></icon>
						<text>我的评价</text>
					</view>
					<view class="li" @click="myCar">
						<icon class="iconfont iconwodeshuche" style="color: #3399FF;"></icon>
						<text>我的熟车</text>
					</view>
					<view class="li" @click="call">
						<icon class="iconfont iconkefuzhongxin" style="color: #3399FF;"></icon>
						<text>客服中心</text>
					</view>
					<view class="li" @click="xieyi(1)">
						<icon class="iconfont iconyijianfankui" style="color: #3399FF;"></icon>
						<text>隐私政策</text>
					</view>
					<view class="li" @click="xieyi(2)">
						<icon class="iconfont iconyijianfankui" style="color: #3399FF;"></icon>
						<text>用户协议</text>
					</view>
				</view>
			</view>
		</view>
		<u-tabbar v-model="current" :before-switch="beforeSwitch" height="140" inactive-color="#333333" icon-size="40"
		 active-color="#0080FF" :list="list"></u-tabbar>
	</view>
</template>

<script>
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	export default {
		data() {
			return {
				userImg:"",
				phone:"",
				obj:"",
				phoneList:"",
				availableBalance:0,
				enterpriseCertificationStatus:0,
				userCertificationStatus:0,
				//底部tab的内容
				list: [{
						iconPath: "../../../static/tabBar01.png",
						selectedIconPath: "../../../static/tabBar02.png",
						text: '发货',
						customIcon: false
					},
					{
						iconPath: "../../../static/tabBar03.png",
						selectedIconPath: "../../../static/tabBar04.png",
						text: '消息',
						customIcon: false
					},
					{
						iconPath: "../../../static/tabBar05.png",
						selectedIconPath: "../../../static/tabBar06.png",
						text: '订单',
						customIcon: false
					},
					{
						iconPath: "../../../static/tabBar07.png",
						selectedIconPath: "../../../static/tabBar08.png",
						text: '我的',
						isDot: false,
						customIcon: false
					},
				],
				current: 3,
			}
		},
		onLoad(option) {
			
			
		},
		onShow(){
			let data = {
				type:1
			}
			//#ifdef APP-PLUS
			let pinf = plus.push.getClientInfo()
			let cid = pinf.clientid;
			data.cid = cid
			//#endif
			ajax.get(config.ownerInfo_url,data).then(res => {
				console.log(res)
				if(res.code == 0){
					this.obj = res.data
					this.enterpriseCertificationStatus = res.data.enterpriseCertificationStatus
					this.userCertificationStatus = res.data.userCertificationStatus
					this.phone = res.data.phone
					let phones = res.data.phone
					if(res.data.headPortrait != null && res.data.headPortrait != "" && res.data.headPortrait != undefined && res.data.headPortrait.slice(0,6) != "/ajaxI"){
						this.userImg = res.data.headPortrait
					}
					this.availableBalance = res.data.availableBalance
					this.availableBalance = this.availableBalance.toFixed(2)
					this.phoneList = phones.slice(0,3) + "****" + phones.slice(7,11)
					
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
			xieyi(x){
				if(x == 1){
					uni.navigateTo({
						url: "/pages/user/pact/privacyPolicy/privacyPolicy",
					});
				}else if(x == 2){
					uni.navigateTo({
						url: "/pages/user/pact/userServer/userServer",
					});
					
				}
			},
			call(){
				let phone = this.$store.state.phoneNumber
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
			},
			ren(){ 
				if(this.userCertificationStatus == 0){
					uni.navigateTo({
						url: "/pages/attest/attest/attest?type=3"
					})
				}
				if(this.enterpriseCertificationStatus == 0){
					if(this.userCertificationStatus == 0){
						return
					}
					uni.navigateTo({
						url: "/pages/attest/attestFirm/attestFirm?type=3"
					})
				}
			},
			myCar(){
				// pages/user/myCar/myCar
				uni.navigateTo({
					url: "/pages/user/myCar/myCar"
				})
			},
			assess(){
				// pages/user/myCar/myCar
				uni.navigateTo({
					url: "/pages/user/assess/assess"
				})
			},
			yu(){
				uni.navigateTo({
					url: "/pages/user/over/over"
				})
			},
			goInfo(){
				// pages/user/myInfo/myInfo
				uni.navigateTo({
					url: "/pages/user/myInfo/myInfo"
				})
			},
			beforeSwitch(index) {
				let routes = getCurrentPages();
				let curRoute = routes[routes.length - 1].route;
				if (index == 0 && curRoute != 'pages/goods/sendGoods/sendGoods') {
					uni.reLaunch({
						url: "/pages/goods/sendGoods/sendGoods"
					})
				} else if (index == 1 && curRoute != 'pages/user/news/news') {
					uni.reLaunch({
						url: "/pages/user/news/news"
					})
				} else if (index == 2 && curRoute != 'pages/order/orderList/orderList') {
					uni.reLaunch({
						url: "/pages/order/orderList/orderList"
					})
				} else if (index == 3 && curRoute != 'pages/user/my/my') {
					uni.reLaunch({

						url: "/pages/user/my/my"
					})
				}
			},
			go(e){
				let index = e.currentTarget.dataset.index
				uni.navigateTo({
					url: "/pages/order/orderList/orderList?type="+index
				})
			}
		}
	}	
</script>

<style scoped lang="less">
	
	.my{
		padding: 50rpx 30rpx;
		.cont{
			padding: 24rpx 20rpx;
			.list{
				margin-top: 26rpx;
				.li{
					width: 100rpx;
					text-align: center;
					icon{
						font-size: 40rpx;
						display: block;
					}
					text{
						display: block;
						color: #666666;
						font-size: 24rpx;
						line-height: 32rpx;
						margin-top: 10rpx;
					}
				}
			}
			.title{
				color: #333333;
				font-size: 32rpx;
				line-height: 42rpx;
			}
			.item{
				.yuan{
					color: #333333;
					font-size: 28rpx;
					line-height: 38rpx;
					
					.number{
						color: #333333;
						font-size: 36rpx;
						line-height: 48rpx;
						font-weight: bold;
						margin-right: 20rpx;
					}
				}
				.right{
					display: block;
					margin-left: 20rpx;
					font-size: 14rpx;
					color: #999;
					line-height: 30rpx;
				}
			}
			
		}
		.myImg{
			padding: 0 20rpx;
			.image{
				width: 100rpx;
				height: 100rpx;
				image{
					width: 100rpx;
					height: 100rpx;
					border-radius: 8rpx;
				}
				.userImg{
					position: relative;
					top: 10rpx;
					font-size: 100rpx;
					color: #0080FF;
				}
			}
			.phone{
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				padding-left: 48rpx;
				height: 100rpx;
				.call{
					color: #333;
					font-size: 36rpx;

					font-weight: 400;
				}
				.rest{
					.add{
						width: max-content;
						height: 36rpx;
						padding: 0 20rpx;
						background-color: #eee;
						font-size: 20rpx;
						color: #999;
						border-radius: 8rpx;
						margin-right: 20rpx;
					}
					.add.active{
						background-color: #07CC10;
						color: #F8F8F8;
					}
				}
			}
		}
	}
	.iconshezhi{
		font-size: 30rpx;
		color: #333;
	}
	
</style>
<style scoped>
	@import '../../../components/font/iconfont.css';
	
</style>