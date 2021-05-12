<template>
	<view class="page">
		<u-navbar title="指定司机" title-color="#F8F8F8" back-icon-color="#333" :background="{ background: '#0080FF' }" >
			<!-- <view slot="right" class="slotRight u-padding-right-40" @click="to1">快速重发</view> -->
		</u-navbar>
		<view class="search">
			<view class="box u-flex">
				<image src="../../../static/pic42.png" class="u-margin-right-20" style="width: 24rpx;" mode="widthFix"></image>
				<input type="text" placeholder=" 输入司机手机号进行查找" v-model="phone" maxlength="11" @input="findDriver">
			</view>
		</view>
		<view class="box">
			<view class="cont" v-for="(item , index) in list" :key="index">
				<view class="tp u-flex" @click="jin(item.creator)">
					<image v-if="item.headPortrait != ''" :src="item.headPortrait" style="width: 40rpx;height: 40rpx;" mode="scaleToFill"></image>
					<image v-else src="../../../static/pic41.png" style="width: 40rpx;height: 40rpx;" mode="aspectFit"></image>
					<view class="name u-margin-left-16 u-margin-right-20">{{item.driverName}}</view>
					<view class="zhen" v-if="item.userCertificationStatus == 1">实名认证</view>
					<view class="zhen" v-if="item.carCertificationStatus == 1">运输认证</view>
				</view>
				<view class="ct" @click="jin(item.creator)">
					<view class="pai">
						{{item.plateNumber}}
					</view>
					<view class="type">
						<view class="mi">
						<!-- {{item.carConductor}}米&nbsp; {{item.carConductorNames}}/{{item.grossMass}}吨 -->
						<text class="" v-if="item.carConductor != '' && item.carConductor != null">{{item.carConductor}}米</text>
						<text class="" v-if="item.vehicleType != '' && item.vehicleType != null">{{item.vehicleType}}/</text>
						<text class="" v-if="item.grossMass != '' && item.grossMass != null">{{item.grossMass}}吨</text>
						</view>
						<view class="jiaoyi">交易数 {{item.tradingVolume}} 好评率 {{item.highPraiseRate*100}}%</view>
					</view>
				</view>
				<view class="bm u-flex">
					<view class="phone" @click="pho(item.phone)">
						<icon class="iconfont icondianhua-hei" style="font-size: 20rpx;color: #333;"></icon>
						<view class="u-margin-left-20">电话沟通</view>
					</view>
					<view class="zhi" @click="chen(item)">
						<icon class="iconfont iconshanchu-hui" style="font-size: 24rpx;color: #FC441C;"></icon>
						<view class="u-margin-left-20">指定承运</view>
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
				pageIndex:1,
				pageSize:10,
				phone:"",
				list:[],
				type:"",
				orderId:"",
			}
		},
		// 15922220004
		onLoad(option) {
			if (option.type) {
				this.type = option.type
			}
			if (option.orderId) {
				this.orderId = option.orderId
			}
			ajax.get(config.deliverGoods_url,{
			  pageIndex: this.pageIndex,
			  pageSize: this.pageSize,
			}).then(res => {
				console.log("熟车列表")
			  console.log(res)
			  if(res.code == 0){
				  this.list = res.data.list
				  for(let i = 0 ; i < this.list.length ; i ++){
					  if(this.list[i].plateNumber){
						  this.list[i].plateNumber = this.list[i].plateNumber.slice(0,3) + "*****" + this.list[i].plateNumber.slice(this.list[i].plateNumber.length-1,this.list[i].plateNumber.length)
					  }
				  }
				  console.log(this.list)
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
			findDriver(){
				if(this.phone.length == 11){
					ajax.get(config.deliverGoods_url,{
					  pageIndex: this.pageIndex,
					  pageSize: this.pageSize,
					  phone: this.phone,
					}).then(res => {
						console.log("熟车列表")
					  console.log(res)
					  if(res.code == 0){
						  let list = res.data.list
						  if(list != null){
							  this.list = list
						  }else{
							  this.list = ''
						  }
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
				}else if(this.phone.length == 0){
					ajax.get(config.deliverGoods_url,{
					  pageIndex: this.pageIndex,
					  pageSize: this.pageSize,
					}).then(res => {
						console.log("熟车列表")
					  console.log(res)
					  if(res.code == 0){
						  this.list = res.data.list
						  console.log(this.list)
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
					
				}else{
					if(this.list.length != 0){
						this.list = []
					}
				}
				
			},
			jin(e){
				uni.navigateTo({
					url:"/pages/order/driverBrief/driverBrief?id="+e + '&type=2'
				})
			},
			//打电话
			pho(phone){
				uni.makePhoneCall({
				    phoneNumber:  phone//仅为示例
				});
			},
			chen(item){
				this.$store.commit("getLocat","")
				if(this.orderId != '' && this.type != ''){
					uni.navigateTo({
						url:"/pages/goods/ship/ship?itemName="+item.driverName + "&itemId=" + item.creator + "&next=4&type=" + this.type +"&orderId=" + this.orderId
					})
					
				}else if(this.type != ''){
					uni.navigateTo({
						url:"/pages/goods/ship/ship?itemName="+item.driverName + "&itemId=" + item.creator + "&next=4&type=" + this.type
					})
				}else{
					uni.navigateTo({
						url:"/pages/goods/ship/ship?itemName="+item.driverName + "&itemId=" + item.creator + "&next=4"
					})
				}
			}
		}
	}	
</script>

<style scoped lang="less">
	
	.search{
		width: 100%;
		padding: 10rpx 30rpx;
		background: #fff;
		border-bottom: 2rpx solid #EEEEEE;
		.box{
			height: 60rpx;
			border-radius: 8rpx;
			padding: 18rpx 20rpx;
			background-color: #EEEEEE;
			border: 2rpx solid #DDDDDD;
			input{
				font-size: 24rpx;
				width: 400rpx;
			}
		}
	}
	.box{
		padding: 0 30rpx;
		.cont{
			margin-top: 20rpx;
			border-radius: 8rpx;
			background-color: #fff;
			.tp{
				padding: 18rpx 20rpx;
				.name{
					font-size: 24rpx;
					line-height: 32rpx;
				}
				.zhen{
					margin-right: 20rpx;
					height: 36rpx;
					padding: 4rpx 10rpx;
					background-color: #07CC10;
					color: #F8F8F8;
					font-size: 20rpx;
					line-height: 28rpx;
					border-radius: 8rpx;
				}
			}
			.ct{
				border-bottom: 2rpx solid #EEEEEE;
				border-top: 2rpx solid #EEEEEE;
				padding:20rpx 20rpx 36rpx 20rpx;
				.pai{
					color: #333;
					font-size: 28rpx;
					line-height: 38rpx;
					margin-bottom: 22rpx;
				}
				.type{
					display: flex;
					justify-content: space-between;
					.mi{
						font-size: 24rpx;
						line-height: 32rpx;
						color: #333;
					}
					.jiaoyi{
						font-size: 24rpx;
						line-height: 32rpx;
						color: #999999;
					}
				}
			}
			.bm{
				.phone{
					width:50%;
					display: flex;
					justify-content: center;
					align-items: center;
					height:80rpx;
					view{
						color:#666666;
						font-size:28rpx;
						line-height:38rpx;
					}
				}
				.zhi{
					width:50%;
					border-left: 2rpx solid #eee;
					height:80rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					view{
						color:#F96F2B;
						font-size:28rpx;
						line-height:38rpx;
					}
				}
			}
		}
	}
	
</style>
<style scoped>
	@import '../../../components/font/iconfont.css';
	
</style>
