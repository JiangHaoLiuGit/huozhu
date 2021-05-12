<template>
	<view class="page">
		<u-navbar title="我的评价" title-color="#F8F8F8" back-icon-color="#333" :background="{ background: '#0080FF' }" >
			<!-- <view slot="right" class="slotRight u-padding-right-40" @click="to1">快速重发</view> -->
		</u-navbar>
		<view class="view">
			<view class="cont" style="font-size: 28rpx;">
				<view class="u-flex u-row-start">
					<view class="blockView blockViews u-line-1 u-flex u-row-center" :class="type == -1?'active':''" @click="tab(-1)">
						<view class="u-line-1" style="width: 96rpx;">
							全部
							<text>{{tradingVolume}}</text>
						</view>
					</view>
					<view class="blockView blockViews u-flex u-row-center" :class="type == -2?'active':''" @click="tab(-2)">
						好评
						<text>{{highPraiseVolume}}</text>
					</view>
					<view class="blockView blockViews u-flex u-row-center" :class="type == -3?'active':''" @click="tab(-3)">
						中评
						<text>{{middleVolume}}</text>
					</view>
					<view class="blockView blockViews u-flex u-row-center" :class="type == -4?'active':''" @click="tab(-4)">
						差评
						<text>{{negativeComment}}</text>
					</view>
				</view>
				<view class="u-flex u-row-start" style="flex-wrap:wrap;padding-left: 136rpx;">
					<view class="blockView u-flex u-row-center" v-if="item.count !=null && item.count != 0" v-for="(item,index) in obj2.evaluationType" :key="index" data-id="item.evaluationTypeId">
						<view class="u-line-1" style="max-width: 110rpx;">{{item.name}}</view>{{item.count}}
					</view>
				</view>
			</view>
		</view>
		<view class="pin">
			<!-- <view class="top u-flex u-row-between">
				<view class="view" :class="type == 1?'active':''" @click="tab(1)">全部</view>
				<view class="view" :class="type == 2?'active':''" @click="tab(2)">好评</view>
				<view class="view" :class="type == 3?'active':''" @click="tab(3)">中评</view>
				<view class="view" :class="type == 4?'active':''" @click="tab(4)">差评</view>
			</view> -->
			<view class="bottom">
				<view class="cont" v-for="(item,index) in order" :key="index">
					<view class="conts">
						<view class="user u-flex u-row-between">
							<view class="one u-flex">
								<icon class="iconfont userImg icontouxiang1" style="font-size: 74rpx;" v-if="item.headPortrait == '' || item.headPortrait == null"></icon>
								<image :src="item.headPortrait" mode="scaleToFill" v-else></image>
								<view class="two">
									<view class="twoTop u-flex">
										<view class="u-padding-right-10">
											{{item.idCardName}}
										</view>
										
									</view>
									<view class="twoBottom u-flex">
										<u-rate active-color="#FFCC52" disabled="true" :count="5" v-model="item.score"></u-rate>
										<!-- <view>{{item.addressList[0].cityName}}{{item.addressList[0].regionName}}</view>
										<icon class="iconfont icondao"></icon>
										<view>{{item.addressList[item.addressList.length-1].cityName}}{{item.addressList[item.addressList.length-1].regionName}}</view> -->
									</view>
								</view>
							</view>
							<view class="three">
								{{item.createTime}}
							</view>
						</view>
						<view class="u-flex u-padding-bottom-20">
							<view class="blockView sixColor" v-for="(items,index) in item.evaluationTypeNames" :key="index">
								{{items}}
							</view>
						</view>
					</view>
				</view>
				<view class="orderBlean" style="text-align: center;" v-if="orderBlean">
					<image src="../../../static/huoyuan.png" style="width: 400rpx;" mode="aspectFit"></image>
					<text class="nineColor" style="display: block;">~暂无评价~</text>
				</view>
				<!-- <text class="orderBlean u-flex u-row-center" v-if="orderBlean">~暂无评价~</text> -->
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
				cargoName:[],
				userImg:"",
				type:"-1",
				score:"4",
				phone:"",
				obj:{},
				obj1:{},
				obj2:{},
				phones:"",
				pageIndex:1,
				pageSize:10,
				orderBlean:false,
				order:[],
				tradingVolume:"",
				highPraiseVolume:"",
				middleVolume:"",
				negativeComment:""
			}
		},
		onLoad(option) {
			if(option.phone){
				this.phone = option.phone
			}
		},
		onReachBottom() {
			console.log('页面到底了')
			this.pageList();
		},
		onShow(){
			this.pageIndex = 1
			this.order = []
			this.orderBlean = false
			//cargoOwner_url
			this.pageList()
			// ajax.get(config.cargoOwner_url,{
			// 	type: 2,
			// 	userCode:this.phone
			// }).then(res => {
			// 	console.log("司机简介信息")
			// 	console.log(res)
			// 	if(res.code == 0){
					
			// 		this.obj = res.data
			// 		if(res.data.headPortrait != null && res.data.headPortrait != "" && res.data.headPortrait != undefined && res.data.headPortrait.slice(0,6) != "/ajaxI"){
			// 			this.userImg = res.data.headPortrait
			// 		}
			// 	}else{
			// 				uni.showToast({
			// 					title:"网络错误,请重试",
			// 					icon:'none',
			// 					duration:2000
			// 				})
			// 			}
			// }).catch(err => {
			// 	//ajax.js反馈的reject结果
			// 	console.log(err)
			// })
			ajax.get(config.pinList_url,{
				userCode: this.phone,
				type:2,
				state:this.type,
				pageIndex: this.pageIndex,
				pageSize: this.pageSize
			}).then(res => {
				console.log("司机简介信息")
				console.log(res)
				if(res.code == 0){
					this.obj1 = res.data
					this.tradingVolume = this.obj1.tradingVolume
					this.highPraiseVolume = this.obj1.highPraiseVolume
					this.middleVolume = this.obj1.middleVolume
					this.negativeComment = this.obj1.negativeComment
					
					this.obj2 = res.data
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
				return y + '-' + MM + '-' + d
			},
			tab(e){
				this.type = e
				this.pageIndex = 1
				this.order = []
				this.orderBlean = false
				this.pageList()
				
				ajax.get(config.pinList_url,{
					userCode: this.phone,
					type:2,
					state:this.type,
					pageIndex: this.pageIndex,
					pageSize: this.pageSize
				}).then(res => {
					console.log("司机简介信息")
					console.log(res)
					if(res.code == 0){
						this.obj2 = res.data
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
			pageList(){
				if(this.orderBlean == false){
					ajax.get(config.pinList_url,{
						userCode: this.phone,
						type:2,
						state:this.type,
						pageIndex: this.pageIndex,
						pageSize: this.pageSize
					}).then(res => {
						console.log("司机评价列表信息")
						console.log(res)
						if(res.code == 0){
							if (res.data.list.length > 0) {
								let list = res.data.list
								for(let i = 0 ; i < list.length ; i ++){
									list[i].createTime = this.timers(list[i].createTime)
									if(list[i].evaluationTypeNames.indexOf(",") != -1){
										list[i].evaluationTypeNames = list[i].evaluationTypeNames.split(",")
									}else{
										list[i].evaluationTypeNames = [list[i].evaluationTypeNames]
									}
									
									
								}
								
								this.order = this.order.concat(list)
								this.pageIndex++
							}else{
								this.orderBlean = true
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
				}
			}
		}
	}	
</script>

<style scoped lang="less">
	
	.blockView{
		padding: 0 10rpx;
		height: 48rpx;
		border-radius: 8rpx;
		background-color: #EEEEEE;
		border: 2rpx solid #ddd;
		margin-right: 20rpx;
		text-align: center;
		line-height: 45rpx;
		
	}
	.pin{
		.top{
			margin: 20rpx 0;
			padding: 0 112rpx;
			background-color: #fff;
			.view{
				height: 74rpx;
				line-height: 70rpx;
				color: #666;
				font-size: 24rpx;
				border-bottom: 2rpx solid #fff;
			}
			.view.active{
				color: #3399FF;
				border-color: #3399FF;
			}
		}
		.bottom{
			margin-top: 20rpx;
			padding: 0 30rpx;
			.cont{
				margin-bottom: 20rpx;
				.conts{
					padding-top: 20rpx;
				}
				.user{
					width: 100%;
					padding: 0 54rpx 20rpx 0;
					.one{
						image{
							width: 74rpx;
							height: 74rpx;
							border-radius: 8rpx;
						}
						icon{
							
						}
						.two{
							padding-left: 20rpx;
							.twoTop{
								font-size: 24rpx;
							}
							.twoBottom{
								padding-top: 10rpx;
								font-size: 20rpx;
								color: #999;
								icon{
									font-size: 20rpx;
									color: #999;
									margin: 0 10rpx;
								}
							}
						}
					}
					
					.three{
						height: 74rpx;
						color: #999999;
						font-size: 20rpx;
						padding-top: 4rpx;
					}
				}
			}
		}
	}
	.masterColor{
		color: #3399FF;
	}
	.view{
		padding: 0 30rpx;
		.cont{
			margin-top: 20rpx;
			padding: 20rpx;
		}
	}
	.blockView{
		width: 158rpx;
		height: 48rpx;
		border-radius: 8rpx;
		background-color: #EEEEEE;
		border: 2rpx solid #ddd;
		margin-right: 20rpx;
		text-align: center;
		line-height: 45rpx;
		margin-top: 20rpx;
		color: #666666;
		font-size: 20rpx;
		
	}
	.blockView.active{
		border-color: #328CF8;
		background: rgba(21, 128, 252, 0.2);
		color: #3399FF;
	}
	.blockView:nth-of-type(3n){
		margin-right: 0;
	}
	.blockView.blockViews{
		width: auto;
		margin-right: 20rpx;
		margin-top: 0;
	}
	
</style>
<style scoped>
	@import '../../../components/font/iconfont.css';
	
</style>
