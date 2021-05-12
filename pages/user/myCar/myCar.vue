<template>
	<view class="page">
		<u-navbar title="" :isBack="false" title-color="#F8F8F8" back-icon-color="#333" :background="{ background: '#0080FF' }">
			<!-- 发货平台 -->
			<view class="slot-wrap center u-flex u-row-between widthB u-padding-left-30 u-padding-right-30">
				<!--  class="u-margin-right-80" -->
				<image src="../../../static/pic17.png" style="width: 20rpx;" @click="tui" mode="widthFix"></image>
				<view class="title fffColor">我的熟车</view>
				<!-- 快速发货 -->
				<view class="title fffColor"></view>
			</view>
			<!-- <view slot="right" class="slotRight u-padding-right-40" @click="to1">快速重发</view> -->
		</u-navbar>
		<view v-if="type == 2">
			<view class="search">
				<view class="box u-flex">
					<image src="../../../static/pic42.png" class="u-margin-right-20" style="width: 24rpx;" mode="widthFix"></image>
					<input type="text" placeholder=" 输入司机手机号进行查找" v-model="phone" maxlength="11" @input="findDriver">
				</view>
			</view>
			<view class="box">
				<view v-if="carList != null">
					<view class="cont" v-for="(item , index) in carList" :key="index">
						<view class="tp u-flex">
							<icon class="iconfont icontouxiang1" style="font-size: 44rpx;color: #666;" v-if="driverInfo.headPortrait == '' || driverInfo.headPortrait == null"></icon>
							<image :src="driverInfo.headPortrait" v-else style="width: 40rpx;height: 40rpx;" mode="scaleToFill"></image>
							<view class="name u-margin-left-16 u-margin-right-20">{{driverInfo.idCardName}}</view>
							<view class="zhen" v-if="driverInfo.userCertificationStatus == 1">实名认证</view>
							<view class="zhen" v-if="driverInfo.carCertificationStatus == 1">运输认证</view>
						</view>
						<view class="ct" v-if="carList != null">
							<view class="pai" v-if="item.plateNumber">
								{{item.plateNumber}}
							</view>
							<view class="type">
								<view class="mi u-flex">
										<text class="" v-if="item.carConductor != '' && item.carConductor != null">{{item.carConductor}}米</text>
									
									 <text class="" v-if="item.vehicleType != '' && item.vehicleType != null">{{item.vehicleType}}/</text>
									 <text class="" v-if="item.grossMass != '' && item.grossMass != null">{{item.grossMass}}吨</text>
								 </view>
								<view class="jiaoyi">交易数 {{driverInfo.turnoverTotal}} 好评率 {{driverInfo.highPraiseRate}}%</view>
							</view>
						</view>
						<view class="bm u-flex">
							<view class="phone" @click="pho(driverInfo.phone)">
								<icon class="iconfont icondianhua-hei" style="font-size: 20rpx;color: #333;"></icon>
								<!-- <image src="../../../static/pic19.png" style="width: 22rpx;" mode="widthFix"></image> -->
								<view class="u-margin-left-20">电话沟通</view>
							</view>
							<view class="zhi" @click="chen(item.id)">	
								<icon class="iconfont iconzhiding-lan" style="font-size: 24rpx;color: #3399FF;"></icon>
								<view class="u-margin-left-20">添加到熟车</view>
							</view>

						</view>
					</view>
				</view>
				<text class="orderBlean u-flex u-row-center" v-if="driverBlean">此手机号码查询不到司机</text>
				<!-- <text class="orderBlean u-flex u-row-center" v-if="orderBlean">亲,没有更多了</text> -->
			</view>
		</view>
		<view v-else>
			<view class="" style="min-height: calc(100vh - 300rpx);">
				<view class="briefCont" v-for="(item , index) in list" :key="index">
					<view class="briefCont-top">
						<view class="briefCont-top-left">
							<view class="briefCont-top-left-top">
								<view class="briefCont-top-left-top-text">{{item.nickname}}</view>
								<!-- 韩工说未认证的不需要显示 -->
								<view class="briefCont-top-left-top-tit" v-if="item.userCertificationStatus == '1'">实名认证</view>
								<view class="briefCont-top-left-top-tit" v-if="item.carCertificationStatus == '1'">运输认证</view>
							</view>
							<view class="briefCont-top-left-bot u-flex">
								<view>
									{{item.createTime}} 注册
								</view>
								<view class="u-margin-left-30">
									交易数 {{item.tradingVolume}}
									好评率 {{item.highPraiseRate}}%

								</view>
							</view>
						</view>
						<view class="briefCont-top-rig">
							<image style="width: 68rpx; height: 68rpx;" :src="item.headPortrait" mode="scaleToFill" v-if="item.headPortrait != null && item.headPortrait != ''"></image>
							<icon class="iconfont icontouxiang1" style="font-size: 60rpx;color: #666;" v-else></icon>
						</view>
					</view>
					<view class="briefCont-bot">
						<view class="briefCont-bot-left">{{item.plateNumber}}</view>

						<view class="briefCont-bot-rig">
						<text v-if="item.carConductor">{{item.carConductor}}米 </text>
						<text v-if="item.vehicleType">{{item.vehicleType}}</text>
						<text v-if="item.grossMass">/{{item.grossMass}} 吨</text>
						</view>
					</view>
					<view class="bm u-flex">
						<view class="phone" @click="pho(item.phone)">
							<icon class="iconfont icondianhua-hei" style="font-size: 20rpx;color: #333;"></icon>
							<view class="u-margin-left-20">电话沟通</view>
						</view>
						<view class="zhi" @click="shan(item.id)">
							<icon class="iconfont iconshanchu-hui" style="font-size: 24rpx;color: #FC441C;"></icon>
							<view class="u-margin-left-20">删除</view>
						</view>
					</view>
				</view>
				<view>
					<view class="orderBlean" style="text-align: center;padding-top: 125rpx;" v-if="orderBlean">
						<image :src="srcs" style="width: 400rpx;" mode="aspectFit"></image>
						<text class="nineColor" style="display: block;">暂无熟车</text>
					</view>
				</view>
			</view>
			
			<!-- <view v-if="list.length == 0" class="inText nineColor u-margin-top-50 u-flex u-row-center">暂无我的熟车</view> -->
			<button class="submitBtnBlue u-margin-bottom-50" @click="type = 2">添加熟车</button>
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
			<view class="showErr state1">
				<view class="point">
					<text class="title">温馨提示</text>
					<text class="err">{{showErr1}}</text>
				</view>
				<button class="btnShu masterColor" @click="btnShu1()">确认删除</button>
				<button class="btnShu" @click="show1 = false">暂不删除</button>
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
				srcs:"../../../static/huoyuan.png",
				show1:false,
				showErr1:"确认删除熟车",
				show:false,
				showErr:"",
				btnText:"确定",
				pageIndex:1,
				pageSize:10,
				phone:"",
				list:[],
				orderBlean:false,
				type:1,
				driver:[
					
				],
				carList:[],
				driverInfo:"",
				driverBlean:false,
				carId:""
			}
		},
		onLoad(option) {
			
		},onShow() {
			this.list = []
			this.pageIndex = 1
			this.orderBlean = false
			this.pageList()
		},
		onReachBottom() {
			console.log('页面到底了')
			this.pageList();
		},
		methods: {
			tui(){
				if(this.type == 2){
					this.type = 1
				}else{
					uni.navigateBack()
				}
			},
			btnShu1(){
				this.show1 = false
				// driverDelete_url
				ajax.dele(config.driverDelete_url,{
				  id: this.carId
				}).then(res => {
					console.log("删除熟车")
					console.log(res)
					if(res.code == 0){
						uni.showToast({
							title:"删除成功",
							duration:2000,
							icon:"success"
						})
						this.list = []
						this.pageIndex = 1
						this.orderBlean = false
						this.pageList()
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
			shan(id){
				this.carId = id
				this.show1 = true
			},
			//输入手机号查询司机
			findDriver(){
				if(this.phone.length == 11){
					ajax.get(config.driverInfo_url,{
					  phone: this.phone,
					}).then(res => {
						console.log("查询熟车列表")
						console.log(res)
						if(res.code == 0){
							
							let list = res.data
							
							if(list != null){
								console.log(list[0].carList[0].plateNumber)
								if(list[0].carList[0].plateNumber){
									list[0].carList[0].plateNumber = list[0].carList[0].plateNumber.slice(0,3) + "*****" + list[0].carList[0].plateNumber.slice(list[0].carList[0].plateNumber.length-1,list[0].carList[0].plateNumber.length)
								}
								this.driverInfo = res.data[0]
								if(this.driverInfo.carList != null){
									this.carList = this.driverInfo.carList
								}

								this.driverBlean = false
							  for(let i = 0 ; i < list.length ; i ++){
								  // if(list[i].plateNumber){
									 //  if(list[i].plateNumber != '' && list[i].plateNumber != null && list[i].plateNumber != undefined){
										//   list[i].plateNumber = list[i].plateNumber.slice(0,3) + "*****" + list[i].plateNumber.slice(6,7)
									 //  }
								  // }

							  }
							  this.driver = res.data
							}else{
								this.driver = ""
								this.driverBlean = true
							}

						  // if(!res.data.hasNextPage){
							 //  this.orderBlean = true
						  // }
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
					if(this.carList.length > 0){
						this.carList = ""
					}
				}else{
					if(this.carList.length > 0){
						this.carList = ""
					}
				}
				
			},
			pageList(){
				if (this.orderBlean == false) {
					ajax.get(config.deliverGoods_url,{
					  pageIndex: this.pageIndex,
					  pageSize: this.pageSize,
					}).then(res => {
						console.log("熟车列表")
					  console.log(res)
					  if(res.code == 0){
						  let list = res.data.list
						  
						  if(list.length > 0){
							  
							  for(let i = 0 ; i < list.length ; i ++){
								  
								  if(list[i].plateNumber){
									  list[i].plateNumber = list[i].plateNumber.slice(0,3) + "*****" + list[i].plateNumber.slice(list[i].plateNumber.length-1,list[i].plateNumber.length)
								  }

							  }
						  }else{
							  if(this.pageIndex == 1){
								  this.orderBlean = true
							  }
						  }
						  this.list = this.list.concat(res.data.list)
						  
						  console.log(this.list.length)
						  
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
				
			},
			//打电话
			pho(phone){
				uni.makePhoneCall({
				    phoneNumber:  phone//仅为示例
				});
			},
			btnShu(){
				this.show = false
			},
			chen(item){
				console.log(item)
				ajax.post(config.zhiCar_url,{
				  carId: item,
				}).then(res => {
					console.log("添加熟车")
				  console.log(res)
				  if(res.code == 0){
					  this.phone = ''
					  this.type = 1
					  this.list = []
					  this.pageIndex = 1
					  this.orderBlean = false
					  this.pageList()
					  uni.showToast({
					  	title: "添加成功",
					  	duration: 2000,
					  	icon: "success"
					  })
					  this.carList = ""
					  // this.list = this.list.concat(res.data.list)
					  // console.log(this.list.length)
					  // if(!res.data.hasNextPage){
						 //  this.orderBlean = true
					  // }
				  }else{
					  console.log("asdf")
					  this.show = true
					  this.showErr = res.msg
				  }
				}).catch(err => {
				  //ajax.js反馈的reject结果
				  console.log(err)
				})
			}
		}
	}	
</script>

<style scoped lang="less">
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
			height: 60%;
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
					.briefCont-top-left-top-tit.active{
						color: #fff;
						background: #ccc;
					}
				}
				.briefCont-top-left-bot {
					padding: 20rpx 0;
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
			height: 40%;
			display: flex;
			border-top: 2rpx solid #eeeeee;
			
			justify-content: space-between;
			padding: 20rpx 0;
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
		.bm{
			border-top: 2rpx solid #eeeeee;
			width: 100%;
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
					color:#FC441C;
					font-size:28rpx;
					line-height:38rpx;
				}
			}
		}
	}
	// .submitBtnBlue{
	// 	position: absolute;
	// 	bottom: 50rpx;
	// 	left: 30rpx;
	// }
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
				border-bottom: 2rpx solid #EEEEEE;
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
				border-top: 2rpx solid #EEEEEE;
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
						color:#3399FF;
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